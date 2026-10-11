---
schema: 1
id: assess-technical-due-diligence
kind: prompt
title: Assess technical due diligence
description: Assesses a company's codebase and systems for an investor or acquirer, reporting architecture, scalability, security, licensing, team and cost risks with severity.
category: architecture
version: 1.0.0
status: incubating
stage: [review]
role: [architect, tech-lead, executive, consultant]
requires: [none]
inputs: [repo, document, notes, text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [technical-due-diligence, risk-assessment, open-source-licenses, security-posture, acquisition, investment]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [review-codebase-architecture, estimate-cloud-costs]
args:
  - name: target
    description: What the company or product does, its stage, and the deal context (investment, acquisition, partnership) without confidential names if possible.
    type: text
    required: true
  - name: materials
    description: What is available, such as repository access, architecture documents, interview notes, metrics, incident history, cloud bills, security reports.
    type: text
    required: true
  - name: focus
    description: Questions the investor or acquirer most cares about, such as scaling to 10x, integration with their platform, key-person risk, or security.
    type: text
output_contract:
  format: markdown
  sections: [Executive summary, Risk register, Architecture and scalability, Security and compliance, Code quality and delivery, Open source and IP, Team and key-person risk, Questions for management]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Technical due diligence answers a business question: can this technology and team support the plan the buyer or investor is paying for, and what will it cost to fix what cannot? The audience is mostly non-engineers, so findings must be translated into severity, likely cost and effect on the deal, with evidence behind each. Experienced reviewers look beyond code style: whether the system can scale to the business plan or needs a rebuild; security basics (secrets in repositories, unpatched dependencies, access control, past breaches); open-source licence exposure, where copyleft code linked into distributed products can be a legal issue for counsel to assess; whether the company actually owns its code (contractor agreements, assignments); key-person risk where one engineer understands critical systems; delivery health (tests, CI, deploy frequency, incident rate); hosting cost trends relative to revenue; and technical debt that will consume the roadmap. Every finding should separate what was verified from what was claimed by management. Reviewers must not overstate: "no tests found in module X" is a fact, "the code is bad" is not a finding.
</context>

<task>
<target>
{{target}}
</target>

<materials>
{{materials}}
</materials>
{{#focus}}
Focus: {{focus}}
{{/focus}}

1. List the materials actually reviewed and what was not available, since the scope of the review limits its conclusions.
2. If a repository is available, inspect architecture, dependency manifests and their age, licence files and declared licences of dependencies, secrets or credentials committed to history, test coverage signals, CI configuration and deploy scripts. Record file paths as evidence.
3. Assess architecture and scalability against the stated business plan, naming the first bottleneck likely to bite.
4. Assess security and compliance basics and any history of incidents.
5. Assess delivery health and code quality with concrete evidence.
6. Identify open-source licence exposure and IP ownership questions, and route them to legal counsel rather than concluding on them.
7. Assess team and key-person risk from the materials.
8. Build the risk register with severity and cost ranges, and write the executive summary last.
9. List the questions for management that would settle the remaining uncertainties.
</task>

<constraints>
- Every finding cites evidence (a file, a document, a metric, or an interview statement marked as claimed). No unsupported judgements.
- Do not give legal conclusions on licences or IP; flag them for counsel.
- Cost estimates are ranges with stated assumptions.
- Do not include secrets or personal data found during the review in the report; describe their presence and location only.
- Stay neutral; this report must be fair to both sides of the deal.
{{> output/uncertainty}}
</constraints>

<output_format>
## Executive summary
Eight lines or fewer for non-engineers: overall view, top three risks, and whether any is a deal-level issue.
## Risk register
Table: area, finding, evidence, severity (deal-level, high, medium, low), likely cost or effort to fix as a range, recommendation.
## Architecture and scalability
Findings with evidence.
## Security and compliance
Findings with evidence.
## Code quality and delivery
Tests, CI, deploy frequency, incident history.
## Open source and IP
Licences found, copyleft exposure, ownership questions for counsel.
## Team and key-person risk
Findings.
## Questions for management
Numbered questions that would resolve the open points.
</output_format>
