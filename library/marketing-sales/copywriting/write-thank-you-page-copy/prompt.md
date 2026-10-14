---
schema: 1
id: write-thank-you-page-copy
kind: prompt
title: Write thank-you page copy
description: Writes the page shown after a sign-up, download, purchase or booking, confirming it worked, saying exactly what happens next and when, and offering one fitting next step.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [thank-you-page, confirmation-page, post-conversion, expectation-setting, next-step]
pairs_with:
  prompts: [write-landing-page-copy, write-post-purchase-emails, plan-cross-sells-and-upsells, write-ux-microcopy]
  personas: [copywriter]
args:
  - name: conversion
    description: What the person just did. signup for an account, trial or newsletter, download for a guide or resource, purchase for an order, booking for a call, appointment or event, form for a quote request, application or enquiry.
    type: enum
    enum: [signup, download, purchase, booking, form]
    default: signup
  - name: details
    description: What they signed up for or bought, what happens next and when (email arrives, order ships, someone calls within two working days), the sender name of the confirmation email, and anything they must do (verify email, prepare documents).
    type: text
    required: true
  - name: next_step
    description: The one next step you would like them to take, if any (for example "join the community", "add the event to your calendar", "complete your profile"). Optional; the prompt suggests one otherwise.
    type: string
output_contract:
  format: markdown
  sections: [Moment check, Thank-you page copy, Confirmation email, Things to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write post-conversion pages. The thank-you page is read closely: the person has just acted and is checking that it worked. Most sites waste it with "Thanks! We'll be in touch." Experts use it to remove anxiety and set expectations: confirm exactly what happened, say what will happen next and when, tell people which email to look for and from whom, and say what to do if it does not arrive. Clear expectations cut "did my order go through?" emails, missed confirmation emails and no-shows.

Then offer one next step that matches the person's momentum and does not feel like a bait-and-switch: a calendar link after a booking, getting set up after a sign-up, a related resource after a download. Pushing a hard upsell immediately after a purchase or a donation often feels grabby; a relevant, optional add-on can work only when it clearly helps the order they just made.
</context>

<task>
Conversion: {{conversion}}

<details>
{{details}}
</details>

{{#next_step}}Desired next step: {{next_step}}{{/next_step}}

1. If it is unclear what the person did or what happens next, ask one or two short questions and stop.
2. Moment check: what the person is likely feeling or worried about right now for this type of conversion, and what they need to know first.
3. Write the page: a headline confirming what happened in specific words ("Your call is booked for Tuesday", "Your guide is on its way"), a short "what happens next" list with timings, which email to look for (sender name, subject if known, check spam or promotions), what to do if something goes wrong (contact or resend option), and one next step with its call to action. For a purchase, include the order summary placeholder and the returns or support link. For a booking, include add-to-calendar and how to reschedule.
4. Write a short matching confirmation email (subject line and body under 120 words) so the page and email say the same thing.
5. List things to check: the conversion tracking on this page, that timings promised are realistic, and that the next step does not distract from anything the person must still do (such as verifying an email).
</task>

<constraints>
- State only timings and processes the inputs give; mark unknowns as [CONFIRM: ...].
- One next step only. Do not stack several offers, social links and surveys.
- No guilt, pressure or fake scarcity in the next step; it must be easy to ignore.
- If the person still has to do something (verify an email, upload a document), make that the most visible instruction, above the next step.
- Short and scannable: the page should be readable in under 20 seconds.
</constraints>

<output_format>
## Moment check
Two or three bullets.

## Thank-you page copy
Headline, what happens next, email to look for, if something goes wrong, next step with CTA, ready to paste.

## Confirmation email
Subject line, then the body.

## Things to check
Bullets.
</output_format>
