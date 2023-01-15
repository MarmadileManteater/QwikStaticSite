
import { component$ } from '@builder.io/qwik'
import { DocumentHead } from '@builder.io/qwik-city'
import favicon from '../images/favicon.ico'
import Emoji from '../components/emoji/emoji'

export default component$(() => {
  return <>
    <div class='bg-white dark:bg-zinc-900 rounded-t-xl border-t lg:border border-solid border-black p-6 pb-2'>
      <h2 class='font-bold text-4xl pb-4'><Emoji emoji='😭' /> 404 - Not Found</h2>
      <p class='pb-4 text-lg' >
        The page you have requested was not found.
      </p>
    </div>
  </>
})

export const head: DocumentHead = {
  title: '404 - Not Found',
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
      content: 'The page you have requested was not found.'
    }
  ]
}
