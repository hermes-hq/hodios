---
schema: 1
id: build-sales-presentation-deck
kind: prompt
title: Build a sales presentation deck
description: Builds a slide-by-slide sales deck for a specific prospect meeting, led by the buyer's problem and discovery notes, with proof, pricing approach, objections and a clear next step.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [notes, text, document]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sales-deck, prospect-meeting, buyer-problem, objections, customer-proof]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, drill-presentation-qa, plan-backup-slides]
  personas: [presentation-designer]
args:
  - name: prospect
    description: Who you are meeting, their organisation, the people in the room and their roles, and what you learned in discovery (their problem, current approach, what it costs them, deadlines).
    type: text
    required: true
  - name: offer
    description: What you sell, what it does for this kind of buyer, and the proof you actually have (customer results you may cite, case studies, references).
    type: text
    required: true
  - name: meeting
    description: Meeting length, stage of the sale (first meeting, demo, final proposal), in person or remote, and the outcome you want. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Meeting goal, Storyline, Slides, Objections to prepare, Next step ask, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most sales decks are company decks: who we are, our history, our logo wall, our features, then a "questions?" slide. Buyers sit through them and remember nothing, because nothing was about them. Decks that move deals start with the buyer's situation in their own words, quantify what the problem costs them, show the change your offer makes with proof from a customer like them, deal openly with the risks they are already thinking about (switching cost, effort, security, price), and end with a specific next step that has a date and an owner on both sides. Different people in the room care about different things: the user cares about daily work, the budget holder about cost and risk, IT about integration and security. A short deck that leaves time to talk beats a long one presented at people.

<prospect>
{{prospect}}
</prospect>
<offer>
{{offer}}
</offer>
{{#meeting}}
<meeting>
{{meeting}}
</meeting>
{{/meeting}}
</context>

<task>
1. State the meeting goal as a decision or commitment you want by the end, fitted to the stage of the sale.
2. Write the storyline in five to seven sentences that a buyer could repeat to a colleague afterwards.
3. Plan the slides: for each, a headline that states the point, what goes on it, the talking point, and which person in the room it is for. Open with their situation, not your company. Keep the deck short enough to leave at least a third of the meeting for discussion.
4. Use only the proof supplied; place it where it answers the doubt most likely at that moment.
5. Give the pricing approach for this stage (show, range, or defer to proposal) and why.
6. List the objections each person is likely to raise and a short, honest answer to each.
7. Write the next-step ask with a specific action, owner and date to propose.
8. List gaps: discovery questions still open and proof you would need.
</task>

<constraints>
- Never invent customer names, results, statistics, logos or quotes. Where proof is missing, write [PROOF NEEDED: …].
- Do not make claims about competitors you cannot support from the input.
- No pressure tactics such as false deadlines or invented scarcity.
- If discovery notes are too thin to lead with the buyer's problem, say so and list the questions to ask first.
</constraints>

<output_format>
## Meeting goal
## Storyline
## Slides
Table: # | Headline | Content | Talking point | For whom.
## Objections to prepare
Table: Objection | Likely from | Answer.
## Next step ask
## Gaps to fill
</output_format>
