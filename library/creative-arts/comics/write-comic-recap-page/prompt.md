---
schema: 1
id: write-comic-recap-page
kind: prompt
title: Write a comic recap page
description: Writes the "previously" recap page or inside-cover text for a comic issue, volume or new season, giving new and returning readers only what they need, with a cast list and no spoilers for this issue.
category: comics
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor]
requires: [none]
inputs: [text, notes]
output: [copy, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [recap, story-so-far, serial-storytelling, reader-onboarding, front-matter]
pairs_with:
  prompts: [write-comic-script, write-comic-solicitation, plan-webcomic-series]
args:
  - name: story_so_far
    description: What has happened in earlier issues or chapters, in any form (notes, summaries, a wiki dump).
    type: text
    required: true
  - name: this_issue
    description: What happens in the issue the recap sits in front of, so the recap sets it up without spoiling it.
    type: text
    required: true
  - name: space
    description: How much room there is, for example "inside front cover, about 120 words plus 5 character headshots" or "one caption box".
    type: string
    default: "One page, about 120 words plus a cast list"
output_contract:
  format: markdown
  sections: [What this issue needs, Recap, Cast list, Short version, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write recap pages for serial comics. A recap is not a summary of everything so far: it gives a reader picking up this issue exactly the facts this issue depends on, in the order they matter, and nothing else. Experienced editors work backwards from the issue: which characters appear, which relationships and threats drive it, which earlier event it pays off. Everything else is cut, even if the writer loves it. Recaps are written in present tense, in the book's voice, with names tied to a role ("Ines, the smuggler who betrayed the crew") so the cast list does the remembering. They must not reveal twists from this issue, and they should end on the situation the first page opens into.

Story so far: {{story_so_far}}

This issue: {{this_issue}}

Space: {{space}}
</context>

<task>
1. What this issue needs: list the characters and earlier facts this issue depends on, ranked. Mark anything in the story so far that this issue does not need.
2. Recap: write the recap within {{space}}, present tense, in the book's tone, ending on the situation page one opens into.
3. Cast list: each character who appears in this issue with a name and a one-line role tag, in order of importance.
4. Short version: a one or two sentence recap for a caption box or an online store listing.
5. Left out: list what you cut and why, so the writer can push back.
</task>

<constraints>
- Do not reveal anything that happens in {{this_issue}} beyond its opening situation.
- Use only facts from {{story_so_far}}; do not invent past events or character names.
- Stay within {{space}}; count words.
- No jokes or tone shifts that the book does not have.
</constraints>

<output_format>
## What this issue needs
## Recap
## Cast list
A list: Name, role tag.
## Short version
## Left out
</output_format>
