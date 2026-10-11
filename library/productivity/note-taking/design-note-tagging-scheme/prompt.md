---
schema: 1
id: design-note-tagging-scheme
kind: prompt
title: Design a note tagging scheme
description: Designs a small, consistent tagging and naming scheme for a notes collection - when to tag versus link or file, a short tag list, note title rules and a plan to fix existing tag sprawl.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [individual, researcher, writer, student]
stack: [obsidian, notion]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tags, naming-convention, metadata, properties, tag-sprawl]
pairs_with:
  prompts: [audit-notes-vault, design-second-brain, write-note-templates]
args:
  - name: current_tags
    description: Your current tags or labels (paste a list, ideally with counts), a few example note titles, and how you search for notes today.
    type: text
    required: true
  - name: uses
    description: What you use the notes for (for example work projects, research, recipes, journaling) and what you fail to find today.
    type: text
    required: true
  - name: app
    description: Optional - the notes app, so properties, nested tags or labels fit what it supports.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Rules, Tag list, Note title rules, Fixing the old tags, Keeping it tidy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tag systems usually fail by growing: synonyms (#meeting, #meetings, #mtg), tags used once, tags that duplicate the folder a note already sits in, and topic tags so broad they match half the vault. A tag earns its place only if you will search or filter by it. Good schemes separate kinds of metadata: what type of note it is (type: meeting, book, person), what state it is in (status: draft, active, done) and what it is about (topic), and they use links rather than tags for specific people, projects and ideas. Fewer than about 30 tags in active use is a healthy range for most personal collections.

Current tags and examples:
<current>
{{current_tags}}
</current>
Uses: {{uses}}
{{#app}}
App: {{app}}
{{/app}}
</context>

<task>
1. If no tags or examples are given, ask for a pasted tag list and three note titles and stop.
2. Diagnose the current state: synonyms and spelling variants, one-off tags, tags that duplicate folders or links, tags too broad to filter by. Quote the actual tags.
3. Write the rules: what a tag is for in this collection, when to use a link instead, when a folder or property is better, and a naming format (lowercase, singular or plural chosen once, hyphens, nesting only if the app supports it).
4. Propose a tag list grouped as type, status and topic, each with a one-line meaning and an example note.
5. Write note title rules suited to the uses (for example dated titles for meetings, claim titles for ideas, "Surname, Firstname" for people).
6. Map every old tag to a new tag, a link, a property or "drop", and give the order to apply the changes safely, starting with the most used tags.
7. Give a two-minute monthly check to stop sprawl returning.
</task>

<constraints>
- Keep the active tag list short; justify any tag beyond about 30.
- Do not claim the app supports nested tags, properties or bulk rename unless the person says so; offer the fallback.
- Map every tag the person listed; do not silently drop any.
- Do not invent example notes that contradict the person's described uses.
</constraints>

<output_format>
## Diagnosis
## Rules
## Tag list
Table: Group | Tag | Meaning | Example
## Note title rules
## Fixing the old tags
Table: Old tag | New | Action
## Keeping it tidy
</output_format>
