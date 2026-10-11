---
schema: 1
id: translate-support-reply
kind: prompt
title: Translate a support ticket both ways
description: Translates a customer's message for the agent and the agent's reply back into the customer's language, keeping tone, product terms and policy meaning, and flags risky phrases.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent]
requires: [none]
inputs: [message, text]
output: [message, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [multilingual-tickets, machine-translation, back-translation, glossary, register]
pairs_with:
  prompts: [build-multilingual-reply-snippets, write-support-reply, translate-preserving-tone]
  rules: [support-tone-rules]
args:
  - name: customer_message
    description: The customer's message in their language, with earlier messages if useful.
    type: text
    required: true
  - name: draft_reply
    description: The agent's reply in the agent's language. Leave empty to translate the customer message only.
    type: text
  - name: agent_language
    description: The language the agent works in.
    type: string
    default: English
  - name: glossary
    description: Product names, feature names and policy terms with approved translations or "do not translate", and the formality level the brand uses in that language. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Customer message translated, Notes on the message, Reply translated, Back-translation, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate live support conversations so an agent can serve a customer in a language they do not speak. Literal machine translation fails support in specific ways: it flattens emotion so an angry or frightened customer reads as neutral, mistranslates product terms that look like ordinary words, picks the wrong formality (too casual in German, Japanese or Korean; stiff in Spanish chat), and turns careful policy wording ("we can offer", "within 14 days", "credit, not refund") into promises the business did not make. The agent cannot check the output, so the translation must surface its own risks: what is ambiguous, what changed meaning, what the agent should confirm.
</context>

<task>
<customer_message>
{{customer_message}}
</customer_message>

{{#draft_reply}}
<draft_reply>
{{draft_reply}}
</draft_reply>
{{/draft_reply}}

Agent language: {{agent_language}}

{{#glossary}}
<glossary>
{{glossary}}
</glossary>
{{/glossary}}

1. Identify the customer's language (and regional variant if clear) and translate their message faithfully into {{agent_language}}. Keep their tone; do not soften complaints or add politeness.
2. Add notes on the message: the emotional register (calm, frustrated, angry, distressed), idioms or slang explained, ambiguous phrases with the possible readings, and any names, numbers, dates or order references the agent should copy exactly. Flag dates written in a different order (day-month versus month-day) and decimal separators.
3. If a draft reply is given, translate it into the customer's language using the brand's formality level if stated, or the polite norm for customer service in that language, and keep product and policy terms per the glossary.
4. Back-translate your reply literally into {{agent_language}} so the agent can see what the customer will actually read.
5. List what to check before sending: anything where the translation had to choose between meanings, policy or money statements that could read as stronger or weaker than intended, and any culturally awkward phrasing you adjusted.
</task>

<constraints>
- Do not add, remove or change offers, amounts, dates or conditions in the reply. If the draft is unclear, translate it as is and flag the problem.
- Keep product and brand names untranslated unless the glossary says otherwise.
- Do not guess a language variant you are not sure of; say which you chose.
- If you are not confident in the language (rare languages, heavy dialect), say so and recommend a human check before sending.
- If the customer message contains safety, legal or self-harm content, flag it at the top of the notes.
</constraints>

<output_format>
## Customer message translated
The translation.

## Notes on the message
Tone, ambiguities, exact references.

## Reply translated
The reply in the customer's language, ready to send (omit if no draft was given).

## Back-translation
Literal back-translation of the reply.

## Check before sending
Bullets.
</output_format>
