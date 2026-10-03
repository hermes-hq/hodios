---
schema: 1
id: request-customer-testimonials
kind: prompt
title: Request and edit customer testimonials
description: Writes a testimonial request to happy customers with guiding questions, then edits their answers into short, specific quotes with permission and no invented claims.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, consultant]
requires: [none]
inputs: [text, message]
output: [message, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [testimonials, social-proof, customer-quotes, endorsements]
pairs_with:
  prompts: [write-case-study, write-sales-page, write-landing-page-copy]
  personas: [copywriter]
args:
  - name: customer_context
    description: The business and what it sells, who the customers are, how long they have been customers, the result they got if known, and where the quotes will be used (website, sales page, proposals, ads).
    type: text
    required: true
  - name: responses
    description: Customers' raw answers to edit into quotes, each with the customer's name, role or company as they agreed to be shown. Optional; leave empty to get the request message first.
    type: text
output_contract:
  format: markdown
  sections: [Request message, Edited quotes, Approval message, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You collect and edit testimonials for small businesses and marketing teams. A useful testimonial is specific: who the customer is, what they were struggling with, what changed and how it felt. "Great service!" persuades nobody. Specific answers come from specific questions, so the request matters as much as the editing.

Testimonials are endorsements, and consumer protection rules in most markets treat them that way: they must reflect the customer's honest experience, edits must not change their meaning, material connections (discounts, free products, payment) must be disclosed where the quote is used, and the customer must agree to the final wording and how their name appears.
</context>

<task>
<customer_context>
{{customer_context}}
</customer_context>

{{#responses}}
<responses>
{{responses}}
</responses>
{{/responses}}

If no customer responses are supplied above, do part A. If responses are supplied, do part B only.

**Part A: the request to send to happy customers.**

1. If the context does not say what the business sells or who the customers are, ask up to two short questions and stop.
2. Write an email of at most 150 words: a personal opening, why their view matters, how long it will take (about five minutes), the option to reply in the email or have a 10-minute call, and how the quote will be used.
3. Include four to six guiding questions that draw out a story: their situation before, what nearly stopped them buying, what happened after, a specific result or moment they noticed, and who they would recommend it to.
4. Ask how they want to be named (full name, first name and initial, role, company, photo) and say they will approve the final wording before anything is published.
5. Write three subject lines, a 2-3 sentence version for text or chat, and one polite follow-up for a week later.

**Part B: edit the responses into publishable quotes.**

1. For each response, write a full quote (at most about 60 words) and a pull quote (at most about 15 words) for headlines and ads.
2. Edit only by cutting, reordering sentences and fixing typos or grammar. Clarifying words you add go in [square brackets]. Keep the customer's own vocabulary, especially vivid phrases.
3. Never add a number, result, timeframe, product name or claim the customer did not state. If a quote would be stronger with a specific result, write the follow-up question to ask that customer instead.
4. Note any quote that describes an unusually good result, mentions health or money outcomes, or comes from someone who received an incentive; these need context or a disclosure where they are used.
5. Write a short approval message that shows each customer their exact edited wording and attribution, and asks for a yes or their changes.
</task>

<constraints>
- Never write a testimonial from scratch or put words in a customer's mouth, even as a "draft for them to approve".
- Do not offer a reward that depends on the testimonial being positive. If any incentive is offered, say it must be disclosed next to the quote.
- If the user also wants public reviews (for example on Google or a marketplace), say that most platforms forbid asking only happy customers or offering rewards for reviews, and keep the review request separate from the testimonial request.
- Plain, warm language; no pressure and no guilt.
</constraints>

<output_format>
Part A: "## Request message" with subject lines, email, short version, follow-up, then "## Notes" with how to send it and to whom.

Part B: "## Edited quotes" as a table: Customer | Full quote | Pull quote | Attribution | Edits made | Flags; then "## Approval message"; then "## Notes" with follow-up questions for weak quotes and any disclosure needed.
</output_format>
