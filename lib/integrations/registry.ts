import { IConnector } from './core/connector.interface'
import { PncpConnector } from './connectors/pncp.connector'
import { ComprasnetConnector } from './connectors/comprasnet.connector'

const registry: Record<string, IConnector> = {
  pncp: new PncpConnector(),
  comprasnet: new ComprasnetConnector(),
  // Demais portais estaduais removidos por falta de API pública confiável.
}

export function getConnector(sourceCode: string): IConnector {
  const connector = registry[sourceCode]
  if (!connector) {
    throw new Error(`Conector nao encontrado para source: ${sourceCode}`)
  }
  return connector
}

export function getAllConnectors(): Record<string, IConnector> {
  return registry
}

export function listSourceCodes(): string[] {
  return Object.keys(registry)
}
