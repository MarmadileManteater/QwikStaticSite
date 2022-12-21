import { component$ } from '@builder.io/qwik'
import { IBlogPost } from '~/models/blog'
import { IProject, IProjectButtonData, ITag } from '~/models/project'
import ContentCard from '../content-card/content-card'
import ProjectButton from '../project-button/project-button'


interface IProps {
  content: Array<IBlogPost|IProject>,
  tagData: Array<ITag>,
  startIndex?: number,
}

export default component$(({content, tagData, startIndex = 1} : IProps) => {
  return <>
    {(typeof(content.map) === 'function'?content:[]).map((contentItem, i) => {
      switch(contentItem.type) {
      case 'IProject':
        const project = contentItem as IProject
        const { title, buttons, summary, thumbnail, tags} = project
        const titleLink = buttons.at(-1)?.link
        return <>
          <ContentCard
            key={`project-card-${i}`}
            {...{title, titleLink, summary, thumbnail, tags, tagData, index: i + startIndex }}
          >
            {project.buttons.map((entry : IProjectButtonData, buttonIndex : number) => {
              const { link, target } = entry
              return <ProjectButton
                key={`project-button-${i + startIndex}-${buttonIndex}`}
                {...{ link, target, index: buttonIndex }}
              >{entry.prefix} <strong>{entry.locationName}</strong></ProjectButton>
            })}
          </ContentCard>
        </>
      case 'IBlogPost':
        const post = contentItem as IBlogPost
        return <>
          <ContentCard {...{ title: post.title, titleLink: `/blog/${post.id}`, summary: post.shortDescription, tags: post.tags, index: i + startIndex, tagData }} >
            <p class='pb-2 text-zinc-500 dark:text-zinc-400'><em>Last updated {new Date(post.gittime).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'GMT' })} GMT</em></p>
          </ContentCard>
        </>
      default:
        return
      } 
    })}
  </>
})
