const DEEPSEEK_CHAT_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const DEEPSEEK_MODEL = 'deepseek-v4-pro'

const readJsonBody = (body) => {
  if (!body) {
    return {}
  }

  if (typeof body === 'string') {
    return JSON.parse(body)
  }

  return body
}

const parseDeepSeekResponse = async (response) => {
  const rawText = await response.text()

  if (!rawText) {
    return {}
  }

  try {
    return JSON.parse(rawText)
  } catch {
    return { message: rawText }
  }
}

export const createDeepSeekChatResponse = async (body, apiKey = process.env.DEEPSEEK_API_KEY) => {
  if (!apiKey) {
    return {
      status: 500,
      data: { error: 'Thiếu DEEPSEEK_API_KEY trên server' },
    }
  }

  try {
    const payload = readJsonBody(body)
    const { messages, temperature, max_tokens: maxTokens, thinking } = payload

    if (!Array.isArray(messages)) {
      return {
        status: 400,
        data: { error: 'Thiếu messages hợp lệ' },
      }
    }

    const deepSeekResponse = await fetch(DEEPSEEK_CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        thinking: thinking || { type: 'disabled' },
        temperature: Number.isFinite(temperature) ? temperature : 0.35,
        max_tokens: Number.isFinite(maxTokens) ? maxTokens : 900,
        messages,
      }),
    })

    const data = await parseDeepSeekResponse(deepSeekResponse)

    if (!deepSeekResponse.ok) {
      const errorMessage = data?.error?.message || data?.message || 'Không gọi được DeepSeek'
      return {
        status: deepSeekResponse.status,
        data: { error: errorMessage },
      }
    }

    return {
      status: 200,
      data,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Không gọi được AI endpoint'
    return {
      status: 500,
      data: { error: errorMessage },
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const result = await createDeepSeekChatResponse(req.body)
  return res.status(result.status).json(result.data)
}
