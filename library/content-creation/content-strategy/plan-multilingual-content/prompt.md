---
schema: 1
id: plan-multilingual-content
kind: prompt
title: Plan multilingual content
description: Plans content for audiences in more than one language, deciding which languages and channels, what to translate, adapt or create natively, who reviews it, and the cadence each language can sustain.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, manager, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [multilingual, language-versions, transcreation, localisation, audience-reach]
pairs_with:
  prompts: [localise-social-captions, assess-community-information-needs, define-content-pillars]
  personas: [content-strategist]
args:
  - name: audience
    description: "Who you serve, where they are, and any evidence of the languages they use (analytics, surveys, community contact)."
    type: text
    required: true
  - name: current_content
    description: "What you publish now, on which channels and how often."
    type: text
    required: true
  - name: languages
    description: "Languages you are considering and who can write or review in each."
    type: text
    required: true
  - name: capacity
    description: "Optional: hours, budget and tools available."
    type: text
output_contract:
  format: markdown
  sections: [Language decisions, Channel structure, Treatment by content type, Workflow and review, Cadence, Production checks, Measuring and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, brand, nonprofit or public body plan content for audiences who speak different languages. Teams usually get this wrong in one of three ways: translating everything word for word into every language and burning out; publishing a token translation that is never updated; or mixing languages in one feed so no one is served well. Experienced multilingual teams decide per language from audience evidence and capacity, then choose a treatment per content type: translate (factual, stable material such as service information or help pages), transcreate (campaigns, hooks, humour, idioms, cultural references), create natively (community, news and trend content where a native speaker leads), or summarise and link. Channel structure matters: separate accounts or editions per language versus one account with captions or alternate posts. Machine translation can draft, but a fluent human reviewer is needed for anything public, sensitive or legal, and for some audiences a plain-language summary in their language serves better than a full translation. Script direction, fonts, captions and alt text also need checking per language.

Organisation and audience: {{audience}}
Current content and channels: {{current_content}}
Languages being considered and who on the team speaks them: {{languages}}
{{#capacity}}Capacity and budget: {{capacity}}{{/capacity}}
</context>

<task>
1. For each language, weigh audience evidence (what the data or community contact shows), the goal it serves and the capacity to sustain it; recommend start now, start later or not yet, with reasons. If audience evidence is missing, say what to collect.
2. Choose a channel structure per language (separate account or edition, same account with alternates, captions or subtitles only, website language versions) and explain the trade-offs.
3. Build a treatment matrix by content type: translate, transcreate, create natively, summarise and link, or English or source language only.
4. Set the workflow: who drafts, whether machine translation is used for drafts, who reviews for fluency, accuracy and cultural fit, and sign-off for sensitive, legal, health or safety content.
5. Set a cadence per language that the reviewers can sustain, and what happens when a reviewer is unavailable.
6. List the production checks: glossary and voice notes per language, captions and alt text, right-to-left layout or special scripts, dates, numbers and units, names and forms of address.
7. Define how to measure each language separately and when to review the decision.
</task>

<constraints>
- Do not invent audience figures, language statistics or translation costs; use what is given and mark gaps as [X].
- Never recommend publishing machine translation without fluent human review for public-facing content.
- Do not treat a language as one culture; note regional variants that matter for the audience given.
- Keep the plan within the stated capacity; it is better to serve two languages well than five badly.
</constraints>

<output_format>
## Language decisions
Table: Language | Audience evidence | Goal served | Capacity | Decision.
## Channel structure
## Treatment by content type
Table: Content type | Treatment | Why.
## Workflow and review
## Cadence
## Production checks
A checklist.
## Measuring and review
</output_format>
