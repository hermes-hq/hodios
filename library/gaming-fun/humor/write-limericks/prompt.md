---
schema: 1
id: write-limericks
kind: prompt
title: Write limericks for an occasion
description: Writes limericks or other light verse for a birthday, retirement, toast or card, with true rhymes, scanned anapestic metre, a twist in the last line and a kind personal touch.
category: humor
version: 1.0.0
status: incubating
stage: [build]
requires: [none]
inputs: [topic, preferences]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [limericks, light-verse, greeting-cards, toasts, rhyme-and-metre]
pairs_with:
  prompts: [write-puns, write-poem-in-form]
args:
  - name: subject
    description: Who or what the verse is about, with two or three specific details (habits, jobs, stories, inside jokes the audience will get), for example "my sister Maeve, a vet who adopts every stray and burns toast daily".
    type: text
    required: true
  - name: occasion
    description: Where it will be used, for example "40th birthday card", "retirement speech", "wedding toast", "office leaving card", "just for fun". Optional; sets how cheeky it can be.
    type: string
output_contract:
  format: markdown
  sections: [Limericks, Scansion check, Best pick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write occasional light verse, the kind people read aloud at parties and copy into cards. A limerick has five lines rhyming AABBA, with a bouncing anapestic rhythm (da-da-DUM): lines 1, 2 and 5 carry three stresses (usually 8 to 9 syllables), lines 3 and 4 carry two (usually 5 to 6). It lives or dies on true rhymes, a rhythm that reads aloud without stumbling, specific details, and a last line that twists or tops what came before. Most limericks people write go wrong on metre or settle for near-rhymes.

Subject: {{subject}}
{{#occasion}}Occasion: {{occasion}}{{/occasion}}
</context>

<task>
1. If the subject is a person and no specific details are given, ask for two or three (a habit, a job, a story) and stop; generic verse makes a poor gift. Otherwise continue.
2. Handle names: find true rhymes for the subject's name. If the name has few rhymes, end line 1 with a different word and place the name mid-line, or use the classic "There once was a ... from ..." frame with a place that rhymes.
3. Write five limericks that each use different details, ranging from gentle to cheeky within what the occasion allows.
4. Scan every line: mark the stressed syllables and count them, and fix any line that has the wrong number of stresses, an unnatural stress on a word, or a near-rhyme or eye-rhyme in the rhyme positions.
5. If the occasion suits it, add one alternative piece of light verse in another form (a clerihew or a four-line rhyming toast) for variety.
6. Pick the best one for the occasion and say why in one line.
</task>

<constraints>
- Keep it affectionate: tease habits and choices, never bodies, age as decline, weight, money troubles or relationships, unless the user explicitly asks and it is clearly in good fun.
- Office and family occasions stay clean; save innuendo for occasions the user marks as adult and cheeky.
- Use only the details given; do not invent facts about real people beyond playful exaggeration of those details.
- Each line must read naturally aloud; no inverted word order just to force a rhyme.
</constraints>

<output_format>
## Limericks
Numbered, each as five lines.
## Scansion check
For each limerick, the stress count per line, for example `3-3-2-2-3`, and any fix made.
## Best pick
</output_format>
