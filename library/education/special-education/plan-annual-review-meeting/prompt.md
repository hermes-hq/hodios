---
schema: 1
id: plan-annual-review-meeting
kind: prompt
title: Plan a support plan annual review meeting
description: Plans a person-centred annual review of a pupil's IEP or support plan from the school's side, with invitations, an agenda, the pupil's part, evidence to gather and how to record agreed changes.
category: special-education
version: 1.0.0
status: incubating
stage: [plan, review]
role: [teacher, manager]
requires: [none]
inputs: [notes, document]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [annual-review, person-centred-planning, review-meeting, family-partnership, meeting-agenda]
pairs_with:
  prompts: [write-iep-progress-report, gather-pupil-views-for-review, write-iep-goals]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, current plan outcomes or goals, progress data, the pupil's and family's known views, professionals involved, any concerns or disagreements, and whether a phase transition is coming.
    type: text
    required: true
  - name: setting
    description: Country or state and plan type, for example "US IEP annual review" or "England EHC plan annual review". Optional; changes legal steps and timescales.
    type: string
output_contract:
  format: markdown
  sections: [Before the meeting, Invitation, The pupil's part, Agenda, Running the meeting, After the meeting, Points to check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the school member of staff who runs a pupil's annual review of their IEP or support plan. Reviews often become a recital of reports in a crowded room, with the family hearing the data for the first time and the pupil absent or silent. Experienced coordinators prepare: reports are shared in advance, the family's and pupil's views are gathered first, the meeting is built around what is working, what is not working and what needs to change, the pupil takes part in a way that suits them, disagreements are acknowledged and recorded, and decisions leave the room with owners. They also know that reviews have legal steps and timescales that differ by system.

Pupil: {{pupil}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. Before the meeting: a checklist with timings - collect progress data against each outcome, request professionals' reports, gather the pupil's views, talk to the family beforehand about their hopes and worries, circulate reports in advance, and arrange interpreters or access needs.
2. Invitation: a short, friendly invitation to the family in plain language explaining the purpose, who will be there, how they can contribute, and that they may bring someone to support them.
3. The pupil's part: options for the pupil to take part (attending for part of the meeting, presenting a slideshow or one-page profile, a video, a trusted adult sharing their views), chosen with the pupil.
4. Agenda: a timed agenda of about an hour built around strengths, progress against each outcome, what is working, what is not working, changes to outcomes and provision, any transition, and actions.
5. Running the meeting: chairing tips, keeping language plain, handling disagreement (record differing views rather than forcing consensus), and keeping to time.
6. After the meeting: recording decisions, proposed changes to the plan, who sends what to whom by when, and how the family receives the record.
7. Points to check locally: legal steps, deadlines and who must be invited in the stated system.
</task>

<constraints>
- Use only information given; do not invent progress data or professionals' opinions. Mark gaps [needed].
- Do not diagnose or interpret specialist reports beyond what is written.
- Legal requirements and timescales differ by country and state; name the system you assume and say to check them, and do not state specific deadlines as fact.
- Initials only.
</constraints>

<output_format>
## Before the meeting
Checklist with timings.
## Invitation
Ready to adapt.
## The pupil's part
## Agenda
Table: Time | Item | Who leads.
## Running the meeting
## After the meeting
## Points to check locally
</output_format>
