---
schema: 1
id: set-up-lab-data-folders
kind: prompt
title: Set up lab data folders and file naming
description: Sets up a shared folder structure, file naming convention, raw-data protection and backup routine for a lab's instrument and analysis files, with a one-page guide for members.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, student, data-analyst]
requires: [none]
inputs: [text, notes]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [file-naming, folder-structure, raw-data, research-data, backups]
pairs_with:
  prompts: [write-data-management-plan, set-up-sample-tracking, audit-lab-notebooks]
  personas: [lab-manager]
args:
  - name: lab
    description: Who generates data, which instruments and file types, rough volumes, where files live now (laptops, instrument PCs, shared drive), and any institutional storage offered.
    type: text
    required: true
  - name: problems
    description: What goes wrong now, for example "can't find the raw files for figure 3" or "analysis overwrote raw data". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Folder structure, File naming, Raw data protection, Links to notebooks and samples, Backup and retention, One-page guide, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In most labs, the data problem is not a lack of a data management plan but a lack of daily habits: raw files left on instrument PCs, names like "final_v2_new.xlsx", processed files saved over raw ones, and no link from a notebook entry to the files. A structure that works is shallow and predictable (project, then experiment ID, then raw, processed, analysis, figures), uses dates in ISO order and the same experiment ID as the notebook and sample labels, makes raw folders read-only once copied, and has one automatic backup the lab does not have to think about. Institutional storage and retention rules come first.
</context>

<task>
<lab>
{{lab}}
</lab>
{{#problems}}

<problems>
{{problems}}
</problems>
{{/problems}}

1. Principles: three to five rules the whole design follows.
2. Folder structure: a tree with an example, one level per decision (project, experiment, data stage), and where shared resources (protocols, templates, reference data) live.
3. File naming: a convention with date as YYYY-MM-DD or YYYYMMDD, experiment ID, sample or condition, instrument, version only where needed; characters to avoid; examples for each instrument named.
4. Raw data protection: copy off instrument PCs the same day, write-protect raw folders, never edit raw files, processed outputs go elsewhere, and checksums or file counts on transfer for large data.
5. Links to notebooks and samples: the experiment ID ties notebook entry, sample labels and folders together; a short README per experiment folder.
6. Backup and retention: use institutional storage, the 3-2-1 principle in plain words, who checks restores, and retention per institutional or funder policy.
7. One-page guide for lab members.
8. Rollout: start with new experiments, migrate active projects only, and a monthly check.
</task>

<constraints>
- Do not recommend personal cloud accounts for research data; follow institutional storage, and flag personal or sensitive data needing approved storage.
- Do not state retention periods as facts; say they come from the institution or funder.
- Keep the structure shallow enough to remember.
</constraints>

<output_format>
## Principles
## Folder structure
## File naming
## Raw data protection
## Links to notebooks and samples
## Backup and retention
## One-page guide
## Rollout
</output_format>
