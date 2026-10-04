---
schema: 1
id: audit-school-library-collection
kind: prompt
title: Audit a school library collection
description: Audits a school library collection for age fit, diversity, currency and curriculum fit, then plans weeding, the gaps to fill and a purchase priority list within budget.
category: teaching
version: 1.0.0
status: incubating
stage: [review, plan]
role: [teacher]
requires: [none]
inputs: [dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [school-libraries, collection-development, weeding, diverse-books, library-audit, purchasing-plan]
pairs_with:
  prompts: [plan-library-reading-programme, plan-information-literacy-session, build-course-reading-list]
args:
  - name: collection_summary
    description: What you know about the collection - total items, a breakdown by section or classification with item counts and publication years if your system can export them, circulation figures, condition, formats, and what staff and pupils say is missing. A pasted export or a rough summary both work.
    type: text
    required: true
  - name: age_range
    description: The ages or year groups the library serves, for example "11-18", "Reception to Year 6", "Grades 6-8".
    type: string
    required: true
  - name: budget
    description: The money available for new stock this year, with currency, and any restrictions such as "must include curriculum resources".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Snapshot, Findings, Weeding plan, Gaps to fill, Purchase priorities, Data to gather next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help school librarians and the teachers who run school libraries audit their collections. A collection audit asks whether the stock suits the readers it serves now: their ages and reading levels, the curriculum, the identities and languages in the school and the wider world, and the formats pupils actually choose. It finds what is out of date, worn or never borrowed, and what is missing. Weeding is a normal part of collection management: shelves full of out-of-date or tatty books hide the good ones and put readers off. Established criteria such as MUSTIE (misleading, ugly, superseded, trivial, irrelevant, elsewhere) and age-of-stock guides by subject help make weeding consistent and defensible.

<collection_summary>
{{collection_summary}}
</collection_summary>
Ages served: {{age_range}}
Budget: {{budget}}
</context>

<task>
1. Snapshot: what the data shows in five to eight lines: size, balance of fiction and non-fiction, average or median age of stock where computable, circulation patterns, and formats. Compute only from the numbers given and show how. If section counts do not add up to the total, say so and show the difference.
2. Findings under five headings:
   - Age and reading-level fit for {{age_range}}.
   - Diversity and representation: whether the summary suggests pupils will find characters, authors, cultures, languages, disabilities and family types that reflect them and others. Say plainly when the data cannot show this and how to check (a sample shelf audit).
   - Currency: sections where publication dates suggest information is likely out of date, especially science, technology, health, geography and careers, using typical age-of-stock guides as rules of thumb.
   - Curriculum fit: coverage against the subjects and topics in the summary, and what to ask departments.
   - Condition, formats and use: worn stock, demand for graphic novels, audiobooks, e-books, high-interest low-reading-age titles, and sections with low borrowing.
3. Weeding plan: criteria for each section, a process (pull, review with a second person, decide: keep, repair, replace, withdraw), how to handle classics and local or donated items, and how to dispose of or reuse withdrawn books. Estimate the scale only from the data.
4. Gaps to fill: a ranked list linked to findings.
5. Purchase priorities: a table that allocates {{budget}} across gaps, with the share for each and the reason, leaving a contingency for pupil requests. Do not list specific titles unless the user's summary names them; describe what to buy and how to choose (reviews, suppliers' lists, pupil input).
6. Data to gather next: what would make the next audit sharper.
7. Before answering, check that every figure in the snapshot comes from the summary or is shown as a calculation, and that the allocation adds up to the budget.
</task>

<constraints>
- Do not invent counts, percentages, circulation or publication data. Mark anything you need but do not have as "[data needed]".
- Base selection and withdrawal on the school's collection policy, curriculum and readers' needs. Do not recommend removing books because of a viewpoint or because a group objects to them; if the user raises a challenge to a book, point to the school's reconsideration procedure.
- Stay practical for a school library with limited staff time: suggest doing the weeding section by section over a term if needed.
- Use the school's own terms (year groups, grades, classification) as the summary does.
- If the summary has no information about the collection at all, ask for a few key numbers and stop.
</constraints>

<output_format>
## Snapshot
## Findings
Five subheadings, short bullets each.
## Weeding plan
## Gaps to fill
Numbered.
## Purchase priorities
Table: Priority | Area | What to buy | Share of budget | Why.
## Data to gather next
Bullets.
</output_format>
