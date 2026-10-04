---
schema: 1
id: adapt-language-study-for-hearing-loss
kind: prompt
title: Adapt language study for hearing loss
description: Plans learning a spoken language with hearing loss, hearing aids or a cochlear implant, using captions, visual phonetics, lip patterns, device listening, written-first routes and exam arrangements.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [language-learner, student, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [hearing-loss, hearing-aids, cochlear-implants, captions, lipreading, exam-access-arrangements]
pairs_with:
  prompts: [adapt-language-learning-for-dyslexia, adapt-language-study-for-low-vision, plan-sign-language-learning, learn-spelling-to-sound-rules]
  personas: [accessible-language-learning-coach]
args:
  - name: target_language
    description: The spoken language you are learning.
    type: string
    required: true
  - name: hearing_and_devices
    description: Your hearing in your own words (for example "moderate loss both ears", "deaf since childhood, cochlear implant since 2019", "high-frequency loss"), devices and settings you use, whether you lipread or sign, and your first language.
    type: text
    required: true
  - name: level
    description: Your current CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A1
output_contract:
  format: markdown
  sections: [Your route, Seeing the sounds, Listening with your devices, Captions and transcripts, Speaking and pronunciation feedback, Courses and classes, Exams and adjustments, Things to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who are deaf, hard of hearing or use hearing devices learn spoken {{target_language}} at level {{level}}. Courses assume listening is the easy way in; for these learners it is often the hardest, and audio-heavy apps and noisy classrooms can make them feel they "cannot learn languages". What works: a written-first route where reading builds vocabulary that later supports listening; making sounds visible (a consistent phonetic or respelling system, mouth-position diagrams, the language's spelling-to-sound rules, waveform or pitch displays for intonation and tones); captions and transcripts on everything; direct audio streaming into hearing aids or implants rather than speakers; and short, quiet, one-speaker listening before conversation. Some contrasts are harder with particular hearing profiles (high-frequency sounds such as s, f, th; pitch-based tones for some implant users), and learners deserve an honest account. Lip patterns differ by language, so lipreading skill in one language transfers only partly.

<hearing_and_devices>
{{hearing_and_devices}}
</hearing_and_devices>
</context>

<task>
1. Your route: three to five lines on the main approach for this person (written-first, balanced, or listening-focused with support) and what to expect.
2. Seeing the sounds: how to make {{target_language}} sounds visible: which respelling or phonetic notation to use, which sound contrasts are likely to be hard for their profile and how to learn them visually (mouth shapes, minimal pairs in writing, spelling rules), and pitch or tone visualisation if relevant.
3. Listening with your devices: general practices (direct streaming, quiet rooms, one voice at a time, slowed audio, repeated short clips with the transcript first, then without), and to ask their audiologist about programs for language listening and music, without inventing device settings.
4. Captions and transcripts: where to find captioned and transcribed content in {{target_language}} and how to use it in stages (read first, then watch with captions, then without).
5. Speaking and pronunciation feedback: ways to get feedback without relying on hearing yourself (speech-to-text as an intelligibility check, recording for a teacher or tutor, visual feedback tools).
6. Courses and classes: what to ask of a teacher or school (seating, written instructions, captions, a loop system or remote microphone where available, speaking one at a time), and whether one-to-one online lessons with captions may suit better.
7. Exams and adjustments: typical arrangements to ask about (extra replays, a live speaker for lipreading, transcripts, a separate room, modified or exempted listening components), requested early with evidence, from the exam board.
8. Things to check: what to verify locally (exam board rules, audiologist, deaf associations, captioned media availability), and, if they sign, the option of learning the sign language of the target country alongside.
</task>

<constraints>
- Use only what they told you; do not assume degree of loss, communication preference or identity. Some Deaf people see themselves as a cultural and linguistic minority; follow the person's own wording.
- Do not give medical or audiological advice or device-setting instructions you cannot verify; refer device questions to their audiologist.
- Be honest about hard contrasts without being discouraging, and never imply they cannot learn the language.
- If the hearing description is too thin to choose a route, ask one question and stop.
</constraints>

<output_format>
## Your route
Three to five lines.
## Seeing the sounds
Table: hard contrast | why hard for you | how to learn it visually.
## Listening with your devices
Bullets.
## Captions and transcripts
Bullets with the three-stage method.
## Speaking and pronunciation feedback
Bullets.
## Courses and classes
Checklist of what to ask for.
## Exams and adjustments
Bullets, with when and whom to ask.
## Things to check
Three to five bullets.
</output_format>
