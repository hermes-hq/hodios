---
schema: 1
id: plan-account-based-outreach
kind: prompt
title: Plan account-based outreach
description: Plans a four to six week multi-contact, multi-channel outreach play for one named target account, with roles, a message per persona, sequencing across contacts and stop rules.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, marketer]
requires: [none]
inputs: [notes, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [abm, buying-committee, multi-threading, outbound, target-account]
pairs_with:
  prompts: [research-prospect-account, write-outbound-sequence, plan-social-selling]
  personas: [sales-coach]
args:
  - name: account
    description: The target account and what you know about it - industry, size, triggers, current tools or supplier, and any history with you (past deals, lost opportunities, existing contacts).
    type: text
    required: true
  - name: contacts
    description: The people or roles you can reach, with titles and anything known about each. Roles alone are fine if you do not have names yet.
    type: text
    required: true
  - name: offer
    description: What you sell, the problem it solves for each kind of role, typical deal size and proof.
    type: text
    required: true
  - name: weeks
    description: Length of the play in weeks, between 4 and 6.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Account thesis, Buying group, Messages by persona, Week-by-week play, Stop and switch rules, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design account-based plays for B2B sellers going after one high-value account. B2B purchases involve several people, so single-threaded outreach to one contact usually stalls: the person is busy, leaves, or lacks authority. A good play reaches three to six people across the buying group with one shared account thesis and a different angle per role: the economic buyer cares about outcomes and risk, the operational owner about workload and process, the user about daily friction, and technical or finance reviewers about fit and cost.

The common mistakes: sending the same message to everyone at once (which looks like spam and gets forwarded internally with a sigh), pitching the executive first with nothing to say, ignoring what the account has already said publicly, and running the play with no stop rule. Coordinate timing so contacts hear consistent stories within days of each other, starting with the people closest to the pain.
</context>

<task>
Plan a {{weeks}}-week account-based outreach play.

<account>
{{account}}
</account>

<contacts>
{{contacts}}
</contacts>

<offer>
{{offer}}
</offer>

1. Write the account thesis in two or three sentences: why this account, why now, and the business problem you will lead with. Label inferences as hypotheses.
2. Map the buying group: each contact or role, their likely priority, their role in a decision (economic buyer, champion candidate, user, technical or finance reviewer, potential blocker), and the entry order.
3. Write one core message per persona: the angle, a 60 to 100 word email, and a LinkedIn or phone variant.
4. Lay out the week-by-week play: which contact gets which touch on which channel, how touches reference each other ("I've also shared this with your ops team" only when true), and any useful asset (a short benchmark, an audit offer, an event invite).
5. Set stop and switch rules: what reply or silence ends the play, what to do on a referral to someone else, and when to pause the account and set a revisit date.
6. Define three measures for the play (for example contacts engaged, meetings set, opportunity created).
</task>

<constraints>
- Use only the facts given about the account and contacts; never invent names, tools, budgets or events.
- No more than two touches per contact per week, and never contact the same person on three channels on the same day.
- Do not suggest gifts above modest business norms or anything that could breach the account's gift or anti-bribery policies; for public sector and regulated buyers, suggest no gifts.
- Do not claim internal referrals ("your CFO asked me to reach out") that have not happened.
- Note that consent rules for cold email vary by country and the user should check them.
</constraints>

<output_format>
## Account thesis
Two or three sentences.

## Buying group
Table: Contact or role | Likely priority | Decision role | Entry order.

## Messages by persona
For each persona: angle, email, and a channel variant.

## Week-by-week play
Table: Week | Day | Contact | Channel | Touch.

## Stop and switch rules
Bullets.

## Measures
Three measures with a target or a note on how to judge them.
</output_format>
