---
schema: 1
id: set-up-research-panel
kind: prompt
title: Set up a research participant panel
description: Sets up an in-house research participant panel with sourcing, sign-up, consent, data handling, incentives, contact limits and governance rules. For research ops and UX teams.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [ux-researcher, operations-manager, product-manager, designer]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-ops, participant-panel, participant-recruitment, research-incentives, consent, data-protection]
pairs_with:
  prompts: [write-research-screener, write-informed-consent-form, map-personal-data-processing]
  personas: [ux-researcher]
args:
  - name: organisation
    description: Who you are (product, size, B2B or B2C), who you want in the panel, the countries involved, how much research you run, and any existing tools, customer lists or privacy rules you must work within.
    type: text
    required: true
  - name: budget
    description: Annual or monthly budget for incentives and tooling, with currency. Optional; leave empty for a plan that states what to budget.
    type: string
output_contract:
  format: markdown
  sections: [Panel purpose, Sourcing, Sign-up and profile, Consent, Data handling, Incentives, Fair use rules, Operations, Panel health, Launch plan, Questions for privacy and legal]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research operations lead who has built and run in-house participant panels. A panel lets a team recruit customers or target users in days instead of weeks, but it becomes a liability when it is a marketing list in disguise, when the same eager participants are contacted every week until they become professional testers, when profile data sits in a spreadsheet anyone can open, when incentives are inconsistent or unpaid, and when nobody can tell a participant what data is held about them. A panel is a long-term relationship with people who give their time; the rules exist to keep it fair to them and useful to researchers.
</context>

<task>
Set up a research participant panel for this organisation.

<organisation>
{{organisation}}
</organisation>
{{#budget}}

<budget>{{budget}}</budget>
{{/budget}}

If the organisation description does not say who the panel is for or roughly how much research the team runs, ask those two questions and stop. If no budget is given, state what to budget for and give the formula (sessions per year by incentive rate, plus tooling) rather than a number you made up.

1. **Panel purpose.** Who the panel is for (and who is not), which research methods it serves, and a target size worked out from expected studies per year, participants per study, typical response rates and the contact limits in step 7.
2. **Sourcing.** Channels ranked for this organisation (in-product invitations, customer success referrals, support follow-ups, newsletter, community, partner organisations for hard-to-reach groups) with how to avoid a panel of only power users and how to include people who do not use the product yet.
3. **Sign-up and profile.** The minimum sign-up fields and why each is needed, optional profile questions in plain language, how often profiles are refreshed, and an accessible sign-up form.
4. **Consent.** Panel membership consent kept separate from marketing consent, a plain-language explanation of what joining means (types of studies, how often they may be contacted, what is recorded), per-study consent on top, and a one-click way to leave.
5. **Data handling.** Where panel data lives, who can access it (role-based, researchers only), what sales and marketing can and cannot see, retention (for example removal after a period of inactivity), deletion on request, handling of special-category data (only if needed and with explicit consent), and how recordings and notes link to participants.
6. **Incentives.** A rate card by session type and length and by audience (consumers, professionals, specialists), payment method and timing, what happens when a session is cancelled or a no-show happens, and the tax, anti-bribery and public-sector rules to check before paying (for example limits on paying government employees or healthcare professionals).
7. **Fair use rules.** Contact limits per person (for example at most one invitation a month and a few sessions a year), cool-down after participating, limits on how often one team can use the panel, rules against sales follow-ups from research contacts, and quotas so studies reflect the real user base.
8. **Operations.** Who owns the panel, how a researcher requests participants (a short request form with screener and quotas), the recruitment flow from invite to thank-you, templates to prepare, and tooling options described by capability rather than by vendor.
9. **Panel health.** 4 to 6 metrics (active members, response rate, show-up rate, time to recruit, over-contacted members, diversity against the user base) and when to refresh or recruit.
10. **Launch plan.** A phased plan for the first 90 days: pilot with one team, first studies, review, then open to more teams.
11. **Questions for privacy and legal.** The specific points to confirm with the organisation's data protection or legal adviser for the countries involved.
</task>

<constraints>
- This is an operations plan, not legal advice; flag privacy, tax and employment questions for the relevant adviser instead of stating jurisdiction-specific rules as settled.
- Do not invent the organisation's tools, customer numbers, response rates or budget; give ranges with their assumptions.
- Keep panel data and marketing data separate in every recommendation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Panel purpose
Include the target-size calculation.
## Sourcing
## Sign-up and profile
| Field | Required | Why |
## Consent
## Data handling
## Incentives
| Session type | Length | Audience | Suggested incentive or range | Notes |
## Fair use rules
## Operations
## Panel health
## Launch plan
## Questions for privacy and legal
</output_format>
