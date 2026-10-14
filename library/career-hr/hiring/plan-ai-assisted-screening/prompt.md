---
schema: 1
id: plan-ai-assisted-screening
kind: prompt
title: Plan AI use in candidate screening
description: Plans how an employer can use AI tools in screening and assessment responsibly - where they help, human review points, bias testing, candidate notice, records and legal checks to make first.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, operations-manager, founder, executive]
advice_risk: [legal]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-in-hiring, automated-decision-making, bias-audit, human-review, responsible-ai]
pairs_with:
  prompts: [write-candidate-ai-policy, screen-resumes, select-applicant-tracking-system, assess-ai-act-obligations]
  personas: [recruiter]
args:
  - name: use_case
    description: Where you want to use AI (CV screening, ranking, chatbots, scheduling, video or game assessments, writing job ads, summarising interviews), the tool if chosen, and the hiring volume.
    type: text
    required: true
  - name: jurisdiction
    description: Countries, states or cities where you hire and where candidates are. Optional but strongly recommended.
    type: string
output_contract:
  format: markdown
  sections: [Use cases by risk, Human review design, Bias testing, Candidate notice and choice, Vendor questions, Records and governance, Legal checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise employers on using AI in recruiting. AI tools can save real time on low-risk tasks (drafting job ads, scheduling, answering candidate FAQs, summarising notes), but tools that score, rank, filter or reject candidates are high-risk: they can learn and repeat historical bias, penalise non-standard CVs, career gaps or disabilities, and are hard to explain to a rejected candidate. An employer stays responsible for discrimination even when a vendor's tool made the call. A growing number of jurisdictions regulate automated hiring decisions, for example requiring bias audits, candidate notice, a right to human review, or treating recruitment AI as high-risk, and data protection laws often restrict decisions made solely by automated means. A responsible plan starts with the use case's risk, keeps meaningful human decisions, tests outcomes by group, tells candidates, and keeps records.

<use_case>
{{use_case}}
</use_case>
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
1. Use cases by risk: classify each intended use as low (assists recruiters, no candidate decision), medium (shapes what humans see, such as summaries or suggested questions) or high (scores, ranks, filters or rejects), with the main harm for each and whether to proceed, proceed with safeguards or avoid.
2. Human review design: for medium and high uses, where a trained person makes the decision, what they review, how to avoid rubber-stamping (for example, reviewing a sample of rejected candidates and overriding with reasons), and that no candidate is rejected solely by the tool.
3. Bias testing: what to test before and during use (selection rates by group where lawful data exists, impact on career gaps, non-native writing, disability-related differences), how often, thresholds for action, and what to do when a gap appears.
4. Candidate notice and choice: what to tell candidates and when, how to request a human review or an alternative assessment, and adjustments for disabled candidates.
5. Vendor questions: training data, validation for job-relatedness, bias audit results, explainability, data retention and use for training, security, and contract terms on liability and audits.
6. Records and governance: an owner, a register of tools and uses, decision logs, review cadence and an incident process.
7. Legal checks: the rules likely to apply in the given jurisdictions (such as local automated employment decision rules, AI regulation and data protection rights on automated decisions), stated as items to confirm with a lawyer, and a data protection impact assessment where required.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a tool or use is lawful in a jurisdiction; describe rules as items to verify.
- Do not recommend fully automated rejection of candidates.
- Do not name or endorse specific vendors.
- Do not suggest using protected characteristics as inputs to scoring; testing by group must use lawful, separate data.
</constraints>

<output_format>
## Use cases by risk
Table: Use | Risk level | Main harm | Decision.
## Human review design
## Bias testing
## Candidate notice and choice
## Vendor questions
## Records and governance
## Legal checks
</output_format>
