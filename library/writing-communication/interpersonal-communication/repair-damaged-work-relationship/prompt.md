---
schema: 1
id: repair-damaged-work-relationship
kind: prompt
title: Repair a damaged work relationship
description: Plans how to repair a working relationship after a clash or a long chill, with a reset conversation, owning your part, new working agreements and how to rebuild trust over the next weeks.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, product-manager]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [repair, trust, workplace, conflict-resolution, working-agreements]
pairs_with:
  prompts: [apologize-effectively, clear-up-misunderstanding, mediate-disagreement]
  personas: [workplace-mediator]
args:
  - name: situation
    description: Who the colleague is, what happened (the clash, how long things have been tense), how you each behaved, how it affects the work now, and what you want the relationship to be.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What went wrong, Your part, The reset conversation, Working agreements, Next few weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Work relationships rarely recover on their own after a clash; people go polite and cold, route around each other, and the work suffers. Repair usually needs one person to go first. What works: a private, low-stakes invitation ("Have you got 20 minutes this week? I'd like to reset how we work together"), owning your part specifically and briefly without demanding they own theirs, asking how it looked from their side and listening, then moving quickly to the future with two or three concrete working agreements (how decisions are made, how disagreement is raised, how updates are shared). Trust then rebuilds through small kept promises over weeks, not one conversation. You do not need to become friends; a respectful, functional relationship is a good result. If there was harassment, discrimination or a serious breach, repair conversations are not the right tool and formal routes come first.
</context>

<task>
Help me repair this working relationship.

<situation>
{{situation}}
</situation>

1. If the situation involves harassment, bullying, discrimination or threats, say a reset conversation is not the right tool, point to HR, a union or a trusted manager, and stop.
2. If key details are missing (what happened, how it affects work now), ask up to two short questions and stop.
3. Describe what likely went wrong from both sides, including the work pressures and different styles or incentives that may have fed it. Be fair to the colleague.
4. Help me name my part honestly: what I did or failed to do, in one or two specific sentences, without grovelling or blaming myself for their behaviour.
5. Write the reset conversation: the invitation message, an opener, my part, an open question about their view, listening prompts, and a move to the future. Include how to respond if they are cold, still angry, or say "it's fine" without meaning it.
6. Propose two or three working agreements specific to how we work (handoffs, decisions, disagreements, communication channel).
7. Give a plan for the next few weeks: small actions that rebuild trust, a light check-in, and signs it is working or that a manager or mediator should help.
</task>

<constraints>
- Do not make me take all the blame or excuse their behaviour; aim for a fair account.
- No grand apologies or emotional over-sharing; keep it professional and warm.
- Keep the invitation under about 50 words and spoken lines short.
- Do not assume the colleague's motives; mark guesses as guesses.
</constraints>

<output_format>
## What went wrong
A fair, two-sided account.
## Your part
One or two sentences I can say.
## The reset conversation
Invitation, opener, questions, and table: If they say… | You can say…
## Working agreements
Two or three concrete agreements to propose.
## Next few weeks
Actions, check-in and signs of progress.
</output_format>
