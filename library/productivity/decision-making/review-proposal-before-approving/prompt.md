---
schema: 1
id: review-proposal-before-approving
kind: prompt
title: Review a proposal before approving it
description: Reviews a proposal brought to you for sign-off - the ask, gaps, risks and what is missing - and frames an approve, approve with conditions, send back or reject decision with the questions to ask.
category: decision-making
version: 1.0.0
status: incubating
stage: [review]
role: [manager, executive, founder, project-manager]
requires: [none]
inputs: [document, text]
output: [report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [approvals, sign-off, proposal-review, governance, due-diligence]
pairs_with:
  prompts: [write-decision-memo, run-pre-mortem, surface-hidden-assumptions]
args:
  - name: proposal
    description: The proposal, business case or request as written (paste it), or a faithful summary.
    type: text
    required: true
  - name: approver_context
    description: Your role, what you are accountable for, the budget or authority you have, and what you already know about the people or project.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is being asked, What is strong, Gaps and missing information, Risks, Questions to ask, Decision options, Suggested decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an approver review a proposal someone has brought for sign-off. Approvers tend to fail in two ways: rubber-stamping because the proposer is trusted or the deck is polished, and blocking with vague "more work needed" feedback that costs the proposer weeks. A good review starts by stating exactly what is being asked (money, people, time, an exception to a rule, a commitment that is hard to undo) and what the approver will be accountable for if it goes wrong. Common weaknesses in proposals: no "do nothing" or cheaper alternative compared; benefits stated without a baseline or measure; costs that leave out ongoing running costs, people's time or the cost of stopping; optimistic timelines with no contingency; risks listed without owners; no point at which the work would be stopped; and dependencies on teams who have not agreed. The useful output is a decision with conditions and a small number of sharp questions, not a list of everything that could be better.

Proposal:
<proposal>
{{proposal}}
</proposal>

Approver context:
<approver_context>
{{approver_context}}
</approver_context>
</context>

<task>
1. State what is being asked in one or two lines: the commitment, its size, how reversible it is, and what the approver becomes accountable for.
2. List what is strong in the proposal, briefly.
3. Find gaps: missing alternatives (including doing nothing), missing costs (running, people, exit), benefits without a baseline or measure, unrealistic timing, unagreed dependencies, missing stop criteria. Quote the proposal where relevant.
4. Assess risks: the three to five that matter most, with likelihood, impact and whether the proposal handles them.
5. Write five to eight questions to ask the proposer, ordered by how much the answer would change the decision.
6. Lay out the decision options: approve, approve with conditions (name them: smaller first phase, budget cap, checkpoint date, stop criteria), send back with specific asks, or reject with reasons.
7. Suggest a decision and say what answer to the top question would change it.
</task>

<constraints>
- Judge the proposal on what it says; do not invent facts about the organisation or the people. Mark assumptions.
- Keep feedback specific enough that the proposer could act on it in one revision.
- If the proposal involves legal, regulatory, financial reporting or safety obligations, list the specialist sign-offs that should be in place rather than judging those points yourself.
- Do not let polish or confidence count as evidence.
</constraints>

<output_format>
## What is being asked
One or two lines.

## What is strong
Bullets.

## Gaps and missing information
Bullets, quoting the proposal where useful.

## Risks
Table: Risk | Likelihood | Impact | Handled in the proposal?

## Questions to ask
Numbered, most decision-relevant first.

## Decision options
Approve, approve with conditions (listed), send back (with asks), reject.

## Suggested decision
Two or three sentences and the answer that would change it.
</output_format>
