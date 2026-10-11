---
schema: 1
id: localize-server-sent-messages
kind: prompt
title: Localize emails, push and SMS sent by the server
description: Makes server-sent emails, push notifications, SMS and generated PDFs arrive in each recipient's language and formats, with a stored locale, time zone, fallbacks and per-locale tests.
category: localization
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, fullstack-engineer, software-engineer]
requires: [repo-read]
inputs: [repo, file, text]
output: [plan, code, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [email-templates, push-notifications, server-side-i18n]
pairs_with:
  prompts: [implement-locale-formatting, design-locale-detection-and-routing]
args:
  - name: system
    description: The backend stack, how messages are sent today (template engine, email or push provider, job queue) and the relevant code or templates.
    type: text
    required: true
  - name: locales
    description: Locales the product supports, with the default.
    type: string
    required: true
  - name: channels
    description: Which channels to cover, for example "email, push, SMS, invoice PDF".
    type: string
    default: "email, push, SMS"
output_contract:
  format: markdown
  sections: [Where the locale comes from, Template and catalog design, Formatting and time zones, Channel specifics, Code changes, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Client-side i18n is usually done first, and server-sent messages are left in English or in whatever language the request happened to carry. The hard part is that most of these messages are sent with no request at all: a nightly job, a webhook, an admin action or a reminder scheduled weeks ahead. The recipient's language and time zone must therefore be stored on the user (or the order, or the invite) and read at send time, not taken from the sender's browser or the server's default locale. Common bugs: an admin in Germany triggers an English customer's receipt in German; a reminder shows 09:00 UTC; the subject line is translated but the body is not; a push notification is built from two separately translated fragments; SMS in Cyrillic or with one emoji switches to UCS-2 and costs twice as many segments.
</context>

<task>
Design and implement localization for server-sent messages.

System:
{{system}}

Locales: {{locales}}. Channels: {{channels}}.

1. Locale source: define the recipient locale and time zone fields (on the user, and on records for recipients who are not users yet, such as invites and guest orders), how they are captured (account settings, the request at sign-up, the device for push), and the resolution order at send time: recipient preference, then record, then product default. Never use the acting user's or server's locale for someone else's message.
2. Templates and catalogs: keep message text in the same catalog system as the app (or a server namespace of it), one template per message with locale-specific strings, ICU messages for counts and gender, and translator comments. Cover subject lines, preheaders, button labels, plain-text parts and footers.
3. Formatting: format dates, times, numbers and money with the recipient's locale and time zone at send time; store scheduled times in UTC with the recipient's zone; show the zone when ambiguity matters.
4. Channel rules: email (`lang` and `dir` on the HTML, RTL layout, subject length), push (title and body length per platform, server-side localization versus client-side localization keys such as `loc-key`, and what happens on a device whose language differs), SMS (GSM-7 versus UCS-2 segment counts, sender rules that vary by country), PDFs (fonts that cover every target script).
5. Fallbacks: missing translation falls back along a chain to the default locale, never to a raw key, and is logged with the message id and locale.
6. Write the code changes for the given stack: the locale resolver, the template lookup, the formatting helpers and the send path changes.
7. Tests: render every message in each locale with fixtures including an RTL locale, a long-text locale and a recipient whose zone differs from the server's; assert no raw keys, correct `lang`, and correct local time.
</task>

<constraints>
- Do not infer a recipient's language from their name, country of IP or phone prefix alone; at most use it as a sign-up default the user can change.
- Legal footers and unsubscribe text may have country-specific wording; flag them for review rather than translating them as ordinary copy.
- Do not invent provider limits; when you cite a length or segment limit, say it should be checked against the provider's current documentation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where the locale comes from
Fields, capture points and resolution order.

## Template and catalog design
Structure, keys and an example message.

## Formatting and time zones
Rules and helpers.

## Channel specifics
One short subsection per channel.

## Code changes
Code blocks per file.

## Tests
Test cases and fixtures.
</output_format>
