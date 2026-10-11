---
schema: 1
id: design-brand-mascot
kind: prompt
title: Design a brand mascot
description: Develops a brand mascot or character with its role, concept options, personality and voice, design principles for recognition at any size, a character sheet brief, usage rules and risks.
category: branding
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, graphic-designer, founder, artist]
requires: [none]
inputs: [text, preferences]
output: [ideas, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mascot, brand-character, distinctive-assets, character-design, visual-identity]
pairs_with:
  prompts: [design-logo-concepts, build-brand-platform, write-character-consistency-prompts, build-brand-guidelines]
  personas: [brand-strategist, art-director]
args:
  - name: brand
    description: The brand, its personality, audience, category, existing identity and what it sells.
    type: text
    required: true
  - name: purpose
    description: What the mascot should do - attract children, make a dry service friendly, guide users in an app, appear on packaging, star in social videos.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Role, Concept options, Personality and voice, Design principles, Character sheet brief, Usage rules, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Characters are among the most recognisable brand assets, because people remember faces and personalities better than abstract marks. They pay off only with long, consistent use: a mascot redesigned every two years or used once on a launch poster wastes the investment. Good characters have a clear role (guide, friend, troublemaker, expert), a silhouette recognisable in solid black, simple shapes that survive a favicon and an animation, and a limited set of expressions and poses that anyone can use correctly. Risks include cultural caricature and stereotypes, a character that dominates the brand, rules on marketing to children (food and drink especially) that differ by country, and unclear ownership when a freelancer draws it.
</context>

<task>
Design a mascot for this brand.

<brand>
{{brand}}
</brand>

<purpose>
{{purpose}}
</purpose>

1. **Role.** The mascot's job in the brand and where it appears (packaging, app, social, events, support chat), and whether a mascot is the right tool at all compared with other distinctive assets.
2. **Concept options.** Three character concepts (for example an animal, an object brought to life, an abstract creature), each with the idea linking it to the brand, a short description, and why it suits the audience.
3. **Personality and voice.** For the recommended concept: three personality traits, how it speaks with sample lines, what it never does, and how it behaves when things go wrong for a customer.
4. **Design principles.** Silhouette test, basic shapes, colour from the brand palette, proportions, how it simplifies to an icon, how it moves, and its relationship to the logo (beside, replacing, never inside).
5. **Character sheet brief.** What the illustrator delivers: turnaround (front, side, back, three-quarter), expression set, key poses, size and colour variants, do and don't examples, and file formats, plus a note that copyright in the final artwork should be assigned or licensed to the brand in writing.
6. **Usage rules.** Where it appears and where not (for example not on legal notices or bad-news emails), how many poses per layout, minimum size, who can create new poses, and how to keep consistency when using illustrators or image tools.
7. **Risks.** Stereotypes and cultural sensitivities to avoid, marketing to children rules to check locally, resemblance to existing characters (marked to verify), and dependency on a single illustrator.
</task>

<constraints>
- Avoid characters based on ethnic, national or disability stereotypes, or on real people without permission.
- Do not design a character that resembles a known existing mascot; if a concept edges close, change it.
- Do not state rules on advertising to children as fact for a country; flag them to check.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Concept options as a table (Concept, Idea, Description, Audience fit). Usage rules as do and don't lists.
</output_format>
