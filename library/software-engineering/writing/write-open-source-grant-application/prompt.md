---
schema: 1
id: write-open-source-grant-application
kind: prompt
title: Write an open-source grant application
description: Drafts an open-source grant application with the problem and users, priced milestones, maintainer capacity, sustainability after the grant and measurable outcomes, fitted to the funder's questions.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, founder]
stack: []
requires: [none]
inputs: [notes, document, text]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source-funding, grant-writing, milestones, sustainability, milestone-budget]
pairs_with:
  prompts: [choose-oss-funding-model, set-up-oss-growth-metrics]
  personas: [grant-writer]
args:
  - name: project_description
    description: The project - what it does, who uses it and how much (downloads, dependents, notable users), maintainers and their time, the work you want funded, rough costs and anything that shows need (issues, security gaps, user requests).
    type: text
    required: true
  - name: funder_questions
    description: The funder's questions or form fields with word or character limits, their priorities and eligibility rules, and the maximum amount and duration.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Answers, Milestones and budget, Gaps to fill, Reviewer's view]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Funds for open-source work (public-interest technology funds, foundation programmes, security funds, company open-source programmes) receive many applications from projects that are useful but describe themselves badly. Applications fail when they explain the technology instead of who benefits, ask for "general maintenance" with no deliverables, give a budget that does not map to work, ignore the funder's stated priorities, and have no answer to "what happens when the money runs out". Reviewers score against the funder's own criteria, often quickly, so each answer must stand alone and fit its limit.
</context>

<task>
<project_description>
{{project_description}}
</project_description>

<funder_questions>
{{funder_questions}}
</funder_questions>

1. Fit check: compare the project and the requested work with the funder's priorities and eligibility. Say where the fit is strong, where it is weak, and whether to apply, reframe or skip. Point out any eligibility rule the project may fail (entity type, licence, country, prior funding).
2. Frame the problem for the funder: who depends on the project (end users, downstream projects, public institutions), what breaks or stays insecure without the work, and evidence from the description (usage numbers, dependents, open issues, advisories).
3. Turn the work into three to six milestones, each a verifiable deliverable (a release, an audit fixed, a feature merged and documented), with the effort in person-days or weeks, the cost, and the dates. Make the budget add up exactly: hourly or daily rate times effort, plus any other costs the funder allows.
4. Capacity: who does the work, their track record on the project, and how review and continuity are handled if one person is unavailable.
5. Sustainability: what continues after the grant (maintenance by whom, other funding sources, reduced maintenance cost because of the work), stated honestly.
6. Outcomes: two to four measurable outcomes the funder can check, with baseline and target where possible.
7. Answer every funder question in their order, within its limit, reusing the material above and using the funder's own vocabulary where it fits.
8. Review as a sceptical reviewer would: the three weakest points and how to fix each before submitting.
</task>

<constraints>
- Use only facts and numbers from the description. Write [X] for missing figures (usage, rates, dates) and list them; never invent users, download counts, endorsements or prior grants.
- Respect every word or character limit; state the count after each answer.
- Do not overpromise: deliverables must fit the effort and the duration.
- Do not state eligibility, tax or legal rules as fact; tell the applicant what to confirm with the funder or a fiscal host.
</constraints>

<output_format>
## Fit check
Verdict (apply, reframe, skip) and four to six bullets.
## Answers
Each funder question as a heading, the answer, then "(N words)".
## Milestones and budget
Table: milestone, deliverable, effort, cost, due. Then the total and how it was calculated.
## Gaps to fill
Numbered [X] items.
## Reviewer's view
Three weaknesses with fixes.
</output_format>
