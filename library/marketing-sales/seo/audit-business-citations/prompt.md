---
schema: 1
id: audit-business-citations
kind: prompt
title: Audit business citations
description: Audits a local business's name, address, phone and hours across supplied directory and map listings, finds mismatches and duplicates, and returns a fix list ordered by importance.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer, consultant]
subject: [retail, hospitality]
requires: [none]
inputs: [text, dataset]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [citations, nap-consistency, directories, duplicate-listings, business-listings]
pairs_with:
  prompts: [plan-local-seo, plan-multi-location-search]
args:
  - name: canonical_details
    description: The correct, current details - business name as on the sign, full address, main phone, website, opening hours, primary category, and any old addresses, names or phone numbers the business used before.
    type: text
    required: true
  - name: listings_found
    description: Each listing you found, pasted or noted as - site, URL if known, and the name, address, phone, hours and website it shows. A spreadsheet export or rough notes both work.
    type: text
    required: true
  - name: country
    description: Country the business operates in, for address format and which directories matter.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Canonical details, Findings, Duplicates and old listings, Fix list, Leave alone, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit citations (mentions of a business's name, address and phone, often called NAP) for shops, restaurants, clinics and trades. Owners and freelancers usually waste time on two things: chasing dozens of tiny directories while the main map listing is wrong, and "fixing" harmless formatting differences such as "St" versus "Street". What actually costs customers is a wrong phone number, an old address, wrong hours, or a duplicate listing splitting reviews and confusing maps. Country: {{country}}.
</context>

<task>
<canonical_details>
{{canonical_details}}
</canonical_details>

<listings_found>
{{listings_found}}
</listings_found>

1. Write the canonical record once: name exactly as used on signage and in real life (no added keywords), address in the national postal format, a local main phone number, website URL (one consistent version, https and with or without www as the site uses), hours, primary category. Note any ambiguity (for example two names in use) as a question.
2. Compare every listing field by field against the canonical record and label each difference:
   - wrong: different phone, street, unit, postcode, old name, wrong hours, dead or wrong website. Customers or maps are misled;
   - format only: abbreviations, punctuation, spacing, country code. No action unless it is a top-tier listing;
   - missing: field empty;
   - duplicate: a second listing for the same location on the same site;
   - obsolete: a listing for an old address, closed branch or previous owner.
3. Rank sites into tiers:
   - Tier 1: the main map and profile platforms people use in this country (for example the Google Business Profile, Apple Business Connect, Bing Places) and the business's own website and social profiles;
   - Tier 2: the big general and industry directories that appear in search results for the business's name and category, and data aggregators where the country has them;
   - Tier 3: small or scraped directories. Fix only wrong phone or address there, and only if the site has an edit route.
4. For duplicates, say which one to keep (the one with more reviews and the right details) and how to resolve the other: request a merge, mark it as a duplicate, or report it as closed or moved through the platform's own process. Never advise deleting the listing that holds the reviews.
5. Turn it into a fix list: Tier 1 wrong and duplicate items first, then Tier 2, then Tier 3, each with the exact value to enter.
</task>

<constraints>
- Work only from the listings supplied. You have not checked any site live; do not claim a listing exists, is claimed or shows anything you were not given.
- Name directories only where you are confident they exist in this country; otherwise describe the kind of directory to look for.
- Do not recommend adding keywords or a city to the business name, or using virtual offices.
- If call tracking numbers are in use, recommend the local main number as the primary on Tier 1 listings, with the tracking number only where the platform allows an additional number.
- If the canonical details are missing or contradict each other, ask which is correct before auditing.
</constraints>

<output_format>
## Canonical details
A code block with the exact name, address, phone, website, hours and category to use everywhere.

## Findings
Table: Site | Tier | Field | Shows | Should be | Label (wrong, format only, missing, duplicate, obsolete).

## Duplicates and old listings
Bullets: which listing to keep, which to resolve, and how.

## Fix list
Numbered, in order: site, what to change, exact value, how (edit, claim, merge request, suggest an edit).

## Leave alone
Differences not worth fixing, with a one-line reason.

## Questions
What to confirm with the owner.
</output_format>
