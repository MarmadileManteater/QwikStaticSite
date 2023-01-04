import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import tags from '~/../data/tags.json'
import projectsData from '~/../data/projects.json'
import ProjectList from '../../components/project-list/project-list'
import favicon from '../../images/favicon.ico'
import { IProject } from '~/models/project'
export default component$(() => {

  return (
    <div class='bg-white dark:bg-zinc-900 rounded-t-xl border-t lg:border border-solid border-black'>
      <ProjectList projects={projectsData as Array<IProject>} tagData={tags} ></ProjectList>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Projects',
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
      content: 'my projects; 🤷‍♀️i guess'
    }
  ]
}
