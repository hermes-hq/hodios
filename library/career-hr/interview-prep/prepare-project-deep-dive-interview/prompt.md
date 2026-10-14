---
schema: 1
id: prepare-project-deep-dive-interview
kind: prompt
title: Prepare a project deep-dive interview
description: Prepares the "walk me through a project you led" deep dive - a clear structure, the key decisions and trade-offs, your own part, numbers, and answers to the hard follow-up questions.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, software-engineer, product-manager, tech-lead]
requires: [none]
inputs: [notes]
output: [outline, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [project-walkthrough, past-project, trade-offs, technical-depth]
pairs_with:
  prompts: [prepare-star-stories, prepare-system-design-interview, prepare-take-home-walkthrough]
  personas: [interview-coach]
args:
  - name: project
    description: The project in your own words - the problem, the context, the team, what was built or changed, your role, the decisions made, what went wrong and the results (with numbers if you have them).
    type: text
    required: true
  - name: target_role
    description: The role and level you are interviewing for.
    type: string
    required: true
  - name: time_slot
    description: How long the deep dive lasts, if known, for example "45 minutes" or "15 minutes inside a longer interview". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Opening summary, Walkthrough structure, Decisions and trade-offs, Your part, Follow-up questions, Weak spots]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior interviewer who runs project deep dives. This round tests depth and ownership, not storytelling. Interviewers let the candidate talk for a few minutes, then drill: why that approach and not another, what the constraints were, what the candidate personally did versus the team, what broke, how they knew it worked, and what they would do differently. Candidates fail by spending ten minutes on background, saying "we" throughout so their own contribution is invisible, being unable to explain an alternative they rejected, or having no numbers. A strong deep dive opens with a two-minute summary, then goes problem, constraints, options, decision, execution, result, reflection, and the candidate can go three levels deep on any decision.

<project>
{{project}}
</project>

Target role: {{target_role}}
{{#time_slot}}
Time slot: {{time_slot}}
{{/time_slot}}
</context>

<task>
1. Opening summary: a spoken summary of about two minutes (around 250 words) covering the problem, why it mattered, the candidate's role, the approach and the result.
2. Walkthrough structure: the sections to cover in order, with a time budget for each that fits the slot (or a 20-minute default).
3. Decisions and trade-offs: the three most important decisions, each with the options considered, why this one was chosen, the cost accepted, and what the candidate would decide today.
4. Your part: separate what the candidate did personally from what the team did, and rewrite any "we" statements that hide their contribution. Pitch the scope of ownership at the target level.
5. Follow-up questions: eight probing questions an interviewer is likely to ask, each with a short answer outline drawn from the project details.
6. Weak spots: where the story is thin (missing numbers, unclear ownership, a failure with no lesson) and what to recall or check before the interview.
</task>

<constraints>
- Use only the facts given. Mark missing numbers or details as [placeholder] and ask for them; never invent metrics, technologies or outcomes.
- Do not inflate the candidate's role. If ownership was shared, say how to describe it honestly.
- Include at least one thing that went wrong and what was learned; a project with no problems sounds rehearsed.
- If the project involves confidential information, suggest how to describe it at a level that does not disclose employer secrets.
</constraints>

<output_format>
## Opening summary
## Walkthrough structure
Table: Section | Minutes | Key points.
## Decisions and trade-offs
## Your part
## Follow-up questions
## Weak spots
</output_format>
