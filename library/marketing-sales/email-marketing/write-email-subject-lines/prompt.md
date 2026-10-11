---
schema: 1
id: write-email-subject-lines
kind: prompt
title: Write email subject lines and preheaders
description: Writes subject line and preheader pairs for one marketing email across different angles, checked for length on mobile, honesty, spam-prone wording and match to the email's content.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [subject-lines, preheaders, open-rate, copywriting-angles]
pairs_with:
  prompts: [plan-subject-line-ab-test, write-promo-email, critique-marketing-email]
args:
  - name: email_content
    description: The email's content or a summary - the offer or news, the main benefit, deadline if real, and the audience segment it goes to.
    type: text
    required: true
  - name: brand_voice
    description: How the brand sounds and anything it never does (emoji, all caps, puns). Optional.
    type: string
  - name: past_winners
    description: Subject lines that did well or badly before, with click or open data if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Options, Top picks, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write subject lines and preheaders as a pair, because in the inbox they read as one line: the subject earns attention and the preheader finishes the thought. Experts know that open rates are distorted by privacy features that pre-load images, so the real test of a subject line is clicks and conversions from the email, and a subject line that oversells the content wins opens and loses clicks and trust. On mobile only the first 30 to 40 characters of a subject are reliably visible, so the key word goes first. Specific beats clever ("New: linen shirts in 6 colours" beats "You won't believe this"). Fake "Re:" or "Fwd:", false urgency and misleading claims raise complaints and can be unlawful in some places. Spam filters judge sender reputation and engagement far more than individual words, but shouty formatting (ALL CAPS, many exclamation marks, money symbols) still looks like spam to people.
</context>

<task>
Write subject line and preheader pairs for this email.

<email_content>
{{email_content}}
</email_content>
{{#brand_voice}}Voice: {{brand_voice}}{{/brand_voice}}
{{#past_winners}}
<past_results>
{{past_winners}}
</past_results>
{{/past_winners}}

1. Identify the single most compelling fact in the email and the segment it goes to.
2. Write ten pairs across distinct angles: direct benefit, specific news, curiosity grounded in a real detail, question, number or list, deadline (only if real), personal or plain-text style, social proof (only if supplied), and two of your choice. Label each angle.
3. Give each subject's character count and mark where it would cut off on a narrow phone screen.
4. Pick the top three with one sentence each on why, and suggest which two to test against each other, judged on clicks.
5. **Checks:** flag any option that overpromises against the content, uses urgency not in the content, or would read as spam-like formatting.
</task>

<constraints>
- Every subject must be true to the email content; no invented offers, numbers, deadlines or names.
- No fake "Re:" or "Fwd:" prefixes and no deceptive sender-style tricks.
- Preheaders add information; they never repeat the subject or say "View in browser".
- Use emoji only if the voice allows it, and never more than one per subject.
</constraints>

<output_format>
## Options
A table: # | Angle | Subject | Preheader | Characters.

## Top picks
Three picks with reasons and the suggested test pair.

## Checks
Bullets flagging risky options, or "none".
</output_format>
