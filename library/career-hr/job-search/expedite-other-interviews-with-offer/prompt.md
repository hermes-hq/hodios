---
schema: 1
id: expedite-other-interviews-with-offer
kind: prompt
title: Expedite other interviews with an offer
description: Writes messages telling the other companies you are interviewing with that you hold an offer, so they can speed up, with what to share and how to avoid bluffing or burning bridges.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [text]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [competing-offers, expedite, offer-deadline, hiring-timeline, leverage]
pairs_with:
  prompts: [ask-for-offer-deadline-extension, follow-up-on-job-application, evaluate-job-offer]
args:
  - name: offer_in_hand
    description: The offer you have - company (kept private if you prefer), role, deadline, and whether it is verbal or written.
    type: text
    required: true
  - name: other_processes
    description: Each other company you are interviewing with - role, stage reached, who your contact is, last contact date, and how much you would prefer it over the offer in hand.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to tell, Messages, What to share and not share, Reading their response, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has received many "I have an offer" messages. Telling other companies about a real offer is normal and expected: it often moves a candidate to the top of the pile, and recruiters prefer knowing to losing a candidate without warning. It works when it is factual, polite, gives the deadline, and restates genuine interest in that company. It backfires when it is a bluff (offers that do not exist get exposed when a recruiter asks for details), when it is sent to companies at the very first stage where an accelerated process is unlikely, when the candidate reveals the competing salary without meaning to anchor, or when it reads as an ultimatum. Some processes cannot speed up (fixed panels, public-sector boards), and the candidate should know that before relying on them.

<offer_in_hand>
{{offer_in_hand}}
</offer_in_hand>
<other_processes>
{{other_processes}}
</other_processes>
</context>

<task>
1. Who to tell: rank the other processes by preference and stage. Recommend telling those the candidate would genuinely prefer or seriously consider, at a stage where speeding up is realistic. Say who to skip and why (very early stage, low interest, process known to be fixed).
2. Messages: for each company to tell, a short message (under 110 words) to the right contact: genuine interest in this role, the fact of an offer with its deadline, a question about whether they can share their timeline or move faster, and appreciation. Adjust for stage (an earlier stage asks whether an accelerated process is possible; a final stage asks about decision timing).
3. What to share and not share: by default share that there is an offer and the deadline; do not share the other company's name, and share the salary only if the candidate deliberately decides to (explain the trade-off: it can anchor an offer upwards, or set a ceiling if it is low). Say what to answer if asked "who is the offer from?" or "what is the number?".
4. Reading their response: what to do if they speed up, if they say they cannot, or if they go quiet.
5. Timeline: a short day-by-day plan up to the offer deadline, including when to ask the offering company for an extension if the others need a few more days.
</task>

<constraints>
- Only use a real offer. If the input suggests the offer is not real or not yet made (for example a final interview only), say so and adjust the message to describe the real situation honestly ("I am at final stage elsewhere and expect a decision by [date]").
- No ultimatums or pressure language.
- Do not reveal the offering company's name or pay unless the user chooses to.
- Use [Name] placeholders for unknown names.
</constraints>

<output_format>
## Who to tell
Table: Company | Stage | Preference | Tell? | Why.
## Messages
One message per company to tell, ready to send.
## What to share and not share
Includes lines for being asked the company name or number.
## Reading their response
## Timeline
</output_format>
