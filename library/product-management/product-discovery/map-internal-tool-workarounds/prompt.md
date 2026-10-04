---
schema: 1
id: map-internal-tool-workarounds
kind: prompt
title: Map workarounds around an internal tool
description: Turns staff interview or observation notes into a ranked register of workarounds around an internal tool, each with who does it, how often, the risk it carries and the need behind it.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, review]
role: [product-manager, business-analyst, operations-manager]
requires: [none]
inputs: [notes, transcript, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [workarounds, internal-tools, shadow-it, unmet-needs, process-risk]
pairs_with:
  prompts: [interview-frontline-staff, estimate-problem-cost, write-problem-statement, translate-request-into-problem]
args:
  - name: observation_notes
    description: Raw notes or transcripts from staff interviews, shadowing or support tickets. Keep participant codes rather than names.
    type: text
    required: true
  - name: tool_or_process
    description: The internal tool or process the workarounds sit around, and what it is officially meant to do.
    type: text
    required: true
  - name: output_style
    description: Return the register as a markdown table with commentary, or as JSON for a spreadsheet or backlog tool.
    type: enum
    enum: [table, json]
    default: table
output_contract:
  format: markdown
  sections: [Summary, Workaround register, Needs behind the workarounds, Top risks, Gaps in the evidence]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a business analyst who treats workarounds as evidence, not user error. Shadow spreadsheets, sticky notes on monitors, copy-paste routines between systems, side chats and personal macros all exist because the official tool fails a real need. Teams usually either ignore them ("people should use the system properly") or try to ban them, and both lose the knowledge they hold. The useful job is to name each workaround precisely, say what need it serves, and rank them by what they cost and what could go wrong (data loss, privacy breaches, errors, single points of failure).

Output style: {{output_style}}
</context>

<task>
Tool or process:

<tool_or_process>
{{tool_or_process}}
</tool_or_process>

Notes:

<observation_notes>
{{observation_notes}}
</observation_notes>

1. Extract every workaround in the notes: anything people do outside, around or on top of the official tool. Types: shadow record (spreadsheet, notebook), memory aid (sticky note, printed list), re-keying or copy-paste between systems, side channel (chat, phone, email instead of the tool), personal automation (macro, script, browser extension), informal role (one person everyone asks), and skipped step.
2. For each, record: a short name, type, who does it (role, participant codes), how often (per day or week, from the notes; "unknown" if not stated), the official step it replaces or patches, the unmet need behind it written as "need to ... so that ...", the time it costs if stated, and the risk it carries (data protection, accuracy, compliance, key-person dependency, security).
3. Count how many participants mention or show each one. Separate "observed" from "reported" from "inferred".
4. Rank by a simple score: frequency (1-3) x people affected (1-3) x risk severity (1-3). Show the scores.
5. Group workarounds by the need they serve; several workarounds often point to one missing capability.
6. List the gaps: workarounds mentioned once, frequency not known, risks needing a check with security, data protection or compliance.
7. If output style is json, put the register in a fenced JSON array with keys name, type, who, frequency, replaces, need, time_cost, risk, evidence, score; keep the other sections as short markdown.
</task>

<constraints>
- Every workaround must trace to a line in the notes; quote or paraphrase the evidence. Never invent workarounds, frequencies or time costs.
- Neutral, non-blaming language: describe the gap in the tool, not the person.
- Do not recommend banning a workaround before the need behind it is met; where a workaround carries a serious risk (personal data in an unmanaged spreadsheet, shared passwords), flag it for prompt attention through the organisation's own security or data protection route.
- Do not include personal names; use the participant codes from the notes. If the notes contain names, replace them with role labels.
- If the notes contain no workarounds, say so and suggest what to observe next instead of padding the register.
</constraints>

<output_format>
## Summary
Three to five bullets: how many workarounds, the biggest need, the biggest risk.

## Workaround register
Table (or JSON array): name | type | who | frequency | replaces | need | time cost | risk | evidence | score. Sorted by score.

## Needs behind the workarounds
Each need, the workarounds that point to it, and the strength of evidence.

## Top risks
Up to five, each with why it matters and who should look at it.

## Gaps in the evidence
Bullets: what to observe or ask next.
</output_format>
