---
schema: 1
id: recruit-personal-assistant
kind: prompt
title: Recruit a personal assistant for care
description: Helps a disabled person or their family recruit a personal assistant or private carer they employ directly, with a job ad, interview questions, checks, a trial period and employer duties to verify.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [message, questions, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [personal-assistants, direct-employment, finding-carers, home-care, self-directed-support]
pairs_with:
  prompts: [set-up-household-employer, choose-home-care-agency, write-care-profile]
  personas: [eldercare-advisor]
args:
  - name: support_needed
    description: Who the support is for, what help is needed (personal care, outings, cooking, driving, nights), hours and days, what matters in a person (interests, gender, language, non-smoker), and the country or region.
    type: text
    required: true
  - name: arrangement
    description: How it is funded (personal budget, direct payments, own money), the pay you have in mind, and who will be the employer. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The role, Job advert, Where to advertise, Shortlisting and interview, Checks before they start, Trial and first weeks, Employer duties to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people recruit a personal assistant (PA) or private carer they employ directly, the way an experienced independent living adviser would. Directly employing someone gives more control over who comes and when than an agency, but the person or family becomes an employer, with duties that often include contracts, pay records, tax, insurance and background checks, and that vary a lot by country. What works in recruitment: a job advert written around the person's life and personality, not just tasks; being clear and honest about intimate care, hours and pay; asking scenario questions at interview and having the person themselves lead or take part; checking references and the relevant background checks; a paid trial; and a backup plan for sickness and holidays, which agencies cover but a single PA does not. Many areas have support organisations for people using personal budgets that help with payroll and recruitment.

<support_needed>
{{support_needed}}
</support_needed>
{{#arrangement}}Arrangement: {{arrangement}}{{/arrangement}}
</context>

<task>
1. The role: a short role summary with tasks, hours, essential and desirable qualities, and what the person wants their PA to be like, with intimate care stated plainly.
2. Job advert: a warm, specific advert in a code block that leads with the person (as they would want to be described), states hours, pay as given or "to confirm", location, what the work involves and how to apply. Do not include the person's full name, address or medical details.
3. Where to advertise: kinds of places (local PA registers or job boards run by support organisations, community and faith groups, colleges with health and social care courses, word of mouth) without naming specific sites.
4. Shortlisting and interview: a short phone screen, then interview questions including scenario questions (a fall, a refusal, a boundary such as being asked to lend money), how the person leads or takes part, and safety tips for interviewing in the home (another person present).
5. Checks before they start: references, right to work, background checks for working with adults at risk where available, driving licence and insurance if driving, and a written contract and job description.
6. Trial and first weeks: a paid trial or shadow shifts, an induction using the care profile, clear boundaries (phones, gifts, money, visitors), a review after four weeks, and a backup plan for absence.
7. Employer duties to verify: kinds of obligations to check for the country (employment status, contract, minimum wage, holiday pay, tax and social security, pensions, employer's liability insurance, record keeping) with sources to verify them, and noting a separate entry can cover payroll setup.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state pay rates, tax thresholds, legal duties or check types as fact for a country; flag each to verify with an official source or support organisation.
- Keep the job ad free of discriminatory requirements; preferences such as gender for intimate care should be checked against local law on genuine occupational requirements.
- Keep the person's own choices central; they are the employer or the person the PA works for.
- Protect privacy in adverts; no addresses, full names or medical details.
</constraints>

<output_format>
## The role
## Job advert
Code block.
## Where to advertise
## Shortlisting and interview
Questions.
## Checks before they start
Checklist.
## Trial and first weeks
## Employer duties to verify
Checklist.
</output_format>
