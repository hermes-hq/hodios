---
schema: 1
id: write-modern-slavery-statement
kind: prompt
title: Write a modern slavery statement
description: Drafts an annual modern slavery or forced labour statement from what a business actually did, covering structure, supply chain risks, due diligence, remediation, training and progress.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [executive, operations-manager, legal-professional]
subject: [law, supply-chain]
requires: [none]
inputs: [text, document]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [modern-slavery, forced-labour, supply-chain-due-diligence, annual-statement, human-rights]
pairs_with:
  prompts: [write-supplier-code-of-conduct, map-supply-risk, write-whistleblowing-policy]
args:
  - name: organisation
    description: Legal entity or group, sector, turnover band, where it operates, and the reporting period.
    type: text
    required: true
  - name: actions_taken
    description: What the organisation actually did this period - supplier questionnaires, audits, contract clauses, training numbers, cases found and how they were handled, policies adopted. Paste last year's statement if there is one.
    type: text
    required: true
  - name: regime
    description: The reporting law or laws you believe apply, for example "UK Modern Slavery Act", "Australian Modern Slavery Act", "Canada's forced and child labour reporting law", or "not sure".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Gaps before publishing, Statement, Approval and publication checklist, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Modern slavery and forced labour reporting laws (in the UK, Australia, Canada and elsewhere) mostly require disclosure, not a particular level of performance: a statement of what the organisation did during the period to identify and address the risk, approved at board level, signed and published. Regulators, investors and campaigners read them closely, and the most common criticisms are boilerplate that repeats year after year, claims of "zero tolerance" with no evidence, saying "we found no slavery" as if that proved low risk, and listing policies without saying how they were used. The laws differ on who must report (turnover thresholds, entity types), the mandatory content, approval and signing, and where to publish (company website, a government registry), so those specifics must be checked. A good statement is honest about where risk is high (raw materials, labour hire, cleaning and security contractors, seasonal work, recruitment fees for migrant workers) and reports measurable progress.

Reporting regime: {{regime}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>

What was done this period:
<actions>
{{actions_taken}}
</actions>

1. Gaps before publishing: compare the actions against the content the stated regime typically expects (structure and supply chains, policies, due diligence, risk assessment, effectiveness measures, training, remediation, consultation with subsidiaries where required) and list what is missing or unsupported. If the regime is "not sure", list the questions that decide which regime applies.
2. Draft the statement using only the facts supplied:
   - Organisation structure, business and supply chains, with tiers where known.
   - Where the risk is highest and why (sectors, countries, labour models), not just a generic list.
   - Policies and how they were applied during the period.
   - Due diligence and risk assessment actually done, with numbers.
   - Cases or indicators found and the remediation taken, focused on the workers' interests (for example repaying recruitment fees) rather than simply dropping the supplier.
   - Training: who, how many, what.
   - How effectiveness is measured, with KPIs and last year's figures if given.
   - Plans for next period, specific and dated.
   - Approval and signature lines as [BRACKETS].
3. Approval and publication checklist for the stated regime, marked verify.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent actions, numbers, audits, training figures or cases; where a section has no facts, write [NO ACTION REPORTED - decide whether to disclose this or act] rather than filling it.
- Do not write "zero tolerance" or "no modern slavery in our supply chain" claims unless evidence is supplied; prefer honest risk language.
- Do not state thresholds, deadlines or mandatory criteria as fact unless supplied; mark "confirm for [regime]".
- If the user asks to copy last year's statement with new dates, point out what must change and why repetition is criticised.
{{> output/uncertainty}}
</constraints>

<output_format>
## Gaps before publishing
Table: expected content | covered? | what is missing.

## Statement
The full draft statement with headings.

## Approval and publication checklist
Checklist, marked verify.

## Points to confirm
Numbered.
</output_format>
