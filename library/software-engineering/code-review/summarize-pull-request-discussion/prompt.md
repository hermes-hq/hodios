---
schema: 1
id: summarize-pull-request-discussion
kind: prompt
title: Summarise a pull request discussion
description: Condenses a long pull request thread into decisions made, open questions with owners, outstanding requested changes and what blocks merge. Use when returning to or joining a long-running PR.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer]
stack: []
requires: [none]
inputs: [text]
output: [summary, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [review-thread, merge-blockers, catch-up, open-questions]
pairs_with:
  prompts: [respond-to-review-comments, walk-through-pull-request]
args:
  - name: thread
    description: The PR conversation copied in order, including review comments, replies, resolved markers, commit pushes and CI status lines if present. Keep author names and dates.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Status, Decisions, Outstanding changes, Open questions, Blocking merge]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Someone needs to act on a pull request whose discussion has grown too long to reread: the author back from leave, a new reviewer taking over, or a lead deciding whether to merge. Long threads hide three things: decisions that were reversed later, requests that look resolved but were never addressed in code, and questions nobody owns. A useful summary tracks the latest state of each topic, not the order things were said, and lets the reader act in two minutes.
</context>

<task>
<thread>
{{thread}}
</thread>

1. Group the conversation by topic (a design choice, a bug, a naming debate, a test request), not by comment order.
2. For each topic, find its latest state. A later comment overrides an earlier one; "resolved" markers, "done", "fixed in abc123" and a following commit count as addressed only if the thread says what changed. If someone says "done" but a reviewer later disagrees, it is still open.
3. Classify each topic:
   - **decision:** agreed, with who agreed and the reason if given;
   - **outstanding change:** requested and not yet confirmed done, with who asked and whether it blocks;
   - **open question:** unanswered or disputed, with the person best placed to answer (the person asked, or the code owner if stated);
   - **dropped:** raised and explicitly withdrawn or deferred, with any follow-up ticket.
4. Determine what blocks merge: requested-changes reviews not yet re-approved, blocking comments outstanding, failing or pending required checks mentioned in the thread, unresolved disagreements, and missing approvals if the thread shows the requirement.
5. Write the next action for the reader at the top.
</task>

<constraints>
- Use only what the thread says. Never invent decisions, owners, commits or check results; if ownership is unclear, write "owner unclear".
- Quote short phrases (under 15 words) when the exact wording matters to a decision or a disagreement.
- Keep names as they appear in the thread. Do not characterise people's tone or motives.
- If the thread looks truncated or out of order, say so in Status.
- The whole summary fits on one screen: about 300 words plus tables.
</constraints>

<output_format>
## Status
Two or three lines: where the PR stands, the next action and who owns it.
## Decisions
Bullets: the decision, who agreed, date if available.
## Outstanding changes
Table: Change | Requested by | Blocking? | Evidence it is not done.
## Open questions
Table: Question | Asked by | Who should answer.
## Blocking merge
Bullets of what must happen before merge, or "Nothing visible in the thread".
</output_format>
