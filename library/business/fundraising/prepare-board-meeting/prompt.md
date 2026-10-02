---
schema: 1
id: prepare-board-meeting
kind: prompt
title: Prepare a board meeting
description: Prepares a board pack and agenda - performance against plan, decisions needed, risks, asks and a pre-read memo, so the meeting is spent on decisions. For founders and CEOs with boards.
category: fundraising
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, executive]
inputs: [text, dataset, document]
output: [docs, outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [board-pack, board-agenda, pre-read, governance, investor-relations]
pairs_with:
  prompts: [write-investor-update, build-annual-operating-plan, explain-term-sheet]
  personas: [startup-mentor]
args:
  - name: company_update
    description: What happened since the last meeting - results against plan (revenue, burn, cash, runway, key metrics), wins, misses, hiring, product, customers, and anything difficult. Notes and pasted numbers are fine.
    type: text
    required: true
  - name: decisions_needed
    description: Decisions or approvals you need from the board (budget, hires, option grants, a fundraise, a pivot, a policy), and advice you want. Leave empty if you are unsure; the prep will suggest what belongs on the agenda.
    type: text
output_contract:
  format: markdown
  sections: [Agenda, Pre-read memo, Performance against plan, Decisions requested, Risks, Asks of the board, Formal items, Before the meeting, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help startup CEOs run board meetings that are worth the board's time. The best meetings send a written pre-read several days ahead so that status is absorbed before the meeting, and use the meeting itself for decisions, hard problems and advice. Weak meetings are slide-by-slide status updates where bad news appears late, decisions are vague, and nobody leaves with actions. A board trusts a CEO who brings problems early with a proposed answer.
</context>

<task>
Prepare the board meeting.

<company_update>
{{company_update}}
</company_update>
{{#decisions_needed}}
<decisions_needed>
{{decisions_needed}}
</decisions_needed>
{{/decisions_needed}}

1. Agenda: a timed agenda (usually 2-3 hours) that puts decisions and strategic discussion first and status last or in the pre-read only. Include an executive session (board without management) slot if appropriate, and formal items such as approving minutes.
2. Pre-read memo: a 1-2 page memo written by the CEO, starting with the headline (how the period went in three sentences, including the most important bad news), then performance against plan, the decisions requested, and the topics for discussion.
3. Performance against plan: a table of key metrics with plan, actual, variance and a one-line explanation for each significant variance. Include cash, monthly burn and runway in months, and show the runway calculation. Separate one-off effects from trends.
4. Decisions requested: for each decision, a short paper: the question, background, options considered with pros and cons, the recommendation, the cost and risk, and the exact resolution wording to approve. If no decisions were given, identify what in the update likely needs board approval or input (for example a budget change, new option grants, a fundraise, a change in strategy) and mark them as suggestions.
5. Risks: the top risks to the plan, with likelihood, impact, owner and mitigation; anything that threatens runway or compliance goes first.
6. Asks of the board: specific help wanted (introductions, hiring help, customer contacts, expertise), each named to a skill rather than a person unless the input names one.
7. Formal items: a list of governance items that may be due, such as approval of previous minutes, option grants, financial statements, related-party matters or conflicts, and policy approvals, marked as items to confirm with the company secretary or lawyer.
8. Before the meeting: who to pre-wire with which issue (no surprises at the table), when to send the pack, and what to prepare for likely questions.
</task>

<constraints>
- Use only the figures given. Never invent metrics, plan numbers or board members' views. Mark missing numbers as [NEEDED: …] and list them under Missing information.
- Bad news goes in the headline, not buried. If runway is under about nine months, say so prominently with the options.
- Arithmetic of variances and runway must be exact with the formula shown.
- Formal approvals, director duties and resolution wording depend on the company's constitution, shareholder agreements and jurisdiction; recommend the company secretary or lawyer confirms wording and quorum. This is meeting preparation, not legal advice.
</constraints>

<output_format>
## Agenda
Table: Time | Item | Lead | Purpose (decide, discuss, inform).
## Pre-read memo
## Performance against plan
Table: Metric | Plan | Actual | Variance | Explanation. Then the runway calculation.
## Decisions requested
One decision paper per item, ending with the proposed resolution.
## Risks
Table: Risk | Likelihood | Impact | Owner | Mitigation.
## Asks of the board
## Formal items
Checklist.
## Before the meeting
## Missing information
</output_format>
