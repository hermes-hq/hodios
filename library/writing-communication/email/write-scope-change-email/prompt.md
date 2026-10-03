---
schema: 1
id: write-scope-change-email
kind: prompt
title: Write a scope change email
description: Tells a client that a request is outside the agreed scope without friction, and offers options (a paid change, a swap or deferral) with cost and timeline. For freelancers, agencies and consultants.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, project-manager, founder, designer]
requires: [none]
inputs: [text, message, document]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [scope-creep, change-request, client-management, freelancing, agency]
pairs_with:
  prompts: [write-negotiation-email, decline-request-gracefully, write-project-proposal]
args:
  - name: original_scope
    description: What was agreed, ideally copied from the proposal, statement of work or contract, including deliverables, revision rounds, exclusions and the timeline.
    type: text
    required: true
  - name: new_request
    description: What the client is now asking for, in their words if possible.
    type: text
    required: true
  - name: rates_or_costs
    description: Your rate, an estimate of the extra effort, or the price of the change, and the timeline impact if you know it.
    type: text
output_contract:
  format: markdown
  sections: [Scope check, Email, Change summary, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most scope creep is not bad faith: clients do not remember the statement of work, and each request feels small. Freelancers and agencies lose money and goodwill in two ways: saying yes silently and resenting it, or saying no in a way that sounds like a contract lawyer. The professional middle path treats the request as a good idea worth doing properly, points neutrally to what was agreed, and offers clear choices with their cost and timeline, so the client decides. Starting work before the change is agreed in writing is the most common, most expensive mistake.
</context>

<task>
Write an email about this new request.

<original_scope>
{{original_scope}}
</original_scope>

<new_request>
{{new_request}}
</new_request>
{{#rates_or_costs}}
<rates_or_costs>
{{rates_or_costs}}
</rates_or_costs>
{{/rates_or_costs}}

1. Check the scope first. Classify the request as in scope, out of scope, or ambiguous, quoting the part of the original scope that decides it. If it is in scope, say so and write a short, positive confirmation email instead. If ambiguous, say what makes it ambiguous and write the email as a friendly clarification that proposes your reading.
2. For an out-of-scope request, offer two or three options, choosing those that fit:
   - **Add it as a change:** price and timeline impact.
   - **Swap it:** replace an agreed item of similar effort, named specifically.
   - **Defer it:** to a later phase or a follow-on project, with when.
   - **Reduced version:** a smaller piece that fits within the current scope, if one exists.
   Recommend one if the input suggests which is best for the client.
3. Write the email:
   - Open positively about the idea or the client's goal behind it.
   - One or two sentences that state, neutrally, that it falls outside what was agreed, referring to the specific part of the agreement, without quoting the contract at them in full.
   - The options, each in one or two lines with cost and timeline.
   - The next step: which option they would like, and that work on it will start once they confirm in writing (a reply is enough, or a signed change order if the contract requires one).
4. Write a change summary table the client can approve.
</task>

<constraints>
- Use only the costs and timings supplied. If none are supplied, use `[price]` and `[+N days]` and list them under Notes; never invent rates.
- Friendly, confident and brief: under about 200 words. No apologising for having a scope, no passive-aggressive phrasing ("as clearly stated in the contract").
- Do not threaten to stop work or cite legal terms unless the user asks.
- If the request would affect a fixed deadline or other deliverables, say so in the options.
</constraints>

<output_format>
## Scope check
Classification, the deciding part of the original scope, and one line of reasoning.
## Email
Subject line, then the email.
## Change summary
Table: Option · What is included · Cost · Timeline impact · Status (to approve).
## Notes
Bullets: placeholders to fill, and advice on recording the agreement. "None" if nothing.
</output_format>
