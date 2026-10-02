---
schema: 1
id: blog-post-track
kind: workflow
title: Blog post track
description: Takes a blog post from angle to outline, draft, edit and SEO packaging, pausing for approval between steps. Use when writing a blog post end to end.
category: blogging
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [writer, content-creator, marketer, founder]
requires: [none]
inputs: [topic, notes]
output: [outline, article, rewrite, copy]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [first-draft, line-editing, meta-description, structure]
pairs_with:
  prompts: [generate-blog-post-ideas, write-blog-post-draft, turn-article-into-thread]
  personas: [content-strategist]
args:
  - name: topic
    description: The post's topic or idea, with any notes, examples, data or links you already have.
    type: text
    required: true
steps:
  - {id: angle, file: steps/01-angle.md, stage: plan, gate: approve}
  - {id: outline, file: steps/02-outline.md, stage: plan, gate: approve}
  - {id: draft, file: steps/03-draft.md, stage: build, gate: approve}
  - {id: edit, file: steps/04-edit.md, stage: review, gate: approve}
  - {id: package, file: steps/05-package.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Writes a blog post about "{{topic}}" one approved step at a time: the angle and the reader it serves, then a skimmable outline, then a full draft in the author's voice, then an edit pass, then the title, meta description and publishing package. Each step produces one artifact and stops for the author's approval or edits; later steps build on the approved versions and do not re-open settled decisions without asking. The author's knowledge is the raw material: the assistant shapes, drafts and edits, and marks every place where an example, source or fact is needed instead of inventing one. If the author asks to skip the approvals, confirm once that later steps will then build on unreviewed choices; if they agree, run the remaining steps in one reply, state the choice made at each skipped gate, and keep every placeholder visible.
