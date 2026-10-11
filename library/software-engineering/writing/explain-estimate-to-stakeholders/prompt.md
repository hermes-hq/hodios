---
schema: 1
id: explain-estimate-to-stakeholders
kind: prompt
title: Explain an engineering estimate to stakeholders
description: Explains an engineering estimate to non-engineers - the range and confidence, what drives the time, what would shorten or lengthen it and the trade-offs on offer - without padding or false precision.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, software-engineer]
requires: [none]
inputs: [notes, text]
output: [message, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [estimates, stakeholder-communication, scope-trade-offs, uncertainty]
pairs_with:
  prompts: [estimate-with-ranges, explain-tech-to-executives]
args:
  - name: estimate
    description: Your estimate (ideally a range), what it covers, the main pieces of work, the unknowns, dependencies on other teams, and what was assumed about people and priorities.
    type: text
    required: true
  - name: stakeholder_question
    description: What the stakeholder asked or expects, for example "Can we have it by March?" or "Why does this take six weeks?".
    type: text
  - name: audience
    description: Who you are explaining to, for example "product manager", "sales director", "client".
    type: string
    default: product manager
output_contract:
  format: markdown
  sections: [Message, Talking points for pushback, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Estimates go wrong in conversation more than in calculation. A range gets heard as its low end, a single number is treated as a promise, "six weeks" is compared with "it's just a button", and an engineer under pressure trims the estimate instead of trimming scope. Explaining an estimate well means stating the range and what confidence it carries, showing where the time actually goes (often integration, testing, migration and review, not the visible feature), naming the unknowns that drive the upper end and when they will be resolved, and offering real levers: smaller scope, a phased release, more certainty after a spike, or accepting more risk. The estimate itself should not change because someone is unhappy with it.
</context>

<task>
Write an explanation of this estimate for a {{audience}}.

<estimate>
{{estimate}}
</estimate>
{{#stakeholder_question}}
They asked: {{stakeholder_question}}
{{/stakeholder_question}}

1. Answer their question directly in the first two sentences, with the range and a plain statement of confidence.
2. Explain where the time goes in three to five plain bullets, including the invisible work, using only the breakdown in the input.
3. Name the unknowns that drive the upper end and when or how each will be resolved.
4. State the assumptions (people, priorities, dependencies on other teams) and what happens to the range if they change.
5. Offer two or three levers with their effect: cut or defer scope, phase the release, run a short spike to narrow the range, or accept specific risks. Say what each gives up.
6. Draft short talking points for likely pushback ("can't you just...", "the other team did it in two weeks").
</task>

<constraints>
- Never shrink the estimate to please the audience; change scope, not the number. If the input's range seems inconsistent with its breakdown, flag it in Gaps.
- Do not invent work items, dates or team capacity.
- No jargon; the message is under about 250 words.
</constraints>

<output_format>
## Message
Ready to send.

## Talking points for pushback
| They say | You say |

## Gaps
Bullets, or "None".
</output_format>
