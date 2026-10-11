---
schema: 1
id: build-accessible-carousel
kind: prompt
title: Build or fix an accessible carousel
description: Builds or repairs a carousel or slider of slides with a pause control, labelled slides and controls, keyboard and screen-reader support, and no focus lost to hidden slides.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [carousel, auto-rotation, aria-apg, keyboard, hero-banner]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-motion-and-flashing, build-aria-widget, fix-accessible-names]
args:
  - name: carousel
    description: The carousel code or library (Swiper, Splide, Slick, Embla, custom), whether it auto-rotates, what slides contain (images, links, buttons) and how it is used (hero, product gallery, testimonials).
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Problems found, Should this be a carousel, Changes, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Carousels hide most of their content, move on their own and are often built from images with no text. The ARIA Authoring Practices carousel pattern sets the essentials: the carousel is a region with `aria-roledescription="carousel"` and a name; each slide is a group with `aria-roledescription="slide"` and a label such as "3 of 5"; previous and next are named buttons; auto-rotation has a visible pause or stop button that comes first in tab order, rotation stops while any element in the carousel has keyboard focus or the pointer is over it, and the slide container uses `aria-live="off"` while rotating and `polite` when the user changes slides manually. WCAG 2.2.2 requires a way to pause movement that starts automatically and lasts more than five seconds. Hidden slides must not be focusable: links in off-screen slides that receive Tab focus leave keyboard users looking at nothing. Slide picker dots need names ("Show slide 3") and a current state, and must meet target size. Libraries such as Splide and Swiper have accessibility options that are partly off by default. A static set of cards or a single hero is often better than a carousel, and worth suggesting.
</context>

<task>
Make this {{framework}} carousel accessible.

<carousel>
{{carousel}}
</carousel>

1. Read the carousel code or library configuration. List problems: auto-rotation without pause, focus reaching hidden slides, unnamed controls, missing slide labels, image-only slides without alternatives, swipe-only navigation, rotation that does not stop on focus or hover. Mark inferences.
2. In two or three sentences, say whether this content needs a carousel; if a static layout would serve users better, say so, then fix the carousel anyway unless the user decides otherwise.
3. Turn on the library's accessibility options first, then fill gaps with code.
4. Implement: the named region with roledescription, slide groups with "n of total" labels, named previous, next and picker buttons with `aria-current` or selected state on the current picker, a pause or play button first in order whose name reflects its state, rotation that stops on focus and hover and stays stopped once paused, and `prefers-reduced-motion` disabling auto-rotation.
5. Make hidden slides inert (`inert` or `aria-hidden` with their focusables removed from tab order), and make sure slide text and alt text carry the message if slides are images.
6. Manage live announcement: `aria-live="off"` during auto-rotation, `polite` during manual navigation.
7. Write tests for names, pause behaviour, hidden-slide focusability and keyboard navigation; run them. Give a manual keyboard and screen-reader check.
</task>

<constraints>
- Never leave auto-rotation without a visible pause control.
- Do not announce every automatic slide change.
- Keep the visual design; changes should be to behaviour, semantics and control names, plus visible focus and target size.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with WCAG criterion.

## Should this be a carousel
Short paragraph.

## Changes
Diffs with file paths, library options first.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
