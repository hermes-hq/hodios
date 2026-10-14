---
schema: 1
id: nurture-runner-up-candidates
kind: prompt
title: Keep in touch with runner-up candidates
description: Turns strong candidates you did not hire into a future pipeline - the honest close-out message, consent to keep their details, light-touch check-ins, and how to re-engage them for a new role.
category: hiring
version: 1.0.0
status: incubating
stage: [operate]
role: [recruiter, manager, founder]
requires: [none]
inputs: [notes]
output: [message, plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [talent-pipeline, silver-medalist, candidate-relationship, rehire-pool, candidate-consent]
pairs_with:
  prompts: [write-candidate-rejection, write-candidate-outreach]
  personas: [recruiter]
args:
  - name: candidates
    description: The runner-up candidates (initials or codes), the role they interviewed for, why they were not chosen, their strengths, and what kind of future role might suit them.
    type: text
    required: true
  - name: new_role
    description: A new opening you might re-engage one of them for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Close-out message, Consent and records, Check-in plan, Re-engagement message, Fast-track process]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who fills many roles from people who came close before. A strong runner-up has already been assessed, knows the company and was nearly hired, so they are often the fastest and best source for the next opening. Most companies waste this: they send a generic rejection, never ask permission to stay in touch, then cold-contact the person a year later with no memory of them, or make them repeat the whole process. Done well, the close-out is personal and honest, the candidate agrees to stay in touch and to their data being kept, check-ins are rare and useful, and re-engagement acknowledges the history and skips stages that are still valid.

<candidates>
{{candidates}}
</candidates>
{{#new_role}}
<new_role>
{{new_role}}
</new_role>
{{/new_role}}
</context>

<task>
1. Close-out message: for each runner-up, a short, personal message or call outline that gives the decision first, says honestly that it was close and why they stood out, gives one piece of specific feedback if appropriate, and asks whether they would like to be considered for future roles.
2. Consent and records: what to record (strengths, assessed competencies, what was missing for this role, kind of future role), the consent to keep their details and for how long, and a reminder to check local data protection rules on retention.
3. Check-in plan: a light-touch cadence (for example at three and nine months), useful reasons to get in touch (company news, a relevant event, a role coming up), and when to stop.
4. Re-engagement message: if a new role is given, a message that references their past process, explains why this role may fit them, and is honest about what is different; otherwise a template.
5. Fast-track process: which stages from the earlier process can be reused if the evidence is still recent and relevant, which must be redone, and how to avoid unfair advantage over other applicants.
</task>

<constraints>
- Keep messages honest; do not imply a future offer or a guaranteed next role.
- Use initials or codes; do not invent strengths or feedback not in the input.
- Assess runner-ups for a new role against that role's criteria, not their past ranking.
</constraints>

<output_format>
## Close-out message
## Consent and records
## Check-in plan
## Re-engagement message
## Fast-track process
Table: Stage | Reuse or redo | Why.
</output_format>
