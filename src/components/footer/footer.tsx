
import { component$ } from '@builder.io/qwik'
import Emoji from '../emoji/emoji'
import qwikPackage from '../../../qwik/packages/qwik/package.json'

interface IProps {
  loadedGodot?: boolean
}

export default component$(({loadedGodot = false} : IProps) => {
  return <div class='flex bg-black p-5 block lg:mt-5 w-full 2xl:justify-between 2xl:flex-row flex-col text-white '>
    <div >
      <p><a href='https://mutant.tech/' target='_blank' class='hover:underline dark:text-red-300 text-blue-300' rel='noreferrer' >Mutant Standard</a> emoji by <a href='https://dzuk.zone/' class='hover:underline dark:text-red-300 text-blue-300' target='_blank' rel='noreferrer'>Dzuk</a>, are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank' class='hover:underline dark:text-red-300 text-blue-300' rel='noreferrer'>CC BY-NC-SA 4.0 International</a>.</p>
      <p><em class='text-zinc-400'>Mutant Standard does not fully cover all of the emoji in the Unicode 14.0 spec, so Twemoji is used as a fallback for emoji not present in Mutant Standard.</em></p>
      <p><a href='https://twemoji.twitter.com/' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300'>Twemoji</a> emoji by <a href='https://github.com/twitter' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300'>Twitter, Inc and other contributors</a> are licensed under <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300'>CC BY 4.0 International</a>.</p>
      {loadedGodot?<><p><a href='https://godotengine.org/' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300'>Godot</a> is licensed <a href='https://godotengine.org/license/' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300'>under the MIT license</a>.</p></>:<></>}
    </div>
    <div class='flex flex-col justify-end 2xl:ml-5 2xl:mt-0 mt-5 ml-0'>
      <div class='inline' >
        Made with <Emoji emoji='♥' /> and 
        <span class='xl:whitespace-nowrap'>
          <a href='https://github.com/BuilderIO/qwik/releases/tag/v0.21.0' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300 ml-2 whitespace-nowrap'><Emoji emoji='⚡'/>Qwik v{qwikPackage.version}</a><a href='https://github.com/MarmadileManteater/qwik' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300 '>* <span class='3xl:hidden 2xl:contents hidden'>(modified)</span><span class='2xl:hidden'>(with some slight modifications)</span></a> 
        </span>
      </div>
      <div class='xl:mt-0 mt-3'>
        <a href='https://github.com/MarmadileManteater/QwikStaticSite' target='_blank' rel='noreferrer' class='hover:underline dark:text-red-300 text-blue-300'>View source &raquo;</a>
      </div>
    </div>
  </div>
})
