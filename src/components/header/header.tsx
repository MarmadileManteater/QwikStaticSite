import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './header.css'
/* import headerImage from '../../images/marmadilemanteater.png' */

export default component$(() => {
  useStylesScoped$(styles)
  return (
    <header>
      <h2 class='text-4xl sm:text-6xl md:text-7xl lg:text-8xl p-8 text-center pb-10'>
        <span class='red text-outline text-red-500 drop-shadow-lg'>Marmadile</span> 
        <span class='green text-outline text-green-500'>Manteater</span>
      </h2>
      {/* <img src={headerImage} style='margin-left: auto; margin-right: auto;' /> */}
    </header>
  )
})
