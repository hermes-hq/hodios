---
schema: 1
id: write-messaging-framework
kind: prompt
title: Write a messaging framework
description: Builds a messaging framework with a core message, value pillars backed by proof, messages per persona, words to use and avoid, and worked examples. Use to align copy across teams and channels.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, product-manager, founder, copywriter]
requires: [none]
inputs: [text, spec, notes]
output: [docs, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [messaging-framework, value-pillars, message-house, brand-voice, product-marketing]
pairs_with:
  prompts: [write-positioning-statement, build-ideal-customer-profile, write-landing-page-copy, write-taglines]
  personas: [copywriter, pr-strategist]
args:
  - name: positioning
    description: Your positioning - who the product is for, the problem, the category, the alternatives buyers consider, and what makes you different. A positioning statement is ideal.
    type: text
    required: true
  - name: personas
    description: The buyer and user personas the messaging must serve, with their goals and concerns. Optional; up to three are proposed from the positioning if empty.
    type: text
  - name: proof_points
    description: Evidence you can use - customer results, quotes with permission, data, awards, certifications, notable customers, product facts. Optional, but pillars without proof are marked.
    type: text
output_contract:
  format: markdown
  sections: [Core message, Value pillars, Persona messages, Short forms, Language, Examples, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketing lead. Positioning decides where a product sits in the buyer's mind; messaging is how you say it, consistently, across the website, sales decks, ads, emails and press. A messaging framework is the reference everyone writes from. It works when it has one core message, a few pillars that each make a distinct promise backed by proof, a translation of those pillars for each persona's priorities, and a shared vocabulary. It fails when the pillars are adjectives ("innovative, reliable, easy"), when every pillar applies equally to competitors, or when claims have no proof behind them.
</context>

<task>
Build a messaging framework.

<positioning>
{{positioning}}
</positioning>

{{#personas}}<personas>
{{personas}}
</personas>{{/personas}}
{{#proof_points}}<proof_points>
{{proof_points}}
</proof_points>{{/proof_points}}

1. **Core message:** one sentence a customer could repeat, stating who it is for, the outcome and the difference from the alternative. Give two alternatives with their angle and recommend one. If the positioning does not say who it is for or what makes it different, ask and stop.
2. **Value pillars:** three (at most four) pillars. Each is a benefit claim, not a feature or adjective, followed by the features that deliver it, the proof points from the input, and the objection it answers. Mark any pillar without proof as `[PROOF NEEDED]`. Check that each pillar is distinct and that a competitor could not claim it equally; say if one could.
3. **Persona messages:** for each persona (given, or up to three proposed and marked as proposals), their top priority and concern, which pillar leads for them, the message in their language, the proof that matters most to them, and the call to action that fits their role.
4. **Short forms:** a ten-word version, a 30-second spoken version, and a 100-word boilerplate.
5. **Language:** words and phrases to use (taken from customer language where the input has it) and words to avoid (jargon, overused category clichés, claims you cannot prove), each with the reason.
6. **Examples:** apply the framework to a homepage hero (headline and subhead), a sales email opening line, and a paid social ad line, so teams can see it in use.
</task>

<constraints>
- Use only the proof supplied; never invent customer names, results, statistics or quotes.
- Benefits in customer terms; features appear only as support for a benefit.
- Plain language a customer would use; no "best-in-class", "seamless", "cutting-edge", "solutions" or "leverage" unless the input shows customers say them.
- Keep the whole framework short enough to fit on about two pages, excluding examples.
</constraints>

<output_format>
## Core message
The recommended sentence, then two alternatives with angles.

## Value pillars
A table: Pillar (benefit) | Delivered by | Proof | Objection answered.

## Persona messages
A table: Persona | Priority and concern | Lead pillar | Message | Key proof | Call to action.

## Short forms
Ten words, 30 seconds, 100-word boilerplate.

## Language
Two lists: Use (with reason) and Avoid (with reason).

## Examples
Homepage hero, sales email opener, social ad line.

## Gaps
Proof to collect, assumptions to test with customers (for example message testing or win/loss interviews), and any pillar a competitor could also claim.
</output_format>
