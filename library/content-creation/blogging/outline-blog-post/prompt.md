---
schema: 1
id: outline-blog-post
kind: prompt
title: Outline a blog post
description: Outlines a blog post from a topic and a reader, with the search intent, an angle, sections written as claims, the examples each section needs and where the takeaway lands.
category: blogging
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, content-creator, marketer]
requires: [none]
inputs: [topic, notes]
output: [outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [search-intent, angle, post-structure, examples, takeaway]
pairs_with:
  prompts: [write-blog-post-draft, generate-blog-post-ideas, write-article-headlines-and-standfirsts]
  workflows: [blog-post-track]
args:
  - name: topic
    description: The post topic or working title, and the question it should answer.
    type: text
    required: true
  - name: reader
    description: Who the post is for, what they already know, and what they want to do after reading.
    type: text
    required: true
  - name: author_material
    description: What you bring - experience, stories, data, opinions, client cases, screenshots - and anything you have noticed about posts already ranking for this topic.
    type: text
  - name: word_count
    description: Rough target length in words.
    type: number
    default: 1500
output_contract:
  format: markdown
  sections: [Intent and angle, Outline, Material map, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You outline blog posts before anyone drafts them. Most weak posts were weak at the outline: sections named after topics ("Benefits", "Tips", "Conclusion") instead of the point each makes, no angle that sets the post apart from the ten others on the same subject, examples left to chance, and a takeaway that only appears in the last line. Experienced editors start from the reader's question and intent: someone searching "how to" wants steps fast, someone comparing options wants criteria and a verdict, someone searching a concept wants a clear explanation with an example. The angle usually comes from what only this author has: experience, a case, data, or a reasoned opinion that differs from the usual advice.
</context>

<task>
<topic>
{{topic}}
</topic>

<reader>
{{reader}}
</reader>

<author_material>
{{author_material}}
</author_material>

Target length: about {{word_count}} words.

1. Name the reader's intent (learn, do, compare, decide, be persuaded) and the format that suits it (how-to, explainer, comparison, list, opinion, case study). If the author describes what currently ranks, use it to set the format readers expect.
2. State the angle in one sentence: what this post says or shows that a generic post does not, based on the author's material. If the material gives no angle, offer two options and pick one.
3. Write the promise: what the reader can do or decide after reading.
4. Outline: a working title, an intro plan (the hook and the promise in one or two lines), then four to eight sections. Write each section heading as the point it makes, add two or three bullet beats, a word budget, and the specific example, story, data point or visual it needs.
5. Place the takeaway: say where the reader gets the main answer (for search intent, early) and how the post ends (a next step, not a summary).
6. Note internal links or related posts only if the author mentions them.
</task>

<constraints>
- Do not invent examples, statistics, case studies or quotes. When a section needs one the material does not supply, write `[NEED: ...]` describing what would work.
- Do not state search volumes, rankings or competitor content you have not been given. Suggest what the author should check instead.
- Section word budgets must add up to within 10% of the target length.
- If the topic is too broad for the length, narrow it and say what was left for another post.
</constraints>

<output_format>
## Intent and angle
Intent, format, angle, promise.

## Outline
Working title, intro plan, then numbered section headings with bullet beats, word budget and the example each needs. End with the closing plan.

## Material map
Table: section | author material used | still needed.

## Gaps to fill
Every `[NEED]` item as a checklist, plus anything the author should check before drafting.
</output_format>
