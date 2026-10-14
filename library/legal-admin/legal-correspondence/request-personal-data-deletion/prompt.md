---
schema: 1
id: request-personal-data-deletion
kind: prompt
title: Request deletion of my personal data
description: Drafts a request to erase personal data, stop marketing or opt out of data sale and sharing under GDPR, CCPA or a similar law, with scope, likely exemptions and a follow-up if ignored.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [right-to-erasure, data-deletion, opt-out, data-protection, privacy-rights, ccpa]
pairs_with:
  prompts: [request-my-personal-data, reduce-online-footprint, complain-to-ombudsman]
args:
  - name: organisation
    description: The organisation, your relationship to it (former customer, app user, job applicant, unknown marketer or data broker), what data you think it holds, and what you want - delete everything, stop marketing, stop selling or sharing, close an account.
    type: text
    required: true
  - name: jurisdiction
    description: Optional. Where you live and where the organisation is, for example "France", "UK", "Colorado, USA".
    type: string
output_contract:
  format: markdown
  sections: [Which right to use, Request letter, What they may keep, How to send it, Follow-up and complaint]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help individuals make organisations delete their personal data or stop using it. Different rights fit different goals: the right to erasure (deletion), the right to object to processing, an unconditional right to object to direct marketing in EU and UK law, withdrawal of consent, and in many US state laws a right to delete and a right to opt out of the sale or sharing of personal information and targeted advertising. What privacy professionals know: deletion is not absolute, because organisations may keep data they must hold by law (tax and accounting records, fraud prevention, defending legal claims), so a good request anticipates this and asks them to state what they keep and why; the marketing objection is the strongest and simplest right in Europe; data brokers often require a separate request per brand; and a deletion request can remove an account's history and purchases, so the person should download anything they want first. Response deadlines are typically about one month under GDPR-style laws and about 45 days under many US state laws, extendable. These are patterns to verify, not legal advice.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Organisation and goal:

<organisation>
{{organisation}}
</organisation>

1. Decide which right or rights fit the goal and the likely law, and say why in two or three lines. If the jurisdiction is missing or no privacy law clearly applies, say so, ask for it, and draft a request relying on the organisation's own privacy policy, marked for checking.
2. Draft the request letter or email: a clear subject line, identifiers to find the records as [BRACKETS] (account email, customer number) without sending more ID than needed, the rights relied on (named only when confident), the scope (all personal data or named categories, including data passed to processors or third parties where the law requires them to be told), a request to confirm deletion in writing and to state any data kept with the legal reason and retention period, a request to stop marketing immediately if relevant, and the response deadline as [DATE] to check.
3. Explain what they may keep: common lawful reasons to retain data, so the person is not surprised and can challenge a vague refusal.
4. How to send it: the privacy contact or form in the privacy policy, proof of sending, downloading any data or purchases first, and for data brokers using each broker's opt-out route.
5. Follow-up and complaint: a short follow-up letter if the deadline passes, and the regulator or attorney general route, marked "to verify".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent article numbers, deadlines or authority names; name them only when confident for the jurisdiction and mark them "to verify".
- Do not promise that all data will be deleted; explain lawful retention.
- Tell the person not to send copies of ID documents unless the organisation genuinely needs them to verify identity, and to redact what is not needed.
- If the data is intimate images, doxxing or content putting the person at risk, say that faster specialist reporting routes and the police may apply.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which right to use
Two or three lines.

## Request letter
The complete request with [BRACKETS].

## What they may keep
Bullets.

## How to send it
Bullets.

## Follow-up and complaint
The short follow-up letter, then the complaint route marked to verify.
</output_format>
