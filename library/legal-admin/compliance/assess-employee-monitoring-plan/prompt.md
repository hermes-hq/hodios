---
schema: 1
id: assess-employee-monitoring-plan
kind: prompt
title: Assess an employee monitoring plan
description: Reviews a plan to monitor staff email, devices, location, calls or productivity for necessity, proportionality, transparency and consultation duties, and suggests a less intrusive design.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, manager, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employee-monitoring, workplace-privacy, bossware, proportionality, staff-transparency]
pairs_with:
  prompts: [draft-dpia, run-legitimate-interests-assessment, plan-cctv-data-compliance, write-employee-handbook]
args:
  - name: plan
    description: What monitoring is proposed - tools (email scanning, keystroke or screenshot software, web filtering, GPS in vehicles, call recording, badge data), who is monitored, when, what is collected, who sees it, how long it is kept, and why.
    type: text
    required: true
  - name: context
    description: The organisation, the country, whether staff are remote, whether there is a union or works council, and what prompted this (a security incident, productivity concerns, a client requirement). Optional.
    type: text
output_contract:
  format: markdown
  sections: [The problem being solved, Proportionality review, Less intrusive design, Transparency and consultation, Staff notice, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employer test a staff monitoring plan before it goes live. In many countries employees keep a reasonable expectation of privacy at work; regulators and courts look at whether monitoring has a legitimate, specific aim, whether it is necessary and the least intrusive way to meet it, whether staff were told clearly in advance, and whether the data is limited, secured and not reused for other purposes. Continuous screenshots, keystroke logging, webcam monitoring and tracking outside working hours are the measures most often found excessive. Some countries require consultation or agreement with a works council or employee representatives before introducing monitoring tools, and covert monitoring is usually justified only for specific suspected wrongdoing, briefly and with records. Monitoring also has side effects employers underestimate: trust, morale, and capturing special category data such as health or union activity.
</context>

<task>
Plan:

<plan>
{{plan}}
</plan>
{{#context}}

Context:
<context_info>
{{context}}
</context_info>
{{/context}}

1. The problem being solved: restate the aim specifically. If the aim is vague ("see who is working"), say so and suggest a measurable aim.
2. Proportionality review: for each monitoring element, assess necessity, intrusiveness, who is affected, data collected incidentally (personal messages, health, union activity), and a verdict (keep, change, drop).
3. Less intrusive design: alternatives that meet the aim (outcome-based performance management, security controls such as data loss prevention on specific data, alerts on defined events rather than continuous capture, aggregate reporting, limits on hours and locations, short retention, strict access).
4. Transparency and consultation: what staff must be told and when, policy updates, whether consultation with representatives or a works council may be required (verify), whether a DPIA is advisable, and rules for any covert monitoring.
5. Staff notice: draft a clear notice explaining what is monitored, why, when, what is not monitored, who sees it, retention, and how to raise concerns.
6. Get advice if.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent laws, consultation thresholds or penalties. Mark local rules "verify".
- Do not help design covert or disguised monitoring of staff generally, monitoring of personal devices or accounts without clear lawful basis, or monitoring aimed at union activity or whistleblowers. Say why.
- Do not present a monitoring tool as lawful simply because staff signed a contract clause or clicked "accept".
- Recommend employment and privacy advice for covert monitoring, monitoring in countries with works councils, or monitoring of special category data.
{{> output/uncertainty}}
</constraints>

<output_format>
## The problem being solved
Short paragraph.

## Proportionality review
Table: element | aim served | intrusiveness | incidental data | verdict.

## Less intrusive design
Bullets.

## Transparency and consultation
Checklist.

## Staff notice
Draft notice.

## Get advice if
Bullets.
</output_format>
