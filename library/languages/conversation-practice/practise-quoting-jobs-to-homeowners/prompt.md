---
schema: 1
id: practise-quoting-jobs-to-homeowners
kind: prompt
title: Practise explaining a job and quote to a homeowner
description: Practises a tradesperson's customer talk in the target language - asking about the problem, explaining the fault plainly, giving a price and timeline, handling haggling - with a phrase card.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
subject: [construction]
requires: [none]
inputs: [text]
output: [conversation, table, message]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [trades, quoting, homeowner-visits, plain-explanations, haggling]
pairs_with:
  prompts: [practise-building-site-communication, practise-negotiating-with-client-in-language, practise-conversation-strategies]
  personas: [frontline-workplace-language-coach]
args:
  - name: target_language
    description: The language your customers speak, with the country or region.
    type: string
    required: true
  - name: trade
    description: Your trade (for example "plumber", "electrician", "tiler", "roofer", "painter and decorator").
    type: string
    required: true
  - name: level
    description: Your CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
output_contract:
  format: markdown
  sections: [Visit stages, Visits, Feedback, Phrase card, Written quote wording]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tradespeople who work in {{target_language}} as a second language to talk to homeowners.

Trade: {{trade}} Skilled tradespeople lose work in the conversation, not the job: they cannot ask the right questions about the problem, explain the fault only with trade words the customer does not know, give a price without saying what it includes, sound unsure under haggling, or agree a start date that is vague. Customers trust someone who asks, explains simply, says clearly what is and is not included, and puts it in writing.

Level (CEFR): {{level}}
</context>

<task>
1. Visit stages (explanations in the learner's language; phrases in {{target_language}}): 3-4 phrases each for six stages - arriving and introducing yourself, asking about the problem (when it started, how often, what they have tried), explaining what is wrong in plain words (with 5 typical {{trade}} faults: the trade term and a lay explanation), giving the price and what it includes and excludes, timeline and access (start date, how long, noise, water or power off), and handling objections (too expensive, "my cousin can do it cheaper", "is it really needed?"). Add phrases to say "I need to check before I can give a price" and "I'll send the quote in writing".
2. Visits, one at a time, in {{target_language}}. Play 3-4 different homeowners for {{trade}} jobs: a worried older person who wants everything explained; a busy professional who wants a price now; a haggler; and a customer who describes the problem vaguely or wrongly. Each has a realistic fault for this trade. Speak at {{level}}: simple at A1-A2, with everyday homeowner vocabulary from B1. Never write the tradesperson's lines. React to jargon by asking what it means.
3. Feedback after each visit: did they ask enough questions before pricing; was the explanation plain (trade words to replace); was the price clear on inclusions, exclusions, VAT or tax and validity; did they stay calm and clear under haggling (and avoid dropping the price with no change in scope); and up to three language corrections.
4. Phrase card: one short block per stage with the phrases that worked best for this learner.
5. Written quote wording: a short template in {{target_language}} for a quote message (job, what is included, what is not, price, how long the price is valid, start date, payment terms) with [X] for every figure.
</task>

<constraints>
- Never suggest prices, rates or material costs; use [price] and leave pricing to the tradesperson.
- Do not give technical or safety-critical repair instructions; keep fault explanations plausible and generic, and note that regulated work (gas, electrics, structural) follows local regulations and certification.
- Do not state tax or consumer-law rules as fact (cooling-off periods, VAT rates, deposits); say they vary and suggest checking with an accountant, trade body or official consumer guidance.
- Model honest selling: no pressure tactics or invented urgency.
</constraints>

<output_format>
## Visit stages
Table per stage: Phrase | Meaning. Then the fault table (Trade word | Plain explanation).
## Visits
"Visit N - [homeowner]:" then only the homeowner's lines.
## Feedback
Per visit: Questions, Plain words, Price clarity, Under pressure, Corrections.
## Phrase card
Short block per stage.
## Written quote wording
The template with [X] gaps.
</output_format>
