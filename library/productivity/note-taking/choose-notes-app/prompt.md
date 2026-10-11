---
schema: 1
id: choose-notes-app
kind: prompt
title: Choose a notes app
description: Helps you pick a notes app by turning real needs (devices, offline, sharing, privacy, lock-in, handwriting) into must-haves, comparing a shortlist and planning a one-week trial.
category: note-taking
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, student, researcher, writer]
requires: [none]
inputs: [preferences, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [app-comparison, data-portability, offline-access, privacy, tool-selection]
pairs_with:
  prompts: [migrate-notes-between-apps, design-second-brain, plan-notes-backup-and-export]
args:
  - name: needs
    description: What you will use notes for, the devices and operating systems you use, whether you share notes with others, handwriting or tablet use, privacy or work rules, and your budget.
    type: text
    required: true
  - name: shortlist
    description: Optional - apps you are already considering or using now.
    type: text
output_contract:
  format: markdown
  sections: [Your must-haves, Shortlist comparison, Recommendation, One-week trial, Check before paying]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People usually choose a notes app on features they saw in a video and switch again a year later. The choice that lasts starts from a few hard constraints: which devices it must work on, whether it must work offline, whether others need to edit, whether notes are handwritten, how sensitive the content is, and how easily the notes can leave the app (plain files versus a proprietary database). Most apps can store text; the differences that matter show up in sync reliability, search, export and the friction of quick capture on a phone. App features, prices and platforms change often, so anything you say about a specific app must be presented as something to confirm on its current website.

Needs:
<needs>
{{needs}}
</needs>
{{#shortlist}}
Shortlist: {{shortlist}}
{{/shortlist}}
</context>

<task>
1. If devices or the main use are missing, ask up to three questions in one message and wait.
2. Turn the needs into five to eight must-haves and a few nice-to-haves, each phrased as something testable ("works offline on Android", "exports all notes as plain Markdown files").
3. If there is a shortlist, compare it against the must-haves. If not, suggest three to five widely used apps that plausibly fit, across different types (plain-file, outliner, database-style, handwriting-first, built into the operating system).
4. Mark each cell as "likely yes", "likely no" or "check", and say that features and prices must be confirmed on the app's current site.
5. Recommend one or two to trial and explain the trade-off in plain words, especially lock-in and sync.
6. Write a one-week trial plan with real tasks from the person's life (capture on the phone in 10 seconds, find a note from three days ago, share one page, export everything).
7. List what to check before paying or committing: export, account deletion, offline use, end-to-end encryption claims, work data rules.
</task>

<constraints>
- Do not quote prices, plan limits or exact feature lists as current facts; say "check current pricing".
- Do not claim an app is end-to-end encrypted or compliant with any regulation; tell the person to check the vendor's own documentation.
- Respect stated rules such as employer restrictions on cloud tools.
- Recommend free or built-in options when they meet the must-haves.
</constraints>

<output_format>
## Your must-haves
## Shortlist comparison
Table: Must-have | App A | App B | ...
## Recommendation
## One-week trial
## Check before paying
</output_format>
