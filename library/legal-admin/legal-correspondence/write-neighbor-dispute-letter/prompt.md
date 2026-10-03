---
schema: 1
id: write-neighbor-dispute-letter
kind: prompt
title: Write a letter to a neighbour about a dispute
description: Writes a calm letter to a neighbour about noise, boundaries, trees, parking or similar issues that proposes a concrete solution, keeps a record and names mediation as the next step.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
subject: [law, real-estate]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [neighbour-dispute, noise, boundaries, mediation]
pairs_with:
  prompts: [write-complaint-letter]
  personas: [legal-information-guide]
args:
  - name: issue
    description: What the problem is (noise at night, a hedge or tree over the boundary, a fence position, blocked driveway, rubbish, a dog barking, CCTV pointing at your garden), how often and since when, and how it affects you.
    type: text
    required: true
  - name: history
    description: What has already happened - conversations, notes, anything the neighbour said or offered, any involvement of a landlord, building manager, council or police, and how the relationship is now. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you send, Letter, Record to keep, If it does not work]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write letters between neighbours the way a community mediator would advise. Neighbour disputes are rarely about the law and almost always about the relationship: you will live next to this person for years. Most escalate because the first written contact sounds like an accusation or a legal threat. A good first letter assumes the neighbour may not know, describes the effect rather than their character, proposes something specific and easy to say yes to, and invites a conversation. It still creates a dated record, because if things go to a landlord, council, mediation service or court, the first reasonable approach matters.
</context>

<task>
The issue:

<issue>
{{issue}}
</issue>
{{#history}}

History so far:
<history>
{{history}}
</history>
{{/history}}

1. Check for safety first. If the history mentions threats, violence, harassment, stalking, damage to property or someone being frightened to go home, say not to send a letter directly and to contact the police (emergency number if in danger) and, if relevant, the landlord or housing provider. Stop there except for the record-keeping section.
2. Before you send: one to three lines on whether a short conversation might work better first, and on involving a landlord or building manager if either party rents or lives in a managed building.
3. Write the letter (under 250 words):
   - A friendly opening that assumes good faith.
   - The issue described specifically and neutrally: what, when, how often, with one or two concrete examples and dates.
   - The effect on the writer's household, briefly.
   - A specific proposal (quiet after 11pm on weeknights, trimming the overhanging branches back to the boundary with the writer offering access or sharing the cost, keeping the driveway clear between 7 and 9am) and an openness to the neighbour's ideas.
   - An invitation to talk, with how to reach the writer.
   - No legal threats, no mention of lawyers or court, no ultimatum. A neutral close.
4. Record to keep: the date and method the letter was delivered, a copy, a diary of incidents (date, time, what, duration, effect), photos or recordings only where lawful and from your own property, and any replies.
5. If it does not work: free community or neighbour mediation services, the landlord or building manager, the local council's relevant team (noise, trees, highways, planning, environmental health), and getting legal advice for boundary position or property damage. Phrase these as things to look up locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not exaggerate frequency or effects. Use [BRACKETS] for names and dates not provided.
- Do not state rights as fact (for example "the law says you can cut any branch over your boundary" or "noise after 10pm is illegal"). Rules on trees, boundaries, noise and CCTV vary by place; say what to check locally.
- Never encourage the writer to act unilaterally in a way that could escalate or create liability: cutting down a tree, moving a fence, blocking access, retaliatory noise, posting about the neighbour online.
- Boundary disputes involving the line itself, and any damage to property, are worth legal advice before anything is done; say so.
- Warm, plain and short. The letter should sound like a reasonable person, not a form.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you send
One to three lines.

## Letter
The letter, ready to send, with [BRACKETS] for gaps.

## Record to keep
Bullets.

## If it does not work
Numbered next steps to look up locally.
</output_format>
