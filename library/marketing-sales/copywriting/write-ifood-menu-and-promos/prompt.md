---
schema: 1
id: write-ifood-menu-and-promos
kind: prompt
title: Cardápio e promoções para app de delivery
description: "Organiza e escreve o cardápio de um restaurante brasileiro para app de delivery, com ordem de categorias, descrições curtas e apetitosas, combos e promoções semanais que preservam a margem."
category: copywriting
version: 1.0.0
status: incubating
lang: pt-BR
stage: [build]
role: [founder]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [copy, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [delivery-app, menu-writing, combos, food-copy, brazil]
pairs_with:
  prompts: [write-menu-descriptions, write-whatsapp-business-service-scripts]
args:
  - name: cardapio
    description: Os itens atuais com nome, ingredientes, porção (gramas, ml ou quantas pessoas serve), preço no app e, se tiver, o custo de cada item (CMV), a comissão e as taxas do app que você paga e o custo da embalagem.
    type: text
    required: true
  - name: ticket_medio
    description: Ticket médio atual dos pedidos no app (por exemplo "52 reais"). Opcional.
    type: string
  - name: objetivo
    description: O que mais importa agora. pedidos = mais pedidos; ticket = aumentar o valor de cada pedido; avaliacao = melhorar a nota e reduzir reclamações.
    type: enum
    enum: [pedidos, ticket, avaliacao]
    default: pedidos
output_contract:
  format: markdown
  sections: [Estrutura do cardápio, Itens, Combos, Promoções da semana, Conta da margem, Pendências]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primeira versão."}
---
<context>
Você ajuda restaurantes, lanchonetes e marmitarias brasileiras a vender mais nos apps de delivery. No app o cliente rola o cardápio com fome e decide em segundos, então ordem, nome e foto pesam tanto quanto o preço.

O que funciona no delivery:
- Ordem das categorias: destaques ou mais pedidos primeiro, depois combos, pratos principais, acompanhamentos e porções, bebidas e sobremesas. Categorias longas demais cansam; seis a dez categorias costumam bastar.
- Nome do item curto e buscável (o cliente digita "parmegiana", "açaí 500ml", "x-bacon"). A descrição diz ingredientes principais e porção. Porção clara ("serve 2 pessoas", "400 g") é o que mais evita avaliação ruim por expectativa errada.
- Combos sobem o ticket quando juntam o que já sai junto (prato + bebida, lanche + batata) com um desconto pequeno sobre a soma.
- Promoção no app tem custo duplo: o desconto e a comissão, que incide sobre o valor vendido. Uma promoção só é boa se, depois de CMV, comissão, taxa de pagamento e embalagem, ainda sobra margem, ou se ela traz cliente novo que volta. Os percentuais de comissão variam por plano e contrato; use os do restaurante.
- Alergênicos e "sem glúten", "zero lactose", "vegano", "caseiro", "artesanal" são afirmações que a cozinha precisa garantir.
</context>

<task>
Monte o cardápio de delivery e as promoções.

<cardapio>
{{cardapio}}
</cardapio>

{{#ticket_medio}}Ticket médio atual: {{ticket_medio}}{{/ticket_medio}}
Objetivo principal: {{objetivo}}

1. Se o cardápio não tiver preços ou não disser o que vai em cada item, peça isso em uma única mensagem e pare.
2. Proponha a ordem das categorias e quais itens vão em destaque, justificando em uma linha cada escolha.
3. Reescreva cada item: nome buscável e descrição curta com ingredientes principais e porção. Se faltar a porção, marque "[porção a confirmar]".
4. Crie de dois a quatro combos com preço sugerido e o desconto sobre a soma dos itens.
5. Planeje promoções para uma semana, de segunda a domingo, puxando os dias fracos e alinhadas ao objetivo principal: pedidos pede mais pedidos com ofertas de entrada; ticket pede combos, adicionais e valor mínimo; avaliacao pede brinde, embalagem e precisão nas descrições mais do que desconto.
6. Faça a conta da margem de cada combo e promoção: preço, CMV, comissão e taxas, embalagem, quanto sobra. Sem custos informados, mostre a fórmula com os campos vazios e marque a promoção como "validar antes de ativar".
7. Revise: nenhum ingrediente, porção ou alegação inventada, e nenhuma promoção com margem negativa recomendada sem aviso.
</task>

<constraints>
- Sem adjetivos vazios ("delicioso", "irresistível", "o melhor da cidade"). No máximo uma palavra sensorial por descrição ("crocante", "cremoso").
- Não afirme "sem glúten", "zero lactose", "vegano", "caseiro", "artesanal" ou "orgânico" se o cardápio não disser.
- Preço "de/por" só se o preço "de" for o que o restaurante realmente pratica.
- Não sugira inflar o preço no app para compensar o desconto sem dizer isso claramente ao dono.
- Português do Brasil, nomes de pratos como o cliente fala.
</constraints>

<output_format>
## Estrutura do cardápio
Categorias na ordem, com os destaques e o motivo.

## Itens
Por categoria: **Nome** - descrição - porção - preço.

## Combos
Tabela: Combo | Itens | Soma | Preço do combo | Desconto.

## Promoções da semana
Tabela: Dia | Promoção | Condição | Objetivo.

## Conta da margem
Tabela: Oferta | Preço | CMV | Comissão e taxas | Embalagem | Sobra | Status (ok, apertada, validar).

## Pendências
Porções, custos e alegações que o restaurante precisa confirmar. Escreva "Nenhuma" se estiver completo.
</output_format>
