---
schema: 1
id: design-onboarding-flow
kind: prompt
title: Design a first-run onboarding flow
description: Designs a first-run onboarding flow that gets new users to the activation moment fast, using progressive disclosure, skip paths and measurable steps. Use when designing or fixing onboarding.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [user-onboarding, activation, progressive-disclosure, first-run]
pairs_with:
  prompts: [write-ux-microcopy, create-wireframe-spec, build-user-journey-map]
  personas: [product-designer]
args:
  - name: product
    description: The product, who signs up and why, what they must set up before they get value, and the current onboarding with its drop-off data if you have it.
    type: text
    required: true
  - name: activation_event
    description: The first action that shows a new user got real value, e.g. "sends first invoice" or "invites a teammate and both edit a doc".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Activation, Flow, Deferred, Edge cases, Measurement, Experiments, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Onboarding is usually designed as a tour of features: five carousel screens, a profile form, a tooltip on every button. Most users skip or forget it, then leave before they ever do the one thing that makes the product useful. Good onboarding works backwards from the activation moment, removes or defers everything not on the path to it, and teaches in context, at the moment a feature becomes relevant.
</context>

<task>
Design the first-run onboarding for this product, aimed at the activation event **{{activation_event}}**.

<product>
{{product}}
</product>

1. Check the activation event. It should be a user action, reachable in the first session, and plausibly tied to retention. If it is a vanity event ("completed profile", "watched tour"), say why and propose a better one, then design for the better one and state that assumption.
2. Map the shortest path from sign-up to activation. List every step the current flow (or a naive flow) would include, then decide for each: keep, remove, defer, or automate (sensible defaults, templates, sample data, import).
3. Design the flow:
   - Ask at sign-up only what is needed to start. Ask personalisation questions only if the answers change what the user sees, and say what each one changes.
   - Get the user into the product early and let them act on something real or realistic (a template, sample project, or pre-filled draft) rather than an empty screen.
   - Use progressive disclosure: introduce secondary features at the moment they become relevant, triggered by behaviour, not by time.
   - Prefer contextual guidance (empty states that teach, one inline hint, a short checklist tied to activation) to product tours.
   - Give every non-essential step a visible skip, and a way back to it later (checklist, settings, resume banner).
4. Cover other entry paths: invited users joining an existing workspace, users who abandon mid-flow and return, users on mobile, and experienced users switching from a competitor.
5. Define measurement: the funnel steps to instrument, time to activation, activation rate, and the guardrail metric (e.g. week-2 retention) that shows the change is real.
6. Propose 2 to 3 experiments, each with hypothesis, change, primary metric and the risk it addresses.
7. If key facts are missing (who signs up, what setup is truly required), make a reasonable assumption, label it, and list it in Questions. If the product description is too thin to design anything, ask first.
</task>

<constraints>
- Every step in the flow must earn its place by moving the user towards {{activation_event}} or by being legally or technically required. Say which.
- No dark patterns: no hidden skip links, no forced invitations or contact uploads, no pre-ticked marketing consent, no fake progress.
- Do not invent data about the current flow. If no metrics were given, say the plan relies on assumptions until they are measured.
{{> output/uncertainty}}
</constraints>

<output_format>
## Activation
The activation event (as given or revised, with reasoning), the target time to reach it, and the "aha" the user should feel.
## Flow
| # | Screen or moment | User goal | What we show or ask | Why it is here | Skip path |
## Deferred
| Item removed from first run | When and how it appears instead |
## Edge cases
Invited users, returning after abandoning, mobile, experienced switchers.
## Measurement
Funnel events, metrics and guardrail.
## Experiments
Hypothesis, change, primary metric, risk.
## Questions
Assumptions to confirm.
</output_format>
