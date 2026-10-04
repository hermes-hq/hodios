---
schema: 1
id: write-issue-correction-note
kind: prompt
title: Write a newsletter correction note
description: Writes the correction for an error in a newsletter issue that has already been sent, sized to the harm, with what was wrong, what is right and how it happened, plus the web archive edit note.
category: newsletters
version: 1.0.0
status: incubating
stage: [operate]
role: [writer, editor, content-creator]
requires: [none]
inputs: [text]
output: [message, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [corrections, sent-email, editorial-standards, reader-trust, archive-edits]
pairs_with:
  prompts: [preflight-newsletter-issue, write-local-news-morning-briefing]
  rules: [newsletter-sourcing-rules]
args:
  - name: error
    description: What the sent issue said, quoted if possible, when it went out, to how many readers if known, and whether anyone has complained or been affected.
    type: text
    required: true
  - name: correct_information
    description: What is actually right, and how you know (the source you checked).
    type: text
    required: true
  - name: severity
    description: Your first read of the harm. minor is a typo-level slip nobody would act on; material is a wrong fact, date, price, link or attribution readers might act on; harmful could hurt a person, an organisation, readers' money, health or safety.
    type: enum
    enum: [minor, material, harmful]
    default: material
output_contract:
  format: markdown
  sections: [Decision, Correction text, Archive note, Prevent a repeat]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a newsletter writer correct a mistake in an issue that is already in readers' inboxes. Unlike a web article, a sent email cannot be fixed in place: every reader keeps the wrong version. So the correction must reach the same readers with the same prominence the error had, in proportion to the harm. Writers tend to fail in one of two directions: they bury a material error in a footnote three issues later, or they send an anxious, over-apologetic separate email about a typo, which draws more attention than the slip deserved. A good correction says what was wrong, what is right and, briefly, how it happened, without repeating a damaging claim more than necessary. Writer's severity call: {{severity}}.
</context>

<task>
<error>
{{error}}
</error>

<correct_information>
{{correct_information}}
</correct_information>

1. Check the severity call against these tests and change it if needed, saying why:
   - minor: no reader would act differently (a misspelling, a wrong word that does not change meaning). Fix the web archive; mention in the next issue only if readers noticed.
   - material: a reader could act on it (a wrong date, price, deadline, link, statistic, attribution, or misrepresenting someone's view). Correct near the top of the next issue; send a short separate email if the next issue is more than a few days away or the deadline or event comes first.
   - harmful: could damage someone's reputation, money, health or safety, or is a possible defamation or privacy problem. Send a separate correction now, fix the archive, and contact the affected person or organisation directly. Suggest legal advice before sending if the error is about a named person or business and they have complained.
2. Write the correction in that format: what we said, what is right, a one-line cause if useful ("I misread the council's table"), and a short apology only if readers were affected. Say the wrong claim once, plainly, and do not restate a damaging allegation in detail.
3. Write a dated archive note for the top or bottom of the web version.
4. Name one process change that would have caught this error.
</task>

<constraints>
- Use only the facts given. If how you know the correct information is missing, ask for the source before treating it as settled, and mark it [CONFIRM].
- No minimising language ("a small slip" for a material error), no blaming others, no grovelling.
- Do not quietly edit the archive without a note for material or harmful errors.
- For a harmful error, you give general guidance only: you do not decide whether something is defamatory or what to say to a lawyer; say when to get legal advice.
- Keep the in-issue correction under 60 words and a separate email under 150.
</constraints>

<output_format>
## Decision
Severity (confirmed or changed, with the reason), format (archive only, next-issue line, top-of-issue correction or separate send) and timing.

## Correction text
The ready-to-send wording, with a subject line if it is a separate send.

## Archive note
The dated note and where it goes.

## Prevent a repeat
One or two bullets.
</output_format>
