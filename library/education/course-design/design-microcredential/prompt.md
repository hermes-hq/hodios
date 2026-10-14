---
schema: 1
id: design-microcredential
kind: prompt
title: Design a microcredential or digital badge
description: Designs a microcredential or digital badge with clear criteria, required evidence, assessment and quality assurance, levels, badge metadata and how it stacks into larger awards.
category: course-design
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, manager]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [microcredentials, digital-badges, open-badges, credential-design, recognition-of-learning, stackable-credentials]
pairs_with:
  prompts: [map-course-to-qualification-standards, write-learning-objectives, create-rubric]
args:
  - name: skill_area
    description: What the credential recognises, for example "using spreadsheets for data analysis", "peer mentoring", "safe use of a lab instrument".
    type: text
    required: true
  - name: issuer
    description: Who issues it (school, university, employer, training provider, professional body) and who it is for.
    type: string
    required: true
  - name: context
    description: Optional. Any existing course it sits on, frameworks to align to, whether it should count toward credit, and the platform used to issue badges if known.
    type: text
output_contract:
  format: markdown
  sections: [Credential summary, Criteria, Evidence, Assessment and quality assurance, Levels and stacking, Badge metadata, Launch and upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design credentials that employers and learners trust. A badge is only worth what its evidence is worth: many badges are given for attendance or a short multiple-choice quiz and quickly mean nothing. A credible microcredential states specific, observable criteria, requires evidence of real performance (a product, a project, an observed task), is assessed by a named role against a rubric with some moderation, carries metadata that lets anyone viewing it see the criteria and evidence, has a defined size (notional learning hours), and says how it stacks: into a larger award, toward credit, or into a series of levels. Open Badges is a widely used technical standard for portable digital badges. Whether a credential earns academic credit or recognition is decided by the institution or regulator, not by the badge designer.

Issuer: {{issuer}}
<skill_area>
{{skill_area}}
</skill_area>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. **Credential summary:** name, one-line description, who it is for, notional learning hours, and what a holder can do.
2. **Criteria:** four to eight criteria, each observable and specific, with the standard expected.
3. **Evidence:** the evidence a candidate submits for each criterion (artefact, project, observation record, reflection), with what makes evidence acceptable and how authenticity is checked (including AI-assisted work where relevant).
4. **Assessment and quality assurance:** who assesses and their required expertise, the rubric (met or not yet, or levels), resubmission rules, moderation or second marking, appeals, and record keeping.
5. **Levels and stacking:** whether it has levels, how it combines with other credentials into a larger award or pathway, and any credit or recognition to seek, marked [to be approved by the institution or body].
6. **Badge metadata:** the fields to publish with the badge (name, description, criteria, issuer, evidence link, alignment to frameworks, issue date, expiry if any) filled in for this credential.
7. **Launch and upkeep:** pilot, how to tell employers or admissions what it means, review cycle, and when a badge expires or needs renewal.
</task>

<constraints>
- No credentials for attendance or completion alone; every criterion needs performance evidence.
- Do not claim credit value, level equivalence or framework alignment as granted; mark them as to be approved and name who decides.
- Do not invent framework codes; align only to frameworks the user names, and mark the alignment as draft.
- If the skill area is too broad for one credential, propose splitting it and say why.
</constraints>

<output_format>
## Credential summary
## Criteria
Numbered list.
## Evidence
Table: Criterion | Evidence | Acceptable when | Authenticity check.
## Assessment and quality assurance
Bullets, then a short rubric table.
## Levels and stacking
## Badge metadata
Table: Field | Value.
## Launch and upkeep
Bullets.
</output_format>
