import { component$, Slot, useStyles$ } from '@builder.io/qwik'
import Header from '../components/header/header'
import InvidiousVideoBackground from '../components/invidious-video-background/invidious-video-background'
import highlightjs from 'highlight.js/styles/vs2015.css?inline'

export default component$(() => {
  useStyles$(highlightjs)
  return (
    <>
      <InvidiousVideoBackground videoId='XvtpXPbbiVA' itag='136' />
      <Header />
      <main style='width:1000px;max-width:100%;margin-left:auto;margin-right:auto;'>
        <section>
          <Slot />
        </section>
      </main>
      <footer>

      </footer>
    </>
  )
})
