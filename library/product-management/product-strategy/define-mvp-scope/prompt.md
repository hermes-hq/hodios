---
schema: 1
id: define-mvp-scope
kind: prompt
title: Define MVP scope
description: Cuts a feature list down to the smallest testable MVP, with the riskiest hypotheses, success criteria set before launch, the cheapest MVP type and a deferred list with re-entry triggers.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, tech-lead, designer]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mvp, scope-cutting, hypotheses, riskiest-assumption]
pairs_with:
  prompts: [prioritize-features, map-opportunity-solution-tree, plan-beta-program]
args:
  - name: idea
    description: The product or feature idea, who it is for, and the problem it solves.
    type: text
    required: true
  - name: features
    description: The full list of features or capabilities currently being considered.
    type: text
    required: true
  - name: timeline
    description: Time and team available for the MVP (for example "6 weeks, 2 engineers and a designer"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Hypotheses, MVP type, MVP scope, Success criteria, Deferred list, Fit to timeline, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who has scoped many first versions. An MVP is not a small version of the full product; it is the smallest thing that tests the riskiest assumptions with real users and produces a decision. Most MVPs fail because they are too big to ship fast, test nothing in particular, or have no success criteria, so any result can be called a success. Sometimes the right MVP is not software at all: a concierge service, a manual "Wizard of Oz" back end, a single-feature version or a landing page with a real sign-up.

{{#timeline}}Time and team available: {{timeline}}{{/timeline}}
</context>

<task>
Idea:

<idea>
{{idea}}
</idea>

Features under consideration:

<features>
{{features}}
</features>

1. Write the hypotheses that must be true for the idea to succeed, across value (people want it), usability (they can use it), feasibility (we can build it) and viability (it works as a business). Rank them by risk: how uncertain and how fatal if wrong. Name the one or two riskiest.
2. Choose the cheapest MVP type that tests the riskiest hypotheses: concierge, Wizard of Oz, single-feature product, landing page or pre-sale, or a functional slice. Explain why it beats the alternatives.
3. Go through every feature and classify it as: in (needed to test a top hypothesis or for the core flow to work at all), faked or manual (needed, but can be done by hand or hard-coded for now), or deferred. Give a one-line reason for each.
4. Define success criteria before launch: the behaviour to measure, the threshold that counts as success, the threshold that means stop or pivot, the number of users, and the time window. Prefer behaviour (repeat use, payment, referrals) over stated interest.
5. Write the deferred list with the trigger that would bring each item back (for example "if 30% of users ask to export").
6. Check the scope against the timeline. If it does not fit, cut further and say what you cut; if no timeline is given, estimate the size in rough T-shirt terms and say it is an estimate.
7. List the risks of this MVP, including ways the test could give a misleading answer.
</task>

<constraints>
- Every "in" feature traces to a hypothesis or to the core flow; if it does not, it is deferred.
- Never cut what protects users, even in a test: security of personal data, safe payment handling, legal requirements, accessibility basics and safeguarding when minors or other vulnerable people are involved (for example vetting anyone who meets them) stay in, even if done manually.
- Thresholds are set now, not after the results. Use the user's numbers where given; otherwise propose thresholds and label them as proposals to agree.
- If the idea or feature list is too vague to classify, ask up to three questions and stop.
</constraints>

<output_format>
## Hypotheses
Table: hypothesis | type | uncertainty | impact if wrong | rank.

## MVP type
The choice and why, in three to five sentences.

## MVP scope
Table: feature | in, faked or deferred | reason.

## Success criteria
Bullets: metric, success threshold, stop threshold, sample, window.

## Deferred list
Table: feature | re-entry trigger.

## Fit to timeline
Two or three sentences.

## Risks
Bullets.
</output_format>
