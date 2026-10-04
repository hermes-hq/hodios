---
schema: 1
id: screen-freelance-inquiry
kind: prompt
title: Screen a freelance inquiry
description: Screens a new client inquiry for a freelancer on fit, budget signals, scope clarity and red flags, decides take, qualify or decline, and writes the reply with qualifying questions or a referral.
category: sales
version: 1.0.0
status: incubating
stage: [discover]
role: [consultant, designer, writer]
requires: [none]
inputs: [message, text]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [freelancing, lead-screening, red-flags, scope-clarity, client-fit, decline-politely]
pairs_with:
  prompts: [reply-to-inbound-lead, qualify-leads, write-sales-proposal]
  workflows: [land-first-clients-track]
  personas: [small-business-selling-mentor]
args:
  - name: inquiry
    description: The inquiry as received - email, form submission or DM - pasted in full, plus anything you know about the sender (referral, found you via your site, a platform).
    type: text
    required: true
  - name: services_and_rates
    description: What you do and do not do, your minimum project size or day rate, typical project prices, the clients you work best with, and your hard no's.
    type: text
    required: true
  - name: capacity
    description: When you could start and how much room you have (for example "booked until March, one small slot in January").
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Verdict, Signals, Reply, If they answer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelance designer, writer, developer, photographer or consultant decide what to do with a new inquiry before spending an hour on a proposal. Freelancers lose most time on inquiries that were never going to fit: the budget is a fraction of the minimum, the scope is "a quick logo plus a website plus social", the deadline is next week, or the client wants free work as a "test". They also lose good clients by replying slowly or sounding defensive. A good screen weighs the evidence in the message, does not assume the worst from one awkward phrase, and turns uncertainty into two or three precise questions.

Capacity: {{capacity}}
</context>

<task>
<inquiry>
{{inquiry}}
</inquiry>

<services_and_rates>
{{services_and_rates}}
</services_and_rates>

1. Read the inquiry for: what they need, why now, deadline, budget or budget signals (company size, "tight budget", "exposure", mentions of past agencies), decision maker, and how they found you.
2. Rate four signals green, amber or red with the quoted words behind each: service fit, budget fit against the stated minimum, scope clarity, and timing against capacity.
3. Check for red flags: unpaid test work or spec work, payment only on "results", vague scope with a fixed low price, a deadline that needs you to drop other clients, asking for full rights for a token fee, a pushy or disrespectful tone, a request that looks like a scam (overpayment, paying through a third party). One red flag is a question, not a verdict, unless it is unpaid spec work or a likely scam.
4. Decide: take (book a call), qualify (ask questions first), or decline (with a referral or resource if one fits). Give the reason in one sentence.
5. Write the reply in the freelancer's voice: thank them, show you read it (one specific detail), then either propose two call times, ask two or three qualifying questions (budget range offered as options is often easier to answer than "what's your budget?"), or decline kindly and briefly.
6. Plan what to do with likely answers.
</task>

<constraints>
- Base every signal on words in the inquiry; quote them. Do not guess company size or budget from a name.
- The reply is under 150 words, warm and confident, with no apology for having a minimum.
- Do not state rates the freelancer did not give; use [X] placeholders.
- Never encourage unpaid test work; suggest a small paid first step instead when trust is the issue.
- If the inquiry is missing or the services and rates are blank, ask for them and stop.
</constraints>

<output_format>
## Verdict
Take, qualify or decline, with the one-sentence reason.

## Signals
Table: Signal | Rating (green, amber, red) | Evidence (quoted). Then red flags as bullets, or "None found".

## Reply
The message, ready to send.

## If they answer
Bullets: likely answers and the next move for each (book call, send proposal, decline, refer).
</output_format>
