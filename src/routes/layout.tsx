import { component$, Slot, useStore, useStyles$, useVisibleTask$ } from '@builder.io/qwik'
import Header from '../components/header/header'
import highlightjs from 'highlight.js/styles/vs2015.css?inline'
import Footer from '~/components/footer/footer'
import GodotSceneBackground from '~/components/godot-scene-background/godot-scene-background'
import InvidiousVideoBackground from '~/components/invidious-video-background/invidious-video-background'

export default component$(() => {
  useStyles$(highlightjs)
  const store = useStore({
    loadGodot: false
  })
  useVisibleTask$(() => {
    if (!(('ontouchstart' in window) && window.innerWidth < 768)) {
      // don't load the godot background on touch devices with small screens
      // because they are more likely to be on mobile networks with a worse connection
      // and more likely to load godot with a significant performance penalty
      store.loadGodot = true
    }
  })

  return (
    <>
      <div class='flex flex-col min-h-screen' data-semi-transparent={store.loadGodot?'true':'false'}>
        <div class='wrapper flex-1 flex flex-col relative' >
          {store.loadGodot?<>
            <GodotSceneBackground sceneUrl='/godot_background/index.html' />
          </>:<>
            <InvidiousVideoBackground videoId='1t54WpT-aus' itag='136' />
          </>}
          
          <Header />
          <main class='max-w-full ml-auto mr-auto flex flex-col flex-1 ' style='width:1000px;' >
            <section class='flex-1 flex flex-col relative' >
              <Slot />
            </section>
          </main>
        </div>
        <footer class='relative flex flex-col-reverse' >
          <Footer loadedGodot={store.loadGodot}/>
        </footer>

      </div>
    </>
  )
})
