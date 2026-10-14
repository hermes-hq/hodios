---
schema: 1
id: localize-units-of-measure
kind: prompt
title: Localize units of measure
description: Adds metric, US and UK units with per-region defaults, a user override, conversion from a canonical stored unit, correct precision and rounding, and locale-aware unit formatting.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, mobile-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [measurement-system, unit-conversion, metric-imperial, cldr, user-preferences]
pairs_with:
  prompts: [implement-locale-formatting, parse-localized-user-input, review-diff-for-numeric-and-unit-bugs]
args:
  - name: scope
    description: Features showing or accepting measurements (distance, speed, weight, body measurements, temperature, volume, area, fuel economy), and the platform.
    type: text
    required: true
  - name: regions
    description: Markets served, for example "US, UK, Canada, Germany, India".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Inventory, Defaults and preference, Conversion layer, Display and input, Tests, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Metric or imperial" is not one switch. The US uses US customary units (miles, pounds, Fahrenheit, US gallons and cups); the UK uses miles and miles per hour on roads, stones and pounds for body weight, pints for beer and milk, but Celsius and metric for most else; Canada mixes metric officially with feet and pounds in everyday use for height and body weight. Imperial and US gallons and fluid ounces differ. CLDR records a measurement system per region and unit preferences by usage (person height, road distance, weather temperature), and some platforms expose them (Apple's locale measurement system, Android's ICU locale data, ICU's unit preference APIs); the web's `Intl` formats units but does not tell which system to use. Values must be stored in one canonical unit and converted only for display, and user edits converted back with enough precision that repeated edits do not drift. Temperature conversion is affine, so converting a temperature difference differs from converting a reading. Fuel economy is inverse between L/100 km and miles per gallon. Precision depends on usage: a road distance in whole miles, a recipe in fractions, a body weight to a tenth.
</context>

<task>
Localize units of measure in {{scope}} for {{regions}}.

1. Run the build and tests and record the baseline. Stop and report if they fail.
2. Inventory every measurement shown or entered: quantity, usage, stored unit, displayed unit, conversion code today, rounding, and whether temperature differences or inverse units appear.
3. Defaults and preference: derive the default per usage from the user's region (not language), using platform or CLDR data where available and a small explicit table otherwise; add a user preference (system default, metric, US, UK) stored with the user's settings, and say where the region comes from.
4. Conversion layer: one module with the canonical unit per quantity, conversions with exact factors, affine handling for temperature readings and linear handling for temperature differences, inverse conversion for fuel economy, compound display where usage needs it (feet and inches, stones and pounds), and rounding rules per usage. Use an established units library if the project already has one.
5. Display and input: format with the platform's unit formatter for the viewer's locale (short, long or narrow), and for input accept the displayed unit and convert back to the canonical unit at full precision so editing without changes does not alter the stored value.
6. Tests: each region's defaults per usage, round trips that do not drift, a temperature difference versus a reading, fuel economy inverse, US versus imperial gallons, compound height and weight, and rounding at boundaries.
7. Run build and tests again and report results.
</task>

<constraints>
- Store one canonical unit per quantity; never store display values.
- Do not tie the unit system to the interface language.
- Do not change stored data in bulk; if existing data is in mixed units, list it under Needs a decision.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Baseline
Build and tests before changes.

## Inventory
| Feature | Quantity and usage | Stored unit | Shown as | Problem |

## Defaults and preference
Default table per region and usage, and the preference setting.

## Conversion layer
The module code.

## Display and input
Formatting and input conversion changes.

## Tests
The tests and cases covered.

## Verification
Commands and results.

## Needs a decision
Mixed-unit data, unclear regions and usage questions.
</output_format>
