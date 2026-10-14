---
schema: 1
id: work-around-brain-fog
kind: prompt
title: Work around brain fog
description: Builds practical strategies for cognitive symptoms such as brain fog with a long-term condition, using external memory, routines, task design and pacing, plus what to track and raise with a clinician.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [brain-fog, cognitive-fatigue, memory-aids, routines, long-covid, multiple-sclerosis]
pairs_with:
  prompts: [plan-activity-pacing, request-workplace-accommodation, request-study-adjustments]
args:
  - name: experience
    description: Your diagnosed condition, what the fog is like (forgetting words, losing track mid-task, struggling to read or follow conversations), when it is worse, and the situations where it causes trouble (work, driving, admin, parenting).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, Your fog pattern, Offload your memory, Design tasks for foggy days, Protect your thinking energy, At work or study, Track and discuss]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people manage cognitive symptoms that come with conditions such as long COVID, ME/CFS, MS, fibromyalgia, lupus and the effects of cancer treatment. Brain fog is real and common: slowed thinking, word-finding problems, losing track of tasks, trouble following conversations, and fatigue after mental effort. It often worsens with poor sleep, pain, overexertion, stress, heat or illness, and in some conditions it is part of post-exertional symptoms. Cognitive rehabilitation and occupational therapy use practical strategies: move memory out of the head (one capture place, calendars with alerts, checklists, labels), reduce load (one task at a time, fewer decisions, templates), schedule demanding thinking for the person's best hours, and treat mental effort as part of the energy budget. New or rapidly worsening cognitive problems need medical assessment, not coping strategies.

<experience>
{{experience}}
</experience>
</context>

<task>
1. Check first: say that new, sudden or rapidly worsening confusion, memory loss, speech difficulty or one-sided weakness needs urgent medical attention; and that fog that has not been discussed with their clinician should be, because medicines, sleep problems, mood and other treatable causes can contribute.
2. Your fog pattern: summarise when it is better and worse from their description, and suggest tracking it for two weeks alongside sleep, activity and symptoms.
3. Offload your memory: a single capture place, calendar alerts for everything time-based, checklists for repeated tasks (leaving the house, medicines, cooking), labels and fixed places for keys and essentials, and notes during conversations and appointments.
4. Design tasks for foggy days: break tasks into written steps, one tab or task at a time, templates for common messages, reduce decisions, set a timer to come back to a task, and a rule for not doing high-stakes tasks (money, contracts, important emails) while foggy.
5. Protect your thinking energy: schedule demanding thinking for their best hours, rest before it gets bad, reduce noise and screens when it is heavy, and count mental effort in pacing.
6. At work or study: adjustments to consider asking for (written instructions, flexible deadlines, quiet space, fewer meetings, recorded meetings) and how to describe the impact.
7. Track and discuss: a short list of what to note and questions for their clinician. If driving or operating machinery is affected, say to discuss it with their clinician and check any licensing rules for their condition.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose cognitive impairment or a cause, and do not recommend supplements, medicines or changes to treatment.
- Write this answer itself in short, simple chunks; the reader may be foggy.
</constraints>

<output_format>
## Check first
## Your fog pattern
## Offload your memory
## Design tasks for foggy days
## Protect your thinking energy
## At work or study
## Track and discuss
</output_format>
