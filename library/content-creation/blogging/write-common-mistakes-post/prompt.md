---
schema: 1
id: write-common-mistakes-post
kind: prompt
title: Write a common mistakes post
description: Writes a "common mistakes" post built on real mistakes the audience makes, each with why it happens, how to spot it, what it costs and the fix, without shaming readers.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, consultant, teacher]
requires: [none]
inputs: [notes, topic]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [mistakes, diagnosis, expertise, symptoms-and-fixes]
pairs_with:
  prompts: [write-listicle, write-myth-busting-post, write-how-to-article]
args:
  - name: topic
    description: The skill or activity, and who the readers are.
    type: text
    required: true
  - name: mistakes
    description: The mistakes you have seen - in your own work, from clients, students or customers, or in reader questions - with what happened and how it was fixed. Notes are fine.
    type: text
    required: true
  - name: word_count
    description: Target length in words.
    type: number
    default: 1500
output_contract:
  format: markdown
  sections: [Mistake selection, Post, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write "common mistakes" posts that experts are proud to publish. The weak version lists strawman mistakes nobody makes, or obvious ones every reader already avoids, with a one-line "don't do this". The useful version comes from real cases and explains each mistake from the inside: the reasonable belief or shortcut that leads people into it, the symptoms that tell readers they are making it, what it costs them, and the specific fix with how to check it worked. Readers come to these posts because something is going wrong, so the symptoms are often the most valuable part. Tone matters: the reader is probably making some of these mistakes, so explain, do not mock.
</context>

<task>
<topic>
{{topic}}
</topic>

<mistakes>
{{mistakes}}
</mistakes>

Length: about {{word_count}} words.

1. Mistake selection: from the notes, keep mistakes that are real (seen in practice), common for this reader, and costly. Merge duplicates. Cut obvious ones. Order by how often they happen or how much they cost, and say which ordering you used.
2. Title and intro: a title with the honest count and the reader (no inflated number), and an intro that names the symptom or frustration that brings readers here.
3. For each mistake write: a heading that names the mistake plainly; why people make it (the reasonable belief or shortcut); how to tell you are making it (observable symptoms); what it costs; the fix in concrete steps; how to check the fix worked. Use the real example from the notes where there is one.
4. Add a quick diagnostic near the top or the end: a table of symptom to likely mistake, so readers can jump to theirs.
5. Close with the one habit that prevents most of these mistakes, if the notes support one, and a next step.
</task>

<constraints>
- Use only mistakes, examples and fixes from the notes. Do not invent cases, statistics or quotes; where a mistake needs an example the notes lack, insert `[EXAMPLE: ...]`.
- Do not include a mistake unless the notes support it as real; do not pad to a round number.
- No shaming language ("stupid", "rookie"); write as someone who has made or fixed these mistakes.
- For health, money, legal or safety topics, fixes must stay general and point to a qualified professional where the stakes are high.
</constraints>

<output_format>
## Mistake selection
Kept mistakes in order with the ordering logic, and cut ones with reasons.

## Post
Title, intro, the diagnostic table, a section per mistake with the elements from step 3, and the close. Word count at the end.

## Gaps
Every `[EXAMPLE]` placeholder and any symptom or fix the writer should confirm.
</output_format>
