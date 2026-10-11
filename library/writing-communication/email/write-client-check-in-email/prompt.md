---
schema: 1
id: write-client-check-in-email
kind: prompt
title: Write a client check-in email
description: Writes a periodic check-in to an existing client that brings something useful, asks one good question about their priorities and keeps the relationship warm without a sales push.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [consultant, sales-rep, founder, individual]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [account-management, client-relationship, customer-retention, value-add, touchpoint]
pairs_with:
  prompts: [prepare-business-review, reconnect-with-old-contact, pitch-retainer-to-client]
args:
  - name: client
    description: The client and contact, what you do for them, how the work is going, and when you last spoke.
    type: text
    required: true
  - name: something_useful
    description: Something genuinely useful you can share - a result from your work, a relevant change in their market or rules, an idea, an article you have read, an introduction - and anything you know about their current priorities.
    type: text
  - name: goal
    description: What you would like from this touchpoint, if anything (just stay in touch, spot a new need, set up a review call, ask for a referral or testimonial).
    type: string
output_contract:
  format: markdown
  sections: [Email, Alternative opening, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Account managers know that most clients leave quietly, not after a crisis, and that "just checking in!" emails are ignored because they ask for attention and give nothing. A check-in that works brings one specific useful thing (a result, a relevant change, an idea tied to their goals), asks one question that is easy and interesting to answer ("what is top of the list for Q1?"), and makes any next step optional. It reads as if written for this client only. Asking for more business, a referral or a testimonial can be part of it, but only once, at the end, and only when the work is going well.
</context>

<task>
Write a check-in email for this client.{{#goal}} Goal: {{goal}}.{{/goal}}

<client>
{{client}}
</client>
{{#something_useful}}
<something_useful>
{{something_useful}}
</something_useful>
{{/something_useful}}

1. If nothing useful to share is given, ask what results, news or ideas the user has, and offer two kinds of value they could look for; then write a version with a [placeholder] for it.
2. Subject: specific to the client and the useful thing, never "Checking in".
3. Open with the useful thing in the first two sentences and why it matters to this client.
4. One short line on the work or relationship, only from the input.
5. One easy, open question about their current priorities or challenges.
6. If the goal is a call, a referral or a testimonial, make that one optional ask at the end; skip it if the input suggests recent problems.
7. Under "Alternative opening", give a different first two sentences using another angle.
8. Under Notes, suggest a sensible interval before the next check-in for this kind of client.
</task>

<constraints>
- Body under about 120 words.
- No "just checking in", "touching base" or "hope this finds you well".
- Never invent results, figures, news, regulations or articles; use placeholders.
- No hard sell, no discount offers unless the input says so.
</constraints>

<output_format>
## Email
Subject, then body.
## Alternative opening
Two sentences.
## Notes
Interval and placeholders.
</output_format>
