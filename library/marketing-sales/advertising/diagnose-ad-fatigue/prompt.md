---
schema: 1
id: diagnose-ad-fatigue
kind: prompt
title: Diagnose ad creative fatigue
description: Spots creative fatigue from frequency, CTR, CPM and CPA trends per ad, separates it from auction or tracking causes, and plans a refresh cadence with replacement concepts.
category: advertising
version: 1.0.0
status: incubating
stage: [operate, review]
role: [marketer, founder, consultant]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [creative-fatigue, ad-frequency, creative-refresh, ctr-decay, iteration]
pairs_with:
  prompts: [plan-ad-creative-tests, analyze-creative-test-results, write-ad-creative-brief, write-social-ad-variations]
  personas: [ad-creative-strategist, paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: ad_data
    description: Per ad, weekly or daily rows for the last 4 to 8 weeks with spend, impressions, reach or frequency, CPM, CTR, conversions and cost per conversion. Hook or thumb-stop rate if available.
    type: text
    required: true
  - name: context
    description: Platform, audience size or targeting, target cost per result, and any recent changes (budget, offer, site, season).
    type: text
    required: true
  - name: production_capacity
    description: How many new ads you can make per month and in which formats. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Verdict per ad, Evidence, Other causes ruled in or out, Refresh plan, Refresh cadence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's ads are getting worse and they suspect the creative is worn out. Creative fatigue has a recognisable signature: frequency rising, click-through rate falling, cost per result rising, while CPM for the account holds roughly steady, and it shows up ad by ad, earliest on the ads with most spend and on small audiences. Other causes look similar and need different fixes: CPM rising across all ads points to auction pressure or seasonality; conversion rate falling while CTR holds points to the landing page, offer or tracking; every ad dropping on the same day points to a tracking or account change. What experts know: the fix for fatigue is usually iteration before reinvention (new hook or opening, new first frame, new format of the same winning angle), then new angles; refresh cadence depends on spend relative to audience size, not on the calendar.
</context>

<task>
<ad_data>
{{ad_data}}
</ad_data>
Context: {{context}}
{{#production_capacity}}Production capacity: {{production_capacity}}{{/production_capacity}}

1. For each ad, compute week-on-week trends in frequency, CTR, CPM, conversion rate (clicks to conversions) and cost per result, and the ad's age.
2. Classify each ad: fatigued, early signs, healthy, or underperforming from the start (not fatigue). Use the signature, not one metric.
3. Check other causes across the account: CPM rising on all ads, conversion rate falling on all ads, a single-day drop, recent changes listed by the user. Say which are ruled in or out and what extra data would settle it.
4. Refresh plan: for each fatigued or early-sign ad, what to make (iterations of the same angle: new hooks, first frames, formats, lengths; or new angles), keeping what made it win. Give 3 to 6 concrete replacement concepts in total, prioritised by the evidence.
5. Refresh cadence: from spend, audience size and the observed decay speed, how often to add new ads, how many, and the trigger metrics that mean "refresh now". Fit it to production capacity.
</task>

<constraints>
- Use the supplied numbers; do not invent benchmarks for "normal" frequency or CTR. Use the ad's own earlier performance as the baseline.
- If data is too thin (few conversions per week per ad), say conclusions are tentative and lean on CTR and frequency trends.
- Do not recommend pausing the only converting ad before replacements are live.
</constraints>

<output_format>
## Verdict per ad
A table: Ad | Age | Spend share | Frequency trend | CTR trend | Cost per result trend | Verdict.

## Evidence
Short notes per verdict.

## Other causes ruled in or out
Bullets: cause, evidence, verdict, data needed.

## Refresh plan
A table: Replaces | Concept | Type (iteration or new angle) | Why.

## Refresh cadence
Rule of thumb for this account, triggers, and the monthly production target.
</output_format>
