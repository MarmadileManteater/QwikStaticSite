import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { readdirSync } from 'fs'
export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    define: {
      emojiDirectory: {
        mutantstd: Array.from(readdirSync('public/emoji/mutantstd')),
        twemoji: Array.from(readdirSync('public/emoji/twemoji'))
      }
    }
  };
});
