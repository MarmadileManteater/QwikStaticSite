import { IBlogPost } from '../models/blog'
import fs from 'fs'
import child_process from 'child_process'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'
import hljs from 'highlight.js'
export function getAllBlogPostIds() : string[] {
  const { readdirSync } = fs
  return readdirSync('./data/posts')
    .filter((post) => post.endsWith('.html'))
    .map((post) => post.substring(0, post.length - 5))
    .reverse()
}

export function getBlogPostById(postId: string) : IBlogPost {
  const { statSync, readFileSync } = fs
  const { execSync } = child_process
  // 📈Retrive the file stats
  const stats = statSync(`./data/posts/${postId}.html`)
  // 📄Retrieve the file contents
  const post =  readFileSync(`./data/posts/${postId}.html`).toString()
  let gitDate
  try {
    // 👩‍💻Retrieve the last modification date known by git
    const gitDateResult = execSync(`cd ./data/ && git log -1 -p ./posts/${postId}.html`)
    gitDate = Date.parse(Array.from(gitDateResult.toString().matchAll(/Date: {3}([A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4} [-+][0-9]{4})/g))[0][1])
  } catch (err) {
    console.warn(`no git date found for ${postId}; falling back to using file date; this happens when a file does not have any history with git`)
    // no git date found, falling back to using file date
    gitDate = stats.ctimeMs
  }
  // 🧹Parse the HTML and remove the metadata from the markup
  const parser = new DOMParser()
  const postMarkup = parser.parseFromString(post, 'text/html')
  // Get the title
  const titleElement = postMarkup.getElementById('title')
  const title = titleElement?.childNodes[0].textContent
  postMarkup.removeChild(titleElement as Node)
  // Get the short description
  const shortDescriptionElement = postMarkup.getElementById('short-description')
  const shortDescription = shortDescriptionElement?.childNodes[0].textContent
  postMarkup.removeChild(shortDescriptionElement as Node)
  // Get the tags
  const tagsElement = postMarkup.getElementById('tags')
  const tagElements = Array.from(tagsElement?.childNodes?tagsElement?.childNodes:[]).filter((node : ChildNode) => node.textContent?.trim() !== '')
  const tags = Array.from(tagElements?tagElements:[]).map((tag) => tag.textContent)
  postMarkup.removeChild(tagsElement as Node)
  // Return a well-formatted object
  Array.from(postMarkup.getElementsByTagName('code')).map((element) => {
    const htmlFormattedCode = hljs.highlightAuto(element.textContent as string).value
    const newElement = parser.parseFromString(`<div><div>${htmlFormattedCode}</div></div>`).firstChild?.childNodes[0]
    if (newElement && element.parentNode) {
      element.parentNode.insertBefore(newElement, element)
      element.parentNode.removeChild(element)
    }
  })
  return {
    id: postId,
    html: new XMLSerializer().serializeToString(postMarkup),
    title,
    shortDescription,
    tags,
    ctime: stats.ctimeMs,
    atime: stats.atimeMs,
    mtime: stats.mtimeMs,
    gittime: gitDate,
    type: 'IBlogPost'
  } as IBlogPost
}
