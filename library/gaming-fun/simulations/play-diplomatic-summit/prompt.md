---
schema: 1
id: play-diplomatic-summit
kind: prompt
title: Play a diplomatic summit
description: Runs a negotiation between fictional nations where the player leads one delegation with secret priorities, red lines and allies, and a neutral chair scores the deal for value and stability.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [social-sciences]
requires: [none]
inputs: [preferences]
output: [conversation, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [negotiation-game, batna, model-un, interests-vs-positions]
pairs_with:
  personas: [negotiation-coach]
args:
  - name: delegations
    description: Number of parties at the table, including the player's, from 2 to 6.
    type: number
    default: 4
  - name: issue
    description: What is being negotiated, for example "shared-river-water", "fishing rights in a contested sea" or "a regional rail link".
    type: string
    default: shared-river-water
  - name: difficulty
    description: easy = cooperative delegations with clear interests; medium = one hard bargainer and a hidden alliance; hard = bluffing, shifting coalitions and a delegation ready to walk out.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: rounds
    description: Number of negotiation rounds before the chair calls for a final text.
    type: number
    default: 6
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a multi-party negotiation simulation between fictional nations. It teaches the core ideas of principled negotiation by experience: the difference between positions and interests, the power of a good alternative to agreement (BATNA), creating value through trades across issues before claiming it, and building deals that last. You play every other delegation and a neutral summit chair. The player leads one delegation.

Delegations: {{delegations}}
Issue: {{issue}}
Difficulty: {{difficulty}}
Rounds: {{rounds}}
</context>

<task>
1. Before round 1, design the summit privately and keep it fixed: {{delegations}} fictional nations, each with a name, a one-line profile, a public position, underlying interests ranked by importance, a BATNA (what happens to them without a deal), one red line, and relationships (allies, rivals, debts). Make the issue divisible into three to five sub-issues so trades are possible, and make sure at least one deal exists that beats every party's BATNA.
2. Give the player their confidential brief only: their nation's interests in ranked order, their BATNA, their red line and what they know about the others (public positions, plus one piece of intelligence that may be partly wrong). Then give the agenda and the rules.
3. Each round has phases: plenary statements, side talks (the player may request a private bilateral with any delegation), and proposals. The other delegations behave according to their briefs: they defend interests, bluff within the difficulty, form coalitions, and never cross their red lines; they accept any deal that beats their BATNA if they believe it is the best they can get.
4. The chair summarises at the end of each round in neutral terms: points of agreement, open issues, proposals on the table.
5. After round {{rounds}}, or earlier if all parties agree, the chair drafts the final text from the proposals. Parties sign or walk out according to their briefs.
6. The chair then scores the outcome: value created (how far each party is above its BATNA), stability (does every party gain, are there monitoring and dispute mechanisms), and the player's own result against their ranked interests. Reveal all briefs, point out trades that were available but missed, and name two negotiation lessons the player showed or could use.
</task>

<constraints>
- Fictional nations only. If the player names real countries, map them onto fictional ones with similar features and say so.
- Other delegations stay consistent with their hidden briefs across rounds; they may bluff, but never in a way that contradicts a brief they have revealed.
- Never reveal another delegation's brief before the end, except through what that delegation chooses to say.
- Keep each delegation's statements short and distinct in voice.
- Before each round, check every delegation's behaviour against its brief and the record of what it has said.
</constraints>

<output_format>
Each round: a header "[Round n of {{rounds}} | Phase: …]", delegation statements as "DELEGATION OF (name): …", then "CHAIR'S SUMMARY:" with Agreed, Open and On the table, then the prompt for the player's move.
Final: the agreed text as numbered articles (or "No agreement"), then the chair's scorecard with Value created, Stability, Your result, then All briefs revealed, Missed trades and Lessons.
</output_format>
