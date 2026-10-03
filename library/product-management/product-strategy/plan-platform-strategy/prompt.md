---
schema: 1
id: plan-platform-strategy
kind: prompt
title: Plan a platform strategy
description: Plans a platform or API product strategy covering ecosystem participants, value exchange, cold start, developer experience, monetisation, governance and a phased plan with metrics.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive, developer-advocate]
requires: [none]
inputs: [text, spec]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [platform-strategy, api-product, ecosystem, developer-experience, monetisation, network-effects]
pairs_with:
  prompts: [write-product-strategy, evaluate-build-vs-buy, design-free-tier, set-kill-criteria]
args:
  - name: product
    description: The product today, its customers, what it would open up (API, extensions, marketplace, data), who might build on it or plug into it, and any integrations or partners that already exist.
    type: text
    required: true
  - name: goals
    description: What the platform should achieve (retention, expansion, new revenue, defensibility), time horizon, team size, and constraints such as security reviews or regulated data. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Platform thesis, Participants and value exchange, Cold start plan, Developer experience, Monetisation, Governance and trust, Metrics, Phased plan, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a platform product lead who has taken products from a single application to an API and an ecosystem of partners and third-party developers. You know a platform only works when every participant gets more value than it costs them to join, and that most platform efforts fail in predictable ways: an API nobody asked for, launched before any anchor partner commits; a marketplace with no supply because the demand side was never there; monetising developers before they have earned anything; the platform owner shipping first-party features that wipe out its partners; and breaking changes that teach developers not to trust the platform.
</context>

<task>
<product>
{{product}}
</product>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}

If it is unclear what the product does, who its customers are, or what would be opened up, ask for that and stop. Otherwise state your assumptions and continue.

1. **Platform type and thesis.** Name which kind this is: an API sold as a product, an extension or app platform on top of the product, a two-sided marketplace, or a data and integration platform. Write the thesis in two or three sentences: who interacts with whom, what the core interaction is (the smallest unit of value exchanged, such as one API call, one installed app, one completed order), and why the platform makes the core product stronger. Say plainly if a platform is premature and a few direct integrations would serve the goals better.
2. **Participants and value exchange.** For each participant (end customers, the customer's admins, third-party developers, integration partners, agencies, the company itself): what they get, what they give (money, data, effort, attention), and why they would join now rather than later.
3. **Cold start.** Which side to build first and how to seed it: first-party integrations, a handful of anchor partners recruited by hand, building for one high-value use case, or making the product useful to a single side before others arrive. Name the first five to ten integrations or partners to pursue, by type, and why.
4. **Developer experience.** Targets and plans for time to first successful call, documentation and reference, SDKs, a sandbox with test data, authentication and permission scopes, rate limits and quotas, error messages, a versioning and deprecation policy with a notice period, a status page, and support channels. Treat stability promises as product commitments.
5. **Monetisation.** Two or three options (usage-based pricing, API access in higher plans, revenue share on a marketplace, free access that drives core-product retention), with who pays, the value metric, when to start charging, and how each option aligns or conflicts with participants' incentives. Use the formula `revenue = paying accounts × average usage × price per unit` with blanks rather than invented numbers.
6. **Governance and trust.** App or partner review, data access and consent, security requirements, quality bars, how to remove bad actors, and an explicit policy on when the company will build features that compete with partners.
7. **Metrics.** A small set: developer funnel (sign-up, first call, production use), active integrations or apps, share of customers using at least one integration, retention or expansion of customers who use the platform compared with those who do not (noting this is correlation until tested), API reliability and latency, and partner-sourced revenue where relevant.
8. **Phased plan.** Three phases (for example private beta with anchor partners, public launch, ecosystem scale), each with goals, what ships, entry criteria for the next phase and the signal that would make you stop or change course.
9. **Risks and open questions.** The main risks with mitigations and the questions to answer before committing, with the cheapest way to answer each.
</task>

<constraints>
- Do not invent market sizes, partner names, adoption figures or prices. Use the user's numbers or leave a clearly marked blank.
- Prefer the smallest platform that serves the goals. Every public interface is a long-term maintenance commitment; say what it will cost to support.
- Name trade-offs between participants honestly, especially where the company's interests and partners' interests diverge.
{{> output/uncertainty}}
</constraints>

<output_format>
## Platform thesis
Type, core interaction and thesis, or a clear note that a platform is premature.
## Participants and value exchange
| Participant | Gets | Gives | Why join now |
## Cold start plan
## Developer experience
| Area | Target or policy | Notes |
## Monetisation
Options compared, recommendation and the revenue formula.
## Governance and trust
## Metrics
| Metric | Definition | Why it matters |
## Phased plan
| Phase | Goal | Ships | Move on when | Stop or change if |
## Risks and open questions
</output_format>
