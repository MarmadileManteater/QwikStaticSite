
import { getAllBlogPostsSorted, getBlogRSSFeed } from '@marmadilemanteater/gh-static-site-lib/dist/dataservice/blog-posts.js'
import { writeFileSync, mkdirSync }  from 'fs'

try {
  mkdirSync('./data/public/blog')
} catch (_) { (() => {})() }

writeFileSync('./data/public/blog/rss.xml', getBlogRSSFeed(getAllBlogPostsSorted()))
