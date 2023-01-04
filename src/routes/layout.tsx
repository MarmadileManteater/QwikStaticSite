import { component$, Slot, useStyles$ } from '@builder.io/qwik'
import Header from '../components/header/header'
import InvidiousVideoBackground from '../components/invidious-video-background/invidious-video-background'
import highlightjs from 'highlight.js/styles/vs2015.css?inline'
import Footer from '~/components/footer/footer'

export default component$(() => {
  useStyles$(highlightjs)

  return (
    <>
      <div class='flex flex-col' style='min-height: 100vh;'>
        <div class='wrapper' style='flex:1;display: flex;flex-direction: column; position: relative;'>
          <InvidiousVideoBackground videoId='XvtpXPbbiVA' itag='136' />
          <Header />
          <main style='width:1000px;max-width:100%;margin-left:auto;margin-right:auto; display: flex; flex-direction: column; flex: 1;'>
            <section style='flex: 1; display: flex; flex-direction: column; position: relative;'>
              <Slot />
            </section>
          </main>
        </div>
        <footer style='position:relative; display: flex; flex-direction: column-reverse;'>
          <Footer />
        </footer>
      </div>
    </>
  )
})
