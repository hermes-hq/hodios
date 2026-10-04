---
schema: 1
id: write-newsletter-signup-page
kind: prompt
title: Write a newsletter signup page
description: Writes newsletter signup page and form copy with a specific promise, what arrives and how often, a sample issue, honest proof, form microcopy and the confirmation page, with no hype or fake counts.
category: newsletters
version: 1.0.0
status: incubating
stage: [build, ship]
role: [writer, content-creator, marketer]
requires: [none]
inputs: [notes, text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [signup-form, landing-copy, reader-promise, microcopy, double-opt-in]
pairs_with:
  prompts: [write-newsletter-welcome-email, plan-newsletter-format, grow-newsletter]
args:
  - name: newsletter_summary
    description: What the newsletter covers, who it is for, what readers get from it, who writes it and why they are worth reading, and links to one or two good past issues.
    type: text
    required: true
  - name: cadence
    description: How often it arrives and roughly how long it is, for example "every Sunday, a 5-minute read".
    type: string
    required: true
  - name: proof
    description: Real proof you can show - subscriber count, named reader quotes you have permission to use, notable readers, press mentions. Optional; leave empty if you have none yet.
    type: text
output_contract:
  format: markdown
  sections: [Page copy, Form microcopy, Confirmation page, Short versions, Check before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the page and form where someone decides whether to give a newsletter their email address. A visitor wants answers to four questions in seconds: what will I get, how often, is it for me, and can I trust this person with my inbox. Signup pages lose people with a vague promise ("thoughts on tech and life"), hiding the cadence, inflated or fake subscriber counts, testimonials nobody gave, and a form that does not say what happens next. A new newsletter with no proof can still convert by showing a real sample and being specific. Cadence: {{cadence}}.
</context>

<task>
<newsletter_summary>
{{newsletter_summary}}
</newsletter_summary>
{{#proof}}
<proof>
{{proof}}
</proof>
{{/proof}}

1. Write the promise: a headline that names the reader and the specific outcome or content, under 12 words, and a subhead with cadence and length. Offer three headline options and recommend one.
2. Write "What you'll get": three to five concrete bullets (recurring sections, the kind of thing in a recent issue), not benefits in the abstract.
3. Write "Who it's for" with an honest "not for you if ..." line.
4. Write a short "About the writer" (40-70 words) using only what the summary says.
5. Proof: use only the proof given, exactly as given. If none, use a "Read a recent issue" link and a sample excerpt slot instead of social proof.
6. Form microcopy: field label, button text that says what happens ("Send me Sunday's issue", not "Submit"), a privacy line (no sharing, unsubscribe any time), and the double opt-in hint if the platform sends a confirmation email.
7. Confirmation page: tell them to check their inbox and spam, what to do if it does not arrive, what happens next (welcome email, first issue day), and one optional next step (read the best issue, reply with what brought them).
8. Short versions: a one-line embed for the end of a blog post, and a 2-3 line social bio version.
</task>

<constraints>
- Never invent subscriber counts, testimonials, reader names, press mentions or credentials. If proof is empty, show no social proof.
- No hype words (ultimate, game-changing, secret) and no fake scarcity.
- The privacy line must not promise anything the writer has not confirmed (for example "we never use tracking"); mark it [CONFIRM] if unsure.
- If the summary lacks who it is for or what is in an issue, ask for it before writing the headline.
</constraints>

<output_format>
## Page copy
Headline options with the recommendation, subhead, What you'll get, Who it's for, About the writer, Proof or sample.

## Form microcopy
Label, placeholder, button, privacy line, confirmation hint.

## Confirmation page
Heading and body under 90 words.

## Short versions
Embed line and bio version.

## Check before publishing
Bullets: [CONFIRM] items, links to add, and the privacy and consent checks for the writer's platform and country.
</output_format>
