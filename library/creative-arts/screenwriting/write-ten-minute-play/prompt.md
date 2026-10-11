---
schema: 1
id: write-ten-minute-play
kind: prompt
title: Write a ten-minute play
description: Writes a complete ten-minute stage play in one continuous scene, with a turn the audience feels, few actors, minimal set and stage play format. Use for festival submissions and play nights.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text, topic]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ten-minute-play, stage-play, theatre-festival, one-scene]
pairs_with:
  prompts: [format-screenplay-scene, write-short-film-script, plan-community-theatre-production]
args:
  - name: premise
    description: The situation, the characters and what is at stake between them. A starting image or line is enough.
    type: text
    required: true
  - name: cast
    description: Number of actors, and any casting limits (ages, genders) set by the festival or company.
    type: string
    default: "2 to 3"
  - name: submission_rules
    description: Any festival rules (page limit, theme, set or prop limits, content limits). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shape, Play, Staging needs, Rules check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A ten-minute play is a complete play, not a scene from a longer one. It usually runs about ten pages in standard stage play format and works best as one continuous scene in real time, with no scene changes. It needs a clear relationship established in the first page, a want that collides with another want, a turn around the middle or two-thirds mark that changes what the scene is about, and an ending that lands on an action or image rather than an explanation. Festivals program many short plays on a shared set, so plays that need a bare stage, a few chairs and portable props get produced. The common failures are exposition dumps, two people agreeing, a twist that negates everything, monologues instead of conflict, and a final line that explains the theme.
</context>

<task>
Write a ten-minute play.

<premise>
{{premise}}
</premise>
Cast: {{cast}}.
{{#submission_rules}}
<submission_rules>
{{submission_rules}}
</submission_rules>
{{/submission_rules}}

1. **Shape:** before the script, give in five lines: who wants what from whom, what stops them, the turn, the final image, and what the audience should feel walking out.
2. **Play:** write the full play in stage play format: title, a short "Characters" list with ages and one-line descriptions, "Time" and "Place", then the play with character names in capitals, parenthetical directions kept short, and stage directions in italics or parentheses. One continuous scene, about nine to eleven pages, with every character wanting something on every page.
3. **Staging needs:** the set (aim for a bare stage plus a few chairs or a table), props, sound and lighting cues, and anything a shared festival set cannot support.
4. **Rules check:** confirm or flag page count, cast size, theme and any limits in the submission rules.
</task>

<constraints>
- No scene changes, flashbacks or multimedia unless the writer asks.
- Do not explain the theme in dialogue; end on action, image or a line that is subtext, not summary.
- Keep stage directions to what an actor or director needs, not novelistic description.
- Respect content limits in the submission rules; ask if the premise conflicts with them.
</constraints>

<output_format>
## Shape
## Play
## Staging needs
## Rules check
</output_format>
