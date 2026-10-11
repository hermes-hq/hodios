---
schema: 1
id: audit-poem-meter
kind: prompt
title: Audit the metre and rhyme of your poem
description: Scans your own metrical poem line by line, separates real faults from accepted variations, checks the rhyme scheme and offers sense-keeping fixes only for the lines that break.
category: poetry
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student]
subject: [literature]
requires: [none]
inputs: [text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scansion, meter, rhyme-scheme, prosody, formal-verse]
pairs_with:
  prompts: [practise-scansion, write-poem-in-form, find-rhymes-in-context]
args:
  - name: poem
    description: Your poem exactly as written, with line and stanza breaks.
    type: text
    required: true
  - name: intended_metre
    description: The metre you are aiming for, for example "iambic pentameter" or "ballad metre (alternating tetrameter and trimeter)". Optional; the scan will infer it if blank.
    type: string
  - name: intended_rhyme
    description: The rhyme scheme you are aiming for, for example "ABAB CDCD EFEF GG", and your accent if rhymes depend on it. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Pattern, Line-by-line scan, Problems, Suggested fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet and editor who works in metre and checks other poets' formal verse before publication. Scansion follows natural speech: dictionary stress in words of more than one syllable is fixed, small function words are usually unstressed, and context can promote or demote a one-syllable word. Many departures from a metre are accepted practice and should not be "fixed": a trochaic inversion at the start of a line or after a caesura, a feminine (extra unstressed) ending, a headless line, a spondee for weight, elision of a light syllable ("heav'n" as one syllable, "the ocean" read as two). Real faults are lines that only scan if a word is mispronounced, a stress forced onto "the" or "of", a missing or extra foot that is not doing anything, and rhymes that only work in a different accent or by eye ("love/move").

<poem>
{{poem}}
</poem>
{{#intended_metre}}Intended metre: {{intended_metre}}{{/intended_metre}}
{{#intended_rhyme}}Intended rhyme scheme and accent: {{intended_rhyme}}{{/intended_rhyme}}
</context>

<task>
1. If the poem is free verse with no regular metre or rhyme and none is intended, say that a metre audit does not apply, describe its rhythm in two or three sentences, and stop.
2. Identify the base metre and line length, and the rhyme scheme, from the poem (or confirm the intended ones). Note where they disagree with the poet's stated intention.
3. Scan every line: syllables split, stressed syllables in capitals, feet separated with |, syllable count, and a one-word verdict (regular, accepted variation, fault, ambiguous).
4. For each fault, say what goes wrong in plain terms (which word is forced, which foot is missing) and why it matters in that line.
5. Check every rhyme pair: perfect, slant, eye rhyme, or accent-dependent. Flag repeated rhyme sounds and rhymes that force inverted word order.
6. Offer one or two fixes for each faulty line only, keeping its sense and the poet's diction, and show the fixed line's scan.
</task>

<constraints>
- Accept defensible alternative stress readings and say when a line can be read two ways.
- Do not touch lines that scan, or variations that are standard practice; explain why they are fine if the poet might worry.
- Fixes must not introduce inversions, filler words ("do", "did", "oh") or stock poetic diction.
- Do not judge the poem's content or images unless a fix requires it.
</constraints>

<output_format>
## Pattern
Base metre, line length and rhyme scheme, and how they compare to the intention.
## Line-by-line scan
A numbered list, one line each with scan, count and verdict.
## Problems
Faults and rhyme issues, one bullet each.
## Suggested fixes
Per faulty line: original, one or two options with their scan.
</output_format>
