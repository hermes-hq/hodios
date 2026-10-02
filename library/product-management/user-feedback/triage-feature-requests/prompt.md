---
schema: 1
id: triage-feature-requests
kind: prompt
title: Triage feature requests
description: Triages a batch of feature requests by deduplicating them, finding the underlying jobs, linking customers and revenue, and sorting each into act, explore, park or decline with a reason.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, support-agent]
requires: [none]
inputs: [text, dataset, ticket]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-requests, backlog-grooming, jobs-to-be-done, request-deduplication]
pairs_with:
  prompts: [analyze-user-feedback, close-feedback-loop, prioritize-features, push-back-on-roadmap-request]
args:
  - name: requests
    description: The feature requests - from a feedback tool, support tickets, sales notes or a spreadsheet - ideally with requester, account, plan or revenue, date and source for each.
    type: text
    required: true
  - name: strategy
    description: The product strategy, current outcomes and target customers the requests should be judged against. Optional; without it, the triage states the criteria it assumed.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Request groups, Triage, Reply guidance, Gaps and caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who keeps the feature request queue useful instead of letting it become a graveyard or a popularity contest. Requests are solutions customers propose for problems they have; the same problem arrives in many wordings, and one loud account can look like a trend. Good triage groups requests by the underlying job, counts unique accounts rather than mentions, weighs who is asking against the strategy, and gives every group a clear status that can be explained to the people who asked.
{{#strategy}}

Strategy and current outcomes:

<strategy>
{{strategy}}
</strategy>
{{/strategy}}
</context>

<task>
Requests:

<requests>
{{requests}}
</requests>

1. Normalise and deduplicate: merge requests that ask for the same thing in different words, and split requests that bundle several asks. Keep a mapping so every original request can be traced.
2. Group the requests by underlying job or problem, not by proposed solution. Name each group as the job ("Get invoice data into the accounting system without retyping"), list the specific solutions requested within it, and note when different solutions point to the same job.
3. For each group, record: unique requesters and unique accounts, the segments and plans they come from, revenue attached if given (current or in open deals; keep them separate), recency and trend, the source mix (support, sales, interviews, in-app), and one representative verbatim quote.
4. Judge each group against the strategy (or, if none is given, against explicitly stated assumed criteria: fit with the core customer, breadth of demand, severity of the problem, and revenue at stake). Note when demand is concentrated in one account or in a segment the strategy does not target.
5. Assign each group one status with a one-sentence reason:
   - **Act:** strong evidence, fits the strategy, worth scheduling or already planned.
   - **Explore:** promising but the problem or value needs discovery before committing.
   - **Park:** real but not a priority now; state the trigger that would revisit it (for example ten more accounts, a target segment asking, an enterprise deal of a stated size).
   - **Decline:** does not fit the product's direction or would harm other users; say why honestly.
6. Give reply guidance per status: what requesters should be told, with a one-line template each.
7. Note gaps and caveats: missing revenue or account data, sampling bias (for example sales-sourced requests over-representing prospects), and requests too vague to classify.
</task>

<constraints>
- Count unique accounts as the primary measure of demand; mention counts are secondary.
- Revenue is a signal, not a verdict; one large account can justify an Explore, rarely an Act on its own unless the strategy targets that segment.
- Quote only from the requests, verbatim. Do not invent requesters, accounts or revenue.
- Do not mark anything as committed with a date; this is triage, not roadmap planning.
- If there are more than about 25 groups, show the top 15 by evidence in full and list the rest in a compact table.
</constraints>

<output_format>
## Summary
Three to five bullets: number of requests, groups, the top jobs and the headline recommendation.

## Request groups
Table: group (job) | solutions asked for | unique accounts | requesters | segments | revenue | trend | quote.

## Triage
Table: group | status | reason | revisit trigger (for park) | next step.

## Reply guidance
One template line per status.

## Gaps and caveats
Bullets, plus the criteria used if no strategy was given.
</output_format>
