---
schema: 1
id: design-locale-detection-and-routing
kind: prompt
title: Design locale detection and routing
description: Designs how a web or mobile app picks and remembers language and region, with negotiation, explicit choice, URL strategy, hreflang, fallback chains and language kept separate from currency.
category: localization
version: 1.0.0
status: incubating
stage: [design]
role: [fullstack-engineer, frontend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text]
output: [adr, plan, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [locale-negotiation, accept-language, hreflang, url-strategy, fallback-chain, bcp-47]
pairs_with:
  prompts: [implement-locale-formatting, plan-rtl-support, plan-international-seo]
  personas: [localization-engineer]
args:
  - name: product_description
    description: The product, how users arrive (search, ads, app stores, links in emails), whether users log in, whether prices or catalogue differ by country, and the current stack and hosting.
    type: text
    required: true
  - name: locales
    description: The languages and regions to support at launch and later, for example "en-US, en-GB, de-DE, de-CH, fr-CH, pt-BR, es-419".
    type: string
    required: true
  - name: platform
    description: Where locale selection happens.
    type: enum
    enum: [web, mobile, both]
    default: web
output_contract:
  format: markdown
  sections: [Decision summary, Locale model, Resolution order, URL and SEO, Implementation, Edge cases]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams often treat "locale" as one setting and get stuck: a Swiss user wants French text but Swiss francs; an expat in Germany wants English with German shipping; a geo-IP redirect sends a traveller to the wrong site and hides the one they wanted from search engines; and an app store build ignores the per-app language the phone already lets users set. A sound design separates language (for text), region (for formats and legal content) and market (for currency, catalogue and prices); resolves them in a clear order with the user's explicit choice always winning; uses BCP 47 tags; and gives every language its own crawlable URL on the web.
</context>

<task>
Design locale detection and routing for this {{platform}} product:

<product_description>
{{product_description}}
</product_description>

Locales: {{locales}}

1. Locale model: define the separate settings (UI language, formatting region, market or storefront, time zone) and which ones the user can change independently. Map the requested locales to BCP 47 tags and say which are language-only, which are language-region, and which share translations (for example es-419 for Latin America).
2. Resolution order, first match wins. On the web, a URL that carries a locale always renders that locale, so shared links and crawlers get what the URL promises; a saved choice that differs triggers a suggestion banner, never a redirect away. For URLs without a locale (the root, app start, emails and other server channels) resolve in this order: explicit choice saved in the account; explicit choice in a cookie or local storage; the OS or browser preference list (`Accept-Language` with quality values, `navigator.languages`, the per-app language on iOS and Android 13+); then the default. Use a real BCP 47 lookup or best-fit matcher (the framework's built-in matcher or a maintained library such as `@formatjs/intl-localematcher`), not string prefix matching. Geo-IP may suggest a market but never switch language silently.
3. Fallback chain: for each supported locale, its chain (for example `de-CH` to `de` to `en`), and how missing strings, formats and content fall back separately.
4. Web URL strategy: compare subpath (`/de/`), subdomain and country-code domains for this product, recommend one, and give the routing rules: the root URL behaviour (a language chooser or a non-redirecting default, plus a suggestion banner rather than a forced redirect), `hreflang` alternates including `x-default`, canonical tags, sitemaps, and `lang` on `html`. Never vary the content of one URL by `Accept-Language` without `Vary` and alternates.
5. Mobile: follow the system and per-app language settings, offer an in-app picker only if users need a language different from the system, and handle the store listing languages separately.
6. Language switcher: names each language in its own language ("Deutsch", "Français"), not flags; keeps the user on the equivalent page; remembers the choice.
7. Server and other channels: emails, push notifications, PDFs and support use the saved language, not the request headers of whoever triggered them.
8. Give implementation sketches for the stack described (middleware, routing config, the negotiation function), and list edge cases with expected behaviour.
</task>

<constraints>
- Recommend one approach with reasons; mention the main alternative and when it would win.
- Do not state SEO outcomes or legal requirements as certain; say what to verify (for example country-specific legal pages).
- If the locale list is vague ("all of them"), or the stack, how users arrive, or whether prices and catalogue differ by country is missing, ask for those first and do not design for every language.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Decision summary
Five to eight bullets in decision-record style: the choice and why.

## Locale model
Table: Setting | Values | Source | User can change?

## Resolution order
Numbered list, and the fallback chain per locale as a table.

## URL and SEO
URL pattern, redirect rules, hreflang example for one page. "Not applicable" for mobile-only.

## Implementation
Code or config sketches for the stated stack.

## Edge cases
Table: Situation | Expected behaviour (traveller, VPN, shared device, logged-out user with saved cookie, a shared link in a language other than the saved choice, unsupported language, crawler without Accept-Language).
</output_format>
