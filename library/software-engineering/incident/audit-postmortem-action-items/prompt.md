---
schema: 1
id: audit-postmortem-action-items
kind: prompt
title: Audit postmortem action items
description: Reviews action items across recent postmortems for done, stale and vague items and repeated systemic themes, and rewrites each open item to be specific, owned, dated and verifiable.
category: incident
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [sre, engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [document, ticket, text]
output: [report, table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [postmortem-follow-up, action-items, systemic-causes, reliability-review]
pairs_with:
  prompts: [write-postmortem, build-incident-timeline, define-slos]
  personas: [site-reliability-engineer]
args:
  - name: action_items
    description: Action items from several postmortems - incident id or title and date, the item text, owner, due date, status and ticket link if any. A tracker export or pasted lists are fine. Short incident summaries help with theme detection.
    type: text
    required: true
  - name: review_date
    description: The date to measure staleness against (YYYY-MM-DD). Defaults to the most recent date in the input.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Item review, Rewritten open items, Themes, Recommendations, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Postmortems are only worth the follow-through. Across teams the same pattern shows up: items written in the heat of the review ("improve monitoring", "be more careful with deploys") are never done because nobody can tell what done means; small items close while the one structural fix sits for months; and the same contributing factor appears in incident after incident because each review treats it as new. An audit closes the loop: what was promised, what happened, and what the pattern says about where to invest.

{{#review_date}}Review date: {{review_date}}{{/review_date}}
</context>

<task>
<action_items>
{{action_items}}
</action_items>

1. Normalise every item into one table: incident, item, owner, due date, status, age in days at the review date.
2. Classify each item:
   - done (closed, with evidence or a linked change);
   - stale (open and past due, or open more than 60 days with no update);
   - vague (no observable completion condition, no owner, or an owner that is a team or "TBD");
   - blame-shaped (asks people to "be careful", "remember" or "be retrained" instead of changing the system);
   - superseded or duplicate (same fix as another item).
3. Tag each item with a remediation type: detect (alerting, monitoring), mitigate (runbooks, kill switches, rollback), prevent (tests, validation, guardrails in tooling), or process (review, ownership, documentation).
4. Rewrite every open item that is vague, stale or blame-shaped so it has: a concrete change, one named owner placeholder, a due date proposal, and a verification step that proves it ("a canary failing the 5xx check in staging auto-rolls back within 5 minutes, shown in a game day").
5. Find themes: contributing factors, systems or failure modes that appear in two or more incidents. For each, list the incidents and the open items that address it, and say whether those items would actually prevent a repeat.
6. Recommend at most three investments that address the strongest themes, and items to close as won't-do, with the reason.
</task>

<constraints>
- Use only the items and facts given. Do not invent owners, dates or completion evidence; put placeholders like [owner] and ask.
- Rewrites keep the original intent; if the intent is unclear, ask rather than guess.
- No blame of individuals. Rewrite "Engineer X to be more careful" into a system change.
- Mark an item done only if the input says so; "probably done" stays open with a question.
- Count and show the arithmetic for summary percentages.
</constraints>

<output_format>
## Summary
Totals: items, done, stale, vague, blame-shaped, duplicate; completion rate; median age of open items.
## Item review
Table: incident | item | owner | due | status | age | class | remediation type.
## Rewritten open items
Table: original | rewritten item | owner | proposed due | how we verify.
## Themes
For each theme: incidents, open items, will they prevent a repeat (yes, partly, no).
## Recommendations
Up to three investments, plus items to close as won't-do.
## Questions
Bullets, or "None".
</output_format>
