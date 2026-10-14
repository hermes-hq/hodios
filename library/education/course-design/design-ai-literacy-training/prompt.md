---
schema: 1
id: design-ai-literacy-training
kind: prompt
title: Design AI literacy training for staff
description: Designs AI literacy training for a school's or organisation's staff, with modules on what AI tools can and cannot do, verification, privacy and policy, role-specific hands-on tasks and a short check.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, teacher]
requires: [none]
inputs: [text, document]
output: [plan, quiz, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-literacy, staff-training, generative-ai, responsible-ai, data-privacy, acceptable-use]
pairs_with:
  prompts: [write-class-ai-policy, design-workshop, evaluate-training-effectiveness]
  personas: [ai-literacy-coach]
args:
  - name: organisation
    description: Type of organisation, staff roles and numbers, which AI tools are approved or in use, and how comfortable staff are with them.
    type: text
    required: true
  - name: policy
    description: Optional. Your AI use policy or rules (what data may be entered, approved tools, disclosure rules). Without it, the training includes placeholders for the policy.
    type: text
  - name: time
    description: Time available per person, for example "one 90-minute session plus 30 minutes online".
    type: string
    default: 2 hours
output_contract:
  format: markdown
  sections: [Audience and goals, Core modules, Role tracks, Hands-on tasks, Policy and privacy, Knowledge check, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design staff training on generative AI for schools, public bodies and companies. Generic AI awareness sessions either oversell (demos of impressive outputs) or scare (lists of risks), and staff leave without knowing what they are allowed to do on Monday. Effective training is tied to the approved tools and the actual policy, explains the few concepts that drive safe use (the tool predicts plausible text, so it can be fluent and wrong; it may not know recent facts; outputs can reflect bias; what you type may be stored or used depending on the tool and contract), builds habits (verify facts and citations, never paste personal or confidential data into unapproved tools, keep a human responsible for decisions, disclose use where the policy requires), and spends most of the time on hands-on tasks from each role. Staff range from enthusiasts who over-trust to sceptics who refuse; the design should serve both. Some jurisdictions now place AI literacy or transparency duties on organisations; the user should check what applies to them.

Time per person: {{time}}.
<organisation>
{{organisation}}
</organisation>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
</context>

<task>
1. **Audience and goals:** staff groups, their likely uses and risks, and four to six goals stated as what staff will do differently.
2. **Core modules:** for everyone, short modules on how these tools work in plain terms, strengths and limits with examples, verification habits, bias, privacy and confidentiality, and accountability. Each with minutes and one activity.
3. **Role tracks:** for each staff group, two or three use cases worth adopting, uses to avoid, and the role's specific risks (for example pupil data for teachers, client data for advisers, code and secrets for developers).
4. **Hands-on tasks:** six to ten tasks done in the approved tool, each with the task, what to check in the output, and the common failure the task reveals (an invented citation, a confident wrong figure, a biased description).
5. **Policy and privacy:** the policy points staff must know, quoted from the policy if given; otherwise a list of placeholders the organisation must fill in (approved tools, data that must never be entered, disclosure, who to ask).
6. **Knowledge check:** six to eight scenario questions with answers, for example "a colleague pastes a client's medical history into a free chatbot - what should happen?".
7. **Rollout:** order of groups, champions, support channel, how to update the training as tools and policy change, and what to measure.
</task>

<constraints>
- Do not invent policy rules, approved tools or legal obligations. Mark legal or regulatory points [check with your legal or data protection lead].
- Do not describe specific vendors' data handling as fact; tell staff to check the terms for the approved tool.
- Balanced tone: no hype, no fear; every limit is shown with a concrete example.
- Hands-on tasks use the approved tools only and never real personal data.
- Keep within the time given; say what to cut if needed.
</constraints>

<output_format>
## Audience and goals
## Core modules
Table: Module | Minutes | Key points | Activity.
## Role tracks
Table: Role | Good uses | Avoid | Specific risks.
## Hands-on tasks
Table: Task | What to check | Failure it reveals.
## Policy and privacy
Bullets or placeholders.
## Knowledge check
Numbered scenarios with answers.
## Rollout
Bullets.
</output_format>
