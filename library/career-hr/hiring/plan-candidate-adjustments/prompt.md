---
schema: 1
id: plan-candidate-adjustments
kind: prompt
title: Plan adjustments for candidates
description: Makes a hiring process accessible - how to invite adjustment requests, common adjustments for each stage, handling one candidate's request, confidentiality and what interviewers are told.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, operations-manager]
advice_risk: [legal]
requires: [none]
inputs: [notes, job-posting]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reasonable-adjustments, accessible-recruitment, disability-inclusion, neurodiversity, candidate-accommodations]
pairs_with:
  prompts: [design-interview-loop, write-take-home-assignment, plan-workplace-adjustments-as-manager]
  personas: [recruiter, hr-business-partner]
args:
  - name: hiring_process
    description: The stages of your hiring process (application, tests, interviews, work samples, assessment days), formats (online, in person, timed), and the role.
    type: text
    required: true
  - name: request
    description: A specific adjustment request you have received, described without unnecessary medical detail. Optional.
    type: text
  - name: country
    description: The country where you are hiring. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Inviting requests, Adjustments by stage, Handling this request, Confidentiality, Briefing interviewers, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruitment lead experienced in inclusive hiring. Many disabled, neurodivergent and chronically ill candidates never ask for adjustments because the process gives no clear, safe way to do so, or because they fear being judged. Good practice is to tell every candidate what each stage involves in advance, invite requests in a neutral way at each stage, ask what helps rather than asking for a diagnosis, separate the adjustment from the assessment decision, and keep the information confidential to those who need it. Adjustments change how a candidate shows the skill, not the standard they are assessed against. Many places also have legal duties to make reasonable adjustments in recruitment.

<hiring_process>
{{hiring_process}}
</hiring_process>
{{#request}}
<request>
{{request}}
</request>
{{/request}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Inviting requests: wording for the job advert, application confirmation and each interview invitation that explains the format and invites adjustment requests, plus who receives requests and how quickly they respond.
2. Adjustments by stage: for each stage in the process, common adjustments (for example questions in advance, extra time, breaks, a quiet room, camera-off or written alternatives, screen-reader-compatible tests, a different format for timed tests, step-free access, a sign language interpreter, a support person attending), and which ones change the format but keep the same standard.
3. Handling this request: if a request is given, the options, how to discuss it with the candidate, what to decide and by when, and a short message to the candidate. If none is given, a general process for any request.
4. Confidentiality: who needs to know what, keeping adjustment information separate from the assessment record, and not asking about the nature of a condition unless it is needed to make the adjustment.
5. Briefing interviewers: what to tell interviewers (the practical arrangement only), and reminders not to factor the adjustment or condition into the score.
6. Points to confirm: legal duties and data-protection points to check with HR or an employment lawyer for the user's country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never recommend asking for a diagnosis or medical evidence by default; ask what would help.
- Keep the assessment standard the same; an adjustment that removes a genuine core job requirement needs a separate, careful discussion with HR.
- Do not state legal duties as settled fact for a specific country; list them to confirm.
- Avoid stereotypes about what people with any condition can or cannot do.
</constraints>

<output_format>
## Inviting requests
## Adjustments by stage
Table: Stage | Possible adjustments | Standard stays the same because.
## Handling this request
## Confidentiality
## Briefing interviewers
## Points to confirm
</output_format>
