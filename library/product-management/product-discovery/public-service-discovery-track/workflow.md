---
schema: 1
id: public-service-discovery-track
kind: workflow
title: Run a public service discovery
description: Runs a public or charity service discovery in gated steps - policy intent, research with offline and assisted users, evidenced needs, the journey, and an alpha, reframe or stop call.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan, review]
role: [product-manager, business-analyst, manager, ux-researcher]
subject: [public-sector, nonprofit, social-care]
requires: [none]
inputs: [text, notes]
output: [plan, report, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [public-services, user-needs, policy-intent, assisted-digital, journey-mapping, phase-gates]
pairs_with:
  prompts: [find-gaps-in-research-sample, interview-frontline-staff, write-discovery-readout, translate-request-into-problem]
  personas: [public-service-product-owner, service-designer]
args:
  - name: service_and_policy_intent
    description: The service or problem area, the policy or mission it serves (what it is meant to achieve and for whom), and why the discovery is happening now.
    type: text
    required: true
  - name: users_and_constraints
    description: Who uses or should use the service (including people who are offline or need help), the team, budget, legal or procurement constraints, and who decides after discovery.
    type: text
    required: true
  - name: weeks
    description: Length of the discovery phase in weeks.
    type: number
    default: 8
steps:
  - {id: intent, file: steps/01-intent-and-constraints.md, stage: discover, gate: approve, artifact: "discovery/01-intent-and-constraints.md"}
  - {id: research, file: steps/02-research-plan.md, stage: plan, gate: approve, artifact: "discovery/02-research-plan.md"}
  - {id: needs, file: steps/03-user-needs.md, stage: discover, gate: approve, artifact: "discovery/03-user-needs.md"}
  - {id: journey, file: steps/04-journey.md, stage: discover, gate: approve, artifact: "discovery/04-journey.md"}
  - {id: recommend, file: steps/05-recommendation.md, stage: review, gate: none, artifact: "discovery/05-recommendation.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs the discovery phase of a public or charity service: understand what the service is for, who it must work for (everyone eligible, not only confident online users), what they need, where today's journey fails, and whether to move to an alpha, reframe the problem or stop. Stopping is a valid, money-saving outcome. Each step writes one document and stops for approval; research steps wait for notes to be pasted in.

Discovery length: {{weeks}} weeks

<service_and_policy_intent>
{{service_and_policy_intent}}
</service_and_policy_intent>

<users_and_constraints>
{{users_and_constraints}}
</users_and_constraints>

Rules for every step:
- Ask for missing essentials instead of inventing them; mark gaps as [to confirm].
- Never invent research findings, quotes, statistics, policy text or legal duties. Separate observation from interpretation.
- Include offline, assisted and hard-to-reach users and frontline staff in every research and needs step.
- Laws, accessibility and equality duties, procurement and service standards differ by country and level of government: name them as items to check with the legal, procurement or standards team.
- Use participant codes, never names, and keep personal data out of documents.
- If research reveals someone at risk or a safeguarding concern, it goes through the organisation's safeguarding route at once.
