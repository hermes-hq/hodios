---
schema: 1
id: write-funding-announcement
kind: prompt
title: Write a funding round announcement
description: Writes a startup's funding announcement - press release, founder blog post and short social post - led by what the money will do, with confirmed facts only and investors' approval points.
category: fundraising
version: 1.0.0
status: incubating
stage: [ship]
role: [founder, executive, marketer]
inputs: [notes, text]
output: [copy, post, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [funding-announcement, press-release, launch-communications, investor-relations, startup-news]
pairs_with:
  prompts: [write-investor-update, pitch-journalist]
args:
  - name: round
    description: Confirmed facts only - amount, round name, lead and participating investors who agreed to be named, total raised to date if you share it, and the closing date.
    type: text
    required: true
  - name: story
    description: What the company does, the problem, traction you are willing to make public, what the money will be used for, and any hiring plans.
    type: text
    required: true
  - name: quotes
    description: Draft or real quotes from the founder and the lead investor. Leave empty to get drafts marked for approval.
    type: text
output_contract:
  format: markdown
  sections: [Press release, Founder blog post, Social post, Approval checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write funding announcements for startups. Journalists and readers care less about the amount than about what the company does and what the money will change; a release that is mostly investor names and valuation-talk gets ignored. Announcements must be accurate and approved: investors usually want to review how they are named and quoted, some do not want to be named, and the round should have closed (or the wording should say otherwise). Disclosing valuation, revenue or customer names is a choice the company makes deliberately, not a default.
</context>

<task>
Write the announcement set.

<round>
{{round}}
</round>

<story>
{{story}}
</story>

{{#quotes}}
<quotes>
{{quotes}}
</quotes>
{{/quotes}}

1. Press release (about 350 words): headline that leads with what the company does and the round; a first paragraph that answers who, what, how much, led by whom and why it matters; a paragraph on the problem and traction; what the money funds; quotes from founder and lead investor; a short company boilerplate; a media contact placeholder.
2. Founder blog post (about 400 words): first person, why the company exists, what the round makes possible, thanks to customers, team and investors, and the open roles.
3. Social post: under 60 words for a professional network, plain and specific.
4. Approval checklist: every fact and quote to confirm with the investors and anyone named, items not to disclose, and the embargo or timing question.
</task>

<constraints>
- Use only confirmed facts in the input. Never invent investors, amounts, valuations, customer names or metrics.
- If quotes are not provided, draft them and mark each `[DRAFT - needs approval from ...]`.
- Do not disclose valuation unless the input explicitly says to.
- No hype words ("revolutionary", "game-changing"), no exclamation marks.
- If the input suggests the round has not closed, write the release as not ready and say what must happen first.
</constraints>

<output_format>
## Press release
## Founder blog post
## Social post
## Approval checklist
Checklist items.
</output_format>
