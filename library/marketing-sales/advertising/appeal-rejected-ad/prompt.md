---
schema: 1
id: appeal-rejected-ad
kind: prompt
title: Appeal a rejected ad
description: Works out why an ad or ad account was disapproved or suspended from the notice and the creative, decides whether to fix or appeal, and writes a factual appeal or a compliant rewrite.
category: advertising
version: 1.0.0
status: incubating
stage: [review, operate]
role: [marketer, founder]
requires: [none]
inputs: [text, image]
output: [report, message, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ad-disapproval, account-suspension, policy-appeal, compliant-rewrite, ad-review]
pairs_with:
  prompts: [check-ad-policy-compliance, check-ad-landing-message-match]
  personas: [paid-media-specialist]
args:
  - name: rejection_notice
    description: The exact disapproval or suspension message, the policy named, the date, whether it is one ad, several ads or the whole account, and any earlier warnings or appeals.
    type: text
    required: true
  - name: ad_content
    description: Everything in the rejected ad (text, image or video described, button, targeting) and the landing page content and URL. For an account suspension, describe the business, what it sells and recent changes (new payment method, new domain, sudden spend increase).
    type: text
    required: true
  - name: platform
    description: The ad platform and the countries targeted, for example "Meta, Ireland", "Google Ads, US". Optional; asked for if the policy differs by country.
    type: string
output_contract:
  format: markdown
  sections: [Likely cause, Fix or appeal, Compliant rewrite, Appeal text, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's ad was rejected or their ad account was restricted or suspended. Rejections come from automated systems that read the text, the image, the landing page and the account's history; the stated policy is often broad ("misleading content", "circumventing systems", "unacceptable business practices"), so the real trigger has to be inferred. Owners make it worse by resubmitting the same ad repeatedly (which can escalate to account restrictions), by editing in ways that look like evasion, or by sending emotional appeals. A good response first decides whether the system was right: if so, fix and resubmit as a new ad; if not, appeal once with a short, factual note that addresses the named policy. Account suspensions also involve identity, payment and business verification.
</context>

<task>
<rejection_notice>
{{rejection_notice}}
</rejection_notice>

<ad_content>
{{ad_content}}
</ad_content>

{{#platform}}Platform: {{platform}}{{/platform}}

1. If the exact rejection wording, the platform or the ad and landing page content are missing, ask for them in one message and stop.
2. Likely cause: list the possible triggers in the ad and landing page for the named policy, ranked by likelihood with confidence (high, medium, low). Check common ones: personal-attribute wording, unsupported claims, before-and-after visuals, restricted category without certification, prices or offers that do not match the page, missing contact, privacy or returns information, redirects or a new domain, trademark use, sensational language, misleading buttons, and, for accounts, verification, payment or sudden spend changes.
3. Decide: fix and resubmit, appeal as is (the ad appears to follow the policy), or both (fix the obvious issue and request review). Say clearly when the product cannot be advertised on this platform or in this country.
4. Compliant rewrite of each flagged element that keeps the honest selling point.
5. Appeal text: under 120 words, polite and factual, naming the policy, stating what the ad and page actually offer, and what was changed or why it complies. No pleading, threats or claims about revenue lost.
6. Next steps: where to submit the review, what verification or documents to prepare (business registration, licences, certificates), how long to wait before following up, and not to duplicate the rejected ad or open new accounts to get around the decision.
</task>

<constraints>
- Do not help evade review: no misspellings, symbol substitution, cloaked landing pages, swapping ads after approval or new accounts to bypass a suspension. If asked, refuse and explain the account risk.
- Do not claim certainty about the trigger or current policy wording; tell the user to read the linked policy page and rely on it over general knowledge.
- Keep rewrites truthful: no new claims beyond what the page supports.
- For regulated products (health, finance, gambling, alcohol), say a regulatory or legal review may be needed alongside platform policy.
</constraints>

<output_format>
## Likely cause
A table: Possible trigger | Where | Policy area | Confidence.

## Fix or appeal
The decision and reason in two or three lines.

## Compliant rewrite
Original and rewrite for each element, or "No change needed".

## Appeal text
The text ready to paste, with its word count.

## Next steps
A numbered list.
</output_format>
