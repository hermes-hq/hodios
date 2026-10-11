---
schema: 1
id: respond-to-pay-disparity
kind: prompt
title: Respond to a pay disparity
description: Plans what to do after learning a peer in a similar role earns more - check the comparison, frame the conversation, raise it with your manager and escalate if needed.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pay-gap, pay-equity, compensation, equal-pay]
pairs_with:
  prompts: [ask-for-raise, benchmark-my-salary]
  personas: [career-coach]
args:
  - name: situation
    description: What you learned and how (the peer told you, a job ad, a leak), both roles' titles, levels, tenure and responsibilities as far as you know, the size of the gap, and anything that makes you suspect it relates to gender, ethnicity, age or another protected characteristic.
    type: text
    required: true
  - name: country
    description: Country and state or region of employment, because pay transparency and equal pay rules differ widely.
    type: string
output_contract:
  format: markdown
  sections: [First check the comparison, What you may and may not use, Your aim, Conversation with your manager, If the answer does not fix it, Formal routes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees who have just found out a colleague in a similar job is paid more. The first reaction is often anger and an urge to cite the colleague by name. That usually backfires: it puts the manager on the defensive, exposes the colleague, and lets the conversation turn to whether the roles are really equal. Pay gaps can have lawful explanations (different level, scope, location, hire date in a hot market, a counteroffer) and unlawful ones (sex, race and other protected characteristics). Experts first test whether the comparison holds, then ask for their own pay to be reviewed against the role and market, and only move to a formal equal-pay route when the gap is unexplained and may be discriminatory. Many countries protect employees who discuss pay, and some give a right to ask for pay information; these rules vary.

<situation>
{{situation}}
</situation>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. First check the comparison: list what makes two jobs comparable (same or equivalent work, level, scope, skills, responsibility, working conditions, location) and go through which of these hold in their case and which are unknown. List lawful reasons that could explain the gap and which ones seem to fit. Say plainly if the comparison looks weak.
2. What you may and may not use: how they can use the information without harming the colleague (do not name them unless they agree), what not to do (accessing records, sharing others' pay widely), and what pay-discussion and pay-information rights to check for their country, with the official body to check them with.
3. Your aim: help them pick the outcome they want (a pay adjustment, a review of their level, an explanation of how pay is set, the band for their role) and a specific number, using market data rather than only the colleague's figure.
4. Conversation with your manager: a short script that asks how pay is set for the role and where they sit in the band, presents their own contribution and market data, and asks for a review with a date. Include how to say they have reason to believe pay is not consistent for the role without naming anyone. Add a follow-up email confirming what was agreed.
5. If the answer does not fix it: next steps in order: ask HR in writing for the pay band and the criteria used; request a formal pay review; keep a dated record of requests and replies; decide whether to look elsewhere.
6. Formal routes: when an unexplained gap may relate to a protected characteristic, describe the formal options to explore (internal grievance, a pay-information request where the law allows one, a union, an official equality or labour body, an employment lawyer), what evidence to keep, and that time limits for claims can be short.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that the gap is or is not unlawful. Name the questions that decide it and who can answer them.
- Do not state rights, deadlines or procedures as fact for their country; tell them what to check and with which official source. If the country is missing, ask for it.
- Do not help them obtain colleagues' pay data by accessing records they are not entitled to see.
- Keep the scripts calm and specific; the aim is a fixed pay rate and a working relationship, not a confrontation.
</constraints>

<output_format>
## First check the comparison
Table: Factor | You | Colleague | Comparable?
Then possible lawful explanations.
## What you may and may not use
## Your aim
## Conversation with your manager
Script, then follow-up email.
## If the answer does not fix it
## Formal routes
</output_format>
