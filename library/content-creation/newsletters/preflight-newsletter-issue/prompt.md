---
schema: 1
id: preflight-newsletter-issue
kind: prompt
title: Preflight a newsletter issue
description: Checks a draft newsletter issue before sending, covering subject and preview, links, merge tags, alt text, mobile and dark mode, plain text, sponsor labels and footer, and returns a pass-or-fix table.
category: newsletters
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, content-creator]
requires: [none]
inputs: [document, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pre-send-check, email-accessibility, merge-tags, alt-text, sponsor-disclosure]
pairs_with:
  prompts: [write-newsletter-issue, write-issue-correction-note]
  personas: [newsletter-editor]
args:
  - name: draft_issue
    description: The issue as it will be sent - subject line, preview text, body with links written out (or the HTML), image notes or alt text, footer, and any sponsor section.
    type: text
    required: true
  - name: platform
    description: The sending platform, so checks can mention where to look (for example its test-send or preview tool). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Checks, Fixes in order, Test before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run the last check on a newsletter issue before it goes to every subscriber. A sent email cannot be unsent, so this is a defect hunt, not an edit: you report what is broken or risky and the smallest fix, and you leave the writing alone. The mistakes that most often reach inboxes: an unfilled merge tag ("Hi {FIRST_NAME}"), a link pointing to the wrong page or a draft URL, preview text that repeats the subject or shows "View in browser", images with no alt text that carry the only copy of key information, text that disappears in dark mode, a sponsor section without a label, and a missing unsubscribe link or postal address where the law or platform requires one.
{{#platform}}Platform: {{platform}}.{{/platform}}
</context>

<task>
<draft_issue>
{{draft_issue}}
</draft_issue>

Check each item and mark it Pass, Fix or Check (cannot tell from the text):
1. Subject: under about 50 characters or front-loaded so the point survives mobile truncation; honest (the issue delivers it); no spammy caps or symbols.
2. Preview text: present, adds to the subject rather than repeating it, under about 90 characters.
3. Merge tags and placeholders: every tag syntax is consistent and has a fallback; no leftover [X], TODO, lorem ipsum or draft notes.
4. Links: each has descriptive text (not "click here"); flag duplicates, staging or draft URLs, URLs with tracking junk visible as text, and any link whose text and target seem to disagree. You cannot open links: list every one to click in the test send.
5. Images: alt text present and meaningful; key information is not only in an image; note heavy images if sizes are given.
6. Readability on a phone: paragraphs over about four lines, walls of text, tables that will not fit, buttons as images only.
7. Dark mode risks: text colours or logos stated as black-on-transparent, light grey text, and images with text on a white background.
8. Plain-text version: exists or the platform generates it; links readable in it.
9. Sponsor and affiliate content: clearly labelled at the start of the section; affiliate links disclosed.
10. Footer: unsubscribe link, why the reader is receiving it, sender identity, and a postal address if the writer's platform or local rules require one (say to check).
11. Facts to recheck: dates with weekdays, prices, names, and claims with numbers; list them for a quick check without judging their truth.
</task>

<constraints>
- Do not rewrite the issue. Quote the exact text that needs fixing and give the fix in one line.
- Do not claim a link works, an image loads or a rule applies; mark what you cannot see as Check.
- Do not state specific laws as settled; mention that anti-spam and advertising disclosure rules vary by country.
- If the draft has no subject or footer, report them as Fix, not as an assumption.
</constraints>

<output_format>
## Verdict
"Ready to send", "Send after fixes" or "Not ready", with the count of Fix items.

## Checks
Table: # | check | result (Pass, Fix, Check) | evidence (quoted text) | fix.

## Fixes in order
Numbered, most damaging first.

## Test before sending
A short checklist for the test send: links to click, devices and dark mode to view, and facts to confirm.
</output_format>
