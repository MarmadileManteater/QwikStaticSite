import { component$, Slot, useStyles$ } from '@builder.io/qwik'
import Header from '../components/header/header'
import InvidiousVideoBackground from '../components/invidious-video-background/invidious-video-background'
import highlightjs from 'highlight.js/styles/vs2015.css?inline'
import Footer from '~/components/footer/footer'

export default component$(() => {
  useStyles$(highlightjs)

  return (
    <>
      <div class='flex flex-col min-h-screen' >
        <div class='wrapper flex-1 flex flex-col relative' >
          <InvidiousVideoBackground videoId='XvtpXPbbiVA' itag='136' />
          <Header />
          <main class='max-w-full ml-auto mr-auto flex flex-col flex-1' style='width:1000px;' >
            <section class='flex-1 flex flex-col relative' >
              <Slot />
            </section>
          </main>
        </div>
        <footer class='relative flex flex-col-reverse' >
          <Footer />
        </footer>
      </div>
    </>
  )
})
