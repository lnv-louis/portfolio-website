import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })

const logs = []
page.on('console', (msg) => {
  const text = msg.text()
  logs.push(`${msg.type()}: ${text}`)
})
page.on('pageerror', (err) => {
  logs.push(`pageerror: ${err.message}`)
})

await page.goto('http://localhost:3000')
await page.waitForTimeout(3000)

// Screenshot of the full page
await page.screenshot({ path: '/Users/louiss/Programming/Projects/portfolio-website/scripts/debug-pdf-full.png', fullPage: true })

// Get the PDF viewer element bounding box and dimensions
const pdfViewer = await page.$('[data-slot="pdf-viewer"]')
if (pdfViewer) {
  const box = await pdfViewer.boundingBox()
  console.log('PDF viewer bounding box:', JSON.stringify(box))
  const height = await pdfViewer.evaluate((el) => el.clientHeight)
  const width = await pdfViewer.evaluate((el) => el.clientWidth)
  console.log('PDF viewer client size:', { width, height })
}

const scrollViewport = await page.$('[data-slot="scroll-area-viewport"]')
if (scrollViewport) {
  const box = await scrollViewport.boundingBox()
  console.log('Scroll viewport bounding box:', JSON.stringify(box))
  const height = await scrollViewport.evaluate((el) => el.clientHeight)
  const width = await scrollViewport.evaluate((el) => el.clientWidth)
  console.log('Scroll viewport client size:', { width, height })
}

const pdfContent = await page.$('[data-slot="pdf-viewer-scroll-content"]')
if (pdfContent) {
  const box = await pdfContent.boundingBox()
  console.log('PDF scroll content bounding box:', JSON.stringify(box))
}

console.log('--- Console logs ---')
console.log(logs.join('\n'))

await browser.close()
