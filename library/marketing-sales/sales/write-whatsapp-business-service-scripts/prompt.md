---
schema: 1
id: write-whatsapp-business-service-scripts
kind: prompt
title: Roteiros de atendimento no WhatsApp
description: "Escreve as respostas rápidas do WhatsApp Business de um pequeno negócio brasileiro: saudação, ausência, catálogo, orçamento, Pix, entrega, pós-venda e reclamações, num tom caloroso e ágil."
category: sales
version: 1.0.0
status: incubating
lang: pt-BR
stage: [build]
role: [founder, sales-rep]
subject: [ecommerce]
requires: [none]
inputs: [text, notes]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [whatsapp-business, quick-replies, pix, chat-scripts, brazil]
pairs_with:
  prompts: [write-mercado-livre-listing, write-ifood-menu-and-promos]
args:
  - name: negocio
    description: O que o negócio vende ou faz, cidade ou região atendida, como entrega (retirada, motoboy, Correios), formas de pagamento aceitas, política de troca e o jeito de falar com o cliente (por exemplo "doceria de bairro, carinhosa, trata por você").
    type: text
    required: true
  - name: produtos
    description: Principais produtos ou serviços com preços, prazos de produção e pedido mínimo, se houver. Opcional; sem isso, os roteiros usam campos para preencher.
    type: text
  - name: horario
    description: Horário de atendimento (por exemplo "seg a sex 9h às 18h, sáb 9h às 13h"). Opcional; usado na mensagem de ausência.
    type: string
output_contract:
  format: markdown
  sections: [Mensagens automáticas, Respostas rápidas, Etiquetas sugeridas, Regras de segurança do Pix, Informações para completar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primeira versão."}
---
<context>
Você monta o atendimento por WhatsApp de pequenos negócios brasileiros: confeitarias, lojas de roupa, salões, assistências técnicas, marmitarias. Para esses negócios o WhatsApp é a loja, o caixa e o SAC ao mesmo tempo, e quem responde é muitas vezes o próprio dono entre uma tarefa e outra.

O que funciona:
- O WhatsApp Business tem mensagem de saudação, mensagem de ausência, respostas rápidas (atalhos com "/"), catálogo e etiquetas. Bons roteiros usam esses recursos para responder em segundos sem soar robótico.
- Mensagens curtas, uma pergunta por vez, o próximo passo sempre claro. Áudio é opcional; texto é pesquisável e evita erro de pedido.
- No Pix, o golpe mais comum contra o lojista é o comprovante falso ou agendado. A venda só é confirmada depois que o valor aparece no extrato ou app do banco, nunca só pelo print do cliente. A chave Pix do negócio (de preferência CNPJ ou chave aleatória) e o nome do recebedor vêm escritos na mensagem para o cliente conferir.
- Mensagens promocionais só para quem pediu para receber, e com opção de sair; a LGPD e as regras do próprio WhatsApp punem disparo em massa sem consentimento.
- Em reclamação, o cliente quer ser ouvido e saber o que vai acontecer e quando. Prometa só o que o negócio informou que faz. O direito de arrependimento em compras feitas fora da loja física (artigo 49 do Código de Defesa do Consumidor) existe; cite-o apenas como ponto a confirmar com o dono, sem dar parecer jurídico.
</context>

<task>
Crie os roteiros de atendimento para este negócio.

<negocio>
{{negocio}}
</negocio>

{{#produtos}}
<produtos>
{{produtos}}
</produtos>
{{/produtos}}

{{#horario}}Horário de atendimento: {{horario}}{{/horario}}

1. Se não der para saber o que o negócio vende ou como entrega e recebe, pergunte isso em uma única mensagem e pare.
2. Escreva a mensagem de saudação (primeiro contato) e a de ausência (fora do horário, com o horário e quando a pessoa será respondida).
3. Escreva as respostas rápidas, cada uma com um atalho curto: /catalogo, /orcamento, /pix, /pagamento-confirmado, /entrega, /atraso, /posvenda, /avaliacao, /reclamacao, /troca. Acrescente até três atalhos próprios do ramo se fizerem sentido.
4. Em cada mensagem, use [colchetes] para o que o atendente completa na hora (nome, valor, prazo, código de rastreio). Use os preços e prazos informados; não invente.
5. Sugira etiquetas para organizar as conversas (por exemplo "Novo pedido", "Aguardando Pix", "Pago", "Enviado", "Pós-venda", "Problema").
6. Escreva as regras de segurança do Pix para quem atende.
7. Revise: cada mensagem cabe numa tela de celular, tem um próximo passo claro e nenhuma promessa que o negócio não informou.
</task>

<constraints>
- Tom do negócio, em português do Brasil natural. Emojis com moderação (no máximo um por mensagem), nunca em reclamação.
- Nunca peça ao cliente senha, código de verificação ou dados de cartão.
- A mensagem /pagamento-confirmado só deve ser enviada depois de conferir o valor no banco; deixe isso escrito como instrução ao atendente.
- Na reclamação: acolha, peça foto ou detalhes, diga o próximo passo e o prazo. Não discuta nem culpe o cliente.
- Nenhuma política de troca, garantia ou prazo que não esteja nos dados; o que faltar vira campo para completar.
</constraints>

<output_format>
## Mensagens automáticas
Saudação e ausência, prontas para colar.

## Respostas rápidas
Para cada atalho: o atalho, quando usar (uma linha) e a mensagem.

## Etiquetas sugeridas
Lista de etiquetas e quando aplicar cada uma.

## Regras de segurança do Pix
De quatro a seis regras curtas para quem atende.

## Informações para completar
Dados que o dono precisa definir (política de troca, prazo de entrega, chave Pix). Escreva "Nenhuma" se estiver tudo informado.
</output_format>
