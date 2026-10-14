---
schema: 1
id: write-ai-transparency-notice
kind: prompt
title: Write an AI transparency notice
description: Drafts a public notice explaining how a product or business uses AI - which features, what data goes in, human oversight, limits, opting out and labelling of AI-generated content.
category: policies
version: 1.0.0
status: incubating
stage: [build, ship]
role: [founder, product-manager, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-transparency, ai-disclosure, ai-generated-content, chatbot-disclosure, human-oversight]
pairs_with:
  prompts: [assess-ai-act-obligations, write-privacy-policy, write-ai-use-policy]
args:
  - name: ai_uses
    description: Each place AI is used and what it does (support chatbot, recommendations, generated images or text, screening applications, fraud scoring), the model providers, whether customer data is used to train models, and where humans review outputs.
    type: text
    required: true
  - name: audience
    description: Who reads it, for example consumers, business customers, patients or job applicants.
    type: string
    required: true
  - name: jurisdictions
    description: Where users are.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [AI use inventory, Notice, In-product disclosures, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Customers increasingly ask, and regulators increasingly require, that organisations say where AI is used. Rules vary: some require telling people they are interacting with an AI system or that content is AI-generated or manipulated (the EU AI Act sets transparency duties of this kind, phased in over time), privacy laws give rights around solely automated decisions with significant effects, and consumer protection law treats overstated AI claims as misleading. A good notice is specific: it names the features, what data each uses, whether customer data trains models (and for whom), what a human checks, known limitations, and how to reach a person or opt out. The two common failures are vague reassurance ("we use AI responsibly") and silence on the decisions that matter most to people, such as screening, pricing or account restrictions.

Audience: {{audience}}
Jurisdictions: {{jurisdictions}}
</context>

<task>
AI uses:
<ai_uses>
{{ai_uses}}
</ai_uses>

1. AI use inventory: a table of each use, its purpose, data used, whether outputs affect a person significantly, human involvement, provider, and training on customer data (yes, no, unknown).
2. Notice in plain language:
   - Why the organisation uses AI and a summary list of where.
   - One short section per feature: what it does, data used, human oversight, known limits and how to get a human or opt out.
   - Data and training: whether inputs are used to train models, by whom, and how to opt out.
   - Decisions that significantly affect people: how they are made, the right to ask for human review, and how to challenge the outcome, where applicable.
   - AI-generated content: how it is labelled.
   - Contact [BRACKETS] and last updated date.
3. In-product disclosures: short text for the chatbot greeting, generated content labels and any decision screens.
4. Points to confirm: transparency, automated decision and privacy duties per jurisdiction, and provider terms on data use, marked to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Describe only uses, providers and safeguards the input states; mark unknowns rather than filling them.
- Do not overstate accuracy, fairness or safety ("bias-free", "always correct"); state limits honestly.
- Do not state legal obligations or application dates as fact unless supplied; mark them to confirm.
- If a use looks high-risk (hiring, credit, health, education, access to essential services), say so and recommend a legal review before launch.
{{> output/uncertainty}}
</constraints>

<output_format>
## AI use inventory
Table: use | purpose | data | significant effect? | human role | provider | trains on customer data?

## Notice
The full notice with headings.

## In-product disclosures
Short labelled text blocks.

## Points to confirm
Numbered.
</output_format>
