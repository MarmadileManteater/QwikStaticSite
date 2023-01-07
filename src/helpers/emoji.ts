
// @ts-ignore
import emojiUnicode from 'emoji-unicode'

export interface EmojiDirectory {
  mutantstd: string[],
  twemoji: string[]
}

export function getEmojiDirectory() : EmojiDirectory {
  // @ts-ignore emojiDirectory is defined globally in the vite.config.ts
  return emojiDirectory as EmojiDirectory
}

export function emojiToOtherMoji(givenEmoji : string) : string|undefined {
  const { mutantstd, twemoji } = getEmojiDirectory()
  let unicode = emojiUnicode(givenEmoji).toLowerCase().replaceAll(' ', '-')
  switch (unicode) {
  // special cases:
  case '1f937-200d-2640':// what this actually means is:
  case '1f926-200d-2640':
  case '1f470-200d-2640':
    unicode = `${unicode}-fe0f`
    break
  default:
    break
  }
  if (mutantstd.indexOf(`${unicode}.svg`) !== -1) {
    return `/emoji/mutantstd/${unicode}.svg`
  }
  if (twemoji.indexOf(`${unicode}.svg`) !== -1) {
    return `/emoji/twemoji/${unicode}.svg`
  }
  return
}

export function convertEmojiToImages(html : string) : string {
  interface EmojiMatch {
    unicode: string,
    emoji: string
  }
  // Convert to a set and back
  // 🤔 I can't figure out how to generalize matching the trans flag
  const emojiMatches = Array.from(html.matchAll(/🏳️‍⚧️|(\p{Emoji}(\u200d\p{Emoji})*)/gu))
  const listOfEmojiFound = emojiMatches.map((match) => {
    const unicode = emojiUnicode(match.at(0)).toLowerCase().replaceAll(' ', '-')
    return {
      index: match.index,
      unicode,
      emoji: match.at(0)
    }
  }).filter(({unicode}) => unicode.length > 2).map(({emoji, unicode}) => {
    return { emoji, unicode } as EmojiMatch
  })
  // Convert the list to a set because sets can't have duplicate entries
  const emojiFound = Array.from(new Set(listOfEmojiFound)).sort((a, b) => b.emoji.length - a.emoji.length)
  for (let i = 0; i < emojiFound.length; i++) {
    const { emoji, unicode } = emojiFound[i]
    const otherMoji = emojiToOtherMoji(emoji)
    let filter = ''
    if (otherMoji?.search('twemoji') !== -1) {
      filter = 'filter: grayscale(100%) contrast(0%) brightness(0) drop-shadow(1px 0px 0px black) drop-shadow(0px 1px 0px black) drop-shadow(0.9px 0.9px 0px black) drop-shadow(-0.9px -0.9px 0px black); position: absolute; transform: scale(1); z-index: 0; display: none;'
    }
    if (otherMoji)
      html = html.replace(new RegExp(`${emoji}`, 'g'), `<span class='inline-block emoji relative'><img src="${otherMoji}" alt="${unicode}" style="z-index:1; margin-right: 0.1em; ${filter?'transform: scale(0.95)':''};" width="20" height="20" />${filter?`<img src="${otherMoji}" class="filter" style="${filter}" />`:''}</span>`)
  }
  const sortedByUnicode = emojiFound.sort((a,b) => (b.unicode as string).length - (a.unicode as string).length)
  for (let i = 0; i < sortedByUnicode.length; i++) {
    const { emoji, unicode } = emojiFound[i]
    html = html.replaceAll(`alt="${unicode}"`, `alt="${emoji}"`)
  }
  return html
}
