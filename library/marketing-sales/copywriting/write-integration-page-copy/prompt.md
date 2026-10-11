---
schema: 1
id: write-integration-page-copy
kind: prompt
title: Write an integration page
description: Writes an integration page for a software product with what the integration does, top use cases, setup steps, a table of what syncs and how often, plan requirements and honest limits.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, product-manager, developer-advocate]
requires: [none]
inputs: [spec, document, text]
output: [copy, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
subject: [saas]
tags: [integration-page, app-marketplace, setup-steps, data-sync, website-copy]
pairs_with:
  prompts: [plan-integration-partnerships, write-feature-page-copy, write-use-case-page, critique-marketing-copy]
  personas: [copywriter]
args:
  - name: integration
    description: What the integration does, what data moves in which direction and how often, what triggers a sync, how to set it up, which plans include it, and who builds and maintains it (native, partner-built or via a third-party connector). A spec or help article is ideal.
    type: text
    required: true
  - name: partner_name
    description: The other product's name as it should appear (for example "HubSpot", "QuickBooks Online").
    type: string
    required: true
  - name: product
    description: Your product and who uses it.
    type: text
    required: true
  - name: limits
    description: Known limits, such as objects or fields not supported, rate limits, regions, editions of the partner product required. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Integration summary, Integration page copy, Setup steps, What syncs, Questions for engineering]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write integration pages for software products, the pages in an "Integrations" directory or app marketplace. Two readers use them. A business buyer asks "will this fit the tools we already use, and what can I do with it?". A technical evaluator asks "what exactly syncs, in which direction, how often, what breaks, and who supports it?". Pages that only say "connect X with Y seamlessly" fail both, and integration questions become sales delays and support tickets.

Strong integration pages state the use cases in workflow terms ("when a deal closes in the CRM, an invoice is created"), show setup in a few honest steps, give a table of objects and fields with sync direction and frequency, say which plans and partner editions are required, and state limits. They use the partner's name factually and never imply an official partnership or endorsement that does not exist.
</context>

<task>
Partner product: {{partner_name}}

<integration>
{{integration}}
</integration>

<product>
{{product}}
</product>

{{#limits}}<limits>
{{limits}}
</limits>{{/limits}}

1. If you cannot tell what data moves or in which direction, ask up to three short questions and stop.
2. Summarise the integration: who it is for, the two or three main use cases, sync direction, trigger and frequency, who maintains it.
3. Write the page: a headline naming both products and the main outcome, a two-sentence overview, three use cases each written as a trigger and result, a benefits block, requirements (plans, partner edition, permissions needed), a short FAQ (sync frequency, what happens on conflicts or deletes, historical data, disconnecting), and a call to action (connect, start a trial or read the docs).
4. Write setup steps as a numbered list a user can follow, and keep it to what the inputs support.
5. Build a "what syncs" table.
6. List questions for engineering about anything the page needs that the inputs do not confirm.
</task>

<constraints>
- Describe only behaviour the inputs confirm. Mark unknowns as [CONFIRM: ...]; never guess sync frequency, conflict handling or field coverage.
- Use the partner's name and trademarks factually. Do not say "official", "certified" or "partner" unless the inputs say so, and note that logo use should follow the partner's brand guidelines.
- If the integration runs through a third-party connector, say so plainly.
- State limits in the page itself, not only in the questions list.
- Avoid filler such as "seamless" and "effortless".
</constraints>

<output_format>
## Integration summary
Bullets: audience, use cases, direction, trigger and frequency, maintainer.

## Integration page copy
Each section under its own label (Headline, Overview, Use cases, Benefits, Requirements, FAQ, CTA), ready to paste.

## Setup steps
Numbered steps.

## What syncs
A table: Object or field | Direction | Trigger or frequency | Notes and limits.

## Questions for engineering
Bullets. "None" if all is confirmed.
</output_format>
