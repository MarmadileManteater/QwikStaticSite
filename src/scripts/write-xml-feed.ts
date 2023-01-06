
import { getAllBlogPostsSorted, getBlogRSSFeed } from '../dataservice/blog-posts'
import { writeFileSync, mkdirSync }  from 'fs'

try {
  mkdirSync('./public/blog')
} catch (_) { (() => {})() }

writeFileSync('./public/blog/rss.xml', getBlogRSSFeed(getAllBlogPostsSorted()))
