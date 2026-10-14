---
schema: 1
id: address-peer-not-pulling-weight
kind: prompt
title: Address a peer not pulling their weight
description: Plans how to raise it with a colleague, classmate or group member who is not doing their share when you have no authority over them, from a direct conversation to involving someone who does.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, software-engineer, project-manager]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [teamwork, group-projects, workload, peer-feedback, accountability]
pairs_with:
  prompts: [give-feedback-sbi, give-upward-feedback, mediate-disagreement]
  personas: [workplace-mediator]
args:
  - name: situation
    description: The shared work, what the person was meant to do, what has and has not happened (with examples and dates), the effect on you and others, and anything you know about their circumstances.
    type: text
    required: true
  - name: setting
    description: Where this is.
    type: enum
    enum: [workplace, university-group-project, school-group-project, volunteer-group, household]
    default: workplace
output_contract:
  format: markdown
  sections: [Check first, The conversation, If they push back, If it does not change, Protect the work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Peers who are not pulling their weight are often struggling (overloaded elsewhere, unclear on the task, ill, caring for someone) rather than lazy, and the rest of the group often never says anything directly, only quietly covers the gap and resents it. Without authority you cannot order anyone, but you can make the work visible: agree who does what by when in writing, describe the specific missed items and their effect, ask what is getting in the way, and agree a concrete next step. Going to the manager, tutor or organiser first, without talking to the person, damages trust; going there after a direct attempt, with facts, is fair. In group assessments, many institutions have peer-evaluation or contribution rules, so keeping a light record of who did what protects everyone.
</context>

<task>
Help me raise this. Setting: {{setting}}.

<situation>
{{situation}}
</situation>

1. If it is unclear what they were supposed to do or what is missing, ask up to two short questions and stop.
2. Help me check first: was the split of work clear and agreed, is there a plausible reason I do not know, and am I being fair (comparing effort, not style)? Say honestly if the real issue is an unclear plan.
3. Write the private conversation: a friendly opener, specific examples and their effect, a genuine question about what is getting in the way, and a concrete ask (a task, an owner, a date). Keep it about the work.
4. Write replies to likely pushback: "I've been busy", "you never told me", "you're not my boss", silence, or a sad story, including how to adjust the plan if there is a real problem.
5. Say what to do if it does not change: a written recap of the agreed tasks, then raising it with whoever has authority (manager, tutor, organiser), with facts and what I already tried. Give the opener for that.
6. Suggest how to protect the work and the deadline meanwhile, without silently doing their share.
</task>

<constraints>
- Describe behaviour and outcomes, not character ("you missed the two deadlines", not "you're lazy").
- No public call-outs in group chats or meetings.
- Do not assume the institution's or employer's rules; tell me to check the group-work or contribution policy.
- Keep spoken lines short and natural for the setting (students speak differently from colleagues).
</constraints>

<output_format>
## Check first
Fairness check and any missing clarity.
## The conversation
The words to use.
## If they push back
Table: If they say… | You can say…
## If it does not change
The written recap and the escalation opener.
## Protect the work
Practical steps for the deadline.
</output_format>
