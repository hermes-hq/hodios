---
schema: 1
id: prepare-iso-27001-readiness
kind: prompt
title: Plan ISO 27001 certification readiness
description: Plans a small organisation's route to ISO 27001 certification - scope, gap assessment, risk method, Statement of Applicability, required records, internal audit and choosing a certification body.
category: compliance
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, security-engineer, engineering-manager]
subject: [law, saas]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [iso-27001, isms, certification-audit, statement-of-applicability, information-security, risk-assessment]
pairs_with:
  prompts: [write-information-security-policy, answer-security-questionnaire, plan-soc2-readiness-project, run-vendor-due-diligence]
args:
  - name: organisation
    description: What the organisation does, headcount, locations, main systems and cloud providers, who would own the programme, and which products, teams or sites customers care about.
    type: text
    required: true
  - name: drivers
    description: Why you want certification - a customer contract, tender requirement or sales objection - and any deadline. Optional.
    type: text
  - name: current_state
    description: What exists today - policies, risk register, access reviews, backups, incident process, training, supplier checks, other certifications such as SOC 2 or ISO 9001. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Gap assessment, Documents and records, Risk assessment and Statement of Applicability, Timeline, Certification body, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation plan ISO/IEC 27001 certification. The standard certifies an information security management system (ISMS), not a list of controls: the auditor checks that the organisation understands its context and interested parties, has a defined scope, leadership commitment and a policy, a repeatable risk assessment and treatment method, objectives, competence and awareness, controlled documents, operational records, monitoring, an internal audit, a management review, and a working process for nonconformities and corrective action. The current edition is ISO/IEC 27001:2022 (with a 2024 amendment adding climate change to the context clauses), whose Annex A groups controls into four themes: organisational, people, physical and technological. The Annex A controls are chosen through the risk assessment and justified one by one in the Statement of Applicability, including why any are excluded. Certification usually runs as a stage 1 audit (documents and readiness) and a stage 2 audit (evidence that the system has actually operated, usually for some months), then yearly surveillance audits and recertification on a multi-year cycle. Small organisations go wrong by setting a scope that customers will not accept or that is far too big, buying template policies that do not match how they work, running the internal audit with the people who built the system, holding no minuted management review, and treating it as an IT project with no business owner. A SOC 2 programme or ISO 9001 system can be reused for much of the evidence and process.
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>
{{#drivers}}

Drivers:
<drivers>
{{drivers}}
</drivers>
{{/drivers}}
{{#current_state}}

Current state:
<current>
{{current_state}}
</current>
{{/current_state}}

1. Scope: propose a scope statement (organisation units, products, locations, systems) that satisfies the stated drivers, and name what is out of scope and the interfaces with it.
2. Gap assessment: compare the current state with each clause area of the management system and with the main control themes, rating each gap and the effort to close it.
3. Documents and records: list the documented information the auditor will expect, separating policies and procedures from records that prove operation (risk register, treatment plan, Statement of Applicability, training records, access reviews, incident log, supplier reviews, internal audit report, management review minutes, corrective actions).
4. Risk assessment and Statement of Applicability: a simple method that fits the organisation (assets or scenarios, likelihood and impact scales, acceptance criteria, owners), and how to build the Statement of Applicability from it.
5. Timeline: phases from kickoff to stage 2 with realistic durations, the period of operating evidence needed, owners [ROLE], and what to do first this month.
6. Certification body: how to choose one (accreditation, sector experience, auditor days, surveillance costs, travel) and questions to ask in quotes.
7. Points to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent clause or control numbers. You may refer to the clause areas and control themes, and say "check against the current edition of the standard".
- Do not quote prices or audit-day figures; say what drives them and to get quotes.
- Do not promise certification by a date; give the dependencies that decide it.
- Warn against recommending template documents without tailoring, and against any certificate offered without an audit by an accredited body.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
Draft scope statement, then in and out of scope bullets.

## Gap assessment
Table: area | current state | gap | effort.

## Documents and records
Two lists: documents, records.

## Risk assessment and Statement of Applicability
Short method and a sample register row.

## Timeline
Table: phase | activities | duration | owner.

## Certification body
Selection checklist and quote questions.

## Points to verify
Numbered list.
</output_format>
