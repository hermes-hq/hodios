---
schema: 1
id: mine-community-forum-feedback
kind: prompt
title: Mine community forum feedback
description: Turns community forum, chat server or subreddit threads into product feedback themes, weighing agreement and reach over reply counts and noting who the community represents.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, review]
role: [product-manager, developer-advocate, ux-researcher, founder]
requires: [none]
inputs: [text, transcript]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [community-feedback, forum-threads, online-community, power-users, theme-analysis, community-management]
pairs_with:
  prompts: [analyze-user-feedback, check-feedback-sampling-bias, close-feedback-loop, audit-feature-voting-board]
args:
  - name: threads
    description: The threads or messages (exported or pasted), with dates, reply counts and reactions where available. Remove usernames if you can.
    type: text
    required: true
  - name: community_context
    description: Which community it is (official forum, chat server, public subreddit), roughly how many members are active, and how they compare with your full user base.
    type: text
    required: true
  - name: question
    description: Optional. A specific question the team wants answered from the threads.
    type: text
output_contract:
  format: markdown
  sections: [Who is speaking, Themes, Problems versus requested solutions, Sentiment and tone shifts, What not to conclude, Replies worth making, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn community discussion into product evidence. Communities are valuable because people explain their workflows in detail and argue with each other, which surfaces needs surveys miss. They also mislead in predictable ways. A handful of regulars write most posts. Long threads reflect controversy as much as importance. Members are more expert and more invested than typical users, and people who left the product are absent. Workarounds shared between members are strong evidence of a real gap. Agreement from many distinct people (replies saying "same here", reactions) is a better signal than one long rant. And a community's mood can swing after one announcement, so look at dates.

{{#question}}Question to answer: {{question}}{{/question}}
</context>

<task>
<threads>
{{threads}}
</threads>

<community_context>
{{community_context}}
</community_context>

1. Who is speaking: how many distinct people appear, how concentrated posting is (share from the top few posters), and how the community differs from the full user base.
2. Themes: group posts into themes with counts of distinct people, agreement signals, dates, and one or two short paraphrased or brief verbatim quotes without usernames.
3. Problems versus requested solutions: for each theme, the underlying problem separately from what people asked to be built, and any workarounds members share.
4. Sentiment and tone shifts: changes over time and what event they follow, if the dates show it.
5. What not to conclude: claims the threads cannot support (prevalence across all users, the views of people who left or never post).
6. Replies worth making: threads where a product team reply would close a loop, correct a misunderstanding or ask a follow-up, with a note on tone. Do not promise features.
</task>

<constraints>
- Count distinct people, not posts; note when a theme comes mostly from one or two members.
- Strip usernames and personal details from quotes; keep quotes short.
- Do not treat community feedback as representative; recommend a check with other sources for themes that would drive big decisions.
- If the threads are too few to analyse (fewer than about ten distinct people), say so and give a lighter summary.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who is speaking
Short paragraph with figures.

## Themes
Table: theme | distinct people | agreement signals | period | quote.

## Problems versus requested solutions
Table: theme | underlying problem | requested solution | workarounds shared.

## Sentiment and tone shifts
Bullets with dates.

## What not to conclude
Bullets.

## Replies worth making
Table: thread | why reply | suggested approach.

## Questions
What to confirm.
</output_format>
