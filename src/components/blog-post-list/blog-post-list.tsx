import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { IBlogPost } from '../../models/blog'
import TagList from '../tag-list/tag-list'

interface IProps {
  posts: IBlogPost[],
  tagData: Array<any>
}

export default component$(({posts, tagData} : IProps) => {
  return (
    <>
      {posts.map((post) => {
        return <>
          <div class='p-8'>
            <Link href={`/blog/${post.id}/`} class='hover:underline' ><h2 class='text-4xl'>{post.title}</h2></Link>
            <TagList {...{tags: post.tags, tagData }} />
            <p class='pb-2'><em>Last updated {new Date(post.gittime).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' })} UTC</em></p>
            <div>{post.shortDescription}</div>
          </div>
        </>
      })}
    </>
  )
})
