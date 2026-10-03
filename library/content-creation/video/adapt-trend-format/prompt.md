---
schema: 1
id: adapt-trend-format
kind: prompt
title: Adapt a trend to your niche
description: Adapts a trending short-video format or sound to a creator's niche with a fit verdict, three concepts, why each fits the audience and when to skip the trend. Use before jumping on a trend.
category: video
version: 1.0.0
status: incubating
stage: [design]
role: [content-creator, marketer]
stack: [tiktok, instagram, youtube]
inputs: [text, preferences]
output: [ideas, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [trends, short-form-video, trending-audio, brand-safety]
pairs_with:
  prompts: [write-short-form-script, write-video-hooks]
  personas: [social-media-manager]
args:
  - name: trend_description
    description: What the trend is, as specifically as you can, for example the sound, the on-screen format, the joke or structure, two or three example posts in your words, and roughly when it started.
    type: text
    required: true
  - name: niche_and_audience
    description: What your account is about, who follows it and what they come for.
    type: text
    required: true
  - name: brand_limits
    description: Anything off-limits, for example topics, humour styles, licensed-music rules for business accounts, or client approval steps.
    type: text
output_contract:
  format: markdown
  sections: [How the trend works, Fit verdict, Concepts, Skip if, Timing and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators and brand accounts decide whether and how to use a short-video trend. A trend is a shared template: a sound, a visual format, a joke structure or a prompt that viewers already recognise, so a good adaptation borrows that recognition and adds the creator's own specific angle. Copying the trend straight rarely helps a niche account: it reaches people who will never care about the niche. Adapting works when the trend's underlying mechanic (the contrast, the reveal, the relatable confession, the before and after) maps onto a real situation from the niche that the audience instantly recognises. Trends also fade quickly and some carry risk: an origin in tragedy or mockery, dangerous challenges, or sounds that business accounts may not use commercially.
</context>

<task>
<trend>
{{trend_description}}
</trend>

<account>
{{niche_and_audience}}
</account>

<limits>
{{brand_limits}}
</limits>

1. Describe how the trend works: the mechanic underneath the surface (structure, timing, the beat where the payoff lands, what the audience is laughing at or relating to). Separate what is essential to be recognised from what can change.
2. Give a fit verdict: do it, adapt it loosely, or skip it, with the reasons in two or three lines. Base it on the mechanic's match with the niche, the audience's likely recognition of the trend, the limits, and the risks below.
3. Unless the verdict is skip, write three concepts that apply the mechanic to specific niche situations. For each: a one-line concept, the beats with on-screen text and action (under 20 seconds unless the trend is longer), why this audience will recognise it, the effort to film, and one variant if the first take does not land. If the verdict is skip, give one alternative that uses the same mechanic without the trend.
4. List the "skip if" conditions for this trend and account.
5. Say what to check before posting and how fast to act.
</task>

<constraints>
- Work only from the trend as described. If the description is too vague to identify the mechanic, ask two or three specific questions instead of guessing.
- Do not claim the trend is rising, peaking or fading; tell the creator how to check (recent posts using the sound or format, their dates and engagement) and what each pattern would mean.
- Business and brand accounts: remind them to use the platform's commercially licensed sound library or original audio, and to respect any client approval step in the limits.
- Credit the original creator when a format is clearly one person's work, and never copy their content verbatim.
- Skip trends that mock a group, rely on real tragedy, involve danger or medical risk, or conflict with the limits; say so plainly.
</constraints>

<output_format>
## How the trend works
The mechanic, then essential versus changeable elements.

## Fit verdict
Do it, adapt loosely or skip, with reasons.

## Concepts
Three numbered concepts with the fields above (or one alternative if skipping).

## Skip if
Bullets.

## Timing and checks
What to verify before posting and how quickly to act.
</output_format>
