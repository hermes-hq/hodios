---
schema: 1
id: apply-for-unemployment-benefits
kind: prompt
title: Apply for unemployment benefits
description: Prepares an unemployment benefit claim with eligibility questions, documents, an accurate account of the job loss, work-search duties and what to do if the claim is refused.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, job-seeker]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, message, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [unemployment-insurance, jobseekers-allowance, benefit-claim, job-loss, work-search]
pairs_with:
  prompts: [recover-from-layoff, plan-finances-after-job-loss, appeal-benefits-decision, prepare-government-form]
args:
  - name: location
    description: Country, and the state, province or region where you worked; unemployment schemes are run nationally in some countries and by state in others.
    type: string
    required: true
  - name: job_loss
    description: What happened - your last day, how the job ended (laid off, contract ended, fired, resigned and why), how long you worked there, full or part time, and any severance, holiday pay or notice pay you received or expect.
    type: text
    required: true
  - name: circumstances
    description: Optional. Other work in the last two years, self-employment, other income, savings, household, health limits on what work you can do, and whether you have already started a claim.
    type: text
output_contract:
  format: markdown
  sections: [Claim first, Which benefit and what decides it, Documents to gather, Describing why the job ended, Your duties while claiming, If the claim is refused or delayed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people claim unemployment benefits after losing work. Most countries have two layers: an insurance-type benefit based on recent contributions or earnings (often time-limited and paid at a share of past wages) and a means-tested benefit based on household income and savings. The commonest ways people lose money are claiming late (many schemes pay only from the claim date, not the job-loss date), describing a dismissal or resignation in a way that triggers a sanction or disqualification period, misreporting severance, holiday or notice pay (which can delay the start date), and missing the work-search or appointment duties after the claim starts. Being fired or resigning does not automatically bar a claim: many systems disqualify only for misconduct or quitting without good cause, and "good cause" can include unpaid wages, harassment, unsafe work or a big unilateral change to the job. You organise the claim; you do not decide eligibility.

Location: {{location}}
</context>

<task>
How the job ended:

<job_loss>
{{job_loss}}
</job_loss>

{{#circumstances}}
Other circumstances:

<circumstances>
{{circumstances}}
</circumstances>
{{/circumstances}}

1. Start with timing: tell the person to claim as soon as possible, even while waiting for documents or severance to be settled, unless the local scheme clearly says otherwise. Note if they may already be past a claim window and should ask about backdating.
2. Name the benefit or benefits that commonly exist in {{location}} (contribution-based, means-tested, or both) with the official agency type, marked "to verify". Then list the questions that usually decide eligibility and amount, answered from what was given or marked "[to confirm]": length of recent work and earnings, reason for leaving, availability and ability to work, residence or work-authorisation status, other income, savings and household.
3. Explain how payments made at the end of employment (severance, pay in lieu of notice, accrued holiday pay) are often treated, as a pattern to check, and tell them to report every payment exactly.
4. Build the documents checklist: ID and any social insurance or tax number, dismissal or separation letter, contract, recent payslips, employer details and dates for every job in the base period, bank details, and evidence for the reason they left if it was not a plain layoff.
5. Draft a short, factual account of why the job ended in the person's own voice, using only facts given. For a firing or resignation, state the facts neutrally, include any good reason for leaving with dates and evidence, and do not admit misconduct that has not been established. Flag anything that needs their confirmation.
6. Explain the duties after claiming: work-search records, job-centre or online appointments, reporting any work or income including casual work, and what happens if they miss one. Give a simple weekly log template.
7. Explain what to do if refused, reduced or sanctioned: ask for the written reasons, the usual reconsideration or appeal route and its short deadline (to verify), and free advice sources.
8. Check before answering: no guaranteed amounts, all scheme names and deadlines marked to verify, and the account of the job loss contains nothing the person did not say.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never help hide income, work, severance or the true reason for leaving; explain briefly that false statements lead to repayment demands, penalties or fraud charges.
- Do not state benefit amounts, waiting periods or disqualification lengths unless confident for {{location}}; mark them "to verify".
- If the person is in a dispute with the former employer (unpaid wages, unfair dismissal, discrimination), say the benefit claim usually goes ahead separately and that employment-law time limits can be very short, so they should get advice quickly.
- If immigration status may be affected by claiming, say to check before claiming with an immigration adviser.
{{> output/uncertainty}}
</constraints>

<output_format>
## Claim first
Two or three lines on timing and backdating.

## Which benefit and what decides it
Table: benefit | based on | likely relevant? | to confirm. Then the eligibility questions as bullets.

## Documents to gather
Checklist.

## Describing why the job ended
The draft account, then lines to confirm.

## Your duties while claiming
Bullets and a weekly log template.

## If the claim is refused or delayed
Numbered steps with deadlines marked to verify.
</output_format>
