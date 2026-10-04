---
schema: 1
id: write-security-awareness-module
kind: prompt
title: Write a security awareness module
description: Writes a short security awareness module for staff on one topic, such as phishing, MFA fatigue or safe file sharing, with realistic examples, clear actions, a quiz and a one-page reminder.
category: security-operations
version: 1.0.0
status: incubating
stage: [build]
role: [security-engineer, manager]
requires: [none]
inputs: [topic, text]
output: [docs, quiz, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [security-awareness, staff-training, phishing, mfa-fatigue, microlearning]
pairs_with:
  prompts: [investigate-reported-phishing, design-microlearning-series]
args:
  - name: topic
    description: One topic, such as spotting phishing, MFA push fatigue, safe file sharing, payment change fraud, password managers, travel and public Wi-Fi, or reporting a lost device.
    type: string
    required: true
  - name: audience
    description: Who takes it - role, technical comfort, language level and what tools they use daily - for example "warehouse supervisors who use shared tablets".
    type: string
    required: true
  - name: minutes
    description: How long the module should take a learner, in minutes.
    type: number
    default: 10
  - name: org_context
    description: Your real procedures - how to report a suspicious message, the helpdesk contact, approved tools, MFA app. Leave empty and the module uses clearly marked placeholders.
    type: text
    default: ""
output_contract:
  format: markdown
  sections: [Learning objectives, Module, Quiz, One-page reminder, Facilitator notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Awareness training changes behaviour when it is short, specific to the learner's job, and ends with one or two actions people remember. It fails when it lectures, uses fear, shows examples nobody in that job would receive, or makes people afraid to admit a mistake, which delays reporting, the one behaviour that matters most. The goal of a module is that the learner recognises the situation, knows the safe action, and reports quickly, including after they have clicked.
</context>

<task>
Write a {{minutes}}-minute module on "{{topic}}" for: {{audience}}
{{#org_context}}

<org_context>
{{org_context}}
</org_context>
{{/org_context}}

1. If the topic covers several unrelated subjects, pick the one most useful for this audience, say so, and suggest the rest as separate modules.
2. Write three learning objectives as observable behaviours ("Report a suspicious payment change request through the report button before acting on it").
3. Write the module in short sections that fit the time (roughly one section per two to three minutes):
   - Why it matters to this audience, with one realistic, anonymised story.
   - How to recognise it: three to five signs, each with a short example taken from the audience's daily tools and tasks. Mark every example as a training example and use fictional names and domains (`.example`).
   - What to do: the safe action as numbered steps, using the real procedure from the org context or a placeholder like `[REPORT BUTTON OR ADDRESS]`.
   - If you already clicked or approved: the steps to take, said without blame, stressing that fast reporting limits harm.
4. Quiz: five questions (scenario-based multiple choice or true or false), each with the correct answer and a one-line explanation. At least three should be "what would you do" scenarios.
5. One-page reminder: a short title, three signs, the safe action, how to report, and the contact.
6. Facilitator notes: how to run it live in a team meeting, and one discussion question.
7. Before answering, check the reading time fits {{minutes}} minutes (about 150 to 200 words per minute of reading, plus quiz time), every placeholder is marked, and the language suits the audience.
</task>

<constraints>
- If the topic or the audience is missing, ask for it in one question and stop.
- No fear, shame or blame; never suggest people are disciplined for reporting a mistake.
- Do not use real company brands or real people in examples; fictional and `.example` domains only.
- Do not invent the organisation's procedures, tools or contacts; use placeholders.
- Plain language at the audience's level; short sentences; no jargon without a one-line explanation.
</constraints>

<output_format>
## Learning objectives
Three bullets.

## Module
Sections with headings and approximate minutes each.

## Quiz
Numbered questions with options, then **Answer** and **Why** for each.

## One-page reminder
A compact block suitable for printing or a chat post.

## Facilitator notes
Three to five bullets.
</output_format>
