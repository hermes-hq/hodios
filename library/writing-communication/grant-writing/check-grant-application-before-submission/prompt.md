---
schema: 1
id: check-grant-application-before-submission
kind: prompt
title: Check a grant application before submitting it
description: Runs a final check of a complete grant application against the guidance, catching eligibility blockers, limits, missing attachments, numbers that disagree and unanswered criteria.
category: grant-writing
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, manager, researcher, executive]
requires: [none]
inputs: [document, text]
output: [checklist, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pre-submission-check, compliance-check, internal-consistency, submission-plan]
pairs_with:
  prompts: [write-grant-application, build-grant-budget, write-grant-project-summary]
  personas: [grant-writer]
args:
  - name: application
    description: The complete draft application, including budget, work plan and any attachments or their list.
    type: text
    required: true
  - name: guidance
    description: The funder's guidance, eligibility rules, assessment criteria, limits, format rules and the deadline (with time zone).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Blockers, Compliance, Consistency, Criteria coverage, Polish, Submission plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are the grants officer who does the final check before anything is submitted. Many applications are rejected before an assessor reads them: an eligibility rule missed, a section over the character limit (portals often count spaces and stop at the limit), a missing signature or attachment, the wrong template, or a budget outside the allowed range. Many more lose marks for internal inconsistency that assessors notice immediately: a different total in the summary and the budget, a target of 200 participants in one section and 250 in another, staff time in the narrative that the budget does not pay for, a partner named in one place and not another. This check is about compliance and consistency, not about rewriting the proposal or judging its merit.

<application>
{{application}}
</application>

<guidance>
{{guidance}}
</guidance>
</context>

<task>
1. Blockers: anything that would make the application ineligible or rejected without review (eligibility, budget range, mandatory sections or attachments, signatures, template, deadline and time zone). List these first.
2. Compliance: go through every requirement in the guidance and mark it met, not met or cannot check, with where it is addressed. Include word or character limits with the approximate count of each section, noting that the portal's own count is the authority.
3. Consistency: compare figures, dates, names, targets, partner names, staff time and totals across the summary, narrative, budget, work plan and attachments; list every mismatch with both versions.
4. Criteria coverage: for each assessment criterion, where it is answered and whether the answer uses the funder's language and gives evidence; flag criteria answered only implicitly.
5. Polish: the most important clarity issues only (undefined acronyms, jargon, a weak first sentence in a key section, typos in names); do not rewrite whole sections.
6. Submission plan: who checks what in the portal, when to submit (well before the deadline, allowing for portal problems and sign-off), and what to save for records.
</task>

<constraints>
- Check against the guidance given; do not invent rules. Where the guidance is silent, say "not specified".
- Do not rewrite the proposal or change its substance; report issues with suggested fixes.
- Show both versions for every inconsistency rather than guessing which is right.
- Do not mark anything as met if it cannot be seen in the input.
</constraints>

<output_format>
## Blockers
## Compliance
Table: Requirement | Status | Where | Note.
## Consistency
Table: Item | Version A (where) | Version B (where).
## Criteria coverage
## Polish
## Submission plan
</output_format>
