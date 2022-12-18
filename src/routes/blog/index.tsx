import { component$, Resource, useStore } from '@builder.io/qwik'
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city'
import BlogPostList from '~/components/blog-post-list/blog-post-list'
import { IBlogPost } from '~/models/blog'
import tagData from '../../data/tags.json'
import favicon from '../../images/favicon.ico'

import Loading from '~/components/loading/loading'
import { getAllBlogPostIds, getBlogPostById } from '~/dataservice/blog-posts'
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

export const onGet: RequestHandler<Array<IBlogPost>> = () => {
  const postIds = getAllBlogPostIds()
  const posts = []
  for (const i in postIds) {
    posts.push(getBlogPostById(postIds[i]))
  }
  return posts
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
