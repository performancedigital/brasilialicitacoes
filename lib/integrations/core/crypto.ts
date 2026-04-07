import { createHash } from 'crypto'

export function sha256(data: unknown): string {
  const json = typeof data === 'string' ? data : JSON.stringify(data)
  return createHash('sha256').update(json, 'utf8').digest('hex')
}
