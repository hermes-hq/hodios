---
schema: 1
id: write-graduation-speech
kind: prompt
title: Write a graduation speech
description: Writes a graduation, valedictorian or class speech that speaks for the class with shared moments, avoids stock advice and fits the school's time limit and approval rules.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [student, teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, preferences]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [graduation, valedictorian, commencement-address, class-speech, writing-for-the-ear]
pairs_with:
  prompts: [mark-up-script-for-delivery, rehearse-speech-with-feedback]
args:
  - name: speaker
    description: Who you are and the ceremony, for example "valedictorian, high school, 300 graduates", "student speaker at a university nursing graduation", "head teacher, Year 6 leavers' assembly", "guest speaker, community college".
    type: string
    required: true
  - name: material
    description: "Shared moments of this class or year (events, disruptions, in-jokes everyone knows), people to thank, what you want them to leave with, the school's rules (approval, time, no politics), and anything to avoid."
    type: text
    required: true
  - name: minutes
    description: The time limit set by the school. Student speeches are usually 3 to 6 minutes.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Speech, Length, Who it includes, Before you submit, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A graduation speech has two audiences: the graduates, who want their shared years recognised, and the families, who want to feel the moment matters and to hear the graduates thanked. Most graduation speeches blur together because they are built from the same parts: a dictionary definition, "today is not an end but a beginning", "follow your dreams", a famous quote, and a list of every teacher. What makes one memorable is specificity: two or three moments only this class lived through, a lesson that came out of them, and one concrete thing the speaker hopes people do.

Student speakers have constraints adults forget: the school usually approves the text in advance and expects it delivered as approved, there is a firm time limit, the speaker should speak for the class rather than about their own success, and in-jokes only work if most of the class shares them and the families can follow. A guest or staff speaker has the opposite risk: talking about their own career instead of the graduates' lives.
</context>

<task>
Write a graduation speech. Speaker and ceremony: {{speaker}}. Limit: {{minutes}} minutes.
<material>
{{material}}
</material>

1. If there are no shared moments or concrete details of this class, ask up to three questions (for example "What happened that everyone in your year will remember?", "What changed between your first day and now?") and stop.
2. Choose one central idea that comes from the class's own experience, not from a quotation.
3. Structure: an opening that gets the hall's attention in 20 seconds (a shared moment, not "Webster's defines…"); two or three shared moments told briefly and what they showed; thanks to families, staff and support staff as groups, with at most a few names if the material asks for them; the central idea as a concrete hope or challenge; a close that returns to the opening.
4. Speak for "we" more than "I", unless the speaker is a guest, who should speak to "you".
5. Write for a large hall: short sentences, room for applause and laughter, [pause] marks, about 130 words per minute and a little under the limit to allow for applause.
6. Remove anything that excludes groups in the class, depends on one friend group's in-jokes, or would not pass the school's approval rules given.
</task>

<constraints>
- Use only the events, names and facts given; never invent class events or quotes. Use `[moment: …]` placeholders.
- No stock lines ("this is not the end", dictionary definitions, "follow your dreams", "the future is in our hands") unless turned into something specific.
- No mocking of teachers, other students or the school; no political or religious statements the material does not ask for and the school would not approve.
- If a classmate died or the year had a serious event, mention it only if the material does, briefly and with dignity, and suggest checking with the school and family.
</constraints>

<output_format>
## Speech
Full text with [pause] marks.
## Length
"N words, about M minutes", noting time left for applause.
## Who it includes
One line on how the speech covers the whole class and the families, and any group that may feel left out.
## Before you submit
Items to check with the school: approval, names, any sensitive mention.
## Delivery notes
Three tips for a big hall: microphone distance, looking up at the back rows, waiting out applause.
</output_format>
