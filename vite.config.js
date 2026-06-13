import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createDeepSeekChatResponse } from './api/ai/chat.js'

const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = ''

    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })

const localAiRoute = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    name: 'local-ai-route',
    configureServer(server) {
      server.middlewares.use('/api/ai/chat', async (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const body = await readRequestBody(req)
          const result = await createDeepSeekChatResponse(body, env.DEEPSEEK_API_KEY)

          res.statusCode = result.status
          res.end(JSON.stringify(result.data))
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Không gọi được AI endpoint'

          res.statusCode = 500
          res.end(JSON.stringify({ error: errorMessage }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), localAiRoute(mode)],
}))
