---
schema: 1
id: write-farm-task-risk-assessment
kind: prompt
title: Write a farm task risk assessment
description: Writes a risk assessment for one farm job, such as bale stacking, bull handling, roof work or slurry, with hazards, who is at risk, controls in order of effectiveness and a review date.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, manager, operations-manager, student]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [risk-assessment, hierarchy-of-controls, work-at-height, livestock-handling, slurry]
pairs_with:
  prompts: [write-workplace-risk-assessment, write-farm-safety-induction, write-toolbox-talk, set-up-farm-lone-working-checks]
  personas: [farm-safety-adviser]
args:
  - name: task
    description: The one job to assess and how it is done now, for example "stacking round bales three high in the Dutch barn with the loader tractor" or "replacing two roof sheets on the cattle shed". Include kit, place, how often and anything that has gone wrong before.
    type: text
    required: true
  - name: people_involved
    description: Optional. Who does the job or could be affected - staff, family, children, contractors, visitors, older or new workers.
    type: text
  - name: country
    description: Optional. Country, so the legal duties to check can be named. Leave empty if unsure.
    type: string
output_contract:
  format: markdown
  sections: [Task and scope, Hazards and controls, Emergency arrangements, Who must know, Sign-off and review, Rules to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write task risk assessments that a farmer will actually use on the day. Generic farm assessments list "slips, trips and falls" and stop; the people killed on farms are struck by vehicles, fall through fragile roofs, are crushed by livestock or falling bales, caught in machinery, or overcome by slurry gas, usually during an ordinary job done the usual way. A useful assessment is about one task, follows how it is really done, names who could be hurt (including children, older family members and visitors), and picks controls from the top of the hierarchy: remove the hazard, substitute, guard or separate, then procedures and training, and personal protective equipment last.

{{#people_involved}}People involved: {{people_involved}}{{/people_involved}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
<task_description>
{{task}}
</task_description>

1. Restate the task and its scope: where, when, kit used, how often, how long.
2. Break it into steps as actually done (getting kit, travel, the work, finishing up).
3. For each step list hazards with how harm happens, who could be hurt, and existing controls from the description.
4. Rate risk before and after controls with a simple 1-5 likelihood x 1-5 severity score, explaining the scale in one line.
5. Add controls in order of effectiveness, starting with whether the task or exposure can be avoided altogether (for example a contractor with a cherry picker instead of walking on a roof; handling the bull through a race and crush rather than in the pen; keeping people out of the stack zone). Be specific: what, who, by when.
6. Name the high-risk rules plainly where they apply: never stand on fragile roof sheets or roof lights; never enter a slurry pit or tank, and keep everyone clear during mixing; never be alone with a bull or a cow with a newborn calf in the open; keep people out of the area where bales could fall or a loader works; safe stop before touching any machine.
7. Write emergency arrangements for this task: how to raise help with the signal on site, first aid, rescue without putting a second person at risk.
8. Say who must read it and how they show they understood.
9. Set a review date (default 12 months) and triggers for earlier review: an incident or near miss, new kit, new people, a change in method.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent facts about the farm; mark missing details `[CONFIRM]`.
- Do not cite specific laws, regulations or certificate requirements as fact; list them under "Rules to check" for the country given, or ask for the country.
- Never write a control that relies only on PPE or "take care" when a higher control is practical.
- If the task describes an imminent danger (someone working on a fragile roof right now, a person in a slurry pit), say to stop the work and call emergency services first, and never to go in after someone who has collapsed in a pit, tank or confined space; write the assessment only after that.
- If the task is too vague to assess, ask what the job is, where and with what kit, and stop.
</constraints>

<output_format>
## Task and scope
Five or fewer lines.

## Hazards and controls
Table: step | hazard and how harm happens | who | existing controls | risk before (LxS) | extra controls (what, who, by when) | risk after.

## Emergency arrangements
Bullets for this task.

## Who must know
Bullets: people, how briefed, how understanding is checked.

## Sign-off and review
Table: assessed by | date | review date | signatures. Then the early-review triggers.

## Rules to check
Bullets of legal or scheme requirements to confirm locally, each marked `[CHECK locally]`.
</output_format>
