---
schema: 1
id: plan-grand-opening-event
kind: prompt
title: Plan a grand opening
description: Plans the grand opening of a shop, cafe or studio - pre-opening buzz, a launch-day programme, community and press invites, offers that bring people back, a budget split and what to measure.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [grand-opening, launch-event, local-marketing, soft-opening, community-marketing, footfall]
pairs_with:
  prompts: [plan-shop-opening, plan-restaurant-opening, write-press-release, plan-local-advertising, write-local-business-profile]
args:
  - name: business
    description: What the business is, who it is for, the price point, and what makes it worth visiting, for example "independent bike shop and repair workshop with a coffee bar".
    type: text
    required: true
  - name: date
    description: Planned opening date, and how firm it is.
    type: string
    required: true
  - name: budget
    description: Money available for the opening, from pre-opening to the first month.
    type: string
    required: true
  - name: location
    description: Address type and neighbourhood - high street, shopping centre, residential street, business park - plus neighbours and local groups you know.
    type: string
    required: true
  - name: audience
    description: Who you most want through the door first (local families, office workers, students, a hobby community) and any contacts you already have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals and measures, Timeline, Pre-opening buzz, Soft opening, Launch-day programme, Offers that bring people back, Invites and press, Budget, Risks and permissions, After the opening]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a local marketing consultant who has planned openings for independent shops, cafes, studios and salons. A good opening is not one busy day: it builds a list of interested locals before the doors open, tests the operation quietly with a soft opening, makes the launch day an event worth turning up to, and, most importantly, gives people a reason to come back in weeks two to six, when many new businesses go quiet. Deep discounts on day one fill the shop with bargain hunters and teach customers the wrong price; value-adds and return offers work better. Operations (fit-out, stock, staffing systems) are planned separately; this plan is about customers and community.
</context>

<task>
Plan the grand opening.

Opening date: {{date}}
Budget: {{budget}}
Location: {{location}}

<business>
{{business}}
</business>
{{#audience}}
<first_audience_and_contacts>
{{audience}}
</first_audience_and_contacts>
{{/audience}}

1. Goals and measures: three measurable goals (for example, email or follower sign-ups before opening, launch-day visitors, return-offer redemptions in the first month, first reviews) with how each will be counted.
2. Timeline: working back from {{date}}, typically six to eight weeks out to four weeks after, with what happens each week. If the date is too close for the full plan, compress it and say what is dropped.
3. Pre-opening buzz: window signage and hoarding with a sign-up method, behind-the-scenes social posts, introducing yourself to neighbouring businesses and local groups, a sign-up incentive, and local online groups and newsletters, all tailored to this business and location.
4. Soft opening: a friends, family and neighbours preview a few days before, its purpose (testing service, prices, the till, the flow), how to collect feedback, and what to fix before launch.
5. Launch-day programme: a timed run of the day - opening moment (for example, a ribbon cut with a local figure or a community group), activities that show what the business does (demos, tastings, mini-workshops, a kids' activity where it fits), music and atmosphere within limits, and staffing for peaks. Plan queue and capacity management.
6. Offers that bring people back: one launch-day value-add (a gift for the first visitors, a free add-on, a stamped loyalty card), and a return offer valid in weeks two to six. Explain why these beat a large discount for this business.
7. Invites and press: who to invite (neighbours, local groups, councillors or community leaders, local press and creators, suppliers), how and when, and a short press note outline with the story angle.
8. Budget: split the budget across signage and print, launch-day costs, samples and gifts, social and local ads, and contingency, in a table that adds up to the total.
9. Risks and permissions: weather, overcrowding, stock running out, permissions to check (street use, music, food sampling hygiene, signage), and accessibility on the day.
10. After the opening: thank-you messages, asking for reviews from all customers, posting photos with permission, reviewing the measures, and the next three marketing actions.
11. Before you answer, check that the budget adds up, every timeline item happens before it is needed, and every offer is sustainable at the price point.
</task>

<constraints>
- No deep day-one discounts unless the user insists; if they do, explain the trade-off and cap it.
- Never suggest buying reviews or followers or rewarding reviews.
- Permissions are things to check with the council or venue, not stated as rules.
- Keep everything proportionate to the budget; if the budget is very small, focus on free community actions.
- If the business or audience is too vague to tailor, state the assumptions you used and list what would sharpen the plan.
</constraints>

<output_format>
## Goals and measures
Table: Goal | Target | How counted.
## Timeline
Table: Week | Actions.
## Pre-opening buzz
Bullets.
## Soft opening
Bullets.
## Launch-day programme
Table: Time | What happens | Who.
## Offers that bring people back
The launch-day value-add and the return offer, with the reasoning.
## Invites and press
Invite list table (Who | How | When), then the press note outline.
## Budget
Table: Item | Amount | Notes, with the total.
## Risks and permissions
Table: Risk or permission | Plan.
## After the opening
Numbered steps.
</output_format>
