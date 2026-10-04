---
schema: 1
id: audit-feature-voting-board
kind: prompt
title: Audit a feature voting board
description: Audits a public feature request or upvote board for what the votes really mean - who votes, duplicates, campaigns, solutions hiding problems, silent segments - and turns them into weighted demand.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review, discover]
role: [product-manager, founder, operations-manager]
subject: [saas]
requires: [none]
inputs: [text, dataset]
output: [report, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [feature-voting, upvotes, feature-requests, weighted-demand, community-board, vote-inflation]
pairs_with:
  prompts: [triage-feature-requests, check-feedback-sampling-bias, close-feedback-loop]
args:
  - name: board_export
    description: The board export or a paste of the top posts - title, description, vote count, status, created date, and if possible who voted (account, plan) and comments.
    type: text
    required: true
  - name: customer_segments
    description: Optional. Your customer mix (plans, company sizes, regions, revenue share) so votes can be weighted against it.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Who is voting, Vote quality issues, Weighted demand, Problems behind the requests, Board changes, Replies to post, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit a public feature voting board (for a SaaS product, an app, a game or an open community) so the product team stops reading vote counts as a ranking. Votes measure how many board visitors clicked, which depends on who visits the board, how long a post has been up, whether it was shared on social media or in a customer's Slack, and how it was worded. Old posts accumulate votes; duplicates split them; a post titled as a solution ("add Gantt charts") collects votes from people with different problems.

The useful output is demand weighted by who is asking and why, a cleaner board, and honest replies to the oldest, most voted posts.
</context>

<task>
<board>
{{board_export}}
</board>

{{#customer_segments}}
<customer_segments>
{{customer_segments}}
</customer_segments>
{{/customer_segments}}

1. Who votes: count distinct voters if possible, the share of votes from the top 10% of voters, the plan or segment mix of voters against the customer mix, and the share of votes from non-customers or free users.
2. Vote quality: find duplicates and near-duplicates (merge candidates with combined votes), age effects (votes per month since posting rather than total), spikes suggesting a campaign or social share (many votes in a few days, new accounts), and vague or multi-request posts.
3. Weighted demand: for each of the top 15-20 posts, compute votes per month, distinct paying accounts, and if segments are given, a weight by segment (for example by revenue share or strategic segment). Show the formula used and how the ranking changes from raw votes.
4. Problems behind the requests: group posts by the underlying problem or job, not the requested feature, using the descriptions and comments. Note where several requests share one problem and could be solved together.
5. Board changes: merge rules, a post template asking for the problem and current workaround, status labels with honest meanings, a rule for closing stale posts, and when to show vote counts.
6. Replies: draft short replies for the three to five oldest high-vote posts with an honest status (planned, not planned, need to learn more), without dates you have not been given.
</task>

<constraints>
- Use only the data given. If voter identities are not in the export, say which analyses are limited and do the rest.
- Never promise delivery dates or commit to building anything in the drafted replies; mark any decision you need from the team as [decision].
- Do not treat a campaign spike as invalid demand; report it separately and explain what it does and does not show.
- If the export is empty or only lists titles without votes, ask for vote counts and dates and stop.
</constraints>

<output_format>
## Summary
Three to five bullets.

## Who is voting
Table: measure | value | note.

## Vote quality issues
Bullets grouped by duplicates, age effects, spikes, vague posts.

## Weighted demand
Table: post or merged group | raw votes | months open | votes per month | paying accounts | weighted score | raw rank | new rank. Formula stated above the table.

## Problems behind the requests
Table: underlying problem | posts | combined signal | note.

## Board changes
Numbered list.

## Replies to post
Each reply under the post title, under 80 words.

## Questions
Up to five.
</output_format>
