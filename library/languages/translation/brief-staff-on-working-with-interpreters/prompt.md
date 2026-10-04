---
schema: 1
id: brief-staff-on-working-with-interpreters
kind: prompt
title: Brief staff on working with interpreters
description: Writes a one-page guide for staff who book interpreters in clinics, schools, councils or charities, on when to book a professional, briefing, first-person speech and what interpreters will not do.
category: translation
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, teacher, operations-manager]
subject: [healthcare, public-sector, social-care, nonprofit]
requires: [none]
inputs: [text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [interpreters, staff-guide, language-access, safeguarding]
pairs_with:
  prompts: [interpret-conversation, practise-community-interpreting, adapt-public-notice-for-many-languages]
args:
  - name: setting
    description: Where the staff work.
    type: enum
    enum: [healthcare, school, council-or-public-service, charity, legal]
    default: healthcare
  - name: mode
    description: Which interpreting modes the guide should cover.
    type: enum
    enum: [in-person, phone, video, all]
    default: all
  - name: local_details
    description: Optional. Your booking process, the provider or contract you use, how to request a language, lead times, cost codes, and any policy you already have. Left out, the guide marks these as blanks to fill in.
    type: text
output_contract:
  format: markdown
  sections: [When to book a professional interpreter, Before the session, During the session, Phone and video, What interpreters will and will not do, After the session, Local details]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a one-page practical guide for frontline staff who need to work through an interpreter. Most problems in interpreted sessions come from the staff side, not the interpreter: relying on family members (especially children) instead of booking a professional, speaking about the person in the third person ("tell her that..."), talking in long monologues, no briefing beforehand, and expecting the interpreter to explain, advise or summarise. A good guide fits on one page, uses short imperative bullets, and is specific to the setting.

Setting: {{setting}}
Modes covered: {{mode}}
</context>

<task>
{{#local_details}}
<local_details>
{{local_details}}
</local_details>
{{/local_details}}

1. When to book: book a professional whenever the person is not fully comfortable in the staff member's language and the conversation matters (consent, assessment, diagnosis, safeguarding, complaints, legal rights, money, exclusions). Explain why not family, friends or bilingual colleagues without interpreter training (accuracy, confidentiality, conflicts of interest, power dynamics) and why children must never interpret. Say what to do in a genuine emergency before an interpreter is available. Check the person's language and variety, not only the country, and ask about interpreter gender preferences where relevant.
2. Before: book enough time (interpreted sessions take roughly twice as long), give the interpreter a short briefing (purpose, sensitive topics, terms, documents), seat the three of you in a triangle so the staff member and the person face each other, and check the interpreter has no personal link to the person.
3. During: introduce everyone and the interpreter's role; speak directly to the person in the first person ("How are you feeling?"); two or three sentences at a time; avoid jargon, idioms and acronyms; expect everything to be interpreted, including side remarks; check understanding with teach-back ("So I know I explained it clearly, can you tell me what you will do tomorrow?").
4. Phone and video, if covered: confirm who is in the room, use the speakerphone or headset properly, name yourself when you speak, describe what you are doing or showing, and pause more.
5. What interpreters will and will not do: they render everything accurately and impartially and keep confidentiality; they will not give advice, act as an advocate, sign forms as a witness unless that is policy, wait alone with the person while staff are out of the room, or translate written documents on the spot beyond short sight translation.
6. After: a short debrief if the content was distressing, record the interpreter's name or ID and the language in the notes, and how to raise concerns about quality.
7. Local details: fill from what is given, otherwise leave blanks.
</task>

<constraints>
- Keep the guide to about one printed page (around 450 to 600 words). Imperatives, no theory.
- Use only local details that were given. Never invent provider names, phone numbers, cost codes or lead times; leave blanks like [booking line] instead.
- Do not state legal duties as fact for a specific country. Where language access rights may apply, say "check your organisation's policy and local law".
- Inclusive tone: the person needing an interpreter is a client, patient, parent or resident, not "the foreigner" or "non-English speaker".
- For safeguarding, healthcare and legal settings, keep the line that family members and children are not used to interpret, except as permitted by policy in a life-threatening emergency until a professional is available.
</constraints>

<output_format>
A title line naming the setting, then:
## When to book a professional interpreter
## Before the session
## During the session
## Phone and video
(omit when mode is in-person)
## What interpreters will and will not do
Two short lists: Will, Will not.
## After the session
## Local details
Fill-in lines: how to book, provider, lead time, cost code, who to contact with concerns.
</output_format>
