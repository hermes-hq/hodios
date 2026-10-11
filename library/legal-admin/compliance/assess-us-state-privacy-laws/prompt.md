---
schema: 1
id: assess-us-state-privacy-laws
kind: prompt
title: Check which US state privacy laws apply
description: Checks which US state consumer privacy laws likely apply to a business from its revenue, data volumes and data uses, and lists the notice, rights, opt-out, sensitive data and contract duties.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, marketer, product-manager]
subject: [law, ecommerce, saas]
requires: [none]
inputs: [text]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [us-privacy-law, state-privacy-laws, ccpa, opt-out-rights, targeted-advertising, sensitive-data]
pairs_with:
  prompts: [audit-website-privacy-compliance, handle-data-subject-request, write-privacy-policy, map-personal-data-processing]
args:
  - name: business
    description: What the business does, annual revenue band, rough number of consumers whose data you handle per state, whether you sell or share data or use targeted ads, any sensitive data (health, precise location, biometrics, children's data), and any sector rules you follow.
    type: text
    required: true
  - name: current_practices
    description: Your current privacy notice, how people can make requests or opt out, whether you honour browser privacy signals, and contracts with ad and analytics vendors. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Applicability by state, Duties that apply, Sensitive data, Opt-outs and signals, Contracts, Gaps to fix first, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business work out its obligations under the patchwork of US state consumer privacy laws. There is no general federal privacy law, and a growing list of states, led by California, have comprehensive laws with different applicability tests. Typical triggers are annual revenue above a threshold, processing personal data of more than a set number of the state's residents, or earning a share of revenue from selling personal data; some states use only volume thresholds, some have very low ones, and a few apply to almost any business that is not a small business under federal definitions, with extra rules on selling sensitive data regardless. Many laws exempt data or entities already covered by federal sector laws (financial institutions, HIPAA data) and some exempt nonprofits; California also covers employee and business contact data. Common duties: a detailed privacy notice; rights to access, delete, correct and port; opt-outs from sale, from "sharing" or targeted advertising, and from certain profiling; honouring universal opt-out signals such as Global Privacy Control in several states; opt-in consent for sensitive data in most states but a "limit use" right in California; data protection assessments for higher-risk processing; required contract terms with processors and service providers; response deadlines; appeals; and bans on dark patterns. Separate state laws cover consumer health data, biometrics and children. Ad tech pixels and analytics often amount to "sale" or "sharing", which is where most businesses are exposed. Laws, thresholds and effective dates change every year, so applicability must be checked against a current tracker.
</context>

<task>
Business:
<business>
{{business}}
</business>
{{#current_practices}}

Current practices:
<practices>
{{current_practices}}
</practices>
{{/current_practices}}

1. Applicability by state: for the states where the business has consumers, give the type of threshold, how the business's facts compare, and likely applies, likely does not, or check. Do not give exact thresholds unless you are confident; mark each "confirm current threshold and effective date".
2. Duties that apply: a combined list written as tasks, noting where states differ.
3. Sensitive data: what counts, whether opt-in consent or a limit-use right applies, and any separate health data, biometric or children's laws that may apply.
4. Opt-outs and signals: whether the business's ads, pixels or data sharing count as sale, sharing or targeted advertising, the links and mechanisms needed, and honouring browser signals.
5. Contracts: processor and service provider terms needed with vendors, and terms for any third parties receiving data.
6. Gaps to fix first: ranked by legal exposure and effort.
7. Points to verify, and when to involve privacy counsel.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a list of states, thresholds or effective dates as complete or current; say the list changes and must be checked.
- Do not invent statute names or section numbers; name a law only when confident.
- Do not advise ignoring a state's law because enforcement seems unlikely.
{{> output/uncertainty}}
</constraints>

<output_format>
## Applicability by state
Table: state | threshold type | your facts | likely result | confirm.

## Duties that apply
Checklist, with differences between states noted.

## Sensitive data
Bulleted list.

## Opt-outs and signals
Bulleted list.

## Contracts
Table: vendor or recipient | role | terms needed.

## Gaps to fix first
Numbered list.

## Points to verify
Numbered list.
</output_format>
