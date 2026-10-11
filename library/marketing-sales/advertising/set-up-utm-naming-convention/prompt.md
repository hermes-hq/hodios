---
schema: 1
id: set-up-utm-naming-convention
kind: prompt
title: Set up UTM and campaign naming rules
description: Defines UTM parameters and campaign naming rules across ad platforms, with allowed values, a link builder sheet, platform tracking templates and checks for broken tracking.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, consultant, data-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [utm-parameters, naming-convention, campaign-tagging, ga4, channel-grouping, link-builder]
pairs_with:
  prompts: [plan-ad-conversion-tracking, write-monthly-ads-report, build-content-measurement-plan]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: channels
    description: The ad platforms and other channels you tag links for (Google Ads, Meta, LinkedIn, TikTok, email, partners, offline QR codes).
    type: text
    required: true
  - name: analytics
    description: Analytics tool used (for example GA4), and how reports are grouped today (by channel, product, region, funnel stage).
    type: string
    required: true
  - name: current_examples
    description: A sample of current UTM-tagged URLs or a traffic source report showing the mess you want to fix. Optional.
    type: text
  - name: dimensions
    description: What you need to slice campaigns by, for example region, product line, audience type, funnel stage, promotion. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Rules, Allowed values, Campaign naming pattern, Builder sheet, Platform setup, QA checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's traffic reports are messy: the same campaign appears as "Facebook", "facebook" and "fb", paid traffic lands in referral or unassigned, and nobody can compare campaigns across platforms. What experts know: UTM values are case-sensitive, so one rule (lowercase, hyphens or underscores, no spaces) fixes half the mess; source and medium must match the analytics tool's channel grouping rules, or paid social shows up as referral (in GA4, the default channel groups decide this, so their definitions must be checked); campaign names should be built from a fixed pattern of dimensions so they can be split later in a spreadsheet; platform-level tracking templates with dynamic parameters beat hand-tagging each ad; Google Ads auto-tagging should stay on alongside any manual UTMs; internal links must never carry UTMs because they overwrite the original source; and redirects, link shorteners and some form tools strip parameters, so every new link pattern needs a test click.
</context>

<task>
Channels: {{channels}}
Analytics: {{analytics}}
{{#dimensions}}Dimensions needed: {{dimensions}}{{/dimensions}}
{{#current_examples}}Current examples:
<current_examples>
{{current_examples}}
</current_examples>{{/current_examples}}

1. If current examples were given, list the problems found (case variants, wrong medium, missing parameters, internal UTMs) with examples.
2. Rules: formatting rules for all values, which parameters are required versus optional, and what each parameter means in this setup (source = platform or site, medium = channel type, campaign = the pattern below, content = ad or creative, term = keyword or audience).
3. Allowed values: a controlled list for source and medium per channel, chosen to land in the right default channel group (tell the user to confirm against their analytics tool's current channel definitions).
4. Campaign naming pattern: one pattern used both as the ad platform campaign name and the utm_campaign value, built from the needed dimensions in a fixed order with a delimiter, plus a short code list for each dimension and three worked examples. Include a campaign ID parameter if the analytics tool supports it.
5. Builder sheet: columns, drop-down lists, and the spreadsheet formula that assembles the final URL and lowercases values, handling URLs that already contain a question mark.
6. Platform setup: how to use each platform's tracking template or URL parameters field with dynamic values so links are tagged automatically; note that Meta and others use their own placeholder syntax that must be copied from their help pages.
7. QA checks: a pre-launch click test, a weekly check of the source and medium report for new variants, a check for paid traffic in unassigned or referral, and a rule for who may create new values.
</task>

<constraints>
- Do not invent platform dynamic parameter names; give the ones you are sure of and tell the user to confirm the list in each platform's help.
- Keep the convention short enough that people will follow it; no more dimensions than the reports need.
- Do not put personal data (emails, names, user IDs) in UTM values.
</constraints>

<output_format>
## Rules
Bullets, plus problems found in current examples if any.

## Allowed values
A table: Channel | utm_source | utm_medium | Expected channel group.

## Campaign naming pattern
The pattern, a code table per dimension, and three examples.

## Builder sheet
Column list and the formula in a code block.

## Platform setup
Per platform, the tracking template or URL parameter approach.

## QA checks
Checklist with owner and frequency.
</output_format>
