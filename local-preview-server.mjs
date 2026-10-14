import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const host = '127.0.0.1'
const port = 4173
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist')
const publicRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public')
const indexFile = path.join(root, 'index.html')
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.json', 'application/json; charset=utf-8'],
  ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'], ['.png', 'image/png'],
  ['.webp', 'image/webp'], ['.gif', 'image/gif'], ['.svg', 'image/svg+xml'],
  ['.mp4', 'video/mp4'], ['.webm', 'video/webm'], ['.woff', 'font/woff'], ['.woff2', 'font/woff2'],
])

if (!fs.existsSync(indexFile)) {
  console.error('dist/index.html was not found. Please rebuild the project with Codex.')
  process.exit(1)
}

const resolveRequest = (url = '/') => {
  let relative = decodeURIComponent(new URL(url, `http://${host}`).pathname).replace(/^\/+/, '')
  if (!relative) relative = 'index.html'
  const candidate = path.resolve(root, relative)
  if (!candidate.startsWith(`${root}${path.sep}`) && candidate !== indexFile) return null
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  const publicCandidate = path.resolve(publicRoot, relative)
  if (publicCandidate.startsWith(`${publicRoot}${path.sep}`) && fs.existsSync(publicCandidate) && fs.statSync(publicCandidate).isFile()) return publicCandidate
  return indexFile
}

const server = http.createServer((request, response) => {
  const file = resolveRequest(request.url)
  if (!file) { response.writeHead(403).end(); return }
  const stat = fs.statSync(file)
  const range = request.headers.range
  const headers = { 'Content-Type': mime.get(path.extname(file).toLowerCase()) || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' }
  let start = 0
  let end = stat.size - 1
  let status = 200
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range)
    if (match) {
      if (match[1]) start = Number(match[1])
      if (match[2]) end = Math.min(Number(match[2]), end)
      if (start > end || start >= stat.size) { response.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end(); return }
      status = 206
      headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`
    }
  }
  headers['Content-Length'] = end - start + 1
  response.writeHead(status, headers)
  if (request.method === 'HEAD') { response.end(); return }
  fs.createReadStream(file, { start, end }).pipe(response)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`A preview is already running at http://${host}:${port}/`)
    openBrowser()
    process.exit(0)
  }
  console.error(error)
  process.exit(1)
})

function openBrowser() {
  if (process.env.CODEX_PREVIEW_NO_OPEN === '1') return
  spawn('cmd.exe', ['/c', 'start', '', `http://${host}:${port}/`], { detached: true, stdio: 'ignore', windowsHide: true }).unref()
}

server.listen(port, host, () => {
  console.log(`Liang Peng portfolio preview: http://${host}:${port}/`)
  console.log('Close this window to stop the preview.')
  openBrowser()
})

