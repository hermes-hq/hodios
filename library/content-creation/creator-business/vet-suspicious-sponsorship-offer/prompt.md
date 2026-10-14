---
schema: 1
id: vet-suspicious-sponsorship-offer
kind: prompt
title: Vet a suspicious sponsorship offer
description: Checks a sponsorship or collaboration offer for scam signs - malware files, lookalike domains, upfront fees, fake agencies - says what to verify and what to do if you already clicked.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [message, notes]
output: [report, checklist, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [sponsorship-scam, phishing, account-security, fake-brand-deal, malware-attachment]
pairs_with:
  prompts: [check-suspicious-message, pitch-brand-sponsorship]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: offer
    description: "The message as received (paste it, with sender name, email address or handle, links shown as text, and attachment names), and how it reached you."
    type: text
    required: true
  - name: context
    description: "Your platforms and audience size, whether you have opened attachments or links or replied, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Warning signs, Checks to run, What to do now, If you already clicked, Reply or ignore]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Creators are targeted by fake sponsorship offers because they are public, reply to business email, and have valuable accounts. Common patterns: a "game", "software" or "VPN" brand sends a password-protected archive or an installer "to review the product", which is malware that steals browser sessions and takes over channels; a well-known brand is impersonated from a lookalike domain or a free email account; an "agency" asks for a fee, a deposit or paid "verification" before the deal; a brand overpays by cheque or transfer and asks for the difference back; or the offer is real money to promote crypto schemes, gambling or unlicensed products that put the creator and audience at risk. Real brands send briefs and contracts, do not need a creator to run software to discuss terms, and pay the creator, not the other way round. Verification goes through channels the creator finds independently (the brand's official site, a known contact), never through links in the message. Session theft bypasses passwords, so recovery includes signing out all sessions.
</context>

<task>
<offer>
{{offer}}
</offer>

<your_situation>
{{context}}
</your_situation>

1. **Verdict:** likely scam, unclear, or likely real, with the main reason in one line.
2. **Warning signs:** each sign found in the message (sender domain vs the brand's real domain, attachments, urgency, fees, payment flow, product category, writing), explained in plain words. Quote the evidence from the message.
3. **Checks to run:** how to verify independently: find the brand's official contact without using the message's links, check the domain's spelling, ask for a brief and contract on company letterhead, never run files to 'see the product'.
4. **What to do now:** do not open or run attachments, do not pay anything, keep the message, report it to the platform or email provider.
5. **If you already clicked:** if they opened a file or link or entered details: disconnect, sign out of all sessions on every platform, change passwords from a clean device, check two-factor methods and recovery email, scan or reinstall the device, check channel and payment settings, and contact platform support. Order by urgency.
6. **Reply or ignore:** whether to reply at all; if the offer may be real, a short reply asking for verifiable details.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not declare an offer safe; say what would confirm it is real.
- Never suggest opening, running or 'testing' an attachment, even in a sandbox, unless they are qualified to do so.
- Quote only what is in the message; do not invent facts about a brand.
- If money has been sent or accounts are compromised, tell them to contact their bank or payment provider and the platform right away.
</constraints>

<output_format>
## Verdict
## Warning signs
Table: sign | evidence from the message | why it matters.

## Checks to run
Checkbox list.

## What to do now
## If you already clicked
Numbered steps.

## Reply or ignore
</output_format>
