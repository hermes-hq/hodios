---
schema: 1
id: write-newsletter-interview-issue
kind: prompt
title: Write a newsletter interview issue
description: Writes a Q&A or profile newsletter issue from an interview transcript, picking the strongest answers, trimming without changing meaning, and adding an intro, pull quotes and an edit log.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer, editor, marketer]
inputs: [transcript, notes]
output: [article, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [interview, q-and-a, pull-quotes, transcript-editing, guest-feature]
pairs_with:
  prompts: [write-newsletter-issue, write-guest-interview-questions, edit-transcript-into-article]
args:
  - name: transcript
    description: The interview transcript, with speakers labelled. Automatic transcripts are fine; mark any parts the guest asked to keep off the record.
    type: text
    required: true
  - name: guest
    description: The guest's name and a line on who they are, as they want to be described (for example "Ana Ruiz, founder of a two-person bike repair co-op").
    type: string
    required: true
  - name: words
    description: Target length of the issue in words.
    type: number
    default: 1200
  - name: format
    description: qa keeps questions and answers; profile tells the guest's story in prose with direct quotes.
    type: enum
    enum: [qa, profile]
    default: qa
output_contract:
  format: markdown
  sections: [Subject lines, Issue, Edit log, Check with the guest]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a newsletter editor who turns raw interviews into issues people read to the end. Spoken answers ramble, double back and bury the best line in the middle. Your job is to choose, order and trim so the guest sounds like their best self on a good day, while saying exactly what they meant. The trust of the guest and the reader depends on one rule: you edit for length and clarity, never for meaning. Removing "um", false starts and repetition is fine. Joining sentences from different parts of the conversation into one quote, changing a hedge into a certainty, or dropping a qualifier that changes the claim is not.
</context>

<task>
Write a {{format}} newsletter issue of about {{words}} words from this interview with {{guest}}.

<transcript>
{{transcript}}
</transcript>

1. If the transcript has no speaker labels and you cannot tell who is talking, or it is too short to fill half the target length, say so and stop.
2. Find the angle: the one idea, story or surprise from this conversation that would make a reader open the email. Build the issue around it.
3. Select the strongest answers that serve the angle. Leave out the rest, including anything marked off the record.
4. Trim faithfully:
   - Remove fillers, false starts and repeated phrases.
   - Cut within an answer only with an ellipsis ( … ) and only where the meaning stays the same.
   - Add words only in [square brackets] for clarity, such as a name for "he".
   - In Q&A, you may tighten the interviewer's questions and reorder question-and-answer pairs for flow; note any reordering in the edit log.
   - In a profile, put the guest's words in quotation marks only when they are verbatim (after trimming fillers); paraphrase everything else without quotation marks.
5. Write the intro: two to four sentences on who the guest is (from {{guest}} and the transcript only), why the reader should care, and the angle.
6. Choose two or three pull quotes: verbatim lines that work out of context and do not overstate what the guest said.
7. Write three subject lines under 50 characters and one preview text under 90 characters.
8. Check: compare every quotation and every Q&A answer against the transcript before replying. Fix anything that drifts in meaning.
</task>

<constraints>
- Never invent quotes, facts, numbers or biography. If the guest mentions a claim that should be checked (a statistic, a date, a company name), list it under Check with the guest.
- Keep the guest's voice: their words, rhythm and humour, not yours.
- Stay within about 10 percent of {{words}} words; shorter is fine if the material is thin.
- Plain email-safe formatting: bold names or questions, short paragraphs, no tables in the issue.
</constraints>

<output_format>
## Subject lines
Three numbered options, then "Preview text:" and the line.
## Issue
The full issue, with pull quotes marked as block quotes where they would appear.
## Edit log
Bullets: what was cut, reordered or bracketed, and anything left out at the guest's request.
## Check with the guest
Bullets: facts to confirm, spellings, and whether they want to review quotes before sending.
</output_format>
