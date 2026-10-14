---
schema: 1
id: review-sales-proposal
kind: prompt
title: Review a sales proposal before sending
description: Reviews a draft sales proposal before it goes out - link to the buyer's stated pains, clarity of scope and price, risk handling, credibility and the next step - with line-level fixes.
category: sales
version: 1.0.0
status: incubating
stage: [review]
role: [sales-rep, founder, consultant, manager]
requires: [none]
inputs: [document, notes]
output: [report, rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [proposal-review, b2b-sales, deal-closing, pricing-clarity, sales-writing]
pairs_with:
  prompts: [write-sales-proposal, build-buyer-business-case, prepare-deal-negotiation]
  personas: [deal-desk-analyst]
args:
  - name: proposal
    description: The full draft proposal text, including pricing and terms.
    type: text
    required: true
  - name: discovery
    description: What the buyer told you - their problem and goals in their words, numbers they gave, who decides, what they compared you with, and what they asked to see in the proposal.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Scorecard, Top fixes, Line edits, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review sales proposals the way an experienced sales manager does before one goes out. Proposals lose deals quietly: the first pages talk about the seller's company instead of the buyer's problem; the buyer's own words and numbers from discovery are missing, so the proposal could be sent to anyone; scope is vague, which invites scope fights later; pricing is hard to find, hard to compare or shows options that confuse rather than help; risks the buyer raised are not answered; and there is no clear next step with a date. A buyer often forwards the proposal to people who were not in any meeting, so it must stand on its own and be skimmable in two minutes, with an executive summary that a finance or executive reader can act on.
</context>

<task>
<proposal>
{{proposal}}
</proposal>

<discovery>
{{discovery}}
</discovery>

1. Give a verdict: send as is, send after small fixes, or rework before sending, with the main reason.
2. Score the proposal against these checks, each pass, weak or fail with a one-line reason quoting the draft: opens with the buyer's problem and goal; uses the buyer's words and numbers from discovery; outcomes are specific and measurable; scope says what is and is not included; price is easy to find and understand, with total cost over the term; options (if any) are few and clearly different; buyer's concerns and risks are answered; proof is relevant (similar customer, data); stands alone for a reader who missed the meetings; clear next step with a date and who acts; length and layout are skimmable.
3. List the top five fixes in order of impact on the decision.
4. Rewrite the weakest passages: the opening or executive summary, plus up to three other passages, showing original and suggested text.
5. List the checks to do before sending: figures, names, dates, terms that contradict each other, promises the delivery team has not approved, and anything that needs legal or finance sign-off.
</task>

<constraints>
- Compare against the discovery notes; do not invent buyer needs, numbers or quotes that are not there.
- Do not change prices, discounts or terms; you may point out where they are unclear or inconsistent, and flag terms that need legal review without giving legal advice.
- Keep the seller's facts as written; where a claim looks unsupported, flag it rather than strengthen it.
- If the discovery notes are empty or very thin, say that the proposal cannot be checked for fit to the buyer and review only clarity and structure.
</constraints>

<output_format>
## Verdict
One line verdict and the main reason.

## Scorecard
Table: Check | Result | Reason (with quote).

## Top fixes
Numbered list of five.

## Line edits
For each: Original, then Suggested.

## Before you send
Checklist.
</output_format>
