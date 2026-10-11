---
schema: 1
id: plan-systematic-review-update
kind: prompt
title: Plan a systematic review update
description: Decides whether a systematic review needs updating, then plans the update, covering question changes, search from the last date, re-appraisal, new methods, and how changed conclusions are reported.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [researcher]
requires: [none]
inputs: [document, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [review-update, living-review, systematic-review, evidence-synthesis, search-update]
pairs_with:
  prompts: [build-search-string, write-systematic-review-protocol, write-prisma-flow-report, plan-meta-analysis]
  personas: [research-librarian, research-methodologist]
args:
  - name: review
    description: The existing review's question, search date, methods summary, main findings and certainty, or its abstract and methods section.
    type: text
    required: true
  - name: new_information
    description: Optional. What has changed since, such as new trials you know of, new methods guidance, changed practice, questions from users of the review.
    type: text
output_contract:
  format: markdown
  sections: [Update decision, What changes, Search and selection, Methods carried over and revised, Reporting the update]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A review update is worth doing when the question is still relevant and new evidence or methods could change its conclusions or certainty. A widely used decision framework (from an international panel on updating systematic reviews, adopted by Cochrane) asks three things in order: is the review still current and relevant; are there new relevant studies or new methods; and would they be likely to change findings or credibility. Updates go wrong when teams simply rerun the old search from the last date without checking that indexing terms changed, when they add studies but keep outdated methods (for example an old risk-of-bias tool), when the question drifts without being flagged as a new review, and when the update hides which conclusions changed. A living systematic review is an option when evidence moves fast and the question is a priority.
</context>

<task>
Plan an update of this review:
<review>
{{review}}
</review>
{{#new_information}}
<new_information>
{{new_information}}
</new_information>
{{/new_information}}

1. Apply the decision questions: relevance now, likely new studies or methods (say how to check, for example a scoping search and trial registries), and whether these could change conclusions or certainty. Give a recommendation: update now, update later with a trigger, convert to a living review, or retire or replace the review.
2. Decide what changes: keep the question, refine it (state the change and why), or start a new review if the PICO changes substantially.
3. Plan the search: rerun from a date that overlaps the last search (state the overlap and why), check that subject headings and database coverage have changed, add sources missing before (registries, preprints), and plan de-duplication against previously screened records.
4. Plan selection: apply criteria to new records and say whether previously excluded studies must be rescreened if criteria change.
5. List methods to carry over and methods to revise (risk-of-bias tool version, effect measures, GRADE, reporting guideline), and whether previously included studies are re-appraised with any new tool.
6. Plan reporting: a "what's new" section, a table comparing old and new conclusions and certainty, a PRISMA flow diagram for updates, and authorship and date conventions. If living, plan the search frequency and when results are republished.
</task>

<constraints>
- Do not claim specific new studies exist; describe how to find them.
- Be explicit when a change makes it a new review rather than an update.
- Do not recommend updating when the question is obsolete or the review's conclusions are already secure; say so.
- Keep the plan proportionate to the team's resources if stated.
</constraints>

<output_format>
## Update decision
A table: decision question | answer | evidence or check needed. Then the recommendation.
## What changes
Question and scope changes, or none.
## Search and selection
Bullets.
## Methods carried over and revised
A table: method | original | update | reason.
## Reporting the update
Bullets, including the old-versus-new conclusions table template.
</output_format>
