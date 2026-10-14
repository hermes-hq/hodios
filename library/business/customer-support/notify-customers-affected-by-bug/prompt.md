---
schema: 1
id: notify-customers-affected-by-bug
kind: prompt
title: Notify customers affected by a bug
description: Writes the proactive message to customers hit by a bug, billing or data error - what happened to them, what to do now, what you fixed, any remedy - plus a support FAQ.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, product-manager, operations-manager, founder]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [proactive-outreach, customer-notification, billing-error, defect-remediation, apology]
pairs_with:
  prompts: [write-known-issue-brief, write-incident-update, build-support-macros, plan-data-breach-response]
  rules: [support-commitment-rules]
args:
  - name: what_happened
    description: The defect in plain terms - what went wrong, when it started and ended, how many and which customers, and what each affected customer experienced (wrong charge, lost data, missed email, wrong price).
    type: text
    required: true
  - name: status_and_remedy
    description: Fix status, what customers must do (if anything), and the remedy already approved - refunds, credits, data restored - with amounts or how they are calculated and when they arrive.
    type: text
    required: true
  - name: brand_voice
    description: Brand voice, sender name and channel (email, in-app, SMS). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Should you notify, Message, Short version, Support FAQ, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write proactive notices to the specific customers a defect affected: a double charge, a wrong price, emails that never sent, settings reset, data shown wrongly or lost. Telling customers before they notice usually costs less trust than letting them find it, and it cuts the ticket spike if the message answers the obvious questions. Notices fail when they are vague ("some users may have experienced an issue"), when they make every customer check whether they were affected, when they bury the action the customer must take, or when they over-explain the technical cause. They also fail when they go to the wrong list, so segmenting by impact matters: someone charged twice needs a different message from someone who only saw a display glitch. Incidents that exposed personal data to the wrong people are a different process with legal notification duties; route those to whoever owns data protection.
</context>

<task>
<what_happened>
{{what_happened}}
</what_happened>

<status_and_remedy>
{{status_and_remedy}}
</status_and_remedy>

{{#brand_voice}}
<brand_voice>
{{brand_voice}}
</brand_voice>
{{/brand_voice}}

1. Decide whether and whom to notify: affected customers only, segmented by what happened to them; note anyone who should not get it. If personal data may have been exposed to others, stop and flag that this needs the data breach process and legal review before any customer message.
2. Write the message for the main segment:
   - a subject or first line that tells them this is about them and what it is (for example "We charged you twice on 3 March - refund on the way");
   - what happened to them specifically, with dates and amounts as merge fields if they vary;
   - what they need to do, or "you don't need to do anything";
   - what you have fixed and what you are doing to prevent a repeat, in one or two plain sentences;
   - the remedy, how and when it arrives;
   - one clear apology and how to reach support with a reference.
3. Write a short version for in-app or SMS.
4. Write a support FAQ of five to eight likely follow-up questions with approved answers, including "I wasn't affected but got this", "my refund hasn't arrived" and "I want more compensation".
5. List checks before sending: segment query reviewed, merge fields tested, remedy actually processed or scheduled, support briefed, send timing that avoids the middle of the night in the customers' time zones.
</task>

<constraints>
- Use only facts given; do not invent counts, causes, dates or amounts. Use merge fields like `[AMOUNT]` where values differ per customer.
- Do not promise remedies beyond those approved; say what the FAQ answer is for requests beyond them (escalate to a named role).
- No technical jargon or internal system names. Do not blame a supplier by name unless the user asks.
- Message under about 180 words.
</constraints>

<output_format>
## Should you notify
Who gets it, segments, exclusions, and any stop flag.

## Message
Subject line and body, ready to send.

## Short version
Under about 40 words.

## Support FAQ
Question and approved answer pairs.

## Before sending
Checklist.
</output_format>
