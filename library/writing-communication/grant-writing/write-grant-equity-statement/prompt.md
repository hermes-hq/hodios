---
schema: 1
id: write-grant-equity-statement
kind: prompt
title: Write the equity, diversity and inclusion section of a grant
description: Writes the equity, diversity and inclusion section of a grant, naming who may be excluded and why, specific costed actions to remove barriers, and how reach will be monitored.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, researcher, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [equity-diversity-inclusion, access-barriers, inclusive-delivery, funder-criteria, monitoring-data]
pairs_with:
  prompts: [write-grant-application, write-grant-involvement-section, write-grant-evaluation-plan]
  personas: [grant-writer]
args:
  - name: project
    description: The project, who it is meant to reach, where, and how it will be delivered.
    type: text
    required: true
  - name: current_practice
    description: Who currently uses your services and who does not (with any data), your team and governance, and what you already do on access and inclusion.
    type: text
    required: true
  - name: funder_guidance
    description: The funder's question, definitions, country context and word limit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [EDI section, Barriers and actions, Costs, Monitoring, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who has assessed equity, diversity and inclusion sections. Weak sections say the project is "open to everyone" and the organisation "values diversity"; reviewers read that as no plan. Strong sections compare who the project should reach with who currently takes part, using data where it exists; name the specific barriers that keep some groups out (cost, transport, timing, language, disability access, digital exclusion, caring responsibilities, distrust from past experience, eligibility rules); commit to specific actions with costs in the budget; say how the team and decision-making reflect the people served or how that will change; and say how participation will be monitored and acted on. Legal categories and terms differ by country, so the funder's definitions and local law take priority, and people's own words for themselves should be used where known.

<project>
{{project}}
</project>

<current_practice>
{{current_practice}}
</current_practice>
{{#funder_guidance}}
<funder_guidance>
{{funder_guidance}}
</funder_guidance>
{{/funder_guidance}}
</context>

<task>
1. Compare the intended reach with current participation and name the groups who are likely to be under-represented, with evidence or marked as an assumption.
2. For each group, identify the specific barriers and an action that addresses each, with timing and who is responsible.
3. Identify the costs of these actions (for example interpreters, travel bursaries, childcare, accessible venues, outreach time, paying people for their input) and whether they are in the budget.
4. Describe how the team, volunteers and decision-making reflect the communities served, or the concrete steps planned, without overstating.
5. Describe monitoring: what data will be collected (voluntary, with consent and data protection), how often it is reviewed, and what will change if some groups are still not reached.
6. Write the section within the funder's limit (default about 300 to 400 words), using the funder's definitions and terms.
7. Gaps: missing data or decisions, marked [NEEDED: ...].
</task>

<constraints>
- Do not invent participation data, staff demographics or partnerships; mark gaps.
- Avoid tokenistic or deficit language; describe barriers created by systems and services, not shortcomings of people.
- Do not claim legal compliance or give legal advice; follow the funder's terms and say to check local equality law if relevant.
- Collect demographic data only voluntarily and with clear purpose.
</constraints>

<output_format>
## EDI section
With approximate word count against the limit.
## Barriers and actions
Table: Group | Barrier | Action | When | Who.
## Costs
## Monitoring
## Gaps
</output_format>
