---
schema: 1
id: write-product-video-prompt
kind: prompt
title: Write product video prompts
description: Writes video-generation prompts for product reveals, spins, detail shots and in-use moments that keep shape, colour and label accurate, sized for listings, social ads or a site hero.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder]
subject: [ecommerce]
requires: [none]
inputs: [image, text, spec]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [product-video, packshot, ad-creative, product-accuracy]
pairs_with:
  prompts: [write-product-photo-prompt, write-image-to-video-motion-prompt, write-logo-sting-prompt]
args:
  - name: product_description
    description: "The product as it really is: what it is, size, shape, materials, exact colours, label or logo placement, what it does, and the claims you are allowed to make. Attach reference photos if you can."
    type: text
    required: true
  - name: shots
    description: Number of shots to plan, between 2 and 8.
    type: number
    default: 4
  - name: platform
    description: "Where the video runs: listing (marketplace or shop page, accuracy first), social-ad (vertical, hook in the first seconds), website-hero (wide, slow, loop-friendly)."
    type: enum
    enum: [listing, social-ad, website-hero]
    default: social-ad
output_contract:
  format: markdown
  sections: [Product truth sheet, Shot plan, Shot prompts, Label and logo plan, Accuracy check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Product video is the least forgiving use of video generation. A buyer compares the video with the box that arrives: if the bottle was taller on screen, the green a different green, the label rearranged or a feature shown that the product does not have, the result is returns, complaints and, for ads and listings, possible breaches of advertising and marketplace rules. Generators also redraw labels and logos as near-miss shapes. The workable approach is to describe the product with fixed, measurable wording, keep motion modest around it, get printed graphics from the real packshot in the edit, and never show a capability that has not been confirmed.
</context>

<task>
Plan {{shots}} product video shots for {{platform}}.

<product>
{{product_description}}
</product>

1. If the description lacks the product's shape and proportions, its exact colours, or where the label or logo sits, ask for them (or for reference photos) in one message and stop. If {{shots}} is outside 2 to 8, use the nearest bound and say so.
2. **Product truth sheet.** One fixed block to paste into every prompt: object type, proportions (for example "height about twice the width"), materials and finish (matte, gloss, brushed), colours by plain name plus any code given, label or logo position and size, parts that move and how. Then a list of **claims allowed** (only what the user supplied) and **never show** (features, results or scale not supplied).
3. **Shot plan.** Choose from these shot types to fit {{platform}}:
   - reveal (the product enters frame, a cover lifts, light sweeps on);
   - turn (a partial turntable rotation, usually 30 to 90 degrees, rather than a full spin, so the model does not invent the back);
   - detail (macro on texture, a seam, a button);
   - in use (a hand or person using it as it is really used, with the real result);
   - end frame (a clean packshot for the call to action).
   For **listing**: neutral background, true colour, no exaggerated effects, realistic scale with a familiar object or hand. For **social-ad**: 9:16, the product or the problem it solves on screen in the first two seconds, a clear end frame. For **website-hero**: 16:9 or wider, slow continuous motion, room for headline text, a loop-friendly ending.
4. **Shot prompts.** For each shot: shot size and angle, camera move and speed, the truth sheet pasted verbatim, the single action, setting and surface, lighting (key direction, softness, reflections controlled for glossy surfaces), duration, aspect ratio. Keep hands simple (one hand, a clear grip) and away from the label.
5. **Label and logo plan.** Recommend generating with the label area plain or turned slightly away, then tracking or compositing the real label, logo and any on-screen text from the packshot in the edit. Name the shots where that matters most.
6. **Accuracy check.** Before answering, compare every prompt against the truth sheet and the allowed claims: same proportions, colours and label position in every shot; no feature, result, size or ingredient that was not supplied. Report what you checked and anything you removed.
</task>

<constraints>
- Do not depict results, performance or features the user did not state (a blender crushing ice, a cream removing wrinkles, waterproofing). If the user asks for one that is not in the product description, ask them to confirm it is true.
- Do not imitate a competitor's branding, a real celebrity or a real influencer.
- Remind the user that platforms and regulators may require generated or altered product imagery to stay accurate, and that some listing sites restrict generated media; tell them to check the current rules for their channel.
- No tool, model or version names.
</constraints>

<output_format>
## Product truth sheet
Code block, then "Claims allowed" and "Never show" lists.
## Shot plan
Table: # | Type | Seconds | Shot and camera | Action | Purpose.
## Shot prompts
One code block per shot.
## Label and logo plan
## Accuracy check
Bulleted results.
</output_format>
