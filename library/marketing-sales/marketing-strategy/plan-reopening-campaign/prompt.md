---
schema: 1
id: plan-reopening-campaign
kind: prompt
title: Plan a reopening campaign
description: Plans how a business wins customers back after a closure (refit, illness, flood, new owner) - what to tell regulars and when, a reopening offer, local press, profile updates and signs it works.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, operations-manager]
subject: [hospitality, retail]
requires: [none]
inputs: [text]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [reopening, win-back, regulars, soft-launch, local-press]
pairs_with:
  prompts: [write-customer-change-notice, plan-grand-opening-event, write-win-back-campaign, pitch-journalist]
args:
  - name: closure_story
    description: Why and how long you were closed, what changed (refit, new menu, new owner, same team), who your regulars are and how you can reach them (email list, social, phone numbers with consent, loyalty app), and trading before the closure.
    type: text
    required: true
  - name: reopening_date
    description: The planned reopening date and how certain it is (for example "14 March, confirmed" or "early April, depends on insurance sign-off").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The message, Timeline, Reopening offer, Local press and profiles, Signs it is working, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help restaurants, shops, salons and clinics come back after a closure. While a business is shut, regulars form new habits and map listings may tell people it is closed for good. Winning them back depends on telling regulars first and personally, being honest about what happened and what is new, getting every listing and sign right before the doors open, and making the first weeks feel worth the trip. Common mistakes: announcing a date that slips, a big discount that brings bargain-hunters instead of regulars, a new owner changing the things regulars loved without saying so, and judging the reopening on day one instead of over the first six weeks.

Reopening date: {{reopening_date}}
</context>

<task>
<closure_story>
{{closure_story}}
</closure_story>

1. If you do not know why the business closed, what has changed, or how to reach customers, ask and stop. If the date is not certain, plan a "save the date" without a firm date and a confirmation message once it is.
2. The message: one sentence on what happened (brief and honest; personal reasons only as far as the owner wants to share), what is the same, what is new, and why it is worth coming back. Adapt the angle to the closure: refit (show the new space), illness or bereavement (thank people for patience, no detail needed), flood or fire (resilience and the community), roadworks (access and parking now), new owner (continuity and respect for what regulars loved).
3. Timeline from three to four weeks before to six weeks after: personal message to regulars first, then social, email, signs, profiles, a soft opening for regulars or neighbours before the public date if the business suits it, opening day, and follow-ups in weeks one, three and six.
4. Reopening offer: something that rewards coming back without training people to wait for discounts (a welcome-back treat, a stamp card that starts with a stamp, a bring-a-friend offer, a preview evening for regulars). Show its cost per customer if prices are supplied.
5. Local press and profiles: a short news angle for local papers and community groups if there is a real story, and a checklist of profile updates (map listings marked open with correct hours, website, booking system, delivery apps, social bios).
6. Signs it is working: numbers to compare with before the closure (covers or transactions per day, returning regulars recognised by staff or in the loyalty system, bookings, reviews) and what to change if week three is below plan.
</task>

<constraints>
- Use only supplied facts; no invented dates, offers, figures or quotes. Mark gaps as [X].
- Do not announce a firm date that depends on works, inspections, insurance or permits.
- Keep health and personal details private unless the owner chooses to share them; never imply blame for a flood, fire or illness.
- Contact customers only through channels they agreed to; flag consent for SMS and email under local rules.
- Avoid deep discounts that cut margin without bringing back the right customers.
</constraints>

<output_format>
## The message
The core message in three to five sentences, plus the angle.

## Timeline
Table: When | Audience | Channel | Message.

## Reopening offer
The offer, how it works, its cost, and why it brings regulars back.

## Local press and profiles
A short news angle (if any) and a profile update checklist.

## Signs it is working
Table: Measure | Before closure | Target week 3 | Target week 6. Then actions if behind.

## Assumptions and questions
Bullets.
</output_format>
