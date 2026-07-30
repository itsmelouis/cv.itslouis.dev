import { copyFile, rename } from 'node:fs/promises'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { preview } from 'vite'

const outputPath = resolve('public/Louis-Floquet-CV.pdf')
const temporaryPath = `${outputPath}.tmp`
const server = await preview({
  logLevel: 'silent',
  preview: {
    host: '127.0.0.1',
    port: 4174,
    strictPort: false,
  },
})

const address = server.httpServer.address()
if (!address || typeof address === 'string') throw new Error('Unable to resolve the preview URL.')

const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage({
    colorScheme: 'light',
    locale: 'fr-FR',
    viewport: { width: 794, height: 1123 },
  })

  await page.goto(`http://127.0.0.1:${address.port}`, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.evaluate(() => document.fonts.ready)

  const pageCount = await page.locator('.pdf-page').count()
  if (pageCount !== 3) throw new Error(`Expected 3 A4 pages, found ${pageCount}.`)

  await page.pdf({
    path: temporaryPath,
    format: 'A4',
    displayHeaderFooter: false,
    outline: true,
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  })

  await rename(temporaryPath, outputPath)
  await copyFile(outputPath, resolve('dist/Louis-Floquet-CV.pdf'))
  console.log(`Created ${outputPath}`)
} finally {
  await browser.close()
  await new Promise((resolveClose, rejectClose) => {
    server.httpServer.close((error) => (error ? rejectClose(error) : resolveClose()))
  })
}
