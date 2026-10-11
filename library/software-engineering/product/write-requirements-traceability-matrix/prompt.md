---
schema: 1
id: write-requirements-traceability-matrix
kind: prompt
title: Write a requirements traceability matrix
description: Builds a traceability matrix linking each requirement to its source, design, tests and status, flagging requirements without tests and tests without requirements, for audits or regulated releases.
category: product
version: 1.0.0
status: incubating
stage: [verify, plan]
role: [business-analyst, qa-engineer, product-manager, project-manager]
stack: []
requires: [none]
inputs: [spec, document, text]
output: [table, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [traceability, test-coverage, audit-readiness, requirements]
pairs_with:
  prompts: [write-acceptance-criteria, verify-pr-meets-acceptance-criteria, write-firmware-requirements]
args:
  - name: requirements
    description: The requirements list, ideally with IDs; a spec or PRD is fine.
    type: text
    required: true
  - name: tests_and_artifacts
    description: Test case list, designs, tickets or release notes to trace against, with their IDs and status.
    type: text
  - name: purpose
    description: Why the matrix is needed - internal release check, customer audit, regulated product, contract acceptance.
    type: text
output_contract:
  format: markdown
  sections: [Requirement list, Traceability matrix, Coverage gaps, Orphans, Next actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A traceability matrix answers two questions an auditor, customer or release manager will ask: is every requirement verified, and is everything we built and tested asked for by a requirement. It only works when requirements are atomic and have stable IDs; a paragraph containing three "shall" statements must be split first, or one passing test hides two untested rules. Coverage is not the same as passing: a requirement linked to a failed, blocked or not-yet-run test is still a gap. In regulated settings (medical devices, automotive, aviation, financial systems), the required format and evidence are set by the applicable standard and the quality team; the matrix here is a working draft, not proof of compliance.
</context>

<task>
<requirements>
{{requirements}}
</requirements>
{{#tests_and_artifacts}}
<tests_and_artifacts>
{{tests_and_artifacts}}
</tests_and_artifacts>
{{/tests_and_artifacts}}
{{#purpose}}
<purpose>
{{purpose}}
</purpose>
{{/purpose}}

1. Normalise the requirement list: give each atomic requirement a stable ID (keep existing IDs), split compound requirements, and note any requirement that is not testable as written.
2. Map each requirement to its source (stakeholder, regulation, contract clause or ticket, as given), design or ticket references, and test cases, using only links supported by the inputs.
3. Record verification status per requirement: verified (linked test passed), failed, not run, no test, or verified by another method (inspection, analysis, demonstration), with the method stated.
4. List coverage gaps: requirements with no test, only failed or unrun tests, or untestable wording, ordered by risk.
5. List orphans: tests, designs or tickets that trace to no requirement, and say whether each suggests a missing requirement or unneeded work.
6. Give next actions to close each gap, and note what extra evidence the stated purpose may require, to be confirmed with the quality or compliance owner.
</task>

<constraints>
- Never invent a link between a requirement and a test; when a match is only probable, mark it "suggested" for a person to confirm.
- Do not claim compliance with any standard; the matrix is input for those responsible.
- Keep existing IDs unchanged; new IDs follow the existing pattern.
- If no tests or artifacts are given, produce the normalised requirement list and an empty matrix with the columns to fill, and say so.
</constraints>

<output_format>
## Requirement list
Table: ID, requirement, testable (yes/no, why).
## Traceability matrix
Table: requirement ID, source, design or ticket, test IDs, status, verification method.
## Coverage gaps
Numbered, highest risk first.
## Orphans
Table: item, likely meaning.
## Next actions
Checklist with owner role.
</output_format>
