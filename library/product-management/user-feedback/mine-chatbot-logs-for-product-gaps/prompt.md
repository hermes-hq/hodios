---
schema: 1
id: mine-chatbot-logs-for-product-gaps
kind: prompt
title: Mine chatbot logs for product gaps
description: Analyses support chatbot or AI assistant conversations for unanswered intents, how-do-I questions and confusion, separating product gaps from help content and bot quality problems.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, operate]
role: [product-manager, support-agent, ux-researcher, data-analyst]
requires: [none]
inputs: [transcript, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chatbot-logs, intent-analysis, unmet-needs, help-content, discoverability]
pairs_with:
  prompts: [design-support-chatbot-flow, test-support-chatbot-answers, analyze-site-search-for-demand]
args:
  - name: conversations
    description: Exported conversations or a summary of intents with counts, including fallbacks, handovers to humans, ratings and abandonments where available.
    type: text
    required: true
  - name: context
    description: The product, what the bot is meant to cover, and the help content it draws on. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Coverage and limits, Intent map, Product gaps, Usability and discoverability issues, Help content gaps, Bot issues, Recommendations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn support chatbot and AI assistant logs into product insight. These logs are unusual feedback: users ask in their own words, at the moment of need, without deciding to "give feedback". The richest signals are where the bot failed: fallback answers, rephrased repeat questions, handovers to humans, low ratings and abandoned chats. But failures have three different owners. Some are bot problems (wrong answer, poor retrieval, misunderstood intent). Some are help content gaps (the answer exists in the product but is not documented). The rest are product gaps: users asking how to do something the product cannot do, or asking where something is because the interface hides it. Product teams want the last group, and mixing them in wastes everyone's time. Logs often contain personal data and must be handled accordingly.

Conversations:

<conversations>
{{conversations}}
</conversations>
{{#context}}

Context:

<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. State coverage and limits: number of conversations, date range, channels, share with ratings or outcomes, what is missing, and any personal data that must be masked.
2. Build an intent map: cluster user requests into intents, with counts, resolution outcome (answered, fallback, handover, abandoned), and example user phrasings, masked.
3. Classify every failing intent into product gap, usability or discoverability issue, help content gap, or bot issue, with the test used (for example "the product cannot do this" versus "it can, but users do not find it").
4. Detail product gaps: what users try to do, the underlying need, frequency, who asks (segment if known), and example phrasings.
5. Detail usability and discoverability issues: where users get lost, the vocabulary they use versus the product's labels, and which screens or features are involved.
6. List help content gaps and bot issues briefly, as handoffs for the content and bot owners.
7. Recommend actions per owner, ranked by frequency and impact, and suggest tags or logging changes so future analysis is easier.
</task>

<constraints>
- Mask names, emails, account numbers and other personal data in all quotes.
- Do not decide that the product cannot do something unless the context says so; mark it as "to confirm" otherwise.
- Show counts with every finding.
- Do not invent conversations or phrasings.
</constraints>

<output_format>
## Coverage and limits
Bullets.

## Intent map
A table: intent | count | outcome mix | example phrasing.

## Product gaps
A table: need | count | who | example.

## Usability and discoverability issues
Bullets with user vocabulary versus product labels.

## Help content gaps
Bullets.

## Bot issues
Bullets.

## Recommendations
A table: action | owner | evidence | priority.
</output_format>
