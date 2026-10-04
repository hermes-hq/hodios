---
schema: 1
id: brainstorm-shop-phone-clips
kind: prompt
title: Brainstorm short videos for a shop
description: Brainstorms short vertical video ideas for a local shop, salon, café or trade business that can be filmed on a phone in under ten minutes, each with shot, hook, caption and consent needs.
category: video
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, marketer]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [local-business, phone-filming, vertical-video, before-and-after, customer-consent]
pairs_with:
  prompts: [write-short-form-script, write-video-hooks]
  personas: [short-form-clip-coach]
args:
  - name: business
    description: The business - what you sell or do, where, who your customers are, what makes you different, and what people often ask you.
    type: text
    required: true
  - name: constraints
    description: Optional. What you cannot or will not film - no faces, busy hours, food hygiene rules, client confidentiality, shy staff.
    type: text
  - name: count
    description: How many ideas to generate.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Ideas, Start with these five, Filming kit and habits, Consent and rights]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small local businesses make short videos without a marketing team. The ideas that work for a bakery, barber or plumber are not polished adverts: they are the satisfying process, the transformation, the people behind the counter, the answer to a question customers ask every day, and the street outside. They fail when they need a crew, when they look like stock adverts, when they film customers or their homes without asking, or when they use popular music the business account is not licensed to use. Owners have minutes, not hours, so every idea must be filmable on a phone in under ten minutes during a normal day.

Number of ideas: {{count}}.
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
<business>
{{business}}
</business>

1. Generate {{count}} ideas spread across five buckets: process (how something is made, fixed or prepared), before-and-after, staff and owner, customer questions answered, and local moments (the street, suppliers, seasons, events). Note the bucket for each.
2. For each idea give: the shot in one line (angle, what is in frame, length), a hook as on-screen text of at most 8 words for the first second, a caption of one or two sentences ending with something useful (price range placeholder, booking line, opening hours placeholder), and whether consent is needed.
3. Make every idea specific to this business, not a generic template; at least a third should use the questions customers ask.
4. Pick five to start with: the easiest to film this week with the best chance of being useful to a local customer, and why.
5. Filming kit and habits: phone settings (vertical, clean lens, 1080p or higher at 30 fps), natural light, a cheap clip-on mic only if speaking, a 10-minute weekly batch routine, and posting consistency over volume.
</task>

<constraints>
- Ideas must respect the constraints given. No idea may need extra staff, a second day or paid actors.
- Flag consent for any identifiable customer, child, client's home, vehicle number plate or screen showing personal data; before-and-after of a person needs their written agreement.
- Do not suggest health, results or price claims the owner has not supplied; use [PRICE] and [HOURS] placeholders.
- Music: recommend the platform's commercial-use audio library or original sound; never popular tracks on a business account.
- Do not promise views or sales.
- If the business description is too vague to make specific ideas (no product or service named), ask and stop.
</constraints>

<output_format>
## Ideas
Table: # | bucket | idea | shot (under 10 min) | hook | caption | consent needed (yes or no and who).

## Start with these five
Numbered, with one line each on why.

## Filming kit and habits
Bullets.

## Consent and rights
Short checklist the owner can follow before posting.
</output_format>
