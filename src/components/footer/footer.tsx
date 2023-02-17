
import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return <div class='footer text-white bg-black p-5 block lg:mt-5 w-full'>
    <p><a href='https://mutant.tech/' target='_blank' class='hover:underline dark:text-red-300 text-blue-300' >Mutant Standard</a> emoji by <a href='https://dzuk.zone/' class='hover:underline dark:text-red-300 text-blue-300' target='_blank'>Dzuk</a>, are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank' class='hover:underline dark:text-red-300 text-blue-300'>CC BY-NC-SA 4.0 International</a>.</p>
    <p><em class='text-zinc-400'>Mutant Standard does not fully cover all of the emoji in the Unicode 14.0 spec, so Twemoji is used as a fallback for emoji not present in Mutant Standard.</em></p>
    <p><a href='https://twemoji.twitter.com/' target='_blank' class='hover:underline dark:text-red-300 text-blue-300'>Twemoji</a> emoji by <a href='https://github.com/twitter' target='_blank' class='hover:underline dark:text-red-300 text-blue-300'>Twitter, Inc and other contributors</a> are licensed under <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' class='hover:underline dark:text-red-300 text-blue-300'>CC BY 4.0 International</a>.</p>
  </div>
})