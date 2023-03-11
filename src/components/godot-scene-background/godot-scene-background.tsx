import { component$ } from '@builder.io/qwik'
import Emoji from '../emoji/emoji'


interface IProps {
  sceneUrl: string;
}
export default component$(({ sceneUrl } : IProps) => {

  return <>
    <a href='https://godotengine.org/' target='_blank' class='pt-2 pl-2 hover:underline text-white z-10 md:absolute'>Background made with <Emoji emoji='🤖' />Godot</a>
    <iframe src={sceneUrl} class='w-screen h-screen fixed t-0 l-0 z-0'></iframe>
  </>
})
