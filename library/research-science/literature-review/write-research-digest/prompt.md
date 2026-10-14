---
schema: 1
id: write-research-digest
kind: prompt
title: Write a research digest for your lab or team
description: Turns a batch of newly published papers into a short themed digest for a lab or team, saying what is new in each, why it matters to the group and who should read it.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher]
requires: [none]
inputs: [document, notes]
output: [summary, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [current-awareness, journal-watch, lab-newsletter, papers]
pairs_with:
  prompts: [set-up-literature-alerts, summarize-paper, prioritize-reading-list]
args:
  - name: papers
    description: The batch, one entry per paper with title, authors, venue or preprint server, date and abstract. Paste alert emails as they are if that is what you have.
    type: text
    required: true
  - name: audience
    description: Who reads the digest, for example "a 12-person cancer immunology lab" or "the data science team at a public health agency".
    type: string
    required: true
  - name: interests
    description: The group's current projects or questions, so the digest can say who should read what.
    type: text
  - name: period
    description: The period covered, for example "week of 6 October".
    type: string
output_contract:
  format: markdown
  sections: [This period in brief, Themes, Worth reading in full, Methods and tools, Skipped]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many labs and teams rotate a weekly or monthly "what was published" email. Good digests are short, grouped by theme rather than by journal, and answer three things per paper: what is actually new (not what the abstract's first line says), why this group should care, and who in the group should read it. Bad digests paste abstracts, repeat press-release language ("breakthrough", "first ever"), give a preprint the same weight as a peer-reviewed paper, and bury the one paper that changes someone's project. Writing from abstracts also carries a risk: abstracts often overstate, so the digest should keep claims at the strength the evidence supports and say when a result is from cells, animals or a small sample.
</context>

<task>
Write a research digest{{#period}} for {{period}}{{/period}} for this audience: {{audience}}.
{{#interests}}
The group's current interests and projects:
{{interests}}
{{/interests}}
<papers>
{{papers}}
</papers>

1. Drop exact duplicates and alert noise. Note how many items were received and how many are covered.
2. Group the papers into two to five themes that make sense to this audience.
3. For each paper kept, write two or three sentences: what is new, the key result at the strength reported (with the main number if the abstract gives one), and the kind of evidence (trial, cohort, mouse model, preprint, review, dataset, tool).
4. Say why it matters to this group, and if interests are given, name the project or person-type it matters to.
5. Pick up to three papers worth reading in full and say why each one.
6. Pull out new methods, datasets, tools or reagents worth knowing about.
7. List skipped items in one line each with the reason (off-topic, minor, duplicate).
</task>

<constraints>
- Work only from the text provided; do not add results, sample sizes or conclusions not in it.
- Mark every preprint as "preprint, not peer reviewed". Mark retractions, corrections or expressions of concern if the text mentions them.
- No hype words ("breakthrough", "game-changer", "revolutionary"). Keep causal and clinical language at the strength the paper uses or weaker.
- Keep each paper to three sentences at most and the whole digest readable in five minutes; if the batch is too large, cover the most relevant and list the rest under Skipped.
- Include a short citation for each paper (first author, venue, year or date) so readers can find it.
</constraints>

<output_format>
## This period in brief
Two or three sentences and the count: received, covered.
## Themes
A ### heading per theme, then one bullet per paper: short citation, then the summary and why it matters.
## Worth reading in full
Up to three numbered picks with one line each.
## Methods and tools
Bullets, or "None this period".
## Skipped
One line each.
</output_format>
