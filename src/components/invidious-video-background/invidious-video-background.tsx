import { component$, Slot, useClientEffect$, useStylesScoped$, useStore, useTask$, $ } from '@builder.io/qwik'
import { isBrowser } from '@builder.io/qwik/build'
import scoped from './invidious-video-background.css?inline'

interface IProps {
  videoId: string,
  server?: string,
  itag?: string
}

export default component$(({videoId, server = 'http://invidious.sethforprivacy.com', itag = '22' } : IProps) => {
  useStylesScoped$(scoped)
  const store = useStore({
    videoId: videoId,
    server: server,
    itag: itag,
    videoUrl: '',// computed
    invidiousUrl: '',// computed
    video: {}// HTMLVideoElement
  })
  // subscribe videoUrl and invidiousUrl to the changes of all the props
  useTask$(({track}) => {
    track(() => store.videoId)
    track(() => store.server)
    track(() => store.itag)
    // will run when the component mounts and every time urls need to change
    store.videoUrl = `${store.server}/latest_version?id=${store.videoId}&itag=${store.itag}&local=true`
    store.invidiousUrl = `${store.server}/watch?v=${store.videoId}`
  })
  const invidiousInstanceList = [
    'https://invidious.sethforprivacy.com',
    'https://invidious.namazso.eu',
    'https://yt.artemislena.eu'
  ]
  useClientEffect$(() => {
    const onFirstInteraction = () => {
      // this will only run once store.video is a node, 
      // but 🤷‍♀️IDK how to talk about that on the server because
      // all the HTML classes are undefined
      // what is the default() for HTMLVideoElement?
      // null doesn't work
      if (typeof((store.video as any).nodeName) !== 'undefined') {
        const element = store.video as HTMLVideoElement
        const timeUpdate = () => {
          if (element.currentTime > 3) {
            element.setAttribute('data-active', 'true')
            element.removeEventListener('timeupdate', timeUpdate)
          }
        }
        const onError = async () => {
          console.warn(`Issue loading from instance '${server}'; attempting another . . . `)
          try {
            let tryServer = store.server
            while (tryServer === store.server) {
              tryServer = invidiousInstanceList[Math.ceil(invidiousInstanceList.length * Math.random()) - 1]
            }
            store.server = tryServer
            if (isBrowser) {
              // in the browser, play the video whenever it's attributes change
              new MutationObserver((_, observer) => {
                element.play()
                observer.disconnect()
              }).observe(element, { attributes: true, characterData: false, characterDataOldValue: false, childList: false })
            }
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
        cleanUp()
        element.play()
      }
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
      <video ref={$((video : Element) => { store.video = video as HTMLVideoElement })} loop src={store.videoUrl} >
        <Slot/>
      </video>
      <a href={store.invidiousUrl} class='hover:underline text-blue text-blue-600 dark:text-red-300' >Watch this video on 📺Invidious</a>
    </>
  )
})
