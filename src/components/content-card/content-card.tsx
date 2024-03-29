import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { ITag } from '@marmadilemanteater/gh-static-site-lib/src/models/project'
import styles from './content-card.css?inline'
import Image from '../image/image'
import TagList from '../tag-list/tag-list'
import { convertEmojiToImages } from '@marmadilemanteater/gh-static-site-lib/src/helpers/emoji'

interface IProps {
    title: string
    titleLink?: string
    summary?: string
    thumbnail?: string
    tags: Array<string>
    tagData: Array<ITag>
    index?: number
}

export default component$(({ title, titleLink, summary, thumbnail, tags, tagData, index = 0 } : IProps) => {
  useStylesScoped$(styles)
  // damn you qwik and your refusal to propogate reactivity 
  // without establishing these objects as variables
  const imageTagArgs = { src: thumbnail?thumbnail:'', title: title }
  const tagListArgs = { tags: tags, tagData: tagData }
  return (
    <div class={`content-card md:pt-0 ${thumbnail?'pt-4':'pt-0'} outer-grid ${index % 2 === 0?'bg-zinc-100':''} ${index % 2 === 0?'dark:bg-zinc-800':''} dark:text-white`}>
      {thumbnail?<>
        <div class='p-4 pr-0 image-grid'>
          <a href={titleLink}><Image {...imageTagArgs} class='inline-block' style='max-height: 153px; max-width: 182px' /></a>
        </div> 
      </>:<></>}
      <div class='p-4 pl-4'>
        <TagList {...tagListArgs} />
        
        <Link href={titleLink} class='hover:underline'><h2 class={`font-bold text-2xl mb-4 ${title.search(' ') === -1?'break-all':'break-words'}`} dangerouslySetInnerHTML={convertEmojiToImages(title)}></h2></Link>
        <p class='mb-3' dangerouslySetInnerHTML={convertEmojiToImages(summary as string)}></p>
        <Slot />
      </div>
    </div>
  )
})
