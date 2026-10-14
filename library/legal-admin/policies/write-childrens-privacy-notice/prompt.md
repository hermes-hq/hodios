---
schema: 1
id: write-childrens-privacy-notice
kind: prompt
title: Write a children's privacy notice
description: Drafts a privacy notice that children can understand for an app, game or learning service, with a matching version for parents and the design changes child privacy rules usually expect.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, designer, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [child-privacy, age-appropriate-design, parental-consent, edtech, kids-apps]
pairs_with:
  prompts: [assess-childrens-privacy-obligations, write-privacy-policy, write-safeguarding-policy]
args:
  - name: product
    description: What the app, game or service does, the age range, how children sign up, what data it collects (names, photos, voice, location, chat, usage analytics), advertising and third-party SDKs, and whether parents or schools set it up.
    type: text
    required: true
  - name: age_band
    description: The youngest users the notice must work for, for example "6-9", "10-12" or "13-17".
    type: string
    required: true
  - name: jurisdictions
    description: Countries or states where children use it.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Data and risk review, Notice for children, Notice for parents, Design changes, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Children's privacy rules expect more than a shorter adult policy. Many regimes require parental consent below an age that differs by country (for example under COPPA in the US for children under 13, and under GDPR at a member-state age between 13 and 16), and design codes such as the UK Age Appropriate Design Code expect privacy information that a child of that age can actually understand, high-privacy defaults, location off by default, no nudges to share more, and minimal data collection. A notice cannot fix a product that collects precise location or runs behavioural advertising SDKs on children; the honest output therefore includes the product changes the notice depends on. Writing for children means short sentences, concrete examples ("we keep your drawings so you can see them next time"), and telling them who to talk to, usually a parent or teacher.

Age band: {{age_band}}
Jurisdictions: {{jurisdictions}}
</context>

<task>
Product:
<product>
{{product}}
</product>

1. Data and risk review: each data type, why it is collected, whether a child of this age would expect it, risk level, and a recommendation (keep, minimise, default off, remove). Flag advertising and analytics SDKs, chat, public profiles and precise location.
2. Notice for children, written for the youngest age in the band: short sections such as "What we know about you", "Why", "Who else sees it", "How long we keep it", "What you can do", "Who to ask for help". Use plain words and examples. No legal terms.
3. Notice for parents: full information - controller and contact [BRACKETS], data, purposes and legal bases or consent mechanism, third parties and SDKs, retention, security, how parents review, delete or withdraw consent, and school involvement if any.
4. Design changes the notices depend on: defaults, consent flows, age assurance, just-in-time explanations in the product.
5. Points to confirm: consent ages, verifiable parental consent methods, design code duties and school rules per jurisdiction, marked to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never write a notice that presents behavioural advertising, precise location sharing or public chat with strangers as fine for young children; flag them and recommend changes.
- Describe only data practices the input states; do not invent SDKs, vendors or safeguards.
- Do not state consent ages or legal duties as fact for a jurisdiction unless supplied; mark them to confirm.
- Keep the children's version at the reading level of the youngest age in the band; check sentence length before writing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data and risk review
Table: data | why | would a child expect it? | risk | recommendation.

## Notice for children
Short sections with friendly headings.

## Notice for parents
Full notice with headings.

## Design changes
Numbered, highest risk first.

## Points to confirm
Numbered.
</output_format>
