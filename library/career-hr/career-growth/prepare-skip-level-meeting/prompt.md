---
schema: 1
id: prepare-skip-level-meeting
kind: prompt
title: Prepare for a skip-level meeting
description: Prepares an employee for a skip-level meeting with topics, questions, how to raise concerns constructively and what not to say. Use before meeting your manager's manager.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [notes, text]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [skip-level, managing-up, raising-concerns, senior-leadership]
pairs_with:
  prompts: [increase-work-visibility, handle-difficult-manager, plan-career-path]
  personas: [career-coach]
args:
  - name: role
    description: Your role and level, how long you have been there, and who the skip-level person is (title, how well you know them, how the meeting was set up).
    type: text
    required: true
  - name: goals
    description: What you want from the meeting - for example understand strategy, be known for your work, discuss career growth, give feedback on a process.
    type: text
    required: true
  - name: concerns
    description: Anything you are worried about or want to raise (workload, direction, team issues, your manager), and whether you have already raised it with your manager. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Agenda, Questions to ask, Raising concerns, What not to say, Your manager, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach employees for conversations with senior leaders. A skip-level meeting is usually short and the leader is listening for three things: how the work and the team are really going, what people at this level understand about the strategy, and who is thoughtful and constructive. Employees get the most from it when they arrive with a few focused topics and good questions, give one or two concrete examples, raise concerns as observations with impact and a suggestion, and avoid surprising or undermining their own manager. It goes badly when it becomes a complaint session, a monologue about achievements, or gossip about named colleagues.

Role and context: {{role}}

<goals>
{{goals}}
</goals>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Purpose: one or two sentences the person can use to frame the meeting and what they want the leader to remember afterwards.
2. Agenda: a plan for a 30-minute meeting (adjust if they say otherwise): a short opener, two or three topics in priority order with rough timings, and time for the leader's questions.
3. Questions to ask: eight to ten specific questions grouped by goal, such as strategy and priorities ("What would make this team's work matter most to you this year?"), how the leader sees the team, what they value in people at the next level, and what is keeping them up at night. Mark the three best ones if time is short.
4. Raising concerns: for each concern, decide whether it belongs in this meeting at all, with the manager first, or with HR. For those that belong here, write it in the form observation, impact, suggestion, phrased about systems and outcomes rather than people, with one sentence that shows the person has tried to solve it. Concerns about harassment, discrimination, safety or ethics go to HR or the formal reporting channel; say so plainly.
5. What not to say: specific traps for this person's situation, such as criticising the manager without having raised it with them, naming colleagues negatively, asking for a promotion or raise outright, sharing confidential information, or overselling.
6. Your manager: whether and how to tell the manager about the meeting beforehand and what to share afterwards, so it does not feel like going around them.
7. After the meeting: a short thank-you note that references one thing the leader said, and how to follow up on any commitment.
</task>

<constraints>
- Work only from the details provided. If the goals are vague, choose the most likely purpose, say so, and ask one clarifying question at the end.
- Keep the tone constructive and specific. The person keeps working with both the manager and the leader.
- Do not advise misleading the manager or the leader, or using the meeting to settle scores.
</constraints>

<output_format>
## Purpose
## Agenda
Table: Minutes | Topic | Your point or question.
## Questions to ask
Grouped, with the top three marked.
## Raising concerns
For each: Where it belongs, then the wording.
## What not to say
## Your manager
## After the meeting
</output_format>
