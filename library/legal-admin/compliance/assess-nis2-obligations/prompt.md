---
schema: 1
id: assess-nis2-obligations
kind: prompt
title: Check whether NIS2 applies to you
description: Checks whether an organisation falls under the EU NIS2 cybersecurity directive as an essential or important entity, and lists its risk management, incident reporting, registration and board duties.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, executive, operations-manager, security-engineer]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [nis2, cybersecurity-regulation, incident-reporting, essential-entities, supply-chain-security, eu-law]
pairs_with:
  prompts: [assess-ai-act-obligations, plan-data-breach-response, write-information-security-policy, prepare-iso-27001-readiness]
args:
  - name: organisation
    description: What the organisation does (all activities, not only the main one), headcount, annual turnover and balance sheet bands, group structure, the EU countries where it is established or provides services, and whether it supplies other organisations in critical sectors.
    type: text
    required: true
  - name: countries
    description: The EU member states where it is established and where it provides services.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Scope test, Entity type, Duties, Incident reporting, Management responsibilities, Gaps to fix first, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an organisation work out whether the EU NIS2 Directive applies and what it requires. NIS2 is a directive, so obligations come from each member state's national law, and some states transposed it late or added sectors. Scope turns on two things. Sector: the directive lists sectors of high criticality (such as energy, transport, banking, financial market infrastructure, health, drinking water, waste water, digital infrastructure including cloud, data centres and DNS, managed ICT services, public administration and space) and other critical sectors (such as postal and courier services, waste management, chemicals, food, manufacturing of medical devices, electronics, machinery and vehicles, digital providers such as online marketplaces, search engines and social networks, and research). Size: generally medium-sized or larger enterprises, measured with group links and partner enterprises taken into account, with some entities in scope regardless of size (for example certain DNS, top-level domain, trust service and public communications providers, and entities a state designates). By the directive's default, large entities in high-criticality sectors are essential and most other in-scope entities are important, though member states can designate entities as essential. Essential entities face proactive supervision and higher maximum fines than important entities. Core duties: appropriate and proportionate cybersecurity risk management measures across a set list of areas (policies, incident handling, business continuity and backups, supply chain security, secure acquisition and development, effectiveness testing, cyber hygiene and training, cryptography, human resources security, access control and asset management, multi-factor authentication); staged incident reporting to the national authority or CSIRT (an early warning within about 24 hours, a fuller notification within about 72 hours, and a final report later); registration with the authority; and management bodies that must approve the measures, oversee them, take training, and can be held liable. Organisations outside scope often feel NIS2 through customers who push its supply chain requirements into contracts.

Countries: {{countries}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>

1. Scope test: map each activity to the sector lists, apply the size test (including group links), check the size-independent categories, and conclude in scope, likely in scope, out of scope, or unclear, with the deciding facts.
2. Entity type: essential or important, and which member state's law and authority likely applies (main establishment rules for some digital providers).
3. Duties: the risk management areas written as concrete tasks for this organisation, plus registration.
4. Incident reporting: what counts as a significant incident, the staged reporting timeline as tasks, who decides and who reports, and how this fits with data breach reporting.
5. Management responsibilities: approval, oversight, training and liability for the board or directors.
6. Gaps to fix first: given what was described, ranked by risk.
7. Points to verify, including the national law's final wording and any extra sectors added by the member state. If out of scope, say what supply chain requests from customers are likely and how to prepare.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state national law names, registration deadlines or fine amounts as fact unless confident; mark "confirm in [member state] law".
- Do not conclude "out of scope" without checking the size-independent categories and group links.
- Recommend a lawyer or the national authority's guidance for borderline scope decisions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope test
Table: activity | sector list | size test | result.

## Entity type
Short paragraph.

## Duties
Checklist grouped by area.

## Incident reporting
Numbered timeline and roles.

## Management responsibilities
Bulleted list.

## Gaps to fix first
Numbered list.

## Points to verify
Numbered list.
</output_format>
