---
schema: 1
id: write-trademark-infringement-letter
kind: prompt
title: Write a trademark infringement letter
description: Helps a brand owner respond to someone using a confusingly similar name or logo - checks the basis, weighs a friendly approach, platform reports or a formal letter, and drafts it for legal review.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer]
subject: [law]
requires: [none]
inputs: [text]
output: [report, message, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trademark, infringement, brand-enforcement, demand-letter, marketplace-reports]
pairs_with:
  prompts: [respond-to-cease-and-desist, evaluate-trademark-opposition, request-content-takedown]
args:
  - name: your_rights
    description: Your mark, where and since when you use it, registrations (office, number if you want, classes, goods and services), and how well known it is.
    type: text
    required: true
  - name: their_use
    description: What the other party uses (name, logo, domain, listing), for which goods or services, where, since when if known, evidence you have (screenshots, confused customers), and whether they look like a small trader or a deliberate copier.
    type: text
    required: true
  - name: country
    description: Where you and they operate.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Basis check, Approach options, Draft letter, Evidence to keep, Questions for a trademark attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a brand owner deal with someone using a similar name or logo, before a lawyer is engaged or alongside one. Experienced brand owners know the letter is only one tool. First check the basis: a registration covering the relevant goods or services in the territory where the other party trades (or, in some countries, unregistered rights built by use and reputation), similarity of the marks and goods, and who used the mark first. A weak or overreaching demand can backfire: some countries treat unjustified threats of trademark infringement as actionable, a heavy letter to a small trader can become a public relations problem, and asking for more than the rights cover invites a challenge to your own registration. Often a friendly first message, a marketplace or platform brand-protection report, or a domain dispute procedure resolves it faster and cheaper.

Country: {{country}}
</context>

<task>
<your_rights>
{{your_rights}}
</your_rights>

<their_use>
{{their_use}}
</their_use>

1. Basis check: the rights the user appears to hold in the relevant territory and goods, the similarity of marks and goods, priority of use, evidence of confusion, and the weak points (different goods, a shared descriptive element, the other party's possible earlier use). Label as preliminary.
2. Approach options: a friendly approach, a platform or marketplace report, a domain dispute procedure if a domain is involved, a formal letter, or monitoring only. For each, when it fits, risk (including unjustified-threat rules that may apply in some countries), and likely cost driver. Recommend one starting point given the facts, as a preliminary view.
3. Draft letter for the chosen approach: factual, identifies the user's rights accurately, describes the use complained of, explains the concern, asks for specific and proportionate steps (change of name for the relevant goods, a transition period, an undertaking), sets a reasonable reply date, and avoids threats the user cannot back. Mark it as a draft for attorney review before sending.
4. Evidence to keep: dated screenshots, purchases, confusion examples, registration certificates.
5. Questions for a trademark attorney.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not overstate the user's rights (for example claiming rights in goods or countries not covered) or threaten actions not available.
- Do not invent registrations, case law, damages figures or deadlines.
- If the user has no registration in the relevant territory, or the other party may have earlier use, recommend an attorney before sending anything.
{{> output/uncertainty}}
</constraints>

<output_format>
## Basis check
Table: factor | your position | notes; then weak points.

## Approach options
Table: option | fits when | risks | cost driver; then the preliminary recommendation.

## Draft letter
Ready for review, with [placeholders].

## Evidence to keep
Checklist.

## Questions for a trademark attorney
Numbered.
</output_format>
