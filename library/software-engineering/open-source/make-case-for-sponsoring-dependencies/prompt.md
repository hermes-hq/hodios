---
schema: 1
id: make-case-for-sponsoring-dependencies
kind: prompt
title: Make the case for funding the open source you depend on
description: Builds an internal business case for a company to fund the open-source projects it depends on, with a criticality list, evidence of risk, a budget split, funding routes and how to measure the result.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, executive]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [oss-funding, business-case, software-supply-chain, dependency-risk, sustainability]
pairs_with:
  prompts: [audit-dependencies, choose-oss-funding-model, write-sponsorship-ask]
args:
  - name: company
    description: What the company builds, roughly how big the engineering team is, who decides the budget and what language they respond to (risk, cost, hiring, brand).
    type: text
    required: true
  - name: dependencies
    description: The dependencies you rely on most, or a dependency list or SBOM, with anything you know about each one's maintainers and health. Incidents or costly upgrades caused by a dependency help the case.
    type: text
    required: true
  - name: budget_hint
    description: A budget range or reference point if you have one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Why this matters to us, Critical dependencies, Proposal, Budget split, Funding routes, How we will know it worked, Risks and objections]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pitches for funding open source fail when they are framed as charity. Budget holders respond to risk and cost: a single unpaid maintainer behind a package in the payment path, an abandoned library forcing an emergency rewrite, a supply-chain attack through a project that had no time for security work, or the engineering hours already spent on private patches and workarounds. The strongest case picks a short list of dependencies that are both critical to the business and under-resourced, rather than spreading small amounts across everything. Money is not the only lever: paid engineer time upstream, paying for a support contract, or funding a specific security audit can be worth more to a project than a donation. Projects take money through different routes (GitHub Sponsors, Open Collective, foundations, fiscal hosts, maintainer companies, commercial support), and procurement needs to know which ones produce an invoice. A case that promises "security" in general is weak; one that names what the money will change (a release cadence, a security policy, a second maintainer) can be checked a year later.

Company:
<company>
{{company}}
</company>
Dependencies:
<dependencies>
{{dependencies}}
</dependencies>
{{#budget_hint}}Budget reference: {{budget_hint}}{{/budget_hint}}
</context>

<task>
1. Rank the dependencies by business criticality (in what product path, how hard to replace) and by fragility (number of active maintainers, release activity, funding, open security issues), using only what was given; mark unknowns to check.
2. Pick the short list where both are high, with one line on what failure would cost this company.
3. Write the reason in the budget holder's terms: risk reduced, engineering hours saved, recruiting or brand where relevant. Use the incidents or costs given; do not invent figures.
4. Propose the programme: amounts per project or a pool, the duration (at least a year so maintainers can plan), and non-money support (upstream engineer time, a security audit, bug bounty funding).
5. Map funding routes per project and note which can invoice and which are donations, for procurement and tax handling.
6. Define how success is measured, tied to what each project says the money will pay for, and when to review.
7. Answer the likely objections: free riding by others, no direct return, tax and procurement friction, and choosing favourites.
</task>

<constraints>
- Do not invent maintainer counts, funding levels, incident costs or download numbers. Mark them [CHECK] and say where to find them.
- Do not claim funding guarantees security or continued maintenance; describe it as reducing risk.
- Recommend asking each project what it needs before deciding amounts, instead of assuming.
- Keep the document short enough to send as a one-pager with an appendix table.
</constraints>

<output_format>
Use the contract's section headings in order. Critical dependencies as a table: Dependency | Where we use it | Criticality | Fragility signals | Cost if it fails. Budget split as a table: Project | Amount or share | Form (money, time, audit) | Route.
</output_format>
