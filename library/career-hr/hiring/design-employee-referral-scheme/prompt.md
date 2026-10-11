---
schema: 1
id: design-employee-referral-scheme
kind: prompt
title: Design an employee referral scheme
description: Designs an employee referral programme for hiring - eligibility, rewards and timing, how referrals are assessed fairly, keeping referrers informed, and guarding against a less diverse workforce.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [recruiter, founder, operations-manager, manager]
requires: [none]
inputs: [notes]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employee-referrals, referral-bonus, sourcing-strategy, diverse-hiring, recruiting-programme]
pairs_with:
  prompts: [write-sourcing-search-strings, design-interview-loop]
  personas: [recruiter]
args:
  - name: company_context
    description: Company size, roles you hire most, current sources of hires, hiring volume, budget for rewards, any existing referral practice, and concerns (for example low referral numbers or a team that all looks alike).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goals and risks, Rules, Rewards, Referral process, Fairness safeguards, Launch, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiting lead who has built referral programmes at companies of different sizes. Referred hires are often faster to hire and stay longer, but referral programmes have predictable problems: people refer people like themselves, which can narrow the workforce; referred candidates get waved through or held to a different bar; referrers hear nothing back and stop referring; rewards paid on hire create disputes about who referred first; and large bonuses attract spammed referrals of people the employee barely knows. Good programmes are clear on rules, assess referred candidates on the same criteria as everyone else, give referrers fast updates, reward in ways that fit the culture and budget, and track who is being referred.

<company_context>
{{company_context}}
</company_context>
</context>

<task>
1. Goals and risks: what the programme should achieve for this company, and the specific risks given the context.
2. Rules: who can refer and who cannot (for example hiring managers for their own roles, recruiters, people in the decision), which roles are eligible, what counts as a referral (how well the referrer must know the person, the candidate's consent), duplicates and the first-referral rule, and rehires.
3. Rewards: options (cash, split payment on hire and after a qualifying period, charity donation, non-cash recognition), suggested structure for this budget, payout conditions, tax treatment to check locally, and higher rewards for hard-to-fill roles if justified.
4. Referral process: how to submit (with a short note on how the referrer knows them and what they have seen), how the candidate is contacted, the same assessment as other candidates, referrer updates at each stage, and how to handle a rejected referral kindly with the referrer.
5. Fairness safeguards: track referral outcomes by source; encourage referrals from networks the company is not reaching (communities, alumni groups, returners); avoid making referrals the main source for any role; never share the candidate's assessment details with the referrer.
6. Launch: an announcement message, a one-page guide for employees, and how to make it easy (a shareable link, roles list, a monthly reminder).
7. Measures: a few measures (share of hires from referrals, referral-to-hire rate, retention of referred hires, time to reward payout) reviewed quarterly.
</task>

<constraints>
- Referred candidates go through the same criteria and decision rule as all others.
- Do not invent typical bonus amounts as facts; propose a structure relative to the budget given and mark figures as suggestions.
- Flag tax and employment-law points to confirm locally, such as how rewards are taxed.
- Protect candidate privacy in what referrers are told.
</constraints>

<output_format>
## Goals and risks
## Rules
## Rewards
## Referral process
## Fairness safeguards
## Launch
## Measures
</output_format>
