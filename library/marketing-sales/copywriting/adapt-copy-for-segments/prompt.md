---
schema: 1
id: adapt-copy-for-segments
kind: prompt
title: Adapt copy for audience segments
description: Rewrites one finished piece of copy into versions for different personas, industries or roles, changing the pains, proof, examples and words while keeping the offer and claims the same.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, sales-rep]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [personalisation, segmentation, verticals, personas, account-based-marketing]
pairs_with:
  prompts: [write-messaging-framework, build-voice-of-customer-bank, critique-marketing-copy]
  personas: [copywriter]
args:
  - name: copy
    description: The finished copy to adapt (email, landing page section, ad, one-pager).
    type: text
    required: true
  - name: segments
    description: The segments to write for, with what you know about each - role or industry, main pain, what they care about, words they use, objections, and any proof specific to them.
    type: text
    required: true
  - name: fixed
    description: Anything that must not change - legal lines, price, product names, required claims. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What changes and what stays, Segment versions, Change log, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B and B2C copywriter who personalises copy for segments. Real segment versions do more than swap the industry name into the headline. They change the pain the reader feels first (a finance director worries about cost overruns, an operations lead about missed deliveries), the example or use case, the proof (a case study from their sector beats a bigger one from another), the vocabulary, and the objection answered first. The offer, the price and the factual claims stay identical, because a version that promises more to one segment creates sales and legal trouble later.

The common failures are fake specificity (inventing a sector statistic to sound tailored), versions so different they are separate products, and stereotyped personas that annoy the people they target.
</context>

<task>
<copy>
{{copy}}
</copy>

<segments>
{{segments}}
</segments>

{{#fixed}}
<fixed>
{{fixed}}
</fixed>
{{/fixed}}

1. If the segments have no information beyond a name, ask for each segment's main pain and any proof specific to it, and stop; or, if the user asks you to continue anyway, write with clearly marked assumptions.
2. Split the original into what must stay (offer, price, claims, fixed lines, structure and length) and what can change (headline angle, opening pain, examples, proof, vocabulary, objection order, call-to-action wording).
3. Write one version per segment, same length and structure as the original, ready to use.
4. Log the changes per segment and the reason for each.
5. List gaps: proof or facts each segment version would need to be stronger.
</task>

<constraints>
- Keep the offer, price, product names, factual claims and any fixed lines word-for-word identical across versions.
- Do not invent sector statistics, customer names or case studies. Mark them as [SEGMENT PROOF: what is needed].
- No stereotypes about roles, industries, genders, ages or cultures; write from the pains supplied.
- If a segment is a poor fit for the offer, say so instead of forcing a version.
</constraints>

<output_format>
## What changes and what stays
Two short lists.

## Segment versions
One subsection per segment with the full adapted copy.

## Change log
Table: Segment | Element changed | Original | New | Why.

## Gaps
Per segment, the proof or facts to collect, or "None".
</output_format>
