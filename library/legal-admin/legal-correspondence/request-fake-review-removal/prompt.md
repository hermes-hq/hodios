---
schema: 1
id: request-fake-review-removal
kind: prompt
title: Request removal of a fake review
description: Drafts a removal request to a review platform for a fake, conflicted or defamatory review, citing the platform's own policy breaches and evidence, plus an optional note to the reviewer.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [fake-reviews, review-removal, platform-policy, online-reputation, review-platforms, defamation]
pairs_with:
  prompts: [respond-to-online-review, repair-online-reputation, write-cease-and-desist-letter]
args:
  - name: platform
    description: Where the review is (for example a maps listing, a booking site, a marketplace, a review site) and your relationship to the listing (owner, manager, the person named).
    type: string
    required: true
  - name: review
    description: The review text or a summary, its date and rating, and why you believe it is fake or unlawful - no record of the customer, a competitor or ex-employee, a wave of similar reviews, wrong business, offensive content, personal information, or false factual claims.
    type: text
    required: true
  - name: evidence
    description: Optional. What you can show - booking and sales records, CCTV or timeline, links between the account and a competitor, earlier messages from the reviewer, screenshots of a review wave.
    type: text
output_contract:
  format: markdown
  sections: [Does it qualify for removal, Policy grounds to cite, Removal request, Optional note to the reviewer, If the platform refuses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help businesses and individuals get fake or unlawful reviews taken down. Platforms remove reviews that break their own content policies far more readily than reviews the owner thinks are unfair, so a removal request succeeds by mapping the review to a named policy category: not a genuine experience (no record of the customer, posted by a competitor, current or former employee, or someone paid or incentivised), conflict of interest, review bombing or a coordinated wave, off-topic or about the wrong business, hate speech, harassment or threats, private personal information, or illegal content. Requests fail when they argue with the reviewer's opinion, attach no evidence, or reveal customer data the business should not share. Where a review makes false statements of fact that cause serious harm, a legal notice may be possible in some countries, and some laws require platforms to act on notices of illegal content. Honest negative reviews are not removable and attempts to suppress them can breach consumer law in some places. You draft; the platform decides.

Platform: {{platform}}
</context>

<task>
Review:

<review>
{{review}}
</review>

{{#evidence}}
Evidence:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Does it qualify? Assess honestly whether the review fits a removal category or is a genuine negative opinion. If it looks genuine, say so and recommend a public reply instead.
2. Policy grounds: list the platform's policy categories the review likely breaches, using general category names and telling the person to quote the exact wording from the platform's current policy page. Rank them by strength of evidence.
3. Draft the removal request for the platform's reporting or appeal form (short, because forms have character limits) and a longer version for email or business support: the listing, the review's date, rating and reviewer name as shown, the policy grounds, the evidence summarised without disclosing customer personal data, and a clear request.
4. Optional note to the reviewer: only if contact is appropriate (for example an unknown customer), a short, polite message asking for details to find their visit. Skip this for competitors, harassers or review waves.
5. If the platform refuses: the appeal or escalation route, documenting the refusal, a calm public reply, and when a legal notice about false factual statements may be worth discussing with a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not help remove or bury genuine negative reviews, post fake positive reviews, offer incentives to change reviews, or flag reviews in bulk without grounds.
- Do not invent platform policy names or wording; use general categories and tell the person to quote the current policy.
- Do not include customers' personal data in the request beyond what is needed and lawful to share.
- Do not call the reviewer a liar or criminal in the request; describe the evidence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Does it qualify for removal
Two or three lines with an honest view.

## Policy grounds to cite
Ranked bullets with the evidence for each.

## Removal request
Short form version, then the longer email version.

## Optional note to the reviewer
The note, or one line saying not to contact them and why.

## If the platform refuses
Numbered steps.
</output_format>
