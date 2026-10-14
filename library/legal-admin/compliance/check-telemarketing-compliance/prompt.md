---
schema: 1
id: check-telemarketing-compliance
kind: prompt
title: Check telemarketing and cold-calling compliance
description: Checks a sales calling or automated-call campaign against do-not-call registers, consent rules, calling hours, caller ID and script disclosures for each market, with fixes ranked by risk.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [marketer, sales-rep, operations-manager, founder]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, rewrite]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [telemarketing, cold-calling, do-not-call, robocalls, sales-calls]
pairs_with:
  prompts: [check-email-marketing-compliance, check-call-recording-compliance, write-cold-call-script, run-legitimate-interests-assessment]
args:
  - name: campaign
    description: The calling campaign - who you call (consumers, businesses, sole traders), where they are, where the numbers came from (own customers, bought list, web form), live or automated or pre-recorded calls and texts, dialler tools, calling times, caller ID shown, and the script.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Rules to check by market, Gaps found, Script fixes, List hygiene, To confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business run sales calls without breaking telemarketing rules, which are among the most actively enforced marketing rules and generate many consumer complaints. The common elements across markets: national do-not-call or preference registers that must be screened before calling (often with a short refresh cycle), much stricter rules for automated, pre-recorded or AI-voiced calls and for marketing texts, which typically need prior consent, permitted calling hours, a requirement to show a valid caller ID, and disclosures at the start of the call (who is calling, on whose behalf, the purpose, and how to opt out). Bought lists are the most frequent cause of violations because the consent or screening claimed by the seller rarely covers the buyer's calls. Calls to businesses are sometimes treated more leniently, but sole traders and some partnerships are often treated as consumers. Data protection rules on the source of the data and the right to object also apply.
</context>

<task>
Campaign:

<campaign>
{{campaign}}
</campaign>

1. Rules to check by market: for each market involved, the kinds of rules that may apply (do-not-call register screening and frequency, consent for automated or pre-recorded calls and texts, calling hours, caller ID, required disclosures, internal do-not-call lists, record keeping), named in general terms and marked "verify".
2. Gaps found: compare the campaign to those rules, with a risk rating (high, medium, low) and a specific fix for each gap.
3. Script fixes: rewrite the opening and the opt-out handling so the caller identifies themselves and the business, states the purpose, honours "do not call me" immediately, and records it.
4. List hygiene: data source checks, consent records, register screening routine, suppression list handling, and what to ask a list vendor in writing.
5. To confirm: items for a lawyer or regulator guidance, highest risk first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state registers, hours, consent thresholds or penalties as settled facts for a market; name them as likely and mark "verify". Do not invent names of registers or statutes.
- Never help evade do-not-call rules, spoof or hide caller ID, or disguise a sales call as a survey.
- Flag AI-voiced or pre-recorded calls as high risk without clear prior consent.
- Recommend legal advice for automated calling, large campaigns, calls into several countries or US states, or after complaints.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rules to check by market
Table: market | rule area | what it may require | verify.

## Gaps found
Table: gap | risk | fix.

## Script fixes
Rewritten opening and opt-out handling.

## List hygiene
Checklist.

## To confirm
Numbered list.
</output_format>
