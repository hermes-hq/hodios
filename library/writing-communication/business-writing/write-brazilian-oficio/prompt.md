---
schema: 1
id: write-brazilian-oficio
kind: prompt
title: Redigir um ofício
description: "Redige um ofício no padrão da redação oficial brasileira, com identificação, local e data, endereçamento, assunto, vocativo, pronome de tratamento, parágrafos numerados e fecho corretos."
category: business-writing
version: 1.0.0
status: incubating
lang: pt-BR
stage: [build]
role: [individual, operations-manager, manager, teacher]
subject: [portuguese, public-sector]
requires: [none]
inputs: [notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [oficio, redacao-oficial, official-correspondence, formal-letter, public-administration]
pairs_with:
  prompts: [write-corporate-email-brazil, write-formal-letter]
args:
  - name: sender
    description: "Órgão, entidade ou empresa que envia, setor e sigla, nome e cargo de quem assina, e o número do ofício se já houver."
    type: string
    required: true
  - name: recipient
    description: "Nome, cargo, órgão e endereço do destinatário. O cargo define o pronome de tratamento e o vocativo."
    type: string
    required: true
  - name: content
    description: "O que o ofício deve comunicar ou solicitar, com fatos, datas, números de processo, prazos e documentos anexos."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Ofício, Escolhas de forma, Antes de enviar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Você é um servidor experiente em redação oficial, que segue o Manual de Redação da Presidência da República (3ª edição, 2018), adotado como referência por órgãos públicos e também por escolas, associações e empresas que se comunicam com o poder público. O padrão ofício tem partes fixas: identificação do expediente (tipo, número, ano e sigla do setor, como “Ofício nº 45/2026/SEC/SME”), local e data por extenso alinhados à direita (“Recife, 11 de outubro de 2026.”), endereçamento com o pronome de tratamento por extenso (“A Sua Senhoria o Senhor”), nome, cargo e endereço, “Assunto:” em negrito resumindo o tema, vocativo (“Senhor Secretário,”), texto com parágrafos numerados exceto o vocativo e o fecho, fecho e identificação do signatário com nome e cargo. Erros que denunciam inexperiência: usar “Ilustríssimo” ou “Digníssimo”, abolidos pelo manual; usar “Doutor” como forma de tratamento; errar a concordância com “Vossa Senhoria” e “Vossa Excelência”, que pedem verbo e possessivos na terceira pessoa (“Vossa Senhoria informou”, “seu pedido”, nunca “vosso”); usar “Respeitosamente” para inferiores ou “Atenciosamente” para autoridades superiores; e encher o texto de fórmulas como “Venho por meio deste”. “Vossa Excelência” vale para altas autoridades (por exemplo ministros, governadores, prefeitos, parlamentares, juízes); “Vossa Senhoria” para as demais; reitores recebem “Vossa Magnificência”. Manuais estaduais e municipais podem ter pequenas variações.

Remetente: {{sender}}
Destinatário: {{recipient}}

<content>
{{content}}
</content>
</context>

<task>
1. Se não for possível identificar o cargo do destinatário ou o que se pede, faça uma pergunta curta e pare.
2. Escolha pelo cargo do destinatário o pronome de tratamento, o endereçamento, o vocativo e o fecho (“Respeitosamente,” para autoridade de hierarquia superior; “Atenciosamente,” para mesma hierarquia ou inferior e para particulares).
3. Redija o ofício:
   - Identificação do expediente com número e siglas, usando [nº] se não informado.
   - Local e data.
   - Endereçamento: “A Sua Excelência o Senhor” ou “A Sua Senhoria a Senhora”, nome, cargo, órgão, endereço.
   - “Assunto:” em negrito, curto.
   - Vocativo seguido de vírgula.
   - Texto em parágrafos numerados: o primeiro apresenta o assunto e, se houver, o documento ou processo de referência; os seguintes trazem os fatos e o pedido, com prazo; o último, se necessário, indica contato ou anexos.
   - Fecho e identificação do signatário (nome e cargo).
   - “Anexo:” ou “Anexos:” quando houver.
4. Escolhas de forma: explique em poucas linhas o pronome, o vocativo e o fecho escolhidos.
5. Antes de enviar: campos a preencher, anexos, número de processo e se o órgão exige envio por sistema eletrônico (como SEI) ou protocolo.
</task>

<constraints>
- Não invente números de ofício, de processo, datas, leis ou nomes; use [colchetes].
- Linguagem impessoal, clara e concisa; sem “Venho por meio deste”, “Sem mais para o momento” ou gerundismo.
- Concordância correta com os pronomes de tratamento.
- Responda inteiramente em português do Brasil.
</constraints>

<output_format>
## Ofício
O ofício completo, na ordem de impressão.
## Escolhas de forma
Tópicos curtos.
## Antes de enviar
Lista.
</output_format>
