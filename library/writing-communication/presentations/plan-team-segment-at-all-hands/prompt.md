---
schema: 1
id: plan-team-segment-at-all-hands
kind: prompt
title: Plan your team's slot at an all-hands
description: Plans one team's short slot at a company all-hands or town hall, with one headline, one visual, a short story about real impact, no jargon, and a timed script that fits the slot.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, product-manager, individual]
requires: [none]
inputs: [notes]
output: [script, outline]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [all-hands, team-update, plain-language, storytelling, timing]
pairs_with:
  prompts: [plan-all-hands-meeting, write-lightning-talk, shorten-presentation-for-time]
args:
  - name: team_news
    description: What your team did or will do that you could talk about, with any numbers, customer stories or launches. Notes are fine.
    type: text
    required: true
  - name: slot
    description: How long you have and how many slides are allowed, for example "5 minutes, 2 slides".
    type: string
    default: 5 minutes, up to 3 slides
  - name: company_context
    description: Who is in the audience (size, functions, remote or in person) and anything the organisers asked teams to cover. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The headline, Slides, Script, Cut list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team lead or team member fill a short slot at a company all-hands. Most of the audience does not work with this team, does not know its acronyms, and has just sat through several other updates. Slots fail when the presenter lists ten projects, shows a dense roadmap screenshot, uses internal names ("we shipped Falcon v2 to the PX pipeline"), and overruns, which organisers remember. A slot works when it has one headline the whole company should remember, says why it matters to people outside the team (customers, revenue, their own work), illustrates it with one concrete story or example, shows one simple visual, credits people by name, and finishes on time with one thing the audience can do (try it, send feedback, ask us).

Team news: {{team_news}}
Slot: {{slot}}
{{#company_context}}Audience and organiser asks: {{company_context}}{{/company_context}}
</context>

<task>
1. Choose the one headline from the team news that matters most to the whole company, and say why it beats the other candidates.
2. Translate it into plain language: what changed, for whom, and why the rest of the company should care. Replace every internal name or acronym with a plain description.
3. Pick one concrete story or example from the notes (a customer, a before and after, a number) to bring the headline to life.
4. Plan the slides within the allowed count: usually one headline slide with a single visual (a big number, a before and after, a screenshot placeholder), and optionally one slide for credits and the call to action.
5. Write a timed script at about 130 spoken words per minute, finishing 15 to 30 seconds under the slot. Include an opening line that is not "Hi, I'm X from team Y and today I'm going to talk about".
6. Name the people to credit and the single call to action.
7. List everything cut from the notes so the team knows it was deliberate.
</task>

<constraints>
- Use only news in the notes; do not invent numbers, customer names or results. Mark anything uncertain as [confirm].
- No internal jargon, codenames or acronyms without a plain explanation.
- One headline only; other news goes in the cut list or a follow-up message.
- The script must fit the slot with time to spare.
</constraints>

<output_format>
## The headline
One sentence and why it was chosen.

## Slides
For each slide: title, the single visual, any words on screen.

## Script
Timed script with word count and estimated time.

## Cut list
Bullets of news left out, with where it could go instead.
</output_format>
