---
schema: 1
id: write-safety-alert-bulletin
kind: prompt
title: Write a workplace safety alert
description: Writes a workplace safety alert bulletin after an incident or near miss with what happened, the risk, immediate actions for staff and who to contact, readable at a glance on a noticeboard.
category: business-writing
version: 1.0.0
status: incubating
stage: [operate, ship]
role: [operations-manager, manager]
requires: [none]
inputs: [notes, text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [safety-alert, near-miss, health-and-safety, noticeboard, toolbox-talk, safety-bulletin]
pairs_with:
  prompts: [write-workplace-incident-report, write-job-aid, plan-shift-team-huddle]
args:
  - name: incident
    description: What happened, where, when, what equipment or task was involved, what the harm or potential harm was, what has been done so far and any confirmed cause. Leave out names of people involved.
    type: text
    required: true
  - name: audience
    description: Who must read it, for example "all warehouse and yard staff, including agency workers", "kitchen teams at all four sites", "maintenance contractors".
    type: string
    required: true
  - name: urgency
    description: urgent (staff must change what they do from today) or routine (a lesson to share and reinforce).
    type: enum
    enum: [routine, urgent]
    default: urgent
  - name: contact
    description: Who staff should contact with questions or to report a similar hazard, for example "shift manager or the safety lead on extension 214". Leave empty for a placeholder.
    type: string
output_contract:
  format: markdown
  sections: [Safety alert, Notes for the sender]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write safety alert bulletins: the one-page notice a workplace puts on noticeboards, in break rooms, on screens and in team chats after an incident or near miss, so everyone doing similar work changes what they do before it happens again. It is not the investigation report. People read it standing up, sometimes in a second language, often in a hurry. A good alert has a clear headline that names the hazard, a short factual account with no names and no blame, why it matters, three to five instructions written as commands, what is changing, and who to contact. Alerts fail when they bury the action under background, speculate about the cause, blame the person involved, use jargon, or contain instructions nobody has approved.

<incident>
{{incident}}
</incident>
Audience: {{audience}}
Urgency: {{urgency}}
{{#contact}}Contact: {{contact}}{{/contact}}
</context>

<task>
1. If the incident description does not say what the hazard was or what happened, ask what happened and what the hazard is, and stop.
2. Write the alert for {{audience}}:
   - a headline that names the hazard and the type of event, labelled "Safety alert" for urgent or "Safety lesson" for routine;
   - what happened, in two or three short factual sentences: the task, the hazard, the outcome, no names, no blame;
   - why it matters: the harm it could cause anyone doing this work;
   - what you must do now: three to five numbered instructions starting with a verb, specific to the task;
   - what is changing, if the incident text says (for example a guard being fitted or a new procedure), otherwise a line that the investigation is ongoing and updates will follow;
   - who to contact and how to report a similar hazard;
   - a reference, date and a review or removal date as placeholders.
3. Notes for the sender: which instructions come from the incident text and which are suggestions for a competent person to approve before issue, information still needed, a pictogram or photo to add, translation needs for the audience, and where to post or share it.
</task>

<constraints>
- No names, initials, job titles that identify one person, or injury details beyond what is needed to show the risk.
- Do not state a cause unless the incident text says it is confirmed. Otherwise write "under investigation".
- Mark any instruction not in the incident text as [suggested - approve before issue] in the alert, and list it in the notes.
- Use plain words and short sentences that work for readers with limited English; avoid acronyms or spell them out.
- Keep the alert to one page.
- Before answering, check that every instruction is a clear action, that nothing in the alert identifies the people involved, and that suggested instructions are marked.
</constraints>

<output_format>
## Safety alert
The bulletin, in this order: headline (bold, all key words), **What happened**, **Why it matters**, **What you must do now** (numbered), **What is changing**, **Questions or a similar hazard?**, then reference and dates.
## Notes for the sender
Bullets: approved vs suggested instructions, missing information, picture to add, translation, where to post.
</output_format>
