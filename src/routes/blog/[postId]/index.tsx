import { Resource, component$, useStore } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'
import { RequestHandler, DocumentHead, useEndpoint, StaticGenerateHandler } from '@builder.io/qwik-city'
import { IBlogPost } from '../../../models/blog'
import Loading from '../../../components/loading/loading'
import TagList from '../../../components/tag-list/tag-list'
import favicon from '../../../images/favicon.ico'
import tagData from '../../../../data/tags.json'
import { getAllBlogPostIds, getBlogPostById } from '~/dataservice/blog-posts'



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
                  <p class='pb-2 text-zinc-500 dark:text-zinc-400'><em>Last updated {new Date(post.gittime).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' })} UTC</em></p>
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

export const head: DocumentHead = ({params}) => {
  let title = 'Blog'
  if (isServer) {
    // only set the title if we are on the server, otherwise the resource will handle this change
    title = getBlogPostById(params.postId).title
  }
  return {
    title,
    links: [{
      rel: 'icon',
      href: favicon,
      type: 'image/png',
      sizes: '250x250'
    }]
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

export const onGet: RequestHandler<IBlogPost> = async ({ params }) => {
  const { postId } = params
  return getBlogPostById(postId.replace(/%20/g, ' '))
}
