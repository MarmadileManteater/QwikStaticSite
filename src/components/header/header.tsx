import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import styles from './header.css?inline'
/* import headerImage from '../../images/marmadilemanteater.png' */

export default component$(() => {
  useStylesScoped$(styles)
  return (
    <header>
      <Link href='/'>
        <h2 class='z-1 relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl p-8 text-center pb-10'>
          <span class='red text-outline text-blue-500 drop-shadow-lg'>Marmadile</span> 
          <span class='green text-outline text-blue-400'>Manteater</span>
        </h2>
      </Link>
      {/* <img src={headerImage} style='margin-left: auto; margin-right: auto;' /> */}
    </header>
  )
})
