---
schema: 1
id: write-help-center-article
kind: prompt
title: Write a help-centre article
description: Writes a task-based help-centre article from a feature description or a support ticket, with numbered steps, screenshot placeholders and troubleshooting. Use to answer a common question once, well.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [support-agent, technical-writer, product-manager]
inputs: [ticket, spec, text]
output: [docs, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [help-center, knowledge-base, self-service, ticket-deflection]
pairs_with:
  prompts: [analyze-support-tickets, build-support-macros]
  rules: [support-tone-rules]
args:
  - name: feature_or_ticket
    description: A feature description, release note, internal how-to, or a support ticket thread that shows what customers struggle with. Include exact UI labels and plan or permission limits if you have them.
    type: text
    required: true
  - name: audience
    description: Who reads the article and how technical they are (for example "shop owners, non-technical, mostly on mobile"). Leave empty for a general non-technical customer.
    type: string
output_contract:
  format: markdown
  sections: [Title, Summary, Before you start, Steps, Troubleshooting, Related articles, Notes for the editor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write help-centre articles that customers find through search and can follow without contacting support. People scan rather than read, arrive with a task in mind, and give up if the first screen does not match what they see in the product. One article covers one task; titles use the words customers type; steps use the exact on-screen labels.
</context>

<task>
Write a help-centre article from this material:

<source>
{{feature_or_ticket}}
</source>

Audience: {{audience}}

1. Identify the one task the customer is trying to complete. If the source covers several tasks, write the article for the most common one and list the others under Notes for the editor as separate article ideas.
2. If the source is a ticket, generalise it: remove names, emails, order numbers and any personal or account data, and write for everyone with the same problem.
3. Title: start with a verb and use the customer's words ("Change your billing address", "Fix 'payment declined' at checkout"). Avoid internal feature names unless customers use them.
4. Summary: one or two sentences on what the reader will achieve and who it applies to.
5. Before you start: plan, role or permission needed, device or browser limits, and anything to prepare.
6. Steps: numbered, one action per step, starting with a verb, with on-screen labels in **bold** exactly as given. Put a `[Screenshot: what it shows]` placeholder after steps where the screen changes or the control is hard to find. State the expected result after the last step.
7. Troubleshooting: the realistic problems (from the ticket where available) as "If you see…" or "If … doesn't happen" entries, each with cause and fix. End with when and how to contact support and what to include.
8. Related articles: two to four suggested titles, marked as suggestions.
</task>

<constraints>
- Do not invent UI labels, menu paths, limits or plan names. Where the source does not give the exact label, write `[CONFIRM label]` and list it under Notes for the editor.
- Use second person ("you"), present tense, and plain language suitable for the audience. If the audience is empty, write for a non-technical customer.
- Keep the article under about 400 words excluding troubleshooting, unless the task genuinely needs more steps.
- No marketing language and no internal reasoning about why the feature was built.
</constraints>

<output_format>
# <Title>
Summary paragraph.

## Before you start
Bullets.

## Steps
Numbered, with screenshot placeholders. Final line: what you should see when it worked.

## Troubleshooting
Bold "If…" lines, each followed by cause and fix.

## Related articles
Bullets.

## Notes for the editor
Bullets: every `[CONFIRM]` item, removed personal data, and other article ideas.
</output_format>
