---
schema: 1
id: coach-with-grow-model
kind: prompt
title: Plan a GROW coaching conversation
description: Plans a coaching conversation with a direct report using the GROW model, with questions for each stage, ways to hold back from giving the answer and a clear close. Use before a coaching one-on-one.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, tech-lead, operations-manager]
requires: [none]
inputs: [text, notes]
output: [script, questions, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [grow-model, coaching-questions, manager-as-coach, development, active-listening]
pairs_with:
  prompts: [plan-one-on-one, build-development-plan, address-underperformance-early]
  personas: [leadership-coach]
args:
  - name: situation
    description: What the report is dealing with or wants help on (a stuck project, a career question, a difficult colleague, a skill to build), what you know about it, and what you are tempted to tell them to do.
    type: text
    required: true
  - name: report_goal
    description: What the report has said they want, in their words if possible. Optional; if empty, the plan spends more time on the Goal stage.
    type: text
output_contract:
  format: markdown
  sections: [Is coaching right here, Opening, Goal, Reality, Options, Way forward, Holding back, Close and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers to coach. The GROW model (Goal, Reality, Options, Way forward) structures a conversation in which the report does most of the thinking and leaves with a commitment they own. Managers tend to skip to Options and supply their own answer, because it feels faster and helpful. The cost is that the report learns little, owns less, and comes back with the next problem. Good coaching conversations spend real time on Goal and Reality, use short open questions, tolerate silence, reflect back what was heard, and only offer the manager's view when the report has run out of ideas, with permission and as one option among several. Coaching is not always the right mode: in an emergency, for a policy matter, or when the person lacks basic knowledge, direct guidance or teaching is better.

<situation>
{{situation}}
</situation>
{{#report_goal}}
<report_goal>
{{report_goal}}
</report_goal>
{{/report_goal}}
</context>

<task>
1. Is coaching right here: say whether a coaching approach fits, or whether the situation calls for directing, teaching, or escalating (for example, a safety issue, a clear policy breach, or a very new person who lacks the knowledge). If a mix fits better, say where to switch modes.
2. Opening: one or two sentences that set up the conversation as the report's time to think, and agree how long it will take.
3. Goal: four or five questions that help the report define what they want from this conversation and beyond. Show how to sharpen a vague goal into something specific.
4. Reality: five or six questions about what is happening now, what they have tried, what is in their control, the impact, and how others see it, written to avoid "why" questions that sound like blame.
5. Options: four or five questions that widen the possibilities ("What else?", "If you had no constraints…", "What would you advise a friend?"), and a way to offer the manager's own idea last, with permission, as one option.
6. Way forward: questions that turn options into a commitment: what they will do, by when, what might get in the way, what support they want, and how confident they are on a 1 to 10 scale (and what would raise it).
7. Holding back: the specific moments in this conversation where the manager is most likely to jump in with the answer, given what they said they are tempted to tell the report, and what to say or do instead. Include how to handle silence and how to respond if the report asks "What would you do?".
8. Close and follow-up: a summary in the report's words, a check on what was useful, and a follow-up date.
</task>

<constraints>
- Questions must be short, open and in plain language; avoid leading questions that contain the answer.
- If the manager has already decided the outcome, say that coaching is not the honest mode. Do not write questions meant to steer the report into thinking it was their idea; suggest being direct about the decision and exploring their concerns instead.
- Use only the details given. Do not invent facts about the report or their situation.
- Keep the plan usable in a 30-minute conversation; mark the two must-ask questions in each stage.
- If the situation involves wellbeing concerns, harassment or conduct issues, say which parts need HR or support outside a coaching conversation.
</constraints>

<output_format>
## Is coaching right here
## Opening
## Goal
## Reality
## Options
## Way forward
Each stage: questions as a list, the two must-ask questions marked, and a one-line purpose for the stage.
## Holding back
Table: Moment | Your urge | Do instead.
## Close and follow-up
</output_format>
