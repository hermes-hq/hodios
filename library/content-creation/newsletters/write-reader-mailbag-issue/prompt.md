---
schema: 1
id: write-reader-mailbag-issue
kind: prompt
title: Write a reader mailbag issue
description: Turns reader replies into a mailbag issue, choosing questions that serve most readers, quoting with permission or anonymised, answering briefly and honestly, and saying when to see a professional.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [message, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [mailbag, reader-questions, reader-replies, anonymising, advice-column]
pairs_with:
  prompts: [write-newsletter-issue, build-evergreen-issue-bank]
  personas: [newsletter-editor]
args:
  - name: reader_messages
    description: The reader replies, emails or comments to draw on, pasted with whatever you know about permission to quote each one (asked, granted, anonymous only, unknown).
    type: text
    required: true
  - name: voice_notes
    description: How you write and answer - a short sample, your expertise and its limits, and any answers you already have in mind. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions chosen, Issue, Permissions check, Not answered]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a newsletter writer turn reader mail into a mailbag issue. Mailbags work because readers see their own questions answered and the writer's thinking applied to real situations. They go wrong when the writer picks the most flattering messages instead of the most useful, quotes people who did not agree to be published or leaves identifying details in, gives confident answers outside their expertise, or answers health, legal, money or safety questions that need a professional.
</context>

<task>
<reader_messages>
{{reader_messages}}
</reader_messages>
{{#voice_notes}}
<voice_notes>
{{voice_notes}}
</voice_notes>
{{/voice_notes}}

1. Sort the messages: questions most readers share, specific one-off questions, praise, criticism, and anything that needs a private reply or a professional.
2. Choose three to five questions that serve the most readers, including at least one that pushes back or disagrees if there is one. Explain each choice in one line.
3. For each chosen question, prepare the quote: use the reader's words lightly trimmed for length (never changed in meaning), with their name only if permission is stated; otherwise anonymise ("a reader in teaching asks") and remove identifying details (employer, town, unusual circumstances, family members).
4. Answer each in 80-200 words in the writer's voice: the direct answer first, the reasoning, one practical step, and an honest "I don't know" or "it depends on ..." where true. Use only what the voice notes and general knowledge support; mark where the writer must add their own view as [X].
5. If a question touches health, mental health, legal, money or safety decisions, give general information only and say which kind of professional to see; if a message suggests someone is in danger, do not publish it, and flag it for a private reply that points them to local emergency services or a crisis line.
6. End with a prompt inviting next round's questions and how to send them, including the anonymity promise.
7. Write two subject lines.
</task>

<constraints>
- Never invent reader messages, names, quotes or details.
- Never publish a quote with unknown permission under the reader's name; anonymise it and flag it.
- Do not mock or dunk on critical readers; answer the substance.
- No diagnosis, dosage, legal outcome prediction or specific investment advice in answers.
- Keep the issue under about 1,000 words.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Questions chosen
Bullets: the question in short form and why it was chosen.

## Issue
Subject line options, a short intro, then each question in bold with its answer, then the closing invitation.

## Permissions check
Table: reader | quoted as | permission status | action needed.

## Not answered
Bullets: messages left out and how to handle each (private reply, later issue, referral).
</output_format>
