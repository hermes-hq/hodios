---
schema: 1
id: write-discrimination-complaint
kind: prompt
title: Write a discrimination complaint to a business
description: Writes a complaint to a shop, venue, agent or service that refused you or treated you worse for a protected characteristic or made no adjustment, with evidence and next routes.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [discrimination, equal-treatment, reasonable-adjustments, access-refused, service-provider]
pairs_with:
  prompts: [write-complaint-letter, complain-to-ombudsman, find-free-legal-help, respond-to-rental-discrimination]
args:
  - name: what_happened
    description: What happened, with date, place, who was involved, what was said or done (exact words if remembered), how others were treated, witnesses and evidence, and what you have already tried.
    type: text
    required: true
  - name: characteristic
    description: Which part of who you are you believe the treatment related to - for example disability, race, religion, sex, pregnancy, age, sexual orientation, gender identity - in your own words.
    type: string
    required: true
  - name: outcome
    description: What you want - an apology, a change of policy, staff training, the service provided, an adjustment, compensation.
    type: text
    required: true
  - name: country
    description: Country and region. Discrimination law, protected characteristics and time limits differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How this is often framed, Complaint letter, Evidence to keep, Time limits and routes, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone complain about discrimination by a provider of goods or services, such as a shop, venue, transport operator, agent or public service (not their employer, which follows a workplace route, and not a landlord or letting agent, where housing-specific routes usually apply). Equality laws in many countries cover several distinct things that people often blur together: being treated worse because of a protected characteristic (direct discrimination); a rule or practice that applies to everyone but disadvantages a group (for example "no prams or wheelchairs upstairs", "photo ID only in one format"); failing to make a reasonable adjustment for a disabled person; harassment; and victimisation for complaining. Which characteristics are protected, whether the provider is covered, and the time limits for a claim differ by country and are often short, sometimes months. A clear complaint that records exact words, times, comparators (how others were treated) and the specific adjustment asked for is both more likely to get a fix and better evidence later.

Characteristic involved: {{characteristic}}
{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
What happened:

<events>
{{what_happened}}
</events>

Outcome wanted:

<outcome>
{{outcome}}
</outcome>

1. Explain, as possibilities to check rather than conclusions, which kinds of discrimination these facts are often framed as (direct, indirect, failure to make an adjustment, harassment, victimisation) and which facts point to each.
2. Write the complaint letter to the business: a subject line; a factual dated account with exact words in quotation marks only where the person recalls them; how others were treated if known; the adjustment that was asked for or needed; the effect on the person; the specific outcomes wanted; a request for the business's policy and a written response by a date; and a request to keep CCTV and records.
3. Evidence to keep: notes made now, receipts or booking records, photos, witness details, screenshots of policies or messages, and any later replies.
4. Time limits and routes: the business's own complaints process, an equality or human rights body, an ombudsman or regulator for the sector, conciliation services, and a court or tribunal claim, with the reminder that claim time limits can be short and may keep running during the complaint. Mark all "verify locally".
5. Say when to get advice and from whom (equality advice lines, disability rights organisations, law centres, lawyers).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that discrimination occurred as a legal conclusion; describe what happened and how it may be framed. Do not predict a claim's outcome.
- Do not invent statute names, sections, bodies, time limits or compensation amounts. Mark everything local as "verify".
- Use only the facts given; no invented quotes, witnesses or comparators. Use [BRACKETS].
- Keep the letter calm and firm. No threats of publicity, insults, or accusations against named staff beyond what they did.
- If this happened at work, say a workplace grievance and employment advice are the usual route instead. If it concerns renting a home, say housing discrimination routes may differ and adapt the letter to the landlord or agent.
{{> output/uncertainty}}
</constraints>

<output_format>
## How this is often framed
Bullets: type | facts that point to it, marked as possibilities.

## Complaint letter
Complete letter with [BRACKETS].

## Evidence to keep
Checklist.

## Time limits and routes
Ordered steps, marked verify.

## Get advice if
Bullets tied to this case.
</output_format>
