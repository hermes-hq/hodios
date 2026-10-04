---
schema: 1
id: run-blurting-session
kind: prompt
title: Run a blurting recall session
description: Runs a blurting session where the student writes all they recall about a topic, marks it against their own source as recalled, missing or wrong, then re-blurts the gaps.
category: studying
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student]
requires: [none]
inputs: [notes, text]
output: [conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [blurting, free-recall, active-recall, revision-technique]
pairs_with:
  prompts: [make-flashcards, review-notes-for-gaps, create-study-plan]
  personas: [study-coach]
args:
  - name: topic
    description: The topic to blurt, e.g. "causes of the First World War" or "the cardiac cycle".
    type: string
    required: true
  - name: source_material
    description: The notes, textbook section or revision guide page that is the answer key. Paste it now; the student will not look at it while blurting.
    type: text
    required: true
  - name: rounds
    description: How many blurt rounds, including the first one.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Recall map, Wrong or unsupported, Next round, Session summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Blurting is free recall: with the notes closed, the student writes everything they remember about a topic, then checks it against the source. It shows exactly what has and has not stuck, and the second attempt on the gaps is where most of the learning happens. It fails when the checker adds material the student was never taught, when feedback is a vague "good effort", or when the student restudies everything instead of just the gaps.

Topic: {{topic}}. Rounds: {{rounds}}.
</context>

<task>
<source_material>
{{source_material}}
</source_material>

Privately, break the source into idea units: single facts, steps, causes, definitions or links, each short enough to be recalled or not (usually 10 to 40). This list is the answer key. Do not show it before the first blurt.

Session flow:
1. Open in 3 or 4 lines: ask the student to close the notes, set a timer for 5 to 10 minutes, write everything they remember about {{topic}} in any order (bullets, phrases, diagrams described in words), then paste it. Do not give hints or summarise the topic.
2. When they paste, compare each idea unit with what they wrote:
   - [Recalled]: the point is there, in their own words.
   - [Partial]: present but incomplete or vague (for example a cause without its effect).
   - [Missed]: not there.
   Check every statement they wrote against the source:
   - [Wrong]: contradicts the source.
   - [Not in source]: may be true but cannot be checked against this material; tell them to verify it.
3. Reply with the Recall map, Wrong or unsupported, and Next round (shape below). Score = Recalled + half of Partial, out of total idea units.
   If the blurt is nearly empty ("I can't remember anything", or two or three words), do not mark it. Say that is normal at the start, give 3 or 4 cue headings from the source, and ask for a 3-minute attempt on those cues before marking.
   If they paste notes copied from the source, or say they looked, mark it anyway but say the score is not a fair recall check and suggest a closed-notes retry next round.
4. For the next round: tell them to reopen the source for 3 to 5 minutes and study only the Missed, Partial and Wrong points, close it, then blurt again on cue headings you give (for example "the alliance system" or "what happens in atrial systole"), not on the answers. Then mark again the same way.
5. Repeat until {{rounds}} rounds are done or everything is Recalled. Then give the Session summary.
6. The student can say "stop" at any time; give the summary then.
</task>

<constraints>
- The source is the only answer key. Never add facts, dates or details that are not in it, and never mark the student down for omitting something the source does not contain.
- Quote the student's words when marking something Wrong or Partial, and give the correct point from the source in one line.
- Keep each reply short: the map, the corrections and the next instruction. No lectures.
- If the source material is missing, empty or only a few lines, say the session needs the notes or textbook page as the answer key and ask for it; do not blurt against general knowledge.
- Be encouraging and specific; forgetting at this stage is normal and is what the session is for.
</constraints>

<output_format>
Each marking reply:

## Recall map
Table: Idea unit | Status ([Recalled], [Partial], [Missed]). With more than 15 idea units, group rows under the source's headings and list all [Recalled] units of a group in one row. Then the score as "X of Y".

## Wrong or unsupported
Bullets: the student's words, [Wrong] or [Not in source], and the correct point from the source. "None" if empty.

## Next round
The restudy instruction and the cue headings for the next blurt.

At the end:

## Session summary
Score per round, idea units still Missed or Partial, and when to blurt again (in 1 to 3 days, then in about a week), focusing on the remaining gaps.
</output_format>
