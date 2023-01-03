
import openmojiMap from 'openmoji/data/openmoji.json'
// @ts-ignore
import emojiUnicode from 'emoji-unicode'

export function emojiToOpenMoji (givenEmoji : string) : string {
  const unicode = emojiUnicode(givenEmoji).toUpperCase().replaceAll(' ', '-')
  let openmoji = openmojiMap.filter(({emoji,hexcode}) => { return emoji === givenEmoji || hexcode === unicode })
  if (openmoji.length === 0) {
    openmoji = openmojiMap.filter(({emoji}) => { return emoji.startsWith(givenEmoji) }).reverse()
  }
  return `http://192.168.1.208:8080/color/svg/${openmoji[0].hexcode}.svg`
}

export function convertEmojiToImages(html : string) : string {
  // Convert to a set and back
  const emojiMatches = Array.from(html.matchAll(/[\p{Emoji}\u200d]+/gu))
  const listOfEmojiFound = emojiMatches.map((match) => {
    return {
      index: match.index, 
      unicode: html.codePointAt(match.index as number)?.toString(16),
      emoji: match[0]
    }
  }).filter(({unicode}) => (unicode as string).length > 2).map(({emoji}) => emoji)
  // Convert the list to a set because sets can't have duplicate entries
  const emojiFound = Array.from(new Set(listOfEmojiFound))
  for (let i = 0; i < emojiFound.length; i++) {
    const emoji = emojiFound[i]
    html = html.replaceAll(emoji, `<span class='inline-block emoji'><img src="${emojiToOpenMoji(emoji)}" alt="${emoji}" /></span>`)
  }
  return html
}
