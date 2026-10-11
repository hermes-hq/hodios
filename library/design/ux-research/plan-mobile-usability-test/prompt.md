---
schema: 1
id: plan-mobile-usability-test
kind: prompt
title: Plan a mobile app usability test
description: Plans a usability test of a mobile app or mobile site with device choice, recording setup, in-context tasks, and how to handle notifications, connectivity, permissions and one-handed use.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, mobile-engineer]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mobile-testing, device-setup, session-recording, mobile-app, field-testing]
pairs_with:
  prompts: [write-usability-test-plan, prepare-prototype-for-usability-test, adapt-design-for-mobile]
  personas: [ux-researcher]
args:
  - name: app
    description: The app or mobile site, what is being tested (prototype, beta build, live app), and the key tasks.
    type: text
    required: true
  - name: format
    description: Moderated in person, moderated remote or unmoderated, and the participants' devices (iOS, Android, own phone or a test phone).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Format and device decisions, Recording setup, Tasks in context, Mobile-specific conditions, Consent and privacy, Pilot checklist, Analysis notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mobile tests break in ways desktop tests do not. Lending people a test phone hides their real habits (their keyboard, text size, gestures, the apps they switch to) and puts iOS users on Android or the reverse, which turns the session into a test of the platform. Using their own phone is more realistic but raises privacy issues: notifications, messages and photos can appear on a shared screen. Recording is awkward: screen recording misses hands and gestures, a document camera or sleeve shows fingers but fixes the phone on a table, and remote screen-sharing on mobile varies by platform and often needs a separate app. Mobile use also happens in context, interrupted, one-handed, on poor connections, with permission prompts and app switches (to email for a code, to a banking app for approval) that a prototype often cannot reproduce. Text entry and slow loading are frequent hidden sources of failure.
</context>

<task>
<app>
{{app}}
</app>

<format>
{{format}}
</format>

1. Format and device decisions: own phone versus test phone with the trade-off for this study, the platform mix to recruit, OS version and text-size settings to note, and installing builds (beta distribution or a prototype viewer) before the session.
2. Recording setup: options suited to the format (screen recording, mirroring, document camera or sleeve, remote screen share with a backup camera view), with what each captures and misses; a fallback if recording fails.
3. Tasks in context: 4 to 6 realistic tasks, including at least one that involves switching apps, receiving a code or notification, or resuming after an interruption.
4. Mobile-specific conditions: how to handle notifications (ask participants to enable do not disturb), connectivity (test on the real network or simulate slow), permission prompts, orientation, one-handed or on-the-move use if relevant, and keyboard or autofill behaviour.
5. Consent and privacy: what will be visible on screen, how participants can hide personal content, and redaction of recordings.
6. Pilot checklist: everything to test in a dry run on each platform.
7. Analysis notes: what to log per task (success, errors, gestures, mis-taps, rotations, waits) and how to separate platform issues from design issues.
</task>

<constraints>
- Do not name a specific recording product as required; describe the setup and say to check tools the team already has.
- Protect participants' personal content on their own phones; never ask them to show private apps or messages.
- Do not invent platform rules; say to check current OS behaviour for permissions and screen sharing.
</constraints>

<output_format>
## Format and device decisions
## Recording setup
| Option | Captures | Misses | Best for |
## Tasks in context
## Mobile-specific conditions
## Consent and privacy
## Pilot checklist
## Analysis notes
</output_format>
