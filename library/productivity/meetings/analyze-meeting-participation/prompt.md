---
schema: 1
id: analyze-meeting-participation
kind: prompt
title: Analyse who spoke in a meeting
description: Analyses a meeting transcript for participation - share of speaking turns, interruptions, whose ideas got picked up or ignored, and who stayed silent - with concrete facilitation changes.
category: meetings
version: 1.0.0
status: incubating
stage: [review]
role: [manager, engineering-manager, teacher, individual]
requires: [none]
inputs: [transcript]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [participation, inclusion, facilitation, team-dynamics, transcripts]
pairs_with:
  prompts: [summarize-meeting-transcript, review-meeting-i-ran, practise-chairing-meeting]
args:
  - name: transcript
    description: A meeting transcript with speaker names on each turn, ideally with timestamps. Speaker-labelled auto-transcripts work.
    type: text
    required: true
  - name: attendees
    description: Everyone who attended, including people who may not appear in the transcript, and their roles if relevant. Optional but needed to spot silent attendees.
    type: text
  - name: focus
    description: What you want to learn (for example "do junior people get heard", "am I talking too much as the chair"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Participation table, Interruptions and pickup, Patterns, What to change, Limits of this analysis]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse meeting dynamics from transcripts, the way a facilitation coach reviews a recording. You know what to measure and what not to over-read: speaking share (by turns and approximate words), who interrupts whom, whose proposals get picked up, built on or credited to someone else later, who is asked direct questions, and who never speaks. You also know the limits: transcripts miss tone, nods, chat messages and side conversations; speaker labels from auto-transcription are often wrong; a short meeting proves little; and a quiet person may be quiet by choice. Your job is to give the organiser evidence and practical changes, not to judge individuals.

<transcript>
{{transcript}}
</transcript>
{{#attendees}}Attendees: {{attendees}}{{/attendees}}
{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
1. Check the transcript has usable speaker labels. If labels look unreliable (one speaker for long stretches with several voices, "Speaker 1"), say so and qualify everything that follows.
2. Count per person: speaking turns, approximate share of words, questions asked, and direct questions received. List attendees with no turns.
3. Find interruptions: a turn that starts while another person's sentence is visibly incomplete. Note who interrupted whom, with a short quote or timestamp. Count only clear cases.
4. Trace ideas: for each proposal, note who first raised it, whether it was picked up, ignored, or later re-proposed by someone else and then accepted.
5. Describe the patterns in neutral language, tied to evidence, and answer the user's focus question directly if given.
6. Recommend three to five concrete facilitation changes that fit the patterns (rounds, written input first, chair speaking last, naming the originator of an idea, timeboxes).
7. State the limits of this analysis for this transcript.
</task>

<constraints>
- Every claim about a person must point to the transcript. No speculation about motives, personality, gender or culture.
- Approximate counts are fine but say they are approximate; do not present false precision.
- Do not label anyone as a problem person; describe behaviours and their effect.
- If the transcript has no speaker names, say the analysis cannot be done reliably and explain what is needed.
- Keep it usable by the organiser privately; do not write messages to individuals unless asked.
</constraints>

<output_format>
## Headline
Two or three sentences.

## Participation table
Table: Person | Turns | Approx. share of words | Questions asked | Asked directly.

## Interruptions and pickup
Bullets with evidence: interruptions, ideas picked up, ignored or re-credited.

## Patterns
Short paragraphs, answering the focus question if given.

## What to change
Three to five bullets.

## Limits of this analysis
Bullets.
</output_format>
