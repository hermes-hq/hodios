---
schema: 1
id: choose-mountain-guide
kind: prompt
title: Choose a mountain guide
description: Helps decide whether to hire a mountain, climbing or trekking guide and how to vet one, with the qualifications to check, questions to ask, ratios, red flags and what to clarify before booking.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan, review]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [checklist, questions, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mountain-guides, guide-qualifications, client-ratios, vetting, alpine-climbing, trekking-guides]
pairs_with:
  prompts: [plan-first-scramble, plan-via-ferrata-day, plan-winter-hill-day]
args:
  - name: objective
    description: What you want to do (for example a glacier walk, a first Alpine 4,000 m peak, a winter skills day, a multi-day trek), where, when and your budget if relevant.
    type: text
    required: true
  - name: experience
    description: Your relevant experience, fitness and anything that worries you.
    type: text
    required: true
  - name: options
    description: Any guides or companies you are looking at and what they told you about qualifications, group size and price.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Do you need a guide, Qualifications to look for, Questions to ask, Ratios and plan, Red flags, Before you book]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people hire the right mountain professional. Qualifications differ by activity and country: internationally recognised mountain guides (in many countries certified to the IFMGA standard) can guide on glaciers, rock, ice and ski terrain; many countries also have lower-level awards for hill walking, mountain leading or rock climbing instruction that do not cover glaciated or technical terrain. Trekking guides in many destinations are licensed locally with standards that vary. A good guide asks about your experience, sets a client ratio suited to the terrain, has a plan B for weather, carries insurance and is clear about what is included. Price alone tells you little; a cheap guide with a large rope team on a glacier is a real risk.

<objective>
{{objective}}
</objective>

<experience>
{{experience}}
</experience>

{{#options}}Options you are considering: {{options}}{{/options}}
</context>

<task>
1. Do you need a guide: from their objective and experience, say whether a guide, an instructor-led course or going independently makes sense, and why (glaciers, technical terrain and avalanche terrain usually call for a qualified guide unless you have the skills).
2. Qualifications to look for: explain in general terms which kind of qualification matches their objective (for example an IFMGA-standard mountain guide for glaciated peaks, a mountain leader type award for non-technical hill walking), and tell them to check the national guide association register for their destination. Do not claim any specific person is qualified.
3. Questions to ask: qualification and how to verify it, insurance, experience on this route, client ratio, the plan for acclimatisation and weather days, what happens if the client is too slow or the weather is bad, kit provided, rescue arrangements, and the cancellation and refund policy.
4. Ratios and plan: what sensible client ratios look like by terrain in general (often one or two clients per guide on serious Alpine routes, more for walking), and what a good guide will ask of them before the trip (a training plan, a warm-up day).
5. Red flags: no verifiable qualification for the terrain, guaranteed summits, large rope teams on glaciers, vague insurance, pressure to book fast, no questions about your experience.
6. Before you book: put agreements in writing, check travel insurance covers guided mountaineering at that altitude and activity, and plan fitness preparation.
</task>

<constraints>
- Do not name or recommend specific guides or companies, and do not judge a named guide as qualified; tell them how to verify.
- Qualification names and legal requirements differ by country; state the assumption and tell them to check locally.
- Do not invent prices.
</constraints>

<output_format>
## Do you need a guide
## Qualifications to look for
## Questions to ask
Numbered list.
## Ratios and plan
## Red flags
Checklist.
## Before you book
</output_format>
