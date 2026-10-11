---
schema: 1
id: write-greetings-for-other-faiths-holidays
kind: prompt
title: Write greetings for other faiths' holidays
description: Writes fitting greetings for colleagues, clients, neighbours or friends celebrating Eid, Diwali, Hanukkah, Lunar New Year, Vaisakhi or other holidays, with what to say, when, and what to avoid.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, teacher, founder]
requires: [none]
inputs: [text]
output: [message, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [holidays, inclusion, religious-festivals, workplace, greetings]
pairs_with:
  prompts: [write-card-message, adapt-message-for-culture, write-festival-greetings]
args:
  - name: holiday
    description: The holiday or festival, for example Eid al-Fitr, Diwali, Hanukkah, Lunar New Year, Rosh Hashanah, Vaisakhi, Orthodox Easter.
    type: string
    required: true
  - name: recipients
    description: Who you are greeting and your relationship, for example "a Muslim colleague on my team", "all our clients", "my Hindu neighbours", "a class of pupils and their families".
    type: text
    required: true
  - name: channel
    description: How you will send it.
    type: enum
    enum: [spoken, chat-message, card, email, team-announcement]
    default: chat-message
output_contract:
  format: markdown
  sections: [About the holiday, Greetings, Timing, What to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A short, warm greeting on someone's holiday is almost always welcome; most awkwardness comes from small avoidable errors. Common ones: wishing someone well on a solemn day as if it were a party (Yom Kippur is a fast, and "Happy" sounds wrong; Ashura is a day of mourning for many Shia Muslims), getting the timing wrong (many dates follow lunar calendars and move each year, Eid depends on the moon sighting and can differ by a day between communities, Jewish holidays begin at sunset), assuming everyone from a country or community observes the same way, or grouping different holidays together ("happy Eid and Diwali to all our ethnic staff"). Traditional greetings exist (Eid Mubarak, Happy Diwali, Chag Sameach, Happy Lunar New Year rather than only "Chinese New Year" for mixed audiences) and are fine for an outsider to use. At work, an inclusive message plus a practical gesture (flexibility around fasting or prayer, not scheduling key meetings on the day) often means more than the words.
</context>

<task>
Write a greeting for {{holiday}}, for: {{recipients}}. Channel: {{channel}}.

1. If the holiday name is ambiguous (for example "Eid", which could be Eid al-Fitr or Eid al-Adha) or I may have the wrong holiday, say so and cover the likely one, noting the other.
2. In two or three sentences, explain what the holiday marks and its tone (celebratory, reflective, solemn), so I understand what I am wishing well for.
3. Write two or three greeting options fitted to the relationship and channel: one short traditional greeting with what it means, one warm everyday version, and, for workplaces or groups, an inclusive version. Keep personal messages under about 40 words.
4. Say when to send it: the typical day or period, that dates vary each year and when to confirm (calendar, the person themselves), and whether greeting at the start, during or at the end is customary.
5. List what to avoid for this holiday: wrong tone, food or drink assumptions (for example offering lunch during Ramadan), stereotypes, and assuming the person observes. Add one or two practical gestures for a manager or teacher if relevant.
</task>

<constraints>
- Do not state exact dates for a given year; say how the date is set and to confirm it.
- Do not invent greetings or translations; if unsure of a phrase or its spelling variants, say so.
- Respect variation within a faith or culture; note when practices differ between communities.
- No religious commentary or comparisons between faiths; keep it warm and simple.
</constraints>

<output_format>
## About the holiday
Two or three sentences on what it marks and its tone.
## Greetings
The options, each labelled.
## Timing
When to send it and how to confirm.
## What to avoid
Short list, plus practical gestures if relevant.
</output_format>
