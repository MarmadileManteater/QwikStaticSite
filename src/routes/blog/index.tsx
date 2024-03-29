import { component$ } from '@builder.io/qwik'
import { DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city'
import { IBlogPost } from '@marmadilemanteater/gh-static-site-lib/src/models/blog'
import tagData from '../../../data/tags.json'
import favicon from '../../images/favicon.ico'
import { getAllBlogPostsSorted } from '@marmadilemanteater/gh-static-site-lib/src/dataservice/blog-posts'
import UnifiedContentList from '~/components/unified-content-list/unified-content-list'
import Emoji from '~/components/emoji/emoji'
/* import demon1 from '../images/drink-coffee-hail-satan.png' */

export const PAGE_SIZE = 5

export default component$(() => {
  const { value } = loader()
  const { posts, pageCount } = value
  return (
    <>
      <div class='project-list overflow-hidden' >
        <div class='md:rounded-t-xl'>
          {posts?<>
            <div class='rounded-t-xl lg:border border-solid border-black bg-white dark:bg-zinc-900 border-t'>
              <a download='my-blog.xml' href='/blog/rss.xml' class='hover:underline p-2 block'><Emoji emoji='📰' /> rss</a>
              <UnifiedContentList {...{ tagData, content: posts as IBlogPost[], startIndex: 0 }} />
              {pageCount as number > 1?<>
                <Link href='./page/1' class='p-5 inline-block hover:underline'>Next Page &raquo;</Link>
              </>:<>
              </>}
            </div>
          </>:<></>}
        </div>
      </div>
    </>
  )
})

export const loader = routeLoader$(() => {
  const allPosts = getAllBlogPostsSorted()
  return {
    posts: allPosts.slice(0, PAGE_SIZE),
    pageCount: Math.ceil(allPosts.length / PAGE_SIZE)
  }
})
/*
export const onGet: RequestHandler<Array<Array<IBlogPost>|number>> = () => {
  const allPosts = getAllBlogPostsSorted()
  return [allPosts.slice(0, PAGE_SIZE), Math.ceil(allPosts.length / PAGE_SIZE)]
}*/

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
