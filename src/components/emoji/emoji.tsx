
import { component$ } from '@builder.io/qwik'
import { convertEmojiToImages } from '@marmadilemanteater/gh-static-site-lib/src/helpers/emoji'

interface IProps {
  emoji: string
}

export default component$(({emoji} : IProps) => {
  return <>
    <span dangerouslySetInnerHTML={convertEmojiToImages(emoji)}></span>
  </>
})
