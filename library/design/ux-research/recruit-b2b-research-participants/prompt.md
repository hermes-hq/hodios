---
schema: 1
id: recruit-b2b-research-participants
kind: prompt
title: Recruit B2B research participants
description: Plans recruiting business users for UX research, such as admins, buyers and specialists, through customer teams, communities and panels, with screeners, incentive rules and outreach copy.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, product-manager, designer]
subject: [saas]
requires: [none]
inputs: [text, notes]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [b2b-research, participant-recruitment, account-teams, incentives, research-invitations]
pairs_with:
  prompts: [write-research-screener, set-up-research-panel, map-buying-committee]
  personas: [ux-researcher]
args:
  - name: study
    description: The study and the roles you need, for example "6 IT admins at companies with 200+ seats who manage our SSO setup", plus timing.
    type: text
    required: true
  - name: access
    description: What you have - customer list, customer success or account managers, community or forum, user groups, budget for a recruitment agency, and any restrictions from sales.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who exactly, Channels, Working with account teams, Screener essentials, Incentives and policies, Outreach copy, Tracking and timeline, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recruiting business users is slower and harder than recruiting consumers: the right people are busy and few, account managers guard access to customers, many employers forbid staff from accepting cash or gifts, and the people who reply fastest (champions, power users) are not representative. What works is defining the role by what people do rather than by job title, going through account teams with a clear ask and a promise not to sell, using several channels in parallel, offering incentives that fit employer rules (charity donation, early access, a summary of findings), and tracking contact so the same customers are not asked repeatedly.
</context>

<task>
<study>
{{study}}
</study>

<access>
{{access}}
</access>

1. Who exactly: behaviour-based criteria, the roles to avoid over-sampling (champions, people who already give lots of feedback), and how many to recruit with a no-show buffer.
2. Channels: ranked for this study (customer list via account teams, in-product invitations, community, user groups, professional networks, agencies specialised in B2B, non-customers), with expected effort.
3. Working with account teams: what to send them, how to protect relationships (no sales follow-up, research not a support channel), and an escalation path for at-risk accounts.
4. Screener essentials: the questions that verify role and behaviour, including a check against job-title inflation.
5. Incentives and policies: options when employers restrict gifts, government and regulated-sector rules to check, tax or reporting questions for finance, and honest framing.
6. Outreach copy: an email for account managers to forward and a direct invitation, short and specific about time, topic and incentive.
7. Tracking and timeline: contact log, cooldown between asks per account, and a schedule.
8. Risks: bias from friendly customers, sales pressure, confidentiality of what customers share (NDA if needed).
</task>

<constraints>
- Do not state incentive amounts or legal rules as facts; give options and say who must approve.
- Outreach must be honest about purpose and must not be a sales pitch.
- Do not invent customer names or contacts.
</constraints>

<output_format>
## Who exactly
## Channels
| Channel | Fit | Effort | Notes |
## Working with account teams
## Screener essentials
## Incentives and policies
## Outreach copy
## Tracking and timeline
## Risks
</output_format>
