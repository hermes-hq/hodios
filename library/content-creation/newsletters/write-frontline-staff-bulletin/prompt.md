---
schema: 1
id: write-frontline-staff-bulletin
kind: prompt
title: Write a frontline staff bulletin
description: Writes the weekly bulletin for shift staff without desks, such as care, clinic, school support or warehouse teams, as a noticeboard sheet, a two-minute huddle script and a phone message.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager]
subject: [social-care, healthcare]
requires: [none]
inputs: [notes, message]
output: [message, script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [frontline-staff, shift-work, huddle-script, noticeboard, read-and-confirm, action-items]
pairs_with:
  prompts: [write-team-newsletter, write-internal-announcement, write-bilingual-newsletter-issue]
args:
  - name: updates
    description: Everything that might go in - manager emails, rota or policy changes, new equipment or systems, required training, people news, events, reminders - pasted as they come.
    type: text
    required: true
  - name: workplace
    description: The workplace, the roles and shifts (for example "care home, 60 staff, carers and kitchen on days and nights, agency staff most weekends") and how staff get information now (noticeboard, handover, a staff app).
    type: string
    required: true
  - name: must_do_items
    description: Anything staff are required to do, with deadline and who it applies to (training, forms, policy sign-offs). Optional; otherwise they are taken from the updates.
    type: text
output_contract:
  format: markdown
  sections: [Noticeboard sheet, Huddle script, Phone message, Read-and-confirm, Check before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the weekly bulletin for frontline staff in a {{workplace}}. These readers do not sit at a desk or read work email: they see a sheet on the staff-room noticeboard, hear a two-minute huddle at shift start or handover, and glance at a message on their phone between tasks. Many read in a second language. The company-newsletter format fails them: a lead story and long sections nobody reads standing up, a compulsory action buried under news, deadlines that fall on days night or weekend staff are not in, a change that is different for each role written once for everyone, and people news shared without consent in a group chat on personal phones. A frontline bulletin is short, action-first, split by role and shift, and checks that the people who must see a safety or policy change have actually seen it.
</context>

<task>
<updates>
{{updates}}
</updates>
{{#must_do_items}}
<must_do_items>
{{must_do_items}}
</must_do_items>
{{/must_do_items}}

1. Sort everything into: must do (action, who, deadline), changed on shift, coming up, people, thank-you, and for information. Anything that does not change what someone does on shift goes to "for information" or is cut.
2. Apply the one-page rule: at most three must-dos and four changes on the sheet. Move the rest to "Ask your lead" or a linked document, and say what you moved.
3. Must-dos: for each, the action, who it applies to (role and shift), the deadline in bold with weekday, how long it takes and where or how to do it. Check that every shift can meet the deadline (nights, weekends, part-time, agency, staff on leave); if not, flag it. If required training has no time or place to do it on shift, mark [CONFIRM: done in paid time?].
4. Changes: one or two sentences each, written per role when the effect differs ("Carers: ...", "Kitchen: ..."), starting with the date it begins.
5. People and thank-you: starters, leavers and returns only with what the updates say may be shared; one specific thank-you naming what was done and its effect, with names only if the person is happy to be named. Never health, pregnancy, disciplinary, pay or reasons for leaving.
6. Write the huddle script to be read aloud in under two minutes (about 250 words): must-dos first, then the biggest change, one thank-you, and who to ask. Spoken sentences, no tables, numbers said in full ("Friday the 14th").
7. Write the phone message (under 60 words) for the staff app or group chat: the must-dos and a pointer to the noticeboard. Nothing confidential or personal, because these groups often sit on personal phones.
8. For any safety, clinical, safeguarding or policy change, propose a read-and-confirm step (initials on the sheet, a reply in the app, a check at handover) and who tracks it, including staff not on shift this week.
</task>

<constraints>
- Use only what the updates contain. Never invent deadlines, policies, names, numbers or reasons; mark gaps as [CONFIRM: ...].
- Plain language for second-language readers: sentences under 15 words, one idea per sentence, no idioms, acronyms spelled out once, dates as "Friday 14 November".
- Do not reword a policy or safety instruction so its meaning changes; quote the key line and point to the full document.
- Neutral and respectful on unwelcome changes: say what changes, when and who to ask, without spin or cheerleading.
- If the updates contain no action or change for staff, say so and suggest skipping the bulletin this week rather than padding it.
</constraints>

<output_format>
## Noticeboard sheet
Title with the week, then: **Must do** (table: action | who | deadline | time needed | where), **Changed on shift** (by role), **Coming up**, **People and thanks**, **Ask your lead** (moved items and the contact). Fits one printed page.

## Huddle script
The read-aloud text, under about 250 words.

## Phone message
Under 60 words.

## Read-and-confirm
Each item needing confirmation, the method, who tracks it and how off-shift staff are reached. "None needed" if none.

## Check before sending
Every [CONFIRM], deadlines some shifts cannot meet, items needing a person's consent, and anything left out and why.
</output_format>
