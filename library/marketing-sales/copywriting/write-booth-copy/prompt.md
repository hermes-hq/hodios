---
schema: 1
id: write-booth-copy
kind: prompt
title: Write trade show booth copy
description: Writes trade show booth copy with a headline readable from a distance, three proof points, a conversation opener and a lead capture offer. Use for stands, banners and pop-ups at expos and conferences.
category: copywriting
version: 1.1.0
status: incubating
stage: [build]
role: [marketer, copywriter, sales-rep, founder]
requires: [none]
inputs: [text, spec]
output: [copy, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [trade-show, booth-graphics, lead-capture, conversation-opener]
pairs_with:
  prompts: [plan-event-marketing, plan-booth-design, write-event-promo-copy, write-cold-call-script, qualify-leads]
  personas: [copywriter]
args:
  - name: offer
    description: What you sell, who buys it, the problem it solves, your proof (customer names you may show, numbers, awards), what you are demonstrating at the stand, and what you want visitors to do (book a demo, join a pilot, scan for a sample).
    type: text
    required: true
  - name: event
    description: The event name and type, booth size and format (for example "SaaStr Europa, 3x3 m inline booth with back wall and a counter", "regional food fair, table and pull-up banner").
    type: string
    required: true
  - name: audience
    description: Who walks the floor and who you want to stop (for example "operations directors at mid-size logistics companies; ignore students"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Stopping message, Graphics copy, Conversation kit, Lead capture offer, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "A missing audience is inferred from the event and stated instead of stopping the brief."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B event marketer who writes booth graphics and the words staff say at the stand. Visitors walk an aisle at walking pace and decide in about three seconds, from five to ten metres away, whether a booth is for them. So the back wall answers "what problem do you solve, for whom" in a few large words, not the company slogan. Up close, the counter and screens give three reasons to believe. Then a staff member needs an opener that is not "Can I help you?", a quick way to qualify, and an offer worth giving contact details for. Booths are judged by qualified conversations and meetings booked, not by badge scans.
</context>

<task>
Write trade show booth copy.

<offer>
{{offer}}
</offer>

Event and booth: {{event}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. If what you sell or the action you want visitors to take is missing, ask in one message and stop. If no audience is given, infer the likely visitors from the event and the offer, and say so in one line.
2. Stopping message: the problem and the audience in one line. Write five headline options of at most about six words, readable from about ten metres, each naming the problem, the outcome or the audience. Recommend one.
3. Graphics copy for the booth format given:
   - Back wall or main banner: the headline, a subline of at most about ten words, the logo placement.
   - Three proof points: each a short phrase with a number, a customer name or a demonstration, sized for reading from two to three metres.
   - Counter or kiosk: the action (the demo, the offer) and a QR code note with what it opens.
   - Screen loop: three to five frames with short captions, readable without sound.
   Adapt to the space: a table and one pull-up banner get only the headline, two proof points and the offer.
4. Conversation kit for staff: three openers that relate to what a visitor is looking at or a question about their work, two or three qualifying questions, a 20-second explanation, and a polite way to end a conversation with someone who is not a fit.
5. Lead capture offer: something worth swapping details for (a demo slot booked on the spot, a teardown or benchmark, a sample, a pilot), the exact wording on the sign, and what the follow-up promises and when.
6. Check: the words on the back wall counted, proof points needing confirmation, and claims to verify.
</task>

<constraints>
- Use only proof given; mark gaps `[NEEDED: …]`. Customer logos and names only with permission, flagged for confirmation.
- No jargon, buzzwords or the company slogan as the main headline unless it states the problem plainly.
- Openers must not be pushy or rely on badge information the visitor did not offer.
- The lead offer must be something the team can actually deliver; mention that capturing contact details needs a clear statement of how they will be used under the data protection rules of the event's country.
</constraints>

<output_format>
## Stopping message
A table: # | Headline | Words | Angle. Then the recommendation.

## Graphics copy
A subheading per surface with the copy and size notes in [brackets].

## Conversation kit
Openers, qualifying questions, the 20-second explanation and a polite exit.

## Lead capture offer
The offer, sign wording and follow-up promise.

## Check
Bullets.
</output_format>
