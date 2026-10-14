---
schema: 1
id: pitch-referral-partners
kind: prompt
title: Pitch referral partners
description: Plans recruiting referral partners (accountants, agencies, complementary vendors) with a partner profile, the pitch, what you give back and a simple routine for tracking and thanking referrals.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, consultant, sales-rep]
requires: [none]
inputs: [notes, text]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [referral-partners, partnerships, word-of-mouth, channel-sales]
pairs_with:
  prompts: [ask-clients-for-referrals, recruit-resellers, ask-for-introduction-by-email]
  personas: [small-business-selling-mentor]
args:
  - name: business
    description: What you sell, to whom, your typical customer and deal size, and the moment in a customer's life when they need you.
    type: text
    required: true
  - name: partner_ideas
    description: Partner types you are considering or already know (for example accountants, web agencies, IT providers, solicitors, complementary software vendors). Optional.
    type: text
  - name: country
    description: Country or region you operate in, for any professional or regulatory rules on referral fees.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Best partner types, What partners get, The pitch, First ten partners, Referral routine, Watch-outs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses and consultancies build referral partnerships with other professionals who serve the same customers. The best partners meet your customer just before the customer needs you (the accountant at year-end, the web agency at launch, the IT provider at an office move) and look good by referring someone reliable. Partnerships fail when they are one-sided (you ask, they give), when the partner cannot explain what you do in one sentence, when referrals vanish without feedback, or when a fee creates a conflict for a regulated professional.

Money is often not the main motivator. Partners value reciprocal referrals, making their client happy, a fast and reliable handover, and being kept informed. Some professions restrict or require disclosure of referral fees (for example many accountancy, legal, financial advice and healthcare bodies), and in some regulated sectors paying for referrals is restricted.
</context>

<task>
Plan referral partner recruitment.

<business>
{{business}}
</business>
{{#partner_ideas}}
<partner_ideas>
{{partner_ideas}}
</partner_ideas>
{{/partner_ideas}}

Country or region: {{country}}

1. Rank the three to five best partner types: when they meet your customer, why referring you helps them, and how many referrals a good one might plausibly send (describe as low, medium, high; no invented figures).
2. Define what partners get: reciprocal referrals, client experience, co-marketing, and a fee only where appropriate, noting where fees need disclosure or may be restricted for that profession.
3. Write the pitch: a 70 to 120 word first message, a 30-second spoken version for a coffee meeting, and a one-sentence "what we do" line the partner can repeat.
4. Plan the first ten partners: how to find them (existing clients' advisers, local networks, LinkedIn searches, events) and the order to approach them.
5. Set a referral routine: how referrals are passed (a short intro email template), the response time you promise, how you report back to the partner, and a quarterly check-in.
6. List watch-outs.
</task>

<constraints>
- Do not state referral fee rules as definitive for the country; say which professions commonly have rules and advise checking with the partner's professional body.
- Never suggest sharing client data with a partner without the client's consent.
- Do not invent statistics about referral conversion.
- Keep the pitch about the partner's client and the partner's benefit, not only yours.
</constraints>

<output_format>
## Best partner types
Table: Partner type | When they meet your customer | Why they would refer | Likely volume.

## What partners get
Bullets, with fee notes.

## The pitch
First message, 30-second version, one-sentence line.

## First ten partners
Numbered list of sources and approach order.

## Referral routine
Steps and the intro email template.

## Watch-outs
Bullets.
</output_format>
