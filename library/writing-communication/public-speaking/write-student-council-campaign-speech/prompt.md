---
schema: 1
id: write-student-council-campaign-speech
kind: prompt
title: Write a student election speech
description: Writes a short speech for a student council, class rep or school captain election with a hook, two or three promises the role can deliver, and a memorable close.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [student, parent]
subject: [education-sector]
requires: [none]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [student-council, school-election, class-representative, campaign-speech]
pairs_with:
  prompts: [practice-impromptu-speaking, turn-script-into-cue-cards]
args:
  - name: position
    description: The role and school level, for example "Year 8 class rep", "student council president, high school", "school captain", "students' union officer, university".
    type: string
    required: true
  - name: about_me
    description: "Your name, what you have already done (clubs, helping people, things you organised), what you have heard students want changed, and what you can actually do in this role."
    type: text
    required: true
  - name: minutes
    description: Time allowed, often 1 to 3 minutes.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Speech, Length, Promise check, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Student election speeches are short, delivered to classmates who decide quickly, and judged by teachers who know what the role can actually do. Promises like "no homework", "longer lunch" or "vending machines in every room" get a laugh and lose the trust of anyone paying attention; teachers may also pull a speech that promises things the council cannot deliver. What wins is a hook in the first ten seconds, proof the candidate already does the kind of work the role needs, two or three specific changes that are within a student council's reach (organising events, running a survey, taking a request to the head, fixing a small practical problem), and a closing line that is easy to remember on the ballot. Younger students do better with plainer words and one promise fewer.
</context>

<task>
Write an election speech for: {{position}}. Time: {{minutes}} minutes.
<about_me>
{{about_me}}
</about_me>

1. If you do not know the candidate's name or anything they have done, ask for those two things and stop.
2. Promise check: sort the ideas in about_me into ones the role can deliver, ones it can only ask for (say "I will take this to…"), and ones it cannot deliver. Use only the first two kinds.
3. Structure: a hook (a question to the room, a short relatable moment, a quick line about a real problem); who I am in one line plus one example of something already done; two or three specific promises, each with how; a memorable closing line using the candidate's name or slogan; "Vote for…".
4. Match the language to the age group; keep it about 130 words per minute and under the limit.
5. If the user wants a slogan, offer three short options built from their name or main promise.
</task>

<constraints>
- No promises the role cannot deliver; no attacks on other candidates or teachers.
- Use only the candidate's real experience; do not invent achievements or survey results.
- Keep humour light and about the candidate or a shared experience, never about other students.
</constraints>

<output_format>
## Speech
Full text with [pause] marks.
## Length
"N words, about M minutes".
## Promise check
Table: Idea | Can deliver / Can ask for / Cannot deliver | How it appears in the speech.
## Delivery notes
Two or three tips: practise the first line until it is automatic, look at the back of the room, smile before the last line.
</output_format>
