import { component$, Slot, useClientEffect$, useStylesScoped$ } from '@builder.io/qwik'
import scoped from './invidious-video-background.css?inline'

interface IProps {
  videoId: string,
  server?: string,
  itag?: string
}
/*
// Commenting out the code for fetching instances from https://api.invidious.io/instances.json
// It is more helpful to just have a small curated list of instances that will *probably* work
// which I keep updated
interface InvidiousInstance {
  api: boolean,
  cors: boolean,
  uri: string
}
*/
export default component$(({videoId, server = 'https://invidious.namazso.eu', itag = '22' } : IProps) => {
  useStylesScoped$(scoped)
  /*
  const fetchInvidiousInstances = $(async () : Promise<InvidiousInstance[]> => {
    try {
      const invidiousInstanceList = await (await fetch('https://api.invidious.io/instances.json')).json()
      return invidiousInstanceList.filter((instance : Array<any>) => instance[1].api && instance[1].cors).map((instance : Array<any>) => instance[1])
    } catch (error) {
      console.warn(error)
      return new Array<InvidiousInstance>()
    }
  })
  */
  const invidiousInstanceList = [
    'https://invidious.sethforprivacy.com',
    'https://invidious.namazso.eu',
    'https://invidious.tiekoetter.com'
  ]

  // this is wrong, but I'm unsure how to ref an element correctly 🤔
  const id = `invidious-video-background-${videoId}-${Math.floor(Math.random() * 1000000)}`
  // also known as use 🦶🔫
  useClientEffect$(() => {
    const onFirstInteraction = () => {
      // this is wrong, but I'm unsure how to ref an element correctly 🤔
      const element = document.getElementById(id) as HTMLVideoElement
      if (element) {
        const timeUpdate = () => {
          if (element.currentTime > 3) {
            element.setAttribute('data-active', 'true')
            element.removeEventListener('timeupdate', timeUpdate)
          }
        }
        const onError = async () => {
          console.error(`Issue loading from instance '${server}'`)
          try {
            let tryServer = server
            while (tryServer === server) {
              tryServer = invidiousInstanceList[Math.ceil(invidiousInstanceList.length * Math.random()) - 1]
            }
            element.src = `${tryServer}/latest_version?id=${videoId}&itag=${itag}&local=true`            
            element.play()
          } catch (error) {
            console.error(error)
          }
        }
        element.addEventListener('error', onError)
        element.addEventListener('timeupdate', timeUpdate)
        setTimeout(() => {
          if (element.currentTime == 0) {
            // Timeout error
            onError()
          }
        }, 6000)
        element.play()
      }
      cleanUp()
    }
    const cleanUp = () => {
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('keypress', onFirstInteraction)
    }
    window.addEventListener('click', onFirstInteraction)
    window.addEventListener('keypress', onFirstInteraction)
  }, { eagerness: 'visible' })

  return (
    <>
      <video id={id} loop src={`${server}/latest_version?id=${videoId}&itag=${itag}&local=true`} >
        <Slot/>
      </video>
    </>
  )
})
