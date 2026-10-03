---
schema: 1
id: critique-speech-recording
kind: prompt
title: Critique a speech recording
description: Reviews a transcript of a rehearsed or delivered talk for pacing, filler words, structure, clarity and audience connection, with timestamped notes and three targeted drills.
category: public-speaking
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, founder, manager]
requires: [none]
inputs: [transcript]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [filler-words, pacing, speech-feedback, rehearsal, delivery]
pairs_with:
  prompts: [write-speech, practice-impromptu-speaking, write-speaker-notes]
  personas: [speaking-coach]
args:
  - name: transcript
    description: The transcript of your talk, ideally with timestamps and with filler words kept (turn off any "clean up" option in the transcription tool).
    type: text
    required: true
  - name: talk_goal
    description: "Optional: what the talk was meant to achieve and for whom, for example \"get the board to approve the hire\" or \"best-man toast, 80 guests\"."
    type: string
  - name: duration_minutes
    description: "Optional: how long the talk took, in minutes, if the transcript has no timestamps. Used to work out speaking pace."
    type: number
output_contract:
  format: markdown
  sections: [Summary, By the numbers, Notes, Drills, What a transcript can't show]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A transcript is an honest mirror of a talk: it shows the filler words, false starts, rambling middles, missing signposts and weak endings that speakers do not notice while speaking. Useful feedback is specific and located (this sentence, at this point), separates habits worth fixing from normal speech, and turns into a few drills the speaker can practise, rather than a long list of everything imperfect. Conversational speech runs at roughly 120 to 160 words a minute; a few fillers are normal and invisible to audiences, while clusters of them, or a habit like ending every sentence with "right?", are noticed.
</context>

<task>
Review this talk.

<transcript>
{{transcript}}
</transcript>
{{#talk_goal}}Goal: {{talk_goal}}{{/talk_goal}}
{{#duration_minutes}}Duration: {{duration_minutes}} minutes.{{/duration_minutes}}

1. If the text is not a spoken transcript (for example it is a written script with no sign of delivery), say that this review works best on a transcript of the talk as delivered, review the structure and clarity only, and skip the delivery numbers.
2. Measure: total words; pace in words per minute if timestamps or a duration are available (otherwise say it cannot be measured; with timestamps only, note that the last timestamp marks the start of the final line, so the true duration is slightly longer); counts of each filler ("um", "uh", "like", "you know", "so", "basically", "right?", "kind of") and fillers per minute; repeated phrases or verbal tics; the longest sentence.
3. Assess, quoting the transcript:
   - Opening: does it earn attention and state why this matters within the first 30 seconds?
   - Structure: is the main point clear, are there signposts, does the middle wander?
   - Clarity: jargon, long or tangled sentences, vague words where a specific would land.
   - Audience connection: "you" language, examples, questions, stories.
   - Ending: is there a clear close or does it trail off ("so yeah, that's it")?
4. Write located notes: each with a timestamp (or the opening words of the sentence if there are no timestamps), the issue, and a rewrite or fix.
5. Pick three drills targeted at the biggest issues, each with how to practise it in under ten minutes.
</task>

<constraints>
- Lead with what worked, specifically, before what to fix. Name at most eight notes, most important first.
- Count only what is in the transcript, and label counts on long transcripts as approximate. Say that automatic transcripts may drop fillers or mishear words, so counts are a lower bound. Count "so" and "like" only when they are fillers, not when they carry meaning ("so that", "I like").
- Do not judge accent, dialect or grammar that is normal in the speaker's variety of the language, unless it blocks understanding.
- If the talk goal is given, judge everything against it.
- Be direct and kind; no vague praise ("great energy!") and no harshness.
</constraints>

<output_format>
## Summary
Three lines: the strongest thing, the biggest issue, and the one change that would help most.
## By the numbers
A table: Measure | Value | Typical range or note.
## Notes
A table: Where | Issue | Try instead.
## Drills
Three numbered drills with steps and time needed.
## What a transcript can't show
One or two lines: tone, pauses, eye contact and body language, and a suggestion to record video for the next round.
</output_format>
