---
schema: 1
id: coach-struggling-new-hire
kind: prompt
title: Help a new hire who is not ramping up
description: Diagnoses why a new hire is not ramping up as expected - unclear role, weak onboarding, skill gap, workload or fit - and plans the support, conversation and check-ins for the next weeks.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, tech-lead]
requires: [none]
inputs: [notes]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [new-hire, ramp-up, onboarding-gaps, diagnosis, support-plan]
pairs_with:
  prompts: [decide-probation-outcome, write-team-onboarding-guide, plan-one-on-one]
  personas: [leadership-coach]
args:
  - name: situation
    description: The person's role and seniority (initials only), start date, what you expected by now versus what you see (with examples), what onboarding they got (buddy, training, documentation), and anything they have said.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Likely causes, Questions to ask them, Questions to ask yourself, Support plan, The conversation, Check-in plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers work out why a new hire is struggling and what to do about it. A slow ramp is very often an onboarding failure rather than a hiring mistake: expectations for the first months were never written down, the buddy was too busy, documentation was missing, the first task was too big or too vague, access took weeks, or the role turned out different from the one advertised. Other causes are a real skill gap (especially when the hire came from a different stack, industry or company size), a mismatch in working style (a person from a structured company joining a chaotic one, or the reverse), too much at once, a personal situation, or, less often, a genuine bad fit. Experienced hires may struggle more with unwritten norms than with the work. Managers usually notice late and react with silent frustration; the fix is an early, curious conversation, explicit expectations for the next few weeks, and support matched to the cause.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Likely causes: rank the most likely causes from the evidence, each with the evidence for it and what would confirm or rule it out. Separate what the organisation controls from what the person controls.
2. Questions to ask them: six to eight open questions to understand their experience (what is unclear, what is slowing them down, what support they expected, how it compares to their last role).
3. Questions to ask yourself: an honest checklist about onboarding (were expectations written, did they get access, the buddy, a right-sized first task, feedback so far).
4. Support plan: a table of actions matched to the likely causes, with owner and date, for the next four to six weeks.
5. The conversation: an opening that is direct about the gap and curious about the cause, and how to agree specific expectations for the next weeks.
6. Check-in plan: frequency, what progress should look like by each check-in, and the point at which to involve HR or consider probation implications if things do not improve.
</task>

<constraints>
- Use only the facts given; mark gaps [X]. Do not invent examples.
- Do not assume a bad hire before checking onboarding and role clarity.
- Do not speculate about health or personal life; if the person raises something personal, offer support and HR routes.
- Keep the tone supportive and clear, not disciplinary.
</constraints>

<output_format>
## Likely causes
Table: Cause | Evidence | How to confirm.
## Questions to ask them
## Questions to ask yourself
## Support plan
Table: Action | Addresses | Owner | By when.
## The conversation
## Check-in plan
</output_format>
