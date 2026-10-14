---
schema: 1
id: set-up-offline-conversion-import
kind: prompt
title: Set up offline conversion import
description: Sends CRM outcomes (qualified lead, opportunity, sale with value) back to ad platforms using click IDs or hashed customer data, with mapping, timing, match checks and bidding changes.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [offline-conversions, crm-integration, click-id, lead-quality, enhanced-conversions-for-leads, value-based-bidding]
pairs_with:
  prompts: [plan-ad-conversion-tracking, set-up-server-side-conversions, choose-bidding-strategy, design-lead-form-ads]
  personas: [paid-media-specialist, local-ads-advisor]
  workflows: [ad-account-turnaround-track]
args:
  - name: business
    description: What you sell, how leads come in (forms, calls, chat, lead form ads), the sales stages, typical time from lead to sale, and deal values.
    type: text
    required: true
  - name: crm
    description: CRM or lead system used, who updates lead stages, and whether you can add fields or use integrations.
    type: string
    required: true
  - name: platforms
    description: Ad platforms to send outcomes to, for example Google Ads, Meta, LinkedIn, Microsoft Ads.
    type: string
    required: true
  - name: volumes
    description: Monthly leads, qualified leads and sales from ads, if known. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Stages to send, Capturing identifiers, Data mapping, Upload method and schedule, Match checks, Using it for bidding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs ads for a business where the sale happens after the lead (quote, call, demo, consultation). Without feedback, platforms optimise for form fills and find people who fill forms, not people who buy. Offline conversion import closes the loop. What experts know: the identifiers must be captured at the moment of the lead, which means storing click IDs from the landing URL (for example Google's gclid and its iOS variants, Meta's fbclid or click cookie, LinkedIn's click ID) in hidden form fields and CRM fields, plus email and phone for hashed matching; stages sent should be few and meaningful (qualified lead, opportunity, won with value), each as its own conversion action; uploads have time windows relative to the click, so they must run often, ideally daily and automated; the conversion time must be the time the stage was reached, in the right time zone; only switch bidding to the deeper stage once its volume supports learning, often by valuing qualified leads first; and the most common failure is a CRM that nobody updates, so the process matters as much as the plumbing.
</context>

<task>
Business: {{business}}
CRM: {{crm}}
Platforms: {{platforms}}
{{#volumes}}Volumes: {{volumes}}{{/volumes}}

1. Stages to send: pick 2 to 4 stages with clear definitions a salesperson would apply the same way, the value for each (fixed estimate or actual deal value), and which stays secondary versus becomes primary later.
2. Capturing identifiers: how to read click IDs from landing URLs and store them in hidden fields and CRM fields, persistence across pages (first-party cookie or local storage, with consent), and capturing email and phone for hashed matching. Cover calls and chats too (call tracking with click IDs, or matching on phone).
3. Data mapping: a table from CRM fields to each platform's upload fields, including conversion name, identifier, conversion time with time zone, value and currency, and order or lead ID to avoid duplicates.
4. Upload method and schedule: native CRM integrations, a connector tool, scheduled file uploads or API, with the trade-offs; how often to upload; and the time limits to check in each platform's documentation.
5. Match checks: how to read upload diagnostics, an expected share of leads with an identifier, common failure causes (stripped URL parameters on redirects, forms not passing hidden fields, wrong time format, unhashed or badly normalised data) and fixes.
6. Using it for bidding: when to add the stages as conversion actions, when to make the qualified stage primary, value rules, and how to compare before and after fairly.
7. Process: who updates CRM stages and by when, so data arrives in time.
</task>

<constraints>
- Do not state upload windows, field names or file formats as fact; say to confirm in each platform's current documentation and mark examples as illustrative.
- Handle personal data lawfully: hash identifiers as the platform requires, collect only what is needed, respect consent, and note privacy notice updates.
- Do not recommend switching bidding to a stage with too few conversions to learn from; explain the alternative.
- Do not invent the user's conversion rates; use their volumes or ask.
</constraints>

<output_format>
## Stages to send
A table: Stage | Definition | Value | Primary or secondary | Expected monthly volume.

## Capturing identifiers
Numbered steps for forms, calls and chats.

## Data mapping
A table: CRM field | Platform field | Format notes.

## Upload method and schedule
Recommendation with trade-offs and frequency.

## Match checks
Checklist with failure causes and fixes.

## Using it for bidding
Timeline and rules, plus the CRM update process.
</output_format>
