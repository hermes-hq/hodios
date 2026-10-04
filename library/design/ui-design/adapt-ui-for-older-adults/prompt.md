---
schema: 1
id: adapt-ui-for-older-adults
kind: prompt
title: Adapt an interface for older adults
description: Adapts an interface for older adults with readable type, generous targets, plain language, forgiving flows, memory supports and easy help, without patronising or a separate senior mode.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [image, text, spec]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [older-adults, age-inclusive-design, readability, touch-targets, plain-language, wcag]
pairs_with:
  prompts: [critique-ui-screen, write-ux-microcopy, design-form-experience, plan-inclusive-usability-study]
  personas: [product-designer, ux-writer]
args:
  - name: screens
    description: Screenshots, mockups or a description of the screens and flow to adapt, including text sizes, controls, gestures, time limits and how help is offered.
    type: text
    required: true
  - name: users
    description: Who the older users are and their context, for example "people over 70 booking GP appointments on their own phones, many first-time smartphone users" or "retired professionals managing investments on a laptop".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who we are designing for, Changes by area, Revised flow, Language rewrites, What not to do, How to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Older adults are not one group: a 68-year-old engineer and an 88-year-old who got a first smartphone last year need different things. Common age-related changes still shape most designs: reduced contrast sensitivity and near vision, slower and less precise fine motor control and tremor, some hearing loss, slower processing of fast or dense information, and less tolerance for interfaces that change without warning. Lower confidence with technology often matters more than any physical change: fear of breaking something, of being scammed, or of a mistake costing money. The fixes help everyone, so the goal is one interface that works for older users, not a "senior mode" with cartoonish large buttons and a condescending tone.
</context>

<task>
Adapt these screens for older adults.

<screens>
{{screens}}
</screens>

<users>
{{users}}
</users>

1. **Who we are designing for:** summarise the range within {{users}} (abilities, devices, confidence, whether they use the product alone or with help from family or carers), and name the two or three most likely barriers in these screens for that range. Avoid stereotypes; say which assumptions should be checked in research.
2. **Changes by area.** For each area, list the problem found in the screens, the change, and why it helps:
   - **Reading:** body text large enough by default (often 16 px or more on screens), support for system text scaling up to the largest settings without truncation, strong contrast (at least WCAG AA, aim higher for body text), no light-grey placeholder text standing in for labels, left-aligned text, generous line spacing.
   - **Touch and pointer:** targets of at least 44 by 44 pt or 48 by 48 dp with space between them, no actions that need precise drags, long presses, multi-finger gestures or fast double taps without an alternative, and no hover-only controls.
   - **Understanding:** one main task per screen, visible labels instead of icon-only buttons, consistent placement of navigation and actions, no surprise layout changes, and progress shown in multi-step flows.
   - **Memory:** information carried forward rather than remembered between screens, clear "where am I" cues, saved progress, and reminders or confirmations sent by the channel the user chooses.
   - **Forgiveness:** easy undo, confirmation for actions that cost money or are irreversible, error messages that say what happened and how to fix it in plain words, no time limits or adjustable ones, and sessions that do not log out mid-task without warning.
   - **Trust and safety:** clear identity of the organisation, consistent official contact routes, and warnings about scams at the moments they happen (payments, account changes).
   - **Help:** visible, human help routes (phone, chat with a person, a named contact), help written for the task at hand, and support for a trusted helper such as a family member, with consent and without sharing passwords.
3. **Revised flow:** rewrite the main flow step by step with the changes applied.
4. **Language rewrites:** a before-and-after table for the key labels, instructions and error messages: plain words, no jargon or anglicisms, no blame, and respectful tone.
5. **What not to do:** patronising tone, childish illustrations, hiding advanced features from older users by default, "senior" labels, and voice-only or video-only help.
6. **How to test:** recruit older participants matching the range (including people with low vision, tremor, hearing loss and low tech confidence), test on their own devices with their own settings, allow extra session time, and measure task success, errors and confidence ratings.
7. Before answering, check each change against the actual screens: only list problems that the screens show or clearly imply, and mark anything not visible as "check".
8. If the screens or the users are not described enough to judge, ask for them and stop.
</task>

<constraints>
- Treat older adults as capable adults; recommend changes that keep full functionality.
- Do not claim specific prevalence statistics; describe tendencies and point to research for numbers.
- Use WCAG 2.2 as the accessibility baseline and say where the recommendation goes beyond it.
</constraints>

<output_format>
Markdown with the contract's sections in order. Changes by area as a table (Area, Problem in these screens, Change, Why). Language rewrites as a table (Before, After). The test plan as a short checklist.
</output_format>
