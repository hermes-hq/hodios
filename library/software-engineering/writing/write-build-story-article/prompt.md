---
schema: 1
id: write-build-story-article
kind: prompt
title: Write a "how I built it" article for a project launch
description: Writes a build-story article for dev.to, Hashnode or a project blog that teaches one real technical lesson from making an open-source project. Use to support a launch.
category: writing
version: 1.0.0
status: incubating
stage: [build, ship]
role: [maintainer, developer-advocate, software-engineer]
requires: [none]
inputs: [notes, text, url]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [open-source, dev-to, build-in-public, launch-article, canonical-url]
pairs_with:
  prompts: [write-tech-blog-post, plan-open-source-launch, write-show-hn-post]
  personas: [developer-advocate]
args:
  - name: project
    description: What the project does, the link, the license, and the audience.
    type: text
    required: true
  - name: build_notes
    description: The raw material - problems you hit, decisions and the alternatives you rejected, numbers before and after, code snippets, mistakes.
    type: text
    required: true
  - name: platform
    description: Where it will be published first.
    type: enum
    enum: [dev-to, hashnode, own-blog, medium]
    default: own-blog
output_contract:
  format: markdown
  sections: [Angle, Article, Publishing notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Launch announcements get skimmed; build stories get read and shared, because readers learn something they can use even if they never install the project. The strongest pieces pick one technical problem, show the dead ends honestly, include real code and real numbers, and mention the project as the place where the lesson happened. Developer platforms such as dev.to and Hashnode support a canonical URL, so the article can live on the project's own site and be republished without competing with itself in search. Community editors and readers on these platforms dislike thinly veiled ads, and many platforms ask authors to disclose AI assistance.
</context>

<task>
<project>
{{project}}
</project>
<build_notes>
{{build_notes}}
</build_notes>
First published on: {{platform}}.

If the notes contain no concrete problem, decision or result, ask for one real story (a bug, a rewrite, a performance fix, a design trade-off) and stop.

1. **Choose the angle.** Propose three angles drawn from the notes, each a lesson a reader could apply ("Why we replaced X with Y and what it cost"). Pick the one with the most concrete evidence and say why.
2. **Write the article** (1,200 to 2,000 words):
   - a title that names the lesson, not the product;
   - an opening that states the problem and what the reader will learn, in under 80 words;
   - the context: what the project is, in two sentences, with the link;
   - the journey: what you tried first, why it failed (with numbers or errors), what you chose and the trade-off;
   - code snippets that are complete enough to understand, taken only from the notes;
   - results with the numbers from the notes, and what you would do differently;
   - a short close: where the project is, what help or feedback you want, the link once more.
3. **Publishing notes:** front matter or tags for {{platform}}, a canonical URL plan if it will be cross-posted, a cover image idea, three suggested tags, a one-line AI-assistance disclosure if the platform expects one, and a two-sentence summary for sharing.
</task>

<constraints>
- Never invent numbers, benchmarks, errors or code; mark gaps as [NEED: ...].
- Keep the project mention to the context and the close; the body teaches.
- No superlatives about the project; let the evidence speak.
</constraints>

<output_format>
## Angle
Three options and the pick.
## Article
The full article in Markdown.
## Publishing notes
</output_format>
