---
schema: 1
id: write-reading-volunteer-guide
kind: prompt
title: Write a reading volunteer guide
description: Writes a guide for volunteers who read with children in a school or library, covering safeguarding basics, how to listen to a child read, praise, questions and reporting concerns.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-volunteers, volunteer-training, listening-to-readers, safeguarding-basics, reading-for-pleasure, pause-prompt-praise]
pairs_with:
  prompts: [plan-library-reading-programme, write-safeguarding-concern-record, plan-guided-reading-group]
args:
  - name: setting
    description: Where volunteers read with children. school is during the school day, usually one-to-one in a shared space; library is at a public library, often with families nearby.
    type: enum
    enum: [school, library]
    default: school
  - name: ages
    description: The ages or year groups the volunteers will read with, for example "5-7", "Year 3 and 4", "8-11 reluctant readers".
    type: string
    required: true
  - name: session_minutes
    description: How long each reading session lasts, in minutes.
    type: number
    default: 20
  - name: local_procedures
    description: Optional details to include - the safeguarding lead's role and how to reach them, the checks volunteers need, sign-in rules, where sessions happen, and how to record sessions. Leave empty and the guide will use placeholders.
    type: text
output_contract:
  format: markdown
  sections: [Welcome, Before you start, Keeping children safe, A session step by step, Listening to a child read, Questions to ask, Praise that helps, When reading is hard, Recording and reporting, Contacts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write guides for reading volunteers: parents, retired people, students and employees who give an hour a week to read with children. Volunteers do the most good when they make reading feel enjoyable and safe, give children time to work words out, praise effort specifically, and talk about the story. They also need to know the basic safeguarding rules and exactly what to do if a child tells them something worrying, without being frightened off. A good guide is short, friendly and practical, something a volunteer reads before their first session and keeps in their bag.

Setting: {{setting}}
Ages: {{ages}}
Session length: {{session_minutes}} minutes
{{#local_procedures}}
<local_procedures>
{{local_procedures}}
</local_procedures>
{{/local_procedures}}
</context>

<task>
Write the guide, addressed to the volunteer as "you", with these sections:
1. Welcome: why their time matters, in three or four sentences, and what a good session looks like.
2. Before you start: the checks the organisation requires (from local procedures or a placeholder), signing in and wearing a badge, where sessions happen, and who their contact is.
3. Keeping children safe, as short do and don't lists: stay in open, visible spaces; never be alone behind a closed door; no personal contact details, social media or photos; appropriate physical contact (a high five, not a hug initiated by the adult); never give children lifts or gifts without permission; and what to do if a child says something worrying: stay calm, listen, do not ask leading questions, do not promise to keep a secret, write down their exact words, the date and time as soon as possible, and tell the safeguarding lead the same day. If a child is in immediate danger, call the emergency services.
4. A session step by step for {{session_minutes}} minutes, adapted to {{ages}}: greeting and chat, choosing a book together, the child reading (or sharing reading), talking about the book, and a warm finish.
5. Listening to a child read: pause, prompt, praise. Wait about five seconds when a child is stuck; prompt with a cue that fits how they are taught (sounding out, looking at the picture, rereading the sentence); tell them the word if they are still stuck so the story keeps going; and do not correct every small error that keeps the meaning.
6. Questions to ask before, during and after reading, with examples that suit {{ages}}: predicting, noticing, feeling, connecting to their life, and "what was your favourite part and why?".
7. Praise that helps: specific praise for effort and strategies ("You went back and reread that, and it made sense"), with examples; avoid comparing children.
8. When reading is hard: what to do if a child does not want to read, is anxious, reads far below or above what you expected, or is tired; reading to them, taking turns, choosing comics or non-fiction, and telling the teacher or librarian.
9. Recording and reporting: what to note after each session (from local procedures or a placeholder) and what to pass on to staff, and that concerns about wellbeing go to the safeguarding lead, not just in the reading record.
10. Contacts: placeholders for the volunteer coordinator, the safeguarding lead and the emergency number.
Before answering, check every safeguarding step is present and phrased simply, and the session plan fits {{session_minutes}} minutes.
</task>

<constraints>
- Friendly, plain and short: a volunteer should read it in about ten minutes. No jargon; if you mention phonics or a scheme, explain it in a phrase.
- Use local procedures exactly where given. Where not, use placeholders rather than inventing names, numbers or rules, and remind the organisation to fill them in.
- Safeguarding steps are basic and practical, and point to the organisation's training and lead; do not give legal definitions or thresholds, which differ by country.
- For library settings, note that parents or carers usually stay nearby and are responsible for their child; the volunteer still follows the safeguarding steps.
- If the ages are missing, ask in one line and stop.
</constraints>

<output_format>
The guide in Markdown with the section headings in order, short paragraphs, do and don't lists, and a boxed or bold "If a child tells you something worrying" checklist in Keeping children safe.
</output_format>
