import { component$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'
import { DocumentHead, loader$, StaticGenerateHandler } from '@builder.io/qwik-city'
import TagList from '../../../components/tag-list/tag-list'
import favicon from '../../../images/favicon.ico'
import tagData from '../../../../data/tags.json'
import { getAllBlogPostIds, getBlogPostById } from '@marmadilemanteater/gh-static-site-lib/src/dataservice/blog-posts'
import { convertEmojiToImages } from '@marmadilemanteater/gh-static-site-lib/src/helpers/emoji'
export default component$(() => {
  const post = loader.use().value
  return (
    <>
      <div class='bg-white border-t dark:bg-zinc-900 rounded-t-xl lg:border border-solid border-black'>
        <div class='p-6 pb-2'>
          <h2 class='text-4xl pb-2' dangerouslySetInnerHTML={convertEmojiToImages(post.title)}></h2>
          <TagList {...{tags: post.tags, tagData }} />
          <p class='pb-2 text-zinc-500 dark:text-zinc-400'><em>Last updated {new Date(post.gittime).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' })} GMT</em></p>
          <div dangerouslySetInnerHTML={convertEmojiToImages(post.html)}></div>
        </div>
      </div>
    </>
  )
})

export const head: DocumentHead = ({params}) => {
  let title = 'Blog'
  let description = ''
  if (isServer) {
    // only set the title if we are on the server, otherwise the resource will handle this change
    const post = getBlogPostById(params.postId)
    title = post.title
    description = post.shortDescription
  }
  return {
    title,
    links: [{
      rel: 'icon',
      href: favicon,
      type: 'image/png',
      sizes: '250x250'
    }],
    meta: [
      {
        name: 'author',
        content: 'Emma (MarmadileManteater)'
      },
      {
        name: 'description',
        content: description
      }
    ]
  }
}

export const onStaticGenerate: StaticGenerateHandler = () => {
  const ids = getAllBlogPostIds()
  return {
    params: ids.map((id) => {
      return { postId: id }
    })
  }
}

export const loader = loader$(async ({ params }) => {
  const { postId } = params
  return getBlogPostById(postId.replace(/%20/g, ' '))
})
