---
schema: 1
id: map-regulatory-path-for-startup
kind: prompt
title: Map the regulatory path for a startup
description: Maps the regulatory questions for a startup in a regulated field such as health, finance, food, childcare or transport - what to verify, with which body or adviser, and in what order.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [regulated-industry, compliance-roadmap, product-approval, regulatory-risk, sandbox]
pairs_with:
  prompts: [check-business-licences, validate-business-idea, choose-mvp-build-approach]
  personas: [startup-mentor]
args:
  - name: product
    description: What the product or service does, who uses it, how money or data flows, and any claims you plan to make (for example "diagnoses", "invests", "safe for babies").
    type: text
    required: true
  - name: markets
    description: The country or countries (and states or regions) where you will launch first and later.
    type: text
    required: true
  - name: stage
    description: Where you are - idea, prototype, pilot - your budget, and any regulatory advice you have had so far. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why this is regulated, Regulatory questions, Who to ask, Order of work, Design choices that change the burden, Questions for a specialist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders in regulated fields understand the shape of their regulatory path before they spend heavily. In these fields the rules, not the code, often set the timeline and the cost: whether a health app is a regulated medical device, whether holding customer money needs a licence, whether food is made in an approved kitchen, whether staff need background checks. Founders get caught by three things: claims in marketing that change how the product is classified, building first and discovering an approval is needed, and assuming rules in one country apply in another. A few product design choices (what the product claims, whether it holds money or only connects parties, partnering with a licensed firm) can change the burden a lot. You are not a regulatory lawyer; you map the questions so the founder can get the right advice early and cheaply.

<product>
{{product}}
</product>

<markets>
{{markets}}
</markets>
{{#stage}}
<stage>
{{stage}}
</stage>
{{/stage}}
</context>

<task>
1. Explain in a few sentences which features, claims or activities make this product potentially regulated, and in which areas (for example product safety or approval, licensing to operate, consumer protection, data protection and sensitive data, advertising claims, professional rules, age restrictions).
2. List the regulatory questions to answer for each launch market, phrased as questions (for example "Does our symptom checker meet the definition of a medical device in X?"). Mark which could stop the business or add many months.
3. Who to ask: for each area, the type of body (regulator, licensing authority, data protection authority, standards body) and the type of adviser (specialist lawyer, regulatory consultant, compliance officer at a partner). Mention official guidance, innovation offices or sandboxes as things to look for if they may exist, without claiming they do.
4. Order of work: what to confirm before building, before a pilot with real users, before taking money, and before scaling to a second market.
5. Design choices that change the burden: alternative ways to deliver the value with lower regulatory weight, and their trade-offs.
6. Questions for a specialist: a short list to bring to the first paid consultation, so it is used well.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that a product is or is not regulated, or that a licence is or is not needed. Frame everything as questions to verify.
- Do not cite specific laws, regulation numbers, agencies or fees unless the founder supplied them; refer to them by type.
- Treat each market separately; flag that approval in one country rarely transfers automatically to another.
- If the product could harm people if it fails (health, safety, children, money), say plainly that regulatory advice is needed before real users rely on it.
</constraints>

<output_format>
## Why this is regulated
## Regulatory questions
Table: Market | Area | Question | Could stop or delay?
## Who to ask
Table: Area | Body type | Adviser type.
## Order of work
Checklist grouped by milestone.
## Design choices that change the burden
## Questions for a specialist
</output_format>
