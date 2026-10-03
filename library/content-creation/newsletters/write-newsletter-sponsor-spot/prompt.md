---
schema: 1
id: write-newsletter-sponsor-spot
kind: prompt
title: Write a newsletter sponsor spot
description: Writes a native newsletter sponsor spot in the writer's voice with clear disclosure, one specific reader benefit and a link worth clicking. Use for primary and secondary paid placements.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer, marketer]
inputs: [spec, text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [newsletter-sponsorship, native-ad, ad-disclosure, click-through]
pairs_with:
  prompts: [write-sponsored-post, write-newsletter-issue, write-media-kit]
args:
  - name: sponsor_brief
    description: The sponsor's product, the audience problem it solves, key points, offer or code, the link, required wording, placement (primary or secondary, word count), and anything you personally know or think about the product.
    type: text
    required: true
  - name: newsletter_voice
    description: A past issue or a few paragraphs in your voice, plus who your readers are. Leave empty for a warm, direct, first-person voice.
    type: text
output_contract:
  format: markdown
  sections: [Angle, Sponsor spot, Short version, Notes for the sponsor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write sponsor placements for independent newsletters. Readers skim past ads that look like ads; they read sponsor spots that sound like the writer, speak to a problem they recognise, and make one concrete promise. The best-performing spots are short (typically 60 to 120 words for a primary placement, 25 to 50 for a secondary one), open with the reader's situation rather than the brand name, include one specific detail (a number, a feature, a use case) instead of a list of benefits, and end with a single clear link whose text describes what happens when you click. Disclosure must be clear: a label such as "Sponsored by", "Together with" or "Thanks to our sponsor" at the start, never hidden. Writers protect their readers' trust by only endorsing personally what they have actually used.
</context>

<task>
Write a sponsor spot.

<sponsor_brief>
{{sponsor_brief}}
</sponsor_brief>

<newsletter_voice>
{{newsletter_voice}}
</newsletter_voice>

1. **Angle.** Identify the reader problem or moment the sponsor fits. Choose the single most concrete benefit or detail from the brief. Note whether the writer has used the product (from the brief); this decides whether the spot can include a personal endorsement.
2. **Sponsor spot** (primary placement, within the brief's word count or about 100 words):
   - Disclosure label first, for example "Sponsored by [Brand]" or "Together with [Brand]", following the brief's required wording if it is at least as clear.
   - A short headline (under 8 words) that names the reader benefit.
   - Opening line that starts with the reader's situation.
   - One or two sentences on what the product does, with the specific detail.
   - The offer or code, if any.
   - A call to action link with descriptive text ("Start a free 14-day trial", not "Click here"), marked `[LINK]`.
   - A personal line only if the writer has used the product, in their words from the brief.
3. **Short version:** a 25 to 50 word secondary placement with the same disclosure.
4. **Notes for the sponsor:** any claims softened or attributed, and two alternate headlines for A/B testing if they want them.
</task>

<constraints>
- Disclosure first, always, in plain words.
- No personal endorsement ("I use this every day") unless the brief says the writer actually uses it.
- Use only facts from the brief. Do not invent features, prices, trial lengths, discounts or statistics; mark gaps `[CONFIRM: …]`.
- One link and one call to action per spot.
- Match the newsletter's voice; avoid ad clichés ("revolutionise", "supercharge", "game-changer").
- Stay within the stated word counts and give the counts.
</constraints>

<output_format>
## Angle
The reader moment, the chosen detail, and whether a personal endorsement is allowed.

## Sponsor spot
The primary placement and its word count.

## Short version
The secondary placement and its word count.

## Notes for the sponsor
Changes, claims to confirm and alternate headlines.
</output_format>
