---
schema: 1
id: write-re-permission-campaign
kind: prompt
title: Write a re-permission campaign
description: Writes a reconfirm-your-subscription campaign for an old or doubtfully collected list, with list triage, two or three emails, one opt-in click, a deadline and a suppression rule.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [founder, marketer, individual]
subject: [retail, construction]
requires: [none]
inputs: [text, dataset]
output: [copy, plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [re-permission, reconfirm-consent, list-hygiene, opt-in, suppression-list]
pairs_with:
  prompts: [check-email-marketing-compliance, write-win-back-campaign, audit-email-deliverability]
  rules: [email-consent-rules]
args:
  - name: list_story
    description: Where the contacts came from and how old they are - for example "1,900 addresses from five years of quote requests in a spreadsheet, never emailed" or "old shop till sign-ups, some ticked a box, some did not". Include what records of consent you have.
    type: text
    required: true
  - name: market
    description: Country or region where most contacts live (for example UK, Germany, Canada, California). Consent rules differ a lot; leave as unspecified if unsure.
    type: string
    default: unspecified
  - name: brand_voice
    description: How the business sounds (for example "friendly local plumber, first names, no jargon"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [List triage, Before you send, Emails, Confirmation and suppression rules, Records to keep, Questions to check locally]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a shop or tradesperson clean up an old or doubtful contact list so they keep only people who clearly want their emails. Three traps catch small businesses here. First, in some places (for example the UK and EU), an email asking for consent is itself a marketing email, so sending it to people with no valid consent can break the very rules the campaign is meant to respect; regulators have fined businesses for exactly this. Second, old lists contain dead addresses and spam traps, so blasting the whole list at once can damage the sender's reputation before anyone confirms. Third, people who do not click are often deleted outright, which loses the record needed to avoid re-adding them later.

Market: {{market}}
{{#brand_voice}}Brand voice: {{brand_voice}}{{/brand_voice}}
</context>

<task>
<list_story>
{{list_story}}
</list_story>

1. **Triage the list** into groups by source and evidence of consent:
   - Documented opt-in (ticked box, signed form, double opt-in) - may not need re-permission; consider only for long-inactive contacts.
   - Customers who bought or asked for a quote and were offered a clear opt-out at the time - in some markets a "similar products" or existing-relationship exception may cover them; flag to check locally, including any time limit (for example Canada's implied consent periods).
   - No evidence, unclear source, bought, scraped or swapped lists - do not email. Recommend deleting, or reaching them only through a channel that does not need prior consent (in-store sign, receipt, social post) inviting them to sign up.
2. **Before sending:** remove obvious bad addresses (role addresses, typos, hard bounces), run an address check if available, and send in small daily batches starting with the most recent contacts, watching bounces (stop above about 5%) and complaints (stop above about 0.3%).
3. **Write two or three emails** over 10-14 days to the groups cleared to receive them:
   - Email 1: who you are and how they know you (the job you did, the shop they visited), why you are asking, what they will get and how often, one large "Yes, keep me on the list" button, and a plain "No thanks" link.
   - Email 2 (to non-clickers, day 5-7): shorter reminder with the deadline.
   - Email 3 (optional, day 10-14): last notice the day before the deadline.
   Each with two subject lines that say what the email is ("Do you still want emails from [Business]?"), preheader, body under 150 words and the sender's real name. No guilt, no "you'll miss out", no prize draws that bundle consent with entry.
4. **Confirmation and suppression:** what the confirmation page and thank-you email say, and the rule for non-responders at the deadline (move to a suppression list, stop all marketing, keep for service-only messages if those are allowed).
5. **Records:** what to store per confirmed contact (date and time, source, the wording they agreed to) and per non-responder.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If the market is unspecified, ask for it before step 3 or write the triage with each rule marked "check for your country"; never state that a group is legal to email.
- Do not invent the business's history, offers or numbers. Use [NEEDED: ...] for missing facts.
- Never suggest keeping non-responders "just in case", re-adding unsubscribed people, or emailing purchased or scraped lists.
- Name the privacy or electronic-marketing regulator or a local adviser as the place to confirm doubtful groups.
</constraints>

<output_format>
## List triage
Table: Group | How they joined | Evidence held | Action (re-permission, keep, do not email) | Check locally.

## Before you send
Checklist with the batch size and stop thresholds.

## Emails
For each email: send day, two subject lines, preheader, body, button text.

## Confirmation and suppression rules
Confirmation page text, thank-you email, and the deadline rule for non-responders.

## Records to keep
Bullets.

## Questions to check locally
Up to six specific questions for a regulator's guidance or an adviser.
</output_format>
