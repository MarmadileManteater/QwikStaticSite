
import { component$ } from '@builder.io/qwik'
import { convertEmojiToImages } from '~/helpers/emoji'

interface IProps {
  emoji: string
}

export default component$(({emoji} : IProps) => {
  return <>
    <span dangerouslySetInnerHTML={convertEmojiToImages(emoji)}></span>
  </>
})
