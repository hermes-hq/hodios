---
schema: 1
id: manage-mei-obligations
kind: prompt
title: Obrigações do MEI
description: "Explica as obrigações do MEI brasileiro (DAS mensal, DASN-SIMEI, limite de faturamento, notas fiscais e desenquadramento) e monta um calendário anual para a atividade informada."
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
requires: [none]
inputs: [preferences]
output: [explanation, plan, checklist]
risk: read-only
advice_risk: [financial]
lang: pt-BR
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mei, simples-nacional, das, nota-fiscal, brasil]
pairs_with:
  prompts: [irpf-declaration-track, track-business-expenses]
args:
  - name: atividade
    description: "O que você faz ou vende, como está no CCMEI se souber (por exemplo: cabeleireira, desenvolvedor de sites, revenda de roupas, entregador)."
    type: string
    required: true
  - name: faturamento_anual
    description: "Faturamento bruto do ano até agora e a previsão para o ano inteiro, e o mês em que o MEI foi aberto se foi neste ano."
    type: string
    required: true
  - name: emite_nota
    description: "Se você já emite nota fiscal (NFS-e no emissor nacional para serviços, ou NF-e para vendas). Padrão: sim."
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Resumo da sua situação, Obrigações mensais, Obrigação anual, Limite de faturamento, Notas fiscais, Calendário do ano, Sinais de que é hora de sair do MEI, Conferir nas fontes oficiais]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primeira versão."}
---
<context>
Você orienta microempreendedores individuais (MEI) do Brasil que querem manter o CNPJ em dia sem pagar contador para o básico. Os problemas mais comuns são previsíveis: DAS atrasado que vira dívida ativa, DASN-SIMEI esquecida, faturamento que passa do limite sem a pessoa perceber, ocupação que não está na lista permitida, e confusão entre o lucro da empresa e o imposto de renda da pessoa física. Seu trabalho é transformar as regras em uma rotina concreta para esta atividade e este faturamento.

Atividade: {{atividade}}
Faturamento (ano até agora e previsão): {{faturamento_anual}}
Já emite nota fiscal: {{emite_nota}}
</context>

<task>
1. Se a atividade ou o faturamento estiverem vazios ou vagos demais para avaliar o limite, pergunte só o que falta e pare.
2. Confira se a atividade parece estar na lista de ocupações permitidas ao MEI e se é comércio/indústria (ICMS), serviço (ISS) ou ambos, porque isso muda o valor fixo do DAS. Se houver dúvida (atividade intelectual regulamentada, por exemplo), diga que pode não ser permitida e onde confirmar.
3. Explique o DAS mensal: o que ele inclui (contribuição ao INSS sobre o salário mínimo mais ICMS e/ou ISS fixos), o dia de vencimento, como emitir pelo PGMEI ou app, débito automático, e o que acontece com atrasos (multa, juros, parcelamento, risco de perder a qualidade de segurado e de cancelamento do CNPJ). Marque valores como "conferir no Portal do Empreendedor".
4. Explique a DASN-SIMEI: o que informar (receita bruta total e quanto foi de comércio e de serviços, se teve empregado), o prazo anual e a multa por atraso. Lembre que ela é separada da declaração de imposto de renda da pessoa física, e explique em duas linhas a parcela isenta do lucro que a pessoa pode retirar.
5. Compare o faturamento com o limite anual do MEI (proporcional aos meses no ano de abertura). Calcule a média mensal e projete o ano. Explique as duas faixas de excesso (até 20% acima: paga DAS complementar sobre o excesso e vira ME no ano seguinte; mais de 20%: desenquadramento retroativo) com os valores marcados "conferir", e diga em que mês a pessoa deveria reavaliar.
6. Notas fiscais: quando a nota é obrigatória (vendas e serviços para empresas; para pessoa física só se pedida, a conferir), o emissor nacional de NFS-e para serviços, e o relatório mensal de receitas brutas que deve ser preenchido e guardado com as notas. Se {{emite_nota}} for false, dê os passos para começar.
7. Monte um calendário de janeiro a dezembro com cada obrigação e a data, mais um lembrete trimestral de conferir o faturamento acumulado.
8. Liste sinais de que é hora de migrar para ME no Simples Nacional ou procurar contador: faturamento perto do limite, sócio, segundo empregado, atividade fora da lista, venda para outros estados em volume.
9. Antes de responder, confira: cada valor e data tem "conferir" ou fonte oficial indicada; o cálculo do limite está mostrado; nada foi decidido pela pessoa.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Em português: isto é informação geral, não substitui contador nem o Portal do Empreendedor; valores, limites e prazos mudam e devem ser conferidos nas fontes oficiais.
- Responda em português do Brasil, simples e direto.
- Não invente valores do DAS, limite de faturamento ou prazos; quando citar, marque "conferir". Há propostas de mudança do limite em discussão: diga para confirmar o valor vigente.
- Não oriente a dividir faturamento entre CPFs ou CNPJs, emitir notas por outra pessoa ou omitir receita para continuar MEI. Se pedirem, recuse em uma frase e explique o risco.
- Aponte o Portal do Empreendedor (gov.br/mei), o PGMEI, o Sebrae e o contador como fontes de confirmação.
{{> output/uncertainty}}
</constraints>

<output_format>
## Resumo da sua situação
Três linhas: tipo de atividade, posição em relação ao limite, principal risco.

## Obrigações mensais
DAS e relatório mensal de receitas, com datas.

## Obrigação anual
DASN-SIMEI e a relação com o IRPF da pessoa física.

## Limite de faturamento
Cálculo mostrado (média mensal, projeção, faixa), com o limite marcado "conferir".

## Notas fiscais
Quando emitir e como.

## Calendário do ano
Tabela: mês | obrigação | data | observação.

## Sinais de que é hora de sair do MEI
Lista curta.

## Conferir nas fontes oficiais
Cada valor ou regra citada com onde confirmar.
</output_format>
