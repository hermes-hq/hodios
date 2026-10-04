---
schema: 1
id: plan-family-inheritance-conversation
kind: prompt
title: Plan a family conversation about inheritance
description: Plans a family conversation about wills, inheritance or care costs with goals, who to include, an agenda, phrases that lower tension and when to bring in a professional.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
advice_risk: [legal, financial]
requires: [none]
inputs: [text]
output: [plan, script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [inheritance, wills, care-costs, family-meeting, estate-planning, ageing-parents]
pairs_with:
  prompts: [prepare-difficult-conversation, navigate-family-gathering-tension, plan-dementia-conversations, mediate-disagreement]
args:
  - name: situation
    description: What needs discussing and why now, for example "Dad wants to change his will after remarrying", "Mum may need a care home and we don't know how it will be paid for", "we need to decide what happens to the family farm".
    type: text
    required: true
  - name: family
    description: Who is involved and how they get on - parents, siblings, partners, step-family, who lives nearby, who does the caring, past tensions.
    type: text
    required: true
  - name: concerns
    description: What you are worried will go wrong, for example "my brother will think we're after the money" or "Mum gets upset and shuts down".
    type: text
output_contract:
  format: markdown
  sections: [Purpose and goals, Who and when, Before the conversation, Agenda, Phrases that help, Flashpoints, When to bring in a professional, After the conversation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families plan conversations about wills, inheritance, powers of attorney and the cost of care. These conversations get postponed because they touch death, money, fairness and old family roles all at once, and then happen in a crisis. They go better when the person whose wishes are at stake leads, the goal is understanding before deciding, everyone who will be affected hears the same thing at the same time, the setting is calm, and the legal and financial questions are written down for professionals instead of being argued at the table. Common flashpoints: a sibling who does the caring and expects that to count, step-families and second marriages, unequal gifts or loans in the past, a family home or business, and suspicion that someone is influencing an older parent.

<situation>
{{situation}}
</situation>
<family>
{{family}}
</family>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Purpose and goals: what this conversation is for (sharing wishes, understanding options, agreeing next steps) and what it is not for (deciding the contents of a will, settling who deserves what). State two or three realistic goals.
2. Who and when: who should be there and why, whether the person whose wishes are at stake wants to raise it themselves, whether to meet in person or include someone remotely, and timing that avoids holidays, hospital stays or the day after bad news.
3. Before the conversation: what the person whose estate or care it is might want to think through or gather in advance, and what each family member can prepare (questions, not demands).
4. Agenda: a running order for about an hour, from opening and ground rules through wishes, questions and practical next steps, to closing.
5. Phrases that help: opening lines, ways to ask about wishes, ways to respond to tears, anger or "you just want the money", and ways to pause the conversation kindly. Tailor them to the concerns.
6. Flashpoints: for each tension in the family description, what might trigger it and how to handle it in the room.
7. When to bring in a professional: which kind (solicitor or estate lawyer, financial adviser, care funding adviser, tax adviser, family mediator) and for what, with the questions to bring to each.
8. After the conversation: a short written summary sent to everyone, who does what next, and when to talk again.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the family what a will should say, how to divide assets, how to reduce tax or care fees, or whether something is legal. Turn those into questions for the right professional.
- The person whose wishes are at stake decides. Do not suggest ways to pressure, persuade or manipulate them, or to exclude family members without that person's wish.
- If anything suggests the person may lack capacity to make decisions, or is being pressured or exploited by someone, say that this needs a professional (a solicitor, their doctor, or adult social care or safeguarding services) before any family discussion of the will.
- Keep phrases warm and plain, and fair to every family member described.
- Before answering, check that no part of the plan gives a legal or financial recommendation.
</constraints>

<output_format>
Markdown with these headings:
## Purpose and goals
## Who and when
## Before the conversation
## Agenda
Table: Time | Item | Who leads.
## Phrases that help
## Flashpoints
Table: Tension | Likely trigger | How to handle it.
## When to bring in a professional
Table: Professional | What for | Questions to bring.
## After the conversation
</output_format>
