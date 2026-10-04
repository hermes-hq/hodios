---
schema: 1
id: peer-tutoring-launch-track
kind: workflow
title: Peer tutoring launch track
description: Launches a school or university peer tutoring programme in gated steps, from goals and safeguarding to tutor training, matching, first sessions and an impact review after a term.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design, build, operate, review]
role: [teacher]
requires: [none]
inputs: [text, preferences, notes]
output: [plan, checklist, table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [peer-tutoring, cross-age-tutoring, mentoring-programme, tutor-training, safeguarding, impact-evaluation]
pairs_with:
  prompts: [design-tutoring-session, plan-intervention-group, evaluate-training-effectiveness]
args:
  - name: setting
    description: Where the programme runs. Sets the safeguarding approach, who can tutor whom, and how sessions are timetabled.
    type: enum
    enum: [primary, secondary, university]
    default: secondary
  - name: subjects
    description: The subjects or skills to be tutored and who needs help, e.g. "Year 7 reading fluency, tutored by Year 10" or "first-year statistics, tutored by second- and third-years".
    type: text
    required: true
  - name: tutors
    description: How many tutors you expect to recruit in the first term.
    type: number
    default: 10
steps:
  - {id: goals-and-design, file: steps/01-goals-and-design.md, stage: plan, gate: approve}
  - {id: safeguarding-and-approvals, file: steps/02-safeguarding-and-approvals.md, stage: plan, gate: approve}
  - {id: recruit-and-train, file: steps/03-recruit-and-train.md, stage: build, gate: approve}
  - {id: matching, file: steps/04-matching.md, stage: build, gate: approve}
  - {id: first-sessions, file: steps/05-first-sessions.md, stage: operate, gate: approve}
  - {id: impact-review, file: steps/06-impact-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Launches a peer tutoring programme in a `{{setting}}` setting, one approved step at a time: clear goals and a simple model, safeguarding and approvals, recruiting and training about {{tutors}} tutors, matching tutors to tutees, running and supporting the first sessions, and reviewing impact after a term. Subjects and need:

<subjects>
{{subjects}}
</subjects>

Peer tutoring works when it is structured: trained tutors, a set session routine, regular sessions over weeks, the right materials and staff monitoring. It does not work as unsupervised "homework buddies".

Each step produces one document and stops for the lead's approval; later steps build on approved decisions. Never invent policies, legal requirements or data; use placeholders such as [check with your safeguarding lead]. Refer to learners by role or code, never by name.
