
import { getAllBlogPostsSorted, getBlogRSSFeed } from '../dataservice/blog-posts'
import { writeFileSync }  from 'fs'

writeFileSync('./rss.xml', getBlogRSSFeed(getAllBlogPostsSorted()))
