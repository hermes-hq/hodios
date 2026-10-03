---
schema: 1
id: respond-to-candidate-counteroffer
kind: prompt
title: Respond to a candidate's counteroffer
description: Plans the employer's reply when a candidate negotiates or has a competing offer - the real room available, trades to offer, internal equity checks and the message. Use before answering the candidate.
category: hiring
version: 1.0.0
status: incubating
stage: [plan, build]
role: [recruiter, manager, founder, engineering-manager]
requires: [none]
inputs: [message, text]
output: [plan, message, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [offer-negotiation, competing-offer, compensation, closing-candidates, pay-equity]
pairs_with:
  prompts: [write-offer-letter, run-hiring-debrief, write-candidate-rejection]
  personas: [recruiter, hr-business-partner]
args:
  - name: candidate_ask
    description: What the candidate asked for or told you - the counter amount, the competing offer and its terms if shared, other asks (title, start date, remote, equity), and how they said it.
    type: text
    required: true
  - name: budget_range
    description: Your approved range for the role, the current offer, the most you could go to and who approves going above it, and the pay of comparable people on the team if you can share it.
    type: text
    required: true
  - name: non_cash_options
    description: Other things you can offer - signing bonus, equity, start date, title, remote or flexible work, extra leave, learning budget, an early pay review. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Read of the situation, Room to move, Options, Recommended response, Message, Call script, If they still decline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise hiring managers and recruiters on closing offers. A counteroffer from a candidate is usually a good sign: people negotiate offers they want to accept. The aim is a yes that the candidate feels good about, at a package the company can sustain without creating pay inequity on the team. Common mistakes include matching a competing number without checking internal equity; answering by email with a bare number; making it a contest of wills; overpaying a candidate whose real concern is something else (scope, flexibility, start date); and making exploding or misleading claims. Packages are solved by understanding what the candidate values most, then trading across cash, timing and terms.

<candidate_ask>
{{candidate_ask}}
</candidate_ask>

<budget_range>
{{budget_range}}
</budget_range>
{{#non_cash_options}}
<non_cash_options>
{{non_cash_options}}
</non_cash_options>
{{/non_cash_options}}
</context>

<task>
1. Read of the situation: what the candidate most likely values, based on what they said; how firm the ask seems; whether the competing offer is comparable (base pay versus total compensation, equity value, level, risk); and what you still need to learn from them before deciding.
2. Room to move: the gap between the current offer and the ask, what the approved range allows, and the internal equity check. Compare the proposed figure with peers at the same level and performance, and flag any case where paying it would put the new hire above stronger or longer-tenured colleagues. Say what approvals would be needed. Use only the figures given; mark missing ones as [X].
3. Options: three to four packages, from holding firm to stretching. For each, give the elements (base pay, signing bonus, equity, start date, title, flexibility, an early review), the total first-year cost, the equity risk, and how well it answers what the candidate values.
4. Recommended response: pick one option and explain why. Set a walk-away point you will not exceed, and say what you will ask in return (for example, a decision by a date, or withdrawing from other processes).
5. Message: a short written reply (under 150 words) that thanks them, restates their enthusiasm, presents the revised offer or the reasoning for holding, and proposes a call. Lead with the phone call where possible; never negotiate the details over email alone.
6. Call script: an opening, questions to understand their priorities, how to present the package, and answers to likely pushback ("the other offer is higher", "I need more time", "can you do the title too?").
7. If they still decline: how to close gracefully, keep the relationship, and decide whether to move to the next candidate.
</task>

<constraints>
- Never advise false statements to the candidate, such as an invented budget cap, made-up competing candidates, or pressure deadlines that are not real.
- Do not suggest asking for or basing pay on salary history where that is banned; note that salary-history and pay-transparency rules vary by location.
- Keep the internal equity check in every option, and flag discriminatory patterns (for example, offering less to candidates who negotiate less).
- Use only the numbers given; do not invent market data. If market data would change the answer, say what to look up.
</constraints>

<output_format>
## Read of the situation
## Room to move
## Options
Table: Option | Package | First-year cost | Equity risk | Fit with what they value.
## Recommended response
## Message
## Call script
## If they still decline
</output_format>
