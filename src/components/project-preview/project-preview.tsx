import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { IProject, ITag } from '@marmadilemanteater/gh-static-site-lib/src/models/project'
import UnifiedContentList from '../unified-content-list/unified-content-list'
interface IProps {
    projects: Array<IProject>,
    tagData: Array<ITag>
}
export default component$(({ projects, tagData } : IProps) => {
  return (
    <div class='project-list md:rounded-t-xl overflow-hidden' >
      <UnifiedContentList {...{ content: projects, tagData: tagData }} ></UnifiedContentList>
      <Link href='./projects' class='p-5 inline-block hover:underline'>View more &raquo;</Link>
    </div>
  )
})
