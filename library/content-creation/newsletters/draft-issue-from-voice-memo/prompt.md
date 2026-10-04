---
schema: 1
id: draft-issue-from-voice-memo
kind: prompt
title: Draft an issue from a voice memo
description: Turns a rambling voice-memo transcript into a newsletter draft that still sounds like the writer, finding the one point, keeping their phrasing and marking gaps as [X] instead of filling them.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, founder]
requires: [none]
inputs: [transcript]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [voice-memo, dictation, thinking-out-loud, voice-preservation, first-draft]
pairs_with:
  prompts: [write-newsletter-issue, preflight-newsletter-issue]
  personas: [newsletter-editor]
args:
  - name: transcript
    description: The transcript of your voice memo, as the transcription app produced it - repetitions, false starts and all. Add a line about who the newsletter is for if it is not obvious.
    type: text
    required: true
  - name: target_length
    description: short is about 300-450 words, standard about 600-900, long about 1,200-1,600. The draft will be shorter if the memo does not have that much substance.
    type: enum
    enum: [short, standard, long]
    default: standard
output_contract:
  format: markdown
  sections: [The point, Draft, Gaps to fill, What I cut]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a newsletter writer's spoken thinking into a written draft. People who talk through ideas on a walk or drive often have their best phrasing and most honest stories in the memo, buried in repetition, tangents and "so anyway, what I mean is". The usual mistake is to "clean it up" into smooth, generic prose that no longer sounds like them, or to fill the gaps with plausible facts and examples they never said. Your job is closer to an editor's than a ghostwriter's: find the one point, keep their words, cut the circling, and show what is missing. Target length: {{target_length}}.
</context>

<task>
<transcript>
{{transcript}}
</transcript>

1. Find the one point: the idea they keep circling back to or say with the most energy. If there are two competing points, pick the stronger for this issue and park the other under What I cut as a future issue.
2. Mark the keepers: distinctive phrases, specific stories, numbers and opinions in their own words. These go into the draft nearly verbatim.
3. Build the structure from what was said: an opening that uses their best concrete moment or line, the point stated plainly, two or three supporting parts in the order that makes sense in writing (spoken order is often backwards), and a close they actually gestured at.
4. Write the draft in their register: keep their sentence length, humour, contractions and regional or professional words; remove fillers (um, like, you know, sort of), false starts, repeated sentences and transcription errors. Fix grammar only where it would confuse a reader.
5. Where the argument needs something they did not say (a fact, a source, a step, an example), insert [X: what is needed] instead of supplying it.
6. Suggest two subject lines drawn from their own phrases.
</task>

<constraints>
- Never add facts, statistics, quotes, names, stories or opinions that are not in the transcript. If a sentence would need one, it becomes [X].
- Do not change what the writer believes or soften a view they stated strongly; flag anything that might need checking (a claim about a named person, a figure said from memory) under Gaps to fill.
- Transcription errors: correct obvious ones (homophones, mangled names you can infer from context) and list any you are unsure of.
- If the transcript is too thin for the target length, write the shorter honest draft and say so.
- Do not include private details about other people mentioned in passing (a colleague's health, a friend's divorce) unless the writer clearly intends to; flag them.
</constraints>

<output_format>
## The point
One sentence.

## Draft
Subject line options, then the draft with short paragraphs.

## Gaps to fill
Bullets: each [X] with what is needed, plus claims to check and uncertain transcriptions.

## What I cut
Bullets: tangents and second ideas worth saving for later, and any private details removed.
</output_format>
