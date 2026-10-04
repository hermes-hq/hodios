---
schema: 1
id: write-social-story
kind: prompt
title: Write a social story
description: Writes a social story for an autistic pupil about one specific situation, using descriptive, perspective and coaching sentences in a safe ratio, literal and positive wording, and a page plan.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher, parent]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [autism, special-educational-needs, social-stories, visual-supports, routine-change]
pairs_with:
  prompts: [create-visual-timetable, plan-sensory-friendly-classroom, write-one-page-pupil-profile]
  personas: [special-education-advisor]
args:
  - name: situation
    description: The specific situation the story is about, e.g. "fire drill during lessons", "a new class teacher after half term", "school trip to the science museum by coach".
    type: string
    required: true
  - name: age
    description: The pupil's age or year group, and reading level if it differs, e.g. "7, reads simple sentences" or "Year 9, reads well".
    type: string
    required: true
  - name: pupil_notes
    description: Optional. What the pupil finds hard about this situation, what they like or find calming, words they use, and whether they prefer photos, symbols or text only. Use a first name or initials only.
    type: text
  - name: perspective
    description: Write in the first person ("I") or the third person (the pupil's name or "children"). Third person often suits older pupils.
    type: enum
    enum: [first-person, third-person]
    default: first-person
output_contract:
  format: markdown
  sections: [Story, Sentence check, How to share it, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher, teaching assistant or parent needs a short social story to help an autistic pupil understand one situation before it happens. Good social stories follow the criteria developed by Carol Gray: their purpose is to share accurate, reassuring information, not to correct behaviour. Three failure modes ruin most home-made ones: they are a list of rules ("I must not scream"), so the pupil feels told off; they promise things that may not happen ("the fire alarm will ring at 10 o'clock"), which breaks trust when it does not; and they are too long or too abstract for the pupil's age and reading level.

Situation: {{situation}}
Age and reading level: {{age}}
Perspective: {{perspective}}
</context>

<task>
{{#pupil_notes}}
<pupil_notes>
{{pupil_notes}}
</pupil_notes>
{{/pupil_notes}}

1. Work out the who, what, where, when, why and how of the situation from the details given. If an essential detail is missing (where to line up, who the new teacher is, how long the coach journey is), use a clear placeholder like [where we line up] rather than inventing it.
2. Write a title that names the situation, an introduction, a body and a conclusion. Each page or paragraph carries one idea.
3. Use mostly descriptive sentences (facts about what happens), perspective sentences (what others may think or feel, said gently: "My teacher wants everyone to be safe") and affirmative or reassuring sentences. Keep coaching sentences (what the pupil or others could do) few, positive and optional in tone: "I can try to...", "I may..." Keep at least two describing sentences for every coaching sentence; aim for more.
4. Be literal and accurate, with flexible words for anything uncertain: "usually", "sometimes", "most of the time", "this may happen". Never "always", "never" or "will" about events outside anyone's control.
5. Use positive wording: describe what to do, not what not to do. No threats, consequences or rewards in the story.
6. Match the age: for under-8s or early readers, 6 to 10 short pages of one or two short sentences each; for older pupils, a short page of plain paragraphs that do not sound babyish. Use the pupil's own words and calming things from the notes.
7. For each page, suggest a picture: a real photo of the place or person where possible, otherwise a symbol, described in words.
8. Check every sentence against steps 3 to 5 and list the counts.
</task>

<constraints>
- If the request is really about stopping a behaviour (hitting, running off, shouting) or asks for threats, sanctions or lost rewards in the story, do not write rules or consequences. Write a positive story about what usually happens in that situation and what the pupil can try, and say in one line under How to share it that the behaviour itself needs a behaviour support plan with the class team or SENCO; a story alone will not stop it.
- One situation per story. If several are given, write the most urgent one and list the others as follow-ups.
- Do not describe the pupil's diagnosis, difficulties or past behaviour in the story.
- Do not invent facts about the school, people or timings; use [placeholders] and list them under Questions.
- First name or initials only; if a full name is given, use the first name.
- If the situation involves something unsafe or a safeguarding concern (for example a pupil being hurt at home), do not write a story about it; say it should go to the designated safeguarding lead.
</constraints>

<output_format>
## Story
Title, then numbered pages: the text, then "Picture:" with the suggested photo or symbol.

## Sentence check
Table: Sentence type | Count. Then one line confirming the ratio and that no sentence uses "always", "never" or a promise about uncertain events.

## How to share it
Up to five bullets: when to read it (calm time, a few days before and on the day), who reads it, letting the pupil hold or reread it, how to update it, when to stop using it.

## Questions
Every placeholder and any detail to confirm.
</output_format>
