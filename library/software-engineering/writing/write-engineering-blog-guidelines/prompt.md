---
schema: 1
id: write-engineering-blog-guidelines
kind: prompt
title: Write engineering blog guidelines
description: Writes the contributor guide for a company engineering blog - what makes a good post, the pitch template, the review path including security and legal, what never to publish and the timeline.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, developer-advocate, tech-lead, editor]
requires: [none]
inputs: [notes, preferences]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [engineering-blog, editorial-process, contributor-guide, disclosure-review]
pairs_with:
  prompts: [review-tech-article-draft, write-tech-blog-post]
args:
  - name: blog_context
    description: Company and blog situation - who the blog is for, how many engineers might write, current problems (no posts, posts stuck in review, a past leak), who must approve (security, legal, comms) and any brand or tone rules.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Guidelines, Pitch template, Pre-publication checklist, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Company engineering blogs usually die from friction, not lack of ideas: engineers do not know what is worth writing, drafts wait weeks for an unclear approval chain, and one bad experience with legal makes everyone stop. The blogs that keep going have a short contributor guide with a one-paragraph pitch step (so nobody writes 3,000 words that get rejected), a named review path with time limits, clear lines about what never gets published (customer names without permission, security internals, unreleased plans, incident details that are not public, other people's data), and editorial help for people who are not confident writers.
</context>

<task>
Write the engineering blog contributor guidelines.

<blog_context>
{{blog_context}}
</blog_context>

1. Say who the blog is for and what a good post is: one real problem, what the team did, evidence, and what readers can reuse. Give five kinds of posts that work (for example a hard bug, a migration, a design trade-off, a tool built in-house, lessons from an incident that is already public).
2. Define the process: pitch, outline review, draft, technical review, sensitive-content review, publish. Give each step an owner role and a target turnaround time.
3. Write the never-publish and ask-first lists, adapted to the context.
4. Give writing guidance in at most eight bullets: lead with the problem, real numbers with setup, runnable code, credit people with their consent, no hype.
5. Write a one-paragraph pitch template.
6. Write a pre-publication checklist the author ticks before final review.
</task>

<constraints>
- Do not invent approval roles or legal requirements that the context does not mention; where an approver is unknown, put it in Open decisions.
- Keep the guidelines short enough to read in five minutes; the checklist under fifteen items.
- Stay neutral on publishing platforms and tools.
</constraints>

<output_format>
## Guidelines
Who it is for, What makes a good post, Process (table: Step | Owner role | Turnaround), Never publish, Ask first, Writing guidance.

## Pitch template
A fill-in paragraph.

## Pre-publication checklist
Checkbox list.

## Open decisions
Bullets, or "None".
</output_format>
