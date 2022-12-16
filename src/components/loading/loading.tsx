
import { component$ } from '@builder.io/qwik'
import Image from '../image/image'
import loadingImage from '../../images/loading.gif'

export default component$(() => {
  return (
    <>
      <Image src={loadingImage} alt='a demon waiting; loading animation' style='padding-top: 20px; padding-bottom: 20px; image-rendering: pixelated; width: 128px; display: block; margin-left: auto; margin-right: auto' />
      <div style='text-align: center;padding-bottom: 30px'>Loading . . .</div>
    </>
  )
})
