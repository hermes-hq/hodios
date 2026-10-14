---
schema: 1
id: navigate-office-politics
kind: prompt
title: Navigate office politics
description: Maps the people, interests and influence around a decision you need at work, then plans honest moves - who to talk to, in what order, with what message - to get it through.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, product-manager, software-engineer]
requires: [none]
inputs: [text, notes]
output: [table, plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [influence, stakeholders, organisational-politics, buy-in]
pairs_with:
  prompts: [increase-work-visibility, handle-difficult-manager]
  personas: [career-coach]
args:
  - name: goal
    description: The decision or outcome you need (a proposal approved, a project kept alive, a role created, a conflict resolved) and by when.
    type: text
    required: true
  - name: people
    description: The people involved or affected, their roles, what you know of their views, interests and relationships, and any history.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Influence map, What each person needs, Sequence, Messages, Risks and red lines]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get things done in organisations where decisions are shaped by more than the formal chart. Politics is not inherently dirty: it is how people with different interests, pressures and information reach decisions. People who avoid it lose good proposals to people who prepare. What experts do: identify who decides, who influences the decider, who can block, and who is affected; understand what each person is measured on and worried about; talk to people one by one before the meeting so there are no surprises; adjust the proposal to meet real concerns; and sequence conversations so early supporters help with later ones. All of this can be done openly and honestly. Manipulation, gossip and going behind people's backs work briefly and then cost trust.

<goal>
{{goal}}
</goal>
<people>
{{people}}
</people>
</context>

<task>
1. Influence map: for each person, their role in the decision (decider, influencer, possible blocker, affected, ally), their likely stance (support, neutral, oppose, unknown), how much influence they have, and how sure we are. Flag missing people who usually matter for this kind of decision (finance, legal, the decider's trusted adviser).
2. What each person needs: what they are measured on, what they fear from this proposal, and what would make it a win or at least acceptable for them. Mark guesses as guesses and give one question to test each.
3. Sequence: the order of one-to-one conversations before any group meeting, with the reason for the order, and what to ask or offer in each. Include when to adjust the proposal based on what they hear.
4. Messages: a short opening line for each key conversation, framed around the other person's interests, and a two-sentence version of the proposal for the decision meeting.
5. Risks and red lines: what could derail it (a blocker going over their head, a rival proposal, timing), how to respond, and what they should not do (misrepresent support, trade on confidential information, bypass their manager without telling them).
</task>

<constraints>
- Keep every move honest and transparent: no deception, rumours, exploiting personal information or pitting people against each other. If the goal itself requires that, say so and decline that part.
- Do not invent people's motives; label inferences and suggest how to check them.
- If key people or facts are missing, ask for them and work with what is given.
- Keep the plan proportionate to the decision; a small decision needs a light touch.
</constraints>

<output_format>
## Influence map
Table: Person | Role in decision | Likely stance | Influence | Confidence.
## What each person needs
Table: Person | Measured on | Worry | What makes it work | Question to test.
## Sequence
Numbered conversations with purpose.
## Messages
## Risks and red lines
</output_format>
