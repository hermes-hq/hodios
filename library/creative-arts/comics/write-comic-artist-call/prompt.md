---
schema: 1
id: write-comic-artist-call
kind: prompt
title: Write a call for a comic artist
description: Writes a call for a comic artist on a writer's project, with the project pitch, the job scope, the pay and rights terms to state, a paid test page brief, how to apply and red flags to avoid.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [hiring-artists, collaboration, creator-owned, test-page, job-ad]
pairs_with:
  prompts: [write-comic-script, plan-comic-production-schedule, write-character-model-sheet-brief]
args:
  - name: project
    description: The comic, its genre and tone, the format and length, and what is written so far.
    type: text
    required: true
  - name: terms
    description: "What you can offer: page rate or total budget and currency, or a profit share, who owns what, deadlines, credit, and whether colours and letters are included. Say what you have not decided."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The call, Test page brief, Selection criteria, Terms to put in writing, Red flags to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help comic writers find artists. Good artists get many vague requests; the calls that get strong replies are specific about the project, the page count and schedule, the pay, and the rights. Artists distrust "exposure" offers, unpaid test pages, and backend-only deals where the writer keeps the rights; a call that states fair terms upfront saves everyone time. A short paid test page (one script page with a clear acting moment, an action beat and a quiet panel) tells you more than a portfolio. Pencils, inks, colours and letters are separate jobs that can be one person or several, so the call says which are wanted. Rates vary widely by market and experience, so the writer sets their own budget and states it honestly. Ownership, credit, payment schedule and what happens if the project stops must be agreed in writing before work starts.

Project: {{project}}
Terms: {{terms}}
</context>

<task>
1. The call: write a post of about 200 to 300 words: project pitch in two lines, the job (which stages, page count, page size and format), the schedule, the pay as stated in {{terms}}, ownership and credit, what to send (portfolio link, sequential pages not just pin-ups, availability), and the reply-by date as a blank.
2. Test page brief: one test page from the script or a short sample you write that tests acting, clarity and one action beat, and a line saying it is paid at the stated rate.
3. Selection criteria: how to judge replies: storytelling clarity, consistency across pages, meeting deadlines, communication, and fit with the tone.
4. Terms to put in writing: a checklist of points to settle in a written agreement before work starts (payment schedule, ownership and licence, credit, revisions, deadlines, what happens if either side leaves or the project stops), noting that local law differs and a lawyer can check the final agreement.
5. Red flags to avoid: things in the writer's own call or plan that put good artists off.
</task>

<constraints>
- Do not invent rates, market averages or legal rules; use the terms given and leave decisions as blanks.
- If {{terms}} offers no payment or no rights to the artist, say plainly how artists will read it and suggest fairer options, but do not refuse to help.
- This is not legal advice; the terms checklist is a list of topics, not contract wording.
- Keep the call free of discriminatory requirements.
</constraints>

<output_format>
## The call
## Test page brief
## Selection criteria
## Terms to put in writing
A checklist.
## Red flags to avoid
</output_format>
