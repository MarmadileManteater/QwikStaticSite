import { component$ } from '@builder.io/qwik'
import { DocumentHead, loader$, Link, useLocation, StaticGenerateHandler } from '@builder.io/qwik-city'
import { IBlogPost } from '@marmadilemanteater/gh-static-site-lib/src/models/blog'
import tagData from '../../../../../data/tags.json'
import favicon from '../../../../images/favicon.ico'
import { getAllBlogPostIds, getAllBlogPostsSorted } from '@marmadilemanteater/gh-static-site-lib/src//dataservice/blog-posts'
import UnifiedContentList from '~/components/unified-content-list/unified-content-list'
import { PAGE_SIZE } from '../..'
/* import demon1 from '../images/drink-coffee-hail-satan.png' */

export default component$(() => {
  const { value } = loader.use()
  const { posts, pageCount } = value
  const location = useLocation()
  const pageNum = parseInt(location.params.pageNum)
  const previousPage = pageNum > 1?`../${pageNum - 1}`:'../../'
  const nextPage = `../${pageNum + 1}`
  return (
    <>
      <div style='flex: 1; display: flex; flex-direction: column;'>
        <div class='project-list rounded-t-xl border-t lg:border border-solid border-black bg-white dark:bg-zinc-900 md:rounded-t-xl flex-1 md:flex-initial' style='overflow:hidden; display: flex; flex-direction: column;'>
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

export const loader = loader$(({params}) => {
  const pageNum = parseInt(params.pageNum)
  const allPosts = getAllBlogPostsSorted()
  const posts = allPosts.slice(PAGE_SIZE * pageNum, PAGE_SIZE * (pageNum + 1))
  return {
    posts: posts,
    pageCount: allPosts.length / PAGE_SIZE
  }
})

export const head: DocumentHead = {
  title: 'MarmadileManteater',
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
