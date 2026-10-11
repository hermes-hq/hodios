---
schema: 1
id: draft-nanny-agreement
kind: prompt
title: Draft a nanny or home carer agreement
description: Drafts a written agreement with a nanny, au pair or home carer covering hours, pay, overtime, duties, leave, sickness, notice and household rules, with the local employment points to check.
category: contracts
version: 1.0.0
status: incubating
stage: [build]
role: [parent, individual]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [nanny-contract, au-pair, home-carer, domestic-employment, household-employee, work-agreement]
pairs_with:
  prompts: [set-up-household-employer, write-babysitter-handbook, plan-nanny-share, choose-childcare]
args:
  - name: role
    description: Nanny, au pair, live-in or live-out carer, or other home help; who they care for (children's ages, or an older relative's needs in general terms); start date and any trial period.
    type: text
    required: true
  - name: terms
    description: Agreed hours and days, pay (gross or net, hourly or salary), overtime and babysitting rates, holidays, sick pay, expenses and car use, accommodation and meals if live-in, duties, household rules, and notice.
    type: text
    required: true
  - name: country
    description: Country and state or region. Whether the carer is an employee and what minimum pay, hours, leave and tax rules apply depends on it.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you use this, Agreement, Drafting notes, Gaps to decide, Check locally before signing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Families hiring someone to work in their home often agree terms by message and fall out later over hours, pay and time off. What experienced nanny agencies and household employers put in writing: whether pay is agreed gross or net (agreeing a net figure leaves the family carrying any change in tax); exact hours, what counts as overtime and its rate, and how babysitting outside hours is paid; guaranteed hours, so that if the family goes away or does not need the carer, pay continues unless agreed otherwise; paid holiday and who chooses the dates; sick pay and what happens when the children or the family are sick; duties (childcare only, or also children's laundry, cooking, tidying, school runs, light housework), since duty creep is the commonest dispute; driving, car use and mileage; live-in accommodation, meals, guests and privacy; household rules (screen time, food, discipline approach, phones, social media and photos of the children); confidentiality; trial period and notice on both sides; and what happens if the job changes, such as a new baby. In most countries a nanny or carer who works regular hours in a family's home is the family's employee, which brings minimum wage, written terms, tax, insurance and leave rules the agreement cannot reduce. Au pair rules are often separate and stricter.

Country and region: {{country}}

<role>
{{role}}
</role>
</context>

<task>
<terms>
{{terms}}
</terms>

1. Check the terms against what a home-care agreement needs and list anything missing.
2. Draft the agreement in plain, warm English with numbered clauses: parties with placeholders, start date and trial period, job title and duties, place of work, hours and schedule, guaranteed hours, pay (stating gross or net), payment date, overtime and babysitting, expenses and car use, holiday, public holidays, sickness and absence, accommodation and meals if live-in, household rules, safety and emergencies, confidentiality and photos, reviews of pay and duties, notice and ending the arrangement, and signatures.
3. Add drafting notes explaining the important choices, especially gross versus net pay and guaranteed hours.
4. List gaps to decide with options and trade-offs.
5. List what to check locally before signing: whether the carer is an employee, minimum pay and hours, required written terms, paid leave, tax and social contributions, employer insurance, right to work, background checks, and au pair rules if relevant, described as checks and not as confirmed rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the terms given; put every missing name, amount and date in [BRACKETS]. Do not invent pay rates or legal minimums.
- Do not describe the carer as self-employed or a contractor to avoid employer duties; if the user asks for that, explain that status usually depends on the real working arrangement, not the label.
- Do not state employment, tax or immigration rules as fact; list them under "Check locally before signing".
- Keep the agreement fair to both sides; a clear, fair agreement keeps good carers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you use this
Three lines: draft status, the biggest local checks, when to get advice.

## Agreement
The full draft with numbered clauses and signature block.

## Drafting notes
Bullets keyed to clause numbers.

## Gaps to decide
Table: gap | options | trade-off.

## Check locally before signing
Checklist.
</output_format>
