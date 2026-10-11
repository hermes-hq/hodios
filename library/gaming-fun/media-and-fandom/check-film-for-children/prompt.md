---
schema: 1
id: check-film-for-children
kind: prompt
title: Check a film or show for your child
description: Tells a parent what is actually in a film, series or book before their child sees it, by kind and intensity, so they can decide for their own child rather than by a rating alone.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [review]
role: [parent, teacher]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [content-check, age-ratings, family-viewing, scary-scenes, parental-guidance]
pairs_with:
  prompts: [pick-movie-for-group, plan-movie-marathon]
args:
  - name: title
    description: The film, series or book, with year if there are several versions.
    type: string
    required: true
  - name: child
    description: Age and anything relevant about this child, for example "7, scared of the dark, sensitive about animals dying" or "12, mature for age".
    type: text
    required: true
  - name: concerns
    description: What you most want to know about, for example "scary scenes", "language", "sexual content", "death of a parent", or "everything".
    type: text
    default: everything
output_contract:
  format: markdown
  sections: [The short answer, What is in it, For your child, If you watch together]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Official age ratings differ between countries and compress very different things into one label: a film rated for older children for brief language is a different decision from one rated the same for sustained peril. Parents know their own child: many children handle cartoon violence but are badly shaken by a parent dying, a pet in danger, a jump scare or a realistic home invasion. What helps is a plain description of what is in the work, by category and intensity, including the scenes that ratings tend to miss (grief, divorce, bullying, body horror in animation). It must not turn into a plot summary that ruins the film for the adult either, beyond what is needed.

Title: {{title}}
Child: {{child}}
Concerns: {{concerns}}
</context>

<task>
1. If you do not know the work well, or there are several versions, say so and ask which one, or say you cannot give a reliable breakdown. Do not guess content.
2. Give a short answer for this child: likely fine, fine with a parent present, wait a few years, or depends on their sensitivity to a named thing.
3. Break the content down by category: violence and peril, frightening scenes, death and loss, language, sexual content and nudity, substance use, discriminatory content, and emotionally heavy themes. For each, say none, mild, moderate or strong, with a brief description of the kind of scene and roughly where it falls, for those categories in {{concerns}} first.
4. Match against the child's described sensitivities and call out each one that is triggered.
5. Mention that ratings vary by country and suggest checking the official rating where they live; do not state a specific rating unless you are confident, and name the country it applies to.
6. If you suggest watching together, give two or three moments to be ready for and simple things to say afterwards.
</task>

<constraints>
- Describe scenes in enough detail to decide, without graphic retelling.
- Never invent content or ratings; mark uncertain items "(check)" and recommend a preview of specific scenes when unsure.
- Respect the parent's judgement and values; give information, not a lecture.
- Spoil plot only where it is needed to describe the content.
</constraints>

<output_format>
## The short answer
One or two sentences.
## What is in it
Table: Category | Level | What happens and roughly when.
## For your child
Bullets matching their sensitivities.
## If you watch together
Moments to prepare for and things to say.
</output_format>
