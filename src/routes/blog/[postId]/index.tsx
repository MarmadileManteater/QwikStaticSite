import { Resource, component$, useStore } from '@builder.io/qwik'
import { RequestHandler, DocumentHead, useEndpoint, StaticGenerateHandler } from '@builder.io/qwik-city'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'
import { IBlogPost } from '../../../models/blog'
import Loading from '../../../components/loading/loading'
import TagList from '../../../components/tag-list/tag-list'
import favicon from '../../../images/favicon.ico'
import tagData from '../../../data/tags.json'
import fs from 'fs'



export default component$(() => {
  const store = useStore({
    post: {} as IBlogPost,
    endpoint: useEndpoint<IBlogPost>()
  })
  return (
    <>
      <div class='bg-white dark:bg-zinc-900 md:rounded-t-xl' >
        <Resource
          value={store.endpoint}
          onPending={() => <Loading />}
          onRejected={(reason) => <div>Error {reason}</div> }
          onResolved={(post) => {
            if (post)
              return <>
                <div class='p-8'>
                  <h2 class='text-4xl'>{post.title}</h2>
                  <TagList {...{tags: post.tags, tagData }} />
                  <p class='pb-2'><em>Last updated {new Date(post.ctime).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' })} UTC</em></p>
                  <div dangerouslySetInnerHTML={post.html}></div>
                </div>
              </>
            else
              return <Loading />
          }}
        />
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'MarmadileManteater',
  links: [{
    rel: 'icon',
    href: favicon,
    type: 'image/png',
    sizes: '250x250'
  }]
}

export const onStaticGenerate: StaticGenerateHandler = () => {
  const ids = fs.readdirSync('./src/data/posts').filter((post) => post.endsWith('.html')).map((post) => post.substring(0, post.length - 5))
  return {
    params: ids.map((id) => {
      return { postId: id }
    }),
  }
}

export const onGet: RequestHandler<IBlogPost> = async ({ params }) => {
  // this is just freaking magic
  const stat = fs.statSync(`./src/data/posts/${params.postId}.html`)
  const post = fs.readFileSync(`./src/data/posts/${params.postId}.html`).toString()
  const parser = new DOMParser()
  const postMarkup = parser.parseFromString(post, 'text/html')
  const titleElement = postMarkup.getElementById('title')
  const title = titleElement?.childNodes[0].textContent
  postMarkup.removeChild(titleElement as Node)
  const shortDescriptionElement = postMarkup.getElementById('short-description')
  const shortDescription = shortDescriptionElement?.childNodes[0].textContent
  postMarkup.removeChild(shortDescriptionElement as Node)
  const tagsElement = postMarkup.getElementById('tags')
  const tagElements = Array.from(tagsElement?.childNodes?tagsElement?.childNodes:[]).filter((node : ChildNode) => node.textContent?.trim() !== '')
  const tags = Array.from(tagElements?tagElements:[]).map((tag) => tag.textContent)
  postMarkup.removeChild(tagsElement as Node)
  return {
    id: params.postId,
    html: new XMLSerializer().serializeToString(postMarkup),
    title,
    shortDescription,
    tags,
    ctime: stat.ctimeMs,
    atime: stat.atimeMs,
    mtime: stat.mtimeMs
  } as IBlogPost
}
