---
schema: 1
id: set-up-server-side-conversions
kind: prompt
title: Set up server-side ad conversions
description: Plans and implements server-side conversion tracking with Meta Conversions API and Google enhanced conversions, covering event mapping, deduplication, match keys, consent and testing.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build, verify]
role: [marketer, software-engineer, consultant]
requires: [none]
inputs: [text, config]
output: [plan, code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [conversions-api, enhanced-conversions, server-side-tracking, event-deduplication, consent-mode, event-match-quality]
pairs_with:
  prompts: [plan-ad-conversion-tracking, set-up-offline-conversion-import, audit-website-privacy-compliance]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: site
    description: Website platform and checkout or form setup (for example Shopify, WooCommerce, custom Next.js app with Stripe), and whether you use a tag manager or server-side tag manager.
    type: text
    required: true
  - name: events
    description: The conversion events to send (purchase, lead, sign-up, add to cart) and the data available at each (order value, currency, email, phone, user ID).
    type: text
    required: true
  - name: platforms
    description: Which to set up, for example "Meta Conversions API and Google enhanced conversions".
    type: string
    required: true
  - name: consent_context
    description: Countries you sell to and how consent is collected today (cookie banner tool, consent mode). Optional.
    type: text
  - name: code
    description: Relevant code or tag configuration if you want implementation help, with secrets removed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Event map, Implementation, Deduplication and matching, Consent and privacy, Test and monitor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants conversions to reach ad platforms reliably now that browser tracking loses events to ad blockers, browser restrictions and consent choices. Server-side tracking sends events from the user's server or tag manager server to the platform. What experts know: the easiest reliable route is usually the platform's official integration for the store or CMS, then a server-side tag manager, then a direct API integration; browser pixel and server events must share an event ID and event name so the platform deduplicates them, or conversions double; match quality depends on sending hashed first-party identifiers (email, phone, external ID) plus the platform's click and browser identifiers and client IP and user agent where lawful; Google's enhanced conversions sends hashed customer data alongside the existing tag rather than replacing it; access tokens and API secrets must live in server-side secrets, never in browser code; and consent must gate what is sent, because server-side does not exempt anyone from privacy law.
</context>

<task>
Site: {{site}}
Events: {{events}}
Platforms: {{platforms}}
{{#consent_context}}Consent: {{consent_context}}{{/consent_context}}
{{#code}}Code or config:
<code>
{{code}}
</code>{{/code}}

1. Approach: recommend the route per platform (official integration, server-side tag manager, gateway product, or direct API), with the trade-offs for this site, and say what it needs (developer time, hosting, ongoing maintenance).
2. Event map: a table of each event with its browser trigger, server trigger, event name per platform, parameters (value, currency, content IDs, order ID), user data fields available, and the shared event ID source.
3. Implementation: step-by-step for the chosen route. If code or config was supplied, show the specific changes; if a direct API route is chosen, outline the request structure in pseudocode or the site's language, with hashing of identifiers done the way the platform specifies, retries, and secrets read from environment variables.
4. Deduplication and matching: how the event ID is generated once and passed to both browser and server, which identifiers improve matching, normalisation before hashing (trim, lowercase, phone format), and which fields must not be hashed.
5. Consent and privacy: what to send with and without consent in each region, consent mode signals for Google, limited data use options if relevant, data minimisation, and a note to update the privacy notice.
6. Test and monitor: use each platform's test or diagnostics tools, check deduplication and match quality reports, compare server counts with orders in the shop backend, and set an alert for drops.
</task>

<constraints>
- Do not invent API field names, endpoints, version numbers or hashing rules. Where exact names matter, say to copy them from the platform's current developer documentation and mark your example as illustrative.
- Never put access tokens, API secrets or customer data in browser code, logs or the example output.
- Do not suggest sending data without a lawful basis or ignoring consent choices.
- If the user is on a platform with an official integration, recommend it before custom code unless there is a clear reason.
</constraints>

<output_format>
## Approach
Recommendation per platform with trade-offs.

## Event map
A table: Event | Browser trigger | Server trigger | Event name | Parameters | User data | Event ID source.

## Implementation
Numbered steps, with code or config in code blocks marked illustrative where field names must be checked.

## Deduplication and matching
Bullets.

## Consent and privacy
Bullets by region or consent state.

## Test and monitor
Checklist and the alert to set.
</output_format>
