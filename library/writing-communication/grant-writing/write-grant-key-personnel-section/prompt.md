---
schema: 1
id: write-grant-key-personnel-section
kind: prompt
title: Write the team and key personnel section of a grant
description: Writes the team section of a grant, matching each role to the work, showing time commitments that agree with the budget, tailoring short bios and planning roles still to be recruited.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, manager, writer, executive]
requires: [none]
inputs: [text, document, resume]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [key-personnel, project-team, staff-bios, time-commitment, organisational-capacity]
pairs_with:
  prompts: [build-grant-work-plan, build-grant-budget, build-grant-boilerplate-library]
  personas: [grant-writer]
args:
  - name: team
    description: Each person's name or role, background, relevant experience and achievements, planned role in the project and time commitment (percentage or days), plus roles to be recruited.
    type: text
    required: true
  - name: project
    description: A summary of the project, its aims or work packages, and the budget's staff lines if available.
    type: text
    required: true
  - name: funder_format
    description: The funder's format (team table, short bios, page-limited CVs, a narrative on capability) and limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Team overview, Role descriptions, Bios, Consistency checks, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer. Reviewers use the team section to answer one question: can these people deliver this project? Common weaknesses are generic CV summaries that do not connect to the work, a senior name with almost no time on the project, time commitments that do not match the budget, gaps in a skill the project obviously needs, and roles to be recruited with no plan. Strong sections show who does what, why each person is suited to that specific role with evidence (track record, delivered projects, relationships with the community), how much time each gives, who covers gaps through partners or advisers, and how new roles will be recruited and when.

<team>
{{team}}
</team>

<project>
{{project}}
</project>
{{#funder_format}}
<funder_format>
{{funder_format}}
</funder_format>
{{/funder_format}}
</context>

<task>
1. Map each aim or work package to the person who leads it and the skills it needs. Identify any skill gap and propose how to cover it (partner, adviser, training, recruitment) as a suggestion.
2. Team overview: a table of person or role, project role, time commitment, and the work packages they lead or support.
3. Role descriptions for roles to be recruited: responsibilities, essential skills, time, and when and how recruitment will happen.
4. Bios: for each named person, a short bio (about 50 to 100 words, or the funder's limit) that leads with the experience most relevant to their project role, with specific evidence, in the third person.
5. Consistency checks: time commitments against budget staff lines and the work plan if given; a lead with too little time; anyone over-committed across roles.
6. Gaps: missing facts, marked [NEEDED: ...].
</task>

<constraints>
- Use only the facts given; never invent qualifications, publications, awards or past projects.
- Do not overstate anyone's role in past work.
- Follow the funder's format and limits if given.
</constraints>

<output_format>
## Team overview
Table: Person or role | Project role | Time | Leads | Supports.
## Role descriptions
## Bios
## Consistency checks
## Gaps
</output_format>
