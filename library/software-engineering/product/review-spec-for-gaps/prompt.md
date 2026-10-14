---
schema: 1
id: review-spec-for-gaps
kind: prompt
title: Review a spec for gaps before kickoff
description: Reviews a PRD or feature spec before engineering kickoff for ambiguous wording, untestable requirements, missing states and roles, contradictions and unstated dependencies, with a fix for each.
category: product
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, tech-lead, qa-engineer, business-analyst]
stack: []
requires: [none]
inputs: [spec, document, text]
output: [report, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [spec-review, ambiguity, kickoff, requirements]
pairs_with:
  personas: [product-manager]
  prompts: [write-prd, list-feature-edge-cases, define-non-functional-requirements]
args:
  - name: spec
    description: The PRD, spec or epic description to review, as written.
    type: text
    required: true
  - name: reviewer_focus
    description: Optional emphasis, for example estimation readiness, testability, security, or a specific platform.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Blocking gaps, Ambiguities, Contradictions, Missing coverage, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A spec review before kickoff is the cheapest moment to find problems; after build starts, each gap becomes rework or a silent assumption. Experienced reviewers read for specific failure patterns rather than general impressions: weasel words that cannot be tested ("fast", "intuitive", "support", "handle", "etc."), requirements that describe a solution but not the problem, two sections that disagree on a number or rule, roles and states that appear in one place and not another, missing error, empty and permission cases, data that must come from somewhere nobody named, and success metrics without a baseline. The review is most useful when each finding quotes the spec text, says why it matters to the build, and proposes concrete replacement wording, and when it separates what blocks estimation from what can be decided during the build.
</context>

<task>
<spec>
{{spec}}
</spec>
{{#reviewer_focus}}
<focus>
{{reviewer_focus}}
</focus>
{{/reviewer_focus}}

1. Read the whole spec and identify its goal, users, scope and the decisions it claims to have made.
2. Find blocking gaps: anything without which engineers cannot estimate or design, such as an undefined core rule, missing data source, unknown scale, or an unresolved dependency on another team.
3. Find ambiguities: quote each vague or untestable phrase and propose testable wording with a concrete number or behaviour, marked as a proposal.
4. Find contradictions between sections, with both quotes.
5. Check coverage of: each role and permission, empty, loading, error and offline states, limits and boundaries, existing data and users, notifications, analytics, accessibility, localisation, non-functional needs, rollout and rollback. Report only what is missing and relevant to this feature.
6. Give a verdict: ready for kickoff, ready with listed fixes, or not ready, with the shortest path to ready.
7. Write the questions for the author, ordered by impact.
</task>

<constraints>
- Quote the spec for every finding; do not report problems in text that is not there.
- Proposed wording is a suggestion for the author, never presented as a decision.
- Do not pad the review with generic checklist items that do not apply to this feature.
- Do not rewrite the whole spec; the output is a review.
- If the input is not a spec (for example a one-line idea), say so and suggest what to write first.
</constraints>

<output_format>
## Verdict
One line: ready / ready with fixes / not ready, plus the path to ready.
## Blocking gaps
Numbered: quote or location, why it blocks, proposed fix.
## Ambiguities
Table: quote, problem, proposed wording.
## Contradictions
Bullets with both quotes.
## Missing coverage
Bullets per area, only those relevant.
## Questions for the author
Numbered, highest impact first.
</output_format>
