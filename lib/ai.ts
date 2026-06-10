import { createOpenAI } from '@ai-sdk/openai'

/**
 * IA do chat/resumos.
 * - OpenAI (GPT) e o primario QUANDO houver OPENAI_API_KEY com creditos.
 * - Groq (Llama, compativel com a API da OpenAI) e o padrao/fallback gratuito.
 * Sem nenhuma chave, as rotas caem no modo "dados reais do edital".
 */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

const openai = createOpenAI({ apiKey: OPENAI_API_KEY })
const groq = createOpenAI({ apiKey: GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' })

const OPENAI_MODEL = 'gpt-4o-mini'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

export const isAiConfigured = (): boolean => Boolean(OPENAI_API_KEY || GROQ_API_KEY)

/** Retorna o modelo de chat a usar (OpenAI se configurado, senao Groq), ou null. */
export function getChatModel() {
  if (OPENAI_API_KEY) return openai(OPENAI_MODEL)
  if (GROQ_API_KEY) return groq(GROQ_MODEL)
  return null
}
