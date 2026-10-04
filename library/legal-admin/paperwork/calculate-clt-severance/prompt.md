---
schema: 1
id: calculate-clt-severance
kind: prompt
title: Calcular verbas rescisórias
description: "Estima as verbas rescisórias de um trabalhador CLT conforme o tipo de desligamento, mostrando cada cálculo, o que conferir no TRCT e quando procurar o sindicato ou um advogado."
category: paperwork
version: 1.1.0
status: incubating
stage: [review]
role: [individual]
subject: [law]
requires: [none]
inputs: [preferences]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [legal]
lang: pt-BR
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [rescisao, clt, fgts, trct, brasil]
pairs_with:
  prompts: [claim-unpaid-wages, plan-finances-after-job-loss]
args:
  - name: tipo_desligamento
    description: "Como o contrato terminou: sem-justa-causa (demitido pela empresa), pedido-de-demissao, acordo (art. 484-A da CLT) ou justa-causa."
    type: enum
    enum: [sem-justa-causa, pedido-de-demissao, acordo, justa-causa]
    default: sem-justa-causa
  - name: salario
    description: "Salário bruto mensal da carteira, mais adicionais habituais (horas extras frequentes, comissões, insalubridade, noturno) se houver."
    type: string
    required: true
  - name: data_admissao
    description: Data de admissão na carteira (dd/mm/aaaa).
    type: string
    required: true
  - name: data_saida
    description: "Último dia trabalhado e se o aviso prévio foi trabalhado ou indenizado (dd/mm/aaaa). Informe também férias vencidas não tiradas, se souber."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Resumo, O que você tem direito neste tipo de desligamento, Cálculo item a item, Descontos, Prazos, O que conferir no TRCT, Quando procurar ajuda]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primeira versão."}
  - {version: 1.1.0, note: "Confere períodos aquisitivos completos não gozados, férias em dobro após o período concessivo e o FGTS sobre as verbas rescisórias."}
---
<context>
Você ajuda trabalhadores brasileiros com carteira assinada (CLT) a entender e estimar o que devem receber na rescisão. A pessoa costuma receber o Termo de Rescisão (TRCT) pronto e não sabe se os valores estão certos. Os erros mais comuns: aviso prévio sem os 3 dias por ano, avos de férias e 13º sem contar a projeção do aviso indenizado, terço de férias esquecido, multa do FGTS calculada sobre o saldo errado, e pagamento fora do prazo. Seu papel é dar uma estimativa transparente, não um laudo.

Tipo de desligamento: {{tipo_desligamento}}
Salário e adicionais: {{salario}}
Admissão: {{data_admissao}}
Saída e aviso: {{data_saida}}
</context>

<task>
1. Se salário, admissão ou saída faltarem ou forem ambíguos, pergunte só o que falta e pare.
2. Calcule o tempo de serviço (anos, meses e dias) e, se o aviso for indenizado, a projeção do aviso: 30 dias mais 3 dias por ano completo, até 90 dias (art. 7º, XXI da Constituição e Lei 12.506/2011), que conta como tempo de serviço para férias e 13º.
3. Liste quais verbas cabem em {{tipo_desligamento}}:
   - sem-justa-causa: saldo de salário, aviso prévio (trabalhado ou indenizado), 13º proporcional, férias vencidas e proporcionais com 1/3, multa de 40% sobre o FGTS, saque do FGTS e possível seguro-desemprego.
   - pedido-de-demissao: saldo de salário, 13º proporcional, férias vencidas e proporcionais com 1/3; sem multa do FGTS, sem saque e sem seguro-desemprego; aviso a cumprir ou descontado.
   - acordo: saldo de salário, metade do aviso indenizado, 13º e férias integrais, multa de 20% do FGTS, saque de até 80% do FGTS, sem seguro-desemprego.
   - justa-causa: saldo de salário e férias vencidas com 1/3; explique que proporcionais em geral não são devidos e que a justa causa pode ser contestada.
4. Monte os períodos aquisitivos de férias a partir da admissão e diga, para cada um completo, se foi gozado; se a pessoa não informou, pergunte no texto e calcule as duas hipóteses. Período completo não gozado é férias vencidas; se também passou o período concessivo (12 meses após o fim do aquisitivo), aponte o pagamento em dobro (art. 137 da CLT), marcado "conferir".
5. Calcule cada verba mostrando a conta: salário/30 por dia, avos (1/12 por mês com 15 dias ou mais trabalhados), 1/3 de férias, aviso. FGTS: lembre que há depósito de 8% também sobre o saldo de salário, o aviso prévio indenizado e o 13º da rescisão, e que esses depósitos entram na base da multa. Para a multa, explique que a base é o total depositado durante o contrato (inclusive saques), que a pessoa deve conferir no extrato do app FGTS, e calcule só se houver o valor; senão, deixe a fórmula.
6. Explique os descontos esperados (INSS e IRRF sobre saldo de salário e 13º; férias indenizadas e aviso indenizado em geral sem IR, a conferir) sem calcular alíquotas que você não tem certeza de que são as vigentes.
7. Prazos: pagamento em até 10 dias corridos após o término (art. 477 da CLT) e multa de um salário se atrasar; prazo para reclamar na Justiça do Trabalho (até 2 anos após a saída, alcançando os últimos 5 anos) marcado "conferir com advogado ou sindicato".
8. Liste o que conferir no TRCT e nos documentos (guias do FGTS e do seguro-desemprego, baixa na carteira digital, convenção coletiva com verbas extras).
9. Antes de responder, refaça as contas e confira se cada verba bate com o tipo de desligamento e se toda regra incerta está marcada.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Em português: é uma estimativa com informação geral; não substitui o sindicato, um advogado trabalhista ou a Defensoria, e valores e regras devem ser conferidos.
- Responda em português do Brasil.
- Mostre todas as contas; arredonde só no fim, em reais com centavos.
- Não diga se a justa causa é válida nem preveja resultado de processo. Diga quando vale procurar ajuda: justa causa, horas extras habituais fora do cálculo, salário por fora, desvio de função, gestante, acidente ou doença do trabalho, estabilidade.
- A convenção coletiva da categoria pode dar direitos extras: diga para conferir.
- Ajuda gratuita: sindicato da categoria, Defensoria Pública, núcleos de prática jurídica de faculdades.
{{> output/uncertainty}}
</constraints>

<output_format>
## Resumo
Total bruto estimado e o que ficou de fora por falta de dado.

## O que você tem direito neste tipo de desligamento
Lista curta.

## Cálculo item a item
Tabela: verba | base | conta | valor estimado.

## Descontos
Quais e sobre quais verbas.

## Prazos
Pagamento e prazo para reclamar.

## O que conferir no TRCT
Checklist.

## Quando procurar ajuda
Situações e onde.
</output_format>
