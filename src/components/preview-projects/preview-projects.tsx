import { component$ } from '@builder.io/qwik';
import { IProject, IProjectButtonData, ITag } from '../../models/project'; 
import ProjectCard from '../project-card/project-card';
import ProjectButton from '../project-button/project-button';
interface IProps {
    projects: Array<IProject>,
    tags: Array<ITag>
}
export default component$(({ projects, tags } : IProps) => {

  return (
    <div class="project-list rounded-t-xl" style="overflow:hidden;">
      {projects.map((project : IProject, index : number) => {
        return <ProjectCard
          title={project.title}
          titleLink={project.buttons.at(-1)?.link}
          summary={project.summary}
          thumbnail={project.thumbnail}
          tags={project.tags}
          tagData={tags}
          color={index + 1}
        >
          {project.buttons.map((entry : IProjectButtonData, index : number) => {
            return <ProjectButton
              data={entry}
              color={index}
            >{entry.prefix} <strong>{entry.locationName}</strong></ProjectButton>
          })}
        </ProjectCard>
      })}
      <a href="/projects" class="p-5 inline-block hover:underline">View more &raquo;</a>
    </div>
  );
});
