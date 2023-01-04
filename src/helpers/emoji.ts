
// @ts-ignore
import emojiUnicode from 'emoji-unicode'

export function emojiToOtherMoji (givenEmoji : string) : string {
  let unicode = emojiUnicode(givenEmoji).toLowerCase().replaceAll(' ', '-')
  switch (unicode) {
  // special cases:
  case '1f937-200d-2640':// what this actually means is:
    unicode = '1f937-200d-2640-fe0f'
    break
  default:
    break
  }
  return `https://twemoji.maxcdn.com/v/14.0.2/72x72/${unicode}.png`
}

export function convertEmojiToImages(html : string) : string {
  // Convert to a set and back
  // 🤔 I can't figure out how to generalize matching the trans flag
  const emojiMatches = Array.from(html.matchAll(/🏳️‍⚧️|(\p{Emoji}(\u200d\p{Emoji})*)/gu))
  const listOfEmojiFound = emojiMatches.map((match) => {
    const unicode = html.codePointAt(match.index as number)?.toString(16)
    return {
      index: match.index,
      unicode,
      emoji: match.at(0)
    }
  }).filter(({unicode}) => (unicode as string).length > 2).map(({emoji}) => emoji)
  // Convert the list to a set because sets can't have duplicate entries
  const emojiFound = Array.from(new Set(listOfEmojiFound))
  for (let i = 0; i < emojiFound.length; i++) {
    const emoji = emojiFound[i]
    //console.log(`<span class='inline-block emoji'><img src="${emojiToOtherMoji(emoji)}" alt="${emoji}" /></span>`)
    html = html.replace(new RegExp(`([^"]*)${emoji}`, 'g'), `$1<span class='inline-block emoji'><img src="${emojiToOtherMoji(emoji as string)}" alt="${emoji}" /></span>`)
  }
  return html
}
