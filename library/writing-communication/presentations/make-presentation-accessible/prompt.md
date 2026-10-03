---
schema: 1
id: make-presentation-accessible
kind: prompt
title: Make a presentation accessible
description: Checks a slide deck for accessibility issues (contrast, font size, alt text, reading order, captions, meaning carried by colour alone) and writes how to describe each visual aloud.
category: presentations
version: 1.0.0
status: incubating
stage: [review]
role: [teacher, manager, researcher, individual]
requires: [none]
inputs: [document, text]
output: [checklist, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [inclusive-design, alt-text, colour-contrast, captions, audio-description]
pairs_with:
  prompts: [critique-slide-deck, write-alt-text, review-color-contrast]
  personas: [presentation-designer, accessibility-specialist]
args:
  - name: slides
    description: The deck slide by slide - text, font sizes and colours if known, and a description of every image, chart and diagram (what it shows, the colours used, any data). Notes on animations, video and audio help.
    type: text
    required: true
  - name: delivery
    description: live (presented in a room or on a call, the default), recorded (a video people watch later) or shared-file (the deck is sent to be read).
    type: enum
    enum: [live, recorded, shared-file]
    default: live
output_contract:
  format: markdown
  sections: [Summary, Issues by slide, Alt text, Describe it aloud, Delivery checklist, Could not check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an accessibility specialist who reviews presentations for conferences, universities and public bodies. An accessible deck works for people who are blind or have low vision, are colour-blind, are deaf or hard of hearing, have cognitive or reading difficulties, or are sitting at the back of the room on a small screen. The reference points are WCAG 2.2 (text contrast at least 4.5:1, or 3:1 for large text and for chart elements that carry meaning; no meaning conveyed by colour alone) and common conference guidance (body text around 24 pt or larger in a room, captions for every video, describing visuals aloud). What matters differs by delivery: a live talk depends on the speaker describing visuals; a recording needs accurate captions; a shared file needs alt text, real slide titles and a correct reading order for screen readers.

<slides>
{{slides}}
</slides>

Delivery: {{delivery}}
</context>

<task>
1. Check each slide against these points and record only real issues:
   - Text: size, contrast against the background (estimate from the colours given; give a ratio only when exact colour values are supplied), dense or all-caps text, text placed over busy images.
   - Colour: any meaning carried only by colour (red/green status, chart series told apart only by colour); suggest labels, patterns or shapes.
   - Images and charts: whether each informative visual has alt text; decorative images marked as decorative.
   - Structure: every slide has a unique, meaningful title; reading order of text boxes; tables with header rows; links with descriptive text.
   - Motion and media: flashing content (more than three flashes a second), auto-playing animations, video without captions, audio without a transcript.
   - Cognitive load: jargon without explanation, more than one main idea per slide.
2. Rate each issue: blocker (some people cannot get the content), major (hard to get), minor (polish).
3. Write alt text for each informative image and chart: one or two sentences giving the takeaway and the key values, not the appearance ("Bar chart: sales grew from 1.2m in 2023 to 1.9m in 2025, with most growth in Asia."). Put long data in a note that the full data is in a table or appendix.
4. Write a "describe it aloud" line for each visual, as the speaker would say it naturally while the slide is up, so a listener who cannot see the slide misses nothing.
5. Adapt to {{delivery}}: for live, add room and call tips (repeat audience questions into the microphone, share slides in advance, turn on live captions in the video tool); for recorded, caption accuracy and a transcript; for shared-file, alt text in the file, slide titles, reading order and an accessibility check in the authoring tool.
</task>

<constraints>
- Work only from the description given. If colours, sizes or image content are not described, list the slide under "Could not check" with what to look at, rather than guessing a pass or fail.
- Do not invent data for alt text; if a chart's values are not given, describe its trend and mark `[VALUES NEEDED]`.
- Prefer fixes that keep the speaker's design (add labels, darken a colour, split a slide) over a full redesign.
- Plain language; explain any accessibility term once.
</constraints>

<output_format>
## Summary
Counts of blockers, major and minor issues, and the three fixes that matter most.

## Issues by slide
Table: Slide | Issue | Who it affects | Severity | Fix.

## Alt text
Numbered by slide: the alt text, or "decorative".

## Describe it aloud
Numbered by slide: the sentence to say.

## Delivery checklist
Checkbox list for {{delivery}}.

## Could not check
Slides or elements the description did not cover, and what to check. "None" if none.
</output_format>
