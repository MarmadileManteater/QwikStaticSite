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
          <span class='section1'><span class='colour1 text-outline text-red-400 drop-shadow-lg'>Marma</span><span class='colour2 text-outline text-green-400 drop-shadow-lg'>dile</span></span>
          
          <span class='section2'><span class='colour2 text-outline text-green-400 drop-shadow-lg'>M</span><span class='colour3 text-outline text-blue-400'>anteater</span></span>
        </h2>
      </Link>
      {/* <img src={headerImage} style='margin-left: auto; margin-right: auto;' /> */}
    </header>
  )
})
