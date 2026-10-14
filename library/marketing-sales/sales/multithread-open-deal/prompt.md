---
schema: 1
id: multithread-open-deal
kind: prompt
title: Multithread an open deal
description: Plans how to reach more stakeholders on a single-threaded deal - who to approach, why each would care, the route in through your contact and the first message for each.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [notes, text]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [multithreading, stakeholder-mapping, enterprise-sales, deal-risk, champion-building, b2b-sales]
pairs_with:
  prompts: [map-buying-committee, inspect-deal-qualification, write-champion-forwardable-email, revive-stalled-deal]
args:
  - name: deal
    description: The deal so far - what you sell, the buyer's problem, the one contact you deal with (role, how engaged, what they have shared), stage, value, timeline, and anything you know about the wider organisation.
    type: text
    required: true
  - name: known_people
    description: Other people you know of at the account (names or roles from calls, email cc's, the org chart, LinkedIn) and any existing relationships your company has there. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why this deal is at risk, People to reach, Route in, Messages, Ask for your contact, Watch-outs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a seller widen a deal that depends on one person. B2B purchases above a modest size involve several people (users, the budget owner, IT or security, finance, procurement, sometimes legal), and a deal with one contact dies when that person leaves, loses the internal argument or simply cannot answer the questions others ask. Experienced sellers know that going around a contact without their blessing burns the relationship, so the best route is usually through them: give the contact a reason to bring others in that helps them look good ("so finance doesn't ambush you later"). Each new person needs their own reason to care, in their terms: finance cares about cost and payback, IT about security and integration effort, end users about daily friction, the executive about the business goal and risk.
</context>

<task>
<deal>
{{deal}}
</deal>

{{#known_people}}<known_people>
{{known_people}}
</known_people>{{/known_people}}

1. **Why this deal is at risk:** in two or three bullets, what single-threading means for this specific deal (who will block or delay it if not engaged, what questions the contact cannot answer alone).
2. **People to reach:** list the roles that likely matter for this purchase, marking which are known by name and which are inferred. For each: what they care about, what they will ask, and whether they are likely supporter, neutral or sceptic. Rank by importance to the decision.
3. **Route in:** for each person, the best path (introduced by the contact, joined to an existing meeting, through a peer from your side such as your executive or engineer, through an existing relationship) and the moment to do it.
4. **Messages:** a short first message for each of the top three people, under 90 words each, written in their terms and referencing how they were introduced. No product dumps.
5. **Ask for your contact:** a script for asking the contact to bring others in, framed around what helps them, plus how to respond if they resist ("I'll handle it internally").
6. **Watch-outs:** signs you are hurting the relationship, and what to do if the contact refuses all access (what that tells you about the deal).
</task>

<constraints>
- Do not invent names, titles or org structures. Mark inferred roles as "likely role, to confirm".
- Never suggest going around the contact secretly or using personal information found online beyond professional profiles.
- Keep messages short and specific; no generic "I'd love to connect" notes.
- If the deal notes do not say what the buyer is trying to fix, say that this must be clarified with the contact first and why.
</constraints>

<output_format>
## Why this deal is at risk
Bullets.

## People to reach
Table: Person or role | Known or inferred | Cares about | Will ask | Likely stance | Priority.

## Route in
Table: Person | Path | When.

## Messages
Labelled messages for the top three people.

## Ask for your contact
The script, then responses to two likely pushbacks.

## Watch-outs
Bullets.
</output_format>
