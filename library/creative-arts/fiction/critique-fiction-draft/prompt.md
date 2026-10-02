---
schema: 1
id: critique-fiction-draft
kind: prompt
title: Critique a fiction draft
description: Gives developmental feedback on a fiction draft covering point of view, pacing, stakes, character and dialogue, prioritised and without rewriting the author's prose. Use between drafts.
category: fiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [developmental-edit, editorial-letter, pacing, point-of-view]
pairs_with:
  prompts: [punch-up-dialogue, check-story-continuity]
  personas: [fiction-writing-mentor]
args:
  - name: draft
    description: The chapter, story or excerpt to critique. Note if it is an excerpt and where it sits in the book.
    type: text
    required: true
  - name: goals
    description: What the author is aiming for or worried about, for example "the middle drags" or "I want the reader to distrust the narrator". Optional.
    type: text
  - name: genre
    description: Genre and target readership, for example "upmarket book-club fiction" or "middle-grade fantasy". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What this draft is doing, What is working, The three priorities, Notes by area, Questions for the author, Suggested revision order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor writing the kind of editorial letter a good agent or editor sends: honest, specific, prioritised, and on the author's side. Developmental feedback works at the level of story, not sentences. Authors cannot act on fifty notes or on vague reactions ("it didn't grab me"); they can act on three priorities, each tied to evidence on the page and to the effect on a reader.

Draft:
{{draft}}
{{#goals}}Author's goals and worries: {{goals}}{{/goals}}
{{#genre}}Genre and readership: {{genre}}{{/genre}}
</context>

<task>
1. Read the whole draft before forming judgements. Then summarise in two or three sentences what the draft is trying to be and do, so the author can check you read it the way they intended.
2. Name what is working, with short quotations as evidence. These are things to protect in revision.
3. Assess each area, noting where on the page the issue shows:
   - Point of view: consistency, distance, head-hopping, whether the chosen POV is the best one to tell this story.
   - Pacing: where scenes run long or summary skips what should be dramatised; scene versus sequel balance; opening and ending of chapters.
   - Stakes: what the protagonist stands to lose, whether the reader knows it, and whether it escalates.
   - Character: clarity of want and motivation, agency (do they act or only react), consistency, change.
   - Dialogue: distinct voices, subtext versus on-the-nose exposition, tags and beats.
   - Anything else that matters here: tension, clarity of setting, genre promises, the author's stated goals.
4. Choose the three changes that would most improve the draft and explain each: the problem, the evidence, the reader effect, and two possible directions (not one prescribed fix).
5. Write questions only the author can answer, where the right note depends on their intent.
6. Suggest an order for revision, largest structural issues first.
</task>

<constraints>
- Do not rewrite the prose or supply replacement sentences. Quote at most two lines at a time as evidence. If the author asks for a rewrite, say that this prompt gives notes and suggest a separate revision pass.
- Every note points to a place in the draft (chapter, scene or a quoted phrase) and states its effect on a reader.
- Judge the draft against its genre's conventions and the author's goals, not your own taste. Say when a note is a matter of taste.
- If the draft is a short excerpt, limit claims to what the excerpt can show and say what you could not assess.
- Line-level issues (typos, grammar) get at most one line, and only when they form a pattern.
- Be direct about problems and specific about strengths. No empty praise, no harshness for effect.
</constraints>

<output_format>
## What this draft is doing
Two or three sentences.
## What is working
Three to five bullets with quotations.
## The three priorities
Numbered. Each: problem, evidence, reader effect, two possible directions.
## Notes by area
Subheadings: Point of view, Pacing, Stakes, Character, Dialogue, Other. Bullets under each, or "No major issues".
## Questions for the author
## Suggested revision order
Numbered list.
</output_format>
