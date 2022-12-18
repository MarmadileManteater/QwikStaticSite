import { IBlogPost } from '../models/blog'
import fs from 'fs'
import child_process from 'child_process'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

export function getAllBlogPostIds() : string[] {
  const { readdirSync } = fs
  return readdirSync('./src/data/posts')
    .filter((post) => post.endsWith('.html'))
    .map((post) => post.substring(0, post.length - 5))
}

export function getBlogPostById(postId: string) : IBlogPost {
  const { statSync, readFileSync } = fs
  const { execSync } = child_process
  // 📈Retrive the file stats
  const stats = statSync(`./src/data/posts/${postId}.html`)
  // 📄Retrieve the file contents
  const post =  readFileSync(`./src/data/posts/${postId}.html`).toString() 
  // 👩‍💻Retrieve the last modification date known by git
  const gitDateResult = execSync(`git log -1 -p ./src/data/posts/${postId}.html`)
  const gitDate = Date.parse(Array.from(gitDateResult.toString().matchAll(/Date: {3}([A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} [0-9]{4} [-+][0-9]{4})/g))[0][1])
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
  return {
    id: postId,
    html: new XMLSerializer().serializeToString(postMarkup),
    title,
    shortDescription,
    tags,
    ctime: stats.ctimeMs,
    atime: stats.atimeMs,
    mtime: stats.mtimeMs,
    gittime: gitDate
  } as IBlogPost
}
