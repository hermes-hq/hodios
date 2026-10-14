---
schema: 1
id: plan-cofounder-breakup
kind: prompt
title: Plan a cofounder departure
description: Plans handling a cofounder leaving - equity and vesting questions, role and knowledge handover, access, messages to the team, customers and investors, and the legal steps to check.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder]
advice_risk: [legal]
requires: [none]
inputs: [text, document]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cofounder-exit, vesting, equity-buyback, handover, founder-conflict]
pairs_with:
  prompts: [outline-cofounder-agreement, find-cofounder, write-investor-update, announce-employee-departure]
  personas: [startup-mentor]
args:
  - name: situation
    description: What is happening - who is leaving and why (mutual, resignation, being asked to leave), how long they have been involved, their role, and how relations are now.
    type: text
    required: true
  - name: agreements
    description: What is written down - shareholder or founder agreement, vesting schedule and cliff, IP assignment, employment or service contract, board seats, loans to the company. Paste key clauses if you have them.
    type: text
    required: true
  - name: company
    description: Company stage, team size, investors, key customers who know the cofounder, and the country where the company is registered. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Situation summary, Equity and agreements to check, Handover plan, Access and assets, Communication plan, Legal and admin steps, Looking after the remaining team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders handle a cofounder leaving the company. These exits go badly when no one checks what the agreements actually say before negotiating, when the leaver keeps a large unvested or unearned stake that later blocks fundraising, when code, accounts, domains or customer relationships sit in the leaver's personal name, when IP was never assigned, and when the team, customers and investors hear rumours before a clear message. They go better when the remaining founders separate the emotional conversation from the terms, start from the written agreements, agree a handover period, and communicate quickly with one consistent story. Whether a leaver is treated as a "good" or "bad" leaver, and what happens to their shares, depends on the documents and local law.

<situation>
{{situation}}
</situation>

<agreements>
{{agreements}}
</agreements>
{{#company}}
<company>
{{company}}
</company>
{{/company}}
</context>

<task>
1. Situation summary: the facts, what is agreed so far, what is disputed, and the outcome the remaining founders want.
2. Equity and agreements to check: vesting status (vested and unvested at the leaving date), leaver provisions, buy-back rights and price, transfer restrictions, IP assignment, board and director positions, loans, any salary or notice. If no vesting or agreement exists, explain the consequences and options to negotiate. Present each as a question for the company's lawyer.
3. Handover plan: knowledge to transfer (systems, code, suppliers, customers, investors), a handover period and checklist, and who takes over each responsibility.
4. Access and assets: accounts, domains, code repositories, cloud services, bank and payment access, social accounts, devices and documents to transfer or revoke, in an order that keeps the business running and treats the leaver fairly.
5. Communication plan: the order (board and investors, team, key customers and partners, public), an agreed short story, and draft messages for the team and for key customers. Keep them factual and respectful.
6. Legal and admin steps: resignation as director or officer, register changes, share transfer paperwork, settlement or separation agreement, confidentiality and non-disparagement terms to consider, tax questions on any share buy-back. Present as checks.
7. Looking after the remaining team: workload redistribution, hiring or role changes, and how to answer questions about the company's future.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the founders what they are legally entitled to; frame rights and terms as questions for a lawyer, and recommend legal advice before making any offer or revoking access in a dispute.
- Do not suggest locking the leaver out of accounts or withholding pay in a way that could breach their contract or local law; suggest agreed, documented steps.
- Keep messages free of blame and private details.
- If there is a serious allegation (fraud, harassment), say the process needs a lawyer and possibly HR or the board before anything else.
</constraints>

<output_format>
## Situation summary
## Equity and agreements to check
Table: Topic | What the documents say | Question for the lawyer.
## Handover plan
Checklist with owner and date.
## Access and assets
Table: Asset | Current holder | Action | When.
## Communication plan
Order, then draft messages.
## Legal and admin steps
Checklist.
## Looking after the remaining team
</output_format>
