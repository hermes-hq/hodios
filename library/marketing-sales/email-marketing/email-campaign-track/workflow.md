---
schema: 1
id: email-campaign-track
kind: workflow
title: Email campaign track
description: Takes an email campaign from goal and audience to segmentation, copy, a pre-send QA checklist and a results review, pausing for approval between steps. Use to run a campaign end to end.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build, verify, review]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text, spec, dataset]
output: [plan, copy, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [email-campaign, segmentation, pre-send-qa, campaign-review]
pairs_with:
  prompts: [write-promo-email, write-email-sequence, audit-email-deliverability, write-win-back-campaign]
  personas: [copywriter]
args:
  - name: goal
    description: What the campaign must achieve, with a number and date if possible (for example "120 renewals of the annual plan before 30 November"), plus any past results.
    type: text
    required: true
  - name: audience
    description: Who receives it, how they joined the list, how many contacts, and what you know about them (purchase history, engagement, plan, location).
    type: text
    required: true
  - name: offer
    description: What you are offering or announcing, its terms, price and deadline. Optional; leave empty if the campaign is content or news with no offer.
    type: text
  - name: platform
    description: The email platform you send from (for example Klaviyo, Mailchimp, HubSpot, Braze), so segment and tag advice fits it. Optional.
    type: string
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve}
  - {id: segments, file: steps/02-segments.md, stage: plan, gate: approve}
  - {id: copy, file: steps/03-copy.md, stage: build, gate: approve}
  - {id: qa, file: steps/04-qa.md, stage: verify, gate: approve}
  - {id: results, file: steps/05-results.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs an email campaign one approved step at a time, as a senior lifecycle marketer would: brief, segments and send plan, emails, pre-send QA, then a results review.

<goal>
{{goal}}
</goal>

<audience>
{{audience}}
</audience>

{{#offer}}<offer>
{{offer}}
</offer>{{/offer}}
{{#platform}}Platform: {{platform}}{{/platform}}

Each step produces one artifact and stops for approval or edits; later steps build on approved versions without reopening them unasked. Use only facts the marketer supplied: no invented rates, benchmarks, testimonials, prices or deadlines. Ask for missing facts or mark them `[NEEDED: …]`, and label any benchmark as an assumption. Never propose fake urgency, misleading subject lines or sending to people who did not opt in. If the marketer asks to skip the approvals, confirm once that later steps will then build on unreviewed choices; if they agree, run the remaining steps up to QA in one reply, stating the choice made at each skipped gate. The results step always waits for real data.
