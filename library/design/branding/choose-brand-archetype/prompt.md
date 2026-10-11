---
schema: 1
id: choose-brand-archetype
kind: prompt
title: Choose a brand archetype
description: Tests which brand archetypes fit a business's real behaviour and audience, checks crowding in the category, picks a primary archetype and turns it into voice, visual and behaviour cues.
category: branding
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [brand-archetypes, brand-personality, brand-strategy, team-alignment]
pairs_with:
  prompts: [build-brand-platform, write-brand-voice-guide, analyze-competitors]
  personas: [brand-strategist]
args:
  - name: brand
    description: What the business does, its founders' story, how it behaves with customers, what it refuses to do, and the personality it hopes to have.
    type: text
    required: true
  - name: audience
    description: Who the customers are and what they want from the category.
    type: text
    required: true
  - name: competitors
    description: Main competitors and how they come across. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How to use archetypes, Candidate archetypes, Fit assessment, Recommendation, Category crowding, Expression cues, What it rules out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The twelve brand archetypes (Innocent, Explorer, Sage, Hero, Outlaw, Magician, Regular Person or Everyman, Lover, Jester, Caregiver, Creator, Ruler), popularised for marketing from Jungian ideas, are a shorthand for personality, not science. They are useful for getting a team to agree on a character and for keeping expression consistent; they are harmful when chosen for aspiration (every start-up wants to be a Hero or Magician), when they contradict how the company actually behaves, or when every brand in the category picks the same one. The test of a good choice is that it explains decisions the brand already makes and rules out things it should not do.
</context>

<task>
Help choose a brand archetype.

<brand>
{{brand}}
</brand>

<audience>
{{audience}}
</audience>
{{#competitors}}

<competitors>
{{competitors}}
</competitors>
{{/competitors}}

1. **How to use archetypes.** Two or three sentences on what archetypes are good for here and their limits.
2. **Candidate archetypes.** Three candidates that plausibly fit, each with the evidence from the brand's actual behaviour and story.
3. **Fit assessment.** Score each candidate on fit with real behaviour, appeal to the audience's motivation, room in the category, and sustainability (can the brand live it daily), with reasons.
4. **Recommendation.** One primary archetype and, if useful, a secondary influence, with the reason; say clearly if the brand's stated personality contradicts its behaviour.
5. **Category crowding.** Which archetypes competitors already express (from the input or marked "to verify"), and how the recommendation stands apart or must be expressed differently.
6. **Expression cues.** How the archetype shows in voice (example sentences), visual cues (colour temperature, imagery, type character), customer experience moments, and content themes.
7. **What it rules out.** Five things the brand should not do or say if it commits to this archetype.
</task>

<constraints>
- Present archetypes as a working tool, not a proven psychological model.
- Do not choose an archetype the brand's behaviour does not support, however aspirational.
- Do not invent competitor facts; mark assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Fit assessment as a table (Archetype, Behaviour fit, Audience fit, Room in category, Sustainability, Verdict). Expression cues as a table (Area, Cue, Example).
</output_format>
