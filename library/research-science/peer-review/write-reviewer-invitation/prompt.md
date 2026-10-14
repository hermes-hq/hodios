---
schema: 1
id: write-reviewer-invitation
kind: prompt
title: Write reviewer invitation and reminder emails
description: Writes an editor's reviewer invitation that gets a fast yes or no, plus the reminder, overdue and thank-you messages, with the abstract, deadline, conflict question and policies stated clearly.
category: peer-review
version: 1.0.0
status: incubating
stage: [plan]
role: [editor]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [reviewer-invitation, editorial-process, email-templates]
pairs_with:
  prompts: [plan-reviewer-search, decide-review-invitation]
args:
  - name: manuscript_details
    description: Title, abstract, article type and anything special about the manuscript (for example "needs a statistical reviewer").
    type: text
    required: true
  - name: journal_terms
    description: Review deadline, review model (single-anonymous, double-anonymous, open), AI-use and confidentiality policy, any reviewer recognition, and how to accept or decline.
    type: text
    required: true
  - name: why_this_reviewer
    description: Why you are inviting this person, in a phrase, for example "your work on cohort attrition", so the invitation is personal.
    type: string
output_contract:
  format: markdown
  sections: [Invitation, Reminder to respond, Reminder before deadline, Overdue message, Thank-you note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reviewer acceptance rates have fallen, and invitations that look like spam, bury the abstract, or hide the deadline get ignored. Invitations that work are short, personal in one sentence (why this reviewer), show the title and abstract up front, state the deadline and the expected scope, ask about conflicts of interest, state the review model and AI-use policy, and make declining easy, ideally asking for a suggested alternative. Reminders work best when they are brief, give a specific date, and offer an extension rather than guilt. A specific thank-you after the review, mentioning what was useful, increases the chance of the next yes.
</context>

<task>
Write the invitation set for this manuscript.
<manuscript>
{{manuscript_details}}
</manuscript>
<journal_terms>
{{journal_terms}}
</journal_terms>
{{#why_this_reviewer}}
Why this reviewer: {{why_this_reviewer}}
{{/why_this_reviewer}}

1. Write the invitation: subject line, one personal sentence, title and abstract, what is asked (and any specific focus), deadline, review model, conflict-of-interest question, confidentiality and AI-use policy, any recognition offered, and how to accept or decline with a request for alternatives.
2. Write a short reminder to respond to the invitation.
3. Write a reminder a few days before the review deadline, offering an extension.
4. Write an overdue message that asks for a new date or a release, without blame.
5. Write a thank-you note with a placeholder for one specific useful point from the review.
</task>

<constraints>
- Do not reveal author names if the review model is double-anonymous.
- Use only the terms given; leave "[placeholder]" for any missing detail such as the system link or editor name, never invent a URL or policy.
- Keep the invitation under 250 words excluding the abstract.
- Avoid flattery and pressure tactics.
</constraints>

<output_format>
Each section has a subject line and the message body.
## Invitation
## Reminder to respond
## Reminder before deadline
## Overdue message
## Thank-you note
</output_format>
