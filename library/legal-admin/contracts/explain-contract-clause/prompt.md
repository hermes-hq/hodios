---
schema: 1
id: explain-contract-clause
kind: prompt
title: Explain a contract clause
description: Explains one contract clause such as an indemnity, liability cap, non-compete or auto-renewal in plain language, shows how it plays out in real scenarios and lists what to ask about it.
category: contracts
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual, founder, consultant, job-seeker]
subject: [law]
requires: [none]
inputs: [text]
output: [explanation, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [plain-language, indemnity, limitation-of-liability, auto-renewal]
pairs_with:
  prompts: [summarize-contract, compare-contract-versions, review-consumer-terms]
  personas: [legal-information-guide]
args:
  - name: clause
    description: The exact clause text, copied word for word, including its number. Add any definitions it relies on (capitalised terms) if you can find them.
    type: text
    required: true
  - name: context
    description: What the contract is (freelance deal, SaaS subscription, job, lease), which party you are, and what worries you about the clause. Optional but makes the explanation far more useful.
    type: text
output_contract:
  format: markdown
  sections: [In plain words, How it works, How it could play out, What is typical, What to ask, When to get a lawyer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain contract clauses to people who are not lawyers, one clause at a time, so they understand what they are agreeing to before they sign or when something goes wrong. Clause language is dense on purpose: one sentence of an indemnity can carry more risk than the rest of the contract. A good explanation translates the words, shows the mechanism (who must do what, when it is triggered, how much is at stake, how long it lasts), and walks through concrete scenarios so the reader can see it working for and against them.
</context>

<task>
Clause:

<clause>
{{clause}}
</clause>
{{#context}}

Context:

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Name the type of clause (indemnity, limitation of liability, non-compete, non-solicitation, auto-renewal, termination, confidentiality, IP assignment, exclusivity, governing law, arbitration, warranty, force majeure, or other). If it combines several, name each part.
2. Rewrite it in plain words, sentence by sentence, keeping every condition and exception. Point out capitalised defined terms whose definition you do not have and how the meaning could change depending on it.
3. Explain the mechanism: who owes what to whom, what triggers it, how much (caps, carve-outs, uncapped items), how long it lasts, how notice works, and whether it is one-way or mutual.
4. Walk through two or three short, concrete scenarios relevant to the context: one where it does not matter, one where it starts to bite, and one worst realistic case. Use plausible numbers labelled as illustrative.
5. Say how this clause compares with what is commonly seen in this kind of contract, in general terms (for example "liability caps are commonly tied to fees paid over a period"; "mutual indemnities are common in B2B deals"). Mark this as general practice that varies by industry and jurisdiction, not a rule.
6. List the questions to ask the other party and, where useful, a narrower alternative wording the reader could propose.
7. Say when this clause justifies paying for a lawyer's review.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain only what the text says and how it could operate. Do not say whether it is enforceable, whether to sign, or how a court would rule; enforceability depends on the jurisdiction and facts.
- Do not add conditions, caps or exceptions that are not in the text, and do not drop any that are. If the clause is ambiguous, show the two readings.
- If no context is given, explain from both sides briefly and ask which party the reader is.
- Use plain words; define any legal term you must use the first time.
{{> output/uncertainty}}
</constraints>

<output_format>
## In plain words
The clause rewritten in plain language, keeping every condition.

## How it works
Bullets: who, what, trigger, amount, duration, one-way or mutual.

## How it could play out
Two or three numbered scenarios, each three to five lines.

## What is typical
Two to four bullets, marked as general practice.

## What to ask
Numbered questions, plus an alternative wording if useful.

## When to get a lawyer
One or two sentences.
</output_format>
