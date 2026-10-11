---
schema: 1
id: announce-new-hire-to-team
kind: prompt
title: Announce a new hire to the team
description: Writes the email introducing a new team member to colleagues or clients - their role, what they will own, relevant background, start date, how to help them settle and how to reach them.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [new-hire, team-announcement, introduction, onboarding-logistics, people-news]
pairs_with:
  prompts: [write-new-hire-welcome-email, write-internal-announcement, write-account-handover-email]
args:
  - name: new_person
    description: Name, role, start date, who they report to, and what they will own or work on.
    type: string
    required: true
  - name: background
    description: Relevant background and a personal detail they have agreed to share. Check with them first.
    type: text
  - name: audience
    description: Team means your own team; wider means other departments; clients means external contacts who will work with them.
    type: enum
    enum: [team, wider, clients]
    default: team
  - name: asks
    description: What you want readers to do, for example "invite her to your project channels", "book a 20-min intro in her first two weeks", "send account questions to her from 1 Feb".
    type: text
output_contract:
  format: markdown
  sections: [Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The announcement email shapes how the new person is received. Its job is practical as much as social: colleagues need to know what this person will own (so they know what to bring to them, and what changes for their own work), when they start, and what they can do to help. Overlong CVs and superlatives ("rockstar", "world-class") create awkward expectations; a few relevant facts and one human detail the person agreed to share land better. If the hire changes ownership (a role that was vacant, work someone else was covering, a client relationship), the announcement must say who now handles what and from when, or people keep sending things to the old place. For clients, the email is about continuity and the date they should start contacting the new person. Always check the personal details with the new person before sending.
</context>

<task>
Write an announcement for a {{audience}} audience about: {{new_person}}.

{{#background}}
<background>
{{background}}
</background>
{{/background}}
{{#asks}}
<asks>
{{asks}}
</asks>
{{/asks}}

1. If the role, start date or what they will own is missing, ask and stop.
2. Write the email:
   - Subject: "Welcome [name], joining as [role] on [date]".
   - First lines: who is joining, the role, start date and who they report to.
   - What they will own, and what changes for readers (who to go to for what, from when). If someone was covering, thank them and say when the hand-over happens.
   - Background: two or three relevant facts and one personal detail only from the input.
   - Asks: concrete ways to help them settle (intro chats, adding to channels), from the input or sensible defaults marked as suggestions.
   - How to reach them (email placeholder if not given).
3. For clients, keep it to continuity: who they will work with, from when, what stays the same, and an offer of an introductory call. No internal details.
4. Under Notes, remind the user to check personal details with the new person, to time it for their first morning or the day before, and whether to copy them.
</task>

<constraints>
- Under about 180 words in the body.
- Never invent background, achievements, previous employers or personal details.
- No superlatives or hype ("rockstar", "superstar", "world-class").
- Do not include salary, level, age, family status or anything the person has not agreed to share.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Notes
Bullets: checks and timing.
</output_format>
