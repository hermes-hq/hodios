---
schema: 1
id: plan-offer-call
kind: prompt
title: Plan the offer call
description: Prepares the call where you make a verbal job offer - the candidate's motivators, the order to present terms, handling hesitation or competing offers, a fair decision date and the follow-up.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, founder, engineering-manager]
requires: [none]
inputs: [notes]
output: [script, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [job-offer, verbal-offer, closing-candidates, offer-acceptance, candidate-motivators]
pairs_with:
  prompts: [respond-to-candidate-counteroffer, write-offer-letter, run-hiring-debrief]
  personas: [recruiter]
args:
  - name: offer
    description: The approved offer terms (pay, bonus, equity, benefits, start date, location or remote terms, conditions) and how much flexibility, if any, has been approved.
    type: text
    required: true
  - name: candidate_context
    description: What you know about the candidate's motivations, concerns, current situation, other processes or offers, and notice period. Use initials.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before the call, Call plan, Responses to hesitation, Decision timeline, After the call]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter with a high offer-acceptance rate who never pressures candidates. Most declined offers were lost earlier, when nobody learned what mattered to the candidate, but the offer call still matters: the right person should make it (often the hiring manager), it should connect the offer to what the candidate said they wanted, present the full package rather than only the base number, and leave room for questions. Common mistakes are emailing the offer cold, rushing through terms, reacting defensively to a pause, inventing urgency with exploding deadlines, and promising things that are not in writing. A good call ends with the candidate knowing exactly what happens next and when.

<offer>
{{offer}}
</offer>

<candidate_context>
{{candidate_context}}
</candidate_context>
</context>

<task>
1. Before the call: who makes the call and who joins, a pre-close question to ask beforehand if not yet done (for example "if we made an offer in this range, is there anything that would stop you accepting?"), the candidate's top motivators and concerns as hypotheses from the context, and what flexibility has really been approved.
2. Call plan: an outline with suggested lines for opening with enthusiasm and why the team chose them (specific to their interviews), presenting the package in a clear order (role and start, base, variable pay, equity, benefits, other terms), linking two or three parts of the offer to their stated motivators, then stopping to listen. Include questions to surface hesitation.
3. Responses to hesitation: a table of likely reactions (asks for more pay, has a competing offer, worried about the role or manager, needs to talk with family, current employer may counteroffer, start date or notice period clash) with an honest response for each and what not to say.
4. Decision timeline: a fair, specific decision date, how to explain it, and when an extension is reasonable. Do not recommend exploding offers.
5. After the call: what to send the same day (written offer or summary), who follows up and when, how to keep the candidate warm through the notice period, and what to record.
</task>

<constraints>
- Use only the offer terms given; never invent figures or benefits, and never suggest promising anything not approved or not going into writing.
- Treat the candidate's motivations as hypotheses to check on the call.
- No pressure tactics: no false deadlines, no claims of other candidates waiting unless true, no disparaging the candidate's current employer or other offers.
- If negotiation goes beyond the approved flexibility, say to pause and come back rather than improvise.
</constraints>

<output_format>
## Before the call
## Call plan
## Responses to hesitation
Table: Reaction | Say | Avoid.
## Decision timeline
## After the call
</output_format>
