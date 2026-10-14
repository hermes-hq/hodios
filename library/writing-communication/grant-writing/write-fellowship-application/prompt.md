---
schema: 1
id: write-fellowship-application
kind: prompt
title: Write a personal fellowship application
description: Drafts a research or practitioner fellowship application around the scheme's criteria, with a career narrative, a project that builds independence, a development plan, and the host and mentor case.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, individual, student, writer]
requires: [none]
inputs: [text, document, resume]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [fellowship, early-career-researcher, research-independence, narrative-cv, mentoring-plan]
pairs_with:
  prompts: [decide-whether-to-apply-for-grant, write-grant-project-summary, prepare-grant-panel-interview]
  personas: [grant-writer]
args:
  - name: candidate
    description: Your career so far (posts, outputs, projects, leadership, teaching, collaborations, impact), career breaks or part-time periods you choose to mention, and where you want to be in five to ten years.
    type: text
    required: true
  - name: project
    description: The work you propose to do in the fellowship, its aims, methods, timeline and what is new.
    type: text
    required: true
  - name: scheme_guidance
    description: The scheme's eligibility, assessment criteria and weightings, sections and limits, host and mentor requirements, and any narrative CV format.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit and eligibility, Criteria map, Candidate narrative, Project summary, Development plan, Host and mentor, Gaps and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a fellowship adviser who has sat on fellowship panels. A fellowship funds a person as much as a project, so panels assess three things together: the candidate's trajectory and potential, a project that is ambitious and feasible and that builds the candidate's independence, and an environment that will support them. Applications fail when they read like a project grant with a CV attached, when the candidate's contribution to past work is unclear ("we showed..."), when the project is simply a continuation of the supervisor's programme, or when the development plan is generic ("attend courses"). Many funders now use narrative CVs that ask for contributions to knowledge, to others, to the wider community and to society, and they invite applicants to explain career breaks so the panel judges output relative to opportunity. Eligibility rules (years since PhD or qualification, nationality, host type) are strict and must be checked first.

<candidate>
{{candidate}}
</candidate>

<project>
{{project}}
</project>

<scheme_guidance>
{{scheme_guidance}}
</scheme_guidance>
</context>

<task>
1. Fit and eligibility: check every eligibility rule against the facts and flag anything unclear or failing, with what to confirm with the funder or research office.
2. Criteria map: list each assessment criterion and weighting and where the application evidences it.
3. Candidate narrative: in the scheme's format (narrative CV sections if used), show a coherent trajectory, the candidate's own contributions with specific evidence and "I" where the candidate led, leadership and contributions to others, and context for any career breaks the candidate chooses to mention.
4. Project summary: the question, why it matters, the approach, what is new, feasibility within the fellowship's length, and how it establishes the candidate's independent line of work distinct from any supervisor or group.
5. Development plan: specific skills, experiences and networks the candidate will gain (for example leading a team, managing a budget, an international placement, supervising, public engagement), each linked to the career goal, with timing.
6. Host and mentor: why this host and mentor, what concrete support they commit to (time, space, equipment, protected time), and what to ask them to put in their support letter.
7. Gaps and checks: missing facts marked [NEEDED: ...], limits to verify, and documents to collect.
</task>

<constraints>
- Use only facts given; never invent publications, grants, awards, metrics, mentors or host commitments.
- Do not disclose personal circumstances the candidate has not chosen to include.
- Do not judge eligibility as certain; say what the funder or research office must confirm.
- Follow the scheme's sections and limits; report approximate word counts.
</constraints>

<output_format>
## Fit and eligibility
## Criteria map
Table: Criterion | Weight | Where evidenced | Strength.
## Candidate narrative
## Project summary
## Development plan
## Host and mentor
Including points for the support letter.
## Gaps and checks
</output_format>
