import { component$ } from '@builder.io/qwik'
import { IProject, IProjectButtonData, ITag } from '../../models/project'
import ProjectCard from '../project-card/project-card'
import ProjectButton from '../project-button/project-button'
interface IProps {
    projects: Array<IProject>,
    tagData: Array<ITag>
}
export default component$(({ projects, tagData } : IProps) => {

  return (
    <div class='project-list rounded-t-xl' style='overflow:hidden;'>
      {projects.map((project : IProject, index : number) => {
        const { title, buttons, summary, thumbnail, tags} = project
        const titleLink = buttons.at(-1)?.link
        return <ProjectCard
          {...{title, titleLink, buttons, summary, thumbnail, tags, tagData, index: index + 1 }}
        >
          {project.buttons.map((entry : IProjectButtonData, index : number) => {
            const { link, target, prefix, locationName } = entry
            return <ProjectButton
              {...{ link, target, index }}
            >{prefix} <strong>{locationName}</strong></ProjectButton>
          })}
        </ProjectCard>
      })}
      <a href='/projects' class='p-5 inline-block hover:underline'>View more &raquo;</a>
    </div>
  )
})