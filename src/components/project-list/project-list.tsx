import { component$, useStore, useWatch$ } from '@builder.io/qwik';
import { IProject, IProjectButtonData, ITag } from '../../models/project'; 
import ProjectCard from '../project-card/project-card';
import ProjectButton from '../project-button/project-button';

interface IProps {
    projects: Array<IProject>,
    tags: Array<ITag>
}

export default component$(({ projects, tags } : IProps) => {
  const state = useStore({
    projectsSorted: projects,
    sortType: 'featured'
  })

  useWatch$(({track}) => {
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
    <div class="project-list">
      <a class={`${state.sortType === 'featured'?'decoration-solid underline cursor-default':'cursor-pointer'} select-none p-4 inline-block`} onClick$={() => { state.sortType = 'featured' }}>Sort by featured</a>
      <a class={`${state.sortType === 'lastUpdate'?'decoration-solid underline cursor-default':'cursor-pointer'} select-none p-4 inline-block`} onClick$={() => { state.sortType = 'lastUpdate' }}>Sort by last updated</a>
      {state.projectsSorted.map((project : IProject, index : number) => {
        return <ProjectCard
          title={project.title}
          titleLink={project.buttons.at(-1)?.link}
          summary={project.summary}
          thumbnail={project.thumbnail}
          tags={project.tags}
          tagData={tags}
          color={index}
        >
          {project.buttons.map((entry : IProjectButtonData, index : number) => {
            return <ProjectButton
              data={entry}
              color={index}
            >{entry.prefix} <strong>{entry.locationName}</strong></ProjectButton>
          })}
        </ProjectCard>
      })}
    </div>
  );
});
