---
schema: 1
id: assess-ai-act-obligations
kind: prompt
title: Assess EU AI Act obligations
description: Maps an AI system to the EU AI Act's risk categories and roles such as provider or deployer, and lists the likely obligations and application dates to verify with counsel.
category: compliance
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, product-manager, ml-engineer, legal-professional]
subject: [law]
requires: [none]
inputs: [text, spec]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-act, ai-governance, risk-classification, eu-regulation]
pairs_with:
  prompts: [build-compliance-checklist, write-ai-use-policy, map-personal-data-processing]
  personas: [compliance-officer]
args:
  - name: system_description
    description: What the AI system does, who uses it and on whom, the decisions or outputs it produces, the model behind it (own or third-party), where it is sold or used, and whether it is part of a regulated product.
    type: text
    required: true
  - name: role
    description: Your relationship to the system. Choose "unsure" if you do not know; the prompt works it out from the description.
    type: enum
    enum: [provider, deployer, importer, distributor, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [In brief, Scope, Role, Risk classification, Likely obligations, Timeline, Open facts, Questions for counsel]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You give companies a structured first assessment of how the EU AI Act (Regulation (EU) 2024/1689) is likely to apply to one AI system, so they can brief counsel with the right questions instead of starting from zero. The Act works in layers: whether the system is an "AI system" or a general-purpose AI model within scope; which role the company plays (provider, deployer, importer, distributor, or a product manufacturer; a deployer can become a provider by putting its name on a system or substantially modifying it); and which risk tier applies: prohibited practices (Article 5), high-risk systems (safety components of products under Annex I legislation, or uses listed in Annex III such as biometrics, critical infrastructure, education, employment and worker management, access to essential services including creditworthiness, law enforcement, migration and justice, subject to the Article 6(3) exceptions), transparency obligations (Article 50, for example chatbots, synthetic content and deepfakes), and obligations for general-purpose AI model providers. AI literacy (Article 4) applies to providers and deployers broadly. Application dates were staggered from 2025 to 2027 in the adopted text, and amendments to the timeline have been proposed since, so every date must be checked against the current consolidated text.

Stated role: {{role}}
</context>

<task>
System:

<system>
{{system_description}}
</system>

1. Scope: assess whether this is likely an AI system or a general-purpose AI model within the Act's definitions, whether the company is in the EU or places the system on the EU market or its output is used in the EU, and any likely exclusions (for example purely personal use, scientific research, military). Mark each as likely, unclear or unlikely with the reason.
2. Role: determine the likely role from the description. If the stated role is "unsure" or seems inconsistent with the description, explain why, including whether rebranding, substantial modification or integrating a third-party model changes it.
3. Risk classification: check in order against prohibited practices, Annex I product-safety routes, Annex III use areas (naming the area that could apply and quoting the description that triggers it), the Article 6(3) exception conditions, Article 50 transparency triggers, and general-purpose model obligations. Give a working classification with confidence (likely, possible, unlikely) and the facts that would change it.
4. Likely obligations for this role and tier, as a table: obligation, source in the Act (article, marked to verify), what it means in practice for this system, and evidence to produce. For high-risk providers cover risk management, data governance, technical documentation, logging, transparency to deployers, human oversight, accuracy and robustness, quality management, conformity assessment, registration and post-market monitoring; for deployers cover use per instructions, human oversight, input data relevance, monitoring and logs, informing affected people or workers, and fundamental rights impact assessment where it applies.
5. Timeline: list the application dates relevant to this system as adopted, with a clear note that amendments to dates have been proposed and the current consolidated text and Commission guidance must be checked.
6. Open facts: what you need to know to firm up the assessment.
7. Questions for counsel, specific to this system.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a working assessment to brief counsel, not a legal opinion. Say so once in the summary.
- Quote the description for every classification trigger. Do not assume facts that are not stated; list them under open facts.
- Cite articles and annexes only where you are confident of the reference, and mark them "to verify". Do not invent guidance, standards, deadlines or fines.
- Consider other laws that commonly overlap only briefly (GDPR for personal data, product safety, sector rules, consumer law), as pointers.
- If the system could fall under a prohibited practice, put that first and recommend counsel review before further deployment.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four to six lines: likely role, likely tier with confidence, the obligations that matter most, the next step.

## Scope
Bullets: criterion - likely, unclear or unlikely - reason.

## Role
Two to four lines.

## Risk classification
Table: tier or provision | applies? | trigger in the description | what would change it.

## Likely obligations
Table: obligation | source (to verify) | what it means here | evidence.

## Timeline
Bullets, with the note on proposed amendments.

## Open facts
Numbered.

## Questions for counsel
Numbered.
</output_format>
