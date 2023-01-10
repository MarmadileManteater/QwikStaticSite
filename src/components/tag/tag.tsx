import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { ITag } from '@marmadilemanteater/gh-static-site-lib/src/models/project'
import style from './tag.css?inline'

export default component$(({name, link} : ITag) => {
  useStylesScoped$(style)
  return <a href={link} target='_blank' >
    <span class={[name, 'align-top', 'hover:underline', 'p-2', 'bg-zinc-200', 'dark:bg-zinc-700', 'dark:text-white', 'rounded-xl', 'mr-3','mb-2','mt-2', 'inline-block']}>{name}</span>
  </a>
})

 