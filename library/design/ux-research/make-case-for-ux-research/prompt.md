---
schema: 1
id: make-case-for-ux-research
kind: prompt
title: Make the case for UX research
description: Builds the argument to get a UX study approved by a sceptical team, tying it to a risky decision, the cost of being wrong and a small first step, and answering likely objections.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, notes]
output: [plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-buy-in, stakeholder-persuasion, research-advocacy, cost-of-delay, research-proposal]
pairs_with:
  prompts: [scope-ux-research-project, plan-ux-research-roadmap, map-assumptions]
  personas: [ux-researcher]
args:
  - name: decision
    description: The upcoming product or design decision the research would inform, with what is being built or changed and roughly how much effort it represents.
    type: text
    required: true
  - name: objections
    description: What the sceptics say, for example "no time", "we already know our users", "five users is not statistically significant".
    type: text
    required: true
  - name: decision_maker
    description: Who approves it and what they care about (revenue, deadlines, risk, quality). Optional.
    type: text
output_contract:
  format: markdown
  sections: [The bet being made, Cost of being wrong, The smallest useful study, Answers to objections, The ask, Short pitch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Research gets turned down when it is pitched as a good practice ("we should talk to users") instead of as risk reduction on a specific bet. Decision-makers fund things that protect something they already care about: a launch date, a revenue target, engineering time. The arguments that work name the assumption the plan rests on, estimate what it costs if that assumption is wrong (rework, missed adoption, support load), and offer a study small and fast enough that saying yes is cheap, often fitted inside the existing timeline. Common objections have honest answers: small qualitative samples are for finding problems, not measuring them; "we know our users" can be tested by writing down predictions first; and research can run in parallel with build. Overselling (promising research will guarantee success) damages trust in the next request.
</context>

<task>
<decision>
{{decision}}
</decision>

<objections>
{{objections}}
</objections>
{{#decision_maker}}

<decision_maker>
{{decision_maker}}
</decision_maker>
{{/decision_maker}}

1. Name the bet: the 2 or 3 assumptions the plan depends on, and which one is riskiest (most uncertain and most costly if wrong).
2. Estimate the cost of being wrong in the team's own terms (weeks of rework, delayed launch, lost adoption, support load), using numbers from the input or clearly labelled placeholders.
3. Propose the smallest study that would test the riskiest assumption: method, participants, duration, and how it fits the current timeline. Add a prediction exercise: stakeholders write what they expect before results come in.
4. Answer each objection honestly and briefly, conceding where it is fair.
5. State the ask: time, people, budget, and the decision the results will feed, with a date.
6. Write a short pitch (under 150 words) the person can send or say.
</task>

<constraints>
- Do not claim research guarantees success or quote invented industry statistics or return-on-investment figures.
- Do not invent the team's costs; use their numbers or label placeholders.
- If research would not change the decision (it is already made, or trivially reversible), say so instead of arguing for it.
- Keep the tone collaborative; the sceptics are partners, not opponents.
</constraints>

<output_format>
## The bet being made
## Cost of being wrong
## The smallest useful study
## Answers to objections
| Objection | Honest answer |
## The ask
## Short pitch
</output_format>
