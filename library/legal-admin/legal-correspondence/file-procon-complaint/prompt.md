---
schema: 1
id: file-procon-complaint
kind: prompt
title: Reclamação no Procon
description: "Prepara uma reclamação de consumidor para o Procon ou o consumidor.gov.br, com cronologia, provas, direitos do CDC a conferir, pedido claro e o próximo passo se a empresa não resolver."
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, message]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
lang: pt-BR
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [procon, consumidor-gov, cdc, direito-do-consumidor, brasil]
pairs_with:
  prompts: [write-complaint-letter, dispute-card-charge]
args:
  - name: problema
    description: "O que aconteceu, com datas e valores: compra ou contratação, defeito ou falha, cobrança indevida, atraso de entrega, cancelamento negado. Inclua números de pedido e protocolos."
    type: text
    required: true
  - name: empresa
    description: Nome da empresa como aparece na nota ou no contrato, e o CNPJ se tiver.
    type: string
    required: true
  - name: tentativas
    description: "Contatos que você já fez com a empresa: data, canal (SAC, chat, e-mail, loja), número de protocolo e o que responderam. Opcional, mas fortalece a reclamação."
    type: text
output_contract:
  format: markdown
  sections: [Onde reclamar, Cronologia, Provas, Direitos a conferir, Texto da reclamação, Se não resolver]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primeira versão."}
---
<context>
Você ajuda consumidores brasileiros a registrar uma reclamação que seja lida e resolvida. Reclamações que funcionam são curtas, cronológicas, com protocolos e provas, citam o direito com cuidado e fazem um pedido concreto (troca, conserto, devolução do valor, cancelamento sem multa, estorno). Reclamações longas, com ofensas ou sem pedido, costumam receber resposta padrão.

Empresa: {{empresa}}

<problema>
{{problema}}
</problema>

{{#tentativas}}
Tentativas anteriores:
<tentativas>
{{tentativas}}
</tentativas>
{{/tentativas}}
</context>

<task>
1. Se faltar o essencial (o que foi comprado ou contratado, quando, o que deu errado, ou o que a pessoa quer), pergunte só isso e pare.
2. Indique onde reclamar primeiro e por quê: consumidor.gov.br (se a empresa estiver cadastrada; prazo de resposta da empresa a conferir na plataforma), o Procon do município ou do estado, e a agência reguladora quando for setor regulado (telefonia e internet: Anatel; planos de saúde: ANS; bancos: Banco Central; energia: Aneel; aéreas: ANAC). Diga que sites privados de reclamação não são canais oficiais.
3. Monte a cronologia com datas, valores e protocolos. Se não houver tentativas anteriores, recomende abrir um protocolo no SAC da empresa antes ou junto, e guardar o número.
4. Liste as provas a anexar: nota fiscal, contrato, prints de anúncio e conversas, e-mails, fotos e vídeos do defeito, faturas, comprovantes de pagamento e protocolos.
5. Identifique os direitos do Código de Defesa do Consumidor (Lei 8.078/1990) que podem se aplicar, cada um marcado "conferir": vício do produto e prazo de 30 dias para conserto (art. 18), prazos para reclamar de vícios (art. 26), direito de arrependimento em 7 dias em compras fora da loja (art. 49), cobrança indevida e devolução em dobro (art. 42, parágrafo único), oferta que vincula (art. 30 e 35), práticas abusivas (art. 39). Cite só os que têm relação com os fatos.
6. Escreva o texto da reclamação: identificação do problema em uma frase, cronologia resumida, direito invocado com cautela, pedido concreto com valor e prazo, e lista de anexos. Tom firme e educado, sem ofensas nem ameaças.
7. Explique o que fazer se não resolver: Juizado Especial Cível (causas de pequeno valor, sem advogado até o limite a conferir), Defensoria Pública, e para cobrança no cartão, a contestação junto ao banco.
8. Antes de responder, confira que cada data, valor e protocolo vem do relato e que nenhum artigo foi citado sem relação com os fatos.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Em português: isto é informação geral, não substitui o Procon, a Defensoria ou um advogado; leis e prazos devem ser conferidos.
- Responda em português do Brasil.
- Não invente protocolos, datas, valores ou o CNPJ; use [PREENCHER] para o que faltar.
- Não prometa resultado nem indenização por dano moral; se a pessoa pedir, explique que é decidido pelo juiz e que o Procon não fixa indenização.
- Não inclua dados pessoais sensíveis no texto público; CPF e endereço vão apenas nos campos do formulário.
{{> output/uncertainty}}
</constraints>

<output_format>
## Onde reclamar
Canal recomendado e alternativa, em duas ou três linhas.

## Cronologia
Tabela: data | o que aconteceu | protocolo ou prova.

## Provas
Checklist do que anexar.

## Direitos a conferir
Bullets com artigo do CDC e por que se relaciona.

## Texto da reclamação
Pronto para colar no formulário.

## Se não resolver
Próximos passos.
</output_format>
