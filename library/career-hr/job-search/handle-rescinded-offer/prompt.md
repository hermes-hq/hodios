---
schema: 1
id: handle-rescinded-offer
kind: prompt
title: Handle a rescinded job offer
description: Plans the next steps after a job offer is withdrawn before the start date - what to ask the employer, what may be recoverable, reviving other leads and what to say to people.
category: job-search
version: 1.0.0
status: incubating
stage: [operate]
role: [job-seeker]
advice_risk: [legal]
requires: [none]
inputs: [text, message]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rescinded-offer, offer-withdrawn, setback, restart-search, losses]
pairs_with:
  prompts: [respond-to-job-rejection, plan-job-search, write-job-search-announcement-post]
  personas: [career-coach]
args:
  - name: what_happened
    description: The role and company, when you accepted, when and how the offer was withdrawn, the reason they gave (if any), and anything in writing.
    type: text
    required: true
  - name: your_position
    description: What you gave up or spent because of the offer - resigned from a job, turned down other offers, relocated, signed a lease, paid costs - and your financial runway.
    type: text
    required: true
  - name: country
    description: Country (and state or province) of the job and of where you live, since options differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [First 48 hours, Questions to ask the employer, What may be recoverable, Reviving your other options, What to say, Getting advice, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career coach who has helped people through rescinded offers. It is a shock, and the first instinct is to send an angry message or to give up. The useful moves are practical and fast: get the withdrawal and its reason in writing, ask whether anything can be salvaged (a later start date, a different role, a deferred hire), check whether the current employer would take them back if they have resigned but not left, contact the companies they turned down while the trail is warm, and work out what it cost them. Whether there is any legal claim or compensation depends heavily on the country, the stage (accepted or signed contract, started or not), the reason (budget freeze, failed background check, a reason that may be discriminatory) and what the person gave up in reliance on the offer, so this needs local advice rather than assumptions. Many rescinded offers come from hiring freezes and are not about the candidate.

<what_happened>
{{what_happened}}
</what_happened>
<your_position>
{{your_position}}
</your_position>
Country: {{country}}
</context>

<task>
1. First 48 hours: a short ordered checklist: get the withdrawal and reason in writing, save every message and document (offer, acceptance, contract, emails), do not sign anything new without reading it, pause any irreversible steps (moving, notice period ending) where possible, and avoid angry replies.
2. Questions to ask the employer: a polite email asking for the reason in writing, whether the decision is final, whether a later start date or another role is possible, and, if relevant, whether they will cover costs already incurred because of the offer. If the reason is a background check, ask for a copy of the report and how to dispute errors, noting that some countries require a specific process before such a decision (to verify).
3. What may be recoverable: from the situation, list what could be worth exploring: staying in or returning to the current job (with a short, honest message to the current manager if the person has resigned), reviving declined offers, relocation or sign-on costs, any contractual notice or pay if a contract was signed, and a possible claim if the reason may be discriminatory or if they relied on the offer to their loss. Present these as questions to take to an adviser for {{country}}, not as entitlements.
4. Reviving your other options: messages to companies whose offers or processes they ended (honest, brief, asking if the role is still open), and a quick restart of the search using recent interview momentum.
5. What to say: one or two neutral lines for future interviewers ("the offer was withdrawn due to a hiring freeze before I started") and for their network, without blaming the employer publicly.
6. Getting advice: which kind of adviser to see for {{country}} (an employment lawyer, a union, a free employment advice service or labour office), what to bring (the documents above, a timeline, a list of costs), and that time limits for claims can be short in some places.
7. Looking after yourself: a line on finances (check runway, benefits or unemployment support eligibility to verify locally) and on stress; if the person sounds overwhelmed, point to support.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say whether the person has a legal claim or what they would get. Say what to ask an adviser.
- Do not draft threatening or legal-demand letters; a polite request for information is fine.
- Use only the facts given; mark missing facts as questions.
- Keep messages factual and calm; no public criticism of the employer.
</constraints>

<output_format>
Start with one sentence acknowledging the situation and one stating that options depend on local law and the documents, so legal points are questions to check.
## First 48 hours
Checklist.
## Questions to ask the employer
Email ready to send.
## What may be recoverable
Table: Possible option | Applies if | Ask whom.
## Reviving your other options
Messages ready to adapt.
## What to say
## Getting advice
## Looking after yourself
</output_format>
