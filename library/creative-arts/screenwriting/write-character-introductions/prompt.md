---
schema: 1
id: write-character-introductions
kind: prompt
title: Write character introductions for a script
description: Rewrites the first-appearance lines for a script's characters so each one shows who they are through a specific action or detail in one or two lines. Use when character intros read like casting lists.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build, review]
role: [writer]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [character-introduction, action-lines, first-impression, casting]
pairs_with:
  prompts: [write-casting-breakdown, format-screenplay-scene, write-script-coverage]
args:
  - name: characters
    description: Each character's current introduction line from the script, plus a sentence on who they really are and their role in the story.
    type: text
    required: true
  - name: tone
    description: The script's tone and genre, which the intros' voice should match, e.g. "dry dark comedy", "grounded crime drama".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Rewrites, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A character introduction is often the only description an actor, a reader and a casting director remember. Convention puts the name in CAPS the first time, with an age or age range, and then one or two lines that capture who the person is, ideally through something they are doing that only they would do, rather than a list of physical traits or a paragraph of backstory the camera cannot show. Attractive-by-default descriptions, body-focused descriptions of women, and ethnicity or appearance details that serve no story purpose are common reasons readers mark a script down; they also narrow casting for no gain. The voice of the intro should match the tone of the script.
</context>

<task>
Rewrite these character introductions for a script whose tone is: {{tone}}.

<characters>
{{characters}}
</characters>

1. For each character, write one rewrite (name in CAPS, age or range, one or two lines) that shows the person through a specific action, choice or telling detail visible on screen.
2. Give one alternative for each lead.
3. Under each, a one-line note on what changed and why (cut backstory the camera cannot see, replaced adjectives with behaviour, removed appearance details that do not serve the story).
4. **Notes:** flag any intro where a physical or identity detail is essential to the story, and say how to keep it without reducing the character to it.
</task>

<constraints>
- Keep each character's age, role and essential facts as given; do not change who they are.
- Describe only what can be seen or heard, except for one short wry aside if it fits the tone.
- No intros that define women or minor characters by attractiveness alone.
</constraints>

<output_format>
## Rewrites
For each: Original | Rewrite | Alternative (leads only) | What changed.
## Notes
</output_format>
