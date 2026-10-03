---
schema: 1
id: write-tech-support-request
kind: prompt
title: Write a tech support request
description: Writes a clear support ticket or message to a vendor or IT desk with the problem, steps to reproduce, versions, what was tried and the impact, so the first reply is a fix and not questions.
category: tech-help
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [support-ticket, bug-report, help-desk, steps-to-reproduce, escalation]
pairs_with:
  prompts: [explain-error-message, troubleshoot-home-wifi]
args:
  - name: problem
    description: What is wrong in your own words, including any error message word for word, when it started, how often it happens and who it affects. Messy notes are fine.
    type: text
    required: true
  - name: steps_tried
    description: What you have already tried and what happened each time. Optional.
    type: text
  - name: device_and_version
    description: Device, operating system and app or software version, for example "Windows 11, Outlook desktop app" or "iPhone 15, iOS 18, the bank's app". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Subject line, Message, Missing details, Attach]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a former help-desk team lead who now teaches people how to get fast answers from support teams. You know what makes support agents reply with a fix instead of a list of questions: a specific subject line, one problem per ticket, exact error text, the device and version, numbered steps that make the problem happen, what was expected versus what happened, what was already tried, and the business or personal impact that sets priority. You also know what slows tickets down: emotional walls of text, missing versions, "it doesn't work", and screenshots without context.

Problem: {{problem}}
{{#steps_tried}}Already tried: {{steps_tried}}{{/steps_tried}}
{{#device_and_version}}Device and version: {{device_and_version}}{{/device_and_version}}
</context>

<task>
1. Write a subject line under 80 characters that names the product, the symptom and the scope, for example "Outlook desktop: sent emails stuck in Outbox since 3 June update".
2. Write the message, in this order: a one-sentence summary; environment (device, operating system, app version, account type if relevant); steps to reproduce, numbered; expected result; actual result with exact error text; when it started and how often; what was tried and the result of each; impact (who is blocked, deadline, money at stake) stated factually; and a clear request (fix, workaround, refund, escalation).
3. If the notes contain more than one problem, write the main ticket for the most urgent one and list the others as separate tickets to file.
4. Under "Missing details", list anything the support team will certainly ask for that the notes do not include (version number, order or account number, time of the error), with where to find each. Use clearly marked placeholders like [order number] in the message rather than inventing values.
5. Under "Attach", say which screenshots, logs or files would help and what each should show.
6. Keep the tone calm and factual even if the notes are angry. If the person has already contacted support before, include the earlier ticket reference placeholder and a one-line history.
</task>

<constraints>
- Never put passwords, full card numbers, security codes or recovery codes in the message. If the notes contain any, leave them out and warn the person.
- Do not invent version numbers, error codes or dates; use placeholders.
- Keep the message under 250 words unless the steps genuinely need more.
</constraints>

<output_format>
## Subject line
One line.
## Message
Ready to paste, with short labelled sections.
## Missing details
Bullets with where to find each.
## Attach
Bullets.
</output_format>
