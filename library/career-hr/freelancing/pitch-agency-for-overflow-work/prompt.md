---
schema: 1
id: pitch-agency-for-overflow-work
kind: prompt
title: Pitch agencies for overflow work
description: Helps a freelancer win steady overflow or white-label work from agencies - picks agencies that fit, shapes an agency-friendly offer and rate, and writes the outreach and follow-up.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [designer, writer, software-engineer, copywriter]
requires: [none]
inputs: [text, preferences]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [agency-partnerships, white-label, overflow-work, cold-pitch, recurring-work]
pairs_with:
  prompts: [build-freelance-pipeline-routine, write-freelance-profile, price-services]
args:
  - name: offer
    description: What you do, your strongest relevant work, rates, availability, time zone, and whether you are happy to work unbranded under the agency's name.
    type: text
    required: true
  - name: target_agencies
    description: The kinds of agencies you want to work with, or a short list you are considering, with what you know about each (size, clients, services).
    type: text
output_contract:
  format: markdown
  sections: [Agency fit, Agency offer, Outreach message, Follow-up, Terms to settle]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer get work from agencies, which is one of the most dependable sources of repeat projects. Agencies buy differently from direct clients: they want someone who fills a skill gap or handles overflow at peak times, needs little managing, hits deadlines, stays invisible to their clients when asked, and leaves room for their markup. The freelancer's pitch should therefore lead with reliability, turnaround and fit with the agency's work, not with a list of skills. The best targets are agencies that do what the freelancer does but smaller than their demand (overflow), or agencies that sell a service next to the freelancer's (a gap). Agency work brings its own terms to agree: non-solicitation of the agency's clients, credit and portfolio rights, and who talks to the end client.
</context>

<task>
<offer>
{{offer}}
</offer>
{{#target_agencies}}

<target_agencies>
{{target_agencies}}
</target_agencies>
{{/target_agencies}}

1. Agency fit: describe the two or three agency types most likely to need this freelancer (overflow or gap), the signals to look for (job ads for the same role, recent growth, services listed), and where to find them. If target agencies were given, rate each against these signals using only the information provided.
2. Agency offer: a one-line positioning, two or three ways to work (ad hoc day rate, a block of reserved days per month, fixed-price units), a rate approach that leaves room for markup, turnaround and availability promises the freelancer can keep, and white-label stance.
3. Write the outreach message to the person who books freelancers (often a producer, studio manager or project lead): under 120 words, one relevant proof point, a specific way to start small (a test brief paid at the normal rate, a reserved day), and no attachment dump.
4. Follow-up: two follow-ups spaced over a few weeks, and what to send once an agency says "we'll keep you on file".
5. Terms to settle before the first job: non-solicitation scope, credit and portfolio use, confidentiality, payment terms (agencies often pay when their client pays; push back on this), and rights. Suggest a written agreement.
</task>

<constraints>
- Use only work and figures the freelancer gave; do not invent agency names, clients or results.
- Do not recommend unpaid test work; a test brief should be paid.
- Outreach is personal and specific, sent to a small researched list; no mass messaging.
{{> output/uncertainty}}
</constraints>

<output_format>
## Agency fit
Bullets, plus a table if agencies were named: agency | overflow or gap | signals | fit.

## Agency offer
Bullets.

## Outreach message
Ready to send.

## Follow-up
Two short messages with timing, plus the "on file" reply.

## Terms to settle
Checklist.
</output_format>
