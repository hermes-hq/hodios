---
schema: 1
id: design-permission-requests
kind: prompt
title: Design permission requests
description: Designs when and how an app asks for permissions such as notifications, location or camera, with in-context priming, timing, copy, and recovery when people decline.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, mobile-engineer, product-manager]
requires: [none]
inputs: [text, spec]
output: [docs, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [permission-priming, notifications-permission, location-permission, privacy-ux, opt-in-rate]
pairs_with:
  prompts: [design-onboarding-flow, design-notification-strategy, write-ux-microcopy, review-design-for-dark-patterns]
  personas: [product-designer, ux-writer]
args:
  - name: permissions
    description: Each permission the app needs, the feature that needs it, and whether the feature works without it, for example "location - shows nearby stores; app works with a manual postcode".
    type: text
    required: true
  - name: value_to_user
    description: What the person gains from granting each permission, in their terms, and when in their journey they first need that feature.
    type: text
    required: true
  - name: platform
    description: Where the app runs, for example "iOS and Android native", "Android only" or "mobile web and desktop browsers".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Permission inventory, Timing plan, Priming screens and copy, System dialog text, When people decline, Settings and revocation, Measurement, Ethics check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most platforms let an app trigger a system permission dialog a limited number of times; after a denial, the app often cannot ask again and the person must find the setting themselves. Asking for everything on first launch, before the person knows why, produces low grant rates and distrust. The better pattern asks at the moment the feature is needed, explains the benefit in the person's terms first, offers a real alternative, and makes recovery easy for people who change their mind. Platforms also offer finer-grained options (approximate location, limited photo access, provisional or quiet notifications) that should be designed for rather than fought. Priming must inform, not pressure: fake urgency or a "No" button that looks disabled is a dark pattern and can breach platform rules.
</context>

<task>
Design the permission requests.

<permissions>
{{permissions}}
</permissions>

<value_to_user>
{{value_to_user}}
</value_to_user>

Platform: {{platform}}.

1. **Permission inventory:** for each permission, the feature that needs it, whether it is essential or optional, the least access that works (for example approximate instead of precise location, a single photo picker instead of library access, while-using instead of always), and whether it can be avoided entirely with a system picker or a manual alternative.
2. **Timing plan:** when each request happens, tied to a user action (tapping "Find stores near me", starting a video call), never all at launch. Explain how the plan uses the platform's request rules on {{platform}}, for example one-time system prompts, rationale screens on Android after a first denial, provisional or quiet notification options where the platform offers them, and browser prompts that need a user gesture. Mark platform behaviours the team should confirm against current documentation.
3. **Priming screens and copy:** for each permission that benefits from it, a short in-context explanation before the system dialog: a headline about the benefit, one sentence on what is shared and what is not, a primary button that leads to the system dialog, and an equally visible "Not now". Give the exact copy. Skip priming where the user's action already makes the reason obvious, and say so.
4. **System dialog text:** where the platform lets the app supply a purpose string, write it: specific, honest, and about the benefit, for example "Your location is used to show stores within walking distance. It is not stored." Not "This app needs your location."
5. **When people decline:** the experience without the permission (the manual alternative, a degraded but useful feature), a gentle, dismissible in-context reminder only when the person tries the feature again, a direct link to the right settings screen where the platform allows it, and a rule on how often reminders may appear.
6. **Settings and revocation:** an in-app privacy or permissions screen showing each permission's status and what it does, and how the app reacts when a permission is revoked while in use.
7. **Measurement:** grant rate per permission at each request point, feature use after grant, reminder dismissals and revocations, and how to test copy or timing changes without manipulating people.
8. **Ethics check:** confirm no fake urgency, no guilt-tripping decline buttons, no blocking of unrelated features, and no repeated nagging; list anything in the inputs that pushed toward these and the alternative.
9. Before answering, check each permission against its feature: if a permission has no clear user benefit in the inputs, recommend dropping it or deferring it and say why.
10. If a permission's purpose or the feature that needs it is missing, ask about it and stop.
</task>

<constraints>
- Never design a flow that tricks people into granting a permission or punishes them for declining.
- Do not quote specific operating-system version numbers; describe behaviours and tell the team to confirm the current rules for each platform.
- Copy is plain, short and in the second person; no jargon such as "geolocation" in user-facing text.
</constraints>

<output_format>
Markdown with the contract's sections in order. The inventory and the timing plan as tables (Permission, Feature, Essential?, Least access, Trigger moment, Priming?). Copy in quoted blocks labelled by screen and element.
</output_format>
