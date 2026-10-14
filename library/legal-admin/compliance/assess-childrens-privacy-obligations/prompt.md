---
schema: 1
id: assess-childrens-privacy-obligations
kind: prompt
title: Assess children's privacy obligations
description: Checks whether an app, site, game or service is likely used by children and what that triggers - age assurance, parental consent, defaults, profiling limits - with the design changes to make.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, design, review]
role: [founder, product-manager, legal-professional, game-developer]
subject: [law, saas]
requires: [none]
inputs: [text, spec]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [childrens-privacy, age-assurance, parental-consent, privacy-by-default, online-safety]
pairs_with:
  prompts: [draft-dpia, audit-website-privacy-compliance, run-legitimate-interests-assessment, write-childrens-privacy-notice]
  personas: [compliance-officer]
args:
  - name: product
    description: The product - what it does, who it is aimed at, who actually uses it (any data on ages), sign-up flow, what data it collects, features such as chat, profiles, location, recommendations, ads, in-app purchases, and analytics or ad SDKs used.
    type: text
    required: true
  - name: markets
    description: Countries or states where it is offered (for example US, UK, EU, Brazil, Australia).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Likely used by children, Rules that may apply, Gaps in the current design, Design changes, Questions to resolve, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a product team work out its obligations if children use its service. Several regimes apply differently: some focus on services directed to children under a set age or with actual knowledge of child users and require verifiable parental consent before collecting personal data (for example US COPPA for under-13s); some set a digital age of consent for consent-based processing that varies by country; and age-appropriate design codes and online safety laws in several countries apply to services "likely to be accessed" by children, not just those aimed at them, and expect high-privacy defaults, minimised data, geolocation off, nudge techniques avoided, and profiling and targeted ads restricted. A teen-heavy game or a general-audience app with many young users can be in scope even if the terms say "13+" or "18+". Third-party SDKs for ads and analytics are a frequent hidden source of non-compliance. Age assurance should be proportionate to the risk, from self-declaration to estimation or verification.

Markets: {{markets}}
</context>

<task>
Product:

<product>
{{product}}
</product>

1. Likely used by children: assess from the content, design, marketing, user data and audience research whether the service is directed to children or likely to be accessed by them, and at which ages. Say what evidence would settle it.
2. Rules that may apply: for each market, the kinds of rules that may apply (parental consent thresholds, age of digital consent, age-appropriate design codes, online safety duties, advertising rules for minors), named in general terms and marked "verify".
3. Gaps in the current design: compare features against common expectations - default privacy settings, geolocation, public profiles, contact from strangers, data minimisation, profiling and targeted ads, dark patterns and engagement nudges, third-party SDK data sharing, parental tools, transparency in child-friendly language, and rights requests.
4. Design changes: specific, prioritised changes with effort, including a proportionate age assurance approach and how to treat users under the threshold (separate experience, parental consent flow, or blocking).
5. Questions to resolve.
6. Get advice if: the cases that need a privacy lawyer and possibly a DPIA.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not cite specific age thresholds, statute sections or code standards as settled for a market unless commonly known and marked "verify"; never invent them.
- Do not treat "our terms say 13+" as enough when the facts show younger users.
- Recommend safety-by-design measures but do not overpromise; age assurance is imperfect and should be proportionate.
- If the product has features that could expose children to contact from adults (open chat, location sharing), flag this as a priority safety risk, not just a privacy one.
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely used by children
Assessment with reasons and evidence needed.

## Rules that may apply
Table: market | kind of rule | trigger | to verify.

## Gaps in the current design
Table: feature | expectation | current state | gap.

## Design changes
Prioritised table: change | why | effort.

## Questions to resolve
Numbered list.

## Get advice if
Bullets.
</output_format>
