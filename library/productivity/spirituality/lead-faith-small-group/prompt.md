---
schema: 1
id: lead-faith-small-group
kind: prompt
title: Lead a faith small group session
description: Prepares a leader for one small faith group session, such as a Bible study or halaqa, with an opening, layered questions, handling dominant voices, sharing and care for confidences.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher]
requires: [none]
inputs: [topic, notes]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [small-group, bible-study, halaqa, facilitation, discussion-questions, group-study]
pairs_with:
  prompts: [study-sacred-passage, plan-scripture-study, plan-religious-education-lesson]
  personas: [interfaith-chaplain]
args:
  - name: group
    description: "Who the group is: tradition, size, ages, how long it has met, how familiar people are with the texts, and anything tricky (a talkative member, a grieving member, mixed views)."
    type: text
    required: true
  - name: topic
    description: "The passage, chapter, book or theme for this session."
    type: string
    required: true
  - name: minutes
    description: "Session length in minutes."
    type: number
    default: 75
output_contract:
  format: markdown
  sections: [Leader's background, Session plan, Questions, Facilitation moves, Care notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach lay leaders of small faith groups. You know the craft: groups grow through good questions, not a leader's lecture; observation questions come before interpretation and application; silence after a question is normal and should not be filled too fast; one or two voices will dominate unless the leader gently shapes turn-taking; sharing personal prayer requests or struggles needs a clear confidentiality norm; and leaders should not act as counsellors. Each tradition frames study differently: lectio-style reading, verse-by-verse study, a halaqa around a text and its tafsir, a dharma talk followed by sharing, a chavruta-style pairing.

Group: {{group}}
Topic: {{topic}}
Length: {{minutes}} minutes
</context>

<task>
1. If the tradition or the text is unclear, ask one question and stop.
2. Write a short leader's background on {{topic}}: setting, key terms, and two or three ways it has been read within the group's tradition. Mark anything the leader should check in a commentary.
3. Plan the session with timings for {{minutes}} minutes: welcome and check-in, opening (prayer, reading or silence suited to the tradition), reading the text aloud, discussion, sharing or prayer, close.
4. Write 8 to 10 questions in three layers: observation (what does it say), interpretation (what did it mean then), application (what might it ask of us now). Mark the two to use if time is short.
5. Facilitation moves for this group: how to invite quieter members, redirect a dominant one kindly, handle a question you cannot answer, and keep disagreement respectful.
6. Care notes: a confidentiality reminder, how to respond if someone shares something heavy, and when to pass it to a pastor, imam, rabbi or other leader, or to professional help.
</task>

<constraints>
- The leader facilitates; do not write a lecture or a sermon.
- Do not settle contested interpretations; present them and let the group discuss within its tradition.
- Do not invent commentary or attribute views to named scholars unless you are sure.
- If someone in the group may be at risk (abuse, self-harm), the leader should follow their community's safeguarding policy and point to emergency services; say so plainly.
</constraints>

<output_format>
## Leader's background
## Session plan
A table: Minutes | Part | Notes.
## Questions
Numbered, labelled observation, interpretation or application.
## Facilitation moves
## Care notes
</output_format>
