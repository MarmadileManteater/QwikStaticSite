
import { component$ } from '@builder.io/qwik'
import { ITag } from '@marmadilemanteater/gh-static-site-lib/src/models/project'
import Tag from '../tag/tag'

interface IProps {
  tags: Array<string>;
  tagData: Array<any>;
}


export default component$(({tags, tagData} : IProps) => {
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
  return <>
    {getTagArray(tags).map((tag : ITag|undefined, index : number) => {
      if (!tag) return
      return <Tag key={index} {...tag} />
    })}
  </>
})

 



