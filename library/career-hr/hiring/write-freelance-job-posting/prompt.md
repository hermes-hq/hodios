---
schema: 1
id: write-freelance-job-posting
kind: prompt
title: Write a job post to hire a freelancer
description: Writes a project post for hiring a freelancer on a marketplace, with the outcome, scope, deliverables, budget, timeline, skills and screening questions that filter out copy-paste bids.
category: hiring
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, operations-manager, marketer]
requires: [none]
inputs: [notes, text]
output: [copy, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [freelance-marketplace, project-brief, hiring-a-freelancer, screening-questions, scope-of-work]
pairs_with:
  prompts: [compare-freelancer-proposals, write-job-description]
args:
  - name: project
    description: What you need done, why, any examples or existing materials, and what done looks like.
    type: text
    required: true
  - name: budget_and_timeline
    description: Your budget (fixed or hourly), the deadline, and any milestones. Optional; the post will ask you to fill it in if missing.
    type: text
  - name: platform
    description: Where you will post it (a freelance marketplace, a community job board, social media). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Title, Post, Screening questions, Before you post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small business owners and managers hire freelancers. Most freelance project posts get dozens of generic, copy-pasted bids because the post is vague ("Need a website, cheap, ASAP"), so the client cannot compare proposals and good freelancers skip it. Good freelancers look for a clear outcome, a defined scope with deliverables, a realistic budget and timeline, and a client who knows what they want. Posts that state what is out of scope, the number of revisions, how communication will work and two or three specific screening questions get fewer but much better proposals, and make the eventual contract easier.

<project>
{{project}}
</project>
{{#budget_and_timeline}}
<budget_and_timeline>
{{budget_and_timeline}}
</budget_and_timeline>
{{/budget_and_timeline}}
{{#platform}}Platform: {{platform}}{{/platform}}
</context>

<task>
1. Title: a specific title naming the deliverable and the key skill (for example "Shopify product page redesign for a skincare brand, 5 templates").
2. Post: in this order, a two-sentence summary of the business and the goal; the scope with deliverables as a list; what is out of scope; required skills and nice-to-haves; the budget, type (fixed or hourly) and milestones; the timeline; how you will work together (check-ins, tools, time zone, revisions, who owns the files); and how to apply.
3. Screening questions: two or three questions that only someone who read the post and has done this work can answer well (for example, how they would approach a specific part, a similar project and their role in it), plus a simple instruction to include a word in the reply to spot copy-paste bids.
4. Before you post: a short checklist covering budget realism, materials to prepare, contract and IP terms to agree, and how many proposals to shortlist.
</task>

<constraints>
- Do not invent budget figures, deadlines or business facts; leave [placeholders] and point them out.
- If the budget looks unrealistic for the scope described, say so and suggest reducing the scope or adjusting the budget, without inventing market rates.
- Keep the post scannable and under about 350 words.
- Do not ask for unpaid sample work tailored to this project; ask for past examples instead.
</constraints>

<output_format>
## Title
## Post
## Screening questions
## Before you post
</output_format>
