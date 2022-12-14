import { component$ } from '@builder.io/qwik'

interface IProps {
  src: string,
  alt?: string,
  style?: string,
  class?: string
}

export default component$((props : IProps) => {
  const {src, alt = undefined, style = undefined } = props
  const class_ = props['class']
  return (
    <img {...{ src, alt, title: alt, style, 'class': class_ }} />
  )
})
