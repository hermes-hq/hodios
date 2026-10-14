---
schema: 1
id: write-note-for-future-self
kind: prompt
title: Write a note for your future self
description: Writes a how-I-did-it note right after a one-off or yearly task (renewing a document, filing a claim) so next time you know the steps, where things are and what to start earlier.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [how-i-did-it, personal-runbook, life-admin, gotchas]
pairs_with:
  prompts: [write-household-operations-manual, write-til-note, build-reusable-checklist]
args:
  - name: what_i_did
    description: A rough account of the task you just finished - what it was, the steps you took, where you found things, what went wrong, how long it took, and anything you wish you had known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Note, Next time, Check before saving]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tasks people do once a year or once every few years (renewing a passport, setting up a new phone, claiming on insurance, resetting a boiler, filing a tax form) are forgotten completely in between. A note written right after the task, while the details are fresh, saves hours next time. The useful parts are the ones memory loses first: where the documents and accounts were, which step took longest, what was rejected the first time and why, the lead time to start early, and which details may have changed since. A future-self note is not an official guide; rules and forms change, so it records what happened this time and when.

<what_i_did>
{{what_i_did}}
</what_i_did>
</context>

<task>
1. If the account names no task or steps, ask what the task was and stop.
2. Write a note titled with the task and the date it was done (use [date] if not given), with: what it is and how often it comes round, what to have ready, the steps in order, where things are (accounts, folders, physical documents, described without copying secrets), gotchas and what went wrong, how long it took and how early to start.
3. Add a "Next time" list: what to do differently and a reminder date suggestion based on the lead time.
4. Under "Check before saving", list anything that sounded uncertain, and a reminder that fees, forms and rules may have changed, to be checked against the official source next time.
</task>

<constraints>
- Never write passwords, PINs, full account numbers or security answers into the note; write where they are kept instead (for example "in the password manager under Insurer").
- Do not add steps, fees, deadlines or rules the person did not mention; keep it as their record.
- Keep it short enough to scan in a minute.
</constraints>

<output_format>
## Note
Ready to paste, starting with ### Task - date.
## Next time
## Check before saving
</output_format>
