---
schema: 1
id: develop-story-premise
kind: prompt
title: Develop a story premise
description: Turns a seed idea into five story premises (what-if, protagonist, stakes, conflict engine, genre promise), stress-tests each and ranks them. Use before outlining.
category: fiction
version: 1.0.0
status: incubating
stage: [discover]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [ideas, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [premise, what-if, story-stakes, genre-promise]
pairs_with:
  prompts: [outline-story, develop-character, write-logline-and-synopsis]
  workflows: [story-development-track]
  personas: [fiction-writing-mentor]
args:
  - name: seed_idea
    description: The idea in any form (a situation, a character, an image, a question, a dream, a news story) plus anything that must stay in the story.
    type: text
    required: true
  - name: genre
    description: Genre and sub-genre, for example "cosy mystery" or "near-future literary SF". Optional; if missing, options span genres and say which each fits.
    type: string
  - name: length
    description: Target form; sets how big the conflict engine must be.
    type: enum
    enum: [short, novella, novel, series]
    default: novel
output_contract:
  format: markdown
  sections: [What the seed holds, Premise options, Stress test, Ranking, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor who helps authors decide which story to write before they spend a year writing it. An idea is not yet a premise. A premise has a what-if, a specific protagonist who wants something, opposition that gets harder, stakes the reader can feel, and a conflict engine: the mechanism that keeps generating scenes once the opening novelty wears off. It also makes a genre promise, the experience the reader is buying (dread, a puzzle, longing, wonder), and the ending must keep that promise.

Most seeds fail in predictable ways: a situation with no protagonist who acts, a protagonist with no opposition, stakes that stay abstract ("the fate of the world"), or an engine too small for the form (a short-story idea stretched into a novel, or a novel's worth of conflict crammed into 5,000 words).

<seed>
{{seed_idea}}
</seed>
{{#genre}}Genre: {{genre}}{{/genre}}
Target form: {{length}}
</context>

<task>
1. Read the seed for what it already holds: the image or question that drew the author, any character, any setting, any implied conflict. Name what must be protected. If the seed is a single word or too vague to build from, ask up to three questions and stop.
2. Generate five premise options that take the seed in genuinely different directions: change whose story it is, what they want, where the opposition comes from, or the genre promise. At least one option should be the obvious version done well, and at least one should be a surprising angle that still keeps what the author must protect.
3. For each option write:
   - What-if: one sentence.
   - Protagonist: who they are, what they want (concrete and visible), and why they cannot simply walk away.
   - Opposition: who or what is in the way and why it escalates.
   - Stakes: what is lost, personally and specifically, if they fail.
   - Conflict engine: what generates scene after scene for the length of a {{length}}, in one or two sentences.
   - Genre promise: the experience the reader is buying and the kind of ending that keeps it.
   - Logline: one sentence a reader could repeat.
4. Stress-test each option against six questions, scored 1 to 5 with a one-line reason: Does the protagonist drive the story? Does the opposition escalate? Are the stakes personal? Does the engine fit the form? Is it fresh within its genre? Does it keep what the author must protect?
5. Rank the options by potential, recommend one (or a merge of two), and name the single biggest risk to fix before outlining.
</task>

<constraints>
- Stay true to the seed. Do not drop the element the author is clearly excited about to make a "better" premise; if it is the weak point, say so and show how to strengthen it.
- Make the options really different. Five versions of the same plot with renamed characters is a failure.
- Be specific: names, places, concrete wants. Avoid stock phrases ("a dark secret", "a race against time", "nothing will ever be the same") and stock names (Elara, Kael, Lyra).
- For "series", the engine must renew itself across books or seasons; say what changes book to book. For "short", one turn and one revelation is enough; do not over-build.
- Score honestly. If every option scores 4 or more on everything, you have not stress-tested.
- Do not outline or draft scenes; this is a premise document.
</constraints>

<output_format>
## What the seed holds
Two to four bullets: what is already there and what must be protected. Assumptions, one line each.
## Premise options
Five numbered options, each with the seven labelled fields from step 3.
## Stress test
A table: option by the six questions, with scores; one-line reasons below the table.
## Ranking
Ranked list with total scores, the recommendation in two or three sentences, and the biggest risk to fix.
## Questions for you
Two to four choices only the author should make before outlining.
</output_format>
