---
schema: 1
id: check-call-recording-compliance
kind: prompt
title: Check call and meeting recording compliance
description: Checks a plan to record phone calls, video meetings or AI note-taker transcripts against consent and notice rules where both sides are, and sets announcements, retention and access rules.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, sales-rep, support-agent]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, copy]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [call-recording, meeting-transcripts, ai-note-taker, consent-notice, recording-retention]
pairs_with:
  prompts: [run-vendor-due-diligence, check-telemarketing-compliance, write-data-retention-schedule, assess-employee-monitoring-plan]
args:
  - name: recording
    description: What you record and why - inbound or outbound calls, video meetings, sales calls, interviews, support - with which tool, whether an AI note-taker joins, where the other parties are located, and how long recordings and transcripts are kept.
    type: text
    required: true
  - name: locations
    description: Where your organisation is and where the people on the calls typically are (countries, and US states where relevant).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Consent and notice rules to check, Risk by scenario, Announcements and notices, Retention and access, Payment cards and sensitive data, To confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an organisation record calls and meetings lawfully. Recording rules differ in two ways that matter: telecom and wiretap laws on who must agree (in some places one party's consent is enough, in others every party must agree, and several US states take the stricter view), and data protection laws on transparency, purpose and retention for the recording as personal data. Cross-border calls may need to meet the stricter rule. AI note-takers and transcription bots add new questions: they often join automatically, store transcripts with the vendor, and may use data for model training unless switched off. Recording staff calls raises employee monitoring issues too. Card numbers read out on recorded calls bring payment card security scope. Good practice is a clear announcement before recording, a way to object or switch off for sensitive calls, short retention tied to purpose, restricted access, and vendor terms checked.
</context>

<task>
Recording plan:

<recording>
{{recording}}
</recording>

Locations: {{locations}}

1. Consent and notice rules to check: for each location, whether one-party or all-party consent is commonly understood to apply and what data protection transparency is expected, marked "verify". Say which rule to follow for mixed calls (usually the strictest).
2. Risk by scenario: for each type of call or meeting, the risk level and the fix (announce and record, ask and record, do not record).
3. Announcements and notices: draft a call announcement, a meeting-start statement and a calendar-invite line for AI note-takers, plus a privacy notice paragraph; explain how people can object.
4. Retention and access: a retention period per purpose (proposal to verify), who can listen or read transcripts, export controls, deletion, and vendor settings (training on data off, data location, DPA).
5. Payment cards and sensitive data: pausing recording during card entry or using secure payment capture, and handling health or other sensitive information on calls.
6. To confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state any jurisdiction's consent rule as settled; mark "verify". Do not invent statute names or penalties.
- Never suggest covert recording of calls or meetings without notice.
- Do not recommend keeping recordings indefinitely "in case".
- Recommend legal advice where calls cross several US states or countries with strict rules, for recording employees, or for sensitive sectors such as health, legal or financial advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Consent and notice rules to check
Table: location | consent rule (verify) | transparency expectation.

## Risk by scenario
Table: scenario | risk | fix.

## Announcements and notices
Draft wording for each.

## Retention and access
Bullets.

## Payment cards and sensitive data
Bullets.

## To confirm
Numbered list.
</output_format>
