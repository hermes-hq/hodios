---
schema: 1
id: write-meeting-notetaker-template
kind: prompt
title: Write a summary template for an AI meeting note-taker
description: Writes a custom summary template and instructions for an AI meeting note-taker with decisions, owners and dates as stated, open questions, and rules against inventing actions or attendees.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build]
role: [manager, project-manager, sales-rep, consultant]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [meeting-notes, note-taker, summary-template, action-items, decision-log]
pairs_with:
  prompts: [set-up-ai-meeting-notes, write-meeting-recap-email, write-summarization-prompt]
args:
  - name: meeting_type
    description: The kind of meeting, for example weekly project sync, sales discovery call, one-to-one, client steering meeting, interview debrief.
    type: string
    required: true
  - name: readers
    description: Optional - who reads the notes and what they need (for example "the account team needs next steps and fields for the CRM").
    type: text
  - name: tool_limits
    description: Optional - any limits your note-taker has on custom templates, such as a character limit or fixed section names.
    type: text
output_contract:
  format: markdown
  sections: [Template, Instructions text, Review checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Default AI meeting summaries share the same faults: long recaps of discussion nobody needs, "we should look at pricing" turned into an action with an owner, a tentative idea written up as a decision, owners and deadlines guessed, names misspelled or misattributed, and sensitive remarks quoted against a named person. Most note-takers let you set a custom template or instructions. A good one is shaped by what readers do next, separates decisions from discussion, records an action only when someone agreed to do it, writes owners and dates exactly as said or marks them missing, lists open questions, and flags anything the transcript makes unclear. A person who attended still reviews the notes before they are shared.

Meeting type: {{meeting_type}}
{{#readers}}
Readers: {{readers}}
{{/readers}}
{{#tool_limits}}
Tool limits: {{tool_limits}}
{{/tool_limits}}
</context>

<task>
1. Decide the sections this meeting type needs, based on what readers do next. Typical ones: purpose and outcome in one line, decisions, action items, open questions, risks or blockers, and type-specific sections (for a sales call: pain points in the customer's words, budget and timeline as stated, next step; for a one-to-one: agreed follow-ups only, nothing personal).
2. Write the template with each section heading and a one-line instruction under it.
3. Write the instructions text for the tool:
   - Record a decision only when the meeting clearly agreed it; otherwise list it as a proposal or open question.
   - Record an action only when a person agreed to do it; write the owner and date as said, or "owner not stated" and "no date".
   - Do not add attendees, owners, numbers or dates that were not said.
   - Mark uncertain names or figures with [check].
   - Leave out small talk, and do not attribute sensitive or personal remarks to named people.
   - Keep it short: a fixed maximum per section.
4. If the tool has limits, fit the template and instructions within them and say what was cut.
5. Write a review checklist for the person who checks the notes before sharing.
</task>

<constraints>
- Do not claim features or template syntax of a specific note-taking product as fact.
- Keep the template and instructions together under about 250 words unless the user's limits allow more.
- Do not include fields that capture personal data the readers do not need.
</constraints>

<output_format>
## Template
Fenced block with headings and one-line instructions.
## Instructions text
Fenced block, ready to paste into the tool's custom instructions.
## Review checklist
Five to eight checkbox items.
</output_format>
