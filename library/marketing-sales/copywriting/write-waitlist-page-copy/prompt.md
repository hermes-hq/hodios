---
schema: 1
id: write-waitlist-page-copy
kind: prompt
title: Write waitlist page copy
description: Writes a coming-soon or waitlist page with a specific promise, who it is for, what members get, an honest launch timeline, the sign-up form and confirmation, and optional referral wording.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, product-manager]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [waitlist, coming-soon, pre-launch, early-access, referral-copy]
pairs_with:
  prompts: [plan-waitlist-launch, write-landing-page-copy, write-value-proposition, write-thank-you-page-copy]
  personas: [copywriter]
args:
  - name: product
    description: What you are building, the problem it solves, what makes it different, and what exists today (prototype, beta, nothing yet).
    type: text
    required: true
  - name: audience
    description: Who the waitlist is for (for example "independent physiotherapists who run their own clinic").
    type: string
    required: true
  - name: launch_info
    description: Rough launch timing, how people will be let in (all at once, in waves), what members get (early access, founding price, input on features) and any capacity limit. Optional; only real perks are used.
    type: text
  - name: referral
    description: How a referral mechanic works if you have one (for example "each friend who joins moves you up 10 places"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Promise, Waitlist page copy, Confirmation and referral copy, Honesty check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write pre-launch pages. A waitlist page converts on a specific promise to a specific person, not on mystery. "Something big is coming" pages collect few sign-ups and the people who do join forget why. Good waitlist pages say what the product will do and for whom, show it if anything can be shown (a screenshot, prototype, short demo), say what joining gets you and roughly when, and ask for as little as possible (usually email, sometimes one qualifying question that helps prioritise invites).

Trust matters more before launch because there is no product to judge. Invented waitlist counts, fake "spots left" numbers and vague dates that keep slipping damage the launch. A realistic window ("early access from spring, in small groups") and a promise of how often members hear from you work better.
</context>

<task>
<product>
{{product}}
</product>

Audience: {{audience}}

{{#launch_info}}<launch_info>
{{launch_info}}
</launch_info>{{/launch_info}}

{{#referral}}<referral>
{{referral}}
</referral>{{/referral}}

1. If you cannot tell what the product will do or for whom, ask up to three short questions and stop.
2. Write the promise: the outcome for this audience in one sentence, and why it is different from what they use today.
3. Write the page: headline, subhead, a "what it does" block of three short points, a "who it is for" line (and who it is not for, if that helps the right people self-select), what members get (only real perks), the timeline as a window with how invites will work, the form (field labels, button text, one optional qualifying question if useful), the privacy line on how the email will be used, and a short FAQ (when, cost, how often you will email).
4. Write the confirmation screen and the confirmation email, including what happens next and how often they will hear from you.
5. If a referral mechanic exists, write the share prompt, a short share message and how the position or reward is explained, in plain words.
6. Run an honesty check on every claim about timing, perks, scarcity and numbers.
</task>

<constraints>
- No invented sign-up counts, "only X spots left", or dates the inputs do not support. Use [CONFIRM: ...] for anything uncertain.
- Do not promise a price, feature or launch date that is not in the inputs.
- Ask for the minimum: email plus at most one optional question.
- Say how the email will be used and that people can unsubscribe; consent rules for marketing email differ by country, so flag that the form wording should be checked for the markets you collect from.
- Referral mechanics must be explained honestly, including any limit on rewards.
</constraints>

<output_format>
## Promise
One sentence plus one line on the difference.

## Waitlist page copy
Each section under its own label, ready to paste.

## Confirmation and referral copy
Confirmation screen, confirmation email (subject and body) and, if relevant, referral prompt and share message.

## Honesty check
A table: Claim | Supported by inputs (yes, no, partly) | Fix.
</output_format>
