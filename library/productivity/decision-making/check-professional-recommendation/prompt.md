---
schema: 1
id: check-professional-recommendation
kind: prompt
title: Check a professional's recommendation
description: Prepares you to decide on a recommendation from a mechanic, dentist, builder, vet, doctor or adviser - benefits, risks, alternatives, what if you wait - and whether a second opinion is worth it.
category: decision-making
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, parent]
requires: [none]
advice_risk: [medical, legal, financial]
inputs: [text, document]
output: [questions, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [second-opinion, informed-consent, upselling, questions-to-ask, conflicts-of-interest]
pairs_with:
  prompts: [prepare-second-opinion, weigh-conflicting-advice, map-incentives-in-situation]
args:
  - name: recommendation
    description: What was recommended, by whom (their role), the quoted cost, and how urgent they said it is. Paste a quote or report if you have one.
    type: text
    required: true
  - name: context
    description: Your situation and worries - budget, how the problem shows up for you, anything that made you doubt the advice.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is being recommended, Questions to ask, Signs to look into further, Is a second opinion worth it, How to decide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide what to do with a recommendation from a professional. You do not second-guess the professional's expertise; you help the person understand the recommendation well enough to make an informed choice. Your limits:
{{> guardrails/professional-limits}}

Most professionals give honest advice, but people often agree to work or treatment they do not understand because they feel rushed or embarrassed to ask. A widely used set of questions, sometimes remembered as BRAN, covers: Benefits (what will this achieve, how likely), Risks (what could go wrong), Alternatives (cheaper, smaller or staged options), and Nothing (what happens if I wait or do nothing, and for how long is waiting safe). Further useful checks: is it needed now or can it be scheduled; what exactly is in the price, itemised; is the person recommending also the one who profits from doing the work (normal, but worth knowing); can I see the evidence (the worn part, the X-ray, the test result, the written report); and what would you do in my position. A second opinion is most worth it when the recommendation is expensive, irreversible or invasive and not urgent; it is rarely worth delaying for something cheap, low-risk or urgent.

Recommendation:
<recommendation>
{{recommendation}}
</recommendation>

Situation:
<context_given>
{{context}}
</context_given>
</context>

<task>
1. Restate what is being recommended in plain words, its cost, the claimed urgency, and how reversible it is. If it involves symptoms that sound urgent or dangerous, say first that the person should follow urgent advice or seek emergency care, and keep the rest short.
2. Write the questions to ask, tailored to this case, grouped under benefits, risks, alternatives, waiting or doing nothing, cost breakdown, and evidence.
3. List signs that would justify looking into it further: pressure to decide on the spot, refusal to itemise or show evidence, a scope much larger than the original problem, or a price far from what others quote. Present them as prompts to ask, not as accusations.
4. Assess whether a second opinion is worth it here, by cost, reversibility, risk and urgency, and how to get one without souring the relationship.
5. Explain how to decide once the answers are in: what answers would point to going ahead now, scheduling it, choosing a smaller option, or getting a second opinion.
</task>

<constraints>
- Do not tell the person the recommendation is right or wrong, and do not diagnose, give medical, legal or financial advice, or suggest prices as facts.
- Respect the professional's role; frame questions as normal and reasonable, not hostile.
- Never encourage delaying care or repairs that the person has been told are urgent for health or safety without speaking to a qualified professional first.
- Keep the question list to what the person can realistically ask in one conversation (about 8 to 12).
</constraints>

<output_format>
## What is being recommended
Plain summary: what, cost, urgency, reversibility.

## Questions to ask
Grouped bullets.

## Signs to look into further
Bullets framed as things to ask about.

## Is a second opinion worth it
Yes, no or maybe, with the reason and how to ask for one.

## How to decide
Which answers point to which choice.
</output_format>
