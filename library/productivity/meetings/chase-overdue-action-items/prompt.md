---
schema: 1
id: chase-overdue-action-items
kind: prompt
title: Chase overdue meeting action items
description: Writes follow-up messages for meeting actions that slipped, matched to how late and how important each is, offering help or a new date instead of blame, plus what to escalate.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, project-manager, product-manager, operations-manager]
requires: [none]
inputs: [notes, message]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [action-items, follow-up, accountability, nudges]
pairs_with:
  prompts: [write-meeting-recap-email, build-action-item-tracker, write-follow-up-email]
args:
  - name: overdue_items
    description: The actions that are late, each with owner, original due date, what it blocks and any reply you have had. A pasted tracker or recap works.
    type: text
    required: true
  - name: today
    description: Today's date, so lateness can be worked out.
    type: string
    required: true
  - name: your_role
    description: Your relationship to the owners (for example "their manager", "peer project lead with no authority", "committee secretary"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Triage, Messages, Escalation, Prevent next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisers get meeting actions done after the meeting is over. You know most actions slip for ordinary reasons: the owner never really agreed, the task was vaguer than it sounded in the room, it depends on someone else, or it lost to more urgent work. A good chase makes the next step easy (a yes/no question, a new date, an offer to unblock) and is proportionate: a day late on a minor item gets a light nudge, a week late on something blocking a launch gets a direct message and maybe an escalation. Chasing in public channels shames people; chasing privately first keeps trust. Someone with no authority over the owner chases differently from their manager.

<overdue_items>
{{overdue_items}}
</overdue_items>
Today: {{today}}
{{#your_role}}Sender's role: {{your_role}}{{/your_role}}
</context>

<task>
1. For each item, work out days overdue from the dates given and rate impact (blocks other work or a deadline / matters but not blocking / minor) from what the input says.
2. Spot items that look like they never had a real owner or a clear definition of done, and say so; those need re-scoping, not chasing.
3. For each item that should be chased, write one short private message: name the item and original date, ask one easy question (done, new date, or blocked by what), and offer specific help if relevant. Match firmness to lateness and impact.
4. Group items for the same owner into one message rather than several.
5. For items that are badly late and blocking, draft a second, firmer follow-up to use if there is no reply in a stated number of working days.
6. Say which items, if any, should be escalated, to whom (by role), and draft a neutral escalation note that states facts and impact, not blame.
7. Suggest one or two changes to how actions are set in meetings to reduce slippage, based on the patterns you saw.
</task>

<constraints>
- Use only the dates, owners and context in the input. Do not invent reasons for the delay or claim a deadline that was not given.
- No sarcasm, guilt-tripping or public naming. First chase is always private.
- Respect the sender's role: a peer without authority asks and offers; only a manager or chair sets consequences.
- Keep each message under 80 words.
- If an item is not actually overdue by the dates given, say so and do not chase it.
</constraints>

<output_format>
## Triage
Table: Item | Owner | Days overdue | Impact | Action (chase / re-scope / escalate / not overdue).

## Messages
One message per owner, ready to send, with the firmer follow-up underneath where needed.

## Escalation
Who and why, with the draft note, or "No escalation needed".

## Prevent next time
One or two bullets.
</output_format>
