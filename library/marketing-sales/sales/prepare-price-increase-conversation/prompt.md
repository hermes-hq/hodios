---
schema: 1
id: prepare-price-increase-conversation
kind: prompt
title: Prepare a price increase conversation
description: Prepares a freelancer, agency or B2B supplier to tell existing clients about a price rise, with value framing, notice, phase-in options, a call script, the written notice and replies to pushback.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, founder, sales-rep]
requires: [none]
inputs: [text, notes]
output: [plan, script, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [price-rise, existing-clients, grandfathering, notice-period, pushback-replies, account-management]
pairs_with:
  prompts: [prepare-renewal-conversation, prepare-deal-negotiation, pitch-retainer-to-client]
  personas: [deal-desk-analyst]
args:
  - name: current_and_new_prices
    description: Current and new prices or rates per client or tier, what they cover, and when the new price should start. Include contract terms that affect notice (fixed-term contracts, renewal dates, notice clauses).
    type: text
    required: true
  - name: client_relationship
    description: The clients affected - how long they have worked with you, how much they spend, how happy they are, who decides, and any you cannot afford to lose. Rough notes are fine.
    type: text
    required: true
  - name: reason
    description: The real reason for the rise (costs, more value delivered, rates unchanged for years, repositioning). Optional; you will be asked if it is unclear.
    type: text
output_contract:
  format: markdown
  sections: [Position, Options per client, Call script, Written notice, Pushback replies, Timeline]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who sells to businesses raise prices for clients they already have. The common mistakes: apologising so much the client assumes the price is negotiable, burying the rise in an invoice or email with no conversation, giving too little notice for the client's budget cycle, and treating every client the same when a few carry the business. A good price rise is stated once, plainly, with a reason that is true, enough notice, a clear date, and at most one or two pre-planned options (phase-in, a lock-in for a longer commitment, a reduced scope at the old price) offered on purpose, not conceded under pressure.
</context>

<task>
<current_and_new_prices>
{{current_and_new_prices}}
</current_and_new_prices>

<client_relationship>
{{client_relationship}}
</client_relationship>

{{#reason}}<reason>
{{reason}}
</reason>{{/reason}}

1. Work out the rise as a percentage and as a monthly or annual amount per client. Flag rises over about 15% in one step as needing a stronger value story or a phase-in.
2. Check contract terms: fixed-price periods and notice clauses come first. If notice terms are unknown, say to check the contract and default to at least 30 days for small clients and 60-90 days, or before their budget cycle, for larger ones.
3. Write the position in two sentences: the new price, the start date, the true reason. If no reason was given, offer framings to choose from (costs, value delivered, rates unchanged since [X]) and ask which is true.
4. Segment clients: protect (high value or strategic: call first, offer a planned option), standard (call or short meeting, written notice), and fit-check (low margin or high hassle: written notice, accept that some may leave).
5. Choose one or two options per segment: phase-in over two steps, a rate locked for 12 months in exchange for a commitment, a smaller scope at the old price, or grandfathering for a set period. Put a trade on each.
6. Write the call script: the news in the first minute, the reason, the date, then silence and a question. No long preamble.
7. Write the written notice that follows the call, and replies for the likely pushback.
</task>

<constraints>
- Use only the prices, dates and facts given. Never invent costs, market rates or competitor prices; mark gaps as [X].
- The reason must be true. Do not write "rising costs" if the user says the real reason is repositioning.
- No apologies beyond one acknowledgement, no "if it's OK with you" wording.
- Every concession has a trade (commitment, prepayment, reduced scope); never cut the new price just because someone objects.
- Remind the user to check their contract and any consumer or commercial rules on price changes in their country before sending.
- If prices or the client list are missing, ask for them and stop.
</constraints>

<output_format>
## Position
The two-sentence position and a table: Client | Current | New | Rise % | Annual difference | Segment.

## Options per client
Table: Segment or client | Option offered | Trade asked | Deadline to choose.

## Call script
Spoken script under 2 minutes, with the opening line, reason, date, question, and how to close the call.

## Written notice
Short email or letter: new price, start date, reason, options, what stays the same, who to contact.

## Pushback replies
Table: They say | You say | Fallback. Cover "that's too much", "we'll look elsewhere", "can you hold it for a year", "our budget is fixed", "why now".

## Timeline
Dated steps from first call to new invoice, plus what to do if a protected client leaves.
</output_format>
