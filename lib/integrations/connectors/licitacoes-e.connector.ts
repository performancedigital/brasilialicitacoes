import { IConnector, FetchResult, NormalizedBidding, ConnectorHealth } from '../core/connector.interface'

// STUB - licitacoes-e.com.br BB
// Para implementar: pesquisar API/scraping disponivel
export class LicitacoesEConnector implements IConnector {
  readonly sourceCode = 'licitacoes-e'
  async fetchIncremental(_cursor: string | null, _ws: Date, _we: Date): Promise<FetchResult> {
    return { records: [], nextCursor: null, total: 0 }
  }
  normalize(_record: unknown): NormalizedBidding | null { return null }
  validate(_n: NormalizedBidding): boolean { return false }
  async healthCheck(): Promise<ConnectorHealth> { return { ok: false, latencyMs: 0, message: 'Stub - nao implementado' } }
}
