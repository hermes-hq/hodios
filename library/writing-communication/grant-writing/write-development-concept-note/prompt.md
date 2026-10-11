---
schema: 1
id: write-development-concept-note
kind: prompt
title: Write a concept note for a development donor
description: Writes a concept note for an international development or humanitarian donor with the problem, theory of change, results, partners, budget range, risks and safeguarding, in the donor's format.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer, manager, executive, consultant]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [concept-note, international-development, humanitarian, donor-funding, theory-of-change, localisation]
pairs_with:
  prompts: [build-theory-of-change, write-grant-risk-register, plan-consortium-grant-bid]
  personas: [grant-writer]
args:
  - name: project
    description: The problem and context (country, region, population, evidence), what the project will do, expected results, local partners and their roles, duration, rough budget, the organisation's experience in the area, and known risks.
    type: text
    required: true
  - name: donor
    description: The donor or call - its priorities, the concept note template or questions, length limit, eligibility (for example local registration, partner requirements), and budget range. Paste the call text where you can.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit and eligibility, Concept note, Results summary, Gaps and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a programme development adviser for international NGOs. Bilateral, multilateral and foundation donors in development and humanitarian work often use a short concept note to shortlist applicants for a full proposal. Reviewers want to see that the problem is analysed with local evidence and its causes, that the intervention logic holds (activities lead to outputs, outputs to outcomes, outcomes to the donor's objective) with explicit assumptions, that results are measurable, that local partners and affected people have a real role rather than a name on the list, that the organisation has delivered similar work in that context, and that risks, safeguarding, gender and conflict sensitivity are thought through. Common faults: problem statements that describe a country rather than a specific population and cause, activity lists with no change logic, inflated beneficiary numbers (double counting across activities), partners added for appearance, and budgets out of line with the donor's range. Concept note templates differ by donor; the donor's template and limit decide.
</context>

<task>
Write the concept note.

<project>
{{project}}
</project>

<donor>
{{donor}}
</donor>

1. Fit and eligibility: compare the project with the donor's priorities, eligibility rules and budget range; flag blockers first.
2. Concept note, following the donor's template and limit if given. Otherwise use: title and summary (location, duration, budget, partners, one-sentence purpose); context and problem analysis (who is affected, how, root causes, evidence, gaps in current response); intervention logic (overall objective, outcomes, key outputs and activities, and the assumptions linking them); target groups (direct and indirect, how numbers were estimated, how they are selected, gender, disability and age considerations); partners and roles (including how affected people and local organisations shape decisions); organisational capacity and experience in the context; sustainability and exit; main risks with mitigation, including safeguarding and do-no-harm; indicative budget by main heading; monitoring, evaluation and learning in brief.
3. Results summary: a short table of objective, outcomes and outputs with one or two indicators each.
4. Gaps and checks: missing facts as [NEEDED: ...], beneficiary counting to verify for double counting, and items to confirm with the donor.
</task>

<constraints>
- Never invent statistics, beneficiary numbers, partner names, past results or budget figures; use placeholders.
- Do not state donor rules, templates or ceilings from memory; use the donor input and tell the user to check the current call.
- Describe local partners and communities with respect and accuracy; avoid deficit language and imagery of helplessness.
- Keep the budget indicative and consistent with the activities and the donor's range.
</constraints>

<output_format>
## Fit and eligibility
## Concept note
Under the donor's headings, or the default ones above.
## Results summary
Table: Level | Statement | Indicator.
## Gaps and checks
</output_format>
