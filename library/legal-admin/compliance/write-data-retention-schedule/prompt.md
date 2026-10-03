---
schema: 1
id: write-data-retention-schedule
kind: prompt
title: Write a data retention schedule
description: Drafts a records and data retention schedule listing each record type, owner, system, retention trigger, period to verify, basis, and deletion or archiving method, with legal holds and review steps.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, build]
role: [operations-manager, founder, legal-professional, data-engineer]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-retention, records-management, storage-limitation, legal-hold, data-protection]
pairs_with:
  prompts: [map-personal-data-processing, handle-data-subject-request, write-privacy-policy]
  personas: [compliance-officer]
args:
  - name: record_types
    description: The records and data the organisation holds, ideally with the system each lives in and the team that owns it (for example HR files, payroll, invoices, customer accounts, support tickets, CCTV, marketing lists, application logs, backups), and how long things are kept today.
    type: text
    required: true
  - name: jurisdiction
    description: Countries whose law applies to the organisation and its records (tax, employment, company and data protection law all set periods), for example "Germany", "UK and Ireland", "US, Texas".
    type: string
    required: true
  - name: sector
    description: The sector, if regulated (health care, financial services, education, public sector), since sector rules often set longer or shorter periods. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Principles, Retention schedule, Legal holds and exceptions, Implementation steps, Periods to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft data retention schedules for small and mid-sized organisations, the way a records manager working with a privacy lawyer does. Two opposite rules pull on every record: keep it long enough to meet legal, tax, contractual and evidential needs, and no longer than necessary under data protection law's storage limitation principle. Most organisations fail the second: they keep everything forever "just in case", which increases breach impact, discovery cost and subject access workload. A useful schedule is a table people can act on: each record type, its owner and system, what starts the clock (the trigger), how long it is kept, why, and what happens at the end. Statutory periods differ by country and sector and change, and you cannot verify them here, so every period is labelled as a proposal to verify, never presented as the law.

Jurisdiction: {{jurisdiction}}
{{#sector}}Sector: {{sector}}{{/sector}}
</context>

<task>
Records held:
<records>
{{record_types}}
</records>

1. Principles: a short list for the policy that sits above the schedule (keep only what is needed, the trigger defines the start, legal holds override deletion, backups follow the schedule within their rotation, owners review annually).
2. Group the records into functions (finance, HR, customers and sales, marketing, operations and security, governance) and split broad items into record types that need different periods (for example HR: recruitment files of unsuccessful candidates, employee files, payroll, right-to-work checks, health and safety incidents).
3. For each record type, propose:
   - Owner and system (from the input, or [OWNER] if not given).
   - Trigger: the event that starts the period (end of financial year, end of employment, account closure, last contact, end of contract, date of incident).
   - Proposed retention period, labelled "verify".
   - Basis: the type of reason (tax or accounting law, employment law, limitation period for claims, regulatory requirement, contract, legitimate business need, consent), described in general terms.
   - End-of-life action: secure deletion, anonymisation, archive, or review.
   - Whether it contains personal data, and whether special category or sensitive data.
4. Legal holds and exceptions: how a hold is triggered (litigation, investigation, regulator request), who issues and lifts it, and how it overrides deletion.
5. Implementation steps: assigning owners, configuring automated deletion in the named systems, handling backups and logs, deletion records, and annual review.
6. Periods to verify: every proposed period, grouped by the type of law that likely sets it, with what to check and with whom (accountant, employment lawyer, privacy counsel, sector regulator).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a retention period as the legal requirement. Label every period "verify", and where you are unsure of even a typical range, write [PERIOD TO CONFIRM] instead of a number.
- Do not cite statute sections or regulator guidance as fact unless the user supplied them.
- Prefer a trigger plus a period ("6 years after end of financial year") over a bare period.
- "Indefinitely" is acceptable only with a stated reason (for example corporate constitutional records) and is flagged for review.
- Use only the records listed; add a "possibly missing" list for common record types the input does not mention, rather than inventing that the organisation holds them.
- If the record list is too vague to schedule, ask for the main systems and teams first and give a template meanwhile.
{{> output/uncertainty}}
</constraints>

<output_format>
## Principles
Bullets.

## Retention schedule
One table per function: record type | owner | system | trigger | proposed period (verify) | basis | end-of-life action | personal data.
Then "Possibly missing record types" as bullets.

## Legal holds and exceptions
Bullets.

## Implementation steps
Numbered.

## Periods to verify
Table: law area | record types | what to check | who to ask.
</output_format>
