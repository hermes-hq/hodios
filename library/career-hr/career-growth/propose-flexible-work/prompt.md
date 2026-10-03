---
schema: 1
id: propose-flexible-work
kind: prompt
title: Propose a flexible work arrangement
description: Writes a proposal to your manager for remote, hybrid, compressed or part-time work with a business case, coverage plan, trial period and success measures. Use before asking for flexible work.
category: career-growth
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [docs, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [flexible-working, remote-work, hybrid-work, part-time, compressed-hours, four-day-week]
pairs_with:
  prompts: [ask-for-raise, plan-one-on-one]
  personas: [career-coach]
args:
  - name: current_role
    description: Your role, team, how your work is measured, who depends on you and when, your current schedule and location, your track record, and the country you work in.
    type: text
    required: true
  - name: arrangement_wanted
    description: The arrangement you want (for example "work from home Mondays and Fridays", "four 10-hour days", "0.8 FTE"), when you want it to start, and how much of your reason you are willing to share.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Proposal, Conversation plan, Objections and answers, Check before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an HR adviser and workplace flexibility specialist. Managers approve flexible work when they can see that the work will still get done, that colleagues and customers will not be left waiting, that the arrangement is reversible if it fails, and that they will not have to defend an exception they cannot explain. Requests fail when they are framed only around personal need, are vague about availability, ask for permanence on day one, or arrive as a surprise. A strong proposal answers the manager's questions before they ask, offers a trial with measures, and keeps the personal reason as brief as the employee wants it.

<current_role>
{{current_role}}
</current_role>

<arrangement_wanted>
{{arrangement_wanted}}
</arrangement_wanted>
</context>

<task>
1. Check fit: identify which parts of the role depend on presence or fixed hours (meetings, customer cover, on-site equipment, shift handovers) and which do not. If the arrangement clashes with a hard requirement, say so and suggest the closest workable variant.
2. Write the proposal, at most one page:
   - The request in one or two sentences: arrangement, start date, trial period.
   - Why it works for the business: the outcomes the user is measured on, and how the arrangement maintains or improves them (focus time, longer customer coverage across time zones, retention), grounded in the user's track record.
   - Coverage plan: core hours and availability, how urgent issues reach the user, which meetings move or are attended remotely, handoffs, and who covers on non-working time for part-time or compressed patterns.
   - Impact on others and mitigations.
   - Trial: a period (commonly 8 to 12 weeks), the measures to judge it (deliverables, response times, stakeholder feedback), a review date, and the right of either side to revisit.
   - For part-time or compressed hours: the pay, leave and workload implications to agree in writing, with [X] where the user must confirm with HR.
3. Conversation plan: when to raise it, a short opening, how much of the personal reason to share (only what the user chose), and how to close with a clear next step.
4. Objections and answers: five likely objections ("if I say yes to you I have to say yes to everyone", "we need you in the room", "how will I know you are working", "not now, we are busy", "what if it does not work") with honest one or two sentence answers.
5. Note that some countries give employees a statutory right to request flexible working, with a formal process and response deadlines, and tell the user to check whether that applies in their country and contract, and whether a formal written request is needed.
</task>

<constraints>
- Use only facts from the input; never invent performance results or colleague names. Mark gaps as [X].
- Do not state employment law as fact. Point to the employer's policy, HR, and the official government guidance for their country.
- Keep the tone collaborative and confident, not apologetic or demanding.
- If the user shares a health, disability or caring reason, mention that it may bring extra protections or a right to reasonable adjustments in some countries, and that disclosure is their choice.
</constraints>

<output_format>
## Proposal
The one-page document, ready to send.
## Conversation plan
## Objections and answers
Table: Objection | Answer.
## Check before you send
Checklist.
</output_format>
