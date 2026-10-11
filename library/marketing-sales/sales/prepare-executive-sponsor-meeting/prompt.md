---
schema: 1
id: prepare-executive-sponsor-meeting
kind: prompt
title: Prepare an executive sponsor meeting
description: Prepares a short meeting with a buyer's senior executive - a one-page brief, three business outcomes, a tight agenda, sharp questions and the one ask to leave with.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, executive]
requires: [none]
inputs: [notes, text]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [executive-meeting, c-suite, deal-strategy, business-outcomes, enterprise-sales]
pairs_with:
  prompts: [build-buyer-business-case, write-mutual-action-plan, prepare-deal-negotiation]
  personas: [deal-desk-analyst, sales-coach]
args:
  - name: deal_notes
    description: Where the deal stands - problem, impact, champion, other stakeholders, timeline, competition, risks, and what has been agreed so far.
    type: text
    required: true
  - name: executive
    description: Who you are meeting (title, area of responsibility, anything public they have said about priorities) and how the meeting came about.
    type: text
    required: true
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Meeting goal, One-page brief, Agenda, Questions, The ask, Risks and prep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare sellers for meetings with a buyer's senior executive. Executives give short meetings and judge quickly whether the seller understands their business. Sellers waste them by demoing features, retelling company history, or asking basic questions the champion could have answered. The meeting works when it is about the executive's outcomes (revenue, cost, risk, strategic goals), confirms that the problem is a priority worth funding, surfaces what could stop the deal, and ends with one concrete commitment.

The champion should help: preview the brief with them, ask what the executive cares about and how they like to run meetings, and agree who says what. Bring your own senior person only if they add something specific.
</context>

<task>
Prepare a {{minutes}}-minute executive meeting.

<deal_notes>
{{deal_notes}}
</deal_notes>

<executive>
{{executive}}
</executive>

1. Define the meeting goal in one sentence and the outcome that would make it a success.
2. Write a one-page brief to send or bring: their situation as you understand it, three business outcomes tied to their priorities (with the numbers the buyer has given, or placeholders), the proposed approach in plain words, the timeline and decision steps, and open risks.
3. Write a tight agenda with timings that leaves at least a third of the time for the executive to talk.
4. Write six to eight questions at executive level: priorities, how they measure success, what would make this a must-do this year, concerns, what they need to see, and how they want to be involved.
5. Define the one ask (for example sponsoring the evaluation, confirming budget timing, joining a decision meeting, introducing procurement) and a fallback ask.
6. List risks for the meeting and prep steps with the champion.
</task>

<constraints>
- Use only facts in the notes; never invent ROI, customer names or the executive's priorities. Label inferences.
- No product demo or feature list in the agenda unless the executive asked for one.
- The brief fits on one page (about 300 words).
- Do not plan to go around the champion; plan to involve them.
</constraints>

<output_format>
## Meeting goal
One sentence and the success outcome.

## One-page brief
The brief, about 300 words.

## Agenda
Table: Minutes | Item | Who leads.

## Questions
Numbered questions.

## The ask
Main ask and fallback.

## Risks and prep
Bullets, including steps with the champion.
</output_format>
