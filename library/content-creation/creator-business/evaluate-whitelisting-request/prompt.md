---
schema: 1
id: evaluate-whitelisting-request
kind: prompt
title: Evaluate a whitelisting request
description: Evaluates a brand's request to run paid ads through a creator's account (whitelisting or creator-licensed ads) - what access it needs, risks, the terms to set and price - and writes the reply.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [message, notes]
output: [report, checklist, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [whitelisting, paid-usage, usage-rights, ad-access, account-security]
pairs_with:
  prompts: [build-creator-rate-card, review-sponsorship-contract]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: request
    description: The brand's request as received - which content, which platform, how long, what access they want (ad partnership code, partner access in the ad manager, login), budget or fee offered, and anything about editing the content or captions.
    type: text
    required: true
  - name: context
    description: Your audience on that platform, the original deal (if any) and its fee, how you feel about the brand, and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they are asking for, Risks to you, Terms to set, Pricing approach, Reply, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Whitelisting (also called creator-licensed or partnership ads) lets a brand run paid ads that appear under the creator's name and handle, using the creator's content and sometimes new ad copy. It often performs better for the brand than its own ads because it looks like the creator talking, which is exactly why it is worth more than organic posting and carries more risk for the creator. The creator's name may appear next to claims they did not write, to audiences far beyond their own, for as long as access lasts; comments on those ads land on the creator's identity. Safe practice: grant access through the platform's official partnership or ad-access tools, never by sharing a password; limit the duration and the content covered; require approval of any new copy, captions or edits; agree who moderates comments; set an end date and how access is revoked; and price paid usage separately, usually per period, on top of any organic fee. Platform tools and names change.
</context>

<task>
<request>
{{request}}
</request>

<context_notes>
{{context}}
</context_notes>

1. **What they are asking for:** in plain words, what access, which content, how long, and what they could do with it; mark anything unclear.
2. **Risks to you:** claims and copy under your name, audiences and placements beyond your own, comments, account security, exclusivity creep, and being tied to the brand if something goes wrong.
3. **Terms to set:** access only through official platform tools (never a login), specific posts only, a fixed duration with an end date and revocation, approval of new copy and edits, no claims you cannot back, comment moderation responsibility, a spend cap or reporting if you want visibility, and the right to end access if the brand breaches terms. Mark platform-specific details as checks.
4. **Pricing approach:** how to price paid usage per period on top of the organic fee, using the creator's own rate card if they have one; placeholders where no figure is given; and the trade-offs if the brand pushes back (shorter period, fewer posts).
5. **Reply:** a short reply to the brand accepting with terms, countering, or declining, matching the recommendation.
6. **Questions:** what to clarify with the brand and which terms to have a lawyer or creators' association review if the money or duration is significant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never advise sharing a password or login with a brand.
- Do not quote market prices for whitelisting as fact; show the method.
- Do not describe a platform's tools as fact when unsure; mark them as checks.
- Ads under the creator's name must stay disclosed as paid partnerships.
</constraints>

<output_format>
## What they are asking for
## Risks to you
## Terms to set
Checkbox list.

## Pricing approach
## Reply
## Questions
</output_format>
