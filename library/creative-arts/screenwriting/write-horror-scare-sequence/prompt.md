---
schema: 1
id: write-horror-scare-sequence
kind: prompt
title: Write a horror scare sequence
description: Builds a horror sequence from dread to scare to aftermath, choosing a jump scare or slow reveal and controlling what the audience knows. Use when scares feel cheap or flat.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text]
output: [script, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [horror, dread, jump-scare, suspense]
pairs_with:
  prompts: [build-suspense-in-scene, format-screenplay-scene, write-beat-sheet]
args:
  - name: situation
    description: Where the sequence sits in the story, who is in danger, what the threat is and what the audience already knows about it.
    type: text
    required: true
  - name: subgenre
    description: e.g. supernatural, slasher, creature, folk horror, psychological, found footage.
    type: string
    default: supernatural
  - name: intensity
    description: How graphic the sequence can be, e.g. "no gore, PG-13 feel", "graphic is fine".
    type: string
    default: no gore
output_contract:
  format: markdown
  sections: [Fear design, Beat map, Script, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Horror is built on anticipation more than on the scare itself. Dread comes from the audience knowing or suspecting something the character does not, from silence and ordinary sounds made wrong, and from delaying the release. A jump scare is a release of built tension; used without build-up, or delivered by a cat or a friend, it trains the audience to stop caring. The strongest sequences establish the rules of the threat, play a false release (the relief before the real scare), deliver the scare in a way only this threat could, and then leave an aftermath that changes the characters. In the script, pacing is controlled with short lines, sound written into action, and white space; the reader should feel the held breath.
</context>

<task>
Write a {{subgenre}} horror sequence. Intensity: {{intensity}}.

<situation>
{{situation}}
</situation>

1. **Fear design:** what the audience knows versus the character (dramatic irony or shared ignorance), the rule of the threat that this sequence shows or breaks, and the type of payoff: a jump scare, a slow reveal, an implied horror kept off screen, or a subversion. Say why it fits this point in the story.
2. **Beat map:** from normality through unease, escalation, false release, scare and aftermath, with the sound, light or spatial element each beat uses.
3. **Script:** write the sequence in screenplay format. Use short action lines, sound described in the action (CAPS for key sounds is acceptable), and line breaks for pace. Keep dialogue minimal.
4. **Notes:** one paragraph on how this sequence escalates from the previous scare and what the next one should do differently, plus any element that could tip into unintentional comedy.
</task>

<constraints>
- No fake scares (a friend or a pet) unless they are set up as a false release before a real one.
- Stay within the stated intensity; for no gore, imply rather than show.
- Keep the threat's rules consistent with what the writer has established.
- Do not invent backstory for the threat beyond what the sequence needs; mark additions "(proposed)".
</constraints>

<output_format>
## Fear design
## Beat map
Table: Beat | What happens | Sound, light or space | Audience feeling.
## Script
## Notes
</output_format>
