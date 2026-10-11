---
schema: 1
id: object-to-landlord-entry
kind: prompt
title: Object to your landlord entering without notice
description: Helps a tenant respond when a landlord or agent enters, or demands entry, without proper notice - a calm boundary letter, a fair access arrangement, a log of incidents and when it becomes harassment.
category: tenancy
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quiet-enjoyment, landlord-access, privacy, tenant-rights, landlord-letters]
pairs_with:
  prompts: [respond-to-landlord-harassment, review-lease]
  personas: [tenant-rights-advisor]
args:
  - name: incidents
    description: What happened - dates, who entered or asked, how much notice was given if any, the reason given, whether you were home, and what the lease says about access.
    type: text
    required: true
  - name: country
    description: Country and state or region. Notice requirements for landlord entry and the exceptions for emergencies differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Letter to the landlord, Proposed access arrangement, Incident log, If it continues]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants set boundaries on landlord access without starting a war. In most places a tenant has the right to live in the home without interference, and a landlord who needs access for inspections, repairs or viewings must usually give advance written notice and come at a reasonable time, except in a genuine emergency such as a flood or gas leak. Many leases repeat this, and some places set the minimum notice in law. Most entry disputes come from a landlord who still treats the home as theirs, not from bad faith, so a calm letter offering a workable arrangement often fixes it. Repeated entry without notice, entering while the tenant is out, changing locks or removing belongings is different: it can amount to harassment or unlawful eviction and needs urgent advice. Changing the locks yourself can breach the lease in some places, so it is a step to take advice on first.

<incidents>
{{incidents}}
</incidents>

Location: {{country}}
</context>

<task>
1. Explain where the tenant likely stands, with points to check locally `[CHECK locally]`: the usual notice requirement, what counts as an emergency, what the lease says, and whether the tenant can refuse a particular time but not reasonable access altogether.
2. Draft a calm, firm letter: acknowledge the landlord's legitimate need for access, state the incidents factually with dates, ask that future visits are arranged in writing with the notice the lease or law requires, propose an arrangement, and ask for written confirmation. Under 220 words.
3. Propose a practical access arrangement: notice by message or email, preferred days and times, whether the tenant wants to be present, how emergencies are handled, and how keys held by the landlord are used.
4. Provide an incident log template and fill it with the incidents given.
5. Explain when it becomes more serious (repeated entry, entry while out, intimidation, interference with locks, utilities or belongings) and what to do then: contact tenant advice or a housing lawyer promptly, and the police if there is a threat to safety. Get advice before changing locks.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state notice periods or rights as fact; mark them `[CHECK locally]`.
- Do not advise refusing all access or withholding rent as a response.
- If the tenant describes threats, violence, a lockout or feeling unsafe, put safety first and point to emergency services and urgent advice before any letter.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short bullets with checks marked.

## Letter to the landlord
The draft.

## Proposed access arrangement
Bullets.

## Incident log
Table: date, time, who, notice given, reason given, what happened.

## If it continues
Numbered steps.
</output_format>
