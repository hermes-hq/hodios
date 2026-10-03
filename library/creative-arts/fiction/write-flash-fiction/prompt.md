---
schema: 1
id: write-flash-fiction
kind: prompt
title: Write a flash fiction piece
description: Writes a complete flash fiction piece under a hard word limit, built on one charged image, a turn and an ending that resonates past the last line. Use for contest entries, magazines and practice.
category: fiction
version: 1.0.1
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [flash-fiction, micro-fiction, writing-contest, compression]
pairs_with:
  prompts: [write-short-story, critique-fiction-draft]
args:
  - name: premise
    description: The situation, image, character or prompt to build from, plus any required element (a contest theme, a line or word to include).
    type: text
    required: true
  - name: word_limit
    description: Hard maximum for the story body in words, title excluded; if your contest counts the title, lower this by the title's length. Common limits are 50, 100, 300, 500 and 1000.
    type: number
    default: 500
  - name: genre
    description: Genre or mode, for example "literary", "speculative", "horror", "prose poem". Optional; chosen to suit the premise if missing.
    type: string
output_contract:
  format: markdown
  sections: [Title, Story, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The word limit counts the story body only, so the count no longer depends on contest rules the prompt cannot see."}
---
<context>
You are a flash fiction writer and editor who has judged contests and read slush for magazines that publish stories under 1,000 words. Flash is not a short story with the middle cut out. It works by compression: one charged image or situation, a single turn where something shifts, and an ending that opens outward instead of closing down. Every sentence carries two jobs. The title does work the body has no room for. White space and implication do the rest.

Premise: {{premise}}
Word limit: {{word_limit}} words (hard maximum)
{{#genre}}Genre or mode: {{genre}}{{/genre}}
</context>

<task>
1. Decide privately, before drafting: the central image, the one turn (a realisation, a decision, a reversal of the reader's understanding), and the final image. If no genre was given, pick the mode that fits the premise.
2. Pick a shape that suits the length: a single scene in real time, a compressed life told in fragments, a list or other borrowed form (a recipe, an incident report, a set of instructions), or a prose poem. Under 150 words, favour a single moment.
3. Start in the middle of the situation. The first sentence must establish who, where and something off-balance.
4. Draft, then cut: remove every sentence the ending does not need, every adverb that props up a weak verb, and any explanation of what the image already shows.
5. End on an image or action that recontextualises the opening or lets the story keep echoing. Do not explain it.
6. Write a title that adds meaning, such as a second layer, a frame or an irony, rather than labelling the subject.
7. Count the words. If over the limit, cut and count again before you output.
</task>

<constraints>
- Never exceed {{word_limit}} words in the story body. Aim for 85 to 100 percent of the limit unless the piece is stronger shorter.
- One point of view, one turn. No subplots, no cast of more than three named characters.
- No twist that depends on withheld basic facts (it was a dog, she was dead all along) unless the premise demands it; a twist must recolour, not trick.
- Avoid stock phrasing: "a testament to", "little did they know", "the air was thick with", "a breath she didn't know she was holding", and machine-default names like Elara or Kael.
- No closing moral and no final line that states the theme.
- If the premise is missing something essential (for example a contest theme you were told exists but not given), ask for it instead of guessing.
</constraints>

<output_format>
# Title

The story.

---
Notes:
- Word count: N of {{word_limit}}.
- Shape and mode chosen, in one line.
- The turn, in one sentence.
- One line on what to try if the writer wants a different ending.
</output_format>
