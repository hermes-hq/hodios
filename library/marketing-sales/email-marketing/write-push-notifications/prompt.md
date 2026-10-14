---
schema: 1
id: write-push-notifications
kind: prompt
title: Write app push notification copy
description: Writes push notification copy for an app's lifecycle moments within platform length limits, with timing, frequency caps, deep links and respect for the user's notification choices.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, product-manager, copywriter]
subject: [saas, ecommerce]
requires: [none]
inputs: [text]
output: [copy, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [push-notifications, mobile-app, lifecycle-messaging, notification-fatigue, re-engagement]
pairs_with:
  prompts: [design-notification-strategy, write-sms-campaign, implement-push-notifications]
args:
  - name: app
    description: What the app does, who uses it and how often a healthy user opens it, and the brand voice.
    type: text
    required: true
  - name: moments
    description: The moments you want to message (welcome, unfinished action, new content, price drop, streak, re-engagement, transactional updates), and which data you can personalise with.
    type: text
    required: true
  - name: limits
    description: Current notification volume, opt-in rate, and any categories users can switch off in settings. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Notification plan, Copy, Frequency and timing rules, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write push notifications for a mobile app. Push is the most interruptive channel a company has: one irrelevant notification can make a user switch off notifications or uninstall, and notification permission is hard to win back. Experts treat push as a scarce budget. They lead with the specific useful fact (title plus first line must make sense on a lock screen, where text is cut short), personalise with real data, deep-link to the exact screen, respect quiet hours in the user's time zone, cap volume per day and week, and give each type of notification its own settings category so users can switch off marketing without losing order updates. Asking for permission at a moment where the value is obvious works better than asking on first launch.
</context>

<task>
Write push notifications for this app.

<app>
{{app}}
</app>

<moments>
{{moments}}
</moments>
{{#limits}}Current limits and data: {{limits}}{{/limits}}

1. **Notification plan:** for each moment, the trigger, the delay, the deep-link destination, the settings category it belongs to, and whether it is transactional or marketing.
2. **Copy:** for each moment, two variants with a title (aim for under about 40 characters) and body (aim for under about 100 characters so the key fact survives truncation), personalisation fields as `{field}` with a fallback, and an optional rich-media note.
3. Write the permission pre-prompt screen copy shown before the system dialog, placed at a moment of clear value.
4. **Frequency and timing rules:** daily and weekly caps, quiet hours in local time, priority order when several fire, cool-down after a user ignores several in a row, and when push should yield to email or in-app instead.
5. **Measurement:** open rate per type, downstream action, opt-out and uninstall rate after sends, and a holdout for marketing notifications.
</task>

<constraints>
- Character limits vary by device and operating system; state them as approximate and recommend testing on real devices.
- No clickbait, fake urgency, false personal messages ("Anna sent you something" when no one did) or guilt.
- Transactional notifications carry no promotions.
- Note that marketing push may require separate consent in some places and that the user should check; do not state legal rules as fact.
</constraints>

<output_format>
## Notification plan
A table: Moment | Trigger and delay | Deep link | Category | Type.

## Copy
Per moment: two variants with title, body and character counts; then the permission pre-prompt.

## Frequency and timing rules
Bullets.

## Measurement
Bullets.
</output_format>
