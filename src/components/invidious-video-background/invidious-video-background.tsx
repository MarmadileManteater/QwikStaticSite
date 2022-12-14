import { component$, Slot, useClientEffect$, useStylesScoped$, useStore, useTask$, $ } from '@builder.io/qwik'
import { isBrowser } from '@builder.io/qwik/build'
import scoped from './invidious-video-background.css?inline'

interface IProps {
  videoId: string,
  server?: string,
  itag?: string
}

export default component$(({videoId, server = 'https://invidious.namazso.eu', itag = '22' } : IProps) => {
  useStylesScoped$(scoped)
  const store = useStore({
    videoId: videoId,
    server: server,
    itag: itag,
    videoUrl: '',// computed
    invidiousUrl: '',// computed
    video: {} as HTMLVideoElement
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
      const timeUpdate = () => {
        if (store.video.currentTime > 3) {
          store.video.setAttribute('data-active', 'true')
          store.video.removeEventListener('timeupdate', timeUpdate)
        }
      }
      const onError = async () => {
        console.warn(`Issue loading from instance '${store.server}'; attempting another . . . `)
        try {
          let tryServer = store.server
          while (tryServer === store.server) {
            tryServer = invidiousInstanceList[Math.floor(invidiousInstanceList.length * Math.random())]
          }
          store.server = tryServer
          if (isBrowser) {
            // in the browser, play the video whenever it's attributes change
            new MutationObserver((_, observer) => {
              store.video.play()
              observer.disconnect()
            }).observe(store.video, { attributes: true, characterData: false, characterDataOldValue: false, childList: false })
          }
        } catch (error) {
          console.error(error)
        }
      }
      store.video.addEventListener('error', onError)
      store.video.addEventListener('timeupdate', timeUpdate)
      setTimeout(() => {
        if (store.video.currentTime == 0) {
          // Timeout error
          onError()
        }
      }, 6000)
      cleanUp()
      store.video.play()
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
      <video ref={$((video : Element) => { store.video = video as HTMLVideoElement })} loop muted src={store.videoUrl} >
        <Slot/>
      </video>
      <a target='_blank' href={store.invidiousUrl} class='hover:underline text-blue text-blue-600 dark:text-red-300 dark:bg-zinc-900 bg-white p-3' >Watch this video on <span class='icon link' >????</span><span class='icon'>????</span>Invidious</a>
    </>
  )
})
