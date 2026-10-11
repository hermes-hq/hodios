---
schema: 1
id: triage-agent-pull-requests
kind: prompt
title: Triage agent pull requests
description: Triages a backlog of agent-opened pull requests into merge, fix by hand, re-run with a better brief or close, with the reason, the follow-up and the order to handle them in.
category: meta
version: 1.0.0
status: incubating
stage: [review]
role: [tech-lead, maintainer, software-engineer]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, pull-request, backlog-triage, review-load]
pairs_with:
  prompts: [pick-best-agent-attempt, make-issue-agent-ready, mine-review-comments-for-agent-rules, verify-agent-completion-claims]
args:
  - name: pull_requests
    description: One line or short block per pull request - title, linked issue, size (files and lines), CI status, age, conflicts, review comments so far and any notes.
    type: text
    required: true
  - name: capacity
    description: How much review time you have this week, and any priorities (release, freeze, areas that need a specific reviewer).
    type: text
output_contract:
  format: markdown
  sections: [Triage table, Order, Re-run briefs, Patterns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents open pull requests faster than people review them, and the backlog decays: bases go stale, conflicts pile up and context is lost. Reviewing each in arrival order wastes the scarcest resource, reviewer attention. Useful triage looks at cost and value together. A small green pull request on a clear issue is cheap to merge. A large diff for a small issue usually means scope creep and is cheaper to re-run with a tighter brief than to review. A red one that failed because the brief was ambiguous should be re-run with a fixed brief, not patched. Several pull requests touching the same files conflict, so their order matters. Some should simply close: the issue was resolved elsewhere, the approach is wrong, or nobody wants the change. Patterns across the backlog (the same failure repeated) point at a missing instruction-file rule.
</context>

<task>
Triage these pull requests.
<pull_requests>
{{pull_requests}}
</pull_requests>
{{#capacity}}
<capacity>
{{capacity}}
</capacity>
{{/capacity}}

1. For each pull request, judge value (issue importance, user impact) and review cost (size against the issue's scope, CI state, conflicts, risky areas touched).
2. Assign one decision: merge after a quick review, fix by hand (small, specific gap), re-run with a better brief (wrong scope or misunderstood task), or close (obsolete, unwanted, wrong approach). Give the reason in one line.
3. For merge and fix decisions, list what the reviewer should check first.
4. For re-run decisions, write the brief changes: what was missing or ambiguous and the added constraint or acceptance check.
5. Order the work within the capacity: cheap high-value merges first, then pull requests that unblock others or conflict with them, then the rest. Note which to rebase after which.
6. Name patterns across the backlog and the instruction-file rule or issue-template change that would prevent each.
</task>

<constraints>
- Judge only from the information given. If a pull request lacks the facts for a decision, mark it "needs a look" and say what to check.
- Do not recommend merging anything with failing CI or unresolved blocking review comments.
{{> output/uncertainty}}
</constraints>

<output_format>
## Triage table
Table: pull request, decision, reason, first check or follow-up.
## Order
Numbered list within the capacity, with rebase notes.
## Re-run briefs
One short block per re-run.
## Patterns
Bullets: pattern, count, prevention.
</output_format>
