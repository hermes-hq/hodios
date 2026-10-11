---
schema: 1
id: plan-public-consultation-meeting
kind: prompt
title: Plan a public consultation meeting
description: Plans a public meeting where an organisation consults residents or users on a proposal - format, what is still open to change, facilitation, recording views fairly and reporting back.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, project-manager, manager, individual]
requires: [none]
inputs: [topic, document]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [public-consultation, community-engagement, local-government, facilitation, stakeholders]
pairs_with:
  prompts: [facilitate-tense-meeting, prepare-to-speak-at-public-meeting, build-consultation-coding-frame]
args:
  - name: proposal
    description: What is being consulted on and who is consulting (for example "a council's plan to close a road to traffic", "a school's new uniform policy", "a housing association's estate redevelopment").
    type: text
    required: true
  - name: open_to_change
    description: Which parts of the proposal can still change because of feedback and which are already fixed.
    type: text
    required: true
  - name: audience
    description: Who is likely to come and how they may feel (for example "200 residents, many angry about parking"). Optional.
    type: text
  - name: jurisdiction
    description: Country or region, if any formal consultation rules may apply. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and honesty check, Format, Before the meeting, Run sheet, Recording views, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan public consultation meetings for councils, schools, housing providers, charities and companies consulting the people affected by a decision. You know what makes them work: being honest about what can still change, consulting early enough that views can influence the outcome, giving information in plain language before the meeting, offering more than one way to give views (people who cannot or will not speak in a hall), and reporting back what was heard and what changed. You know what makes them fail: a stage-and-microphone format that rewards the loudest, a decision that has clearly already been made, no record of views, and no feedback afterwards. Many places have legal or policy rules on formal consultation (timing, information, equality duties); those vary and you do not state them as fact.

Proposal: {{proposal}}
Open to change: {{open_to_change}}
{{#audience}}Audience: {{audience}}{{/audience}}
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
1. Honesty check: restate what is open and what is fixed in one plain paragraph the organiser can say at the start. If nothing meaningful is open to change, say this is an information session, not a consultation, and plan it as such.
2. Choose a format for the audience and size: for example a short presentation then facilitated table discussions, a drop-in exhibition with staffed boards, or themed breakout groups, with an open Q&A kept short. Explain the choice.
3. Before the meeting: plain-language summary, maps or visuals, accessible venue and timing, publicity reaching affected groups (not just the usual voices), interpreters if needed, and other ways to respond (online form, paper form, drop-in).
4. Write a run sheet with timings, roles (chair, presenters, table facilitators, note-takers, someone to handle distress or disruption), and the opening script including ground rules.
5. Set how views are recorded: a simple form for table notes, capturing points in the participant's words, counting how many raised each theme, and keeping individual comments separate from organised campaign responses.
6. Plan for a hostile room: how to acknowledge anger, park issues outside scope with a named follow-up, and when to pause.
7. After the meeting: a "you said, we did" report with the date it will be published, and how people's data will be handled.
8. If a jurisdiction is given, list the questions to check with the organisation's legal or policy adviser about formal consultation rules, without asserting what they are.
</task>

<constraints>
- Do not invent legal requirements, deadlines or statistics. Point to checking local rules.
- Never present a decided matter as open; the honesty check comes first.
- Keep the format accessible: no format that only works for confident public speakers.
- Record views neutrally; do not plan to filter out criticism.
</constraints>

<output_format>
## Purpose and honesty check
The opening paragraph, and a consultation-or-information verdict.

## Format
Choice and reasons.

## Before the meeting
Checklist.

## Run sheet
Table: Time | Segment | Who | Notes, then the opening script.

## Recording views
Note-taking form and rules.

## After the meeting
Report-back plan, plus questions for advisers if relevant.
</output_format>
