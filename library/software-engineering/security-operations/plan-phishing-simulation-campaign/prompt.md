---
schema: 1
id: plan-phishing-simulation-campaign
kind: prompt
title: Plan a phishing simulation programme
description: Plans an ethical phishing simulation programme with approvals, scenarios by difficulty, cadence, report-rate metrics, supportive follow-up for clickers and honest reporting.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [security-engineer, manager]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [phishing-simulation, security-awareness, report-rate, human-risk, ethics]
pairs_with:
  prompts: [write-security-awareness-module, investigate-reported-phishing, write-soc-metrics-report]
args:
  - name: organisation
    description: Size, countries, departments and roles most targeted (finance, HR, executives, support), languages, mail platform and whether a report-phish button exists.
    type: text
    required: true
  - name: goals
    description: What you want - more reporting, fewer credential submissions, an audit or insurance requirement, a baseline after an incident.
    type: text
  - name: constraints
    description: Optional - simulation tool, budget, works council or union requirements, past campaigns and how staff reacted.
    type: text
output_contract:
  format: markdown
  sections: [Ground rules and approvals, Programme design, Scenario set, Cadence and targeting, Measurement, Follow-up, Reporting, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Phishing simulations can build a reporting habit or destroy trust in the security team. The difference is in design choices. Click rate alone is a poor metric: it swings with lure difficulty and drops simply because people learn to recognise the simulation tool. Report rate and time to first report matter more, because one early report lets the security team pull a real campaign from every mailbox. Difficulty should be rated (the NIST Phish Scale is one method) so results can be compared over time. Lures that exploit fear or hope about pay, bonuses, layoffs, health or personal emergencies cause real distress and damaged trust in organisations that used them; they are widely regarded as off limits. Shaming or punishing clickers lowers reporting. Simulations that capture typed passwords must not store them. In several countries employee monitoring rules, data protection and works councils apply, so HR, legal and worker representatives should approve before launch. The service desk and SOC need to know a campaign is running so they do not waste time or block it.
</context>

<task>
Plan a phishing simulation programme for:

<organisation>
{{organisation}}
</organisation>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Ground rules and approvals: who must approve (HR, legal or privacy, worker representatives where they exist, leadership), the off-limits lure topics, data handling (no stored passwords, aggregate reporting, retention), and who is told in advance (service desk, SOC, mail administrators for allowlisting through the platform's supported method).
2. Programme design: purpose, the link to training, the report-phish button as the desired behaviour, and how a reporter gets instant positive feedback.
3. Scenario set: eight to twelve scenarios across difficulty levels and roles (for example a shared document notice, a delivery update, an MFA fatigue awareness message, an invoice change request for finance, a fake vendor portal), each with difficulty, cues a careful reader could spot, and the lesson. Keep them generic, not imitating a real named company beyond common service types, and none from the off-limits list.
4. Cadence and targeting: frequency (for example monthly small sends rather than one blast), randomised timing so colleagues do not warn each other, role-based scenarios, and new-joiner timing.
5. Measurement: report rate, time to first report, credential submission rate, click rate with difficulty noted, repeat behaviour trends, and how to read changes.
6. Follow-up: a short teachable-moment page, supportive follow-up for repeat clickers (extra help, not punishment), and recognition for reporters.
7. Reporting: an aggregate leadership report format that avoids naming individuals.
8. Risks: complaints, real attacks during campaigns, allowlisting gaps, and how to handle them.
</task>

<constraints>
- Do not write lures about pay, bonuses, layoffs, health, family emergencies or other distressing topics, even if asked; explain why and offer an alternative.
- Do not design capture of real passwords or personal data; credential-entry tests only record that a submission happened.
- Do not propose disciplinary action tied to simulation results.
- Simulations are only for the user's own organisation with approval; do not plan sends to people outside it.
- Employee monitoring and data protection rules vary by country; flag where legal review is needed rather than stating the law.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the eight sections as headings. "Scenario set" is a table: # | Scenario | Audience | Difficulty | Cues | Lesson. "Measurement" is a table: Metric | Why | Target direction. End with a three-month launch timeline.
</output_format>
