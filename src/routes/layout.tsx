import { $, component$, Slot, useStore, useStyles$ } from '@builder.io/qwik'
import Header from '../components/header/header'
import highlightjs from 'highlight.js/styles/vs2015.css?inline'
import Footer from '~/components/footer/footer'
import GodotSceneBackground from '~/components/godot-scene-background/godot-scene-background'
import InvidiousVideoBackground from '~/components/invidious-video-background/invidious-video-background'
import Emoji from '~/components/emoji/emoji'

export default component$(() => {
  useStyles$(highlightjs)
  const store = useStore({
    loadGodot: false
  })

  const loadGodot = $(() => {
    store.loadGodot = true
  })

  return (
    <>
      <div class='flex flex-col min-h-screen' data-semi-transparent='true'>
        <div class='wrapper flex-1 flex flex-col relative' >
          {store.loadGodot?<>
            <GodotSceneBackground sceneUrl='/godot_background/index.html' />
          </>:<>
            <InvidiousVideoBackground videoId='1t54WpT-aus' itag='136' />
            <a class='text-white fixed top-2 right-5 z-10 hover:underline cursor-pointer hidden lg:inline' onClick$={loadGodot}>Load <Emoji emoji='🤖' />Godot background scene in browser</a>
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
