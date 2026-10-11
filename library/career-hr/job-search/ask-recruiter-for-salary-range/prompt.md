---
schema: 1
id: ask-recruiter-for-salary-range
kind: prompt
title: Ask a recruiter for the salary range
description: Writes how to ask a recruiter or employer for the pay range before investing in interviews, by message or on a call, without naming your own number first.
category: job-search
version: 1.0.0
status: incubating
stage: [discover]
role: [job-seeker]
requires: [none]
inputs: [text, message]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [salary-range, pay-transparency, compensation, recruiter-questions, anchoring]
pairs_with:
  prompts: [answer-salary-expectations, reply-to-recruiter, prepare-phone-screen]
args:
  - name: situation
    description: The role and company, how the contact started (they approached you, you applied, agency recruiter), what stage you are at, and anything said about pay so far.
    type: text
    required: true
  - name: location
    description: Country and state or region of the role, since some places require employers to share pay ranges.
    type: string
    required: true
  - name: your_floor
    description: Optional - your private minimum, used only to plan what to do with their answer. It will not be put in the message.
    type: string
output_contract:
  format: markdown
  sections: [When to ask, Message, Call script, If they ask you first, What to do with the answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a compensation-savvy recruiter. Asking for the range early is normal and saves both sides time: recruiters have an approved band for the role and usually share it when asked plainly. The person who names a number first tends to anchor the negotiation, so the candidate's aim is to hear the employer's range before giving one. A growing number of places require pay ranges in job postings or on request (several US states and cities, and EU member states as they implement the EU pay transparency rules), but the details differ and change, so treat this as something to check, not to cite as law in the message. Agency recruiters may know the client's budget better than the posting does. Asking politely, early, and with a reason ("to make sure we are aligned before taking up your team's time") rarely harms a candidate.

<situation>
{{situation}}
</situation>
Location: {{location}}
{{#your_floor}}Private floor (not for the message): {{your_floor}}{{/your_floor}}
</context>

<task>
1. When to ask: say whether now is a good moment given the stage (best before or at the first screen; before a take-home task or a long interview loop at the latest), and whether to ask in writing or on the call.
2. Message: a short written ask (under 80 words) that shows interest, asks for the budgeted range for the role, and gives a time-saving reason. Provide a variant for an agency recruiter (asking for the client's range and whether it is base or total pay).
3. Call script: four to six lines for asking on a screening call, including what to say if the recruiter is vague ("it depends on experience"): ask for the band's bottom and top for the level they are considering.
4. If they ask you first: two or three deflecting lines that return the question politely, and a fallback if they insist: a researched range for the role, not the current salary, labelled to verify with market data. If local rules restrict employers asking about salary history, say to check this for {{location}} rather than stating the law.
5. What to do with the answer: how to read base versus total compensation, how to respond if the range is above, inside or below the needs (using the private floor if given, without revealing it), and whether to continue, ask about flexibility, or withdraw politely.
</task>

<constraints>
- Never put the private floor or current salary in any message.
- Do not invent salary data or benchmarks. If a researched range is needed, say how to get one.
- Do not state pay transparency or salary-history law as fact in the messages; mention it only as something the user can check.
- Keep the tone curious and cooperative, not confrontational.
</constraints>

<output_format>
## When to ask
## Message
Direct employer version and agency version.
## Call script
## If they ask you first
## What to do with the answer
Table: Their range is | Do this.
</output_format>
