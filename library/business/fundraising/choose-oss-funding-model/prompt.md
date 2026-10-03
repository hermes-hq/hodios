---
schema: 1
id: choose-oss-funding-model
kind: prompt
title: Choose a funding model for an open-source project
description: Compares funding routes for an open-source project (sponsorship, grants, paid support, hosted or pro editions, licensing) against its users, license and the maintainers' goals, and picks a first step.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, founder]
requires: [none]
inputs: [text]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, maintainer-funding, open-core, sustainability, github-sponsors, research-grants]
pairs_with:
  prompts: [write-sponsorship-ask, write-grant-application, design-pricing]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What it is, who uses it (individuals, companies, public bodies), license, maturity, dependents and downloads, team size, and what you know about who would pay.
    type: text
    required: true
  - name: goals
    description: What the maintainers want - pay for part-time maintenance, a full-time salary, a company, or covering costs - and what they will not do.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Profile, Options, Recommendation, First 90 days, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Open-source funding routes fit different projects. Donations and sponsorship (GitHub Sponsors, Open Collective, thanks.dev, which splits a company's donation across its dependency tree) work best for widely used projects with a visible maintainer, and rarely reach a salary without company sponsors or paid content. Grants fund defined work: NLnet and the EU's NGI programmes fund first grants in the tens of thousands of euros for internet commons; the Sovereign Tech Agency funds maintenance of critical infrastructure; FLOSS/fund (by Zerodha) gives grants to established, widely used projects that publish a funding.json; security-focused funds such as Alpha-Omega and the GitHub Secure Open Source Fund pay for security work. Commercial routes include paid support or SLAs, a hosted service, pro or enterprise features (open core), dual or source-available licensing, and sponsor-first features released later. Each route changes the project: commercial routes create pressure on what stays free; licence changes have split communities. Programmes, amounts and deadlines change often and must be checked at the source.
</context>

<task>
<project>
{{project}}
</project>
<goals>
{{goals}}
</goals>

If you cannot tell who uses the project or what the maintainers want, ask and stop.

1. **Profile.** Classify the project: who benefits (individual developers, companies, public infrastructure), how visible it is to the people with budgets, whether it is a library, app, service or tool, and its criticality (dependents, security exposure). This decides which routes can work.
2. **Options.** For each route (individual sponsorship, company sponsorship, dependency-based donations, grants, paid support, hosted service, open core, licensing changes, paid content or training, sponsor-first features), assess fit, realistic money range as a qualitative band (cover costs, part-time, full-time, company) with the reasoning, effort, time to first money, and the effect on community trust and the license. Name specific grant programmes only as candidates to verify.
3. **Recommendation.** Pick one primary route and at most one secondary route for the next year, matched to {{goals}}, and say what would make you change course.
4. **First 90 days.** Concrete steps with dates relative to today: for example publish a sponsor profile and FUNDING.yml, draft one grant proposal for a named open call (after checking its current deadline), or define a paid support offer and talk to five companies that use the project.
5. **Risks.** Burnout, obligations to funders, conflicts between paid and free features, licence-change backlash, tax and legal setup (fiscal hosts, invoicing), and how to mitigate each. Recommend professional advice for tax, legal entity and licensing decisions.
</task>

<constraints>
- Do not state grant amounts, deadlines or eligibility as current facts; mark them to verify at the source.
- Do not invent revenue projections; use qualitative bands and say what evidence would firm them up.
- If a licence change is considered, say plainly that it changes whether the project is open source and how the community may react.
</constraints>

<output_format>
## Profile
## Options
| Route | Fit | Money band | Effort | Time to first money | Trust and license effect |
## Recommendation
## First 90 days
| When | Step |
## Risks
</output_format>
