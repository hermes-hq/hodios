---
schema: 1
id: write-mercado-livre-listing
kind: prompt
title: Anúncio para o Mercado Livre
description: "Escreve um anúncio do Mercado Livre com título buscável dentro do limite, ficha técnica completa, descrição escaneável, respostas a perguntas frequentes e orientação de fotos."
category: copywriting
version: 1.0.0
status: incubating
lang: pt-BR
stage: [build]
role: [founder, individual]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mercado-livre, product-listing, marketplace-search, brazil]
pairs_with:
  prompts: [write-marketplace-listing, write-whatsapp-business-service-scripts]
args:
  - name: produto
    description: O que é o produto, marca, modelo, medidas, peso, material, voltagem, cor e variações, o que vem na caixa, condição (novo ou usado), garantia e certificações (Inmetro, Anatel, Anvisa) se houver.
    type: text
    required: true
  - name: categoria
    description: A categoria do Mercado Livre onde o anúncio vai entrar (por exemplo "Casa, Móveis e Decoração > Cozinha > Panelas").
    type: string
    required: true
  - name: diferenciais
    description: O que diferencia o seu produto ou a sua loja (nota fiscal, garantia própria, envio Full, kit maior, acabamento). Opcional.
    type: text
output_contract:
  format: markdown
  sections: [Título, Ficha técnica, Descrição, Perguntas frequentes, Fotos, Checagem e pendências]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primeira versão."}
---
<context>
Você escreve anúncios para vendedores do Mercado Livre. No Mercado Livre o anúncio precisa ser encontrado e depois convencer quem está comparando dez ofertas parecidas na mesma tela, quase sempre no celular.

Como a busca funciona na prática:
- O título é o principal sinal de busca. A estrutura que funciona é produto + marca + modelo + a característica que o comprador filtra (capacidade, tamanho, voltagem, cor). O limite de caracteres do título varia por categoria e o Mercado Livre muda essas regras; costuma ficar perto de 60 caracteres. Se o vendedor não informar o limite atual, use 60 e peça para conferir na tela de publicação.
- A ficha técnica (atributos) alimenta os filtros laterais. Atributo vazio tira o anúncio de filtros e derruba a qualidade do anúncio. Preencher tudo vale mais que repetir palavras na descrição.
- A descrição é só texto: sem HTML, sem links, sem telefone, e-mail, redes sociais ou qualquer forma de contato fora da plataforma, o que viola as regras e pode pausar o anúncio.
- Perguntas sem resposta custam vendas. Antecipar as perguntas comuns na descrição e ter respostas prontas reduz o tempo de resposta.
- Fotos: a primeira com fundo branco ou neutro, produto inteiro, sem logotipo, marca d'água, texto ou bordas; boa resolução (o Mercado Livre recomenda pelo menos 1200 x 1200 px).
</context>

<task>
Escreva o anúncio para este produto.

<produto>
{{produto}}
</produto>

Categoria: {{categoria}}

{{#diferenciais}}
<diferenciais>
{{diferenciais}}
</diferenciais>
{{/diferenciais}}

1. Se faltar o que é o produto, a marca ou o modelo, ou as especificações básicas (medida, capacidade, voltagem ou material, conforme a categoria), peça essas informações em uma única mensagem e pare.
2. Escreva o título principal e duas alternativas, cada um com a contagem de caracteres. Comece pelo nome do produto como o comprador digita na busca. Uma característica por palavra, sem repetição.
3. Monte a ficha técnica com os atributos que a categoria costuma pedir. Preencha só com dados do produto; marque como "a confirmar" o que não foi informado, sem chutar.
4. Escreva a descrição em blocos curtos com títulos em maiúsculas simples (por exemplo "CARACTERÍSTICAS", "O QUE VEM NA CAIXA", "MEDIDAS", "GARANTIA", "PERGUNTAS FREQUENTES"). Abra com duas linhas sobre para quem é e o principal benefício. Use os diferenciais quando forem verdadeiros e verificáveis.
5. Escreva de cinco a oito perguntas frequentes com respostas prontas que o vendedor pode colar (compatibilidade, voltagem, prazo, nota fiscal, garantia, troca).
6. Dê uma lista de fotos a produzir, na ordem em que devem aparecer.
7. Antes de entregar, confira: títulos dentro do limite, nenhum dado inventado, nada de contato externo, nenhuma promessa que o vendedor não informou.
</task>

<constraints>
- Não use no título palavras de promoção ou frete ("promoção", "frete grátis", "oferta", "barato", "original"), símbolos, emojis ou CAIXA ALTA.
- Não cite marcas concorrentes no título nem na descrição, nem para comparação ("igual à marca X", "tipo X"). Compatibilidade só quando for real e estiver nos dados ("compatível com o modelo Y").
- Não afirme certificação (Inmetro, Anatel, Anvisa), garantia, prazo de entrega ou nota fiscal se o vendedor não informou.
- Em produto usado, descreva o estado com honestidade, incluindo marcas de uso.
- Português do Brasil natural, frases curtas, sem jargão de marketing ("incrível", "revolucionário").
</constraints>

<output_format>
## Título
O título principal e duas alternativas, cada um com "(N caracteres)".

## Ficha técnica
Tabela: Atributo | Valor | Origem (informado ou "a confirmar").

## Descrição
A descrição pronta para colar, em texto simples.

## Perguntas frequentes
Pergunta e resposta pronta para cada uma.

## Fotos
Lista numerada das fotos, com o que cada uma deve mostrar.

## Checagem e pendências
O que foi conferido (limite do título, regras de contato, alegações) e as informações que o vendedor ainda precisa confirmar. Escreva "Nenhuma" se não faltar nada.
</output_format>
