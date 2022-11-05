import { component$, Slot } from '@builder.io/qwik';
import { IProjectButtonData } from '~/models/project';

interface IProps {
  data : IProjectButtonData
  color : number
}

export default component$(({data, color} : IProps) => {
  const { link, target } = data
  return (
    <a
      href={link}
      target={target}
      class={`p-3 inline-block hover:underline ${color % 2 === 0?'dark:bg-zinc-900':'dark:bg-zinc-700'} ${color % 2 === 0?'bg-blue-400':'bg-red-400'}  text-white dark:bg-zinc-600 rounded-lg mr-5 mb-3`}
    ><Slot /> &raquo;</a>
  )
})
