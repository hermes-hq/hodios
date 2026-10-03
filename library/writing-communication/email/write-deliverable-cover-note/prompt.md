---
schema: 1
id: write-deliverable-cover-note
kind: prompt
title: Write a deliverable cover note
description: Writes the short note that accompanies a deliverable such as a report, design or analysis, saying what it is, the three things to know, what is needed from the reader and by when.
category: email
version: 1.0.0
status: incubating
stage: [ship]
role: [consultant, data-analyst, designer, project-manager]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cover-note, deliverable, handoff, client-communication, review-request]
pairs_with:
  prompts: [write-executive-summary, request-approval-by-email, ask-for-feedback-by-email]
args:
  - name: deliverable
    description: What you are sending, its version and format, and where it lives, for example "Pricing analysis v2, 18-page PDF plus the Excel model, in the shared folder".
    type: text
    required: true
  - name: key_points
    description: The findings, decisions, changes since the last version and caveats the reader should know. List as many as you like; the note keeps the three that matter most.
    type: text
    required: true
  - name: action_needed
    description: What you need from the reader, for example approval, comments on sections 2 and 4, a decision between options, or nothing (for your information).
    type: text
  - name: deadline
    description: When you need the action, and what depends on it.
    type: string
output_contract:
  format: markdown
  sections: [Note, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The note that goes with a deliverable is often read more carefully than the deliverable itself, and sometimes instead of it. "Please find attached the report" wastes that moment. A strong cover note says in one line what is attached and which version, gives the three things the reader must know even if they never open it, flags any caveat honestly (data gaps, assumptions, open questions), says exactly what is needed from the reader and by when, and tells a short-on-time reader where to look first. It is not a summary of the whole document; that belongs in the document.
</context>

<task>
Write the cover note for this deliverable.{{#deadline}} Needed by: {{deadline}}.{{/deadline}}

<deliverable>
{{deliverable}}
</deliverable>

<key_points>
{{key_points}}
</key_points>
{{#action_needed}}
<action_needed>
{{action_needed}}
</action_needed>
{{/action_needed}}

1. If you cannot tell what the deliverable is or what it found or contains, ask and stop.
2. Choose the three points that matter most to the reader: usually the headline finding or decision, the most consequential implication, and the most important caveat or change since the last version. If a caveat affects how the deliverable should be used (a data gap, an untested assumption, a figure still to be confirmed), it must be one of the three. Note which points you left out under Notes.
3. Write the note:
   - Subject: "[Deliverable] v[x]: [action] by [date]" or "[Deliverable] v[x] for your information".
   - First line: what is attached or linked, its version and format.
   - "Three things to know", as numbered one-line points with figures where the input gives them.
   - What is needed: the specific action, the deadline and what depends on it. If no action is given, make it explicitly for information and say when the next step happens.
   - Where to start if short on time (a page, section or tab), if the input allows.
   - A one-line offer to walk through it, only if the deliverable is complex.
4. Keep the voice confident: findings stated as findings, caveats stated as caveats, without hedging every sentence.
</task>

<constraints>
- Under about 130 words.
- Exactly three key points; never pad to three if the deliverable has fewer, and never squeeze in a fourth.
- Use only the facts given; never invent findings, figures, page numbers or links. Use `[need: …]`.
- Never hide or soften a known problem with the deliverable, even if asked; state it plainly and briefly.
- No "please find attached", no "hope this helps", no "let me know if you have any questions" as filler.
</constraints>

<output_format>
## Note
Subject line, then the body.
## Notes
Points left out, placeholders, and any caveat the sender should double-check. "None" if nothing.
</output_format>

<examples>
Weak: "Hi Tom, please find attached the pricing report. Let me know if you have any questions."
Strong: "Hi Tom, attached is the pricing analysis v2 (PDF plus model). Three things to know: 1. A 6% list-price increase keeps churn under 3% in every scenario. 2. Enterprise discounts, not list price, drive most margin loss. 3. Churn assumptions use 2023 data only; 2024 data arrives next week. Needed from you: choose option A or B by Friday so sales can brief accounts on Monday. If short on time, read page 2."
</examples>
