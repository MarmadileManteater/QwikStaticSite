
// @ts-ignore
import emojiUnicode from 'emoji-unicode'

export function emojiToOtherMoji (givenEmoji : string) : string {
  const unicode = emojiUnicode(givenEmoji).toLowerCase().replaceAll(' ', '-')
  return `https://twemoji.maxcdn.com/v/14.0.2/72x72/${unicode}.png`
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
    html = html.replace(new RegExp(`([^"]*)${emoji}`, 'g'), `$1<span class='inline-block emoji'><img src="${emojiToOtherMoji(emoji)}" alt="${emoji}" /></span>`)
  }
  return html
}
