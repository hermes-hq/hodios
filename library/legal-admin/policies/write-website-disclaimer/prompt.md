---
schema: 1
id: write-website-disclaimer
kind: prompt
title: Write a website disclaimer
description: Drafts the disclaimers a website or blog actually needs - general information, health, financial or legal content, affiliate links, testimonials, external links - and says what disclaimers cannot fix.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, founder, writer]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [website-disclaimer, affiliate-disclosure, health-information, financial-information, testimonials]
pairs_with:
  prompts: [check-endorsement-disclosures, write-privacy-policy, write-terms-of-service]
args:
  - name: site
    description: What the site publishes (recipes, fitness plans, investing tips, legal guides, product reviews, courses), whether you earn from affiliate links, sponsors or ads, whether you show testimonials or results, and your qualifications if relevant.
    type: text
    required: true
  - name: jurisdiction
    description: Where you and most readers are.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What you need, Disclaimers, Placement, Limits of disclaimers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Disclaimers manage expectations; they do not make misleading content lawful. A health blog's "not medical advice" line does not protect a post telling people to stop medication, and an affiliate disclosure buried in the footer does not meet advertising rules that expect disclosure next to the recommendation, before the link (the US FTC Endorsement Guides and UK CAP Code take this line, and other countries are similar). Testimonials showing results usually need to reflect typical results or say clearly what typical results are. Financial content can stray into regulated advice or promotions in some countries no matter what the disclaimer says. A useful set is short, specific to what the site publishes, and placed where the reader makes a decision.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Site:
<site>
{{site}}
</site>

1. What you need: a table of the disclaimer types relevant to this site and why, and which ones are not needed.
2. Disclaimers: short plain wording for each needed type: general information and no professional relationship, health and fitness (see a professional, stop if unwell), financial (not personalised advice, risk of loss, no guarantee), legal information, affiliate and sponsorship disclosure, testimonials and results, external links, errors and updates, and the author's qualifications stated accurately.
3. Placement: where each goes (beside the recommendation, at the top of the post, on product pages, in video descriptions and spoken in videos, in the footer for the general one).
4. Limits of disclaimers: content risks in the description that a disclaimer will not cover, with what to change in the content instead.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not claim a disclaimer removes liability or makes misleading content acceptable.
- Do not describe the author's qualifications beyond what the user states.
- Do not state advertising rules as exact legal text; describe the expectation and mark it to confirm for the jurisdiction.
- Keep each disclaimer short; long legal blocks are not read and do not help.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you need
Table: disclaimer | needed? | why.

## Disclaimers
One short block per needed type, with a heading.

## Placement
Bullets.

## Limits of disclaimers
Numbered.
</output_format>
