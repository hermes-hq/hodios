---
schema: 1
id: implement-multi-currency-amounts
kind: prompt
title: Implement multi-currency prices and amounts
description: Implements selling and showing prices in several currencies, with per-currency price lists or rate-based conversion, rate snapshots, presentment versus settlement currency and locale-aware display.
category: localization
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [plan, diff, code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [multi-currency, exchange-rates, presentment-currency, iso-4217, price-lists]
pairs_with:
  prompts: [implement-money-arithmetic, implement-locale-formatting, integrate-payments]
args:
  - name: requirements
    description: What is sold, which currencies and markets, whether prices are set per currency or converted, payment provider, accounting or reporting currency, refunds and tax handling.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Decisions, Data model, Currency selection, Conversion and rates, "Checkout, refunds and reporting", Display, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Showing and charging prices in several currencies involves decisions that a money type alone does not make (this entry assumes amounts are already integer minor units or decimals with a currency, as in a money-arithmetic setup). Price lists set per currency give stable, rounded local prices (19.00 EUR, 2,900 JPY) but must be maintained; converting from a base currency at a live rate gives odd amounts that change daily unless rounded to price points. Three currencies may differ for one order: presentment (what the buyer sees and pays), settlement (what the business receives from the payment provider) and reporting (what accounting uses). Currency selection should follow the buyer's market or shipping country, not the interface language: a Spanish-language page in Mexico shows MXN, in Spain EUR. Every conversion needs a rate, its source, its timestamp and the direction, and the rate used for an order must be stored with the order so refunds and reports reproduce it; refunds go back in the presentment currency at the original amount, not reconverted. Payment providers express amounts in the currency's smallest unit, with zero-decimal currencies (JPY, KRW) not multiplied by 100, and support different currency sets per account and method. Displaying "approximately" converted amounts for information is different from charging in that currency and must be labelled.
</context>

<task>
Implement multi-currency prices and amounts for:

{{requirements}}

1. Run the tests and record the baseline. Read the existing money type, product and price storage, cart and order models, payment integration, tax calculation, refunds and reporting.
2. Decisions: list the choices with a recommendation for each: price lists per currency or conversion from a base (or a mix), rounding to price points for converted prices, which currencies are presentment-enabled, settlement currency per provider account, reporting currency, rate source and refresh, how long a displayed price is honoured at checkout, and tax-inclusive or exclusive display per market. Stop and confirm these before implementing.
3. Data model: prices keyed by product and currency (or base price plus conversion rules), orders storing presentment amount and currency, the rate record used (value, source, fetched-at, direction), settlement and reporting amounts when known, and line items in the presentment currency.
4. Currency selection: resolve from the buyer's market (shipping or billing country, a market selector, or the domain), not the interface language; allow an explicit choice; keep the selected currency stable through the cart and checkout.
5. Conversion and rates: a rate provider abstraction, scheduled refresh with stored history, a stale-rate threshold that blocks conversion rather than using an old rate silently, and conversion rounding through the money type's rules.
6. Checkout, refunds and reporting: charge in the presentment currency using the provider's smallest-unit rules per currency; refunds in the original currency and amount; reporting conversions using the stored rate or the settlement record, stated explicitly.
7. Display: format with the currency code and the viewer's locale, distinguish charged prices from informational converted amounts with a label, and never show a converted amount as if it were the charge.
8. Implement in the smallest slice (one product type through checkout and refund), with tests: zero-decimal and three-decimal currencies, a stale rate, a refund after the rate changed, a price-list price versus a converted price, and a currency chosen by market rather than language.
9. Run tests again and report results.
</task>

<constraints>
- Never convert with a rate that has no stored source and timestamp.
- Never reconvert a refund at today's rate.
- Do not derive currency from the interface language.
- Do not state current exchange rates, provider fees or provider currency support as facts; tell the team to check them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests and current money handling.

## Decisions
| Decision | Options | Recommendation | Confirmed |

## Data model
Schema changes.

## Currency selection
Resolution order and code.

## Conversion and rates
Provider abstraction, refresh, history and staleness rule.

## Checkout, refunds and reporting
Payment amounts, refunds and reporting conversion.

## Display
Formatting and labelling.

## Tests
The tests and the cases they cover.

## Verification
Commands and results.
</output_format>
