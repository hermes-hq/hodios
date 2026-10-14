---
schema: 1
id: write-sponsored-content-concept
kind: prompt
title: Write a sponsored content concept
description: Answers a brand's brief with two or three creative concepts for the sponsored piece - the idea, how the product fits naturally, the audience payoff, format and disclosure - before scripting.
category: creator-business
version: 1.0.0
status: incubating
stage: [design]
role: [content-creator, writer]
inputs: [document, notes]
output: [ideas, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [creative-concept, brand-brief, sponsored-integration, treatment, content-ideas]
pairs_with:
  prompts: [write-video-sponsor-segment, write-sponsored-post, write-podcast-ad-read]
  workflows: [brand-deal-track]
  rules: [sponsored-content-disclosure-rules]
args:
  - name: brief
    description: The brand's brief - product, key messages, must-say and must-not-say points, call to action, deliverables, platform, dates and any references they liked.
    type: text
    required: true
  - name: channel
    description: Your channel or show - format, tone, recurring segments, what your audience likes and dislikes about sponsored content, and past sponsored pieces that worked.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Read of the brief, Concepts, Recommended concept, Questions for the brand, Concept note to send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sponsored content that works for both sides looks like the creator's normal content with a product that has a real job in it, not an advert dropped into the middle. Brands often send briefs written for every creator at once; the creator's value is translating it into something their audience would watch anyway. A concept is agreed before scripting so that approvals later are about execution, not the idea. Good concepts use the creator's existing formats or segments, show the product being used for something the audience cares about, keep the brand's must-say points to the few that matter, and are honest about limits (a creator should not claim what they have not tested). Brand claims that need proof (health, money, environmental, comparisons) are a risk for the creator and the brand. Disclosure stays clear and early in every concept.
</context>

<task>
<brief>
{{brief}}
</brief>

<channel>
{{channel}}
</channel>

1. **Read of the brief:** what the brand really wants (awareness, consideration, sign-ups or sales), the few messages that matter, any claims that need proof or that the creator should not make, and gaps in the brief.
2. **Concepts:** two or three distinct concepts. For each: a one-line idea, how it fits an existing format or segment, where and how the product appears and what it does, the audience payoff (why they keep watching), the brand messages it carries, the call to action, and where disclosure appears.
3. **Recommended concept:** which one and why, for this audience and this brand goal.
4. **Questions for the brand:** what to clarify before scripting (claims allowed, product access, approval rounds, usage).
5. **Concept note to send:** a short note to the brand presenting the concepts with the recommendation.
</task>

<constraints>
- Never put claims in a concept that the creator has not verified or the brand has not substantiated; flag them instead.
- Disclosure is clear and early in every concept; no concept hides the sponsorship.
- Keep the creator's voice and formats; do not turn the channel into the brand's ad.
- Use only facts in the brief about the product; do not invent features or results.
</constraints>

<output_format>
## Read of the brief
## Concepts
One subsection per concept: Idea, Format fit, Product role, Audience payoff, Messages, Call to action, Disclosure.

## Recommended concept
## Questions for the brand
## Concept note to send
</output_format>
