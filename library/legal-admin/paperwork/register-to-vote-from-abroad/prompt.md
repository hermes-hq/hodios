---
schema: 1
id: register-to-vote-from-abroad
kind: prompt
title: Register to vote from abroad
description: Plans how a citizen living abroad registers to vote and casts a ballot - eligibility, registration address, postal, proxy, embassy or online voting, deadlines and what to check before each election.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
subject: [law, public-sector]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [overseas-voting, voter-registration, postal-vote, proxy-vote, citizens-abroad]
pairs_with:
  prompts: [check-dual-citizenship-impact, renew-passport-or-id-card, organize-important-documents]
args:
  - name: citizenship
    description: The country whose elections you want to vote in. Dual nationals name the one that matters here.
    type: string
    required: true
  - name: living_in
    description: Where you live now, since when, and your last address in your home country (city or region only).
    type: string
    required: true
  - name: election
    description: The election you want to vote in and its date, if known, for example "next national election" or "state primary in March". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Eligibility, Registration, Ways to vote, Timeline, Confirm with the election authority]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Countries treat citizens abroad very differently. Some let them vote indefinitely, some only for a number of years after leaving, and some not at all for certain elections (local or regional elections often require residence). Registration is usually tied to a last home address or a special overseas constituency, and must often be renewed periodically. Voting methods vary: postal ballots (which can arrive too late from distant countries), proxy votes cast by someone at home, in-person voting at an embassy or consulate, and in a few countries online voting. US citizens abroad use a combined registration and absentee ballot request through their last state of residence, with electronic ballot delivery widely available. The usual failures: registering too late, a postal ballot that cannot make the round trip in time, an expired registration, and lookalike sites collecting personal data.

Citizenship: {{citizenship}}
Living in: {{living_in}}
{{#election}}Election: {{election}}{{/election}}
</context>

<task>
1. Eligibility: whether citizens of {{citizenship}} abroad can typically vote in this election type, any time limit since leaving, and which elections usually need residence, all marked verify.
2. Registration: where and how overseas voters usually register (online portal, consulate, overseas register, last home address), documents needed, renewal frequency, and how to check whether you are already registered.
3. Ways to vote: compare postal, proxy, embassy or consulate, and online voting where offered, with the risks of each from {{living_in}} (postal times, consulate distance) and a recommendation.
4. Timeline: working back from the election date if given, the registration deadline, ballot or proxy application deadline, and when to send, all marked verify.
5. Confirm with the election authority: questions to ask, and how to find the official site.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state eligibility rules, deadlines or methods as fact for a country; mark them verify on the official election authority site.
- Point only to official election authority or government channels and warn about lookalike sites.
- Do not advise on voting in an election the user is not entitled to vote in, voting twice (for example in two countries in the same election where that is not allowed), or voting for someone else except through a lawful proxy.
- Stay neutral; do not discuss parties or candidates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Eligibility
Short paragraph, marked verify.

## Registration
Numbered steps.

## Ways to vote
Table: method | how | risk from where you live | recommended?

## Timeline
Dated or relative list.

## Confirm with the election authority
Numbered questions.
</output_format>
