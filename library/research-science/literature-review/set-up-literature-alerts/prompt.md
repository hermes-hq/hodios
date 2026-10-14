---
schema: 1
id: set-up-literature-alerts
kind: prompt
title: Set up literature alerts and a reading routine
description: Sets up a current-awareness system for a research topic with saved searches, citation and author alerts, journal feeds, a weekly triage routine and a noise budget.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, student]
requires: [none]
inputs: [topic, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [current-awareness, saved-searches, citation-alerts, reading-routine, keeping-up]
pairs_with:
  prompts: [set-up-reference-library, build-search-string, summarize-paper, chase-citations]
  personas: [research-librarian]
args:
  - name: topic
    description: Your research area in a sentence or two, with key terms, and the five to ten papers or authors central to it.
    type: text
    required: true
  - name: tools
    description: Optional. Databases and tools you have access to (for example PubMed, Scopus, Web of Science, Google Scholar, an RSS reader, a reference manager) and how you like to read (email, feed reader, phone).
    type: text
  - name: time_per_week
    description: Minutes per week you can spend on new literature.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Alert plan, Saved searches, Triage routine, Noise control, Review in three months]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Researchers rarely miss key papers because they lack tools; they miss them because their alerts are either too narrow (one keyword) or so broad that the weekly email is ignored. A working current-awareness system combines several channels with different strengths: saved database searches (precise, reproducible, delayed by indexing), citation alerts on the field's core papers (catch work that builds on them, regardless of wording), author alerts for key groups, journal table-of-contents feeds for the few journals that matter, and preprint alerts where the field uses preprints. The system only works with a fixed triage habit: scan titles fast, decide read now, save for later, or ignore, and capture saved items straight into the reference manager. Precision is tuned over time by checking what was missed and what was noise.
</context>

<task>
Set up literature alerts for:
<topic>
{{topic}}
</topic>
{{#tools}}
Tools and reading habits: {{tools}}
{{/tools}}
Time available: {{time_per_week}} minutes per week.

1. Choose the channels that fit the topic and tools, and say what each catches that the others miss.
2. Write two or three saved searches in the syntax of the databases named (or PubMed-style syntax if none are named), each tighter than a review search: core concept AND a distinguishing term. Say how often each should run.
3. List citation alerts to set on the core papers the user named, and author alerts for the central authors or groups. Do not add papers or authors the user did not name; suggest how to find more.
4. Suggest journal or preprint feeds by type, asking the user to pick at most five journals.
5. Design the weekly triage routine within the time budget: when, the order of channels, the three decisions per item, how saved items go into the reference manager with a tag, and a monthly slot for deeper reading.
6. Set a noise budget (for example no more than 40 titles a week) and rules for tightening or widening a search when it is exceeded or produces nothing.
7. Give a three-month review checklist: papers found elsewhere that the alerts missed, channels with no useful results, and searches to adjust.
</task>

<constraints>
- Do not invent papers, authors or journal names; use only those supplied and describe how to find more.
- Give search syntax only for the databases named, and tell the user to test each search once before saving it.
- Keep the routine within the stated time budget.
- Note that tool features change and the user should check where each tool puts its alert settings.
</constraints>

<output_format>
## Alert plan
A table: channel | what it catches | tool | frequency.
## Saved searches
Each search in a code block with the database name and frequency.
## Triage routine
Numbered steps with minutes for each.
## Noise control
The budget and adjustment rules.
## Review in three months
A checklist.
</output_format>
