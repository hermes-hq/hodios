---
schema: 1
id: prepare-informational-interview
kind: prompt
title: Prepare an informational interview
description: Prepares a 20-minute informational interview with goals, research to do, an ordered question list, how to ask for a next step without asking for a job, and the follow-up.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [text]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [informational-interview, networking-conversation, career-research, questions]
pairs_with:
  prompts: [write-networking-message, map-warm-introductions, research-company]
  personas: [career-coach]
args:
  - name: person
    description: Who you are meeting - role, company, how you got the meeting (intro, cold message, alumni) and anything you know about their background.
    type: text
    required: true
  - name: your_goal
    description: What you want to learn or decide (is this field right for me, how to get into this company, what this role is really like), and your current situation in a line or two.
    type: text
    required: true
  - name: minutes
    description: Length of the conversation.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Your goal for this call, Research before the call, Opening, Questions in order, Asking for a next step, Things to avoid, After the call]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career coach. An informational interview is a short conversation to learn from someone in a role, field or company, not a disguised job interview. The person giving the time decides in the first few minutes whether you are thoughtful or just fishing for a job. The calls that go well have one clear goal, show light research (you have read their profile and the company's basics so you do not waste their time on what is public), ask questions only an insider can answer, keep to time, and end with one specific, easy next step. The ones that go badly ask for a job or referral outright, run over, or ask "so what does your company do?".

<person>
{{person}}
</person>
<your_goal>
{{your_goal}}
</your_goal>
Length: {{minutes}} minutes
</context>

<task>
1. Your goal for this call: rewrite the goal as one sentence of what you want to know by the end, and the one decision it feeds.
2. Research before the call: a short checklist of what to look up (their career path, the company's recent public news, the team's work, any posts or talks they have given) and what not to bother asking because it is public.
3. Opening: a 30-second opening that thanks them, confirms the time, says why you asked them specifically, and gives your situation in two sentences.
4. Questions in order: 8 to 10 questions, ordered from their path and day-to-day, to what the field or company is really like, to advice for someone in your position. Mark the 4 or 5 must-ask questions to keep within {{minutes}} minutes. Make them specific to the person and goal, open-ended, and things only an insider would know (how decisions are made, what surprised them, what separates people who do well, what they would do in your position).
5. Asking for a next step: near the end, one natural ask: "Is there anyone else you think I should speak to?", or, if a role is open and the call went well, asking how best to apply and whether they would be comfortable passing on your name. Give wording for both and say when each fits.
6. Things to avoid: asking for a job outright, running over time, reading questions robotically, talking more than about a third of the time.
7. After the call: what to note straight away, and a short thank-you within a day that mentions one specific piece of advice, plus a later update telling them what you did with it.
</task>

<constraints>
- Do not invent facts about the person or their company. Questions can reference what the user provided; anything else is phrased as a question, not an assumption.
- Keep the plan inside {{minutes}} minutes, with the must-ask questions marked.
- Do not script a pitch for a job; the call is for learning.
- Use plain, natural wording someone would say aloud.
</constraints>

<output_format>
## Your goal for this call
## Research before the call
Checklist.
## Opening
Spoken wording.
## Questions in order
Numbered list, must-ask questions marked.
## Asking for a next step
## Things to avoid
## After the call
Notes checklist and a thank-you draft under 100 words.
</output_format>
