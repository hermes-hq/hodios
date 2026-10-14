---
schema: 1
id: challenge-fault-decision
kind: prompt
title: Challenge a car insurance fault decision
description: Tests an insurer's decision that you were at fault or share the blame for a road accident against the evidence and the policy, and drafts a request to reopen it with what to gather next.
category: insurance
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [report, message, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [split-liability, no-claims-discount, dashcam-evidence, motor-claim, at-fault]
pairs_with:
  prompts: [decide-whether-to-make-claim, appeal-insurance-denial, compare-car-insurance]
  workflows: [insurance-claim-track]
args:
  - name: decision
    description: What the insurer told you - at fault, split liability (for example 50/50), or fault "not yet decided" - and any reasons given, in their words if possible.
    type: text
    required: true
  - name: accident
    description: What happened, where, road layout, signs and signals, positions and damage of each vehicle, what each driver said at the scene, and whether police attended.
    type: text
    required: true
  - name: evidence
    description: Evidence you have or could get - photos, dashcam, witnesses, CCTV nearby, police reference, repair damage report, your own sketch.
    type: text
  - name: country
    description: Country and region, for example "Victoria, Australia". Road rules, how insurers settle fault between themselves and complaint routes differ.
    type: string
output_contract:
  format: markdown
  sections: [Summary, What the decision rests on, How the evidence fits, Evidence still to gather, Draft request to reopen, If they will not change it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A fault decision on a car claim is often made quickly, between two insurers, on the two drivers' statements, and it is usually settled commercially rather than tested in court. When accounts conflict and there are no independent witnesses or footage, insurers commonly agree a split such as 50/50 to save cost. That decision matters to the driver for years: it can cost the no-claims discount, raise premiums and leave the driver paying the excess. It can often be reopened when new evidence appears: dashcam or nearby CCTV (which is often overwritten within days or weeks), an independent witness, a police report, or damage patterns that only fit one version (damage to the rear of a car rarely fits a claim that it reversed into someone). Insurers also have a duty in many countries to explain their decision and to handle complaints. The driver's own insurer acts for the driver here, but it is also weighing the cost of a dispute, so the request needs to give it something new to work with.
{{#country}}

Country: {{country}}
{{/country}}

<accident>
{{accident}}
</accident>
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
<decision>
{{decision}}
</decision>

1. What the decision rests on: restate it and the reasons given; list what the insurer probably had (two statements, photos, no witnesses) and what is not explained. If no reasons were given, the first step is to ask for them in writing.
2. How the evidence fits: go through the account and the evidence and say which points support the person's version, which support the other driver's, and which are neutral. Describe how fault is commonly approached for this type of accident (rear-end, lane change, junction, car park, roundabout) as general practice, and mark local road rules to confirm.
3. Evidence still to gather, in order of urgency: footage that may be deleted soon, witnesses, police records, repair or engineer reports on the damage, photos of the scene and signs, the person's own written account made close to the time.
4. Draft request to reopen: to the person's own insurer, calm and factual, asking for the reasons and the evidence relied on, setting out the new or overlooked evidence, and asking them to put it to the other insurer.
5. If they will not change it: internal complaint, final response, then the ombudsman or dispute service where one exists (to confirm locally); when a solicitor or court claim may be worth it given the sums, and the effect of the decision on the excess, no-claims discount and future quotes.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say who was at fault or predict that the decision will change; describe the strength of each point.
- Do not invent road rules, codes or deadlines; name the kind of rule and say to check the local highway code or road law.
- Do not help shape an account that differs from what happened. If the person's own account has weak points, say so plainly.
- If anyone was injured, or the other side has threatened legal action, recommend legal advice and note that injury claims have time limits.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The decision, the strongest points for reopening it, and the most urgent next step.

## What the decision rests on
Bullets.

## How the evidence fits
Table: point | supports you / supports the other driver / neutral | why.

## Evidence still to gather
Numbered, most urgent first, with who to ask.

## Draft request to reopen
The message, ready to adapt.

## If they will not change it
Numbered steps.
</output_format>
