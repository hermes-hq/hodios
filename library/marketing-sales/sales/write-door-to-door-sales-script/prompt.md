---
schema: 1
id: write-door-to-door-sales-script
kind: prompt
title: Write a door-to-door sales script
description: Writes a residential door-to-door script (solar, pest control, roofing, broadband, security) with opener, qualifying questions, objection answers, a close, and cooling-off and permit checks.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [door-to-door, canvassing, residential-sales, cooling-off, field-sales, objection-handling]
pairs_with:
  prompts: [canvass-neighbours-after-job, handle-sales-objections, write-cold-call-script]
  personas: [sales-coach]
args:
  - name: offer
    description: What you sell door to door, the price or price range, any genuine current offer, and who it suits (homeowners, renters, a type of property).
    type: text
    required: true
  - name: area
    description: Country and town or region, plus anything relevant about the neighbourhood (housing type, recent installs nearby, local issues such as storms or pests).
    type: text
    required: true
  - name: common_objections
    description: What people say at the door most often. Optional; common ones are covered if empty.
    type: text
output_contract:
  format: markdown
  sections: [Door map, Script, Objections, Close and paperwork, Compliance checks, Rep conduct]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train field reps who sell to homeowners at the door. The first ten seconds decide everything: people open the door braced for a pitch or a scam. What works is a clear, honest identity (name, company, badge), a local and specific reason for being on that street ("we're installing for a neighbour at number 12", said only when true and with that customer's permission), a question rather than a pitch, and respect for "no".

Door-to-door is one of the most regulated and complained-about sales channels. Most countries give consumers a cooling-off period to cancel contracts signed at home (for example 14 days across the EU and UK, and three business days for many sales in the US under the FTC rule), require written cancellation notices, and some towns require a solicitation permit or ban calling after certain hours or at "no cold calling" homes. Scripts that use false urgency, imply affiliation with a utility or council, or pressure vulnerable people lead to cancellations, complaints and fines.
</context>

<task>
Write a door-to-door script.

<offer>
{{offer}}
</offer>

<area>
{{area}}
</area>
{{#common_objections}}
<common_objections>
{{common_objections}}
</common_objections>
{{/common_objections}}

1. Map the door conversation in stages: identify, reason for visiting, first question, qualify, short value, next step or close, exit.
2. Write the script in spoken lines, with alternatives for: homeowner vs renter, interested vs busy, and someone who says "no thanks" at once (a polite exit that leaves a leaflet).
3. Write two to four qualifying questions that decide fit quickly (for example property ownership, roof direction, current provider contract end date, pest signs).
4. Answer the most common objections, each with acknowledgement, a question and an honest response.
5. Describe the close and paperwork: when to offer an appointment instead of signing at the door, how to explain the price and the cooling-off right clearly, and leaving written terms and contact details.
6. List compliance checks for the area and rep conduct rules.
</task>

<constraints>
- Never imply the rep is from a utility, council, government scheme or a neighbour's insurer unless that is true.
- No false urgency ("only today"), invented neighbour installs, or invented savings figures; use only the offer facts given.
- Include a clear statement of the customer's cancellation right in the close, and tell the user to confirm the exact cooling-off period, permit and calling-hour rules locally rather than relying on the examples.
- Include a rule to end the conversation politely when someone appears confused, vulnerable or unable to decide alone, and to respect "no cold callers" signs.
</constraints>

<output_format>
## Door map
Numbered stages with the goal of each.

## Script
Spoken lines with branches.

## Objections
Table: Objection | Acknowledge | Question | Response.

## Close and paperwork
Steps and the cancellation-right line.

## Compliance checks
Checklist for this area.

## Rep conduct
Bullets.
</output_format>
