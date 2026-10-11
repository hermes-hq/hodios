---
schema: 1
id: ask-employer-for-visa-sponsorship
kind: prompt
title: Ask an employer for visa sponsorship
description: Prepares a candidate or employee to ask an employer to sponsor a work visa, with a short factual message, what sponsorship usually involves for the employer, and answers to likely objections.
category: immigration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [job-seeker, individual, student]
subject: [law]
requires: [none]
inputs: [text, job-posting]
output: [message, explanation, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [work-visa-sponsorship, sponsor-licence, job-offer, employer-conversation, talking-points]
pairs_with:
  prompts: [compare-visa-routes, negotiate-job-offer, reply-to-recruiter]
args:
  - name: situation
    description: Where you are in the process (applying, interviewing, offer received, already employed on another visa), the role, the employer's size and whether they have sponsored before if you know, and your current immigration status and its expiry.
    type: text
    required: true
  - name: country
    description: The country where you would work, and your nationality.
    type: string
    required: true
  - name: route_info
    description: What you know about the work route that fits, from official sources, such as its name, salary or skill requirements and employer duties. Optional.
    type: text
output_contract:
  format: markdown
  sections: [When to raise it, What sponsorship usually involves, Your message, Likely objections and answers, What to check yourself, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many employers say no to sponsorship because it sounds expensive, slow and risky, when for a small number of hires it is often a manageable process they have simply never done. In some countries the employer must first hold a sponsor licence or be registered, pay fees, check a salary threshold or labour-market test, and take on reporting duties; in others the employer mainly provides a contract and the candidate applies alone. Candidates do best when they raise sponsorship honestly at the right time (application forms often ask directly, and hiding the need wastes everyone's time), know the route name and the main employer steps from official sources, and make it easy: offering to share the official guidance, the timeline and who pays what. They should never offer to pay costs the law requires the employer to pay, and should be wary of "sponsorship for a fee" offers.

Country and nationality: {{country}}

<situation>
{{situation}}
</situation>
{{#route_info}}
<route_info>
{{route_info}}
</route_info>
{{/route_info}}
</context>

<task>
1. When to raise it: given where they are in the process, when and how to bring it up, and how to answer an application question about needing sponsorship truthfully.
2. What sponsorship usually involves for the employer under this kind of route: registration or licence, costs and who usually pays (some costs can only be paid by the employer in some countries), salary or skill conditions, timeline, and ongoing duties, all marked "typical, confirm on the official source".
3. Your message: a short, factual email or talking points that state the need, the route, the main steps for the employer, an estimated timeline as "to confirm", and an offer to share official guidance. Tone matched to the stage.
4. Likely objections and answers: cost, time, never done it, risk, "we can only hire people with the right to work", remote or contractor alternatives (and their legal limits, to confirm).
5. What to check yourself: whether the role and salary are likely to meet the route's criteria, your own status deadlines, and whether you could work for them without sponsorship (for example a partner or graduate route), all to confirm.
6. Questions for an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest hiding the need for sponsorship on an application form or in interviews.
- Never suggest the candidate pay fees that the route requires the employer to bear, or pay anyone for a sponsored job. Warn that such offers are often fraud and may be unlawful.
- Do not state fees, thresholds or timelines as fact.
- Do not promise the employer anything about the outcome.
{{> output/uncertainty}}
</constraints>

<output_format>
## When to raise it
## What sponsorship usually involves
## Your message
## Likely objections and answers
Table: Objection | Honest answer.
## What to check yourself
## Questions for an adviser
</output_format>
