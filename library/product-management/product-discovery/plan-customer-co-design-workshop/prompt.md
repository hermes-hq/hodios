---
schema: 1
id: plan-customer-co-design-workshop
kind: prompt
title: Plan a customer co-design workshop
description: Plans a co-design workshop with customers, with participant mix, a timed agenda, sketching and ranking exercises, facilitation rules and how outputs feed the backlog.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, design]
role: [designer, product-manager, ux-researcher]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [co-design, participatory-design, workshop-facilitation, customer-workshop, research-synthesis]
pairs_with:
  prompts: [write-interview-outreach-messages, map-opportunity-solution-tree, synthesize-customer-interviews, plan-design-sprint]
args:
  - name: topic
    description: The problem or opportunity the workshop is about, what you already know from research, and what the team needs to decide afterwards.
    type: text
    required: true
  - name: participants
    description: Who could take part (customer types, how many, relationship to you) and whether internal people will join.
    type: text
    required: true
  - name: format
    description: In person or remote, and the time you have.
    type: string
    default: "remote, 2 hours"
output_contract:
  format: markdown
  sections: [Is co-design right here, Participants and roles, Agenda, Exercises and materials, Facilitation rules, After the workshop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a service and product designer who runs co-design sessions with customers. Co-design treats customers as experts in their own experience, not as designers: the point is to surface needs, priorities and mental models through making and arranging things together, not to have customers design the product. It works best after some interviews, when the team knows the problem space and wants customers to shape options. Common failures: inviting only fans or the biggest account; mixing a manager and their own staff so the junior people go quiet; group voting where the first or loudest voice wins; staff from the company outnumbering or correcting customers; vague outputs ("they liked option B"); and implying that what customers draw will be built. Individual work before group discussion, simple materials and a clear record of who said what (by segment, not name) fix most of this.

Format: {{format}}
</context>

<task>
Topic and what is already known:

<topic>
{{topic}}
</topic>

Possible participants: {{participants}}

1. Say whether co-design fits: what it can answer for this topic and what it cannot (for example it cannot size demand or test usability). If interviews or a usability test would serve better, say so and still give the plan if the user wants it.
2. Set the participant mix: number per session (usually 5 to 8 customers), segments to include, who to avoid putting in the same room (managers with their reports, competitors), and the internal roles (facilitator, note-taker, one or two silent observers). Include the incentive and consent points: recording, how ideas will be used, and that sharing ideas does not create an obligation either way.
3. Write a timed agenda that fits {{format}}: welcome and ground rules; a warm-up tied to the topic; individual reflection on a recent real experience; one or two making exercises; group sharing; individual then group prioritisation; close with what happens next.
4. Describe each exercise with instructions to read aloud, time, materials (paper templates, sticky notes, cards, or a remote whiteboard frame), and what output it produces. Pick from: journey or timeline of the last real experience, "ideal day" storyboard, card sort of needs, building an option from component cards, sketching with a crazy-eights style limit, ranking with a fixed budget of tokens, and trade-off cards ("if you could only keep two").
5. Give facilitation rules: silent individual work before discussion, round-robin sharing, how to bring in quiet people and handle a dominant one, how internal staff behave (no defending, no correcting, no promises), and what to say when someone asks "will you build this?".
6. Explain what to do after: capture within 24 hours, code outputs by need and segment, separate what customers made from what the team infers, turn needs into opportunities (not tickets), thank participants and tell them what happened as a result.
</task>

<constraints>
- Never promise participants that their ideas will be built or that they will receive anything beyond the stated incentive.
- Do not invent research findings; build only on what the topic description says is known.
- Keep remote sessions to two hours or less with a break; in person, no more than about three hours.
- Name the bias risks of the chosen participant mix (only happy customers, only one segment) and how to offset them.
- Mention that ideas shared by customers raise ownership and confidentiality questions in some settings and suggest a short plain-language agreement reviewed by whoever handles legal for the company.
</constraints>

<output_format>
## Is co-design right here
Short paragraph.

## Participants and roles
Bullets: customer mix, who not to combine, internal roles, incentive and consent.

## Agenda
Table: time | block | purpose | output.

## Exercises and materials
One subsection per exercise with instructions to read aloud, materials and output.

## Facilitation rules
Bullets, including the answer to "will you build this?".

## After the workshop
Numbered steps from capture to closing the loop with participants.
</output_format>
