---
schema: 1
id: plan-employee-offboarding
kind: prompt
title: Plan an employee offboarding
description: Plans one employee's offboarding with a dated checklist for access, equipment, final pay items, benefits, handover, the announcement and records, adjusted for why they are leaving.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, operations-manager, founder]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [offboarding, leaver-checklist, access-revocation, final-pay, knowledge-handover]
pairs_with:
  prompts: [run-exit-interview, plan-layoff-conversation, write-reference-letter]
  personas: [hr-business-partner]
args:
  - name: leaver
    description: The role (no name needed), team, length of service, last working day, notice period and whether they are serving it, on garden leave or leaving immediately.
    type: text
    required: true
  - name: reason
    description: Why they are leaving, for example resignation, end of fixed-term contract, retirement, redundancy, dismissal, or mutual agreement.
    type: string
    required: true
  - name: company_context
    description: Country or state of employment, company size, systems and equipment they hold, benefits they have (pension, health cover, equity), and any company leaver policy. Optional but makes the checklist specific.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Timeline, Checklist, Final pay items to confirm, Handover plan, Communication, Risk points, Questions for HR or an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan offboarding the way an experienced HR operations lead does. A good offboarding protects the company (data, access, equipment, knowledge) and treats the leaver with dignity, because colleagues watch how leavers are treated and former employees become customers, candidates and references. What gets missed most often: shared and admin accounts the person controlled, personal devices with company data, payroll items such as accrued untaken leave, notice pay and expense claims, benefits that end on the last day without the leaver being told, equity exercise windows, and knowledge that lived only in one head. The reason for leaving changes the plan: a resignation with notice allows a gradual handover; a dismissal or a leaver going to a competitor may need same-day access removal planned before the conversation; a redundancy can carry statutory steps and payments that differ by country.

<leaver>
{{leaver}}
</leaver>
Reason for leaving: {{reason}}
{{#company_context}}
<company_context>
{{company_context}}
</company_context>
{{/company_context}}
</context>

<task>
1. Assumptions: if the country of employment is missing, ask for it and continue with that point marked [COUNTRY]. State which parts of the plan depend on local law.
2. Timeline: work back from the last working day. Mark what happens on notice, during the notice period, on the last day and after (final pay run, benefits end, records). For involuntary exits, put access removal at the time of the conversation, not before it.
3. Checklist: grouped by owner (manager, HR, IT, payroll, the leaver). Cover accounts and admin rights, shared credentials to rotate, devices and equipment return, personal devices with company data, building access, company cards and expenses, customer and supplier contacts to reassign, out-of-office and mail forwarding, exit interview, reference policy, rehire eligibility note.
4. Final pay items to confirm: notice or pay in lieu, accrued untaken leave, outstanding expenses, bonus or commission rules, deductions, severance or statutory redundancy pay if relevant, the final payslip and tax documents. List each as an item for payroll and HR to confirm under local law and the contract; do not compute legal entitlements.
5. Handover plan: what knowledge, work and relationships to hand over, to whom, and how (handover document, recorded walkthroughs, introductions to clients). Scale it to the notice actually being worked.
6. Communication: who is told, in what order and with what words; a short neutral team announcement that respects the leaver's privacy about the reason.
7. Risk points: competitor moves, disputes, a grievance or claim in progress, protected leave, data access before leaving, and anything that needs legal review before acting.
8. Questions for HR or an employment lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state statutory notice periods, leave payout rules, severance amounts or tax treatment as fact; mark them "confirm under local law and the contract".
- Do not plan surveillance of the leaver, withholding pay to force equipment return, or anything that pressures them to waive rights. If asked, say why it is risky and suggest lawful alternatives.
- Keep the reason for leaving private in communications unless the leaver agrees otherwise.
- Use the role, not the person's name.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Timeline
Table: When | What | Owner.
## Checklist
Grouped by owner, as checkboxes.
## Final pay items to confirm
Table: Item | Applies? | Confirm with.
## Handover plan
## Communication
Order of who is told, then the draft announcement.
## Risk points
## Questions for HR or an employment lawyer
Numbered.
</output_format>
