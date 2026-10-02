---
schema: 1
id: reduce-meeting-load
kind: prompt
title: Reduce meeting load
description: Audits a set of recurring meetings for purpose, attendance and cost, and recommends which to keep, cut, shorten, merge or make async, with the messages to announce the changes. For managers and teams.
category: meetings
version: 1.0.0
status: incubating
stage: [review, plan]
role: [manager, engineering-manager, executive, project-manager]
requires: [none]
inputs: [text, dataset]
output: [report, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [meeting-audit, async-work, calendar-cleanup, focus-time, meeting-cost]
pairs_with:
  prompts: [audit-time-use, write-meeting-agenda]
  personas: [meeting-facilitator]
args:
  - name: meetings
    description: Your recurring meetings - name, frequency, length, number of attendees, who runs it, what happens in it and what it produces. A calendar export is fine; add how each one feels if you can.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current load, Meeting by meeting, Recommendations, Hours freed, Announcement, Experiment and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recurring meetings accumulate: each one made sense when it was created, nobody owns the total, and cancelling feels risky. A good audit asks of each meeting what it is for, whether that purpose needs people live at the same time, whether everyone invited is needed, and what it costs in person-hours. It then changes a few meetings at a time as a reversible experiment, with a clear message, so people do not quietly recreate them.

<meetings>
{{meetings}}
</meetings>
</context>

<task>
1. If key facts are missing for most meetings (frequency, length or attendees), ask for them in one message and stop. If only some are missing, make a labelled assumption and continue.
2. Compute the current load: for each meeting, hours per month for one attendee and person-hours per month (length × attendees × occurrences). Count a month as 4.3 weeks or 21 working days and say so. Total both. Show the arithmetic.
3. Classify each meeting's purpose: decide, solve a problem, plan or coordinate, share status, build relationships, or learn. Status-sharing is the prime candidate for async; decisions, hard problems and relationship time usually need live time.
4. Assess each meeting: is there a clear owner and output? Is everyone needed every time, or could some get the notes? Does the length fit the content? Does it overlap with another meeting?
5. Recommend for each: keep, shorten, reduce frequency, trim attendees, merge with another (name it), make async (and how: a written update template, a shared doc, a recorded demo), or cut. Give the reason in one line.
6. Total the person-hours freed per month and the hours freed for the user personally.
7. Draft a short announcement for the team: what changes, why, that it is a four-week experiment, how to raise a problem, and when it will be reviewed.
8. Define the experiment: what to watch (decisions delayed, missed information, people recreating meetings) and a review date.
</task>

<constraints>
- Use the facts given; label every assumption.
- Keep relationship time (1:1s, team rituals) unless there is a clear reason; cutting them often costs more than it saves. Suggest improving them instead.
- Never recommend cutting a meeting the user does not own without saying they will need the owner's agreement.
- Recommend at most about half the meetings for change in one round, so the experiment is manageable.
</constraints>

<output_format>
## Current load
Two lines: hours per month for the user, person-hours per month for everyone.
## Meeting by meeting
A table: Meeting | Purpose | Person-hours/month | Issues | Recommendation.
## Recommendations
Numbered, one per changed meeting, with the reason and how async replaces it where relevant.
## Hours freed
Person-hours per month and user hours per month, before and after.
## Announcement
A message ready to send, under 150 words.
## Experiment and review
What to watch and when to review.
</output_format>
