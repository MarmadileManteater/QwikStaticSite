import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import tags from '../data/tags.json';
import projectsData from '../data/projects.json';
import ProjectPreview from '../components/preview-projects/preview-projects';
import portrait from '../images/portrait.png';
import favicon from '../images/favicon.ico';
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

      <div class="flex" style="justify-content: center;">
        <div class="bg-white dark:bg-zinc-900 rounded-xl mb-3 p-5 w-1/2 mr-3">
          <div class="flex">
            <img src={portrait} class="mr-4" style="max-height:80px" />
            <div>
              <p>Hello! I'm MarmadileManteater. My real name is Emma, and you can look it up. That's an actual picture of me! <a href="mailto:marmadilemanteater@proton.me" class="inline-block hover:underline text-blue-600 dark:text-red-300">📭Email me</a></p>
              
            </div>
          </div>
          
          
        </div>
        <div class="bg-white dark:bg-zinc-900 rounded-xl mb-3 p-5 w-1/4">
          <ul>
            <li><a href="https://github.com/MarmadileManteater/" target="_blank" class="pr-4 mr-4 block hover:underline text-blue-600 dark:text-red-300">👩‍💻 GitHub</a></li>
            <li><a href="https://marmadilemanteater.itch.io/" target="_blank" class="pr-4 mr-4 block hover:underline text-blue-600 dark:text-red-300">🕹 itch.io</a></li>
            <li><a href="https://opengameart.org/users/marmadilemanteater" target="_blank" class="pr-4 mr-4 block hover:underline text-blue-600 dark:text-red-300">🎨 OpenGameArt</a></li>
          </ul>
        </div>
      </div>
      <div class="bg-white dark:bg-zinc-900 rounded-t-xl">
        <ProjectPreview projects={getProjects()} tags={tags} ></ProjectPreview>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'MarmadileManteater',
  links: [{
    rel: 'icon',
    href: favicon,
    type: 'image/png',
    sizes: '250x250'
  }]
};
