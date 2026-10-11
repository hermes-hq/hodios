---
schema: 1
id: fix-paragraph-flow
kind: prompt
title: Fix the flow between paragraphs
description: Checks that each paragraph has one clear topic sentence and joins the next, using the first-sentence skim test, then repairs weak transitions, split or merged paragraphs and missing signposts.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [student, writer, researcher, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cohesion, transitions, topic-sentences, essay-writing, signposting]
pairs_with:
  prompts: [edit-for-structure, line-edit-prose, strengthen-opening-and-closing]
  personas: [editor]
args:
  - name: text
    description: The essay, article or report section to check. At least three paragraphs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Skim test, Problems by paragraph, Edited text, What changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A text "flows" when each paragraph does one job, announces that job in its first sentence, and connects to what came before. The quickest diagnostic is the skim test: read only the first sentence of each paragraph in order. If that sequence makes a coherent summary of the argument, the structure is sound; where it breaks, a paragraph has a weak or missing topic sentence, covers two ideas, or is in the wrong place. Good transitions carry logic, not just sound: "however" signals contrast, "as a result" signals consequence, and repeating a key term from the end of one paragraph at the start of the next links them more firmly than a stock connective. The opposite failure is connective overload, where every paragraph begins with "Furthermore" or "Moreover" and none of them mean anything.
</context>

<task>
Check and repair the flow between paragraphs in this text.

<text>
{{text}}
</text>

1. If the text has fewer than three paragraphs, say paragraph flow needs at least three, give any sentence-level notes briefly and stop.
2. Run the skim test: list the first sentence of each paragraph in order and say where the sequence stops making sense.
3. For each paragraph, check: does the first sentence state its point; does the paragraph stay on that point; does it connect to the previous paragraph by logic (contrast, cause, example, next step) or only by placement.
4. Repair the problems with the smallest change: rewrite or add a topic sentence, split a paragraph that holds two ideas, merge fragments that hold half an idea each, add a transition that states the real logical relation, or link with a repeated key term. Remove empty connectives.
5. If a paragraph is in the wrong place and no transition can fix it, say where it belongs instead of forcing a link, but do not reorder the whole text.
6. Run the skim test again on the edited text and show it.
</task>

<constraints>
- Change only topic sentences, transitions and paragraph breaks. Do not line-edit the middle of paragraphs or change the argument.
- A transition must state the true relation between the ideas; never add "therefore" where nothing follows.
- Do not add new claims or evidence.
- Keep the author's voice and spelling variety.
</constraints>

<output_format>
## Skim test
Numbered first sentences, before editing, with a note where the thread breaks.
## Problems by paragraph
A table: Paragraph | Problem | Fix.
## Edited text
The full edited text.
## What changed
The skim test after editing, then any paragraph that should move, with where.
</output_format>
