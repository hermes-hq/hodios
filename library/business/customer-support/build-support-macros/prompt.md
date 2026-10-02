---
schema: 1
id: build-support-macros
kind: prompt
title: Build support macros
description: Builds reusable support macros from real ticket samples, with personalisation slots, internal actions and rules for when not to use each. Use to speed up replies without sounding canned.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [support-agent, operations-manager]
inputs: [ticket, text]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [macros, canned-responses, ticket-themes, personalisation]
pairs_with:
  prompts: [analyze-support-tickets, write-support-reply]
  rules: [support-tone-rules]
args:
  - name: ticket_samples
    description: Real tickets and the replies that worked, ideally 20 or more across common issues. Remove or mask customer names, emails and account details first.
    type: text
    required: true
  - name: tone
    description: Brand voice and rules - formality, use of first names, words to avoid, sign-off. Leave empty for warm, direct and professional.
    type: text
output_contract:
  format: markdown
  sections: [Themes, Macros, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build support macros for a help desk. Good macros save agents time on repeated issues without making customers feel processed: they cover one situation each, force the agent to personalise the opening, and say clearly when they must not be used. Bad macros are long, generic, answer the wrong question, and promise things the agent cannot check.
</context>

<task>
Build macros from these tickets:

<ticket_samples>
{{ticket_samples}}
</ticket_samples>

<tone>
{{tone}}
</tone>

1. Group the tickets into themes by the customer's underlying need (not by the words used). Count tickets per theme from the samples.
2. Choose the themes worth a macro: frequent, with a consistent correct answer. Skip themes where every case needs investigation or judgement, and say why.
3. For each chosen theme write one macro, or two variants if the samples show a clear split (for example within and outside the refund window):
   - a name agents can search, in the form `Theme - situation`;
   - when to use it, and when not to use it (the look-alike cases where it would be wrong);
   - the reply body, with personalisation slots in square brackets, such as `[Customer first name]`, `[Specific detail from their message]`, `[Order date]`. Every macro must have at least one slot that forces the agent to reference the customer's actual situation;
   - internal actions: tags, status, assignment or follow-up reminder, if the samples suggest them;
   - the facts the agent must verify before sending.
4. Write the bodies in the given tone (default: warm, direct, professional): acknowledge the specific issue, give the answer or steps early, end with a clear next step. Keep each under about 120 words.
5. List gaps: questions the samples show agents answering inconsistently, and policy that seems unclear, so a lead can decide the correct answer.
</task>

<constraints>
- Base answers on the replies in the samples. Where the samples disagree, do not pick silently; flag the conflict under Gaps and write the macro with a `[CONFIRM]` placeholder.
- Do not invent policies, timeframes, compensation or links. Use `[CONFIRM]` placeholders.
- Do not include any customer names, emails, order numbers or other personal data from the samples in the macros.
- Use square brackets for slots. Do not use curly-brace template syntax, which many help desks interpret as live variables.
- If there are too few tickets to see patterns (under about five), say so and produce at most two macros.
</constraints>

<output_format>
## Themes
Table: Theme | Tickets in sample | Macro? (yes or no, and why).

## Macros
One subheading per macro with: When to use, Do not use when, Verify before sending, Body (in a quote block), Internal actions.

## Gaps
Numbered.
</output_format>
