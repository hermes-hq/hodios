---
schema: 1
id: check-kpi-for-perverse-incentives
kind: prompt
title: Check a KPI for perverse incentives
description: Reviews a proposed KPI or target for ways people could hit it while harming customers, quality or other teams, then adds counter-metrics, review rules and a safer wording.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, design]
role: [product-manager, manager, executive, operations-manager]
subject: [public-sector, healthcare]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [goodharts-law, metric-gaming, counter-metrics, target-setting, unintended-consequences, incentive-design]
pairs_with:
  prompts: [define-guardrail-metrics, set-metric-targets-from-baseline, define-public-service-kpis]
args:
  - name: kpi_and_target
    description: The KPI with its exact definition and target (for example "average handling time under 4 minutes per call"), and what it is tied to (bonus, league table, funding, team review).
    type: text
    required: true
  - name: team_and_context
    description: Who is measured, how their work flows, what they control and what they do not, and what the organisation really wants to improve.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Ways to hit it without improving, Who gets hurt, Counter-metrics, Review rules, Safer version, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You stress-test a KPI before it is rolled out. When a measure becomes a target, people find the cheapest way to move the number, and that is often not the way the organisation intended (Goodhart's law; Campbell's law adds that the more a number drives decisions, the more it gets corrupted). Calls handled per hour rewards rushing callers off the phone; tickets closed rewards closing and reopening; beds turned over rewards early discharge; items shipped rewards shipping late-quarter stock that comes back.

This is not about assuming bad faith. Most gaming is ordinary people under pressure responding rationally to what is counted, so the fix is in the design of the measure, not in more policing.
</context>

<task>
<kpi_and_target>
{{kpi_and_target}}
</kpi_and_target>

<team_and_context>
{{team_and_context}}
</team_and_context>

1. Restate what the organisation actually wants, and how directly the KPI measures it (direct outcome, proxy, or activity count).
2. List the ways to hit the KPI without improving that goal. Check each pattern: rushing or cutting quality; cherry-picking easy cases and avoiding hard ones; reclassifying or redefining work; timing games (pulling work into or pushing it out of a period); splitting or merging units to change counts; shifting cost or work to another team or to the customer; behaviour bunched just over a threshold; and misreporting. Keep only the ones that are realistic for this team, and say how likely and how damaging each is.
3. Who gets hurt: customers or users (which ones, usually the most complex cases), quality, other teams, and staff wellbeing.
4. Counter-metrics: for each serious gaming path, one measure that would move the wrong way if it happened (for example handling time paired with repeat contact within 7 days and first-contact resolution). Keep the set to three or fewer.
5. Review rules: look at the distribution, not just the average (spikes just past a threshold signal gaming); sample cases for quality each period; review outliers in both directions with curiosity before blame; and say whether the KPI should be tied to individual pay at all (usually team-level or not at all for proxies).
6. Write a safer version of the KPI: closer to the outcome, defined to close the loopholes, with its counter-metrics and how it will be used.
</task>

<constraints>
- Ground every gaming path in the team's real work as described; do not list generic risks that cannot happen here.
- Do not accuse the team of bad faith; frame gaming as a predictable response to the design.
- Do not invent data about the team's current behaviour; where evidence would help, say what data to look at.
- If the KPI's definition or the work it measures is unclear, ask for it and stop.
</constraints>

<output_format>
## Verdict
Keep, keep with counter-metrics, rewrite, or drop, with one sentence why.

## Ways to hit it without improving
Table: path | how it would happen here | likelihood (high, medium, low) | damage (high, medium, low).

## Who gets hurt
Bullets.

## Counter-metrics
Table: counter-metric | definition | catches which path.

## Review rules
Numbered rules.

## Safer version
The rewritten KPI, its definition, counter-metrics, and how it is used (team or individual, linked to pay or not).

## Questions
Up to five.
</output_format>
