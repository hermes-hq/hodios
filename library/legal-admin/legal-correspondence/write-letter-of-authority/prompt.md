---
schema: 1
id: write-letter-of-authority
kind: prompt
title: Write a letter of authority
description: Writes a letter authorising a relative, adviser or representative to deal with a bank, utility, landlord, council or agency for you, with a precise scope, expiry and how to withdraw it.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [letter-of-authority, third-party-consent, authorisation-letter, representative, caregiver-admin]
pairs_with:
  prompts: [prepare-power-of-attorney-questions, manage-parent-finances, find-free-legal-help]
args:
  - name: who
    description: Who is giving the authority and who is receiving it (relationship or role, for example "my son", "a debt adviser at a charity", "my accountant"), and whether you can still make your own decisions.
    type: text
    required: true
  - name: organisation
    description: The organisation or organisations (bank, energy supplier, landlord, council, tax office, insurer, hospital billing) and the account or reference as [BRACKETS].
    type: text
    required: true
  - name: scope
    description: What the representative may do - only receive information, speak on your behalf, make complaints, agree payment plans, make changes or payments - for how long, and anything they must not do.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is a letter the right tool, Letter of authority, What to send with it, Withdrawing or changing it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people give someone else permission to deal with an organisation on their behalf: a relative helping with bills, a debt or benefits adviser, an accountant, or a friend chasing a complaint. A simple signed letter of authority (third-party consent) is widely accepted for sharing information and handling enquiries, but its limits matter: it only works while the person can make their own decisions; it does not give the general legal power a power of attorney gives; many banks and agencies have their own third-party or "trusted contact" form and may insist on it; and some organisations (tax, benefits, health providers) require their own specific authorisation. What advisers know: the narrower and clearer the letter, the more likely it is accepted and the safer it is: name the organisation and account, list what the representative may and may not do, set an end date, and include enough identifying details for the organisation to match records without over-sharing. You draft; the organisation decides what it accepts.
</context>

<task>
People:

<who>
{{who}}
</who>

Organisation:

<organisation>
{{organisation}}
</organisation>

Scope:

<scope>
{{scope}}
</scope>

1. Is a letter the right tool? If the person may no longer be able to make decisions, or the representative needs to manage money generally, say a letter is not enough and a power of attorney (or a court appointment if capacity is already lost) is the route. If the organisation is likely to have its own consent form (banks, tax and benefits agencies, health providers), say to ask for it first and use the letter as a cover or fallback.
2. Draft the letter:
   - Account holder's name, address and account or reference as [BRACKETS], date, organisation address.
   - A clear statement: "I authorise [NAME], my [relationship/role], to ..." followed by a bulleted list of permitted actions taken only from the scope given.
   - Explicit limits: actions not permitted (for example no withdrawals, no new credit, no change of address) where relevant.
   - Duration: an end date or "until I withdraw this in writing".
   - Representative's contact details as [BRACKETS] and how the organisation can verify them.
   - The account holder's signature and date, and an optional witness line if the organisation prefers.
3. What to send with it: copies of ID only if the organisation asks, the organisation's own form if it has one, a note to keep a copy, and checking that the organisation has recorded it.
4. Withdrawing or changing it: a two-line withdrawal letter and when to use it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Keep the scope to what the person asked for; do not widen it.
- If anything suggests the person is being pressured or financially exploited, say so gently and point to independent support.
- Do not present the letter as a power of attorney or as legally binding on the organisation.
- Do not include full card numbers, passwords or PINs; tell the person never to share those with the representative or in the letter.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is a letter the right tool
Two or three lines.

## Letter of authority
The complete letter with [BRACKETS].

## What to send with it
Bullets.

## Withdrawing or changing it
The short withdrawal letter.
</output_format>
