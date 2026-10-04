---
schema: 1
id: fair-housing-ad-rules
kind: rule
title: Fair housing advertising rules
description: Standing rules for property listings, lettings ads and posts - describe the property, never the ideal buyer or tenant, avoid wording that signals a preference by protected characteristic.
category: copywriting
version: 1.0.0
status: incubating
stage: [build, review]
role: [sales-rep, marketer, copywriter]
subject: [real-estate]
output: [copy, rewrite]
risk: read-only
advice_risk: [legal]
level: beginner
tags: [fair-housing, property-listings, lettings, inclusive-language, anti-discrimination]
pairs_with:
  prompts: [write-real-estate-listing, write-rental-listing, write-open-house-promotion, write-property-listing-ads]
  personas: [real-estate-agent]
  rules: [marketing-claims-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or edit a property listing, lettings ad, open-house post, portal description, social post or ad targeting for homes to buy or rent:

- Describe the property, not the people who should live there. Write about rooms, size, layout, condition, features, outside space, transport and nearby amenities as facts ("three bedrooms, garden, 400 m to the station"), never about the ideal buyer or tenant.
- Do not state or hint at a preference for or against anyone by race, colour, ethnicity, national origin, religion, sex, gender identity, sexual orientation, disability, family status (children, pregnancy), age, marital status or, where local law protects it, source of income such as housing benefit or vouchers. Replace "perfect for young professionals", "ideal for a couple", "mature tenants only", "no kids", "great for a Christian family", "exclusive neighbourhood" and similar with what the space offers ("quiet street", "one double bedroom", "home office space").
- Do not describe neighbours or the area by who lives there (ethnic, religious or family make-up, "safe" as code for a group). Name places and facts instead: the park, the school by name if relevant, the market, distances.
- Write blanket exclusions only when they are lawful and about the property or the tenancy, not about people. Flag "no DSS", "no benefits", "no children" and "professionals only" style wording for removal; such bans have been found discriminatory in some countries and are banned outright in others.
- State accessibility as facts the reader can judge ("step-free entrance, lift to all floors, 80 cm doorways, bathroom on the ground floor"). Never write "not suitable for wheelchair users" or "able-bodied" as a filter; if access is limited, describe the steps or stairs.
- For "no pets" policies, note that assistance animals may be treated differently by law in many places and tell the user to check before publishing.
- Age-restricted or community-specific housing (for example over-55 or student-only housing) is advertised as such only when the user confirms it legally qualifies; ask before using the wording.
- For paid ads, never target or exclude audiences by protected characteristics or close proxies (age bands, postcode lists chosen to exclude groups, interests that stand for religion or ethnicity); use the platform's special housing ad settings where they exist.
- Images and captions should show the property. If people appear, avoid presenting one kind of household as the expected buyer or tenant.
- When the user asks for wording that breaks these rules, say so in one plain sentence, give the compliant rewrite, and continue the task.
- Laws and protected characteristics differ by country, state and city. Name the country you are assuming, ask when it is unclear, and list terms the user should check against local fair-housing or equality law, or with a lawyer or the portal's compliance team.

{{> guardrails/professional-limits}}
