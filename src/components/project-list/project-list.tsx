import { component$, useStore, useTask$ } from '@builder.io/qwik'
import { IProject, IProjectButtonData, ITag } from '../../models/project'
import ProjectCard from '../project-card/project-card'
import ProjectButton from '../project-button/project-button'

interface IProps {
    projects: Array<IProject>
    tagData: Array<ITag>
}

export default component$(({ projects, tagData } : IProps) => {
  const state = useStore({
    projectsSorted: projects,
    sortType: 'featured'
  })

  useTask$(({track}) => {
    track(() => state.sortType)
    switch (state.sortType) {
    case 'featured':
      state.projectsSorted = projects.map(p => p)
      break
    case 'lastUpdate':
      state.projectsSorted = projects.map(p => p).sort((a, b) => { return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime() })
      break
    }
  })

  return (
    <div class='project-list'>
      <a class={`${state.sortType === 'featured'?'decoration-solid underline cursor-default':'cursor-pointer'} select-none p-4 inline-block`} onClick$={() => { state.sortType = 'featured' }}>Sort by featured</a>
      <a class={`${state.sortType === 'lastUpdate'?'decoration-solid underline cursor-default':'cursor-pointer'} select-none p-4 inline-block`} onClick$={() => { state.sortType = 'lastUpdate' }}>Sort by last updated</a>
      {state.projectsSorted.map((project : IProject, index : number) => {
        const { title, buttons, summary, thumbnail, tags} = project
        const titleLink = buttons.at(-1)?.link
        return <ProjectCard
          {...{title, titleLink, summary, thumbnail, tags, tagData, index: index, key: `project-card-${index}` }}
        >
          {project.buttons.map((entry : IProjectButtonData, button_index : number) => {
            const { link, target } = entry
            return <ProjectButton
              {...{ link, target, index: button_index, key: `project-button-${index}` }}
            >{entry.prefix} <strong>{entry.locationName}</strong></ProjectButton>
          })}
        </ProjectCard>
      })}
    </div>
  )
})
