import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { cwd } from 'node:process'

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let rawBody = ''

    request.on('data', (chunk) => {
      rawBody += chunk
    })

    request.on('end', () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {})
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })

const sendJson = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

const stripReasoningText = (value) =>
  typeof value === 'string'
    ? value
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/<think>[\s\S]*/gi, '')
        .trim()
    : value

const sanitizeAiPayload = (payload) => {
  const choices = Array.isArray(payload?.choices) ? payload.choices : []

  choices.forEach((choice) => {
    const content = choice?.message?.content

    if (typeof content === 'string') {
      choice.message.content = stripReasoningText(content) || content
    }

    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (typeof item?.text === 'string') {
          item.text = stripReasoningText(item.text) || item.text
        }

        if (typeof item?.content === 'string') {
          item.content = stripReasoningText(item.content) || item.content
        }
      })
    }
  })

  return payload
}

const deepseekProxyPlugin = (env) => ({
  name: 'deepseek-ai-proxy',
  configureServer(server) {
    server.middlewares.use('/api/ai/chat', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }

      const apiKey = env.DEEPSEEK_API_KEY
      const endpoint = env.DEEPSEEK_ENDPOINT

      if (!apiKey || apiKey.startsWith('replace_with_') || !endpoint) {
        sendJson(response, 500, {
          error:
            'Missing DEEPSEEK_API_KEY or DEEPSEEK_ENDPOINT. Add them to .env.local and restart npm run dev.',
        })
        return
      }

      try {
        const body = await readJsonBody(request)

        if (!Array.isArray(body.messages)) {
          sendJson(response, 400, { error: 'messages must be an array' })
          return
        }

        const upstreamResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            ...(env.DEEPSEEK_MODEL ? { model: env.DEEPSEEK_MODEL } : {}),
            messages: body.messages,
            temperature: body.temperature ?? 0.35,
            max_tokens: body.max_tokens ?? 1400,
          }),
        })

        const upstreamText = await upstreamResponse.text()
        const upstreamContentType = upstreamResponse.headers.get('content-type') || 'application/json'
        response.statusCode = upstreamResponse.status

        if (upstreamContentType.includes('application/json')) {
          try {
            const payload = sanitizeAiPayload(JSON.parse(upstreamText))
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(payload))
            return
          } catch {
            response.setHeader('Content-Type', upstreamContentType)
            response.end(upstreamText)
            return
          }
        }

        response.setHeader('Content-Type', upstreamContentType)
        response.end(upstreamText)
      } catch (error) {
        sendJson(response, 500, {
          error: error instanceof Error ? error.message : 'Unable to call AI endpoint',
        })
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')

  return {
    plugins: [react(), deepseekProxyPlugin(env)],
  }
})
