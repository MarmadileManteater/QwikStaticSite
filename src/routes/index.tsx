import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import tags from '../data/tags.json'
import projectsData from '../data/projects.json'
import ProjectPreview from '../components/project-preview/project-preview'
import Image from '../components/image/image'
import portrait from '../images/portrait.png'
import favicon from '../images/favicon.ico'
import demon from '../images/drink-coffee-hail-satan.png'
export default component$(() => {

  const getProjects = () => {
    const topFeatured = projectsData[0]
    const sortedData = projectsData.map(p => p).sort((a, b) => { return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime() })
    let lastUpdated = null
    let i = 0
    while (lastUpdated === null && i < sortedData.length) {
      if (sortedData[i].title !== topFeatured.title) {
        lastUpdated = sortedData[i]
      }
      i++
    }
    if (lastUpdated === null)
      return [topFeatured]
    return [topFeatured, lastUpdated]
  }

  return (
    <>

      <div class='md:flex' style='justify-content: center; position: relative'>
        <div class='bg-white dark:bg-zinc-900 rounded-t-xl md:rounded-xl md:mb-3 p-5 mr-3 md:w-1/2 w-full'>
          <div class='sm:flex'>
            <Image src={portrait} alt='a picture of me' class='w-1/4 mr-auto ml-auto mt-1 mb-4 sm:mb-0 sm:mr-4 sm:w-20 sm:mt-0'  />
            <div>
              <p class='text-xl md:text-base'>Hello! I'm MarmadileManteater. My real name is Emma, and you can look it up. That's an actual picture of me! <a href='mailto:marmadilemanteater@proton.me' class='inline-block hover:underline text-blue-600 dark:text-red-300'>📭Email me</a></p>
            </div>
          </div>
        </div>
        <div class='bg-zinc-100 md:rounded-xl dark:bg-zinc-800 md:bg-white md:dark:bg-zinc-900 md:mb-3 p-5 md:w-1/4 w-full'>
          <ul>
            <li><a href='https://github.com/MarmadileManteater/' target='_blank' class='md:text-base text-xl pr-4 mr-4 block hover:underline hover:bg-zinc-200 hover:dark:bg-zinc-700 text-blue-600 dark:text-red-300 pb-2 pt-2 md:p-0'>👩‍💻 GitHub</a></li>
            <li><a href='https://marmadilemanteater.itch.io/' target='_blank' class='md:text-base text-xl pr-4 mr-4 block hover:underline hover:bg-zinc-200 hover:dark:bg-zinc-700 text-blue-600 dark:text-red-300 pb-2 pt-2 md:p-0'>🕹 itch.io</a></li>
            <li><a href='https://opengameart.org/users/marmadilemanteater' target='_blank' class='md:text-base text-xl pr-4 mr-4 block hover:underline hover:bg-zinc-200  hover:dark:bg-zinc-700 text-blue-600 dark:text-red-300 pb-2 pt-2 md:p-0'>🎨 OpenGameArt</a></li>
            <li><a rel='me' href='https://mastodon.gamedev.place/@emma' target='_blank' class='md:text-base text-xl pr-4 mr-4 block hover:underline hover:bg-zinc-200  hover:dark:bg-zinc-700 text-blue-600 dark:text-red-300 pb-2 pt-2 md:p-0'>💬 Mastodon</a></li>
          </ul>
        </div>
      </div>
      <div class='bg-white dark:bg-zinc-900 md:rounded-t-xl'>
        <ProjectPreview projects={getProjects()} tagData={tags} ></ProjectPreview>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'MarmadileManteater',
  links: [{
    rel: 'icon',
    href: favicon,
    type: 'image/png',
    sizes: '250x250'
  }]
}
