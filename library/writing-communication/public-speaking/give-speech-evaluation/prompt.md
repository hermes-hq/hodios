---
schema: 1
id: give-speech-evaluation
kind: prompt
title: Give a speech evaluation
description: Prepares the timed evaluation you deliver aloud to a speaker in front of a speaking club or class, judged against their objectives, with commendations, one or two recommendations and a note.
category: public-speaking
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, teacher]
requires: [none]
inputs: [notes, transcript]
output: [script, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [speech-evaluation, speaking-club, peer-feedback, commend-recommend-commend, evaluator]
pairs_with:
  prompts: [critique-speech-recording, review-talk-feedback, give-feedback-on-colleagues-presentation]
args:
  - name: notes
    description: "Your notes on the speech (or a transcript): what the speaker did, moments that worked, moments that did not, timing, and anything you counted (fillers, pauses)."
    type: text
    required: true
  - name: objectives
    description: "What the speaker was trying to achieve or the project's objectives, for example 'first speech, introduce yourself', 'use vocal variety', 'persuade the audience to adopt a pet'. Include their experience level."
    type: string
    required: true
  - name: minutes
    description: Time allowed for the spoken evaluation. Speaking clubs often give 2 to 3 minutes.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Spoken evaluation, Written notes for the speaker, Length]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Evaluating another speaker in public, as speaking clubs and many classes ask members to do, is a skill of its own. Good evaluations are measured against the speaker's objectives and level, not the evaluator's taste. The common format is commend, recommend, commend: open with what worked, given specifically ("when you paused before saying 'and then the phone rang', the room leaned in"), offer one or two recommendations framed as what to try next time and why it would help the audience, and close with encouragement tied to something real. Weak evaluations give vague praise ("great speech, very confident"), pile on a list of ten fixes, re-tell the speech, comment on the speaker's appearance, accent or nerves in ways they cannot change, or run over time. Using "I" language ("I found myself lost when…") keeps it about the listener's experience. A first-time speaker needs more encouragement and one small, achievable recommendation; an experienced one can take sharper notes. Many clubs also want a short written note for the speaker.
</context>

<task>
Prepare an evaluation. Objectives and level: {{objectives}}. Time: {{minutes}} minutes.
<notes>
{{notes}}
</notes>

1. If the notes have no specific moments (only general impressions), ask the user for two or three things they remember the speaker doing or saying and stop.
2. Pick two or three commendations tied to specific moments in the notes and, where possible, to the objectives.
3. Pick one or two recommendations, the ones most likely to help the audience next time, linked to the objectives. Phrase each as a specific thing to try and why.
4. Calibrate to experience: for a first or early speech, one gentle recommendation and more encouragement; for an experienced speaker, sharper and more technical notes.
5. Write the spoken evaluation in the commend, recommend, commend shape, addressed to the speaker and the audience, using "I" language, within {{minutes}} minutes at about 130 words per minute.
6. Write a short written note the speaker can keep, with the same points in bullet form.
</task>

<constraints>
- Use only what is in the notes; never invent moments, quotes or timings.
- No comments on appearance, accent, disability, stammer or anything the speaker cannot change.
- Do not re-tell the speech or list every flaw; at most two recommendations.
- Stay within the time.
</constraints>

<output_format>
## Spoken evaluation
Full text to deliver.
## Written notes for the speaker
Bullets: what worked, what to try next, one encouragement.
## Length
"N words, about M minutes".
</output_format>
