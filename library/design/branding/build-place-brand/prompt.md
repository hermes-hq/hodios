---
schema: 1
id: build-place-brand
kind: prompt
title: Build a place brand
description: Builds a brand for a town, region, district or destination from real place truths, serving residents, visitors, businesses and investors, with an identity system, partner use, governance and measures.
category: branding
version: 1.0.0
status: incubating
stage: [discover, plan, design]
role: [marketer, consultant, executive]
requires: [none]
inputs: [text, document]
output: [plan, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [place-branding, destination-marketing, civic-identity, stakeholder-engagement, tourism]
pairs_with:
  prompts: [build-brand-platform, design-brand-architecture, build-brand-guidelines, run-brand-audit]
  personas: [brand-strategist]
args:
  - name: place
    description: The place - where it is, size, history, economy, landscape, culture, what residents say about it, what outsiders think, and existing logos or campaigns.
    type: text
    required: true
  - name: goals
    description: What the brand should achieve (more overnight visitors, attracting employers, residents' pride, a regenerated district) and who commissioned it.
    type: text
    required: true
  - name: stakeholders
    description: Who has a stake and resources - council, tourism body, business groups, universities, cultural institutions, residents' groups. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and audiences, Place truths, Brand idea, Proof and experiences, Identity system, Partner use, Governance and funding, Engagement plan, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Places are not products: nobody owns them, many organisations speak for them, and residents will reject a brand that does not ring true. Place brands fail as a logo and a slogan ("City of Opportunity", "Heart of the Region") that could belong anywhere, designed for tourists while residents mock it, launched by one body and ignored by everyone else, and unfunded after the launch year. Strong place brands start from truths only that place has (landscape, history, industry, people, attitude), serve several audiences with one idea expressed in different ways, give local businesses and institutions a simple way to use it, and are judged on what changes in the place, not on the logo.
</context>

<task>
Build a place brand for:

<place>
{{place}}
</place>

<goals>
{{goals}}
</goals>
{{#stakeholders}}

<stakeholders>
{{stakeholders}}
</stakeholders>
{{/stakeholders}}

If the description gives too little about what makes the place itself, list the research needed (resident and visitor interviews, perception survey, workshop with local organisations) and give a provisional plan.

1. **Purpose and audiences.** What the brand is for and the priority audiences (residents, visitors, students, businesses, investors, talent), with what each needs to believe and do.
2. **Place truths.** Distinctive, provable truths about the place, separated into what the input states and what needs research; note which truths residents would recognise and which only outsiders see.
3. **Brand idea.** One idea or two or three candidate ideas, each a thought (not a slogan) that holds for all audiences, with how it flexes for each audience. Test each against "could another place claim this?".
4. **Proof and experiences.** The things that make the idea true on the ground (events, places, policies, stories, people), and gaps where the place does not yet deliver.
5. **Identity system.** Name use, a mark or wordmark direction, a flexible visual system (colour, type, photography of real people and places), and voice; built so partners can use it without a designer.
6. **Partner use.** A simple endorsement scheme for businesses, events and institutions (a partner mark, templates, a toolkit), with rules light enough that people actually use it.
7. **Governance and funding.** Who owns and manages the brand, how decisions are made with partners, how it is funded beyond launch, and how it survives changes in political leadership.
8. **Engagement plan.** How residents and partners shape and launch it (consultation, co-creation, ambassadors), and how to handle criticism at launch.
9. **Measures.** Outcomes to track (visitor nights, investment enquiries, resident pride survey, partner adoption, media sentiment) with baselines to set before launch.
</task>

<constraints>
- Do not invent statistics, history or attractions; mark gaps and research needs.
- Do not propose slogans that any place could use; test every idea for distinctiveness.
- Respect the communities in the place; avoid exoticising people or culture for visitors.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Audiences as a table (Audience, Needs to believe, Action). Brand idea candidates as a table (Idea, Truths it rests on, Distinctiveness test, Risk). Measures as a table (Measure, Baseline source, Target-setting note).
</output_format>
