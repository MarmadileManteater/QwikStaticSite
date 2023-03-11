import { component$ } from '@builder.io/qwik'
import { DocumentHead, Link } from '@builder.io/qwik-city'
import tags from '~/../data/tags.json'
import projectsData from '~/../data/projects.json'
import ProjectList from '../../../components/project-list/project-list'
import favicon from '../../../images/favicon.ico'
import { IProject } from '@marmadilemanteater/gh-static-site-lib/src/models/project'
export default component$(() => {

  return (
    <div class='bg-white dark:bg-zinc-900 rounded-t-xl border-t lg:border border-solid border-black'>
      <ProjectList projects={projectsData as Array<IProject>} tagData={tags} clientSideSorting={false} sortType='lastUpdate'>
        <Link class={'cursor-pointer select-none p-4 inline-block'} href='/projects'>Sort by featured</Link>
        <a class={'decoration-solid underline cursor-default select-none p-4 inline-block'} >Sort by last updated</a>
      </ProjectList>
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
