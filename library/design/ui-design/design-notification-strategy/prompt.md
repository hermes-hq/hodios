---
schema: 1
id: design-notification-strategy
kind: prompt
title: Design a notification strategy
description: Designs notifications across email, push and in-app with triggers, user value per message, frequency caps, preference settings and copy. Use when adding or cleaning up product notifications.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [designer, product-manager, marketer, mobile-engineer]
requires: [none]
inputs: [text, spec]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [notifications, push-notifications, notification-preferences, engagement, lifecycle-messaging]
pairs_with:
  prompts: [write-ux-microcopy, design-onboarding-flow]
  personas: [product-designer, ux-writer]
args:
  - name: product
    description: What the product does, who uses it, how often they would naturally use it, the platforms (web, iOS, Android, email), and current problems (opt-outs, uninstalls, complaints, missed actions).
    type: text
    required: true
  - name: events
    description: Events that could trigger a notification, existing notifications and their volume, and business goals for them. Optional; without it, the prompt proposes the event list.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Notification inventory, Channel rules, Frequency and timing, Preferences, Permission requests, Copy, Measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notifications are usually added one team at a time: every feature gets a push, every growth goal gets an email, and nobody owns the total. Users then get five messages a day, mute everything, and miss the one that mattered (a failed payment, a security alert). A notification strategy decides, message by message, what value it gives the user, which channel fits its urgency, how often it may fire, and how people can control it, so the important ones keep getting read.
</context>

<task>
Design the notification strategy.

<product>
{{product}}
</product>
{{#events}}
<events>
{{events}}
</events>
{{/events}}

1. **Principles.** Three to five rules for this product, for example "every notification lets the user act or know something they would want to know now", "transactional and security messages are never batched or muted by marketing settings", "one channel per event by default".
2. **Notification inventory.** Start from the events given; if none, propose events from the product description and mark them "(proposed)". Classify each as transactional or service (the user asked for it or must know: receipts, password resets, security alerts, failed payments), activity or social (something happened that involves the user), reminders (user-set or behaviour-based), or promotional and marketing. For each, state the value to the user in one sentence; cut or demote any notification whose value is only to the business.
3. **Channel rules.** Choose channels by urgency and by whether the user is in the product: in-app (inbox, badge, banner) when they are likely to be in the product soon; push for time-sensitive and personally relevant events; email for records, detail and people who are not active; SMS only for critical or security events. Say when a message should be delivered on one channel and removed from others once seen.
4. **Frequency and timing.** Caps per user per day and per week for each non-transactional category, batching and digests for high-volume activity ("3 new comments" instead of three pushes), quiet hours in the user's local time zone, send-time rules, and suppression rules (do not remind someone about a task they just completed, stop a sequence when the user acts).
5. **Preferences.** A preference centre structure by category (not by internal feature names), defaults for each category (marketing off until the user opts in where consent rules require it), channel choices per category, a pause-all option with an end date, one-tap unsubscribe in email, and which messages cannot be turned off and why.
6. **Permission requests.** When and how to ask for push permission on mobile and web: not on first launch, but after a moment when the value is clear, with an in-app explanation first and a way to ask again later in settings.
7. **Copy.** For the 5 to 8 most important notifications, write the push title and body within typical limits (title up to about 40 characters, body up to about 100), the email subject line, and the in-app text. Each says what happened and what the user can do, with the destination when tapped. No clickbait or fake urgency.
8. **Measure.** Per category: delivery, open or tap rate, action completed, opt-out and mute rate, and uninstall or unsubscribe signals after sends; a holdout group to test whether a notification actually changes behaviour.
</task>

<constraints>
- Do not invent product events or data that the product does not have; proposed events are marked.
- Consent rules for marketing messages differ by country (for example the EU, UK, US and Canada). State the default as opt-in for marketing and recommend checking the rules for the markets served; do not give legal conclusions.
- No dark patterns: no guilt-tripping, fake urgency, misleading "you have a message" teasers or hiding the opt-out.
{{> output/uncertainty}}
</constraints>

<output_format>
## Principles
## Notification inventory
| Event | Type | Value to user | Channel(s) | Urgency | Default | Cap / batching |
## Channel rules
## Frequency and timing
## Preferences
A sketch of the preference centre as a nested list, with defaults.
## Permission requests
## Copy
| Notification | Push title | Push body | Email subject | In-app text | Tap goes to |
## Measure
</output_format>
