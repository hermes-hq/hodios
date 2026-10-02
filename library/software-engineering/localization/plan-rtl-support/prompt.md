---
schema: 1
id: plan-rtl-support
kind: prompt
title: Plan and implement right-to-left support
description: Plans and implements right-to-left layout support (logical properties, mirroring rules, bidi text, icons) for a web or mobile UI. Use when adding Arabic, Hebrew, Persian or Urdu.
category: localization
version: 1.0.0
status: incubating
stage: [plan, build]
role: [frontend-engineer, mobile-engineer]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [plan, diff, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rtl, bidi, mirroring, logical-properties]
pairs_with:
  prompts: [review-i18n-readiness]
args:
  - name: code_area
    description: The screens, components or paths to make RTL-ready, or the whole app.
    type: text
    required: true
  - name: platform
    description: UI platform.
    type: enum
    enum: [web, ios, android, flutter]
    default: web
  - name: rtl_locales
    description: Right-to-left locales to support.
    type: string
    default: ar, he
output_contract:
  format: markdown
  sections: [Audit, Mirroring decisions, Plan, Changes, Test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Right-to-left support is not `transform: scaleX(-1)` on the whole page. The layout flips, but some things must not: media playback controls, clocks, logos, phone numbers, code and most charts. Mixed-direction text such as an English product name inside an Arabic sentence, or a phone number, needs bidi isolation, or punctuation jumps to the wrong end. Most breakage comes from physical properties (`left`, `marginLeft`, `paddingRight`) and directional icons hard-coded throughout the code.
</context>

<task>
Make {{code_area}} ready for the right-to-left locales {{rtl_locales}} on {{platform}}.

1. **Audit** the code for direction-dependent code, with file and line:
   - **web:** physical CSS (`margin-left`, `padding-right`, `left`, `right`, `text-align: left`, `border-left`, `float`, and corner-specific radii), `translateX` and directional animations, `background-position`, absolute positioning, and a missing `dir` or `lang` on `html`.
   - **ios:** left and right constraints instead of leading and trailing, `NSTextAlignment.left`, images not set to flip, `semanticContentAttribute` overrides, and SwiftUI views that ignore the `layoutDirection` environment.
   - **android:** `android:supportsRtl` missing, left and right attributes instead of start and end (Android Lint flags these as `RtlHardcoded`), and vector drawables without `autoMirrored`.
   - **flutter:** `EdgeInsets.only(left:)`, `Alignment.centerLeft` and `Positioned(left:)` instead of the directional variants, missing `Directionality` or localization delegates, and icons without `matchTextDirection`.
2. **Decide mirroring** for every icon and visual, in a table:
   - Mirror back and forward arrows, chevrons, progress direction, list and indent icons, sliders, and "send" or "reply" arrows.
   - Do not mirror media play and fast-forward, clocks and circular refresh, checkmarks, logos, brand marks, keyboard and code text, or icons showing a real-world object held in the right hand.
   - Charts: time axes in RTL locales are a product decision; flag it rather than flipping silently.
3. **Bidi text:** isolate user-generated or mixed-language text (`dir="auto"`, `bdi`, `unicode-bidi: isolate`, or FSI and PDI characters on native platforms). Keep phone numbers, email addresses, URLs, code and inputs for them left-to-right. Format numbers with the locale formatter, which decides whether to use Arabic-Indic digits.
4. **Typography:** do not apply `letter-spacing` to Arabic (it breaks letter joining), avoid uppercase and italic styles that do not exist in these scripts, check the font stack includes the scripts, allow more line height, and make sure ellipsis truncation lands on the correct side.
5. **Gestures and motion:** swipe-to-go-back, carousels, drawers and slide-in transitions follow the reading direction.
6. **Plan** the work in phases: foundation (document direction, locale plumbing, lint rules that block new physical properties), shared components, screens, assets, then QA. Give each phase an S, M or L effort and note its dependencies.
7. **Implement** the foundation and the changes in {{code_area}}. Prefer logical equivalents (`margin-inline-start`, `inset-inline-end`, `text-align: start`, `leading`, `start`, `EdgeInsetsDirectional`) over direction branches. Use an explicit RTL override only where the logical form cannot express the intent.
</task>

<constraints>
- Do not flip the whole UI with a mirror transform.
- Left-to-right rendering must not change. Verify that each change renders the same in LTR.
- Translation is out of scope. Use a pseudo-RTL locale or the platform's force-RTL option for testing.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Audit
| File:line | Issue | Fix |

## Mirroring decisions
| Element | Mirror? | Reason |

## Plan
Phases with effort, dependencies and a done-when line each.

## Changes
A unified diff for the foundation and {{code_area}}.

## Test checklist
How to switch to RTL on {{platform}} (the `dir` attribute, the Xcode right-to-left pseudolanguage, Android's "Force RTL layout direction" developer option, or Flutter's `Directionality` override), plus the screens and states to compare in LTR and RTL screenshots.
</output_format>
