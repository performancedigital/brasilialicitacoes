export default function AIConfigPage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-4">Configuração IA</h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 space-y-4">
        <p>
          O chat e o resumo de editais usam IA. A plataforma já vem com a <strong className="text-white">Groq</strong> (gratuita)
          como padrão; a <strong className="text-white">OpenAI</strong> assume automaticamente quando houver créditos.
        </p>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Groq (padrão, gratuito)</p>
          <p className="text-sm">
            Crie a chave em{' '}
            <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">
              console.groq.com/keys
            </a>{' '}
            e adicione no Vercel como{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded text-white">GROQ_API_KEY</code>.
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">OpenAI (opcional)</p>
          <p className="text-sm">
            Para usar GPT, adicione créditos em{' '}
            <a href="https://platform.openai.com/account/billing" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">
              platform.openai.com/billing
            </a>{' '}
            e configure{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded text-white">OPENAI_API_KEY</code>.
          </p>
        </div>

        <p className="text-xs text-gray-500">
          Sem nenhuma chave, o chat ainda responde com os dados reais de cada edital (prazo, valor, órgão, etc.).
        </p>
      </div>
    </div>
  )
}
