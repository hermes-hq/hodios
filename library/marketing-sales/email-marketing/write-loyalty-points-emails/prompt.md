---
schema: 1
id: write-loyalty-points-emails
kind: prompt
title: Write loyalty points emails
description: Writes the emails a loyalty or stamp scheme needs - welcome, points balance, reward unlocked, tier change and points expiring - with exact rules stated plainly and dates taken from supplied data only.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [retail, hospitality]
requires: [none]
inputs: [text, document]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [loyalty-programme, points-balance, reward-unlocked, points-expiry, tier-change]
pairs_with:
  prompts: [design-loyalty-program, write-milestone-emails, map-email-automation-flows]
args:
  - name: programme_rules
    description: The scheme's rules as written - how points or stamps are earned, rewards and their thresholds, tiers if any, expiry rules, how rewards are redeemed (in store, online, app) and any exclusions. Paste the terms if you have them.
    type: text
    required: true
  - name: brand_voice
    description: How the business sounds, for example "cosy neighbourhood cafe" or "polished salon". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Email set, Emails, Data fields, Rule wording to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the email set behind a loyalty scheme for a cafe, shop or salon. These emails are read for one thing: "what have I got and how do I use it?" Programmes lose trust when the emails state rules loosely ("earn rewards on everything!") and the counter staff then say otherwise, when expiry comes as a surprise, or when a tier drop is announced coldly. The rules must be stated exactly as the scheme's terms say, with every number and date coming from the member's data, not from the copy.

{{#brand_voice}}Brand voice: {{brand_voice}}{{/brand_voice}}
</context>

<task>
<programme_rules>
{{programme_rules}}
</programme_rules>

1. **Email set:** decide which emails the scheme needs from its rules: welcome (always), balance update (monthly or after each visit, which one fits the visit frequency), reward unlocked (always), tier up and tier down (only if tiers exist), points expiring (only if points expire; at about 30 days and 7 days before), and a reward-reminder for unused rewards (about 14 days after unlocking).
2. **Write each email:** two subject lines that carry the member's news ("You've earned a free coffee"), a preheader, a 40-110 word body and one action (show this at the till, use online with code, book now). Put the member's numbers in square-bracket fields ([Points balance], [Points to next reward], [Expiry date]).
3. **Welcome email:** explain the scheme in three steps (how to earn, what you get and when, how to use it), with the main exclusions in one plain sentence and a link to the full terms.
4. **Tier down:** kind and factual; what changed, why (the rule), and exactly what it takes to get back.
5. **Points expiring:** the number, the date and the easiest way to use them, without guilt or pressure.
6. **Data fields:** list every field with an example and what to show if it is empty or zero.
</task>

<constraints>
- State earning rates, thresholds, tiers, exclusions and expiry exactly as the rules give them; never round, simplify or improve them. If a rule is ambiguous (for example whether points expire after 12 months from earning or from last visit), list it under rule wording to check and use a placeholder.
- Every date and balance comes from a data field, never written into the copy.
- Do not invent rewards, partner offers or bonus events.
- Balance and expiry statements may count as service messages, but adding promotions to them may make them marketing in some places; note this.
- If the rules are missing the reward threshold or how to redeem, ask and stop.
</constraints>

<output_format>
## Email set
Table: Email | Trigger | Timing | Needed because (rule reference).

## Emails
Each email with subject lines, preheader, body and action.

## Data fields
Table: Field | Example | If empty or zero.

## Rule wording to check
Bullets of any rule that is ambiguous or that staff might explain differently, with the question to settle.
</output_format>
