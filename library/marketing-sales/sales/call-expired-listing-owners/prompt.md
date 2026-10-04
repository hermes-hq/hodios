---
schema: 1
id: call-expired-listing-owners
kind: prompt
title: Call expired listing owners
description: Prepares a real estate agent to contact an owner whose listing expired, with contact-rule checks, research, a respectful opener, questions on price, marketing and access, and a follow-up letter.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [checklist, script, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [expired-listings, seller-prospecting, do-not-call, listing-diagnosis, estate-agent]
pairs_with:
  prompts: [write-listing-presentation, write-prospect-voicemails, practise-viewing-objections]
  personas: [real-estate-agent]
args:
  - name: listing_history
    description: What you know about the expired listing - address or area, property type, original and reduced prices, days on market, the previous agent's photos and description quality, viewing access notes, and nearby comparable sales you have. Rough notes are fine.
    type: text
    required: true
  - name: agent_differentiators
    description: What you would do differently and can prove - recent sales nearby, marketing you include, how you handle viewings and feedback, your fee structure. Only true claims.
    type: text
    required: true
  - name: channel
    description: How you will make first contact.
    type: enum
    enum: [phone, letter, door]
    default: phone
  - name: country
    description: Country or state where the property is, so contact rules can be named for checking.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you contact, Research checklist, First contact, Diagnostic questions, Follow-up letter, What not to say]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a real estate agent approach an owner whose listing has just expired without selling. These owners are often frustrated, tired of agents, and getting many calls on the same day. Agents fail when they open with a pitch, blame the previous agent, promise a higher price to win the instruction, or ignore contact rules. What works is checking you are allowed to contact them, doing homework first, acknowledging the frustration in one line, and asking questions that help the owner see why it did not sell (price against comparables, presentation, marketing reach, access for viewings, feedback handling), before offering a meeting.

Channel: {{channel}}
Country or state: {{country}}
</context>

<task>
<listing_history>
{{listing_history}}
</listing_history>

<agent_differentiators>
{{agent_differentiators}}
</agent_differentiators>

1. Before you contact: list the checks to run for {{country}}: national or state do-not-call registers, calling hours, rules on contacting owners still under contract with another agent (confirm the agreement has actually ended, including any exclusivity or tail period), letter and door-knock rules, data protection for any owner data used, and the agent's regulator or association code. Name these as things to verify, not as settled law.
2. Research checklist: price history, days on market, photo and description quality, comparable sales and current competition, likely reasons it did not sell (rank price, presentation, marketing, access, condition), and what the owner may still need (timing, onward move).
3. First contact for the chosen channel: a respectful opener that names why you are getting in touch, acknowledges it has been frustrating without criticising the previous agent, and asks permission to ask a few questions. Phone: under 20 seconds. Door: shorter, with an easy exit. Letter: see the follow-up letter.
4. Diagnostic questions: six to eight open questions about their goals, timing, what feedback they got, viewings and access, the price advice they were given and how they feel about it, and what they would want done differently.
5. Moving to a meeting: how to propose a no-obligation valuation visit with two time options, and a polite exit if they say no.
6. Follow-up letter or note: under 200 words, specific to this property, offering one useful insight from the research.
7. What not to say.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the agent to contact an owner who is on a do-not-call list, has opted out, or may still be under an agreement with another agent; say to check first.
- Never promise or hint at a sale price to win the instruction. Pricing comes from comparables at a valuation visit.
- No criticism of the previous agent by name; describe what could change instead.
- Use only the differentiators given; do not invent sales records or results. Missing proof is [X].
- Fair housing and equal treatment: nothing about the type of buyer or neighbourhood residents.
- If the listing history or country is missing, ask for it and stop.
</constraints>

<output_format>
## Before you contact
Checklist of rules to verify for the country, each as a checkbox.

## Research checklist
Table: Item | What to look for | What you found (from the notes, or [X]).

## First contact
The script or door approach for the chosen channel.

## Diagnostic questions
Numbered questions with the follow-up to listen for.

## Follow-up letter
The letter, ready to adapt.

## What not to say
Five bullets with a better alternative for each.
</output_format>
