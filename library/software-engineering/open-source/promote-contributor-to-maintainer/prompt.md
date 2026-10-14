---
schema: 1
id: promote-contributor-to-maintainer
kind: prompt
title: Promote a contributor to maintainer
description: Assesses whether a regular contributor is ready for a maintainer or reviewer role, then writes the private invitation, a staged access plan, an onboarding checklist and the public announcement.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text]
output: [report, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [contributor-ladder, maintainer-onboarding, access-control, succession, community-health]
pairs_with:
  prompts: [audit-contributor-funnel, write-project-governance]
  personas: [open-source-maintainer]
args:
  - name: candidate
    description: The contributor's record - code, reviews, triage, docs and support work, how long they have been active, how they handle disagreement, time they can give, and employer if relevant. Use a handle, not a full name.
    type: text
    required: true
  - name: project
    description: Current maintainers, any governance or contributor ladder, the roles that exist, and the systems that grant access (repository, package registry, CI secrets, chat, domain).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assessment, Recommended role, Invitation, Access plan, Onboarding checklist, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Projects that never promote anyone burn out their founders; projects that promote on commit count alone hand admin rights to people who write a lot of code but review badly or treat newcomers poorly. Experienced maintainers look for sustained judgement: good reviews of other people's work, triage, saying no well, staying within scope, and conduct under disagreement. They promote in stages (triager, then reviewer or committer, then maintainer), grant the least access each stage needs, keep package publishing and signing keys to a small group with two-factor authentication, ask privately first so the person can decline without pressure, and say clearly that the role is voluntary and how to step down.

Candidate:
<candidate>
{{candidate}}
</candidate>

Project:
<project>
{{project}}
</project>
</context>

<task>
1. Assess the candidate against criteria: quality and spread of contributions (not only code), review quality, judgement on scope, conduct, reliability over time, and available time. Name the evidence for each and what is missing. If the evidence points to "not yet", say so and say what would change it.
2. Recommend the role (triager, reviewer, committer, maintainer, or not yet) and any trial period.
3. Write the private invitation: what the role involves, what it does not require, expected time as a range, how decisions are made, that saying no or not now is fine, and how to step down later.
4. Write the access plan as a table by system with the access granted now, later, and never at this stage, including two-factor authentication requirements and who grants it.
5. Write the onboarding checklist: documents to read, a first shadowed review, release and security process walkthroughs, and a check-in after a month.
6. Write the short public announcement thanking them for specific contributions.
</task>

<constraints>
- Do not recommend promotion on volume alone; review quality and conduct weigh more than commit count.
- If the candidate's employer would then hold a majority of maintainers, flag it and suggest how to keep the project's independence.
- Never put secrets, tokens or passwords in any output; describe access by system and permission level.
- If the input contains conduct concerns, address them before any promotion, privately and specifically.
</constraints>

<output_format>
Use the contract's section headings in order. Assessment as a table: Criterion | Evidence | Gap. Invitation and announcement as fenced blocks. Access plan as a table: System | Now | Later | Not at this stage.
</output_format>
