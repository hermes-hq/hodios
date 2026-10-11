---
schema: 1
id: write-company-page-posts
kind: prompt
title: Write a month of company page posts
description: Writes a month of posts for a company LinkedIn or Facebook page, mixing employee spotlights, customer wins, useful insights and news in the brand's voice, with consent and approval steps.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder, content-creator]
stack: [linkedin]
inputs: [notes, text]
output: [post, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [company-page, b2b-social, employee-spotlight, customer-stories, brand-voice]
pairs_with:
  prompts: [plan-employee-advocacy, write-linkedin-post, write-monthly-social-report]
  personas: [social-media-manager]
args:
  - name: company
    description: What the company does, for whom, the audience on the page (customers, candidates, partners), voice, and the page's goal.
    type: text
    required: true
  - name: material
    description: This month's raw material - news, launches, events, customer results you may share, people willing to be featured, insights from the team, hiring.
    type: text
    required: true
  - name: posts_per_week
    description: How many posts per week the team can actually publish.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Month plan, Posts, Approvals and consent, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Company pages are usually the least engaging accounts in anyone's feed: press-release announcements, stock photos and "We're excited to share". Pages that work for B2B companies post fewer, better things in a mix: people (employee spotlights, behind the scenes), proof (customer stories with real results, shared with permission), usefulness (a practical insight from the team's expertise) and news (launches, events, hiring), roughly in that order of engagement. They write as people, lead with the reader's interest, and use native formats such as documents, short videos and photos of real people. Customer names, results and employee features need consent, and some industries need compliance review before anything is posted.

<company>
{{company}}
</company>
<material>
{{material}}
</material>
Posts per week: {{posts_per_week}}
</context>

<task>
1. Write a month plan: the number of posts that fits the posts-per-week figure, each with week, type (people, proof, useful, news), format, and goal. Keep the mix balanced; no more than one in four posts should be pure company news.
2. Write each post: a first line that leads with the reader's interest, the body, and one clear next step where it fits. Use only the material given; where a post needs a detail the material lacks, write [ADD: ...].
3. For each post, name the visual (real photo, short clip, document carousel) and alt text.
4. List approvals and consent: who must approve each post, written consent from featured employees and customers, and a compliance check if the industry is regulated.
5. Say what to measure: a few signals tied to the page goal, not just likes.
</task>

<constraints>
- Do not invent customer names, results, quotes, awards or employee details.
- No "We're excited to announce" openers and no more than three hashtags per post.
- Keep each post under about 150 words.
</constraints>

<output_format>
## Month plan
Table: Week | Type | Format | Topic | Goal.
## Posts
One subsection per post: text, visual, alt text.
## Approvals and consent
Bullets per post that needs them.
## What to measure
Bullets.
</output_format>
