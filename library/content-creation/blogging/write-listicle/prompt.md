---
schema: 1
id: write-listicle
kind: prompt
title: Write a listicle
description: Writes a numbered list article with a sharp angle, substantive items, a deliberate order and no padding, cutting the count rather than adding filler. Use for list posts that should earn the format.
category: blogging
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer, content-creator, marketer]
inputs: [topic, notes]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [list-post, numbered-list, article-structure, skimmable-writing]
pairs_with:
  prompts: [write-article-headlines-and-standfirsts, write-blog-post-draft, generate-blog-post-ideas]
args:
  - name: topic
    description: What the list is about, plus any notes, examples, tools, numbers or experiences you want included. The more of your own material, the less generic the list.
    type: text
    required: true
  - name: count
    description: The target number of items. Treated as a ceiling, not a quota.
    type: number
    default: 10
  - name: audience
    description: Who reads it and what they already know (for example "first-time home bakers" or "SaaS founders past 50 customers"). Leave empty to have one proposed.
    type: string
output_contract:
  format: markdown
  sections: [Angle, Listicle, Fill before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a features editor who rescues list articles. A list earns its format when the reader can act on, compare or remember each item on its own, and when the set as a whole answers one question better than prose would. Weak listicles share the same faults: a vague promise ("10 tips for productivity"), items that overlap or restate each other, two strong entries padded out with eight obvious ones to hit a round number, no reason for the order, and items that are a bolded phrase followed by a sentence of nothing. Strong ones have a specific angle and reader, items that are each a distinct, concrete idea with a reason and an example, an order the reader can feel (most important first, sequence, difficulty, or grouped by situation), and a short intro and close that frame rather than pad.
</context>

<task>
Write a list article with up to {{count}} items.

Audience: {{audience}}

<topic_and_notes>
{{topic}}
</topic_and_notes>

1. If the audience is empty, propose the most likely reader in one line and write for them.
2. Choose an angle: the specific question the list answers and for whom. Offer the chosen angle and one alternative in a line each.
3. Brainstorm more candidate items than you need, then cut: merge items that overlap, drop anything an informed reader already knows, and drop anything you cannot support with a reason and an example. If fewer than {{count}} items survive, publish the smaller number and say so; never pad to reach the count.
4. Pick an ordering principle (priority, sequence, difficulty, cost, or grouped by situation) and state it.
5. Write the article:
   - Headline: the number of surviving items, the reader or situation, and the payoff. No "you won't believe".
   - Intro: two to four sentences on who this is for and how to use the list. No definitions or history.
   - Each item: a subheading that states the idea itself (not a teaser), then what to do or know, why it matters, and a concrete example, number or case from the notes. Keep items parallel in shape and roughly even in length; one to three short paragraphs each.
   - Close: how to choose or where to start, not a recap.
6. List the items you cut and why, so the writer can restore any they disagree with.
</task>

<constraints>
- Use the writer's notes as the main source. Facts, figures, product names, prices or studies not in the notes become `[VERIFY: …]` or `[EXAMPLE NEEDED: …]`; do not invent them.
- Each item must be distinct; if two would give the reader the same action, merge them.
- No filler items such as "stay consistent", "do your research" or "have fun" unless the notes give them a specific, non-obvious form.
- Plain language, active voice, no hype words ("ultimate", "game-changing", "must-have").
</constraints>

<output_format>
## Angle
The chosen angle and reader, one alternative, and the ordering principle.

## Listicle
The full article in Markdown, ready to edit.

## Fill before publishing
Placeholders to fill, claims to verify, and the cut items with one reason each.
</output_format>

<examples>
Weak item: "**3. Use the right tools.** Having good tools makes a big difference."
Strong item: "**3. Weigh flour instead of using cups.** A cup of flour can vary by 30 grams depending on how it is scooped, which is enough to turn a soft loaf dense. A basic kitchen scale fixes it; set the bowl on it, zero it, and pour."
</examples>
