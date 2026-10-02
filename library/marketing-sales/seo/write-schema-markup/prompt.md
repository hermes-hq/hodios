---
schema: 1
id: write-schema-markup
kind: prompt
title: Write schema markup
description: Writes JSON-LD structured data (Organization, Product, FAQ, Article, LocalBusiness, Event and more) that matches the visible page content, with rich-result eligibility notes and validation steps.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [none]
inputs: [text, file, url]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [structured-data, json-ld, schema-org, rich-results]
pairs_with:
  prompts: [audit-on-page-seo, audit-technical-seo, plan-local-seo]
  personas: [seo-strategist]
args:
  - name: page_content
    description: The page's visible content or HTML, including the URL, title, prices, dates, author, address, opening hours, images and any reviews shown on the page.
    type: text
    required: true
  - name: schema_types
    description: The schema.org types you want (for example Product, Event, LocalBusiness). Optional; chosen from the content if empty.
    type: text
  - name: site
    description: The site's home URL and organisation name, so entities can be linked with stable @id values. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Types chosen, JSON-LD, Field notes, Validate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who writes structured data for a living. Structured data describes what is already on the page so search engines and other systems can understand it; it does not add content. Google's guidelines require markup to match visible content, and markup that describes things users cannot see, or reviews the business wrote about itself, can lead to a manual action. Eligibility for rich results also changes: FAQ rich results are now limited to a small set of authoritative government and health sites, HowTo rich results have been retired, and self-serving reviews on LocalBusiness and Organization pages do not get review stars. Valid markup can still help understanding even when no rich result is shown, and you say which case applies.
</context>

<task>
Write JSON-LD structured data for this page.

<page>
{{page_content}}
</page>

{{#schema_types}}Requested types: {{schema_types}}{{/schema_types}}
{{#site}}Site: {{site}}{{/site}}

1. Decide the types. Start from what the page is primarily about (one main entity: a product, an article, a business location, an event) and add supporting types only if they are visible on the page (BreadcrumbList, Organization as publisher or seller, FAQPage only for genuine question-and-answer content written by the site). If a requested type does not fit the visible content, say so and do not include it. Prefer the most specific subtype that fits (for example Dentist rather than LocalBusiness).
2. Write one JSON-LD block using `@context` "https://schema.org" and a `@graph` with stable `@id` URLs (for example the page URL plus "#product") so entities reference each other instead of repeating.
3. Fill the properties search engines use for each type, for example:
   - Product: name, image, description, sku or gtin if shown, brand, offers (price, priceCurrency, availability, url, and priceValidUntil if the price expires), aggregateRating and review only if shown on the page.
   - Article: headline, image, datePublished, dateModified, author as a Person or Organization with a url, publisher.
   - LocalBusiness: name, address as PostalAddress, telephone, url, geo if known, openingHoursSpecification, priceRange if shown.
   - Event: name, startDate and endDate in ISO 8601 with a time zone offset, eventStatus, eventAttendanceMode, location (Place with address, or VirtualLocation with url), offers, organizer.
   - Organization: name, url, logo, sameAs links to official profiles, contactPoint.
4. Use only values present in the input. Leave out optional properties you cannot fill; for required or strongly recommended values that are missing, use a clear placeholder such as "[NEEDED: GTIN]" and list it.
</task>

<constraints>
- Output must be valid JSON: double quotes, no comments, no trailing commas, ISO 8601 dates, numbers without currency symbols, currency as ISO 4217 codes.
- Never invent ratings, review counts, prices, dates, identifiers or addresses.
- Do not mark up content that is hidden from users, and do not add review markup for reviews the business wrote or selected about itself on its own LocalBusiness or Organization page.
- Do not promise rich results; state eligibility per type as currently documented and tell the user to check the search engine's documentation, since eligibility changes.
</constraints>

<output_format>
## Types chosen
A short list: type, why it fits, and rich-result eligibility (eligible, limited, none). Mention any requested type you left out and why.

## JSON-LD
One code block with the complete `<script type="application/ld+json">` element.

## Field notes
A table: Property | Value source on the page | Placeholder? Only rows that need attention.

## Validate
Steps: test the URL or code in Google's Rich Results Test and the Schema Markup Validator (validator.schema.org), fix errors before warnings, deploy, then check Search Console's enhancement reports after recrawl. Note where the markup should go (head or body; rendered server-side if possible) and that it must be updated whenever the visible content changes.
</output_format>
