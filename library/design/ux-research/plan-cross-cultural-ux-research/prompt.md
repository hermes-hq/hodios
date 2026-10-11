---
schema: 1
id: plan-cross-cultural-ux-research
kind: prompt
title: Plan multi-country UX research
description: Plans a UX study run across countries or languages, covering local recruitment, moderators and translation, adapted tasks and incentives, consent rules, and comparing findings fairly.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, product-manager, designer]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [international-research, localisation, cross-cultural, back-translation, multi-market]
pairs_with:
  prompts: [write-usability-test-plan, set-research-data-handling-rules, write-research-screener]
  personas: [ux-researcher]
args:
  - name: study
    description: The research questions, method (interviews, usability tests, diary study) and the product or prototype.
    type: text
    required: true
  - name: markets
    description: The countries or regions and languages, and whether the product is already localised there.
    type: text
    required: true
  - name: resources
    description: Budget, timeline, in-house language skills, and whether local agencies or freelance moderators are available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Design across markets, Recruitment, Moderation and language, Materials adaptation, Incentives and consent, Logistics, Analysis across markets, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
International studies go wrong when a single guide is literally translated, when moderators are interpreters rather than trained researchers, when the prototype is half-localised (local language with home-market prices, address formats or payment methods), and when findings from five people in each country are compared as if they were national truths. Norms differ: how directly people criticise, who should be in the room, appropriate incentives and how they are paid, and data protection and recording consent. Native-language moderation with a research briefing, a back-translated guide, localised stimuli, and analysis that separates universal problems from market-specific ones make the study worth its cost.
</context>

<task>
<study>
{{study}}
</study>

<markets>
{{markets}}
</markets>
{{#resources}}

<resources>
{{resources}}
</resources>
{{/resources}}

1. Design across markets: what is held constant, what is adapted, sample per market and why, and order of fieldwork (pilot in one market first).
2. Recruitment: local criteria equivalents (income bands, device norms, payment habits), sources, and screener translation.
3. Moderation and language: native-speaker moderators with a briefing and practice session, or interpretation with its limits; live translation for observers; transcripts and translation of key quotes.
4. Materials adaptation: guide translated and back-translated, tasks adapted to local reality (currencies, addresses, holidays, payment methods), localised prototype checks.
5. Incentives and consent: locally appropriate amounts and forms (to set with local partners), consent and recording rules per market, flagged for the privacy lead.
6. Logistics: time zones, schedules, holidays, tools that work locally.
7. Analysis across markets: shared codebook, per-market synthesis, then cross-market comparison separating common issues from local ones, with caution about small samples.
8. Risks and mitigations.
</task>

<constraints>
- Do not state incentive amounts, legal requirements or cultural generalisations as facts; frame cultural points as things to check with local researchers, without stereotyping.
- Flag where a market is not localised and testing in a second language would distort results.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design across markets
| Market | Language | Sample | Moderator | Notes |
## Recruitment
## Moderation and language
## Materials adaptation
## Incentives and consent
## Logistics
## Analysis across markets
## Risks
</output_format>
