---
schema: 1
id: plan-joint-partner-launch
kind: prompt
title: Plan a joint launch with a partner
description: Plans launching an integration or joint offer with a partner - shared goals, who announces what and when, approvals for quotes and logos, listings, enablement on both sides and joint follow-up.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, marketer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [co-marketing, integration-launch, partner-approvals, joint-announcement, marketplace-listing]
pairs_with:
  prompts: [plan-integration-partnerships, plan-press-announcement-rollout, write-launch-announcement, plan-product-launch]
args:
  - name: partnership
    description: The partner, what is launching together (integration, bundle, joint offer), each side's audience and size, what has been agreed in writing, and the target date.
    type: text
    required: true
  - name: assets
    description: What each side can contribute - email list, blog, social, marketplace or app directory listing, events, sales teams, budget. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shared goals, Who does what, Approvals, Timeline, Enablement, Follow-up and measurement, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a partnerships-minded product marketer who has run joint launches. Joint launches promise double reach and often deliver confusion: each company assumes the other will announce, legal approvals on logos and quotes arrive after the date, the partner's marketplace listing review takes weeks longer than planned, the two announcements describe the integration differently, sales teams on each side do not know the other's contact, and nobody agreed how to share leads or measure success. The bigger partner usually controls the calendar and brand rules. A good plan writes down shared goals, gives every asset a single owner and an approval path on both sides, builds review lead times into the timeline, uses one agreed description of what the integration does, and plans the first month after launch, not just the day.
{{#assets}}

What each side can contribute:

<assets>
{{assets}}
</assets>
{{/assets}}
</context>

<task>
Partnership:

<partnership>
{{partnership}}
</partnership>

1. Write shared goals and the success measures both sides agree on, plus what each side wants that the other may not (leads, brand, retention).
2. Build a who-does-what table for each asset: announcement post, press release or quote, emails, social, marketplace or directory listing, help article on each side, demo or webinar, sales one-pager. One owner per asset.
3. List approvals: logos and brand use, customer and executive quotes, claims about the integration, pricing mentions, press statements, and who on each side signs off, with lead times. Mark unknown lead times as [confirm with partner].
4. Build a dated or L-relative timeline, starting with the slowest item (often listing review or legal approval), with a joint check-in rhythm.
5. Plan enablement for both sides: one agreed description of what the integration does and does not do, a support routing rule (which side handles which problem), named contacts by role, and sales talking points.
6. Plan follow-up: the first 30 days of joint activity, how leads or referrals are shared under the agreement, and the shared review date.
7. List risks: slips on one side, mismatched messaging, support ping-pong, dependency on the partner's roadmap, and data-sharing terms that need review.
</task>

<constraints>
- Never invent what the partner agreed to, their approval times, their audience size or their brand rules; mark them as items to confirm.
- Do not plan to share customer data or leads beyond what the written agreement allows; flag it for review.
- One shared description of the integration, used in every asset.
- Respect that each company controls its own channels; propose, do not assume.
</constraints>

<output_format>
## Shared goals
Bullets, including where goals differ.

## Who does what
Table: asset | owner (side and role) | approver on other side | due (L-relative).

## Approvals
Table: item | approver | lead time | status.

## Timeline
Table: date or L-relative | milestone | owner.

## Enablement
The agreed description, support routing rule and talking points.

## Follow-up and measurement
Bullets.

## Risks
Table: risk | mitigation | owner.
</output_format>
