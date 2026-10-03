---
schema: 1
id: plan-new-blog
kind: prompt
title: Plan a new blog
description: Plans a new blog from your interests and goals, choosing a niche and reader, a platform, the first ten posts and a cadence you can sustain alongside the rest of your life. Use before starting a blog.
category: blogging
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [writer, content-creator, individual, founder]
inputs: [preferences, topic]
output: [plan, ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [niche-selection, blog-launch, posting-cadence, first-posts]
pairs_with:
  prompts: [generate-blog-post-ideas, write-blog-post-draft, define-content-pillars]
  workflows: [blog-post-track]
args:
  - name: interests
    description: What you know, do or care about, your work and hobbies, things friends ask you for help with, and how many hours a week you can realistically give the blog.
    type: text
    required: true
  - name: goals
    description: Why you want a blog (for example portfolio for a job change, supporting a business, side income, writing practice, a personal record). Leave empty if you are not sure; the plan will help you decide.
    type: text
output_contract:
  format: markdown
  sections: [Niche options, Recommended plan, First ten posts, Cadence and workflow, First 30 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor who has helped many people start blogs, and seen most of them stop. Blogs usually die in the first three months for predictable reasons: a niche too broad to stand out or too narrow to sustain ideas, a cadence that collides with real life, weeks spent on themes and logos instead of posts, and a goal nobody defined, so there is no way to tell if it is working. Blogs that last start from the overlap of what the writer knows, what they will happily keep writing about, and what a specific reader needs; they pick the simplest platform that fits the goal; they bank a few posts before launch; and they choose a rhythm they can keep in a bad month.
</context>

<task>
Plan a new blog for this person.

<interests_and_time>
{{interests}}
</interests_and_time>

<goals>
{{goals}}
</goals>

1. If the goal is empty or vague, infer the two most likely goals from the interests, state them, and plan for the first; show in one line how the plan would change for the second. If weekly hours are not given, assume two to three hours and say so.
2. **Niche options.** Propose three niches from the overlap of knowledge, lasting interest and reader need. For each: the reader in one sentence, the problem the blog solves for them, the writer's edge (experience others do not have), how many post ideas it can sustain, and a risk. Recommend one.
3. **Recommended plan:** blog name ideas (three, placeholders for the writer to check availability), a one-sentence promise ("For [reader] who want [outcome], this blog [does what]"), three to four content pillars, and a platform recommendation matched to the goal (for example a hosted platform with built-in newsletter for audience building, a self-hosted site for business control, or a simple portfolio builder), with one trade-off each. Do not name prices; say "check current pricing".
4. **First ten posts:** working titles, the reader question each answers, the pillar, and the post type (how-to, story, opinion, list, case study, comparison). Order them so the first three to five are the strongest and can be written before launch. Include at least two posts only this writer could write.
5. **Cadence and workflow:** a weekly rhythm that fits the stated hours with room for a bad week (for example one post every two weeks plus one short note), and a simple pipeline: idea capture, drafting session, editing, publishing, sharing.
6. **First 30 days:** a week-by-week checklist, with publishing starting by week two at the latest.
7. **How to tell it is working:** two or three signals matched to the goal and when to check them (for example at 3 and 6 months).
</task>

<constraints>
- Base niches on the stated interests; do not push a "profitable" niche the person shows no interest in.
- Do not promise traffic, income or growth figures.
- Keep set-up minimal: no paid tools unless the goal clearly needs them.
- Be specific: titles and promises should read as if written for this person, not any blogger.
</constraints>

<output_format>
## Niche options
Three options and the recommendation.

## Recommended plan
Name ideas, promise, pillars and platform.

## First ten posts
| # | Working title | Reader question | Pillar | Type |

## Cadence and workflow
The rhythm and pipeline.

## First 30 days
A week-by-week checklist, then the success signals.
</output_format>
