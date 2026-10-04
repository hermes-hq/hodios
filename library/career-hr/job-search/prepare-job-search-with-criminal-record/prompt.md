---
schema: 1
id: prepare-job-search-with-criminal-record
kind: prompt
title: Prepare a job search with a criminal record
description: Prepares someone with a criminal record for a job search, covering when disclosure is required, how to explain it honestly, fair chance employers and programmes, and record rules to check.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [criminal-record, fair-chance-hiring, reentry, disclosure, background-checks, second-chance]
pairs_with:
  prompts: [explain-career-gap, plan-job-search, write-cover-letter, brief-your-references]
  personas: [career-coach]
args:
  - name: conviction_context
    description: In your own words and only as much as you are comfortable sharing - the type of offence, roughly when, the sentence, whether it has been completed, and anything you know about whether it is sealed, expunged, spent or pardoned.
    type: text
    required: true
  - name: country
    description: The country (and state or province) where you are looking for work, because disclosure and record rules differ a lot between places.
    type: string
    required: true
  - name: target_jobs
    description: Jobs or fields you are aiming for, plus your skills, qualifications and work history including anything done during a sentence (training, work, volunteering).
    type: text
output_contract:
  format: markdown
  sections: [Check your record first, When you must disclose, Your explanation, Where to aim, Evidence of change, If a check goes wrong, Where to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with criminal records get back into work. The biggest early win is often knowing exactly what is on the record and what an employer is allowed to see or ask about, because many people disclose more than they legally need to, while others are caught out by not disclosing when it was required. After that, what works is a short, honest, forward-looking explanation practised until it is calm; targeting employers and programmes that hire people with records; and evidence of what has changed. Rules vary hugely: in the US, ban-the-box and fair chance laws in many states and cities, record sealing and expungement, and background check rights; in England and Wales, spent and unspent convictions and different levels of criminal record check; in Canada, record suspensions; in Australia, spent conviction schemes that differ by state.

<conviction_context>
{{conviction_context}}
</conviction_context>
Country: {{country}}
{{#target_jobs}}
<target_jobs>
{{target_jobs}}
</target_jobs>
{{/target_jobs}}
</context>

<task>
1. Check your record first: what to find out (exactly what the record shows, whether the conviction is or could become sealed, expunged, spent or suspended, and what level of check an employer for the target jobs would run), and how to get a copy of their own record in {{country}}. Name the processes and bodies to check, labelled "to verify".
2. When you must disclose: the general principle (answer what is lawfully asked, truthfully, and do not volunteer what is not asked), how this usually differs for ordinary jobs versus regulated work such as care, education, finance, security or work with children or vulnerable adults, and the risk of lying on an application (dismissal later, even years on). Do not state the law for {{country}} as fact; say what to confirm and where.
3. Your explanation: draft two versions, written (a short paragraph for a form or a separate disclosure letter) and spoken (about 30 seconds), using three parts: own it briefly without excuses or graphic detail, what has changed since (concrete evidence), and why they are a good fit for this job now. Use only what they shared.
4. Where to aim: fields and kinds of employers that more often hire people with records, kinds of jobs where licensing or vetting rules may block them for now (to check, not assume), and support to look for in {{country}}: reentry or resettlement programmes, probation or prison employment services, social enterprises, apprenticeships, and employer schemes or incentives (for example, in the US, the Federal Bonding Program and the Work Opportunity Tax Credit), all labelled "to verify".
5. Evidence of change: what to gather (certificates, training, work or volunteering during or after the sentence, references from supervisors, programme workers or employers, treatment or course completion if relevant and if they choose to share), and who to ask for references.
6. If a check goes wrong: what to do if an offer is withdrawn because of the record or the check shows something wrong, including asking for a copy of the report, correcting errors, and any process the law in {{country}} may require before a decision (for example the US adverse-action notice process under background check rules), labelled "to verify".
7. Where to get help: legal aid services, charities that support people with convictions, reentry organisations, a solicitor or lawyer for sealing or expungement, and the official bodies named above.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No judgement and no lectures. Do not ask for more detail about the offence than the plan needs.
- Never help conceal a conviction where disclosure is legally required, falsify records or references, or misstate dates to hide a sentence. Offer honest framing instead.
- Do not state whether a specific conviction is spent, sealable or must be disclosed. Say how to find out.
- Name organisations as examples to verify; do not invent organisations, phone numbers or websites.
- If the offence involved children or vulnerable people, be honest that many jobs working with them will be closed, and focus on other paths.
- If the person mentions housing loss, risk of reoffending, or not coping, acknowledge it and point to support services as well as work.
- Use only the facts given; mark gaps as [X] with a question.
</constraints>

<output_format>
Start with two sentences: what this plan covers, and that record and disclosure rules must be checked for {{country}} with an official source or adviser.
## Check your record first
## When you must disclose
## Your explanation
**Written version** and **Spoken version**, each ready to adapt.
## Where to aim
Table: Option | Why it can work | What to check.
## Evidence of change
Checklist.
## If a check goes wrong
## Where to get help
Each item marked "to verify".
</output_format>
