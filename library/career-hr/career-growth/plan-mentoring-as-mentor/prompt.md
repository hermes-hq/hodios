---
schema: 1
id: plan-mentoring-as-mentor
kind: prompt
title: Plan mentoring as a mentor
description: Helps someone who has agreed to mentor a colleague set goals together, agree how often and how to meet, plan the first sessions and give advice the mentee can actually use.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, tech-lead]
requires: [none]
inputs: [text, notes]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [being-a-mentor, mentee, coaching-questions, knowledge-sharing]
pairs_with:
  prompts: [prepare-for-mentor-meeting, find-mentor]
  personas: [career-coach]
args:
  - name: mentee
    description: Who you are mentoring (role, experience, what they asked for help with), how the arrangement came about, and anything you know about their goals.
    type: text
    required: true
  - name: you
    description: Your role and experience, how much time you can give, and any worries (not being expert enough, too much time, the mentee being in your reporting line).
    type: text
output_contract:
  format: markdown
  sections: [Set it up, First session, Session pattern, How to help well, Common traps, Review and close]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people be useful mentors. New mentors tend to tell their own story at length, give answers that fit their career but not the mentee's, or let sessions drift into friendly chats with no progress. Good mentoring balances asking and telling: ask questions until the real issue is clear, then share experience as one data point ("what worked for me was X, because Y; how does that fit your situation?"), and help the mentee decide. It works best with agreed goals, a set rhythm, the mentee owning the agenda, confidentiality boundaries, and a planned end or review point. Mentoring someone in your own reporting line or with a big power gap needs extra care about what stays confidential.

<mentee>
{{mentee}}
</mentee>
{{#you}}
<you>
{{you}}
</you>
{{/you}}
</context>

<task>
1. Set it up: what to agree in the first conversation: two or three goals, how often and how long to meet (sized to the time they can give), who sets the agenda (the mentee), how to contact between sessions, confidentiality and its limits, and a review date such as three or six months.
2. First session: a short plan with questions to understand the mentee's situation, ambitions and what they have already tried, and how to end with agreed goals.
3. Session pattern: a repeatable 30 to 60 minute structure (mentee update, main topic, mentor questions, options, mentee's next action) and a short set of good coaching questions for when the mentee is stuck.
4. How to help well: when to ask and when to tell, how to share experience without prescribing, how to give honest feedback, when to make an introduction, and how to handle topics outside their competence (refer to HR, a specialist or a professional).
5. Common traps: talking too much, solving problems for them, creating dependence, conflicts with the mentee's manager, mentoring someone you also assess. For each, a sign and what to do.
6. Review and close: how to check progress at the review date, adjust or end the arrangement gracefully, and ask for feedback on their mentoring.
</task>

<constraints>
- Keep it practical and proportionate to the time they have.
- Do not invent details about the mentee; use what is given.
- If the mentee raises mental-health crises, harassment or legal issues, the mentor's role is to listen and point to the right help, not to handle it; say this.
- If the mentee is in their reporting line, flag the confidentiality and fairness tension and how to handle it.
</constraints>

<output_format>
## Set it up
Checklist of things to agree.
## First session
## Session pattern
Structure, then coaching questions.
## How to help well
## Common traps
Table: Trap | Sign | What to do.
## Review and close
</output_format>
