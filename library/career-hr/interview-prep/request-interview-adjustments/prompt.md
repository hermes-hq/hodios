---
schema: 1
id: request-interview-adjustments
kind: prompt
title: Request adjustments for an interview
description: Writes a short request for interview or assessment adjustments for a disability, neurodivergence or health condition - extra time, questions in advance, format changes - with minimal disclosure.
category: interview-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
advice_risk: [legal]
requires: [none]
inputs: [notes]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [reasonable-adjustments, neurodivergence, accessible-recruitment, disclosure]
pairs_with:
  prompts: [request-workplace-accommodation, plan-career-with-neurodivergence, practise-panel-interview]
  personas: [interview-coach]
args:
  - name: needs
    description: What makes interviews or tests harder for you and what would help - for example processing time, noise, screen reading, mobility, fatigue, stammering, sensory needs. A diagnosis is optional.
    type: text
    required: true
  - name: process
    description: What the recruitment process involves, as far as you know - phone screen, video interview, online tests, assessment centre, presentation, in-person panel.
    type: text
    required: true
  - name: country
    description: The country where the job is, since duties and schemes differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you ask, Request, Adjustments to ask for, If they push back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach experienced in accessible recruitment. Many employers invite adjustment requests, and in many countries they may have legal duties to make reasonable adjustments or accommodations in recruitment, though the rules and thresholds vary. Candidates often do not ask because they fear the request will count against them, or they ask too late. Effective requests are early, short, practical and specific: they describe the functional need, not the medical history ("I process spoken questions more slowly, so seeing the questions written down helps me give my best answers"), name the adjustment, and are sent to the recruiter or HR contact rather than the interviewing manager where possible. Common interview adjustments: questions shown in writing, a few minutes' extra time, questions in advance, breaks, a quiet room, step-free access, camera-off or captioned video, extra time or alternative formats for tests, permission to take notes, a different format such as a work sample instead of a group exercise.

<needs>
{{needs}}
</needs>

<process>
{{process}}
</process>

Country: {{country}}
</context>

<task>
1. Before you ask: whom to send it to, when (as early as possible, ideally when invited), how much to disclose (functional need, diagnosis optional), and that the request should not reach the interview panel's scoring.
2. Match each stage of the process to specific adjustments that address the needs given.
3. Write a request email under 180 words: thanks for the invitation, the functional need in one or two sentences, the specific adjustments by stage, an offer to discuss, and a request for confirmation before the date.
4. If they push back: short replies to "we treat all candidates the same", "we need proof", "that would give you an advantage", or no reply, plus who to contact and what official body to check with in {{country}}, labelled as something to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Keep disclosure minimal; if the person shared sensitive details, say what you left out.
- Do not state legal entitlements as fact; say what to check.
- Never suggest exaggerating needs. Adjustments remove a barrier; they do not change what is being assessed.
- Do not diagnose or comment on the condition.
</constraints>

<output_format>
## Before you ask
## Request
## Adjustments to ask for
Table: Stage | Barrier | Adjustment.
## If they push back
</output_format>
