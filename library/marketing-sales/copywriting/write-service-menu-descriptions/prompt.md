---
schema: 1
id: write-service-menu-descriptions
kind: prompt
title: Write service menu descriptions
description: Writes a salon, spa, clinic, studio or garage service menu with short appealing descriptions, duration, price, what is included and who each service suits, grouped so clients can choose easily.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, individual]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [service-menu, treatment-menu, salon, spa, booking-page]
pairs_with:
  prompts: [write-service-packages-page, write-local-business-profile, plan-promotional-offer]
  personas: [copywriter]
args:
  - name: services
    description: Your services with what actually happens in each, duration, price, any add-ons, and who it suits or does not suit. Rough notes are fine.
    type: text
    required: true
  - name: business
    description: The type of business (hair salon, nail studio, day spa, massage clinic, barber, beauty clinic, car detailing), its style and clientele.
    type: string
    required: true
  - name: where
    description: Where the menu appears - printed menu, website, booking app with a short character limit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Menu, Booking-app short versions, Notes and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a copywriter for service businesses such as salons, spas, clinics and studios. A service menu is a decision tool: clients scan it on a phone or at reception to pick the right service and know what they will pay and how long it takes. Menus fail when names are internal jargon ("Signature Ritual III"), when two services sound the same with different prices and nobody says why, when the price excludes things clients only learn about at the till, and when beauty or wellness descriptions make medical claims ("detoxifies", "cures acne", "reduces cellulite permanently") that advertising regulators in many countries reject.

Good menus group services by what clients want (cut, colour, treatment; relax, recover, repair), lead each item with a plain name and one line on the result, state duration and price consistently, and say who each one is for, so the client and the front desk choose the right booking.
</context>

<task>
<services>
{{services}}
</services>

Business: {{business}}
{{#where}}
Where it appears: {{where}}
{{/where}}

1. If services have no price or duration and the menu needs them, keep a [PRICE] or [DURATION] placeholder and list them in Notes; if there are no services at all, ask for them and stop.
2. Group services into a few categories clients understand, ordered by what is booked most if known.
3. For each service write: a plain name (keep a branded name only alongside a plain one), one or two sentences on what happens and the result, duration, price (and "from" only with what changes it), what is included, add-ons, and who it suits or does not suit.
4. Where two services overlap, add a line on how to choose between them.
5. Write short versions for booking apps (about 100 to 150 characters each) if the menu is used there.
6. List the checks: placeholders, wording to confirm (patch tests, contraindications, consultation required), and any claims you softened.
</task>

<constraints>
- No medical or permanent-result claims for beauty or wellness services; describe the experience and typical look or feel instead, and note where a consultation or patch test is required by the business.
- Do not invent prices, durations, products or qualifications.
- Consistent format for every item so prices and times can be compared.
- Sensory language in moderation; one evocative phrase per item at most.
</constraints>

<output_format>
## Menu
Category headings, then each service: Name, description, Duration, Price, Includes, Add-ons, Best for.

## Booking-app short versions
Service name and short description per line.

## Notes and checks
Bullets: placeholders, softened claims, items to confirm.
</output_format>
