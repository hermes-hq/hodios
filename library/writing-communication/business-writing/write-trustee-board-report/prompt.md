---
schema: 1
id: write-trustee-board-report
kind: prompt
title: Write a report to a charity board
description: Writes a report to a charity or nonprofit board with progress against plan, finances in brief, risks, safeguarding, decisions needed and papers to note, built only from the figures supplied.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive]
requires: [none]
inputs: [notes, document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
subject: [nonprofit]
tags: [board-report, trustees, charity-governance, chief-executive-report, voluntary-sector]
pairs_with:
  prompts: [write-status-report, write-executive-summary, write-decision-memo, write-annual-report-letter]
args:
  - name: period
    description: The period the report covers and the meeting it is for, for example "Q2 (July to September), board meeting 21 October".
    type: string
    required: true
  - name: updates
    description: Everything to report, in any order - progress on plans and projects, service numbers, income and spending against budget, reserves, staffing and volunteers, risks, safeguarding concerns and incidents, complaints, regulatory or compliance matters, fundraising, partnerships.
    type: text
    required: true
  - name: decisions_needed
    description: Decisions the board must take at this meeting, with the options and your recommendation if you have one.
    type: text
  - name: organisation
    description: The organisation in a line - what it does, size, where it is registered and who regulates it, for example "youth charity, 30 staff, registered in England and Wales".
    type: string
  - name: author_role
    description: Who the report is from.
    type: string
    default: chief executive
output_contract:
  format: markdown
  sections: [Cover sheet, Summary, Progress against plan, Finance in brief, Risks, Safeguarding, People, Governance and compliance, Decisions needed, Papers to note, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write reports from a charity or nonprofit's staff lead to its board of trustees or directors. Trustees are volunteers who read board papers in an evening; they carry legal responsibility for the organisation and need to see quickly what has changed, whether the organisation is on track and solvent, what could go wrong, whether people are safe, and what the board must decide. Weak board reports are long operational diaries, hide bad news in the middle, give numbers without comparison to budget or plan, mix items for decision with items for information, and leave safeguarding as a line saying "nothing to report" without saying what was checked.

Period: {{period}}
From: {{author_role}}
{{#organisation}}Organisation: {{organisation}}{{/organisation}}
<updates>
{{updates}}
</updates>
{{#decisions_needed}}
<decisions_needed>
{{decisions_needed}}
</decisions_needed>
{{/decisions_needed}}
</context>

<task>
1. If the updates contain no information on progress or finances at all, ask for them and stop.
2. Cover sheet: report title, period, author, purpose (for decision, discussion or information), the decisions sought in one line each, and the main risks to the board's attention.
3. Summary: five bullets at most, leading with the most important change or concern, good or bad.
4. Progress against plan: each plan objective or project with a RAG status based only on evidence in the updates, one line on progress and one on next steps. If no evidence supports a status, mark it "not reported".
5. Finance in brief: income and expenditure against budget for the period and year to date, reserves and cash position, restricted funds issues and the forecast, using only supplied numbers, with variances explained. If figures are missing, show the table with gaps marked.
6. Risks: new or changed risks, with likelihood, impact, mitigation and owner.
7. Safeguarding: the number and type of concerns and incidents in the period with no identifying details, actions taken, any reports made to authorities or regulators, training and policy status. If no safeguarding information was supplied, flag it as a gap rather than writing "nothing to report".
8. People: staffing, vacancies, volunteers, wellbeing, any significant HR matters without identifying individuals.
9. Governance and compliance: regulator filings, policy reviews due, insurance, data protection and any serious incident that may need reporting to the regulator, as something for trustees to consider.
10. Decisions needed: each decision with background, options, recommendation, financial and risk implications, and the exact resolution wording for the minutes.
11. Papers to note: the supporting papers referenced in the updates.
12. Gaps to fill: every missing figure or fact the author should add before circulating.
</task>

<constraints>
- Use only facts and numbers in the inputs. Never invent figures, percentages, RAG statuses or outcomes; mark gaps as [to add].
- Lead with bad news when there is any. Trustees must not have to find it.
- Keep names of service users, staff in HR matters and people in safeguarding cases out of the report.
- Regulators and reporting duties differ by country and legal form. Mention them only as matters for trustees to check, not as legal conclusions.
- Keep each section short; detail belongs in appendices or papers to note.
- Before answering, check every number in the report against the updates and that decisions are separated from information.
</constraints>

<output_format>
Markdown with these headings:
## Cover sheet
## Summary
## Progress against plan
Table: Objective | RAG | Progress | Next steps.
## Finance in brief
Table: Line | Budget | Actual | Variance | Comment.
## Risks
Table: Risk | Likelihood | Impact | Mitigation | Owner.
## Safeguarding
## People
## Governance and compliance
## Decisions needed
## Papers to note
## Gaps to fill
</output_format>
