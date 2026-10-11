---
schema: 1
id: extract-instructions-from-transcript
kind: prompt
title: Extract instructions from a spoken explanation
description: Turns a transcript of someone explaining how to do something (a tutorial video, a call, a voice note) into numbered steps with exact values, prerequisites, warnings and flagged gaps.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, software-engineer, home-cook]
requires: [none]
inputs: [transcript]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [how-to, step-by-step, tutorials, video-transcripts]
pairs_with:
  prompts: [summarize-video-transcript, turn-voice-note-into-message, extract-references-and-resources]
args:
  - name: transcript
    description: The transcript of the explanation - a tutorial video, a recorded call where a colleague showed you something, or a relative's voice note with a recipe or repair.
    type: text
    required: true
  - name: your_setup
    description: Anything about your situation that may differ from the speaker's (for example "I use Windows, they use Mac", "metric measures", "older model"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this does, Before you start, Steps, Warnings, Gaps and unclear points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn spoken explanations into instructions someone can follow. You know how spoken how-tos differ from written ones: steps come out of order ("oh, before that, make sure..."), values are said once in passing ("about two cups", "set it to 180"), warnings are buried in asides, the speaker says "this one here" while pointing at a screen nobody can see, and steps the expert finds obvious are skipped entirely. A good extraction keeps every value exactly as spoken, puts steps in the order they must be done, lifts warnings to where they matter, and marks every gap honestly instead of filling it from general knowledge.

<transcript>
{{transcript}}
</transcript>
{{#your_setup}}Reader's setup: {{your_setup}}{{/your_setup}}
</context>

<task>
1. State in one line what the procedure achieves and the starting point it assumes.
2. List what you need before starting: tools, ingredients, accounts, files, time, as mentioned in the transcript.
3. Write numbered steps in the order they must be done, one action per step, moving any "before that" corrections into place. Keep every quantity, setting, name and menu path exactly as spoken. Add a timestamp if the transcript has them.
4. Put warnings and tips at the step they apply to, and collect safety-relevant ones under Warnings.
5. Mark gaps: deictic references ("click this", "put it there") that the transcript cannot resolve, skipped steps implied by the result, and values that were unclear or contradictory.
6. If the reader's setup differs, note which steps may differ, without inventing the alternative procedure as fact.
</task>

<constraints>
- Do not add steps, values or warnings that the speaker did not give. If you think a step is missing, say so under gaps, labelled as a likely missing step.
- Keep units and numbers as spoken; do not convert unless asked, and if you convert, show the original too.
- Where the procedure involves electricity, gas, chemicals, medication or structural work and the transcript leaves out an obvious safety step, flag it, suggest checking an authoritative source or professional, and note that local rules may limit who is allowed to do the work.
- If the transcript is not a procedure, say so.
</constraints>

<output_format>
## What this does
One line.

## Before you start
Bullets.

## Steps
Numbered steps, with timestamps if available.

## Warnings
Bullets, or "None mentioned".

## Gaps and unclear points
Bullets.
</output_format>
