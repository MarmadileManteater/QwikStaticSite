import { component$, Slot, useStore, useTask$ } from '@builder.io/qwik'
import { IProject, ITag } from '@marmadilemanteater/gh-static-site-lib/src/models/project'
import UnifiedContentList from '../unified-content-list/unified-content-list'

interface IProps {
  projects: Array<IProject>
  tagData: Array<ITag>
  sortType?: string,
  clientSideSorting?: boolean
}

export default component$(({ projects, tagData, sortType = 'featured', clientSideSorting = true } : IProps) => {
  const state = useStore({
    projectsSorted: projects,
    sortType: sortType
  })

  useTask$(({track}) => {
    track(() => state.sortType)
    switch (state.sortType) {
    case 'featured':
      state.projectsSorted = projects.map(p => p)
      break
    case 'lastUpdate':
      state.projectsSorted = projects.map(p => p).sort((a, b) => { return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime() })
      break
    }
  })

  return (
    <div class='project-list'>
      {clientSideSorting?<>
        <a class={`${state.sortType === 'featured'?'decoration-solid underline cursor-default':'cursor-pointer'} select-none p-4 inline-block`} onClick$={() => { state.sortType = 'featured' }}>Sort by featured</a>
        <a class={`${state.sortType === 'lastUpdate'?'decoration-solid underline cursor-default':'cursor-pointer'} select-none p-4 inline-block`} onClick$={() => { state.sortType = 'lastUpdate' }}>Sort by last updated</a>
      </>:<></>}
      <Slot />
      <UnifiedContentList {...{ content: state.projectsSorted, tagData: tagData, startIndex: 0 }} />
    </div>
  )
})
