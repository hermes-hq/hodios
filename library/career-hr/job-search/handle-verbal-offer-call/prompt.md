---
schema: 1
id: handle-verbal-offer-call
kind: prompt
title: Handle a verbal offer call
description: Prepares a candidate for the recruiter's call with a verbal job offer - what to say, what not to accept on the spot, what to ask, and what to get in writing before deciding.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [text, preferences]
output: [script, checklist, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [job-offer, verbal-offer, offer-call, buy-time, written-offer]
pairs_with:
  prompts: [negotiate-job-offer, evaluate-job-offer, accept-job-offer-in-writing]
args:
  - name: situation
    description: The role and company, when the call is (or what was already said if it happened), what you know about pay and terms so far, and any other processes or offers you have.
    type: text
    required: true
  - name: priorities
    description: Optional - what matters most in the offer (base pay, bonus, equity, remote work, start date, title, leave) and anything you would want to negotiate.
    type: text
output_contract:
  format: markdown
  sections: [Your aim for the call, Opening response, Questions to ask, What not to say yet, Closing the call, If they push for an answer, Right after the call]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has made hundreds of offer calls. The verbal offer is a key moment: excited candidates often say "yes" on the spot, which removes their leverage before they have seen the full terms, or they react to the number with visible disappointment and start negotiating without the details. The best response is warm enthusiasm for the role, careful listening, a few clarifying questions, a request for the offer in writing, and an agreed date to respond. Asking for a day or several days to review is normal and almost never puts an offer at risk. Details that are often missing from verbal offers: whether pay is base or total, bonus mechanics, equity terms, start date, probation, benefits start dates and remote-work rules.

<situation>
{{situation}}
</situation>
{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}
</context>

<task>
1. Your aim for the call: in two lines, what a good outcome is (understand the offer fully, show enthusiasm, get it in writing, agree a decision date) and what to avoid (accepting, rejecting or negotiating hard live).
2. Opening response: two or three natural lines to say right after hearing the offer, thanking them and showing genuine interest without accepting.
3. Questions to ask: a short list, ordered by importance for this situation: base salary and pay frequency, bonus or commission and how it is decided, equity or other long-term pay, start date, title and level, benefits, leave, remote or office rules, probation, and when the written offer will arrive. Mark the ones that matter most given the priorities.
4. What not to say yet: avoid accepting, naming a counter number before seeing the full package, revealing a private minimum, or committing to a start date; give one line for each that the candidate can use instead.
5. Closing the call: wording that asks for the full offer in writing and agrees a response date (for example two to five working days), and, if the candidate plans to negotiate, flags gently that they may have a few questions after reviewing it.
6. If they push for an answer: polite lines to hold the line, and how to read a very short deadline (often a pressure tactic, sometimes a real constraint) without assuming bad faith.
7. Right after the call: write down everything said, send a short thank-you email confirming the agreed next steps and date, and tell other companies in process if there is a deadline.
</task>

<constraints>
- Do not invent market pay data or say whether the offer is good or bad; that needs the written terms and the candidate's research.
- Do not script bluffing (pretend offers, fake deadlines).
- Keep the lines natural and short enough to say aloud.
- If the call has already happened and the candidate said yes, say how to still ask for the written offer and clarify terms without retracting, and note that negotiation is harder but questions are still fine.
</constraints>

<output_format>
## Your aim for the call
## Opening response
## Questions to ask
Checklist, most important first.
## What not to say yet
Table: Avoid | Say instead.
## Closing the call
## If they push for an answer
## Right after the call
Includes a short confirmation email.
</output_format>
