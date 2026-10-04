---
schema: 1
id: design-recertification-refresher
kind: prompt
title: Design a recertification refresher
description: Designs annual refresher training for a compliance-heavy role with a pre-test that lets staff skip what they know, what changed since last year, realistic scenarios and a short sign-off.
category: course-design
version: 1.0.0
status: incubating
stage: [design, maintain]
role: [manager, operations-manager]
subject: [social-care, hospitality, construction]
requires: [none]
inputs: [text, document]
output: [plan, quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [refresher-training, compliance-training, mandatory-training, pre-test, scenario-based-learning, annual-recertification]
pairs_with:
  prompts: [design-branching-scenario, design-microlearning-series, evaluate-training-effectiveness]
args:
  - name: topic
    description: The refresher topic and role, e.g. "food hygiene for kitchen staff", "manual handling for care workers", "safeguarding for school staff", "working at height for site operatives".
    type: string
    required: true
  - name: last_year_content
    description: Optional. What last year's training covered, how it was delivered, incidents or audit findings since, and any changes in law, guidance or internal policy you know of.
    type: text
  - name: minutes
    description: Maximum time per person for the refresher, in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Must-know content, Pre-test, Refresher pathway, Scenarios, Sign-off, Records and review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Annual refreshers usually repeat the same slides, so experienced staff click through and learn nothing, while the few things that actually changed or went wrong this year get the same weight as everything else. A better refresher starts with a short pre-test so people who show they know a section can skip it, spends the time on changes since last year, local incidents and near misses, and the decisions people get wrong under pressure, practises them in realistic scenarios, and ends in a sign-off that records competence rather than attendance. Practical skills (manual handling, first aid, fire equipment) still need hands-on practice and observation.

Topic: {{topic}}. Time per person: up to {{minutes}} minutes.
</context>

<task>
{{#last_year_content}}
<last_year_content>
{{last_year_content}}
</last_year_content>
{{/last_year_content}}

1. **Must-know content:** the critical requirements for {{topic}} grouped into four to six sections, marking which are knowledge, which are decisions, and which are practical skills. Add a "what changed" section from the input; if nothing is given, list what to check (law, regulator guidance, internal policy, incident and audit data) rather than inventing changes.
2. **Pre-test:** two or three questions per section, scenario-based rather than recall where possible, with a pass rule per section (for example all correct to skip it). Changes since last year and practical skills are never skippable.
3. **Refresher pathway:** for each section, the short content for those who did not pass (5-10 minutes), the format (micro-module, toolbox talk, huddle, hands-on practice) and timings, so the longest path fits {{minutes}} minutes.
4. **Scenarios:** four to six realistic scenarios from this role, including at least one from a recent incident or near miss if given, each with the decision, the right action, the common wrong action and why.
5. **Sign-off:** a short final check, a practical observation checklist for hands-on skills, a declaration that the person has read updated policy, and what happens if someone does not pass.
6. **Records and review:** what to record for audit (date, version, result, assessor), how to spot topics many people fail, and when to update the refresher.
</task>

<constraints>
- Technical and legal content must be checked by a competent person (for example the organisation's health and safety lead, safeguarding lead or a qualified trainer) against current law and guidance; mark all such points [verify].
- Never invent legal requirements, regulator rules, refresher frequencies or incident details.
- Practical skills are not signed off by a quiz alone.
- Keep it respectful of experienced staff; no trick questions.
- If the topic or role is unclear, ask and stop.
</constraints>

<output_format>
## Must-know content
Table: Section | Type (knowledge, decision, practical) | Skippable? | Key points.
## Pre-test
Numbered questions with answers and the pass rule per section.
## Refresher pathway
Table: Section | Content | Format | Minutes. Then shortest and longest path totals.
## Scenarios
Table: Scenario | Right action | Common mistake | Why it matters.
## Sign-off
Final check, observation checklist, declaration.
## Records and review
Bullets.
</output_format>
