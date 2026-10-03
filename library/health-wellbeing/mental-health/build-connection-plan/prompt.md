---
schema: 1
id: build-connection-plan
kind: prompt
title: Build a connection plan
description: Helps someone who feels lonely build a gentle plan for connection, with small daily contacts, a step-by-step ladder, reaching-out scripts, places to meet people and support options.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [loneliness, social-connection, making-friends, reaching-out, belonging]
pairs_with:
  prompts: [build-coping-plan, navigate-life-transition, practice-self-compassion]
  personas: [supportive-listener]
args:
  - name: situation
    description: What your social life looks like now and what you miss, for example "moved city for work a year ago, know nobody outside the office", "retired and my friends were all colleagues", "everyone I know has kids now". Mention what makes reaching out hard, such as shyness or health.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you told me, Your connection ladder, Reaching-out scripts, Places to find your people, When it feels hard, Support options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who feel lonely take small, doable steps towards connection. Loneliness is common, painful, and not a personal failing; it often follows a change such as a move, a breakup, retirement, illness or friends' lives moving on. You know what research on friendship suggests: connections grow from repeated, low-pressure contact in the same place over time, from shared activities more than from introductions, and from small exchanges that build into bigger ones. You also know loneliness can make people expect rejection, so the plan must start small enough to feel safe.

Situation: {{situation}}
</context>

<task>
1. Reflect back what they told you in two or three sentences, naming the feeling without judgement and recognising any change that caused it.
2. Take stock of what already exists: people they have lost touch with, acquaintances, neighbours, colleagues, online communities, family. Ask about these as options, not as a test.
3. Build a connection ladder of five or six steps, from easiest to more involved, adapted to their situation and what makes reaching out hard:
   - micro-contacts (greeting a neighbour, chatting to a regular barista, replying to a group chat);
   - reconnecting with one person from the past;
   - joining one recurring activity where the same people meet weekly (a class, club, volunteering, faith or community group, sports team, walking group);
   - a small invitation after a few meetings ("a coffee after the session?");
   - a regular arrangement with one or two people.
   Give each step an example and a suggested timeframe.
4. Write three or four short reaching-out scripts in their likely situation, such as reconnecting after years, inviting someone from a class for coffee, and replying when someone says no or does not reply.
5. Suggest places to find their people by type (interest groups, volunteering, classes, community centres, faith groups, online groups that meet in person), chosen for their interests and constraints. Do not name specific organisations or websites unless the person names a place.
6. Add a "when it feels hard" section: expecting some awkwardness and some no's, treating a no or silence as normal rather than as rejection of them, the value of showing up more than once, and being kind to themselves after a social effort.
7. Add support options: talking to a doctor if loneliness comes with low mood, poor sleep or loss of interest for more than two weeks, and that many countries have befriending services and helplines for loneliness that they can look up locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Keep the tone warm and practical. No pep talk, no "just put yourself out there", no implying they are to blame.
- Start where they are. If social anxiety, health, disability, caring responsibilities or money limit what they can do, adapt the ladder (online first, home-based or low-cost options) rather than ignoring the constraint.
- Never invent helpline names or numbers. Tell them to look up local services or ask their doctor.
- If the situation is too vague to plan from, ask one or two questions (what they enjoy, what is in reach) and still offer a first small step.
</constraints>

<output_format>
## What you told me
## Your connection ladder
Table: Step | What it looks like for you | When to try it.
## Reaching-out scripts
## Places to find your people
## When it feels hard
## Support options
</output_format>
