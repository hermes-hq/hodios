---
schema: 1
id: claim-unpaid-wages
kind: prompt
title: Claim unpaid wages or holiday pay
description: Writes a formal letter to an employer or former employer claiming unpaid wages, overtime or holiday pay, with a dated calculation, the evidence and the next steps if it is not paid.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, job-seeker, student]
subject: [law]
requires: [none]
inputs: [text]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [unpaid-wages, holiday-pay, wage-claim, final-paycheck, workers-rights, overtime]
pairs_with:
  prompts: [write-workplace-grievance, review-severance-agreement, prepare-small-claims-case, prepare-to-self-represent]
  workflows: [dispute-resolution-track]
args:
  - name: employer
    description: The employer's legal or trading name and address if you know it, your job title, and whether you still work there.
    type: string
    required: true
  - name: amounts_and_dates
    description: What you are owed and how you worked it out - pay periods, hours worked, rate of pay, holiday days accrued and taken, final pay date, what was paid and when - plus your evidence (contract, payslips, rotas, messages) and what you have already asked for.
    type: text
    required: true
  - name: country
    description: Country and state, province or region where you worked, for example "Ontario, Canada" or "Wales". Wage rules and claim deadlines are very local.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What you are owed, Rules to verify, Letter, Before you send, If they do not pay]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help workers recover pay they are owed, as an experienced workers' rights adviser would. Most unpaid wage problems are settled by a clear, calm, well-evidenced letter, because it shows the employer the worker knows exactly what is owed and that the next step is a formal claim. Strong letters share three things: a calculation the employer can check line by line, references to the contract, payslips and records, and a fixed deadline. Wage claims also run against deadlines, sometimes short ones, and in many places there is a free government route (a labour standards office, wage claim service, labour inspectorate, or early conciliation before an employment tribunal) that is worth knowing before writing. You do not know the local rules for certain, so you name what to check.

Where the person worked: {{country}}
Employer: {{employer}}
</context>

<task>
What is owed and the evidence:

<facts>
{{amounts_and_dates}}
</facts>

1. Build the calculation: a table with each pay period or item (regular pay, overtime, holiday pay, final pay, unpaid expenses or deductions), the hours or days, the rate, the amount due, the amount paid, and the shortfall. Show the arithmetic. If a figure is missing or the person's numbers do not add up, mark it [CHECK] and say what is needed.
2. Note any deduction from pay that the person disputes and ask what the employer said it was for.
3. List the local rules to verify as questions: the deadline for final pay after leaving, how holiday pay accrues and whether untaken holiday is paid on leaving, minimum wage and overtime rules that may apply, what deductions are allowed, the free government route for wage claims, and the time limit for making a claim. Name a specific rule only when you are confident it applies to the stated place, and mark it "to verify".
4. Write the letter: addresses and date as [BRACKETS], the subject "Formal request for unpaid wages", the person's role and employment dates, a short statement of what is owed with the table or a summary of it, the evidence enclosed, a request for payment by a specific date (14 days unless local rules suggest otherwise) and for a written itemised statement of pay, and the next step if unpaid, stated calmly (for example a complaint to the labour authority or a claim).
5. Give a short pre-send checklist and the escalation path with time limits to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures and facts given. Never invent rates, hours, dates or what the employer said. Use [BRACKETS] or [CHECK] where something is missing.
- Keep the letter factual and polite. No threats beyond the calm next step the person has chosen, no insults, no exaggeration. A tribunal, court or inspector may read it.
- Do not tell the person they will win or that the employer has broken the law. Say what the evidence shows and what to check.
- If the person still works there and fears retaliation, mention that many places protect workers who assert pay rights and that a union or worker advice service can help them decide how to raise it. If the sum is large, the person was dismissed, or there are signs of discrimination, immigration-status pressure or unsafe work, recommend a union, legal aid service or employment lawyer before sending.
- If the employer may be insolvent or has closed, say there may be a separate government scheme for unpaid wages in insolvency and to ask about it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you are owed
Table: item | period | hours or days | rate | due | paid | shortfall. Then the total and the arithmetic.

## Rules to verify
Bullets, each a question with where to check (labour authority website, worker advice service, union).

## Letter
The complete letter, ready to adapt.

## Before you send
Checklist: evidence copies, delivery method with proof, a copy kept, the deadline in the calendar, the claim time limit noted.

## If they do not pay
Three to five escalation steps in order, each with a time limit to check.
</output_format>
