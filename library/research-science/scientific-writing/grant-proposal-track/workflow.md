---
schema: 1
id: grant-proposal-track
kind: workflow
title: Grant proposal track
description: Takes a research grant from funder fit to aims, approach, budget justification and a mock review with revisions, pausing for approval between steps. For researchers applying for funding.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan, design, build, review]
role: [researcher]
requires: [none]
inputs: [document, notes, spec]
output: [plan, article, table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [grant-writing, specific-aims, funding, budget-justification, mock-review]
pairs_with:
  prompts: [write-research-proposal, review-grant-proposal, write-data-management-plan, write-ethics-application]
  personas: [research-methodologist]
args:
  - name: funder_call
    description: The funding call or programme text, including eligibility, review criteria, page or word limits, budget rules and required sections. Paste it; a link alone is not enough.
    type: text
    required: true
  - name: research_idea
    description: Your idea in your own words, with preliminary data, team, track record and anything already drafted.
    type: text
    required: true
  - name: deadline
    description: The submission deadline, plus any internal deadline set by your research office, for example "funder 15 March, research office 1 March".
    type: string
  - name: slug
    description: Short kebab-case name for the proposal, used for the folder the step artifacts are saved in.
    type: string
    default: grant-proposal
steps:
  - {id: fit, file: steps/01-fit.md, stage: plan, gate: approve, artifact: "grants/{{slug}}/01-fit.md"}
  - {id: aims, file: steps/02-aims.md, stage: design, gate: approve, artifact: "grants/{{slug}}/02-aims.md"}
  - {id: approach, file: steps/03-approach.md, stage: build, gate: approve, artifact: "grants/{{slug}}/03-approach.md"}
  - {id: budget, file: steps/04-budget.md, stage: build, gate: approve, artifact: "grants/{{slug}}/04-budget.md"}
  - {id: mock-review, file: steps/05-mock-review.md, stage: review, gate: none, artifact: "grants/{{slug}}/05-review-and-revisions.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a grant proposal for the idea below against the call below, the way an experienced applicant and their research office would: check fit and eligibility first, then lock the aims, then write the approach, then justify the budget, and finally read the whole thing as a hostile but fair panel would. Each step writes one artifact and stops for approval, and later steps build on the approved artifacts instead of re-asking.

<funder_call>
{{funder_call}}
</funder_call>

<research_idea>
{{research_idea}}
</research_idea>

{{#deadline}}Deadline: {{deadline}}. Work back from the earliest deadline given and say at step 1 if the timeline is unrealistic.{{/deadline}}

Rules for every step:
- The funder's call is the specification. Quote its criteria, limits and required headings exactly, and map every section to the criterion it serves. If the call is silent on something, say so rather than assume another funder's rules.
- Never invent preliminary data, publications, collaborators, letters of support, costs, salary rates or institutional policies. Use clearly marked placeholders such as [PRELIMINARY DATA: pilot n and effect] and list them at the end of each artifact.
- Write in the applicant's voice for reviewers who are expert but busy and outside the exact subfield: the main point of each paragraph comes first, and every claim of need or novelty is something the applicant can support.
- Track page and word counts against the call's limits in every drafted section.
