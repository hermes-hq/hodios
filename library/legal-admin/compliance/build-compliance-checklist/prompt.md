---
schema: 1
id: build-compliance-checklist
kind: prompt
title: Build a compliance readiness checklist
description: Builds a readiness checklist for a named regulation or framework applied to a specific business, covering applicability, evidence, owners, priorities and points to verify with counsel.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, legal-professional, security-engineer]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [readiness-assessment, gap-analysis, audit-evidence, regulatory-scope]
pairs_with:
  prompts: [map-personal-data-processing, write-privacy-policy, write-workplace-policy]
args:
  - name: regulation
    description: The regulation, standard or framework, as precisely as you can name it (for example GDPR, the EU AI Act, PCI DSS, SOC 2, HIPAA, ISO 27001, the European Accessibility Act, a state privacy law).
    type: string
    required: true
  - name: business
    description: The business - what it does, where it operates and sells, size, customers (consumers or businesses), data it handles, key systems and vendors, and anything already in place (policies, certifications, a privacy lead).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Does it apply, Readiness checklist, Quick wins, Evidence to collect, Verify with counsel]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small or growing organisation get ready for a regulation or framework without drowning in it. A useful readiness checklist starts with applicability (does this even apply, and to which parts of the business?), then translates the requirements into concrete tasks with an owner and the evidence that shows each is done. Generic checklists fail because they ignore scope: a company that only handles business contact data has a very different list from one processing health records, and a framework like SOC 2 is voluntary while a law is not.

Regulation or framework: {{regulation}}
</context>

<task>
Business:

<business>
{{business}}
</business>

1. Identify what {{regulation}} is (law, regulation, industry standard, voluntary framework), its general purpose, and whether it is mandatory for this business. If the name is ambiguous, or you are not confident about its current content or effective dates, say so plainly and limit yourself to what you are sure of.
2. Assess applicability from the facts: which triggers appear to apply (location, customers, revenue or data volume thresholds, sector, data types), which do not, and which are unclear. Mark the overall result "likely applies", "may apply" or "unlikely to apply", with reasons. Thresholds and scope tests must be marked "verify".
3. Build the checklist grouped by requirement area (for example governance and roles, documentation and records, notices and transparency, individual rights or customer obligations, vendor management, security controls, incident response, training, monitoring and audit). For each item: what it means in practice for this business, status if the description reveals it (in place, partial, missing, unknown), priority (high, medium, low by risk and deadline), owner as a role placeholder, and the evidence that proves it.
4. Pick five quick wins that reduce the most risk for the least effort.
5. List the points that need confirmation by counsel or an auditor: applicability decisions, interpretations, deadlines, and anything with penalties attached.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a readiness aid, not a compliance opinion or audit. Never state that the business is or will be compliant.
- Do not invent requirement text, article or control numbers, thresholds, penalties or deadlines. Cite a specific reference only if you are confident it is accurate and current; otherwise describe the requirement in general terms and mark it "verify".
- Say that regulations change and that your knowledge has a cutoff date; for recent or phased laws, tell them to check the current official text and guidance.
- Scale to the business: do not list enterprise-grade items for a five-person company without saying they are optional or later.
- If the business description lacks facts needed to judge applicability, list them as questions at the top and still give a provisional checklist.
{{> output/uncertainty}}
</constraints>

<output_format>
## Does it apply
Verdict (likely applies, may apply, unlikely to apply), then a table: trigger | fact from the description | result | verify.

## Readiness checklist
Table per area: item | what it means for you | status | priority | owner | evidence.

## Quick wins
Numbered, five items.

## Evidence to collect
Checklist of documents and records.

## Verify with counsel
Numbered questions.
</output_format>
