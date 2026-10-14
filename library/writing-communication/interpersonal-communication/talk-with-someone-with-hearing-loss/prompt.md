---
schema: 1
id: talk-with-someone-with-hearing-loss
kind: prompt
title: Talk with someone with hearing loss
description: Gives practical ways to talk with a relative, friend or colleague with hearing loss in person, on the phone, on video and in groups, fitted to their situation and what they say helps.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, parent, manager]
requires: [none]
inputs: [text]
output: [checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [hearing-loss, deaf-awareness, family, inclusion]
pairs_with:
  prompts: [plan-dementia-conversations, practice-active-listening]
  personas: [communication-coach]
args:
  - name: person
    description: Who they are, how their hearing loss shows up (one side, high pitches, only in noise, profound), whether they use hearing aids, implants, lip-reading, captions or sign language, and how they feel about it.
    type: text
    required: true
  - name: settings
    description: Where talking is hard, for example "family dinners", "phone calls", "team video meetings", "the car", "restaurants".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How to talk face to face, Settings that are hard, Phone and video, When they mishear, Talking about it with them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hearing aids and implants help but do not restore normal hearing: they amplify noise as well as speech, and most people with hearing loss also rely on seeing the speaker's face. Common mistakes by hearing people are shouting (which distorts speech and looks angry), exaggerating lip movements, talking from another room or while turning away, covering the mouth, repeating the same words louder when a rephrase would work, and saying "never mind" or "it doesn't matter", which people with hearing loss find excluding. Group conversation and background noise are the hardest settings; the person often nods along and withdraws rather than keep asking. Fatigue is real: listening takes effort, so long evenings are harder late on. The person is the expert on what helps them, and preferences differ (some Deaf people use sign language and see themselves as a linguistic community, not as having a loss).
</context>

<task>
Help me communicate better with this person.

<person>
{{person}}
</person>

<settings>
{{settings}}
</settings>

1. If key details are missing (what they use, what they find hardest), make sensible assumptions, state them, and suggest I ask the person.
2. Give face-to-face habits: get attention first, face them in good light, normal pace and volume with clear speech, one topic at a time, signal topic changes, rephrase instead of repeating.
3. For each hard setting I named, give specific adjustments (seating, background noise, lighting, turn-taking, captions or a shared screen, writing key details down).
4. Phone and video: when to switch to video or text, captions and relay or captioned-phone services to look into in their country, how to confirm details like times and addresses.
5. When they mishear or miss something: what to say and what never to say.
6. Help me raise it with them: words to ask what helps, without making them feel a burden, and how to respond if they are reluctant to admit difficulty or try hearing aids. Point to an audiologist or their doctor for any change in hearing, without pushing.
</task>

<constraints>
- No medical advice about causes, treatment or devices beyond suggesting a hearing professional.
- Do not name specific products or services as recommendations; describe the type to look for locally.
- Respect the person's preferences and identity; if they sign or identify as Deaf, adjust advice accordingly (learning some sign, booking interpreters for important events).
- Keep each tip short and practical, written as something I can do today.
</constraints>

<output_format>
## How to talk face to face
Short list of habits.
## Settings that are hard
One subsection per setting I named, with adjustments.
## Phone and video
What to use and how.
## When they mishear
Do and do not say, with example lines.
## Talking about it with them
Words to open the conversation and handle reluctance.
</output_format>
