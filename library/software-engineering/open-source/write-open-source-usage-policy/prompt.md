---
schema: 1
id: write-open-source-usage-policy
kind: prompt
title: Write a company policy for using open-source dependencies
description: Writes a company's policy for using open-source dependencies, with licence categories by product type, review triggers, a light approval route, dependency health checks, inventory and SBOM duties.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [engineering-manager, tech-lead, legal-professional, security-engineer]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [license-compliance, ospo, sbom, dependency-policy, software-supply-chain]
pairs_with:
  prompts: [audit-dependency-licenses, vet-dependency, write-upstream-contribution-policy]
args:
  - name: company
    description: What the company builds and how it ships (SaaS, mobile apps, on-prem software, devices, SDKs for customers), its size, who owns legal and security today, and any customer or regulatory requirements (SBOMs in contracts, government buyers).
    type: text
    required: true
  - name: current_state
    description: How dependencies are chosen and checked today, any tooling already in use, and past problems such as a licence surprise in due diligence. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Licence categories, When review is needed, Approval route, Dependency health, Inventory and SBOM, Policy text, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Open-source policies fail in two opposite ways. Some require legal approval for every package, so engineers route around them and nobody knows what is in the product. Others say nothing until an acquisition's due diligence or a customer's SBOM request finds AGPL code in the shipped app. A policy that works sorts licences into a few categories whose meaning depends on how the company ships (AGPL in an internal tool differs from AGPL in a SaaS backend or a distributed app), makes the common case automatic, and saves human review for the cases that matter: strong copyleft in distributed products, network copyleft in services, source-available or custom licences, no licence at all, and copying code snippets. Licence is only half: abandoned, single-maintainer or newly published packages carry security and supply-chain risk, and an automated check in CI is what keeps the inventory true.

{{> guardrails/professional-limits}}

Company:
<company>
{{company}}
</company>
{{#current_state}}Current state: {{current_state}}{{/current_state}}
</context>

<task>
1. State three to five principles (use open source by default, know what ships, review only where risk is real, give back where it helps).
2. Define licence categories as a table by shipping model: allowed without review, allowed with conditions (for example notice duties or no modification), needs review, and not allowed. Fill it for the shipping models this company actually has, with common SPDX ids as examples.
3. List review triggers beyond licence: no licence, source-available or custom terms, dual licences, copying snippets from other projects or Q&A sites, AI-generated code that reproduces existing code, licence changes on upgrade, and packages that bundle other code.
4. Design the approval route: who reviews what, inside what time, where requests are logged, and what an engineer does while waiting. Keep it to the minimum the company's size supports.
5. Set dependency health expectations: maintenance signals, how new and unknown packages are vetted, pinning and lockfiles, and what happens when a dependency is abandoned.
6. Set inventory and SBOM duties: a CI licence and vulnerability check, which SBOM format, who produces it for customers, and how notices are shipped.
7. Write the policy text ready to publish internally, one to two pages.
8. Plan the rollout: a first scan of existing products, handling of findings already in production, tooling, and communication to engineers.
</task>

<constraints>
- Do not classify a licence as permitted for a shipping model without stating the reason; where the treatment is debated, put it in needs review.
- Do not invent laws, regulations or customer contract terms; mention that specific regulations or contracts may add duties and should be checked.
- Keep the review load proportionate: if the policy would send more than a small share of new dependencies to manual review, simplify it.
- The final classification of licences and the policy text should be approved by the company's legal counsel; say so once.
</constraints>

<output_format>
Use the contract's section headings in order. Licence categories as a table: Licence type | Examples | Internal tools | SaaS backend | Distributed product. Policy text in a fenced markdown block. Rollout as a numbered list with owners as roles.
</output_format>
