---
schema: 1
id: start-peer-support-group
kind: prompt
title: Start a peer support group
description: Plans a peer support group with a session format, ground rules, facilitation tips, confidentiality limits, a safety procedure for distress or crisis, and links to professional help.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, script]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [peer-support, support-groups, facilitation, ground-rules, community]
pairs_with:
  prompts: [support-struggling-friend, manage-caregiver-stress, build-connection-plan]
  personas: [supportive-listener]
args:
  - name: focus
    description: Who the group is for and what it is about, for example "parents of autistic children", "people recovering from burnout", "men after bereavement", "carers of people with dementia". Include who is organising it.
    type: text
    required: true
  - name: setting
    description: Whether the group meets in person or online.
    type: enum
    enum: [in-person, online]
    default: in-person
  - name: group_size
    description: The largest number of members expected at one meeting. Groups of 6 to 12 tend to work best for sharing.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Purpose and boundaries, Practical setup, Session format, Ground rules, Facilitation, Confidentiality, Safety procedure, Links to professional help, Launch checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people set up peer support groups that are safe and sustainable. You know what makes them work: a clear purpose that is peer support, not therapy or treatment advice; a predictable structure; agreed ground rules; facilitators who share airtime and keep things on track rather than counsel; confidentiality with honest limits; a plan for when someone is in distress or at risk; signposting to professional services; and support for facilitators so they do not burn out. Organisations that run peer groups commonly use two facilitators per meeting and a written safety procedure.

Focus: {{focus}}
Setting: {{setting}}
Expected group size: {{group_size}}
</context>

<task>
1. Purpose and boundaries: a two-sentence purpose for the group and a short "this group is / is not" list (peer sharing and practical tips, yes; diagnosis, treatment or medication advice, no). Say whether a closed group (fixed members) or drop-in suits the focus, and why.
2. Practical setup for {{setting}}: venue or platform needs, accessibility, frequency and length (typically 90 minutes, fortnightly or monthly), sign-up and contact details collected (minimal, with consent), and how to stop strangers or unsafe people joining online. If {{group_size}} is above about 12, suggest splitting into smaller circles for sharing.
3. Session format: a timed agenda: welcome and ground rules, check-in round, a theme or open sharing, practical exchange, a short closing round, and time afterwards for anyone who needs a quiet word.
4. Ground rules: six to eight in plain words, including confidentiality, one person speaks at a time, sharing is optional, speak from your own experience, no medical or medication advice, and respect differences.
5. Facilitation: two facilitators per meeting, with roles (lead and watcher); how to keep sharing balanced, handle someone dominating, gently redirect advice-giving, and respond to strong emotion. Include short phrases they can use.
6. Confidentiality: what stays in the room, and the honest limit: if someone is at risk of serious harm, facilitators may need to act. Say how to explain this at the start of every meeting. Suggest checking any local legal duties and data-protection rules, especially for groups involving children or vulnerable adults.
7. Safety procedure: a step-by-step plan for someone who is very distressed or mentions suicide, self-harm, abuse or danger: one facilitator stays with the group while the other speaks privately with the person; ask directly and calmly about safety; contact emergency services if there is immediate danger; share crisis contacts; follow up; record what happened; debrief facilitators. For online groups, include getting the person's location at sign-up, using private messages or a breakout room, and what to do if they leave the call.
8. Links to professional help: a resource sheet template with blanks for local crisis lines, emergency number, relevant health services and specialist charities for this focus.
9. Launch checklist: from recruiting a co-facilitator and any facilitator training (such as mental health first aid or safeguarding courses) to the first meeting and a review after three months, including support for the facilitators themselves.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- The group is peer support; never frame facilitators as counsellors or suggest they give therapy or medical advice.
- Do not invent organisation names, helplines or legal requirements; leave blanks and say what to look up locally.
- If the focus involves children, very vulnerable adults or high-risk topics (eating disorders, suicide bereavement, addiction), say plainly that partnering with an established charity or professional body is strongly advised, and why.
- Keep the plan practical and specific to the focus and setting.
</constraints>

<output_format>
## Purpose and boundaries
## Practical setup
## Session format
Table: Time | Segment | What happens.
## Ground rules
Numbered, ready to read aloud.
## Facilitation
Includes a table: Situation | What to say.
## Confidentiality
Includes a short script for the start of each meeting.
## Safety procedure
Numbered steps.
## Links to professional help
Resource sheet with blanks.
## Launch checklist
</output_format>
