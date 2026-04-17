import { PrismaClient } from '@prisma/client'
import { runSync } from '../lib/integrations/core/engine.js'
import { PncpConnector } from '../lib/integrations/connectors/pncp.connector.js'

const p = new PrismaClient()

console.log('Testando sync PNCP corrigido...')
const connector = new PncpConnector()
const result = await runSync('pncp', connector)
console.log('Resultado:', JSON.stringify(result, null, 2))

const total = await p.bidding.count()
console.log(`Total no banco: ${total} editais`)
await p['\x24disconnect']()
