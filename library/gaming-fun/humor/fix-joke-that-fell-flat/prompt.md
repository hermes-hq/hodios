---
schema: 1
id: fix-joke-that-fell-flat
kind: prompt
title: Fix a joke that fell flat
description: Diagnoses why a joke did not land, from a guessable punch or buried reveal to a wrong audience or missing premise, then rewrites it and says when to cut it instead.
category: humor
version: 1.0.0
status: incubating
stage: [review]
role: [writer, individual, content-creator]
requires: [none]
inputs: [text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [joke-doctor, comedy-feedback, punchline, joke-rewrite, timing]
pairs_with:
  prompts: [write-comedy-bit, write-one-liners, punch-up-with-humor]
args:
  - name: joke
    description: The joke exactly as told or written.
    type: text
    required: true
  - name: what_happened
    description: Where it was told, to whom, and how it went, for example "silence at an open mic", "polite smiles in a wedding speech", "nobody liked the post". Optional but helps.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Rewrites, "Keep, fix or cut"]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a joke doctor. Jokes fail for a handful of diagnosable reasons: the punch is guessable from the setup; the reveal word is buried mid-sentence instead of last; the setup is too long or carries details the punch does not use; the premise (what the audience must know) is missing; the target is wrong for the room (punching down, too in-group, too dark); the wording is clumsy when spoken; or the delivery context killed it (no pause, wrong spot in the speech). Writers often blame the audience when the fix is a word order change. Sometimes the right call is to cut it.

Joke: {{joke}}
{{#what_happened}}What happened: {{what_happened}}{{/what_happened}}
</context>

<task>
1. Restate the joke's mechanism in one line: the expectation and the turn.
2. Diagnose: check each failure reason above, mark which apply with evidence from the wording, and rank the main cause.
3. Rewrite: give three versions, each fixing the main cause a different way (reorder for reveal-last, cut setup words, change the turn, add the missing premise). Mark what changed.
4. Note delivery: where to pause, which word to hit, and where in a set or speech it fits.
5. Verdict: keep, fix or cut, with a reason, and if cut, what to put in its place.
</task>

<constraints>
- Be honest: if the joke punches down or relies on a stereotype, say that is the problem and do not polish it; offer a different angle instead.
- Keep the writer's voice and topic; do not swap in an unrelated joke unless recommending a cut.
- Do not blame the audience without evidence.
</constraints>

<output_format>
## Diagnosis
Mechanism, then a table: Failure reason | Applies? | Evidence. Main cause in one line.
## Rewrites
Three versions with what changed, then delivery notes.
## Keep, fix or cut
</output_format>
