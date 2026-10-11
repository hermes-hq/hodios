---
schema: 1
id: reduce-maintainer-workload
kind: prompt
title: Reduce a maintainer's workload
description: Finds where an open-source maintainer's hours go and cuts them with scope limits, published response expectations, support routing, automation, shared triage and personal boundaries.
category: open-source
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [maintainer]
requires: [none]
inputs: [text, notes]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [maintainer-burnout, sustainability, boundaries, triage-routine, scope-control]
pairs_with:
  prompts: [draft-maintainer-issue-replies, design-issue-intake, choose-oss-funding-model]
  personas: [open-source-maintainer]
args:
  - name: situation
    description: What you spend maintainer time on in a typical week (issues, support questions, reviews, releases, CI, chat, email from companies), roughly how many hours each, what drains you most, and who else helps.
    type: text
    required: true
  - name: hours
    description: How many hours a week you actually want to spend. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Where the time goes, Biggest drains, Changes ranked, Text to publish, Your boundaries, Check in four weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Maintainer overload rarely comes from coding. It comes from unbounded inputs: support questions in the issue tracker, notifications from everything, review requests for features outside scope, companies asking for free priority help, broken CI on the main branch, and the feeling that every message deserves a same-day answer. The levers experienced maintainers use are: shrink and publish the scope, route support elsewhere, publish honest response expectations (no service levels on volunteer time), batch work into set times, automate the repetitive parts, share triage with trusted contributors, decline paid-level demands unless they are paid, and accept that stepping back or pausing is legitimate. Each change should be judged by hours saved per week against effort to set up.

Situation:
<situation>
{{situation}}
</situation>
{{#hours}}Target hours per week: {{hours}}{{/hours}}
</context>

<task>
1. Where the time goes: a table of activities with estimated hours per week from the input, marking which are essential to the project and which only feel urgent. If hours were not given, ask for rough numbers and work with stated assumptions.
2. Biggest drains: the three activities that cost most relative to their value, and why.
3. Changes ranked: for each drain, specific changes with estimated hours saved and setup effort, ranked by saving per effort{{#hours}}, until the week fits the target hours or you say plainly that it cannot without dropping work{{/hours}}.
4. Text to publish: a short expectations section for the README or contributing guide (scope, how to get support, response times stated honestly, what paid support or sponsorship covers if any) and two saved replies for the most common draining requests.
5. Your boundaries: notification settings, set maintainer hours, a rule for declining, and when to pause or hand over the project.
6. Check in four weeks: what to measure to see whether it worked.
</task>

<constraints>
- Do not suggest working more efficiently as the main answer; remove or move work first.
- Do not promise response times on behalf of volunteers; wording should set honest expectations.
- If the situation describes signs of serious burnout, hopelessness or health effects, say kindly that pausing the project is a valid choice, suggest talking to a doctor or mental health professional, and do not produce a plan to fit in more work. If there is any sign of crisis or self-harm, point to local emergency or crisis services first.
- Do not name specific bots or services the user does not already use; describe the automation.
</constraints>

<output_format>
Use the contract's section headings in order. Where the time goes and Changes ranked as tables. Text to publish in fenced blocks.
</output_format>
