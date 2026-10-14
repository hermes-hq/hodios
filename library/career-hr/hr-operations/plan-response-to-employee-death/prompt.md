---
schema: 1
id: plan-response-to-employee-death
kind: prompt
title: Plan the response to an employee's death
description: Plans HR's response when an employee dies - contact with the family, telling colleagues, support for the team, final pay and benefits to confirm, the person's work and accounts, and remembrance.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, manager, founder]
advice_risk: [legal, mental-health]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [bereavement, death-in-service, grief-at-work, team-support, sensitive-communication]
pairs_with:
  prompts: [write-condolence-message, plan-employee-offboarding, answer-employee-hr-question]
  personas: [hr-business-partner]
args:
  - name: situation
    description: What is known and how the company heard, the role and team (no name needed), whether the death happened at work, what the family has said about sharing news, and how long ago.
    type: text
    required: true
  - name: company
    description: Country or state, company size, benefits the person had (life cover, pension, death-in-service), employee assistance or counselling available, and who in the company is closest to the family. Optional.
    type: text
output_contract:
  format: markdown
  sections: [First 48 hours, Contact with the family, Telling colleagues, Support for the team, Pay, benefits and records, Work and accounts, Remembrance, Questions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help HR respond to the death of an employee the way an experienced, compassionate HR lead does. What matters most: one named person as the family's single point of contact, so they are not contacted by payroll, IT and a manager separately; the family decides what is shared about the cause; close colleagues hear in person before a wider message goes out; and the practical steps (final pay, benefits such as life cover or death-in-service payments, pension, return of belongings) are handled promptly and explained once, in writing, without asking the family for things the company can find out itself. Grief in the team is uneven: close colleagues may need time off and workload relief, and some people are affected more than expected. Automated systems (payroll, emails, birthday reminders, access reviews) can cause real hurt if not stopped. If the death happened at work, it may need reporting to authorities and an investigation, and the plan changes.

<situation>
{{situation}}
</situation>
{{#company}}
<company>
{{company}}
</company>
{{/company}}
</context>

<task>
1. First 48 hours: a short ordered list of what to do now and who does it. If the death occurred at work or may be work-related, put reporting and securing the scene or records first and say legal and health and safety advice is needed.
2. Contact with the family: who the single contact is, what they say and do not ask in the first call, and what to offer (help with practical matters, attending the funeral if welcome).
3. Telling colleagues: the order (close team in person, then wider), a short message for the wider company using only what the family has agreed to share, and what managers should say if asked about the cause.
4. Support for the team: counselling or employee assistance, time off for the funeral, workload relief and redistribution, and watching for people struggling more than expected; when to signpost to professional or crisis support.
5. Pay, benefits and records: final pay items, accrued leave, life cover or death-in-service benefits, pension, expenses, and who receives what, listed as items to confirm with payroll, the insurer, the pension provider and local rules.
6. Work and accounts: stopping automated messages, access and accounts handled respectfully, personal items returned, clients or contacts informed, and the work covered.
7. Remembrance: options to discuss with the family and the team, never imposed.
8. Questions to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never share the cause of death or private details without the family's agreement.
- Do not state who is entitled to final pay or benefits, or tax treatment, as fact; mark them "confirm locally" and with the providers.
- Do not ask the family for documents or decisions in the first contact unless they raise them.
- Use the role, not the person's name, in templates; leave [NAME] placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## First 48 hours
Numbered, with owner.
## Contact with the family
## Telling colleagues
Order, then the draft message.
## Support for the team
## Pay, benefits and records
Table: Item | Confirm with | Notes.
## Work and accounts
Checklist.
## Remembrance
## Questions to confirm
Numbered.
</output_format>
