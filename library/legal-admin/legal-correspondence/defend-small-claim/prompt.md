---
schema: 1
id: defend-small-claim
kind: prompt
title: Defend a small claim made against you
description: Helps someone who has been served a small-claims or money claim respond in time, choosing to admit, defend or counterclaim, and drafts a short point-by-point defence from their evidence.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [document, text]
output: [plan, message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [small-claims, court-claim, defence, counterclaim, default-judgment]
pairs_with:
  prompts: [explain-legal-letter, reply-to-letter-before-claim, write-settlement-offer-letter, practise-small-claims-hearing, prepare-to-self-represent, respond-to-debt-court-claim]
args:
  - name: claim
    description: What the claim form or court papers say - the claimant, what they claim and why, the amount, the claim or case number, the date it was issued and the date you received it, and any response form or deadline printed on it.
    type: text
    required: true
  - name: your_side
    description: Your account of what happened, what you accept and dispute, and the evidence you hold (contracts, messages, photos, payments, witnesses).
    type: text
    required: true
  - name: country
    description: Country and region, and the court or tribunal named on the papers. Optional, but deadlines and forms depend on it.
    type: string
output_contract:
  format: markdown
  sections: [Deadline first, Your options, Draft defence, Possible counterclaim, Evidence to gather, Next steps, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a person who has been sued in a small-claims or simplified money-claims process. The biggest avoidable loss is missing the response deadline: in many systems, failing to respond lets the claimant ask for judgment without a hearing, which can then affect credit and lead to enforcement. Courts usually provide a response pack with options to admit all, admit part, defend, or counterclaim, sometimes with a short first step that buys extra time to file the full defence. A good defence is short and answers each point in the claim (admitted, denied with the reason, or not known and the claimant is put to proof), sets out the defendant's own version briefly, and refers to evidence without arguing law at length. Judges in small claims appreciate clarity, dates and documents over legal language. Many systems also encourage or require mediation, and an early sensible offer can save cost.

{{#country}}Country and court: {{country}}{{/country}}
</context>

<task>
The claim:

<claim>
{{claim}}
</claim>

Your side:

<your_side>
{{your_side}}
</your_side>

1. Deadline first: identify the response deadline and any shorter step (such as an acknowledgment) from the papers. Calculate the calendar date where the start date is clear, show how, and mark "verify on the court papers and court website". If it is unclear or very close, say what to do today (call the court, file the acknowledgment if one exists).
2. Options: explain admit all, admit part, defend, and counterclaim in plain terms, with what each leads to (payment terms, a hearing, mediation, fees for a counterclaim) and which option the facts point to. Do not choose for the person.
3. Draft the defence in numbered paragraphs that follow the claim's own paragraphs: for each, admitted, denied (with the brief reason and the evidence that shows it), or not known. Then a short statement of the defendant's version in date order, and, if part is admitted, the admitted amount with its calculation.
4. If the facts suggest the person has their own claim (for example unpaid sums or defective work by the claimant), outline a possible counterclaim with the amount and calculation, marked as a choice to confirm, and note that counterclaims usually have a fee and their own rules.
5. List evidence to gather and how to organise it (dated, numbered, with a short index), and witnesses to ask.
6. Next steps after filing: mediation offers, directions from the court, exchange of documents, the hearing, and keeping copies of everything.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts in the papers and the person's account. Do not invent rule names, form numbers, fees, deadlines or court names; use [BRACKETS] and "verify".
- Never write a denial the person has said is untrue, and never invent evidence. If the person's account admits a point, the draft admits it.
- Keep the defence factual and short; no insults, speculation about the claimant's motives or long legal argument.
- Do not predict the outcome.
- Recommend a lawyer, legal aid, a law centre or a court help desk when: the claim is above the small-claims limit or in an ordinary court, there are personal injury, employment, housing possession or business-partner issues, a judgment has already been entered, or the person may have a large counterclaim.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadline first
Date, calculation and what to do today if urgent.

## Your options
Table: option | what it means | what happens next | fits these facts?

## Draft defence
Numbered paragraphs with [BRACKETS].

## Possible counterclaim
Outline, or "none apparent".

## Evidence to gather
Checklist with an index format.

## Next steps
Ordered bullets.

## Get advice if
Bullets tied to this case.
</output_format>
