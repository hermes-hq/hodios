---
schema: 1
id: prepare-recommender-packet
kind: prompt
title: Prepare a recommender packet
description: Builds a brag sheet and packet for teachers or professors writing recommendations, with achievements, stories they witnessed, the programme list, deadlines and how to submit.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, resume]
output: [message, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [recommendation-letters, brag-sheet, references, college-admissions, graduate-admissions]
pairs_with:
  prompts: [plan-university-application, write-statement-of-purpose, plan-scholarship-applications, write-email-to-professor]
args:
  - name: recommender
    description: Who will write the letter, their role, how long and in what context they have known you (classes, grades, projects, research), and whether they have agreed yet.
    type: text
    required: true
  - name: achievements
    description: Your relevant achievements, work and moments with this recommender - assignments, projects, contributions in class, improvement over time, anything they saw you do. Include your CV if you have one.
    type: text
    required: true
  - name: applications
    description: Every programme or scholarship the letter is for, with deadlines, how the letter is submitted (portal link sent automatically, email, upload) and anything specific each one asks recommenders to address.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Request message, Brag sheet, Stories they witnessed, Application list, Reminder schedule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recommenders write many letters each season, often from memory, and the most common weak letter is a generic one ("a hard-working, pleasant student") because the writer has nothing specific to say. Admissions and scholarship readers value letters with concrete examples and comparisons, and the student can make those possible by reminding the recommender of specific moments they saw, without telling them what to write. A good packet is short: what the student is applying for and why, a one-page brag sheet, two or three stories the recommender witnessed with dates, a clean table of deadlines and submission methods, and anything programmes ask recommenders to address. Asking four to six weeks before the first deadline, waiving the right to see the letter where the form asks (readers often trust waived letters more), and polite reminders a week before deadlines are standard practice.
</context>

<task>
Build the recommender packet.

<recommender>
{{recommender}}
</recommender>

<achievements>
{{achievements}}
</achievements>

<applications>
{{applications}}
</applications>

1. Draft the request message (or the follow-up if they have already agreed): a polite ask with an easy way to decline, the programmes in one line, the first deadline, and a note that the packet is attached.
2. Write a one-page brag sheet: what the student is applying for and their goals in two lines, then the achievements most relevant to this recommender, with facts (grades, projects, results) only as given.
3. Pick two or three stories the recommender witnessed, each with the course or setting, the date or term, what the student did, and what it shows (for example persistence, original thinking, leadership). Phrase them as reminders, not as text for the letter.
4. Build the application list: programme, deadline, submission method, and anything the programme asks recommenders to comment on. Order by deadline and flag deadlines less than four weeks away.
5. Set a reminder schedule: when to send the packet, a check-in about 10 days before the first deadline, a reminder about 3 days before, and a thank-you note after, with the outcome later.
</task>

<constraints>
- Use only achievements and stories the student gave; do not invent or inflate them.
- Do not draft the recommendation letter itself, even if asked; if the recommender has asked the student to draft their own letter, suggest giving a detailed packet instead and note that some programmes forbid applicant-drafted letters.
- If the deadline is very close, say so and adjust the message to be honest about the short notice and offer an easy way to decline.
- Keep the packet short enough to read in five minutes.
</constraints>

<output_format>
## Request message
## Brag sheet
## Stories they witnessed
## Application list
A table: Programme | Deadline | How to submit | Anything to address.
## Reminder schedule
A table: Date | Action.
</output_format>
