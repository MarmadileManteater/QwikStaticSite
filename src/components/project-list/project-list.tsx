import { component$, useStore } from '@builder.io/qwik';
import { IProject, IProjectButtonData, ITag } from '../../models/project'; 
import ProjectCard from '../project-card/project-card';
import ProjectButton from '../project-button/project-button';

interface IProps {
    projects: Array<IProject>,
    tags: Array<ITag>
}

export default component$(({ projects, tags } : IProps) => {
  const state = useStore({
    projectsSortedByLastUpdated: projects.map(p => p).sort((a, b) => { return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime() }),
    projectsSorted: projects
  })

  return (
    <div class="project-list">
      <a onClick$={() => { state.projectsSorted = state.projectsSortedByLastUpdated }}>Sort by last update</a>
      <a onClick$={() => { state.projectsSorted = projects }}>Sort by featured</a>
      {state.projectsSorted.map((project : IProject) => {
        return <ProjectCard
          title={project.title}
          titleLink={project.buttons.at(-1)?.link}
          summary={project.summary}
          thumbnail={project.thumbnail}
          tags={project.tags}
          tagData={tags}
        >
          {project.buttons.map((entry : IProjectButtonData) => {
            return <ProjectButton
              link={entry.link}
              target="_blank"
            >{entry.prefix} <strong>{entry.locationName}</strong></ProjectButton>
          })}
        </ProjectCard>
      })}
    </div>
  );
});
