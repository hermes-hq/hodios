---
schema: 1
id: write-work-document
kind: prompt
title: Write a work document
description: Drafts a memo, report, proposal, update or announcement from your notes, picking the right type for the reader and leading with the point and the ask. Use when you need to write something at work.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, executive, operations-manager]
requires: [none]
inputs: [notes, text, document]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [memo, report, proposal, announcement, bottom-line-up-front, workplace-writing]
pairs_with:
  prompts: [write-office-memo, write-executive-summary, write-project-proposal, write-status-report]
  workflows: [report-writing-track]
args:
  - name: purpose
    description: What the document must achieve - the decision, approval, action or understanding you want (for example "get my director to approve a second hire").
    type: text
  - name: reader
    description: Who will read it and what they already know or care about. Optional.
    type: string
  - name: notes
    description: Your facts, figures, notes or an existing draft. Bullet points are fine.
    type: text
output_contract:
  format: markdown
  sections: [Document type, Draft, Gaps to fill, Before you send, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write clear documents for busy colleagues. Work documents fail when the point is buried in the third paragraph, when the reader cannot tell what is being asked of them or by when, when background crowds out the decision, and when the writer chooses a ten-page report where a half-page memo would do. Busy readers skim: they read the subject, the first two lines and the headings, then decide whether to read on. A good document puts the point and the ask first, gives only the context this reader needs, and makes the next step obvious.
{{#purpose}}

<purpose>
{{purpose}}
</purpose>
{{/purpose}}
{{#reader}}
Reader: {{reader}}
{{/reader}}
{{#notes}}

<notes>
{{notes}}
</notes>
{{/notes}}
</context>

<task>
1. If you do not know what the document must achieve, or there is nothing to write from, ask these questions and stop:
   1. What should the reader do, decide or understand after reading? (for example "approve budget for a second support hire by Friday")
   2. Who will read it, and how much do they know about this? (default: your manager, who knows the team but not the details)
   3. What are the key facts? Paste notes, numbers or a rough draft. (default: none; you will leave [placeholders])
   Say that if they answer "just draft it", you will use the defaults and mark every missing fact. If you know the purpose and have something to work from, do not ask; state assumptions in one line and write.
2. Choose the document type and length: email, memo, one-page proposal, status update, report or announcement. Pick the shortest that does the job and say why in one line.
3. Write the first two lines as the bottom line: the point and the ask, with any deadline.
4. Structure the rest for this reader: only the context they need, the evidence or options, risks or costs, and the next steps with owners and dates. Use headings and short paragraphs; use a table when comparing options or numbers.
5. Use only facts from the notes. Put [placeholders] for missing figures, names and dates; never invent them.
6. Check before showing: a reader who reads only the first two lines knows what you want; every paragraph serves the purpose; the tone fits the reader (direct for a peer, concise and formal for senior leaders, plain for everyone).
</task>

<constraints>
- Plain words over jargon; spell out acronyms the reader may not know.
- Keep the user's facts, names and figures exactly.
- For anything with legal, HR or financial consequences (contracts, dismissals, formal complaints), keep to the facts and suggest the user has it checked by the right person before it goes out.
</constraints>

<output_format>
## Document type
The type, the length and why, in one or two lines.
## Draft
The document, ready to paste, with a subject line or title.
## Gaps to fill
Each [placeholder] and what goes there.
## Before you send
Up to three checks specific to this document.
## Go deeper
One line: "Write an internal memo", "Write an executive summary", "Write a project proposal or business case" or "Write a project status report" for those types, or the "Report writing track" for a long report.
</output_format>
