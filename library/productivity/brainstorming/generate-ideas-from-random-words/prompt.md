---
schema: 1
id: generate-ideas-from-random-words
kind: prompt
title: Generate ideas from random words
description: Breaks a stuck problem open with random entry - unrelated words, their attributes and associations, forced connections back to the problem - then shapes the best into usable ideas.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, writer, designer, founder]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [random-entry, forced-connections, lateral-thinking, creative-block, ideation-technique]
pairs_with:
  prompts: [find-ideas-from-analogies, use-provocations-for-ideas, brainstorm-ideas]
  personas: [ideation-partner]
args:
  - name: problem
    description: The problem or creative task you are stuck on, what you have already tried and any constraints.
    type: text
    required: true
  - name: words
    description: Optional - your own random words (open a book at any page, look around the room). If empty, a varied set is chosen for you.
    type: text
output_contract:
  format: markdown
  sections: [Problem focus, Random words, Connections, Shaped ideas, Try next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Random entry, popularised by Edward de Bono, works because thinking follows established paths: asked about the same problem, the mind returns to the same answers. A truly unrelated word gives a new starting point, and the effort of connecting it back to the problem opens paths that direct thinking does not reach. Two things make it work. First, the word must really be unrelated; choosing a word that already fits the problem defeats the point. Second, the connection is made through the word's attributes, functions and associations, not the word itself ("lighthouse" gives warning, rotation, fixed position, guidance at night, a keeper living on site), and each of those is tried against the problem. Most connections are useless; a few are surprising and good.

<problem>
{{problem}}
</problem>
{{#words}}
Words supplied by the user:
<words>
{{words}}
</words>
{{/words}}
</context>

<task>
1. State the problem focus in one line: the specific thing to generate ideas for. If the problem is too vague, ask one or two questions and stop.
2. {{#words}}Use the user's words. {{/words}}Make a set of six stimulus words: concrete nouns from unrelated areas (nature, tools, places, jobs, everyday objects, events). Do not pick words that already relate to the problem; if a supplied word does, say so, keep it, and add an unrelated replacement alongside it.
3. For each word, list five to seven attributes, functions or associations.
4. Force connections: for each attribute, ask "how could this apply to the problem?" and write the idea that comes out, in one line. Aim for at least 30 raw connections across the six words. Keep the strange ones; mark the ones that are useless rather than deleting them silently.
5. Pick the six to ten most promising connections and shape each into a usable idea: what it is, who does what, and the first small test.
6. Suggest how to run the technique alone next time in five minutes.
</task>

<constraints>
- Keep the stimulus words truly unrelated to the problem; choosing comfortable words is the most common failure.
- Shape ideas only within the user's stated constraints; label any assumption about their resources or situation.
- Do not invent facts, statistics or quotes to justify an idea.
- One line per raw connection.
</constraints>

<output_format>
## Problem focus
One line.

## Random words
The six words, each with its attributes as a comma-separated line.

## Connections
Table: Word | Attribute | Connection to the problem | Promising? (yes, maybe, no).

## Shaped ideas
Numbered list: idea, how it works, first small test.

## Try next
Three to five bullets for a solo five-minute version.
</output_format>
