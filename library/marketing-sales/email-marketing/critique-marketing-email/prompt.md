---
schema: 1
id: critique-marketing-email
kind: prompt
title: Critique a promotional email before sending
description: Reviews a draft promotional email before it goes out for offer clarity, hierarchy, one call to action, mobile reading, links, claims, accessibility and spam risk, and returns ranked fixes.
category: email-marketing
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text, image]
output: [report, checklist, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [email-review, pre-send-qa, conversion-copy, offer-clarity]
pairs_with:
  prompts: [write-promo-email, write-email-subject-lines, analyze-email-campaign-report]
args:
  - name: draft
    description: The email draft - subject, preheader, body text, button labels and link destinations - pasted as text, or a screenshot of the design.
    type: text
    required: true
  - name: goal
    description: What the email must achieve (sales of one product, bookings, event sign-ups), the segment it goes to and the offer terms.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Fixes by priority, Line edits, Pre-send checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review promotional emails the way a senior email marketer does before a send. Readers scan an email in a few seconds on a phone: they see the subject, the preheader, the first screen, and the button. Most weak emails fail in predictable ways: the offer is not clear in the first screen, there are several competing buttons, the key message is inside an image that does not load or is not read by screen readers, the terms are vague ("up to 50%") or contradict the landing page, the button says "Click here", and the subject promises something the email does not deliver. Experts judge each element against the one goal of the email and the segment it goes to, and they separate must-fix issues (wrong price, broken claim, missing unsubscribe) from improvements.
</context>

<task>
Review this email draft.

<draft>
{{draft}}
</draft>

Goal, segment and offer: {{goal}}

1. **Verdict:** is it ready to send, ready with fixes, or not ready? One paragraph.
2. Check in this order and note each problem with its location:
   - Subject and preheader: do they match the content and goal, and does the key word appear early?
   - First screen on mobile: can a reader tell the offer and what to do without scrolling?
   - Offer and terms: exact, consistent, with real deadlines and exclusions stated.
   - Hierarchy and call to action: one primary action; button text says what happens; secondary links do not compete.
   - Copy: length, clarity, benefit before feature, tone for the segment.
   - Images and accessibility: key text not only in images, alt text, contrast, font size, a live-text fallback.
   - Claims: anything that needs proof or that could mislead (savings, "best", health or environmental claims, scarcity).
   - Footer: unsubscribe link, sender identity and postal address present.
3. **Fixes by priority:** must fix, should fix, nice to have.
4. **Line edits:** rewrite the subject, preheader, opening and button text if they need it.
5. **Pre-send checklist** specific to this email (links, merge fields, segment, test sends).
</task>

<constraints>
- Judge only what is in the draft; if link destinations or the landing page are not supplied, list them as things to check rather than assuming.
- Do not invent offer terms or proof to "improve" the email.
- Flag possibly misleading claims as a risk to check; do not give legal verdicts.
- Be specific: quote the line and give the fix.
</constraints>

<output_format>
## Verdict
One paragraph.

## Fixes by priority
Three lists: Must fix, Should fix, Nice to have.

## Line edits
Before and after pairs.

## Pre-send checklist
A checklist.
</output_format>
