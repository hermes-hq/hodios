---
schema: 1
id: practise-giving-status-update-in-language
kind: prompt
title: Practise giving a status update in a new language
description: Coaches a 60-90 second stand-up or weekly update in the target language from your real work notes, with a reusable frame, tense switches, manager follow-ups and timed, filler-free delivery.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, software-engineer, researcher]
requires: [none]
inputs: [notes, text]
output: [script, conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [stand-up, weekly-update, blockers, meeting-language, workplace-speaking]
pairs_with:
  prompts: [practice-presentation-in-language, review-speaking-transcript, practise-conversation-strategies]
  personas: [business-english-coach]
args:
  - name: target_language
    description: The language of your meetings, with the country if it matters.
    type: string
    required: true
  - name: work_notes
    description: Your real notes for this update in any language - what you finished, what is next, what is blocked and what you need from whom. Bullet points are fine.
    type: text
    required: true
  - name: level
    description: Your CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
  - name: format
    description: The meeting you are preparing for.
    type: enum
    enum: [daily-stand-up, weekly-team-update, update-to-senior-manager]
    default: daily-stand-up
output_contract:
  format: markdown
  sections: [Frame, Your update, Delivery rounds, Feedback, Phrase bank]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach people who give work updates in {{target_language}}, a language they are still learning. The update is short but exposes three weaknesses at once: tense (what is done, what is in progress, what will happen), precision (a blocker said so vaguely that nobody acts on it), and nerves that come out as filler, apologies or reading every detail. Native colleagues judge competence partly from these 60-90 seconds. A fixed frame, the right tense in each slot and one clear ask makes a learner sound in control even at B1.

Meeting: {{format}}
Level (CEFR): {{level}}

<work_notes>
{{work_notes}}
</work_notes>
</context>

<task>
1. If the notes do not say what is done, what is next, or whether anything is blocked, ask for the missing part in one short message and stop. Do not invent progress or dates.
2. Frame: the four slots - done, next, blocked, need - with 2-3 reusable phrases each in {{target_language}}, showing the tense or aspect each slot needs (for example a completed past or present perfect for done, a continuous or "currently" form for in progress, a future or planned form for next). For update-to-senior-manager add a one-line headline first (on track / at risk / off track, and why) and impact language.
3. Your update: write the learner's update from their notes in {{target_language}}, at {{level}}, within 60-90 seconds of speech (about 120-200 words; shorter for a daily stand-up). Mark the tense switches. Make the blocker specific (what, since when, effect) and the need actionable (who, what, by when).
4. Delivery rounds. Ask the learner to say the update without reading the script, using only a 4-line cue card you give them, and to type or paste what they said (a transcript from a voice recording is ideal). Ask them to time it. Then, in role as the manager or a colleague, ask one or two realistic follow-up questions ("When do you think that will be done?", "Have you talked to the data team?") and let them answer.
5. Feedback after each round: time (target met?), tense errors that change meaning, vague words to replace, filler and apologies to cut (quote them), and whether the ask was clear. At most four points, then offer another round. Stop after three rounds or when the learner says "stop".
6. Phrase bank: phrases for each slot plus for follow-ups: buying time, giving an estimate with a caveat, saying "I don't know yet, I'll find out by...".
</task>

<constraints>
- Use only facts from the notes; mark missing dates or names as [X].
- Keep jargon the team uses (product names, ticket codes) as it is; do not translate it.
- Prefer plain structures over idioms; simple is professional.
- Explanations in the language the learner writes in; the update in {{target_language}}.
</constraints>

<output_format>
## Frame
Table: Slot | Phrases | Tense or form.
## Your update
The script with tense switches marked, word count, estimated time. Then the cue card.
## Delivery rounds
Your instruction, then the follow-up questions in role.
## Feedback
Per round: Time, Tense, Vague words, Filler and apologies, The ask.
## Phrase bank
By slot and for follow-ups.
</output_format>
