import { component$, Resource, useStore } from '@builder.io/qwik'
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city'
import BlogPostList from '~/components/blog-post-list/blog-post-list'
import { IBlogPost } from '~/models/blog'
import tagData from '../../data/tags.json'
import favicon from '../../images/favicon.ico'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'
import fs from 'fs'
import Loading from '~/components/loading/loading'
/* import demon1 from '../images/drink-coffee-hail-satan.png' */
export default component$(() => {
  const store = useStore({
    endpoint: useEndpoint<Array<IBlogPost>>()
  })
  return (
    <>
      <div class='bg-white dark:bg-zinc-900 md:rounded-t-xl'>
        <Resource
          value={store.endpoint}
          onPending={() => <Loading />}
          onRejected={(reason) => <div>Error {reason}</div> }
          onResolved={(posts) => {
            if (posts)
              return <>
                <BlogPostList {...{ tagData, posts }} />
              </>
            else
              return <Loading />
          }}
        />
        
      </div>
    </>
  )
})

export const onGet: RequestHandler<Array<IBlogPost>> = async () => {
  // this is just freaking magic
  const posts = fs.readdirSync('./src/data/posts/').filter((post) => post.endsWith('.html'))
  return posts.map((postId) => {
    const stat = fs.statSync(`./src/data/posts/${postId}`)
    const post = fs.readFileSync(`./src/data/posts/${postId}`).toString()
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
      id: postId.substring(0, postId.length - 5),
      html: new XMLSerializer().serializeToString(postMarkup),
      title,
      shortDescription,
      tags,
      ctime: stat.ctimeMs,
      atime: stat.atimeMs,
      mtime: stat.mtimeMs
    } as IBlogPost
  })
}

export const head: DocumentHead = {
  title: 'MarmadileManteater',
  links: [{
    rel: 'icon',
    href: favicon,
    type: 'image/png',
    sizes: '250x250'
  }]
}
