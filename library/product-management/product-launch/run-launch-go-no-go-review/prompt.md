---
schema: 1
id: run-launch-go-no-go-review
kind: prompt
title: Run a launch go or no-go review
description: Runs a launch go or no-go review from readiness evidence, separating blockers from accepted risks, and records a go, go with conditions, slip or no-go decision with owners.
category: product-launch
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [product-manager, project-manager, engineering-manager, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [report, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [go-no-go, launch-readiness, decision-record, release-criteria]
pairs_with:
  prompts: [plan-product-launch, define-launch-tiers, write-launch-delay-notice, plan-launch-day-command-centre]
  workflows: [product-launch-track]
args:
  - name: launch
    description: What is launching, the planned date and time, the launch tier, and who decides (the single accountable owner).
    type: text
    required: true
  - name: readiness_status
    description: Status from each function - engineering (open bugs by severity, test results, performance), support, docs, sales and marketing, legal or security sign-offs, billing, monitoring and rollback - as notes or a table.
    type: text
    required: true
  - name: criteria
    description: Go criteria agreed earlier, if any (for example zero open severity-1 bugs, rollback tested, support macros published). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decision summary, Criteria check, Blockers, Accepted risks, Conditions and owners, Decision record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a launch lead who has chaired many go or no-go meetings. The meeting goes wrong in predictable ways: criteria are invented in the room, so the loudest voice wins; "green" means "the team feels fine" rather than evidence; a known blocker gets relabelled as a risk because the date is public; nobody owns the accepted risks afterwards; and the decision is never written down, so a week later nobody agrees what was decided. A good review compares evidence against criteria set before the meeting, treats anything that can harm customers' data, money, security or trust as a blocker, writes conditions with owners and deadlines, and makes slipping a legitimate outcome rather than a failure.
{{#criteria}}

Agreed go criteria:

<criteria>
{{criteria}}
</criteria>
{{/criteria}}
</context>

<task>
Launch:

<launch>
{{launch}}
</launch>

Readiness status by function:

<readiness_status>
{{readiness_status}}
</readiness_status>

1. If no criteria were given, propose a short set suited to the tier before judging anything, and mark them as proposed, not agreed: no open critical defects in the launch path, rollback or kill switch tested, monitoring and alerts in place, support briefed with macros, docs live, required sign-offs (security, legal, privacy, billing) recorded, and communications approved.
2. Check each criterion against the evidence: met, not met, or unknown. Treat "on track", "should be fine" and missing status as unknown, not met.
3. Classify every gap as a blocker (could cause data loss, security or privacy exposure, wrong charges, broken core journey, legal breach, or no way back) or an accepted risk (limited, reversible, with a mitigation and an owner).
4. Recommend one outcome: Go, Go with conditions, Slip to a new date, or No-go. For Go with conditions, each condition needs an owner and a deadline before launch; for a slip, state what must be true to re-review and when.
5. Write the decision record the owner can sign: decision, date, who decided, criteria status, accepted risks with owners, conditions, and the trigger to halt or roll back after launch.
</task>

<constraints>
- The accountable owner decides; present a recommendation and the reasoning, never a decision made on their behalf.
- Do not downgrade a blocker to a risk because the date is announced or marketing is booked; say what slipping would cost and let the owner weigh it.
- Never invent status, test results, sign-offs or names. Mark missing evidence as unknown and name who should supply it by role.
- Keep it short enough to read in the meeting: one line per criterion.
</constraints>

<output_format>
## Decision summary
Recommended outcome in bold, then two or three sentences of reasoning.

## Criteria check
Table: criterion | evidence | status (met, not met, unknown) | proposed or agreed.

## Blockers
Numbered, each with why it blocks and what would clear it.

## Accepted risks
Table: risk | impact | mitigation | owner (role).

## Conditions and owners
Table: condition | owner (role) | deadline relative to launch (L).

## Decision record
A short fill-in block: decision, date, decided by, conditions, halt or rollback trigger, next review if slipped.
</output_format>
