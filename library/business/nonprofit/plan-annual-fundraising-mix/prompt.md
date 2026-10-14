---
schema: 1
id: plan-annual-fundraising-mix
kind: prompt
title: Plan a nonprofit's annual fundraising mix
description: Builds a nonprofit's yearly income plan across streams - individual giving, major donors, trusts, corporates, events, legacies - with net return, risk, staff time and a diversification target.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive]
subject: [nonprofit]
inputs: [dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [income-diversification, fundraising-strategy, income-streams, return-on-investment, annual-plan]
pairs_with:
  prompts: [plan-for-funding-loss, write-charity-three-year-strategy, plan-major-donor-cultivation, plan-monthly-giving-programme]
  personas: [nonprofit-advisor]
args:
  - name: income_history
    description: Income by stream for the last two or three years (gross and, if known, the direct costs of raising it), plus restricted versus unrestricted split.
    type: text
    required: true
  - name: needs
    description: The income target for next year, how much must be unrestricted, fundraising staff and budget available, and any known changes (a grant ending, a new programme).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where income comes from today, Concentration risk, Stream by stream, Proposed mix, Staff time and budget, Risks and triggers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonprofit leaders plan where next year's income will come from. Many organisations depend on one or two funders and only notice when a grant ends. Streams differ in what they really return and when: events often look large gross but net little after costs and staff time; regular individual giving and major donors take years to build but produce flexible, unrestricted money; trusts and government grants are large but restricted and time-limited; legacies are valuable but unpredictable. A realistic plan judges each stream by net return, reliability, restriction and the staff time it consumes, and grows new streams on a timeline that matches how long they take to mature.
</context>

<task>
Plan the fundraising mix.

<income_history>
{{income_history}}
</income_history>

<needs>
{{needs}}
</needs>

1. Where income comes from today: a table of each stream's gross, costs, net, share of total, and restricted share, with year-on-year change.
2. Concentration risk: the share from the largest single funder and the largest stream; what happens to the budget if each disappeared.
3. Stream by stream: for each current or possible stream, net return per unit spent (from the data where possible), reliability, how restricted, time to mature, staff time, and whether it fits this organisation's size and supporters.
4. Proposed mix for next year: a target per stream with the reasoning, showing how it meets the target and the unrestricted requirement; mark which numbers are firm (contracted) versus expected versus aspirational, and compute a risk-weighted total.
5. Staff time and budget: the investment each stream needs and whether the available staff and budget cover it.
6. Risks and triggers: the two or three things most likely to go wrong, the early signs, and the decision date for each.
</task>

<constraints>
- Use only the figures given and arithmetic on them. Label every assumption, including any probability applied to expected income.
- Do not quote sector benchmark returns as fact; where helpful, say what the organisation should measure.
- Be candid when the target is unrealistic given the history and capacity.
- Do not include grant writing advice beyond its place in the mix; that is a separate job.
</constraints>

<output_format>
## Where income comes from today
Table: Stream | Gross | Costs | Net | % of total | % restricted | Change.
## Concentration risk
## Stream by stream
Table: Stream | Net return | Reliability | Restriction | Time to mature | Staff time | Fit.
## Proposed mix
Table: Stream | Target | Status (firm, expected, aspirational) | Risk-weighted.
## Staff time and budget
## Risks and triggers
</output_format>
