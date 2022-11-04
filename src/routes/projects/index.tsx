import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import tags from '../../data/tags.json';
import projects from '../../data/projects.json';
import ProjectList from '../../components/project-list/project-list';

export default component$(() => {

  return (
    <ProjectList projects={projects} tags={tags} ></ProjectList>
  );
});

export const head: DocumentHead = {
  title: 'Projects',
};
