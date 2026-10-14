---
schema: 1
id: plan-newborn-immigration-status
kind: prompt
title: Plan a newborn's immigration status abroad
description: Plans the papers for a baby born to parents living abroad on permits, covering birth registration, citizenship through the parents, the first passport and the baby's residence permit, with deadlines.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [newborn-paperwork, birth-registration, child-residence-permit, consular-registration, first-passport]
pairs_with:
  prompts: [report-change-of-circumstances, understand-residence-permit-conditions, plan-flying-with-baby]
args:
  - name: host_country
    description: The country where the baby is or will be born.
    type: string
    required: true
  - name: parents
    description: Each parent's citizenship(s) and immigration status in the host country (permit type and expiry), whether the parents are married, and where they were born. No ID numbers.
    type: text
    required: true
  - name: due_date
    description: The due date or birth date, and any planned travel with the baby. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Order of steps, Birth registration, Citizenship and first passport, The baby's right to stay, Deadlines, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A baby born to foreign parents does not automatically get the host country's citizenship in most countries, and may not even be lawfully resident until an application is made. The usual sequence is: register the birth locally, which produces the birth certificate; establish the baby's citizenship through one or both parents, which may need a consular birth registration within a time limit and can depend on the parents' marital status, where the parent was born, or whether the parent has lived in that country; get the baby's first passport, which often needs both parents' consent; then apply for the baby's residence permit in the host country, sometimes within a short deadline after birth. Some host countries give citizenship at birth when a parent has had long residence. Travelling with the baby before these steps are done can leave the baby unable to re-enter.

Host country: {{host_country}}

<parents>
{{parents}}
</parents>
{{#due_date}}Due date or birth date: {{due_date}}{{/due_date}}
</context>

<task>
1. Order of steps: a numbered sequence from birth to the baby having a passport and a right to stay, showing which step needs the output of the one before.
2. Birth registration: where and how births are commonly registered in the host country, the usual deadline and documents (parents' passports, marriage certificate, translations), marked to confirm.
3. Citizenship and first passport: for each parent's country, whether citizenship commonly passes to a child born abroad, any condition (marriage, the parent's own birthplace, registration within a deadline), consular registration, and the first passport steps including both parents' consent. Note possible dual citizenship for the baby.
4. The baby's right to stay: whether the host country might give citizenship at birth because of a parent's residence (to confirm), and otherwise the residence permit or dependant application, its deadline and evidence.
5. Deadlines: a table counted from the due or birth date, with "to confirm" on each.
6. What to confirm: questions for the local registry, each parent's consulate and the immigration authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Mark every deadline, fee and rule "typical, confirm" with the named office; never state them as fact from memory.
- Never say the baby is or is not a citizen of a country; say what the rules commonly turn on.
- If the parents are separated, unmarried with disputed parentage, stateless, or one parent's status is uncertain, recommend a regulated adviser or free legal service.
- Warn against international travel with the baby before the right to return is secured.
{{> output/uncertainty}}
</constraints>

<output_format>
## Order of steps
Numbered.
## Birth registration
## Citizenship and first passport
Table: Parent's country | Passes to child born abroad? | Conditions | Consular steps.
## The baby's right to stay
## Deadlines
Table: Step | Deadline from birth | Office | Confirmed?
## What to confirm
Grouped by office.
</output_format>
