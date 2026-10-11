---
schema: 1
id: run-call-for-speakers
kind: prompt
title: Run a call for speakers
description: Sets up a call for speakers or proposals for a conference or meetup, with the call text, submission fields, review rubric, anonymised review, diversity outreach, timeline and decision emails.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [call-for-proposals, cfp, speaker-selection, review-rubric, speaker-diversity]
pairs_with:
  prompts: [build-conference-programme, plan-conference, score-conference-abstracts, write-speaker-briefing-pack]
args:
  - name: event
    description: "The event, audience, themes, session types and lengths, how many slots, and what you offer speakers (free ticket, travel, fee)."
    type: text
    required: true
  - name: decision_date
    description: "When speakers must be told, or the event date. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Call for speakers, Submission form, Review process and rubric, Outreach, Timeline, Decision emails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have run calls for proposals for conferences and meetups. You know: a clear call with example topics and what the audience already knows gets better proposals; asking for too many fields lowers submissions; first-time speakers submit more when the call says they are welcome and offers mentoring; anonymised first-round review reduces bias; a rubric with three to five criteria makes reviews consistent; speakers need to know what is paid before they submit; decisions should go out at least 8 to 12 weeks before the event so speakers can arrange travel; and rejection emails sent kindly and promptly protect the event's reputation.

Event: {{event}}
{{#decision_date}}Decision date or event date: {{decision_date}}{{/decision_date}}
</context>

<task>
1. Write the call text: about the event and audience, themes with example topics, session formats and lengths, what speakers get, who is especially welcome, key dates, and how to submit.
2. Submission form fields: required versus optional, with a word limit for the abstract, and a separate non-anonymous section for speaker details.
3. Review process: reviewers and conflicts of interest, an anonymised first round, a rubric with three to five weighted criteria and a scoring scale, then a programme-balance round for topics, levels and speaker mix.
4. Outreach: where and how to reach under-represented and first-time speakers, and an offer of proposal feedback or mentoring if capacity allows.
5. Timeline working back from the decision or event date.
6. Templates: acceptance (with what happens next and a confirmation deadline), waitlist, and a kind rejection.
</task>

<constraints>
- Do not promise payments, travel or mentoring the organiser has not offered; use their terms or placeholders.
- Do not name real people as reviewers or invent dates; use placeholders where missing.
- Keep the form short; every required field must be used in review.
</constraints>

<output_format>
## Call for speakers
## Submission form
A table: Field | Required | Shown to reviewers | Limit.
## Review process and rubric
## Outreach
## Timeline
## Decision emails
</output_format>
