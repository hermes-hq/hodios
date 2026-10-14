---
schema: 1
id: write-brand-scent-brief
kind: prompt
title: Write a brand scent brief
description: Writes a brief for a signature brand scent for a hotel, shop, venue or product, translating brand attributes into scent direction, intensity, health and inclusion limits and a testing process.
category: branding
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, operations-manager, founder]
requires: [none]
inputs: [text, preferences]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [scent-branding, sensory-branding, brand-experience, retail-experience, hotel-experience]
pairs_with:
  prompts: [write-sonic-branding-brief, build-brand-platform, plan-visual-merchandising]
  personas: [brand-strategist]
args:
  - name: brand
    description: The brand, its personality and positioning, its customers, and the feeling it wants to create.
    type: text
    required: true
  - name: applications
    description: Where the scent would be used - lobbies, shops, events, packaging, candles or products for sale - with space sizes, ventilation, and whether food is served nearby.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Objectives, Brand-to-scent translation, Applications, Olfactive direction, Intensity and diffusion, Health and inclusion, Evaluation process, Brief summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scent is strongly tied to memory, which is why hotels and shops commission signature scents. Briefs usually fail by asking for a "luxurious, fresh, welcoming" scent that could be anything, by ignoring where it will be used (a scent that works in a 30 square metre boutique overwhelms a small lift and clashes with a restaurant), and by forgetting that many people are sensitive or allergic to fragrance and that staff breathe it all day. A good brief translates brand attributes into olfactive language that perfumers use (families such as citrus, green, floral, woody, amber and musk; top, heart and base notes), sets intensity limits per space, asks for compliance with fragrance safety standards such as those of IFRA and local product rules, and plans blind testing with real customers and staff. Scent effects on mood or sales are often overstated; the brief should not promise them.
</context>

<task>
Write a scent brief for this brand.

<brand>
{{brand}}
</brand>

<applications>
{{applications}}
</applications>

1. **Objectives.** What the scent should do (be recognised, create a feeling of arrival, extend into products) and how success will be judged, without promising sales or mood effects.
2. **Brand-to-scent translation.** For each brand attribute, olfactive associations and what to avoid, noting cultural differences in how scents are perceived if the brand works across markets.
3. **Applications.** Each space or product with its size, airflow, other smells present (food, cleaning products, materials) and the role of scent there; places where scent should not be used (restaurants, treatment rooms, lifts, staff rest areas) unless tested.
4. **Olfactive direction.** Two or three directions for the perfumer, each with families, example note ideas for top, heart and base, the character, and the brand reason. Present notes as ideas for the perfumer, not a formula.
5. **Intensity and diffusion.** Intensity targets per space (barely noticed, noticeable at entrance), diffusion method (HVAC system, standalone diffusers, timed cycles), and turning it down or off in quiet hours.
6. **Health and inclusion.** Fragrance sensitivity, asthma and allergies among guests and staff, a scent-free zone or option, compliance with fragrance safety standards and any product labelling rules for retail items (to check locally), staff consultation, and a way for people to give feedback.
7. **Evaluation process.** Shortlisting with the scent supplier, blind testing in the real spaces with customers and staff, recognition and liking checks after a period, and a long-term supply and consistency plan.
8. **Brief summary.** A one-page brief the supplier can receive: brand, objectives, directions, applications, constraints, timeline, and what to deliver at each stage.
</task>

<constraints>
- Do not claim health, wellbeing or sales effects of scent as fact.
- Do not name specific commercial perfumes or suppliers as references unless the user does; describe notes instead.
- Product safety and labelling rules vary by country; flag them for the supplier and the user to confirm.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Brand-to-scent translation as a table (Attribute, Olfactive association, Avoid). Applications as a table (Space or product, Conditions, Role, Intensity).
</output_format>
