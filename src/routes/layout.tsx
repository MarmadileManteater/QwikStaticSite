import { component$, Slot } from '@builder.io/qwik'
import Header from '../components/header/header'

export default component$(() => {
  return (
    <>
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
