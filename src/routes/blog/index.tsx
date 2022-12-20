import { component$, Resource, useStore } from '@builder.io/qwik'
import { DocumentHead, Link, RequestHandler, useEndpoint } from '@builder.io/qwik-city'
import { IBlogPost } from '~/models/blog'
import tagData from '../../../data/tags.json'
import favicon from '../../images/favicon.ico'

import Loading from '~/components/loading/loading'
import { getAllBlogPostIds, getBlogPostById } from '~/dataservice/blog-posts'
import UnifiedContentList from '~/components/unified-content-list/unified-content-list'
/* import demon1 from '../images/drink-coffee-hail-satan.png' */

export const PAGE_SIZE = 5

export default component$(() => {
  const store = useStore({
    endpoint: useEndpoint<Array<Array<IBlogPost>|number>>()
  })

  return (
    <>
      <div class='project-list rounded-t-xl' style='overflow:hidden;'>
        <div class='bg-white dark:bg-zinc-900 md:rounded-t-xl'>
          <Resource
            value={store.endpoint}
            onPending={() => <Loading />}
            onRejected={(reason) => <div>Error {reason}</div> }
            onResolved={([posts, pageCount]) => {
              if (posts)
                return <>
                  <UnifiedContentList {...{ tagData, content: posts as IBlogPost[], startIndex: 0 }} />
                  {pageCount as number > 1?<>
                    <Link href='./page/1' class='p-5 inline-block hover:underline'>Next Page &raquo;</Link>
                  </>:<>
                  </>}
                </>
              else
                return <Loading />
            }}
          />
        </div>
      </div>
    </>
  )
})

export const onGet: RequestHandler<Array<Array<IBlogPost>|number>> = () => {
  const allPostIds = getAllBlogPostIds()
  const postIds = allPostIds.slice(0, PAGE_SIZE)
  return [postIds.map((id) => {
    return getBlogPostById(id)
  }), Math.ceil(allPostIds.length / PAGE_SIZE)]
}

export const head: DocumentHead = {
  title: 'Blog',
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
      content: 'my blog; 🤷‍♀️i guess'
    }
  ]
}
