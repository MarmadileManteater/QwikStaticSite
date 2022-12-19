import { component$, Resource, useStore } from '@builder.io/qwik'
import { DocumentHead, RequestHandler, useEndpoint, Link, useLocation, StaticGenerateHandler } from '@builder.io/qwik-city'
import { IBlogPost } from '~/models/blog'
import tagData from '../../../../../data/tags.json'
import favicon from '../../../../images/favicon.ico'

import Loading from '~/components/loading/loading'
import { getAllBlogPostIds, getBlogPostById } from '~/dataservice/blog-posts'
import UnifiedContentList from '~/components/unified-content-list/unified-content-list'
import { PAGE_SIZE } from '../..'
/* import demon1 from '../images/drink-coffee-hail-satan.png' */
export default component$(() => {
  const store = useStore({
    endpoint: useEndpoint<Array<Array<IBlogPost>|number>>()
  })
  const location = useLocation()
  const pageNum = parseInt(location.params.pageNum)
  const previousPage = pageNum > 1?`../${pageNum - 1}`:'../../'
  const nextPage = `../${pageNum + 1}`
  return (
    <>
      <div class='project-list rounded-t-xl' style='overflow:hidden;'>
        <div class='bg-white dark:bg-zinc-900 md:rounded-t-xl'>
          <Resource
            value={store.endpoint}
            onPending={() => <Loading />}
            onRejected={(reason) => <div>Error {reason}</div> }
            onResolved={([posts, pageCount]) => {
              console.log(pageCount)
              if (posts)
                return <>
                  <UnifiedContentList {...{ tagData, content: posts as IBlogPost[], startIndex: (posts as IBlogPost[]).length % 2 === 0?1:0 }} />
                  <div>
                    <Link href={previousPage} class='p-5 inline-block hover:underline'>Previous Page &raquo;</Link>
                    {(Array.from({ length: Math.ceil(pageCount as number) }, (_, i) => i)).slice(pageNum - 2 > 0?pageNum - 2:0, pageNum + 3).map((page) => {
                      if (page === pageNum) {
                        return <>
                          <strong class='text-xl p-5'>{page + 1}</strong>
                        </>
                      } else {
                        return <>
                          <Link href={page > 0?`../${page}`:'../../'} class='p-5 hover:underline' >{page + 1}</Link>
                        </>
                      }
                    })}
                    {pageCount > pageNum + 1?<>
                      <Link href={nextPage} class='p-5 inline-block hover:underline'>Next Page &raquo;</Link>
                    </>:<></>}
                  </div>
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

export const onStaticGenerate: StaticGenerateHandler = () => {
  const ids = getAllBlogPostIds()
  const pages = Array.from({ length: Math.ceil(ids.length / PAGE_SIZE) }, (_, i) => { return { pageNum: i.toString() } })
  return {
    params: pages.slice(1, pages.length)
  }
}

export const onGet: RequestHandler<Array<Array<IBlogPost>|number>> = (ev) => {
  const pageNum = parseInt(ev.params.pageNum)
  const allPostIds = getAllBlogPostIds()
  const postIds = allPostIds.slice(PAGE_SIZE * pageNum, PAGE_SIZE * (pageNum + 1))
  return [postIds.map((id) => {
    return getBlogPostById(id)
  }), allPostIds.length / PAGE_SIZE]
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
