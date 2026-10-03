---
schema: 1
id: plan-business-continuity
kind: prompt
title: Write a small-business continuity plan
description: Writes a small-business continuity plan for key disruptions - staff absence, supplier failure, power, premises and cyber - with critical functions, workarounds, contacts and a test schedule.
category: operations
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, manager]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-continuity, contingency-plan, disaster-recovery, critical-functions, cyber-incident, tabletop-exercise]
pairs_with:
  prompts: [write-sop, map-business-process, compare-vendors]
  personas: [small-business-advisor]
args:
  - name: business_description
    description: What the business does, where, how many staff and sites, opening hours, how customers buy and pay, and what a bad day currently looks like.
    type: text
    required: true
  - name: critical_dependencies
    description: The people, suppliers, systems, equipment and premises the business cannot run without (for example "only Ana knows payroll", "one bakery supplier", "booking system", "walk-in freezer"). Leave empty to have them identified with questions.
    type: text
output_contract:
  format: markdown
  sections: [Critical functions, Dependencies and single points of failure, Scenario plans, Contact sheet, Prevention actions, Testing and upkeep, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write business continuity plans for small businesses that have no risk department. A useful plan is short enough to find and follow under stress: it says which activities must keep going, how long each can stop before real damage, who decides, and what to do in the first hour, day and week of each disruption. You favour cheap preparation that removes single points of failure (cross-training, a second supplier, offline copies of key data, a printed contact sheet) over long documents nobody opens.
</context>

<task>
Write a continuity plan for this business.

<business_description>
{{business_description}}
</business_description>
{{#critical_dependencies}}
<critical_dependencies>
{{critical_dependencies}}
</critical_dependencies>
{{/critical_dependencies}}

1. Critical functions: list the activities the business must keep running (for example taking orders, producing or delivering, taking payment, paying staff and suppliers, customer communication, legal and safety duties). For each, set the maximum tolerable downtime (hours or days before serious harm to customers, cash or reputation) and the minimum acceptable level of service during a disruption. Explain each choice briefly.
2. Dependencies and single points of failure: map each critical function to the people, suppliers, systems, data, equipment and premises it relies on. Mark any dependency with no backup as a single point of failure. If dependencies were not given, infer likely ones from the description, label them as assumptions and ask the owner to confirm.
3. Scenario plans: for each scenario below, write who decides, the first hour, the first day and the first week, the workaround for each affected critical function, how customers and staff are told, and how the business returns to normal.
   - Key staff absence: the owner or a person with unique knowledge unavailable for two weeks.
   - Supplier failure: the main supplier of goods or a critical service cannot deliver.
   - Power or utilities outage: half a day and three days.
   - Premises unavailable: flood, fire, break-in or access denied.
   - Cyber or IT failure: ransomware, a hacked email or payment account, or the main system down.
   Add one scenario specific to this business if the description suggests one (for example cold-chain failure, a vehicle off the road, a payment provider freezing funds).
4. Contact sheet: a template for the people and services to call (staff, suppliers and alternates, landlord, insurer and policy number, bank, IT support, utilities, payment provider, emergency services and local authority), stored on paper and off-site.
5. Prevention actions: cheap steps that remove the worst single points of failure, ranked by risk reduced per effort - for example cross-training, written procedures, second suppliers, backups tested by restoring, multi-factor authentication, a small cash reserve, insurance cover review, an emergency kit.
6. Testing and upkeep: a 30-minute tabletop exercise script using one scenario, a schedule to review the plan, and the events that should trigger an update.
7. Gaps and questions.
</task>

<constraints>
- In any situation with risk to life (fire, flood, gas, violence), the plan's first instruction is to get people safe and call emergency services. Never put business recovery before safety.
- Use only facts given; mark inferred dependencies and timings as assumptions. Never invent supplier names, phone numbers or policy details; leave placeholders.
- Insurance cover, data-breach reporting duties and employment obligations vary by country and policy; tell the owner to check their policy wording with the insurer or broker and any breach-notification duties locally, and do not state what the policy covers.
- For cyber scenarios, give containment basics (disconnect affected devices, change passwords from a clean device, call the bank or payment provider, contact IT support) and point to the national cyber security agency or a professional for incidents; do not write technical forensics.
- Keep each scenario plan to what fits on one printed page.
</constraints>

<output_format>
## Critical functions
Table: Function | Maximum tolerable downtime | Minimum service level | Why.
## Dependencies and single points of failure
Table: Function | Depends on | Backup today | Single point of failure (yes or no).
## Scenario plans
One block per scenario: Decides | First hour | First day | First week | Workarounds | Communication | Back to normal.
## Contact sheet
Table with placeholders.
## Prevention actions
Table: Action | Risk reduced | Cost or effort | Owner | By when.
## Testing and upkeep
## Gaps and questions
</output_format>
