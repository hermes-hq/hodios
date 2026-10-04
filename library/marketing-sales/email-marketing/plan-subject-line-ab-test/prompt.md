---
schema: 1
id: plan-subject-line-ab-test
kind: prompt
title: Plan a subject line A/B test
description: Plans a subject line and preheader test for one send, with a hypothesis per variant, a sample-size check against list size and click-based winner rules. Use before testing subject lines.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [marketer, founder, copywriter]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, dataset]
output: [plan, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [subject-lines, split-testing, preheader, sample-size, open-rate-inflation]
pairs_with:
  prompts: [write-promo-email, analyze-email-campaign-report, calculate-sample-size]
args:
  - name: campaign
    description: The send you want to test - what it is about, the offer or news, who receives it, the current subject line and preheader idea, and the platform if you know it. Rough notes are fine.
    type: text
    required: true
  - name: list_size
    description: How many contacts will receive this send (after suppressions), for example 4200.
    type: number
    required: true
  - name: past_results
    description: Recent sends with recipients, click rate or unique clicks, and conversions or revenue if you have them. Optional; without it the plan uses labelled assumptions.
    type: text
output_contract:
  format: markdown
  sections: [Test design, Variants, Sample size check, Winner rule, If the list is too small, Test log entry]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small shop owner or marketer run a subject line test that produces a real lesson instead of noise. Three things go wrong in most subject line tests. They change several things at once (wording, emoji, length and offer) so nobody knows what worked. They pick the winner by open rate, which privacy features such as automatic image preloading now inflate for a large share of recipients, so "opens" partly measure the recipient's mail app. And they run on lists far too small to detect the difference, then treat a coin flip as a finding. A good plan tests one variable, writes down why each variant should win, checks the maths before sending, and says honestly when the list is too small to test.

List size for this send: {{list_size}}
</context>

<task>
<campaign>
{{campaign}}
</campaign>

{{#past_results}}<past_results>
{{past_results}}
</past_results>{{/past_results}}

1. **Pick one variable.** Choose the single change most likely to teach something reusable for this list: specificity (named product or number versus general), benefit versus curiosity, offer in the subject versus in the preheader, personal sender name versus brand name, or length. Keep everything else identical, including send time and preheader unless the preheader is the variable.
2. **Write variants.** Control plus one challenger (two challengers only if the list clears the sample check for three arms). For each: subject line (aim for the key words within the first 35-40 characters, which most phones show), preheader that adds information instead of repeating the subject, and a one-line hypothesis: "Because [reason about these readers], [variant] will get more clicks than control." No misleading subjects, fake "Re:" or "Fwd:", or urgency that is not real.
3. **Check sample size on clicks.** Use the baseline unique click rate from past results, or a labelled assumption (for example 2%) if none. Per arm, n ≈ 16 × p × (1 − p) ÷ d², where p is the baseline rate and d the absolute lift worth detecting (80% power, 5% two-sided significance). Show the numbers for a 20% and a 50% relative lift. Compare with the list size: can each arm get that many recipients?
4. **Set the winner rule before sending.** Primary metric: unique click rate (or conversions or revenue per recipient if volume allows). Opens are reported as secondary and flagged as unreliable. State the minimum wait (clicks often need 12-24 hours, which makes an automatic "test 20%, send the winner to 80% after 2 hours" setup choose too early) and what counts as a tie. If the platform can only pick winners by opens, say to switch that off and pick by hand.
5. **Plan for a small list.** If the list cannot reach the sample needed, do not pretend: recommend a 50/50 split of the whole send judged only as a directional hint, or the same variable repeated across several sends with results pooled in the log until the total reaches the sample, or simply sending the stronger-hypothesis version to everyone and testing bigger changes (offer, timing) instead.
6. **Log it.** One row the user can paste into a running test log so lessons build up over time.
</task>

<constraints>
- Use only the facts in the campaign notes; do not invent offers, products, discounts or deadlines. Mark gaps as [NEEDED: ...].
- Never call a winner from open rates alone, and never present a result below the sample threshold as significant.
- If the campaign description is missing the audience or what the email is about, ask for it and stop.
- Show the sample-size arithmetic so the user can check it; round up.
{{> output/uncertainty}}
</constraints>

<output_format>
## Test design
Variable tested, why it was chosen, what stays fixed, split (for example 50/50 or 25/25/50) and send time.

## Variants
Table: Variant | Subject line | Preheader | Hypothesis.

## Sample size check
Baseline rate used (data or assumption), the formula with numbers, recipients needed per arm for 20% and 50% relative lift, and a one-line verdict: testable, borderline or too small.

## Winner rule
Primary metric, wait time, tie rule, secondary metrics to note, and what to do with the result.

## If the list is too small
The recommended fallback for this list, in two to four bullets. Write "Not needed" if the list is large enough.

## Test log entry
One table row: Date | Send | Variable | Control | Challenger | Recipients per arm | Click rate each | Result | Lesson.
</output_format>
