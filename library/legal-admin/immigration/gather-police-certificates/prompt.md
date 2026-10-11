---
schema: 1
id: gather-police-certificates
kind: prompt
title: Gather police certificates for an application
description: Works out which countries need a police or criminal record certificate for an immigration application, then plans how to request each from abroad, the order, validity windows and translation.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [police-certificate, criminal-record-check, good-conduct-certificate, apostille, document-validity]
pairs_with:
  prompts: [prepare-visa-application, prepare-citizenship-application, translate-personal-document]
args:
  - name: application
    description: The country and application, and its rule on police certificates (which countries, from what age, how recent), pasted if you have it.
    type: text
    required: true
  - name: residence_history
    description: Every country you (and any family members included) have lived in, with dates, and where you live now. Include military service if relevant.
    type: text
    required: true
  - name: deadline
    description: When you plan to submit, or a deadline from the authority. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Which certificates you need, Request plan, Validity and timing, Translation and legalisation, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Police certificates delay more immigration files than almost any other document. Authorities typically want one from every country where the applicant spent a set period (often six or twelve months, cumulative or continuous) since a certain age, issued within a set window before submission, sometimes for every adult in the application. Getting one from a country you have left can take weeks or months: some issue online, some require fingerprints taken locally and posted, some need a request through an embassy or a representative with a power of attorney, and some issue certificates that must be apostilled or legalised and translated. Ordering too early risks expiry; ordering too late delays the file. Some countries cannot issue one at all, and authorities usually accept an explanation and alternative evidence in that case.

<application>
{{application}}
</application>

<residence_history>
{{residence_history}}
</residence_history>
{{#deadline}}Planned submission: {{deadline}}{{/deadline}}
</context>

<task>
1. Which certificates you need: apply the rule given to the residence history for each person, showing the time in each country and whether it crosses the threshold. If the rule was not given, say what is typical and mark it to confirm.
2. Request plan: for each country, how it is commonly requested from abroad (online, embassy, fingerprints by post, local representative), typical documents needed, and an estimated lead time marked "typical, confirm with the issuing authority".
3. Validity and timing: work back from the submission date, showing when to order each certificate so it is still within the validity window, starting with the slowest.
4. Translation and legalisation: which certificates may need an apostille or legalisation and a certified translation.
5. What to confirm: the official rule, any country that may be unable to issue one and what to provide instead, and any record that should be discussed with a regulated adviser before submitting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state issuing procedures, fees or processing times as fact; mark them to confirm with the issuing country's official channel.
- Do not invent website names or addresses; tell the person to find the official issuing authority for each country.
- If the person mentions a conviction or charge anywhere, recommend a regulated adviser before submitting and never suggest omitting a country or record.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which certificates you need
Table: Person | Country | Time there | Needed?
## Request plan
Table: Country | How requested from abroad | Needs | Typical lead time.
## Validity and timing
Table: Certificate | Order by | Valid until.
## Translation and legalisation
## What to confirm
Numbered.
</output_format>
