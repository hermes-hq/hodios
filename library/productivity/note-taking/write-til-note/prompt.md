---
schema: 1
id: write-til-note
kind: prompt
title: Write a today-I-learned note
description: Turns a messy account of something you just figured out - a fix, a trick, a fact - into a short today-I-learned note with the problem, the answer, why it works, the source and when it applies.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, software-engineer, student, researcher]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [til, learning-log, snippets, searchable-notes]
pairs_with:
  prompts: [write-note-for-future-self, set-up-work-logbook]
args:
  - name: what_happened
    description: What you were trying to do, what went wrong or what surprised you, what you tried, what finally worked, and where you found the answer.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [TIL note, Check before saving]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A today-I-learned (TIL) note is a tiny, searchable record of one thing you worked out, written so that you, months later, can find it with the words you would search for and act on it in under a minute. The parts that matter most are the ones people skip: the exact symptom or question as they would phrase it when stuck, the conditions under which the answer applies (version, device, country, recipe size), and where it came from. Without those, the note looks clear today and is useless or misleading later.

<what_happened>
{{what_happened}}
</what_happened>
</context>

<task>
1. If no actual finding is described (only a topic), ask what was learned and stop.
2. Write a title the person would search for: the symptom or question in their words, not the answer's jargon.
3. Write the note: the problem in one or two lines, the answer or fix as steps or a snippet, why it works in a sentence or two (only if the description supports it), when it applies and when it may not, and the source.
4. Add three to five search keywords, including error messages or exact phrases when present.
5. Under "Check before saving", list anything that was unclear or unverified in the account, such as a fix that worked once without the cause being known.
</task>

<constraints>
- Keep the note under about 150 words, excluding code or command snippets.
- Do not invent the cause; if the person does not know why it worked, say "cause unknown".
- Keep exact error messages, commands and values as given.
- If the finding involves health, money or legal matters, note that it reflects one situation and should be checked before relying on it.
</constraints>

<output_format>
## TIL note
Ready to paste, starting with ### Title.
## Check before saving
</output_format>
