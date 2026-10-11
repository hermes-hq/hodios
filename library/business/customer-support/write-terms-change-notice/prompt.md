---
schema: 1
id: write-terms-change-notice
kind: prompt
title: Write a terms change notice
description: Writes the customer notice for a change to terms, privacy policy or service scope - what changes, why, when, what customers can do - with a plain summary and support answers.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, product-manager, support-agent]
requires: [none]
advice_risk: [legal]
inputs: [document, text]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [terms-update, privacy-policy-update, service-change, customer-notice, plain-language]
pairs_with:
  prompts: [plan-price-change-communication, write-terms-of-service, write-privacy-policy, build-support-macros]
args:
  - name: changes
    description: What is changing - the old and new wording or a list of changes - and why. Paste the relevant clauses if you can.
    type: text
    required: true
  - name: logistics
    description: Effective date, notice period you intend to give, which customers it affects, what happens if they do nothing, and how they can object, opt out, export data or cancel.
    type: text
    required: true
  - name: business
    description: The business, the channels you will use (email, in-app, website banner) and the brand voice. Optional.
    type: text
  - name: country
    description: Countries or regions where your customers are.
    type: string
output_contract:
  format: markdown
  sections: [Change summary, Notice, Short version, Support answers, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write customer notices for changes to terms of service, privacy policies, acceptable use rules or what a service includes (a feature removed, a limit introduced, a plan retired). Customers ignore "We've updated our terms" emails until they discover later that something they relied on changed, which feels like a trick and lands in support and reviews. A fair notice is specific: it names the changes that matter to the customer, separates material changes (data use, fees, rights, removed features, dispute terms) from housekeeping, gives the date and what happens if they do nothing, and says plainly what they can do instead. Many places require advance notice and sometimes consent for material changes, especially for privacy and consumer contracts, so legal review of the notice and the timing comes before sending, not after.
</context>

<task>
<changes>
{{changes}}
</changes>

<logistics>
{{logistics}}
</logistics>

{{#business}}
<business>
{{business}}
</business>
{{/business}}

{{#country}}Customer locations: {{country}}{{/country}}

1. Build a change summary: each change, whether it is material to customers or housekeeping, who it affects, and what it means for them in one plain sentence. Flag any change that looks like it may need explicit consent or a longer notice, as a question for legal review.
2. Write the notice:
   - a subject line that says what changes, not just "updated terms";
   - first two lines: what is changing and the effective date;
   - the material changes as short bullets in customer terms, the housekeeping changes in one line;
   - why, in one or two honest sentences;
   - what they need to do or "nothing", and what happens if they do nothing;
   - their options (object, opt out, export data, cancel) and how, with any deadline;
   - where to read the full terms and how to ask questions.
3. Write a short in-app or banner version under about 40 words.
4. Write support answers for the questions customers will ask: "Can I keep the old terms?", "How do I opt out or cancel?", "What happens to my data?", and two specific to these changes.
5. List what to check before sending: legal review done, notice period matches the stated obligations, links work, the full terms page is live, support briefed.
</task>

<constraints>
- Do not state what the law requires in any country, or claim the change is compliant; list what legal review should confirm.
- Do not describe material changes as minor, hide them in housekeeping, or use "to serve you better" style framing.
- Use only the changes and dates given; mark missing items `[CHECK: ...]`.
- Notice under about 220 words.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
## Change summary
Table: change | material or housekeeping | who is affected | what it means | legal question.

## Notice
Subject line and body.

## Short version
Banner or in-app text.

## Support answers
Question and answer pairs.

## Check before sending
Checklist.
</output_format>
