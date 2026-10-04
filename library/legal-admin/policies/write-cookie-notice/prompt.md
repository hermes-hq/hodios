---
schema: 1
id: write-cookie-notice
kind: prompt
title: Write a cookie notice and banner
description: Drafts a cookie notice, a cookie table and consent banner text from the cookies and tools a site actually uses, with categories, purposes, durations and consent choices for the stated jurisdictions.
category: policies
version: 1.0.1
status: incubating
aliases: [legal-cookie-consent]
stage: [build]
role: [founder, marketer, software-engineer, legal-professional]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, copy, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cookie-notice, cookie-banner, consent-management, trackers, eprivacy]
pairs_with:
  prompts: [write-privacy-policy, audit-website-privacy-compliance]
args:
  - name: cookies_and_tools
    description: Every cookie, pixel, SDK, script and local-storage item the site or app sets, with the tool behind it (analytics, ads, chat, payments, A/B testing, embedded video), what it is used for, and its duration if known. A cookie scanner export is ideal.
    type: text
    required: true
  - name: jurisdictions
    description: Where your visitors are (for example "EU and UK", "California and other US states", "Brazil", "worldwide"), so consent and opt-out models can be matched.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cookie inventory, Consent model, Banner text, Preferences panel text, Cookie notice, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id legal-cookie-consent."}
---
<context>
You draft cookie notices and consent text that describe what a site actually does. Regulators have repeatedly acted against banners that nudge visitors (a bright "Accept all" next to a hidden "Reject"), set non-essential cookies before consent, label advertising cookies "strictly necessary", or describe cookies the site no longer uses. In consent-based regimes such as the EU and UK, non-essential cookies generally need opt-in consent, and rejecting should be as easy as accepting; in many US state laws the focus is on notice and a right to opt out of "sale" or "sharing" for targeted advertising, sometimes signalled through browser opt-out preference signals. These regimes differ and change, so you name the model you are applying and mark it for confirmation.

Visitors in: {{jurisdictions}}
</context>

<task>
Cookies and tools in use:
<cookies>
{{cookies_and_tools}}
</cookies>

1. Cookie inventory: classify every item into strictly necessary, functional or preferences, analytics or performance, and advertising or targeting, with provider, purpose, first or third party, and duration. Explain any classification that could be disputed (for example analytics, embedded video, chat widgets). Mark unknown durations or purposes as unknown; do not guess.
2. Consent model: for each stated jurisdiction, the approach you are drafting for (prior opt-in by category, notice with opt-out, honouring opt-out preference signals), marked "confirm with counsel".
3. Banner text: a short first layer in plain language (under about 60 words) with buttons of equal prominence, such as "Accept all", "Reject all" and "Choose cookies", and a link to the notice. Where an opt-out model applies, provide the opt-out link text (for example "Do not sell or share my personal information") as a separate variant.
4. Preferences panel text: one toggle per category with a one-sentence description of what it does for the visitor, the necessary category shown as always on with a reason.
5. Cookie notice: what cookies are, which categories the site uses and why, the cookie table, how to change or withdraw consent at any time (and where the link is), third parties and their own policies, how long consent is remembered, and contact details as [BRACKETS].
6. Gaps and questions: items needing classification decisions, tools that should not fire before consent, vendors needing contracts, and anything that contradicts the privacy policy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Describe only the cookies and tools listed. Do not add cookies, and do not omit one because it is inconvenient.
- Never label an advertising, cross-site tracking or analytics cookie as strictly necessary to avoid consent. If the input does so, reclassify it and explain.
- No dark patterns: no pre-ticked boxes, no "by continuing to browse you accept", reject as easy as accept, no guilt-tripping copy.
- Do not claim the banner or notice is compliant with any law; mark the consent model and any legal wording for review.
- Plain language: "we", "you", short sentences, no technical jargon without a one-line explanation.
- If the tools list is too thin to classify (for example "Google stuff"), ask for a scan or the specific tools first, and give only a template.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cookie inventory
Table: name or tool | provider | category | purpose | party | duration | note.

## Consent model
Bullets per jurisdiction, each marked "confirm with counsel".

## Banner text
The first-layer text and button labels; opt-out variant if needed.

## Preferences panel text
Category | description | default.

## Cookie notice
The full notice with headings and the cookie table.

## Gaps and questions
Numbered.
</output_format>
