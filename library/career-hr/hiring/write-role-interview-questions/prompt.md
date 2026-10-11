---
schema: 1
id: write-role-interview-questions
kind: prompt
title: Write interview questions for a role
description: Writes behavioural and situational interview questions for one role and the competencies one interviewer covers, with follow-up probes and what strong and weak answers sound like.
category: hiring
version: 1.0.0
status: incubating
stage: [build]
role: [manager, recruiter, engineering-manager, founder]
requires: [none]
inputs: [job-posting, notes]
output: [questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [interview-questions-bank, behavioural-questions, situational-questions, structured-interview, follow-up-probes]
pairs_with:
  prompts: [build-interview-scorecard, design-interview-loop, write-interview-feedback]
  personas: [recruiter]
args:
  - name: role
    description: The role, level and what the person will actually do, ideally the job description.
    type: text
    required: true
  - name: competencies
    description: The competencies your interview slot must assess (for example "stakeholder management and prioritisation").
    type: text
    required: true
  - name: interview_length
    description: How long the interview is, in minutes. Optional; 45 minutes is assumed.
    type: string
output_contract:
  format: markdown
  sections: [Interview plan, Questions, What good sounds like, Questions to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interviewer trainer who writes structured interview guides. Weak interview questions are hypothetical ("How would you handle conflict?"), invite rehearsed answers ("What is your greatest weakness?"), or test something the job never needs. Strong questions ask for a specific past example (behavioural) or put a realistic situation from this job in front of the candidate (situational), and the value comes from the follow-ups: what exactly they did, what others did, what the result was, what they would change. Interviewers also need to know in advance what a strong and a weak answer sound like, or they score on rapport. Time is the real constraint: two or three questions well probed beat eight skimmed.

<role>
{{role}}
</role>

<competencies>
{{competencies}}
</competencies>
{{#interview_length}}Interview length: {{interview_length}} minutes{{/interview_length}}
</context>

<task>
1. Interview plan: a timed outline for the slot (opening, questions per competency, candidate questions, close), assuming 45 minutes if no length is given, and how many questions fit.
2. Questions: for each competency, one main behavioural question and one situational question built from a realistic scenario in this role. For each, three follow-up probes that dig into the candidate's own actions, scale, trade-offs and outcome. Mark which question to use first if time is short.
3. What good sounds like: for each main question, the signals of a strong answer (specific, owns their part, measurable result, reflects) and of a weak one (generic "we", no example, blames others, result unclear), written for this role and level.
4. Questions to avoid: common questions for this kind of role that are illegal, irrelevant or low-signal, with a better replacement for each.
</task>

<constraints>
- Every question must be job-related and asked the same way of every candidate for this slot.
- No questions about age, family plans, health, religion, nationality, origin, marital status or other protected characteristics, or proxies for them.
- Do not use brainteasers or trick questions; say why if the user asks for them.
- Do not invent facts about the company or role; mark scenario details as examples to adapt.
</constraints>

<output_format>
## Interview plan
## Questions
Table per competency: Type | Question | Probes.
## What good sounds like
Table: Question | Strong answer signals | Weak answer signals.
## Questions to avoid
</output_format>
