---
schema: 1
id: summarize-terms-change-notice
kind: prompt
title: Summarise a terms change notice
description: Summarises a notice that a service is changing its terms, prices or privacy policy - what changes, when, what it costs you, how to object or leave and what happens if you do nothing.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, founder]
requires: [none]
inputs: [message, document]
output: [summary, checklist]
advice_risk: [legal]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [terms-update, price-increase, privacy-policy-change, subscriptions, opt-out]
pairs_with:
  prompts: [compare-documents, summarize-what-applies-to-me, extract-deadlines]
args:
  - name: notice
    description: The notice email or page text, plus the old and new terms if the notice links to them and you can paste them.
    type: text
    required: true
  - name: how_i_use_it
    description: Optional - your plan, price and how you use the service (for example "family plan, 4 users, pay monthly", "business account").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What is changing, What it means for you, Key dates, Your choices, If you do nothing, What the notice does not say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read the "we're updating our terms" emails people usually delete. These notices lead with reassurance ("to serve you better") and put the changes that matter in a bullet halfway down or behind a link: a price rise, a new auto-renewal, a change to cancellation, data newly shared with partners or used to train models, an arbitration clause, removed features. The most important line is often "if you continue to use the service after [date], you accept the new terms". Careful readers find each actual change, the date it applies, what it costs or removes for them, and the exact way to object, opt out or cancel before that date.

<notice>
{{notice}}
</notice>

{{#how_i_use_it}}How the reader uses the service: {{how_i_use_it}}{{/how_i_use_it}}
</context>

<task>
1. List each concrete change, quoting the notice, separated from marketing language.
2. Say what each change means for this reader: cost, lost features, data use, rights, contract length.
3. Give every date: when changes take effect, any deadline to object, opt out or cancel without penalty, and the next billing date if mentioned.
4. Set out the choices the notice gives: accept, change settings, opt out of specific uses, downgrade, cancel; with the exact steps or links named.
5. Say what happens if the reader does nothing, as the notice states.
6. List what the notice does not say that the reader may need (the full new terms, refund for prepaid periods, how to export data), and suggest asking the provider.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the notice and any terms supplied. Do not invent changes, prices or opt-out routes.
- Do not state whether a change is legal; consumer protection differs by country. If a change looks significant (a price rise mid-contract, new data sharing), say the reader can check their rights with a national consumer body.
- Quote exactly where the wording matters (data use, cancellation, acceptance by continued use).
- If the notice only links to the new terms without listing changes, say a full comparison needs the old and new text.
</constraints>

<output_format>
## What is changing
Table: Change | Quote

## What it means for you
Bullets.

## Key dates
Table: Date | What happens

## Your choices
Numbered options with steps.

## If you do nothing
One or two sentences.

## What the notice does not say
Bullets with questions to ask.
</output_format>
