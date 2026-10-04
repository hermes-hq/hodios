---
schema: 1
id: brief-board-on-roadmap
kind: prompt
title: Brief a board on the roadmap
description: Prepares a roadmap briefing for a board, trustees or co-op committee covering the few bets that matter, cost, what was cut, risks and the decisions asked, plus answers to likely questions.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, executive, product-manager, manager]
requires: [none]
inputs: [text, notes, document]
output: [docs, outline, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [board-paper, governance, trustees, decision-request, executive-summary]
pairs_with:
  prompts: [build-outcome-roadmap, write-roadmap-update, plan-runway-based-roadmap]
args:
  - name: roadmap_and_context
    description: The roadmap, the goals behind it, the money (budget, spend, runway or funding), what was cut or deferred, known risks, and what you need from the board.
    type: text
    required: true
  - name: board_type
    description: Who you are briefing - a startup board, charity trustees, a co-operative committee or a public body's board or committee.
    type: enum
    enum: [startup-board, charity-trustees, co-op-committee, public-body]
    default: startup-board
  - name: minutes_available
    description: Minutes on the agenda for this item, including discussion.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Board paper, Talk track, Likely questions, Decisions requested, Gaps to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare leaders to brief their governing body on the roadmap. Boards do not govern features. They govern direction, money, risk and the leadership's judgement, and they want to know what decision or support is being asked of them. Briefings fail when they walk through a feature list, hide what was cut, present risks without options, or leave no time for discussion.

Board type: {{board_type}}
Agenda time: {{minutes_available}} minutes.

What each board type weighs most:
- startup-board: progress toward the next value milestone, burn and runway, the few bets that change the company's trajectory, hiring, and where directors can help (introductions, customers, hires).
- charity-trustees: fit with charitable objects and strategy, beneficiary outcomes and safeguarding, restricted versus unrestricted funds, reserves, risk register, and trustee duties.
- co-op-committee: members' interests and mandate, fairness between member groups, surplus use, and how members will be told.
- public-body: statutory duties, value for public money, equality and accessibility impact, audit trail, and public and political risk.
</context>

<task>
Roadmap and context:

<roadmap_and_context>
{{roadmap_and_context}}
</roadmap_and_context>

1. Pick the two to four bets that matter at board level. Each: what it is in one plain sentence, the outcome it serves, why now, what it costs (money and people), and how the board will know it is working.
2. State what was cut or deferred and why. Boards trust a plan more when they can see the trade-offs.
3. Name the top three risks with likelihood, impact and the mitigation, and any risk the board must own or accept.
4. Frame the decisions or support you need: approve, note, or advise, each worded as a resolution or question the chair can put.
5. Write a board paper of one to two pages in the order the board reads: purpose and decision, summary, bets, money, trade-offs, risks, decisions.
6. Write a talk track that uses no more than a third of {{minutes_available}} minutes, leaving the rest for discussion.
7. Anticipate the eight hardest questions this board type will ask and draft short, honest answers. Where the answer is unknown, say so and say when it will be known.
</task>

<constraints>
- Use only the figures given. Missing costs, budgets or runway become [X] in the paper and appear in Gaps to fill.
- No feature lists, jargon or internal team names; write for non-specialists.
- Do not overstate certainty. Show confidence for each bet (high, medium, low) and what would change it.
- Present bad news early and plainly, with options.
- Never give legal or financial advice on directors' or trustees' duties; suggest checking with the organisation's legal or finance adviser where duties are involved.
</constraints>

<output_format>
## Board paper
Headed paper: Purpose and decision sought, Summary (five bullets max), The bets (table: bet | outcome | why now | cost | confidence | measure), Money, What we are not doing, Risks (table), Decisions requested.

## Talk track
Timed bullets for the speaking time, then "Discussion" for the rest.

## Likely questions
Q and A pairs, two to four sentences per answer.

## Decisions requested
Each decision worded for the minutes.

## Gaps to fill
Every [X] and fact to check before the paper is sent.
</output_format>
