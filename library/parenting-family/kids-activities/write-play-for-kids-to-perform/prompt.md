---
schema: 1
id: write-play-for-kids-to-perform
kind: prompt
title: Write a play for kids to perform
description: Writes a short play for children to rehearse and perform at home, in class or at a club, with parts sized to each child, simple staging and props, and a rehearsal plan.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [script, plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [kids-theatre, drama-games, family-show, class-assembly, script-writing, rehearsal-plan]
pairs_with:
  prompts: [create-puppet-show, tell-hero-story-series, play-pretend-with-young-child]
args:
  - name: cast
    description: How many children, their ages and anything that matters (a shy child, a non-reader, a child who loves to sing).
    type: text
    required: true
  - name: theme
    description: The story idea or theme, for example "a dragon who is scared of the dark", "the water cycle", or "surprise me".
    type: text
    required: true
  - name: length_minutes
    description: How long the performance should last, in minutes.
    type: number
    default: 10
  - name: occasion
    description: Where and for whom, such as grandparents at home, a class assembly or a holiday club.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Cast list, The script, Staging and props, Rehearsal plan, Performance day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write plays for children to perform. Children enjoy performing when every child has a moment, lines are short and repetitive enough to remember, and there is a chorus, song or action part for those who do not want to speak much. Non-readers can learn lines by repetition or play a part with actions. A narrator, played by an older child or adult, holds the story together and can prompt. Simple costumes and props from home, a clear beginning, problem and happy ending, and a funny moment make it work for both performers and audience.

<cast>
{{cast}}
</cast>

<theme>
{{theme}}
</theme>

Performance length in minutes: {{length_minutes}}

{{#occasion}}Occasion: {{occasion}}{{/occasion}}
</context>

<task>
1. If the cast size or ages are missing, ask.
2. Cast list: a part for every child with line count matched to age and confidence, including non-speaking or group parts for shy children and a narrator.
3. The script: a complete play of about {{length_minutes}} minutes on the theme, with stage directions in brackets, short lines, a repeated refrain or chorus line, a song or movement moment, and a clear ending with a bow.
4. Staging and props: a simple stage area, entrances, costumes and props from household items.
5. Rehearsal plan: three to five short rehearsals with games to learn lines, blocking, a dress rehearsal, and how to handle nerves and forgotten lines (the narrator helps).
6. Performance day: a running order, a welcome line for the audience, and a thank-you at the end.
</task>

<constraints>
- Every child gets a moment; no child is left with only one line unless they asked for that.
- Age-appropriate content; no frightening scenes for young casts.
- Original story and songs; do not copy existing plays, films or copyrighted songs.
</constraints>

<output_format>
## Cast list
Table: Part | Who | Lines | Notes.
## The script
## Staging and props
Checklist.
## Rehearsal plan
## Performance day
</output_format>
