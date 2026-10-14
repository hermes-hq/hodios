---
schema: 1
id: fix-bullet-lists
kind: prompt
title: Fix bullet lists
description: Edits bullet and numbered lists for parallel grammar, consistent punctuation and capitals, a clear lead-in and sensible order, and turns lists that should be prose or a table into those.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, technical-writer, manager, job-seeker]
requires: [none]
inputs: [text, document]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [bullet-points, parallel-structure, lists, punctuation, consistency]
pairs_with:
  prompts: [format-document-for-scanning, copyedit-to-style-guide, proofread-text]
  personas: [editor]
args:
  - name: text
    description: The text containing the lists, such as a report, slide notes, CV, policy or web page.
    type: text
    required: true
  - name: list_style
    description: "A house rule for list punctuation and capitals if you have one, for example \"no full stops on fragments, capital first letter\". Leave empty to use a common convention."
    type: string
output_contract:
  format: markdown
  sections: [Edited text, Changes by list, Convention used]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lists are where documents look sloppiest. The common faults: items that are not grammatically parallel (a noun, then a verb phrase, then a full sentence), each item punctuated differently, a lead-in that does not grammatically lead into the items, items of different kinds mixed in one list (actions with facts, causes with effects), one item that is a paragraph while the rest are three words, a numbered list where order does not matter or bullets where it does, and nested lists three levels deep. A list of one item, or a list whose items depend on each other with "because" and "so", should usually be prose; a list where every item has the same attributes should usually be a table. A common convention: fragments take no full stop, full sentences take full stops, and every item in a list follows the same pattern.
</context>

<task>
Fix the lists in this text.
{{#list_style}}House rule for lists: {{list_style}}{{/list_style}}

<text>
{{text}}
</text>

1. If the text is empty or has no lists, say so and stop.
2. For each list, check: parallel grammar (all items start with the same part of speech and form), one kind of item per list, the lead-in (it should introduce the items and, if a sentence fragment, read on into each item), punctuation and capitals, numbered versus bulleted, order (by importance, sequence or a stated logic), item length balance, and nesting depth.
3. Fix each list. Make items parallel by changing their form, not their meaning. Split mixed lists into separate lists, or move stray items into prose. Turn lists that are really an argument into a short paragraph, and lists of items with shared attributes into a table, and say why.
4. Apply one punctuation and capital convention throughout: the house rule if given, otherwise fragments without full stops and full sentences with them, first letter capitalised.
5. Leave the prose between lists unchanged except where a lead-in needs repairing.
</task>

<constraints>
- Keep every item's content, including numbers, names and conditions. Do not merge items if that hides a separate requirement.
- Keep sequence lists in their order; only reorder lists whose order is not meaningful, and say why.
- Do not add new items or examples.
- Keep the author's spelling variety and terminology.
</constraints>

<output_format>
## Edited text
The full text with the lists fixed.
## Changes by list
For each list (identified by its lead-in or first item): what was wrong and what you changed.
## Convention used
One or two lines on the punctuation and capital convention applied.
</output_format>
