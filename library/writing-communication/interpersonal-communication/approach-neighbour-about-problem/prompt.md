---
schema: 1
id: approach-neighbour-about-problem
kind: prompt
title: Approach a neighbour about a problem
description: Plans a friendly first approach to a neighbour about noise, parking, trees, pets or rubbish, with the words to use, when to knock and what to do next if it does not work.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [neighbours, noise, awkward-situations, first-contact, community]
pairs_with:
  prompts: [write-neighbor-dispute-letter, write-neighbourhood-notice, set-boundary]
  personas: [communication-coach]
args:
  - name: problem
    description: What the neighbour does, how often, how it affects you, how long it has been going on and anything already said or tried.
    type: text
    required: true
  - name: neighbour
    description: What you know about them, for example "new family upstairs with a toddler", "elderly man next door we wave to", "tenants I have never met". Optional.
    type: text
  - name: housing
    description: Your setup and country if relevant, for example "rented flat in a block with a managing agent, UK" or "owned house, suburban US with an HOA". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you knock, What to say, If they react badly, A note instead, If nothing changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most neighbour problems are fixed or ruined by the first conversation. Many neighbours do not know they are a problem: sound travels in ways they cannot hear from their side, a tree overhangs only from your view, a dog barks only when they are out. A first approach works best when it is early (before resentment builds), in person or by a friendly note, at a calm time (not mid-party, not at 11pm when you are furious), assumes good faith, describes the specific effect rather than judging them, and asks for one concrete, small change. Leading with complaints to the landlord, council, HOA or police, or posting in the neighbourhood group, usually turns a fixable issue into a feud, and you still have to live next to them. Formal routes matter, but as a later step, with a record of what you tried.
</context>

<task>
Help me plan a first friendly approach to my neighbour.

<problem>
{{problem}}
</problem>
{{#neighbour}}
<neighbour>
{{neighbour}}
</neighbour>
{{/neighbour}}
{{#housing}}Housing and country: {{housing}}{{/housing}}

1. Safety first. If the neighbour has threatened, harassed or intimidated me, or the issue involves violence, drug dealing or a serious risk, do not script a doorstep chat. Say so, suggest the formal and safety routes instead, and stop.
2. If it is unclear what the specific problem is or what I want to change, ask up to two short questions and stop.
3. Check whether the ask is reasonable: separate what is normal living noise or use (footsteps, a baby crying, daytime DIY) from what is avoidable or excessive, and say honestly if part of my ask is unlikely to be met.
4. Plan timing and setting: when to knock, who should go, how long to keep it, and whether a note first is better (for shift workers, people I have never met, or if I am nervous).
5. Write the opening: a friendly introduction if we have not met, the specific effect described as my experience ("the bass comes through our bedroom wall after midnight on weeknights"), and one concrete request or an open "is there anything we could work out?"
6. Write two or three likely responses (surprised and helpful, defensive, counter-complaint about me) and calm replies to each, including how to accept a partial fix.
7. Say what to do next if nothing changes: keep a short dated log, a written follow-up, then the formal route that fits my housing (landlord or managing agent, HOA or residents' association, community mediation, local council or authority), and when each makes sense. Tell me to check local rules rather than stating them as fact.
</task>

<constraints>
- Do not state specific noise hours, bylaws, boundary or tree laws as fact; describe them as things to check locally.
- No sarcasm, threats, passive-aggressive notes or mention of the police in the first approach.
- Keep spoken lines short and natural; the whole doorstep conversation should take under two minutes.
- Offer something back where it fits (a phone number to text if it happens again, flexibility on timing).
- Do not assume who is in the wrong. If my description suggests I may be part of the problem, say so tactfully.
</constraints>

<output_format>
## Before you knock
Is the ask reasonable, best time, in person or note, what to have in mind.
## What to say
The opening and request, as spoken words.
## If they react badly
Table: If they say… | You can say…
## A note instead
A short, friendly note (under 80 words) for if knocking is not possible.
## If nothing changes
The next steps in order, with what to keep a record of.
</output_format>
