---
schema: 1
id: define-motion-identity
kind: prompt
title: Define a brand motion identity
description: Defines how a brand moves - motion personality, principles, timing and easing, logo animation, transitions and kinetic type - aligned across marketing and product, with reduced-motion rules.
category: branding
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, designer, marketer]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [motion-design, logo-animation, kinetic-typography, visual-identity, reduced-motion]
pairs_with:
  prompts: [build-brand-guidelines, write-sonic-branding-brief, spec-motion-and-microinteractions, write-logo-sting-prompt]
  personas: [brand-strategist, art-director]
args:
  - name: brand
    description: The brand's personality, visual identity (logo, graphic device, colours, type) and any existing animations.
    type: text
    required: true
  - name: applications
    description: Where motion appears, for example "logo sting at the end of videos, social posts, event screens, app onboarding, presentations".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Motion personality, Principles, Timing and easing, Logo animation, Transitions and type, Marketing and product alignment, Accessibility, Deliverables]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brands now move more often than they sit still: in video, social, presentations, event screens and products. Without rules, every agency and editor animates the logo differently, and the brand feels inconsistent even when every frame follows the static guidelines. A motion identity translates personality into physical behaviour: a calm, premium brand moves slowly with long, smooth easing; a playful one overshoots and bounces; a precise technical one moves in straight lines with crisp stops. It needs a small set of durations and easing curves, a logo animation that resolves to the correct static lock-up, and rules for transitions and text. Motion can also harm: flashing above about three times per second can trigger seizures, and large movement causes discomfort for people with vestibular disorders, so reduced-motion versions are part of the system.
</context>

<task>
Define a motion identity for this brand.

<brand>
{{brand}}
</brand>

<applications>
{{applications}}
</applications>

1. **Motion personality.** Three adjectives for how the brand moves, derived from its personality, with what each means physically (speed, weight, direction, rhythm).
2. **Principles.** Four to six principles, each with a short rule and a do and don't example, such as where motion starts from, how elements enter and leave, and how much moves at once.
3. **Timing and easing.** A small duration scale (for example short, medium and long in milliseconds) with uses, two or three named easing curves with their cubic-bezier values or descriptions, and a stagger rule.
4. **Logo animation.** One to three versions (full sting of about 2 to 4 seconds, short version, loop or idle), the build sequence step by step, the end frame that must equal the static logo, sync points with any sonic logo, and versions for vertical and square formats.
5. **Transitions and type.** Scene and slide transitions, kinetic type rules (reading time on screen, maximum words moving at once, no animating body text), and how the graphic device and colour can move.
6. **Marketing and product alignment.** Which principles and curves are shared with product interface motion and which differ, so ads and the product feel like one brand.
7. **Accessibility.** No flashing above three per second, reduced-motion variants (fade instead of travel) that respect the user's operating system setting in digital products, pause controls for looping content, and captions for any spoken or sound-led animation.
8. **Deliverables.** The files and templates to produce (motion guidelines page, logo animation masters in common formats, editable templates for video tools, a reference video showing principles), and who maintains them.
</task>

<constraints>
- Ground every rule in the brand's personality; do not apply generic trendy motion.
- Keep the system small enough for editors and agencies to follow.
- Do not invent the brand's existing assets; use placeholders where the input is missing.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Timing and easing as a table (Token, Value, Use). Logo animation as numbered build steps per version. Deliverables as a checklist.
</output_format>
