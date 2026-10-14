---
schema: 1
id: price-viral-clip-license
kind: prompt
title: Price a viral clip license
description: Helps a creator answer a request to license their viral video or clip to a media outlet, brand or clip agency - who is asking, what rights, how to price by use and term, what to refuse, and the reply.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, artist]
inputs: [message, notes]
output: [report, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [content-licensing, viral-video, media-requests, clip-rights, usage-rights]
pairs_with:
  prompts: [evaluate-whitelisting-request, build-creator-rate-card]
  personas: [creator-business-manager]
args:
  - name: requests
    description: The message or messages you received - who sent them, which clip, how they want to use it (news segment, online article, TV show, ad, compilation channel), the rights they ask for (exclusive, worldwide, perpetual) and any fee offered.
    type: text
    required: true
  - name: clip
    description: What the clip shows, whether you filmed all of it, who else appears in it (adults, children, bystanders), music in it, where you posted it and when.
    type: text
    required: true
  - name: country
    description: Optional. Your country.
    type: string
output_contract:
  format: markdown
  sections: [Who is asking, Rights requested, Before you license, Pricing approach, What to refuse, Replies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a clip goes viral, requests arrive fast: news outlets asking to "use with credit", TV shows, brands wanting it in ads, and licensing agencies offering to manage it in exchange for exclusive worldwide rights and a share of revenue. Under copyright in most places, the person who filmed the clip owns it, and posting it publicly does not give others the right to reuse it. The main mistakes are signing an agency's exclusive, perpetual agreement in the first excited hours (which can stop the creator from licensing it themselves or even reposting in some cases), granting "credit" for free to commercial users who would pay, and ignoring the people in the clip, whose consent and image rights may matter, especially for advertising use and for children. Pricing depends on the use (editorial news use is usually paid least or used under news exceptions; advertising most), the reach, the term, the territory and exclusivity. Some uses may be allowed without a licence under news or fair-use style exceptions, which vary by country.
</context>

<task>
<requests>
{{requests}}
</requests>

<clip>
{{clip}}
</clip>

{{#country}}Country: {{country}}{{/country}}

1. **Who is asking:** classify each request (news or editorial, entertainment show, commercial or ad, licensing agency, compilation channel), and what to verify about each sender (real company, real person, consistent email domain).
2. **Rights requested:** for each, use, media, territory, term, exclusivity and fee in plain words, marking what is unclear.
3. **Before you license:** confirm the creator filmed it and owns it; people in it and whether their consent is needed (especially for ads or if children are shown); music or other copyrighted material in the clip; and any platform terms.
4. **Pricing approach:** how fees scale with use, reach, term, territory and exclusivity; ask the requester's budget first; prefer non-exclusive, limited-term licences; how to compare an agency's revenue share with direct licensing. Give the method, not market prices.
5. **What to refuse:** exclusive perpetual worldwide rights in the first days, transfers of copyright, free commercial use for "exposure", edits that change the meaning, and uses that misrepresent people in it.
6. **Replies:** short replies for each type of request (a news outlet, a commercial user asking for the fee and terms, and an agency, asking for the contract and declining exclusivity for now).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the clip is worth or what outlets pay as fact.
- Do not say whether a given use is lawful under news or fair-use exceptions; say they vary by country and suggest asking a lawyer for significant deals.
- Recommend reading any agency contract in full and having significant licences reviewed by a lawyer before signing.
- Protect the people in the clip: do not suggest licensing footage of others for commercial use without their consent.
</constraints>

<output_format>
## Who is asking
Table: sender | type | what to verify.

## Rights requested
Table: sender | use | territory | term | exclusive | fee | unclear.

## Before you license
## Pricing approach
## What to refuse
## Replies
One short reply per request type.
</output_format>
