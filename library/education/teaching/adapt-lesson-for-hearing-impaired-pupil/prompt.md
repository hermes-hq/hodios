---
schema: 1
id: adapt-lesson-for-hearing-impaired-pupil
kind: prompt
title: Adapt a lesson for a deaf pupil
description: Adapts a lesson for a deaf or hearing-impaired pupil with seating, lighting, radio aid use, captions, visual vocabulary, pre-teaching, check-ins and rules for group talk.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deaf-awareness, hearing-impairment, radio-aid, captions, inclusive-classroom, special-educational-needs]
pairs_with:
  prompts: [differentiate-lesson, write-teaching-assistant-briefing, write-one-page-pupil-profile]
  personas: [special-education-advisor]
args:
  - name: lesson_plan
    description: The lesson plan or a summary - objective, activities and timings, any video, audio, group work or practical work.
    type: text
    required: true
  - name: pupil_needs
    description: What you know about the pupil (initials only) - level of hearing loss if shared, hearing aids or cochlear implants, radio aid or remote microphone, whether they use sign language or a communication support worker, lip-reading, and what the specialist teacher of the deaf has advised.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before the lesson, Room and equipment, Lesson adaptations, Group work and discussion, Checking understanding, Questions for the specialist teacher]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A class teacher or teaching assistant has a deaf or hearing-impaired pupil in a lesson. Hearing technology helps but does not restore typical hearing: background noise, distance, poor lighting on the speaker's face and fast cross-talk in discussions are where deaf pupils lose most. They also tire more from concentrating to listen. Common failures: asking "Did you understand?" (most pupils say yes), playing videos without accurate captions, talking while facing the board, and group work where several people speak at once. The pupil's specialist teacher of the deaf knows their profile best; this plan supports, not replaces, that advice.
</context>

<task>
<lesson_plan>
{{lesson_plan}}
</lesson_plan>

<pupil_needs>
{{pupil_needs}}
</pupil_needs>

1. Before the lesson: new vocabulary to pre-teach (written down, with a picture or sign where relevant), a short written outline of the lesson, and materials to share in advance (video transcripts, key questions).
2. Room and equipment: seating with a clear view of the teacher's face and of classmates in discussion, usually near the front and to one side; the teacher's face lit, not backlit by a window; noise reduction (doors closed, equipment off, soft furnishings). Radio aid or remote microphone: who wears it, connecting it to video or audio sources, muting it during private conversations, passing it in group talk, and checking it works at the start.
3. Lesson adaptations, phase by phase from the lesson plan: face the class when speaking, do not talk while writing on the board, repeat or rephrase classmates' answers, give instructions verbally and in writing, accurate captions or a transcript for all video and audio, visual cues before changes of activity, and a short pause before speaking so the pupil can find the speaker. If the pupil uses sign language with an interpreter or communication support worker, plan for their position, lag time and preparation materials.
4. Group work and discussion: small groups, one speaker at a time with a visual signal (a talking object), groups placed in quieter parts of the room, and a written record of key points.
5. Checking understanding: ask the pupil to explain or show back rather than ask whether they understood, a discreet signal for "I missed that", and a short check-in at the end. Allow for listening fatigue with brief breaks.
6. Questions for the specialist teacher of the deaf: what to ask to fill gaps in the notes.
</task>

<constraints>
- Use only the needs given; do not guess the level of hearing loss or what the pupil can hear. Mark assumptions [check with specialist teacher].
- Never single the pupil out in front of the class; agree any signals privately with them.
- Do not give medical or audiological advice, and do not adjust hearing equipment beyond the checks the specialist or audiologist has trained staff to do.
- If the lesson plan is too thin to adapt phase by phase ("normal maths lesson"), give the general room and checking adaptations and ask for the activities, any video or audio, and group work.
- If the question is about faulty or whistling equipment or its settings, say to contact the specialist teacher of the deaf or the pupil's audiology service and to use only trained daily checks.
- Include the fire alarm and emergency routine if the pupil may not hear alarms.
- Initials only.
</constraints>

<output_format>
## Before the lesson
Checklist.

## Room and equipment
Checklist.

## Lesson adaptations
Table: Lesson phase | What could be missed | Adaptation.

## Group work and discussion
Bullets.

## Checking understanding
Bullets.

## Questions for the specialist teacher
Numbered list.
</output_format>
