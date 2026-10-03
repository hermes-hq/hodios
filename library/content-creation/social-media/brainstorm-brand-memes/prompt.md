---
schema: 1
id: brainstorm-brand-memes
kind: prompt
title: Brainstorm on-brand memes
description: Brainstorms on-brand meme and trend ideas with formats, captions, audience fit and a tone, timing and rights check for each. Use when a brand wants to join internet culture without cringe.
category: social-media
version: 1.0.0
status: incubating
stage: [discover, build]
role: [marketer, content-creator]
inputs: [topic, preferences]
output: [ideas, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [memes, trend-jacking, brand-voice, internet-culture, risk-check]
pairs_with:
  prompts: [adapt-trend-format, deconstruct-viral-post, handle-social-media-backlash]
  personas: [social-media-manager]
args:
  - name: brand
    description: The brand, what it sells, its voice and how far its humour can go, topics it must avoid, and the platforms it posts on. Add any current trends or meme formats you are considering.
    type: text
    required: true
  - name: audience
    description: Who the memes are for, such as age range, interests and the in-jokes they share.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Humour brief, Ideas, Risk check, Go or no-go checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help brands make memes that their audience shares rather than cringes at. Brand memes work when the joke is about a truth the audience already lives (the struggle of the product's category, a shared experience, an industry in-joke), the brand is the butt of the joke or a fellow sufferer rather than the hero, and the format is used the way the internet uses it. They fail when the brand forces its product into a format, arrives after the trend has peaked, misunderstands a format's meaning, or jokes during a tragedy or about a sensitive group. Rights matter more for brands than individuals: many meme templates are copyrighted images or film stills, and using a real person's likeness to promote a product can require permission; original illustrations, the brand's own photos, text-only formats and licensed assets are safer. You cannot see which trends are live today, so timing must be checked by the team.
</context>

<task>
<brand>
{{brand}}
</brand>

<audience>
{{audience}}
</audience>

1. **Humour brief.** In four or five lines: the shared truths the audience lives with that the brand can joke about, the brand's comic role (self-deprecating, fellow sufferer, straight man, absurdist), the line it does not cross, and topics to avoid.
2. **Ideas.** Ten to fifteen ideas across these sources:
   - **Evergreen formats** that do not depend on a trend (text posts, "nobody: / me:", expectation versus reality, the brand's own photo with a caption, a relatable list).
   - **Category truths:** jokes about the problem the product solves, without selling the product.
   - **Formats or trends the user named**, if any.
   - **Brand-original formats** the account could own and repeat.
   For each idea: the format, the caption or text, the visual (described so a designer can make it from original or licensed assets), why this audience will get it, and the platform it suits best.
3. **Risk check** for every idea, rated green, amber or red, against: tone (could it read as mocking a group or punching down?), timing (is it tied to a trend that may have peaked or an event that may become sensitive?), rights (copyrighted template, real person's likeness, music), accuracy (does the joke imply a claim the brand cannot support?), and fit (would a regular customer find it in character?). Say what would make an amber idea green.
4. **Go or no-go checklist** for the team to run before posting any meme, including checking the news that day.
</task>

<constraints>
- At most a third of the ideas may mention the product; the rest earn attention with the audience's world.
- Never suggest jokes about tragedies, disasters, protected characteristics, or real private individuals.
- Do not claim a trend is current; label trend-dependent ideas "check it is still live".
- Prefer formats that can be recreated with original or licensed visuals; flag any idea that would rely on a copyrighted image or a real person's likeness.
- If the brand's voice or limits are not described, ask about them at the end and keep the ideas mild.
</constraints>

<output_format>
## Humour brief
## Ideas
A table: # | format | caption or text | visual | why it lands | platform.

## Risk check
A table: # | rating | main risk | how to fix.

## Go or no-go checklist
A short checklist.
</output_format>
