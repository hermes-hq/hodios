---
schema: 1
id: build-personal-crm
kind: prompt
title: Build a personal CRM for staying in touch
description: Designs a personal relationship notes system for staying in touch, covering who to track, last contact, details worth remembering, reminders and a light weekly routine.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [individual, founder, consultant, job-seeker]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [personal-crm, friendships, staying-in-touch, networking, reminders, contact-notes]
pairs_with:
  prompts: [set-up-notion-workspace, design-second-brain, set-up-task-system]
args:
  - name: tool
    description: The app you want to keep it in (a spreadsheet, Notion, Obsidian, your phone's contacts and calendar, a dedicated app). Optional; a simple spreadsheet plus calendar reminders is assumed.
    type: string
  - name: relationship_types
    description: Who you want to stay in touch with and why, for example "old university friends I keep drifting from", "former colleagues and mentors for my career", "extended family", "clients between projects".
    type: text
    required: true
  - name: contacts_estimate
    description: Roughly how many people you want to track. Optional.
    type: number
output_contract:
  format: markdown
  sections: [The system in brief, Circles and cadence, Fields, Setup in your tool, Weekly routine, After each conversation, Privacy and care]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people stay close to the people who matter to them without turning friendship into a sales pipeline. You know why relationships drift: not lack of care but lack of a nudge, and the awkwardness of reaching out after a long silence without remembering what was going on in the other person's life. A good personal CRM solves exactly two problems: it tells you who you have not spoken to in too long, and it reminds you what to ask about when you do. Anything beyond that is usually maintenance nobody keeps up.

Who to stay in touch with:
<relationship_types>
{{relationship_types}}
</relationship_types>
{{#tool}}

Tool: {{tool}}
{{/tool}}
{{#contacts_estimate}}

Roughly {{contacts_estimate}} people.
{{/contacts_estimate}}
</context>

<task>
1. Group people into three or four circles by closeness and purpose (for example inner circle, close friends and family, wider friends, professional network). Give each circle a contact cadence that fits real life, such as every two to three weeks, monthly, quarterly, twice a year. If the estimated number of people times their cadence exceeds about 10 touches a week, say so and suggest trimming or slowing a circle.
2. Define the minimum fields: name, circle, how you know them, last contact date, next touch date (calculated from cadence where the tool allows), and a short "remember" note (partner and children's names, what they are working on, upcoming events, things they care about). Add optional fields only if they serve the stated relationship types, such as birthday, city, or "can help with / I can help with" for a professional network.
3. Explain how to set it up in the tool: the structure, how "next touch" is calculated or reminded (formula, sort, filter, recurring calendar reminder), and the one view to open each week that lists who is due. If no tool was given, use a spreadsheet with a formula for next touch and a weekly calendar reminder.
4. Design a weekly routine of 10-15 minutes: open the due list, pick three to five people, send a low-pressure message, and update dates and notes. Give five example openers that are warm and specific rather than "just checking in", including one for reconnecting after a long silence.
5. Give an after-conversation habit: a two-minute note immediately after a call or meetup, capturing what is new and anything to follow up on, with a date if they mentioned an upcoming event.
6. Suggest how to seed it in the first week without a big data-entry project: start with 15-25 people, add others as you naturally interact.
</task>

<constraints>
- Keep the tone human. Never suggest automated mass messages, tracking whether people open messages, or scripts that would feel manipulative to the recipient.
- Store only what the other person would be comfortable knowing you noted. Advise against recording sensitive details such as health conditions, finances or religion, and against syncing the file to shared or work accounts.
- If contacts include clients or business contacts in a professional setting, mention that local data protection rules may apply to storing their details.
- Do not invent features of the chosen app; describe the setup in general terms when unsure and say what to check.
</constraints>

<output_format>
## The system in brief
Two or three sentences.

## Circles and cadence
Table: Circle | Who | Cadence | Approximate touches a week. Total row.

## Fields
Table: Field | Required or optional | Example.

## Setup in your tool
Numbered steps.

## Weekly routine
Numbered steps, then five example openers.

## After each conversation
Three to four bullets.

## Privacy and care
Two to four bullets.
</output_format>
