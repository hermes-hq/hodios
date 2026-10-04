---
schema: 1
id: define-guardrail-metrics
kind: prompt
title: Define guardrail metrics
description: Defines a standing set of guardrail metrics for experiments and launches that catch harm to revenue, performance, trust or support load, with thresholds, owners and actions on breach.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [product-manager, data-analyst, data-scientist, engineering-manager]
inputs: [notes, text]
output: [table, plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [guardrail-metrics, ab-testing, launch-safety, non-inferiority, experiment-governance]
pairs_with:
  prompts: [design-ab-test, define-feature-success-metrics, write-experiment-readout, design-holdout-experiment]
args:
  - name: product
    description: What the product does, how it makes money, its key user actions, the metrics the company already tracks, and past launches or experiments that caused harm nobody caught in time.
    type: text
    required: true
  - name: experiment_types
    description: Optional. The kinds of changes you test or launch (for example "pricing page tests, onboarding changes, ranking algorithm changes, infrastructure migrations").
    type: text
  - name: risk_appetite
    description: How strict thresholds should be. conservative stops at small drops; balanced accepts small, short-lived drops; aggressive tolerates more risk for speed.
    type: enum
    enum: [conservative, balanced, aggressive]
    default: balanced
output_contract:
  format: markdown
  sections: [Principles, Guardrail set, Per change type, Decision rules, Statistical notes, Owners and review, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experimentation lead who sets up guardrails for product teams. A success metric asks "did this change help?"; a guardrail asks "did it break something we care about, even if the success metric went up?". Classic examples: a checkout change lifts conversion but raises refund requests; a ranking change lifts clicks but slows page load; an onboarding change lifts sign-ups but floods support. Good guardrails are few, defined once for the whole organisation, cover the ways this business can be hurt, have a threshold decided before the test, and come with an owner and a pre-agreed action. Too many guardrails produce false alarms and get ignored; too few let harm through.
</context>

<task>
Define a standing set of guardrail metrics for this product, with {{risk_appetite}} thresholds.

<product>
{{product}}
</product>
{{#experiment_types}}
<experiment_types>
{{experiment_types}}
</experiment_types>
{{/experiment_types}}

1. If the product description does not say how the product makes money or what users do in it, ask and stop.
2. Principles: four or five short rules for how guardrails work here (defined before a test starts, checked in every readout, a breach triggers the pre-agreed action unless the owner signs off on an exception, and so on).
3. Guardrail set: six to ten metrics across these areas, chosen for this product: revenue (for example revenue per user, refunds, downgrades), performance and reliability (page or app load time, error rate, crash rate), trust and quality (complaints, unsubscribes, content reports, cancellations), support load (contacts per active user), and compliance or safety where relevant. For each: what harm it catches, the exact definition, the threshold as a relative change with a {{risk_appetite}} setting, the time window, the owner, and the action on breach (pause, roll back, investigate, escalate).
4. Per change type: which guardrails are always on, and which are added for specific types of change (pricing tests add refund and downgrade guardrails; infrastructure changes add latency and error guardrails).
5. Decision rules: what happens when the success metric wins but a guardrail breaches, when a guardrail is inconclusive, and when a breach appears late (after launch).
6. Statistical notes: guardrails test for "not meaningfully worse" rather than "better", so the test needs enough power to detect the threshold drop; checking many guardrails raises the chance of a false alarm; some harms (churn, refunds) lag, so they need a longer window or a post-launch check. Explain each in plain words and say what it implies for test duration.
7. Owners and review: who owns each guardrail, where breaches are reported, and a quarterly review of which guardrails fired, false alarms and harms that slipped through.
8. Data gaps: guardrails that cannot be measured yet and the instrumentation needed.
9. Before replying, check that every guardrail has a definition, threshold, window, owner and action, and that the set is within six to ten.
</task>

<constraints>
- Do not present threshold numbers as industry standards; offer starting values clearly labelled as suggestions to tune against the product's own variance and history.
- Use only metrics the product could plausibly measure from the description; mark any assumed data source `[confirm]`.
- Keep definitions precise enough for an analyst to compute without asking.
</constraints>

<output_format>
## Principles
## Guardrail set
A table: Guardrail | Catches | Definition | Threshold | Window | Owner | On breach.
## Per change type
## Decision rules
## Statistical notes
## Owners and review
## Data gaps
</output_format>
