---
schema: 1
id: praise-colleague-to-their-manager
kind: prompt
title: Praise a colleague to their manager
description: Writes a short note to a colleague's manager describing specific work they did, its impact and how it helped you, so it counts at review and promotion time.
category: email
version: 1.0.0
status: incubating
stage: [review]
role: [individual, software-engineer, project-manager, consultant]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [recognition, peer-feedback, appreciation, managing-up, review-evidence]
pairs_with:
  prompts: [write-recognition-message, write-award-nomination, give-feedback-sbi]
args:
  - name: colleague
    description: The colleague's name and role, and their manager's name if you know it.
    type: string
    required: true
  - name: what_they_did
    description: What they did, when, and what difference it made - to you, your team, a customer, a deadline or a number.
    type: text
    required: true
  - name: relationship
    description: How you work with them, for example "on another team, we depend on their API" or "client-side contact".
    type: string
output_contract:
  format: markdown
  sections: [Note, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers often do not see the best work their people do, especially work done for other teams. A short note from a peer or a customer, sent to the manager, is one of the most useful forms of recognition: it goes into review evidence and promotion cases, and it costs the sender five minutes. It works when it is specific (what exactly they did, when), names the impact in concrete terms (time saved, a deadline met, a customer kept, a number), and describes the behaviour behind it (took ownership, explained clearly, went beyond their remit), which maps to how reviews are written. Generic praise ("she's great to work with") is pleasant but useless as evidence. Copying the colleague is usually a nice touch, unless the note is meant as a surprise for a review cycle.
</context>

<task>
Write a note to the manager of {{colleague}}.{{#relationship}} Relationship: {{relationship}}.{{/relationship}}

<what_they_did>
{{what_they_did}}
</what_they_did>

1. If it is unclear what the colleague did, ask for one concrete example and stop.
2. Write the note:
   - Subject: "Thanks to [name] for [specific thing]".
   - First line: why you are writing.
   - What they did, specifically, with the date or project.
   - The impact, in concrete terms from the input (time, money, customer, deadline, quality). If no impact is given, describe the effect on the sender's work honestly rather than inventing numbers.
   - The behaviour that made the difference, in words a manager can reuse in a review (for example "took ownership of a problem outside their area").
   - A short close: no request, or an offer to share more.
3. Provide a two-line chat version.
4. Under Notes, suggest whether to copy the colleague, and to send it soon while it is fresh.
</task>

<constraints>
- Under about 120 words.
- Specific and factual; never invent outcomes, numbers or praise from others.
- No superlatives stacked up ("absolutely amazing, incredible"); one warm sentence is enough.
- Do not compare the colleague favourably against named others.
</constraints>

<output_format>
## Note
Subject line, the note, then a two-line chat version.
## Notes
Bullets.
</output_format>
