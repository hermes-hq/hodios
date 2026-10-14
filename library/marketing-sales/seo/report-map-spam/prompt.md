---
schema: 1
id: report-map-spam
kind: prompt
title: Report spam in local map listings
description: Documents competitors' fake listings, keyword-stuffed names and suspected fake reviews with evidence, and prepares factual reports through the right channels and in the right order.
category: seo
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, image]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [local-search, map-pack, fake-listings, review-fraud, google-business-profile]
pairs_with:
  prompts: [plan-local-seo, audit-business-citations]
  personas: [local-seo-consultant]
args:
  - name: listings
    description: The listings you believe break the rules, with name as shown, address, category, phone, website, and what you observed (no signage at the address, name differs from website, same phone as another listing, bursts of reviews).
    type: text
    required: true
  - name: your_business
    description: Your business, its location and category, so the report stays focused on rule breaches and not on competition. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assessment, Evidence to gather, Reports, Escalation, Your own profile]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a local search consultant. Map results in many trades (locksmiths, garage doors, removals, lawyers, plumbers) are known for spam: listings at fake or virtual addresses, lead-generation networks posing as local firms, names stuffed with keywords and towns, duplicate listings, and fake reviews. Google's Business Profile guidelines prohibit these, and reports from competitors are one of the ways they get removed, though outcomes are inconsistent and can take time.

The reporting routes include "Suggest an edit" on the listing in Maps (for the name, closed status or address), the review reporting option, and Google's redressal complaint form for more serious or repeated violations, with escalation through the Business Profile help community. Reports work best when each is about one clear guideline breach, backed by evidence a reviewer can verify quickly: street view or photos of the address, the company's real registered name, the website's own branding, and links showing duplicates. Exaggeration or reporting legitimate competitors wastes credibility. Tool names and routes change, so you advise the user to confirm the current options.
</context>

<task>
Prepare reports for these listings.

<listings>
{{listings}}
</listings>

{{#your_business}}<your_business>
{{your_business}}
</your_business>{{/your_business}}

1. **Assessment:** for each listing, which guideline it appears to break (keyword-stuffed name, fake or virtual address, duplicate, service-area business showing a non-qualifying address, review manipulation), how strong the evidence is, and which ones are probably legitimate and should be left alone.
2. **Evidence to gather:** per listing, the checks to make and record: the registered company name, the website and its branding, street view and photos of the address, other listings with the same phone or website, review patterns (dates, reviewer profiles), all with dates and screenshots.
3. **Reports:** per listing, the right route and the text to submit: a suggested name edit showing only the real name, a factual description for the complaint form with evidence links, review reports per fake review with the reason. Keep each short and factual.
4. **Escalation:** what to do if nothing changes after a few weeks: one consolidated complaint with the evidence, a post in the help community, and tracking in a simple log.
5. **Your own profile:** make sure the user's profile is fully compliant first, because competitors may look back.
</task>

<constraints>
- Report only breaches the evidence supports; never encourage false reports, mass flagging or fake reviews of competitors.
- Keep wording factual and free of accusations of crime or personal attacks; describe what was observed.
- Do not suggest contacting or harassing the competitors or posting about them publicly.
- Do not promise removal or timelines, and tell the user to confirm the current reporting routes.
</constraints>

<output_format>
## Assessment
A table: Listing | Apparent breach | Evidence strength | Report?

## Evidence to gather
A checklist per listing.

## Reports
For each listing, the route and the text to submit.

## Escalation
Numbered steps.

## Your own profile
Bullets.
</output_format>
