---
schema: 1
id: write-copywriting-brief
kind: prompt
title: Write a copywriting brief
description: Writes the brief for a copywriter or agency on one asset - goal, audience, awareness, key message, proof, voice, mandatories, format, deadline and review rounds - and lists what is still missing.
category: copywriting
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, product-manager, manager]
requires: [none]
inputs: [notes, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [creative-brief, freelance-copywriter, agency-brief, briefing, review-process]
pairs_with:
  prompts: [write-campaign-brief, build-proof-bank, write-messaging-framework, critique-marketing-copy]
  personas: [copywriter]
args:
  - name: notes
    description: Your notes on what you need written - the asset (web page, email sequence, brochure, ad set, product descriptions), why, for whom, what it must say, examples you like, deadline and budget.
    type: text
    required: true
  - name: writer
    description: Who will write it - freelance copywriter, agency, in-house writer, or an AI tool. Optional; affects how much context the brief spells out.
    type: string
output_contract:
  format: markdown
  sections: [Brief, Questions to answer before sending, Review plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing lead who has hired and managed many copywriters. Most bad copy starts with a bad brief: the writer guesses the audience, gets a list of twelve messages instead of one, finds out about the legal disclaimer in round three, and the client says "I'll know it when I see it". A good copy brief is short and decided: one goal and how it is measured, one reader described by their situation and what they already know, the single thing they must take away, the proof available, the voice with examples, the mandatories and the no-go areas, the format and length, the deadline, and who approves it in how many rounds.

The brief writer's job is to make the decisions the writer cannot make. Where the notes do not decide something, the brief should say so as an open question, not hide it in vague words.
</context>

<task>
<notes>
{{notes}}
</notes>

{{#writer}}
Writer: {{writer}}
{{/writer}}

1. If the notes do not say what asset is needed, ask for that and stop.
2. Write the brief in these parts: background (two or three sentences), the asset and format (length, sections, channel, file format), objective and how success is measured, target reader (situation, awareness stage, what they think now), the single key message, supporting points (no more than three) with the proof for each, the call to action, voice and tone with two or three do and don't examples, mandatories (legal lines, product names, terms), things to avoid, reference examples and why they are liked, deliverables and deadline, budget if supplied, and the approver.
3. Turn every gap or contradiction in the notes (for example two key messages, no proof for a main claim, no named approver) into a question for the user to answer before sending.
4. Propose a review plan: rounds, who reviews what (facts, legal, voice), turnaround times and what feedback should look like.
</task>

<constraints>
- One key message. If the notes contain several, pick the strongest as a proposal and list the rest as a question.
- Do not invent facts, proof, budgets or deadlines; leave [TO CONFIRM] where needed.
- Keep the brief to about one page; a writer should read it in five minutes.
- For an AI writing tool, keep the same content but phrase it as direct instructions.
</constraints>

<output_format>
## Brief
The brief under short labelled headings, ready to send.

## Questions to answer before sending
Numbered list.

## Review plan
Short table: Round | Reviewer | Checks | Turnaround.
</output_format>
