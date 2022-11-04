import { component$, Slot } from '@builder.io/qwik';
import { ITag } from '../../models/project'

interface IProps {
    title: string;
    titleLink?: string;
    summary?: string;
    thumbnail: string;
    tags: Array<string>;
    tagData: Array<ITag>;
}

export default component$(({ title, titleLink, summary, thumbnail, tags, tagData } : IProps) => {
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
    <div class="flex">
      <div class="p-4 pr-0">
        <a href={titleLink}><img src={thumbnail} alt={title} /></a>
      </div>
      <div class="p-4 pl-4">
        {getTagArray(tags).map((tag : ITag|undefined) => {
          if (!tag) return
          return <a href={tag.link} target="_blank" ><span class={[tag.name, 'p-2', 'bg-gray-100', 'rounded-xl', 'm-2', 'inline-block']}>{tag.name}</span></a>
        })}
        <a href={titleLink}><h2 class="font-bold text-2xl mb-4">{title}</h2></a>
        <p class="mb-3">{summary}</p>
        <Slot />
      </div>
    </div>
  );
});
