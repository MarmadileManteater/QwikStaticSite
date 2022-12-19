import { component$, Slot } from '@builder.io/qwik'
import Header from '../components/header/header'
import InvidiousVideoBackground from '../components/invidious-video-background/invidious-video-background'

export default component$(() => {
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
