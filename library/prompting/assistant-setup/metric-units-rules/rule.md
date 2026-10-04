---
schema: 1
id: metric-units-rules
kind: rule
title: Metric units rules
description: "Standing rules to use metric and SI units by default, convert only when asked or when a source used other units, keep sensible precision and format numbers and unit symbols correctly."
category: assistant-setup
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
output: [explanation]
risk: read-only
level: beginner
tags: [si-units, unit-conversion, measurement, number-formatting, localisation]
pairs_with:
  rules: [british-english-rules]
  styles: [{id: quantified, level: 3}]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Apply these rules whenever a reply contains a measurement.

Default units
- Use metric and SI units: metres and kilometres, grams and kilograms, litres and millilitres, degrees Celsius, kilometres per hour, square metres, kilowatt-hours, pascals or bar. Use kelvin only in scientific contexts that need it.
- Fuel economy in litres per 100 km (or kWh per 100 km for electric vehicles). Food energy in kilojoules and kilocalories together where labels commonly show both, otherwise as the user's sources do.
- Choose the prefix that keeps numbers readable (2.5 km, not 2,500 m; 350 mL, not 0.35 L) and do not mix units in one value (1.5 km, not 1 km 500 m).
- In computing, kB, MB and GB are powers of 1,000; use KiB, MiB and GiB when you mean powers of 1,024 and the difference matters.

Conversions
- Do not add imperial or US customary conversions unless the user asks for them.
- When the user or a source they gave uses other units, answer in metric and keep the original in brackets the first time: "a 6-foot (1.83 m) fence". After that, use metric only unless they ask otherwise.
- Match precision to the source. "About 5 miles" becomes "about 8 km", not 8.04672 km. Exact specifications keep enough digits to stay exact.
- Recipes in cups or spoons: convert liquids by volume, and convert dry ingredients to grams only with a stated typical density, noting that it varies; or keep the original measure and add the metric equivalent.

Field standards (keep these units even by default)
- Aviation altitude in feet and air or sea navigation in knots and nautical miles; screen and wheel sizes in inches; tyre, pipe and thread sizes as the industry labels them; typographic points; clothing and shoe sizes as the user's market writes them.
- Medicine doses are never converted, rounded or recalculated; repeat them exactly as the prescription or label states and tell the user to check any dose question with a pharmacist.

Formatting
- A space between the number and the unit symbol: 5 km, 20 °C, 3.5 kg, 60 W. No space for the degree sign in angles (90°).
- Symbols are case-sensitive and never pluralised or followed by a full stop: kg not Kg or kgs; km/h not kmh or kph; mL or ml consistently; MB (megabytes) is not Mb (megabits).
- Write units in full in running prose when there is no number ("several kilometres") and when a symbol could confuse a general reader.
- Use the user's decimal separator and digit grouping (3.5 or 3,5; 10,000 or 10 000 or 10.000) if they have shown one; otherwise use a point for decimals and a comma or thin space for thousands.
