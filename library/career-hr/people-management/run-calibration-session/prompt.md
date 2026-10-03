---
schema: 1
id: run-calibration-session
kind: prompt
title: Run a performance calibration session
description: Plans a performance calibration session with pre-work, rating definitions, discussion order, facilitation rules, bias checks and how decisions are recorded. Use before managers meet to align ratings.
category: people-management
version: 1.0.0
status: incubating
stage: [plan, review]
role: [manager, engineering-manager, executive, operations-manager]
requires: [none]
inputs: [text, dataset, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [calibration, performance-ratings, rater-bias, review-cycle, facilitation]
pairs_with:
  prompts: [write-performance-review, allocate-merit-increases, build-career-ladder]
  personas: [hr-business-partner]
args:
  - name: team_size
    description: Number of people whose ratings will be calibrated.
    type: number
    required: true
  - name: rating_scale
    description: The rating scale with its definitions, any distribution guidance, and what ratings drive (pay, bonus, promotion).
    type: text
    required: true
  - name: review_cycle
    description: The cycle (for example annual or half-year), deadlines, who attends calibration (managers, HR, a facilitator), and how calibration has gone before. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and ground rules, Pre-work, Rating definitions, Agenda and discussion order, Bias checks, Decision record, After the session]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You facilitate performance calibration for organisations. Calibration exists so that a "meets expectations" from one manager means the same as one from another, and so that ratings rest on evidence rather than on who argues hardest. Sessions go wrong when managers arrive without written evidence, when the loudest or most senior voice sets the rating, when people discussed late get less time, when vague words ("not a team player", "lacks executive presence") go unchallenged, or when a forced distribution overrides evidence. They go well with written pre-work, shared definitions with examples, a time-boxed discussion order, a facilitator who asks for evidence, explicit bias checks, and a written record of every change and why it was made.

Team size: {{team_size}}

<rating_scale>
{{rating_scale}}
</rating_scale>
{{#review_cycle}}Cycle and attendees: {{review_cycle}}{{/review_cycle}}
</context>

<task>
1. Purpose and ground rules: a short statement of what calibration decides and what it does not. Ground rules: evidence over impressions, discuss the work rather than the person, confidentiality, every manager speaks for their own people but anyone may question, and the facilitator may pause a discussion for evidence.
2. Pre-work: what each manager submits before the session, and by when. Include a proposed rating per person with a three-to-five line evidence summary against the definitions (results and how they were achieved), key examples, the period the evidence covers, and any changes in role or leave during the period. Provide a one-row template. Also include a pre-read showing the proposed distribution by manager, so that patterns are visible before the meeting.
3. Rating definitions: rewrite the given scale into behavioural definitions with one or two concrete examples per level, so the group anchors on the same meaning. Keep the user's labels.
4. Agenda and discussion order: a timed agenda for {{team_size}} people. Set the time per person, with more time for the edges (top, bottom and proposed changes) and less for clear "meets" cases that nobody challenges. Vary the order to avoid fatigue and order effects (do not always go manager by manager or alphabetically), and include a break. If the number of people is too large for one session, split it and say how.
5. Bias checks: specific prompts for the facilitator to use during discussion. Cover recency ("Is this from the whole period?"), halo and horns, similarity bias, the leniency or strictness of particular managers, vague or gendered language ("abrasive", "emotional", "aggressive" versus "assertive"), visibility bias against remote or part-time workers, and leave or protected circumstances, which must not lower ratings. Add a final pattern check after the session: rating distribution by manager, location, gender or other groups where the data and law allow, with a review of any gaps.
6. Decision record: a template recording each person's proposed rating, final rating, the reason for any change, and the evidence cited, plus who will communicate it. Explain who holds the record and who can see it.
7. After the session: how managers prepare their conversations, consistent messaging, an appeal or review route if one exists, and three questions for a retrospective on the process.
</task>

<constraints>
- Do not force a distribution over evidence. If distribution guidance exists, treat it as a check that prompts discussion, not a quota, unless the user's policy says otherwise; if so, note the risk.
- Use only the scale and details given; mark gaps as [X] and ask about them at the end.
- Never use leave, health, pregnancy, age or other protected characteristics as a reason for a rating; flag any such input for HR.
</constraints>

<output_format>
## Purpose and ground rules
## Pre-work
Checklist, then the template row.
## Rating definitions
Table: Rating | Definition | Example.
## Agenda and discussion order
Table: Time | Segment | Who | Minutes per person.
## Bias checks
## Decision record
Template table: Person | Proposed | Final | Reason for change | Evidence | Communicated by.
## After the session
</output_format>
