---
schema: 1
id: write-sponsorship-ask
kind: prompt
title: Write an honest sponsorship ask for an open-source project
description: Writes a GitHub Sponsors or Open Collective profile, tiers, a funding goal, README and release-note asks, and a note to companies that depend on the project, honest about what the money pays for.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [maintainer, founder]
requires: [none]
inputs: [text]
output: [copy, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [open-source, github-sponsors, open-collective, sponsorship-tiers, maintainer-funding]
pairs_with:
  prompts: [choose-oss-funding-model, collect-adopter-stories]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What the project does, who depends on it (companies, other projects, dependents count), how many people maintain it and how many hours, current funding, and what more money would change.
    type: text
    required: true
  - name: platform
    description: Where sponsorship will be collected.
    type: enum
    enum: [github-sponsors, open-collective, both, other]
    default: github-sponsors
  - name: perks_capacity
    description: What the maintainers can realistically give sponsors (logo placement, a support channel, office hours, early access), or none.
    type: text
output_contract:
  format: markdown
  sections: [The case, Profile, Tiers, Goal, Where to ask, Company note, What not to promise]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most maintainers are unpaid: surveys of maintainers find a majority are hobbyists and fewer than half are paid in any form. GitHub Sponsors has paid out more than 100 million dollars since 2019, organisations provided a large share of the money, and an organisation sponsorship averages many times an individual one; GitHub reports that every step that made sponsoring easier increased it. Platforms allow several monthly and one-time tiers and one public goal at a time; on GitHub, published tier prices cannot be edited, only retired and replaced. Projects that raised meaningful amounts paired a clear ask with something of value: logo placement on a well-visited docs site, sponsor-only content, or early access ("sponsorware") released to everyone later. Fiscal hosts such as Open Source Collective take a fee and handle invoices, which companies often need. Selling influence over the roadmap creates obligations and resentment.
</context>

<task>
<project>
{{project}}
</project>
Platform: {{platform}}.
{{#perks_capacity}}What the maintainers can give: {{perks_capacity}}{{/perks_capacity}}

If you cannot tell what the money would pay for, ask and stop; an ask without a purpose does not work.

1. **The case.** Three sentences: what the project does for whom, what it costs to keep it healthy (hours, infrastructure, security work), and what funding would change, in concrete terms ("one day a week on security fixes and releases").
2. **Profile.** The sponsor profile text (under 200 words) in the maintainers' voice: who they are, the case, what sponsors get, how the money is used and reported. No guilt, no exaggeration.
3. **Tiers.** Three to five monthly tiers and one or two one-time options, with individual and company tiers clearly separated. Give each a price, a name and a benefit the maintainers can actually deliver given {{perks_capacity}}. Company tiers should mention invoices or a fiscal host if available. Note that GitHub tier prices cannot be edited after publishing.
4. **Goal.** One public goal tied to the case (a monthly amount or a number of sponsors), and what will happen when it is reached.
5. **Where to ask.** The FUNDING.yml content, a two-line README section, a one-line ask for release notes, and the docs-site placement for sponsor logos if offered. Ask in places where people already get value; do not interrupt usage.
6. **Company note.** A short message (under 150 words) for companies that visibly depend on the project, sent only to contacts who chose to be reachable (support or open-source program office addresses, people the maintainers already talk to): the dependency, the risk of an unfunded maintainer, the ask, and how they can pay.
7. **What not to promise.** List promises to avoid (roadmap control, response times the team cannot keep, guaranteed features) and how to say no politely to sponsors who ask for them.
</task>

<constraints>
- No guilt-tripping, no false scarcity, no claims that the project will die unless that is true and the maintainers want to say it.
- Do not invent sponsor counts, amounts, users or company names.
- Do not suggest putting usage behind a paywall or nagging inside the software unless the maintainers explicitly want a paid model.
- Do not recommend messaging people whose contact details were scraped from commits or dependents.
</constraints>

<output_format>
## The case
## Profile
## Tiers
| Tier | Price | For | Benefit |
## Goal
## Where to ask
## Company note
## What not to promise
</output_format>
