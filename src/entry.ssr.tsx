/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, RenderToStreamOptions } from '@builder.io/qwik/server'
import { manifest } from '@qwik-client-manifest'
import { getAllBlogPostsSorted, getBlogRSSFeed } from './dataservice/blog-posts'
import Root from './root'
import fs from 'fs'

export default function (opts: RenderToStreamOptions) {
  // hacky, but it works 🤷‍♀️
  try {
    fs.mkdirSync('./dist/blog')
    fs.writeFileSync('./dist/blog/rss.xml', getBlogRSSFeed(getAllBlogPostsSorted()))
  } catch (error){
    console.error(error)
  }
  
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    prefetchStrategy: {
      implementation: {
        linkInsert: null,
        workerFetchInsert: null,
        prefetchEvent: 'always',
      },
    },
  })
}
