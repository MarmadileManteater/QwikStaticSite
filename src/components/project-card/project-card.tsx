import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import { ITag } from '../../models/project'
import styles from './project-card.css?inline'

interface IProps {
    title: string
    titleLink?: string
    summary?: string
    thumbnail: string
    tags: Array<string>
    tagData: Array<ITag>
    index?: number
}

export default component$(({ title, titleLink, summary, thumbnail, tags, tagData, index = 0 } : IProps) => {
  useStylesScoped$(styles)
  // Get the data for a tag by name
  const getTagData = (givenName : string) => {
    return tagData.find(({name}) => { return name === givenName })
  }
  
  // Get an array of tag data from an array of tag names
  const getTagArray = (tagArray : Array<string>) : Array<ITag|undefined> => {
    const dataArray = []
    for (let i = 0; i < tagArray.length; i++) {
      dataArray.push(getTagData(tagArray[i]))
    }
    return dataArray
  }
  return (
    <div class={`project-card md:pt-0 pt-4 outer-grid ${index % 2 === 0?'bg-zinc-100':'bg-white'} ${index % 2 === 0?'dark:bg-zinc-800':'dark:bg-zinc-900'} dark:text-white`}>
      <div class='p-4 pr-0 image-grid'>
        <a href={titleLink}><img src={thumbnail} alt={title} /></a>
      </div>
      <div class='p-4 pl-4'>
        {getTagArray(tags).map((tag : ITag|undefined) => {
          if (!tag) return
          return <a href={tag.link} target='_blank' ><span class={[tag.name, 'align-top', 'hover:underline', 'p-2', 'bg-zinc-200', 'dark:bg-zinc-700', 'dark:text-white', 'rounded-xl', 'mr-3','mb-2','mt-2', 'inline-block']}>{tag.name}</span></a>
        })}
        <a href={titleLink} class='hover:underline'><h2 class={`font-bold text-2xl mb-4 ${title.search(' ') === -1?'break-all':'break-words'}`}>{title}</h2></a>
        <p class='mb-3'>{summary}</p>
        <Slot />
      </div>
    </div>
  )
})
