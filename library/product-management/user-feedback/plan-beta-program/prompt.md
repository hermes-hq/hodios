---
schema: 1
id: plan-beta-program
kind: prompt
title: Plan a beta program
description: Plans a beta or early-access programme with learning goals, recruitment and screening, feedback channels, a weekly cadence, participant communications and exit criteria for general availability.
category: user-feedback
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [product-manager, founder, ux-researcher, project-manager]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [beta-program, early-access, exit-criteria, customer-feedback-loop]
pairs_with:
  prompts: [analyze-user-feedback, plan-product-launch, define-mvp-scope]
args:
  - name: feature
    description: The feature or product going into beta, what is known to be unfinished, and the risks you are worried about.
    type: text
    required: true
  - name: target_users
    description: Who should be in the beta (segment, plan, region, behaviour). Optional; without it, a recommendation is made.
    type: string
  - name: duration
    description: Planned length of the beta.
    type: string
    default: 6 weeks
output_contract:
  format: markdown
  sections: [Learning goals, Beta design, Recruitment, Feedback channels, Cadence, Communications, Exit criteria, Risks and safeguards]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who has run many beta programmes. A beta exists to answer specific questions and reduce specific risks before general availability, not to give a launch a softer start. Betas fail when the participants are the wrong people (fans who never use the feature), feedback arrives as unstructured noise, nobody acts on it fast enough for participants to notice, and there is no agreed bar for leaving beta, so it drags on.

Planned duration: {{duration}}
{{#target_users}}Target users: {{target_users}}{{/target_users}}
</context>

<task>
Feature:

<feature>
{{feature}}
</feature>

1. Write three to five learning goals: the questions the beta must answer (value, usability, reliability at real-world scale, pricing or packaging, support load) and the risks it must retire.
2. Design the beta: closed or open, the number of participants and why that number is enough for the goals, phases if useful (for example a small wave, then a larger one), feature flag or access mechanism, and what support participants get.
3. Plan recruitment: the ideal participant profile tied to the learning goals, a mix that includes typical users and edge cases (not only enthusiasts), a short screener, where to find people (in-product invitation, customer success, waitlist), and an expected acceptance rate so you invite enough.
4. Set feedback channels and what each is for: product analytics for behaviour, a short in-product prompt for in-the-moment reactions, a survey at set points, a dedicated channel for bugs, and interviews with a subset. Define what is tracked automatically.
5. Set a weekly cadence: what is reviewed, who triages, how decisions are made, and how participants are told what changed because of their feedback.
6. Draft communications: invitation, welcome with expectations (it is unfinished, how to give feedback, how data is used, how to leave), weekly or bi-weekly update, and close-out with thanks and what happens next. Include terms to confirm, such as a beta agreement, confidentiality, data handling and what happens to their data and access when the beta ends.
7. Define exit criteria for general availability, decided now: reliability (for example crash-free rate or error rate), task success or adoption, satisfaction, open critical bugs, support readiness and documentation. Also define criteria that would extend the beta or stop the feature.
8. List risks and safeguards: data loss, participant fatigue, biased sample, and confidentiality leaks.
</task>

<constraints>
- Fit the plan to the {{duration}} duration; say what to cut if it is too short.
- Proposed numeric thresholds are labelled as proposals for the team to agree; never present them as industry standards.
- Do not collect more personal data than the goals need; note consent for interviews and recordings.
- If the feature description is too thin to set learning goals, ask up to three questions and stop.
- If the "beta" is really a full launch under a softer label (all users, no learning goals, no exit criteria), say so plainly and recommend either a scoped beta with the plan below or a proper launch with its own readiness checks; do not use the beta label to excuse unfinished quality or skipped support readiness.
</constraints>

<output_format>
## Learning goals
Numbered.

## Beta design
Bullets.

## Recruitment
Profile, mix, screener questions, sources, invitations to send.

## Feedback channels
Table: channel | purpose | when | owner.

## Cadence
A week-by-week table for the duration.

## Communications
Each message as a short draft with a subject line.

## Exit criteria
Three lists: graduate to general availability, extend, stop.

## Risks and safeguards
Bullets.
</output_format>
