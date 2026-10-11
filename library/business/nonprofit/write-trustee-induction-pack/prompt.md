---
schema: 1
id: write-trustee-induction-pack
kind: prompt
title: Write a trustee induction pack
description: Writes an induction pack and first-six-months plan for a new nonprofit board member, covering duties, the organisation, how to read the accounts, key risks and who to ask, in plain language.
category: nonprofit
version: 1.0.0
status: incubating
stage: [build]
role: [executive, manager]
requires: [none]
inputs: [document, notes]
output: [docs, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [nonprofit]
tags: [trustees, board-induction, governance, new-trustee]
pairs_with:
  prompts: [build-board-skills-matrix, run-board-self-assessment]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: The organisation's purpose, services, size, income sources, staff and volunteer numbers, legal form and country, and the current strategy.
    type: text
    required: true
  - name: board_papers
    description: Anything a new trustee should know, pasted or summarised - latest accounts summary, risk register headlines, board calendar, committees, policies, current issues.
    type: text
    required: true
  - name: new_member
    description: Optional. The new member's background and role (for example treasurer, or a trustee with lived experience), so the pack can be tailored.
    type: string
output_contract:
  format: markdown
  sections: [Welcome, Your duties, The organisation in one page, Reading our numbers, Risks and current issues, How the board works, First six months, Glossary, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write induction material for people joining a nonprofit board. New trustees often get a box file of policies and are left to work out the rest; many take a year to contribute with confidence, and some never learn to read the accounts or know which risks keep the chief executive awake. A good pack is short, specific to this organisation, explains the legal duties in plain words (acting in the organisation's interests, prudence with its money, managing conflicts, collective responsibility), shows the numbers that matter on one page, and sets up conversations rather than replacing them. It respects that a trustee with lived experience or no finance background is a full member of the board.

Organisation: {{organisation}}
<board_papers>
{{board_papers}}
</board_papers>
{{#new_member}}New member: {{new_member}}{{/new_member}}
</context>

<task>
1. Welcome: a short note from the chair's point of view on why the board recruited this person and what it hopes they bring.
2. Your duties: the core duties of a board member in plain language, with one example each of what they look like here (for example declaring a conflict when a contract goes to a relative's firm). Note that the exact legal duties depend on the country and legal form.
3. The organisation in one page: purpose, who it serves, services, people, income mix, and the strategy in three lines.
4. Reading our numbers: the five figures to watch (for example income against budget, unrestricted reserves in months of costs, restricted versus unrestricted funds, cash flow, the biggest funder's share of income), what each means and what would worry an experienced trustee. Use only figures in the papers.
5. Risks and current issues: the top risks and live issues from the papers, each with what the board is doing about it.
6. How the board works: meeting calendar, committees, how papers arrive, how decisions are made and minuted, delegations to staff, and how to raise a concern between meetings.
7. First six months: a checklist with meetings to have (chair, chief executive, treasurer, a service visit, meeting people who use the services), documents to read in order, and a check-in with the chair at three months. Tailor it to the new member's role if given.
8. A glossary of terms and acronyms used in the papers.
9. List what is missing from the papers that the pack should include.
</task>

<constraints>
- Use only facts from the input. Mark missing facts [to add] instead of inventing figures, policies or names.
- State legal duties as general principles and say to check the regulator's guidance and governing document for the country and legal form.
- Plain language; explain every acronym the first time.
- Keep the core pack readable in under 30 minutes; put detail in the glossary or appendices.
</constraints>

<output_format>
## Welcome
## Your duties
## The organisation in one page
## Reading our numbers
Table: Figure | Current value | What it means | What would worry us.
## Risks and current issues
## How the board works
## First six months
Checklist with timings.
## Glossary
## Gaps to fill
</output_format>
