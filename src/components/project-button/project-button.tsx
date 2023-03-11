import { component$, Slot } from '@builder.io/qwik'

interface IProps {
  link: string,
  target: string,
  index?: number
}

export default component$(({link, target, index = 0} : IProps) => {
  return (
    <a
      href={link}
      target={target}
      class={`p-3 inline-block hover:underline ${index % 2 === 0?'bg-blue-600':'bg-blue-900'} text-white dark:bg-zinc-600 rounded-lg mr-5 mb-3`}
    ><Slot /> &raquo;</a>
  )
})
