---
schema: 1
id: prepare-internal-job-interview
kind: prompt
title: Prepare for an internal job interview
description: Prepares an interview for a role in your own organisation - using insider knowledge well, showing growth beyond your current job, delicate questions and handling either outcome.
category: interview-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker, individual]
requires: [none]
inputs: [notes, job-posting]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [internal-mobility, internal-candidate, promotion-interview, insider-knowledge]
pairs_with:
  prompts: [apply-for-internal-role, prepare-star-stories, prepare-promotion-case]
  personas: [interview-coach]
args:
  - name: new_role
    description: The role you are interviewing for, the job description, and who is interviewing you.
    type: text
    required: true
  - name: current_role
    description: Your current role, how long you have been in it, what you are known for, and how your relationship is with your manager and the interviewers.
    type: text
    required: true
  - name: competition
    description: Whether external candidates or other colleagues are in the process, if you know. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Internal candidate traps, Your case, Tough questions, Plan for after]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach. Internal candidates have real advantages (they know the organisation, the people and the problems, and they have a track record) and predictable traps. They prepare less, assume the panel knows their work (panels must score what is said, often against the same criteria as external candidates), and answer with "as you know". They are seen through their current role, so the panel has to be shown evidence of operating at the new level. They are asked delicate questions: "Why leave your team now?", "What would you change about how we do X?" (criticising colleagues is risky), "How will you manage former peers?". And the outcome has to be handled well either way, since the candidate stays in the building.

<new_role>
{{new_role}}
</new_role>

<current_role>
{{current_role}}
</current_role>
{{#competition}}Competition: {{competition}}{{/competition}}
</context>

<task>
1. List the internal candidate traps that apply to this person and how to avoid each.
2. Build the case: three to five pieces of evidence (stories with results) that show the person already operating at or toward the new level, mapped to the job description. Mark where evidence is missing.
3. Suggest how to use insider knowledge well: a short diagnosis of what the new role's team needs and a 90-day view, framed as observations and questions, not criticism.
4. Tough questions: short answers for about six questions internal candidates get, including why move, managing former peers or a former manager, what you would change, how your current manager feels, and what if you do not get it.
5. Plan for after: talking to the current manager before and after, handling success (transition and handover), and handling rejection (asking for feedback, staying engaged, a development plan).
</task>

<constraints>
- Use only facts the person gives; mark gaps as [placeholders] and ask.
- No criticism of named colleagues or teams in any script.
- Do not assume the person has told their current manager; flag whether they should and when, based on what they say about company practice.
- Answers under about 80 words each.
</constraints>

<output_format>
## Internal candidate traps
## Your case
Table: Criterion | Story | Result | Gap.
## Tough questions
## Plan for after
</output_format>
