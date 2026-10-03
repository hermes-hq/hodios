---
schema: 1
id: plan-professional-networking
kind: prompt
title: Build a professional networking plan
description: Builds a networking plan with who to reach, how often, give-first ideas and a simple tracker, matched to your goals and available time. Use to build a network before you need it.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, founder, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [relationship-building, weak-ties, give-first, contact-tracker, introverts]
pairs_with:
  prompts: [write-networking-message, prepare-networking-conversation, find-mentor, increase-work-visibility]
  personas: [career-coach]
args:
  - name: goals
    description: What you want your network to help with over the next year (a new role, clients, a career change, learning a field, getting promoted, finding collaborators), and your current role and field.
    type: text
    required: true
  - name: current_network
    description: Who you already know, roughly - former colleagues, classmates, clients, communities, online following - and how in touch you are. Also say if networking feels uncomfortable for you. Optional.
    type: text
  - name: hours_per_month
    description: Hours per month you can realistically give to networking.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Goal translation, Who to reach, Give-first ideas, Cadence, Messages, Tracker, How you will know it is working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career strategist who helps people build professional networks that last. Useful opportunities usually come through weak ties (former colleagues, friends of friends, people met once at an event) more than through close friends, and dormant ties are often the fastest to revive because trust already exists. Networks grow through repeated, low-effort contact and through being useful first: sharing something relevant, making an introduction, giving a thoughtful comment. Plans fail when they are a burst of cold requests, when every message is an ask, or when the time cost is more than the person will keep up. Introverts do best with one-to-one contact, writing, and small groups, not large events.

<goals>
{{goals}}
</goals>
{{#current_network}}
<current_network>
{{current_network}}
</current_network>
{{/current_network}}
Time available: {{hours_per_month}} hours per month
</context>

<task>
1. Goal translation: turn the goals into the kinds of people who can help with each. For example, people who do the target job now, people who hire for it, people one step ahead, and connectors who know many people in the field. Name the one goal that should get most of the time if they compete.
2. Who to reach: build three rings. Revive: dormant ties worth reconnecting with. Deepen: current weak ties to strengthen. Extend: new people or communities to join. For each ring, give the profile, where to find them (specific types of communities, events, alumni groups, professional associations or online spaces relevant to the field), and how many contacts to aim for. Draw names and groups only from what the person gave; otherwise describe types and use [X] placeholders.
3. Give-first ideas: eight to ten specific ways this person can be useful, given their skills and field. Examples include sharing a resource, introducing two people, writing a short summary of an event, offering a skill, or publicly crediting someone's work. Note the time each takes.
4. Cadence: a monthly routine that fits within {{hours_per_month}} hours. Split it into a weekly habit (for example, two short messages), a monthly anchor (one conversation or event), and a quarterly touch for the top contacts. Show the time per activity, and keep the total inside the budget. If the goals clearly need more time, say so and suggest what to cut.
5. Messages: draft three short templates the person can adapt: reconnecting with a dormant tie, a first message to someone new that gives before it asks, and a follow-up after a conversation. Each should be under 80 words, specific and free of flattery.
6. Tracker: design a simple tracker (a spreadsheet or notes table) with the columns to keep, how to flag who is due for contact, and a five-minute weekly review.
7. How you will know it is working: two or three leading signs over three months (for example, replies, introductions offered, invitations) and one sign that the plan needs to change.
</task>

<constraints>
- Fit the plan to the stated time. Do not prescribe daily posting or frequent large events unless the person wants that.
- Keep the tone professional and genuine. No scripts that fake interest, flatter, or hide an ask inside a compliment.
- Do not invent people, companies or events. Describe the type to look for, and mark specifics as [X].
- If the goals are vague, make the most reasonable reading, say which reading you used, and ask one question at the end.
</constraints>

<output_format>
## Goal translation
## Who to reach
Table: Ring | Profile | Where to find them | Target number.
## Give-first ideas
## Cadence
Table: Activity | Frequency | Minutes per month.
## Messages
## Tracker
Table showing the columns with one example row.
## How you will know it is working
</output_format>
