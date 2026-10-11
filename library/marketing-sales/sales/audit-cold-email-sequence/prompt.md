---
schema: 1
id: audit-cold-email-sequence
kind: prompt
title: Audit a cold email sequence
description: Reviews an existing outbound email sequence for reply-rate killers (length, relevance, the ask, follow-up spacing, deliverability risks) and rewrites the weakest touches.
category: sales
version: 1.0.0
status: incubating
stage: [review]
role: [sales-rep, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [report, rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [cold-email, sequence-review, reply-rate, deliverability, outbound]
pairs_with:
  prompts: [write-outbound-sequence, personalize-cold-email-openers, write-cold-outreach]
  personas: [sales-coach]
args:
  - name: sequence
    description: The full sequence as sent, every step with its day or delay, subject line and body. Include merge fields as they appear (for example {first_name}).
    type: text
    required: true
  - name: audience_and_offer
    description: Who receives it (role, company type, region) and what you sell.
    type: text
    required: true
  - name: results
    description: Current numbers if you have them, such as open, reply, positive reply and bounce rates per step, and sending volume per mailbox per day. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Step-by-step review, Deliverability risks, Rewrites, What to test next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit cold outbound for B2B teams. Sequences rarely fail on one big mistake; they fail on a stack of small ones. The usual reply killers: the first email is about the sender, it runs over about 125 words, it asks for 30 minutes before earning interest, every follow-up says "just bumping this", there is no new reason to reply in later steps, merge fields are visible or broken, and the sequence never ends with a clear close-out.

Deliverability is the silent failure: links and images in a first email, tracking pixels, spammy words in subject lines, long signatures with many links, identical text across thousands of sends, and high volume per mailbox all push mail to spam. Open rates are unreliable since mail privacy features inflate them, so judge on replies and positive replies.
</context>

<task>
Audit this sequence and fix the weakest parts.

<sequence>
{{sequence}}
</sequence>

<audience_and_offer>
{{audience_and_offer}}
</audience_and_offer>
{{#results}}
<results>
{{results}}
</results>
{{/results}}

1. Give a verdict in two or three sentences: the biggest problem and the fix that would likely move replies most.
2. Review each step on: relevance to the reader, length (count words), clarity of the one ask, a distinct reason for this touch, subject line, and spacing from the previous step. Score each step out of 10 with the reasons.
3. If results are given, use them to locate the drop-off and say what it suggests; do not over-read small samples (under about 200 sends per step).
4. List deliverability risks you can see in the copy and setup, and what to change.
5. Rewrite the two weakest steps in full, keeping the user's facts and proof, and explain each change.
6. Suggest two A/B tests with a clear hypothesis and the metric to judge them.
</task>

<constraints>
- Keep the offer's facts and proof; never invent results, customers or statistics.
- Judge on replies and positive replies, not opens.
- Do not recommend tricks that mislead: fake "Re:" or "Fwd:" subjects, false familiarity, fake urgency.
- Flag missing opt-out wording and remind the user that consent and opt-out rules for cold email differ by country (for example stricter consent rules in Germany and Canada), without giving legal advice.
- Keep rewrites within 50 to 125 words for a first email and shorter for follow-ups.
</constraints>

<output_format>
## Verdict
Two or three sentences.

## Step-by-step review
Table: Step | Day | Words | Score | What works | What hurts.

## Deliverability risks
Bullets: risk, fix.

## Rewrites
For each rewritten step: the new subject and body, then bullets on what changed and why.

## What to test next
Two tests: hypothesis, variant, metric, minimum sample.
</output_format>
