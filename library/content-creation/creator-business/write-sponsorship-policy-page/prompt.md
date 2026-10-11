---
schema: 1
id: write-sponsorship-policy-page
kind: prompt
title: Write a sponsorship policy page
description: Writes a creator's public sponsorship policy - who they will not work with, how they disclose, editorial independence, gifted products and affiliate links - plus a short version for brands.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer]
inputs: [notes, preferences]
output: [docs, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sponsorship-policy, editorial-independence, ad-disclosure, audience-trust, gifted-products]
pairs_with:
  prompts: [write-media-kit, pitch-brand-sponsorship]
  rules: [sponsored-content-disclosure-rules]
  personas: [creator-business-manager]
args:
  - name: values
    description: Your niche and audience, categories you refuse (for example gambling, crypto, alcohol, diet products), how you handle free products, affiliate links and reviews, whether brands can see content before it goes live, and any past situations that shaped your rules.
    type: text
    required: true
  - name: audience_note
    description: Optional. Anything about your audience that shapes the policy, such as many viewers under 18.
    type: text
output_contract:
  format: markdown
  sections: [Public policy page, Short version for brands, Pinned line, Decisions to make]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A published sponsorship policy does two jobs: it tells the audience how money touches the content, which builds trust, and it filters brand inquiries before the creator spends time on them. Good policies are specific: categories the creator never promotes, that every sponsored piece is labelled, that brands do not get editorial control over reviews, whether brands may see content before it goes live (factual accuracy only, or approval of the integration only), how gifted products are handled and disclosed, how affiliate links are labelled, and that the creator only promotes what they would use. Audiences with many minors need stricter categories (gambling, alcohol, some games with paid random rewards, dieting). The policy should be something the creator will actually follow; a policy broken once does more harm than none.
</context>

<task>
<values>
{{values}}
</values>

{{#audience_note}}Audience note: {{audience_note}}{{/audience_note}}

1. **Public policy page:** under about 400 words, plain language, in the creator's voice: what sponsorships are, how they are labelled, categories refused, editorial independence for reviews, gifted products, affiliate links, how they choose partners, and how viewers can raise concerns.
2. **Short version for brands:** a five to eight line version to paste into a media kit or reply to inquiries, including categories refused and that disclosure is non-negotiable.
3. **Pinned line:** one sentence for channel descriptions or bios linking to the policy.
4. **Decisions to make:** points in the user's notes that are unclear or that they may not have considered (for example what happens with a sponsor who later behaves badly, or brand review rights), each with two options.
If the audience includes many minors, add the categories to refuse and say why.
</task>

<constraints>
- Write only rules the user stated or chose; list other suggestions under Decisions to make rather than putting them in the policy.
- Do not claim legal compliance; disclosure rules differ by country and the page is a statement of practice.
- Plain, warm language, no legal jargon.
</constraints>

<output_format>
## Public policy page
## Short version for brands
## Pinned line
## Decisions to make
Table: question | option A | option B.
</output_format>
