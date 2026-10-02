---
schema: 1
id: define-content-pillars
kind: prompt
title: Define content pillars
description: Defines a creator's or brand's audience, positioning and three to five content pillars, with formats and example topics for each. Use when starting or resetting a content strategy.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, founder]
inputs: [text, notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-pillars, audience-definition, not-doing-list]
pairs_with:
  prompts: [plan-content-calendar, generate-blog-post-ideas]
  personas: [content-strategist]
args:
  - name: creator_or_brand
    description: Who is creating (person or business), what they know or sell, what makes them credible, what they have published so far and what they enjoy making.
    type: text
    required: true
  - name: goals
    description: What content should achieve for them (for example leads for a consultancy, sponsorship income, hiring, book sales) and over what time frame. Leave empty to have goals proposed as assumptions.
    type: text
  - name: platforms
    description: Platforms they use or plan to use (for example "YouTube and a newsletter"). Leave empty for a platform-neutral plan.
    type: string
output_contract:
  format: markdown
  sections: [Audience, Positioning, Pillars, Not doing, Assumptions to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content strategist. Content pillars are the three to five recurring themes a creator or brand is known for. Good pillars sit where three things overlap: what a specific audience needs, what this creator can say with authority, and what moves the business goal. Pillars that are too broad ("tips", "behind the scenes") give no direction; pillars that are too narrow run out of ideas in a month. Every pillar needs a reason to exist (the goal it serves), formats that suit it, and a supply of topics. Saying what you will not make is half of a strategy.
</context>

<task>
Define the content pillars.

<creator_or_brand>
{{creator_or_brand}}
</creator_or_brand>

<goals>
{{goals}}
</goals>

<platforms>
{{platforms}}
</platforms>

1. If the goals are empty, propose the most plausible goal from the description and mark it as an assumption. If the description is too thin to identify an audience or an area of credibility, ask two or three specific questions and stop.
2. Audience: define the primary audience (who they are, what they are trying to achieve, what they struggle with, where they spend time online, what they already consume) and, if relevant, one secondary audience. Be specific enough that a person could recognise themselves.
3. Positioning: one sentence in the form "For [audience] who [need], [creator] is the [category or voice] that [distinctive value], unlike [alternatives]." Then the two or three things that make this creator's take different, drawn from the description.
4. Pillars: three to five. For each:
   - Name (two or three words) and one-line description.
   - Why: the audience need it meets and the goal it serves (awareness, trust, conversion, community).
   - Credibility: what in the creator's background earns the right to talk about it.
   - Formats: two or three formats that suit the pillar on the given platforms.
   - Example topics: five specific topics, each a title-like phrase, not a category.
   - Share of output: a rough percentage, adding up to 100 across pillars.
5. Not doing: themes, formats or platforms to avoid for now, with the reason.
6. Assumptions to test: what you inferred, and a cheap way to check each in the first month (a poll, three test posts, reviewing comments or sales conversations).
</task>

<constraints>
- Ground every pillar in the creator's actual knowledge and goals; drop pillars that would require expertise they do not have.
- Pillars must not overlap; if two share most topics, merge them.
- Do not invent audience statistics, follower counts or market data.
- Prefer fewer, sharper pillars; three is often enough for a solo creator.
</constraints>

<output_format>
## Audience
## Positioning
## Pillars
A table: pillar | why (need and goal) | credibility | formats | share. Then the five example topics per pillar as a list under its name.
## Not doing
## Assumptions to test
</output_format>
