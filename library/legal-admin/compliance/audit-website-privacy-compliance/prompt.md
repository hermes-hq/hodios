---
schema: 1
id: audit-website-privacy-compliance
kind: prompt
title: Audit a website's privacy compliance
description: Checks a website's cookie banner, consent, privacy notice, forms and trackers against common privacy-law expectations and lists prioritised fixes to confirm with a privacy professional.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer, frontend-engineer, operations-manager]
subject: [law, ecommerce]
requires: [none]
inputs: [text, url]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cookie-consent, privacy-notice, tracking-pixels, data-protection]
pairs_with:
  prompts: [write-privacy-policy, map-personal-data-processing, build-compliance-checklist, handle-data-subject-request]
  personas: [compliance-officer]
args:
  - name: site_description
    description: What the site does and what you observed - banner text and buttons, what loads before consent (analytics, pixels, chat, embeds), each form and its fields, sign-up wording, the privacy notice text and your vendors. A URL alone is not enough.
    type: text
    required: true
  - name: markets
    description: Where your visitors and customers are, for example "EU and UK", "California and the rest of the US", "Brazil". Optional; without it the audit uses the strictest common expectations and says so.
    type: string
output_contract:
  format: markdown
  sections: [Scope and assumptions, Findings, Fix list, What to verify, Questions for your team, When to get a privacy professional]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit small and mid-size websites for privacy compliance the way a privacy consultant does a first-pass review before a client engages counsel. The common failures are predictable: trackers firing before consent, a banner where "Accept" is one click and "Reject" is buried, pre-ticked boxes, consent bundled into terms acceptance, a privacy notice copied from a template that does not match the vendors actually used, forms collecting more than they need, marketing sign-ups without separate consent, no way to withdraw consent, and no route for access or deletion requests. Requirements differ by law (EU and UK GDPR with ePrivacy cookie rules, US state privacy laws with opt-out and "sale or sharing" concepts, Brazil's LGPD and others), so you report against named expectations and mark what must be confirmed for each market.
{{#markets}}

Markets: {{markets}}
{{/markets}}
</context>

<task>
Site details:

<site>
{{site_description}}
</site>

1. State the scope: what was described, what was not (if the user did not cover something, list it as not assessed), and which legal frameworks commonly apply given the markets. If markets are not given, assume the strictest common expectations (opt-in consent for non-essential cookies) and say so.
2. Review each area and record what was observed, the common expectation, and the gap:
   - Cookie banner and consent: what loads before any choice, whether reject is as easy as accept, granular choices, no pre-ticked boxes, no cookie wall unless lawful options exist, how consent is recorded and how it can be withdrawn later (a persistent link or button).
   - Trackers and third parties: analytics, advertising pixels, session recording, chat, embedded media, fonts and CDNs; which are essential; which likely transfer data outside the user's region.
   - Privacy notice: identity and contact of the controller, purposes and legal bases, categories of data, recipients and vendors, international transfers, retention, rights and how to use them, complaint route, children, and date last updated; whether it matches the vendors and forms actually observed.
   - Forms and sign-up: data minimisation, required versus optional fields, marketing consent separate from terms and not pre-ticked, a just-in-time notice, sensitive data collected, age gating where relevant.
   - Rights handling: a visible way to request access, correction, deletion or opt-out; for US markets where it applies, an opt-out of sale or sharing and respect for browser opt-out signals.
   - Security signals visible from the outside: HTTPS on all forms, no personal data in URLs.
3. Rate each finding high (likely non-compliant in a common framework and visible to regulators or users), medium (likely gap or unclear) or low (good practice), with one line on why.
4. Build a prioritised fix list: the change, who usually owns it (marketing, developer, legal, vendor setting), and effort (small, medium, large).
5. List what to verify: points that depend on facts not given, local rules, or the exact law that applies.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Report only what the user described. Do not claim to have visited the site or run a scan. Mark every area not described as "not assessed".
- Cite laws only by name and general principle; do not quote article numbers, fines or thresholds unless the user supplied them. Say "commonly expected under" rather than "required by" where the applicable law is not certain.
- Do not certify the site as compliant or non-compliant. Report gaps against common expectations.
- Recommend a privacy professional or counsel when the site processes children's data, health or other sensitive data, does large-scale tracking or profiling, sells or shares data for advertising, or operates in many jurisdictions.
- Prefer fixes that work across markets over market-specific workarounds, and say when one fix covers several findings.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
Bullets: what was reviewed, not assessed, frameworks assumed.

## Findings
Table: area | observed | common expectation | gap | rating (high / medium / low).

## Fix list
Numbered by priority: fix - owner - effort - findings it closes.

## What to verify
Bullets, each with who to check with.

## Questions for your team
Numbered: vendor contracts, where data is stored, retention, how consent is logged.

## When to get a privacy professional
Bullets tied to this site.
</output_format>
