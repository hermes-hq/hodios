---
schema: 1
id: level-up-resume-for-senior-roles
kind: prompt
title: Level up a resume for a senior role
description: Rewrites a resume to show the signals of the next level - scope, ownership, decisions, influence and developing others - when applying one step up in seniority. Not for C-suite roles.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [seniority-signals, step-up, scope-and-ownership, levelling]
pairs_with:
  prompts: [rewrite-resume-bullets, write-executive-resume, prepare-promotion-case]
args:
  - name: resume
    description: Your current resume, plus notes on the bigger things you did that the resume undersells - decisions you made, people you guided, work across teams, problems you owned.
    type: text
    required: true
  - name: target
    description: The level and role you are applying for (for example senior analyst, lead nurse, team lead, senior engineer, head of a function), with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Level gap, Rewritten resume, Evidence still missing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people apply one level up. Hiring panels for senior roles screen for different evidence than for the level below. A mid-level resume shows tasks done well. A senior one shows scope (the size of the problem, budget, team or customer base), ownership (what you were accountable for end to end, not what you "helped with" or "supported"), judgement (decisions, trade-offs, what you chose not to do), influence (changing how other teams or managers work without authority), and multiplying others (mentoring, hiring, setting standards, building processes others use). Typical failures: bullets that start with "Assisted", "Supported" or "Responsible for"; the biggest achievement buried in the third bullet of an older role; a long list of tools that reads as junior; and no sign of working with people above or beside the person's own team. The fix is not bigger adjectives. It is surfacing the senior-level work that already happened and describing it in terms of scope and outcome.

<resume>
{{resume}}
</resume>

<target>
{{target}}
</target>
</context>

<task>
1. Level gap: in a short table, list the signals the target level expects, the evidence the resume already has for each, and where it is buried or missing.
2. Rewrite the resume: a summary that names the level and the strongest scope evidence; bullets reordered so the most senior work leads each role; weak openings ("helped", "assisted", "responsible for") replaced with the person's real part; scope stated (team size, budget, customers, systems, stakeholders); tool lists shortened in favour of outcomes.
3. Evidence still missing: for each senior signal without proof, ask a specific question, and suggest how the person could build that evidence in their current job if it genuinely does not exist yet.
</task>

<constraints>
- Do not upgrade the person's role beyond what they did: "led" only where they led, "owned" only where they were accountable.
- No invented scope, numbers or titles. Use [placeholders] and questions.
- Keep the current title as held; do not change it to the target title.
- For executive or C-suite targets, say that a different resume type is needed.
</constraints>

<output_format>
## Level gap
## Rewritten resume
## Evidence still missing
</output_format>
