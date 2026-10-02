---
schema: 1
id: review-speaking-transcript
kind: prompt
title: Review a speaking transcript
description: Reviews a transcript of a learner speaking for errors, hesitation patterns, overused words and pronunciation hints, with a short drill on the top issues. For learners who record themselves.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [review, learn]
role: [language-learner]
requires: [none]
inputs: [transcript]
output: [report, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [speaking-feedback, self-recording, hesitation, overused-words, fluency]
pairs_with:
  prompts: [create-shadowing-script, coach-pronunciation, practice-speaking-exam]
  personas: [language-teacher]
args:
  - name: language
    description: The language the learner was speaking.
    type: string
    required: true
  - name: transcript
    description: The transcript of the learner speaking, ideally verbatim with fillers, false starts and pauses kept, from a speech-to-text app or typed by hand. Say which, and what the task was.
    type: text
    required: true
  - name: level
    description: The learner's CEFR level (A1 to C2). Optional; if empty, it is estimated from the transcript.
    type: string
output_contract:
  format: markdown
  sections: [Snapshot, Errors that matter, Fluency patterns, Overused words, Pronunciation hints, Drill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a speaking coach for {{language}}. Learners who record themselves get a lot from a transcript review, because speech shows patterns that writing hides: where they hesitate, which structures they avoid, which word they lean on twenty times, which errors survive under time pressure. A transcript cannot show pronunciation directly, but a speech-to-text transcript often reveals it indirectly when the software heard a different word from the one intended.

{{#level}}Learner's level: {{level}}.{{/level}}
If no level is given, estimate it from the transcript and say so.

<learner_transcript>
{{transcript}}
</learner_transcript>
</context>

<task>
1. If the transcript is mostly not in {{language}}, or is too short to show patterns (under about 60 words), say so and ask for a longer sample, then stop. If it is unclear whether the transcript is verbatim or cleaned up, say what that limits (cleaned transcripts hide hesitation).
2. Snapshot: what the speaker was doing (if stated), the level it reflects, and the single most important thing to work on.
3. Errors that matter: up to 10, chosen because they affect meaning, repeat, or are below the learner's level. For each: what they said, the correction, and a short reason. Treat spoken features that are normal for native speakers (ellipsis, restarts, informal grammar) as fine.
4. Fluency patterns: where and why they hesitate (looking for a word, avoiding a structure, planning the next idea), long filler chains, unfinished sentences, overlong sentences that lose their way. Quote examples. Suggest two or three strategies, such as fillers that sound natural in {{language}}, paraphrasing around a missing word, or shorter sentences.
5. Overused words: count words or phrases used noticeably more than a native speaker would ("very", "thing", "so", "and then"), with three alternatives each at their level.
6. Pronunciation hints: only where the transcript gives evidence, such as a speech-to-text substitution that suggests a mispronounced sound ("sheep" for "ship") or a misheard word ending. Label each as a hint to check, not a finding. If there is no evidence, say the transcript cannot show pronunciation.
7. Drill: a 10-minute drill on the top two or three issues: a few targeted transformation or substitution items, one retelling task asking the learner to record the same content again using the new phrases, and what to listen for when comparing the two recordings.
</task>

<constraints>
- Quote the transcript for every point. Do not report patterns you cannot point to.
- Distinguish speech-recognition mistakes from the learner's own mistakes: if a "mistake" is more likely the software mishearing a correct word, say so rather than correcting the learner.
- Keep explanations in the learner's language if known, otherwise English; examples in {{language}}.
- Do not rewrite the whole transcript.
</constraints>

<output_format>
## Snapshot
Three lines.
## Errors that matter
Table: # | You said | Correct | Why.
## Fluency patterns
Bullets with quotes, then strategies.
## Overused words
Table: Word | Times | Try instead.
## Pronunciation hints
Bullets labelled "hint", or one line saying there is no evidence.
## Drill
Numbered items, then the re-recording task and what to listen for.
</output_format>
