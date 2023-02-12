
import { component$ } from '@builder.io/qwik'
//import Image from '../image/image'
//import loadingImage from '../../images/loading.gif'

export default component$(() => {
  return (
    <>
      {/* <Image src={loadingImage} alt='a demon waiting; loading animation' style='padding-top: 20px; padding-bottom: 20px; image-rendering: pixelated; width: 128px; display: block; margin-left: auto; margin-right: auto' /> */}
      <div class='bg-white dark:bg-zinc-900 rounded-t-xl md:mb-3 p-5 mr-3 md:w-1/2 w-full md:border border-solid border-black border-t' style='position: absolute; width: 100%; height: 100%; text-align: center;padding-bottom: 60px;padding-top: 60px; display: flex; flex-direction: column; justify-content: center;'>Loading . . .</div>
    </>
  )
})
