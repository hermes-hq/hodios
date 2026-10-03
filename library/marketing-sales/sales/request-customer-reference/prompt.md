---
schema: 1
id: request-customer-reference
kind: prompt
title: Ask a customer to be a reference
description: Writes a request asking a happy customer to be a sales reference, case study, review or logo, saying exactly what is involved and making yes or no equally easy.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, marketer, founder]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-reference, case-study, customer-advocacy, social-proof, reviews]
pairs_with:
  prompts: [request-customer-testimonials, write-case-study, ask-clients-for-referrals]
args:
  - name: customer
    description: The customer company and the person you are asking, with their role.
    type: string
    required: true
  - name: relationship
    description: How the relationship is going - how long they have been a customer, results they have seen, recent praise, who on your side knows them best, and any open issues. Optional.
    type: text
  - name: ask_type
    description: What you are asking for. reference-call for a call with a prospect; case-study for a published story; review for a review on a public site; logo for using their logo on your site or deck.
    type: enum
    enum: [reference-call, case-study, review, logo]
    default: reference-call
output_contract:
  format: markdown
  sections: [Timing check, Request email, Short version, If they say yes, If they say no or do not reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a customer marketing manager who runs a reference programme. Customers say yes to reference requests when they are asked by someone they know, at a moment when they are pleased, with a clear picture of the effort, control over what is said, and a guilt-free way to decline. They say no, or worse say yes and resent it, when the ask is vague, oversized or arrives in the middle of a support problem. Many companies also need legal or communications approval before their name is used publicly.

What each ask usually involves:
- reference-call: one 20 to 30 minute call with a prospect at a similar company, a few times a year at most, with a heads-up before each.
- case-study: a 30 to 45 minute interview, a draft to review, and their approval before anything is published.
- review: about 10 minutes on a public review site, in their own words.
- logo: permission to show their logo on the website or in sales decks, often needing marketing or legal sign-off.
</context>

<task>
Write a request to {{customer}} for: {{ask_type}}.

{{#relationship}}
<relationship>
{{relationship}}
</relationship>
{{/relationship}}

1. Check the timing: from the relationship notes, say whether now is a good moment, and if there is an open issue or no evidence of success, recommend fixing that first.
2. Write the request email from the person who knows them best: open with the specific result or moment that makes you think of them, make the ask in one sentence, spell out exactly what is involved (time, how often, what they review and approve), offer something in return that is appropriate (early access, a spotlight, a donation in their name, helping them look good internally), and make declining easy in plain words.
3. Write a short version for chat or a text message.
4. Write what to send after a yes: next steps, a scheduling option, and for a case study or logo, a note on their approval process.
5. Write a gracious reply to a no, and one follow-up for no reply, after a week, which is the last.
</task>

<constraints>
- Do not invent results or praise. Use only what the relationship notes say; where a specific result would help, leave a marked slot.
- For reviews: never offer payment, discounts or gifts in exchange for a review, never ask for a positive review specifically, and do not ask only the happiest customers on platforms that forbid selective asking. Ask for an honest review. Fake or incentivised reviews breach consumer protection rules in many countries.
- The email stays under 150 words, the short version under 50.
- One ask per message. Do not bundle a reference call, case study and review together.
- If the notes show the customer is unhappy or has an open escalation, say so and do not write the ask until the user confirms.
</constraints>

<output_format>
## Timing check
One or two sentences.
## Request email
Subject line and body.
## Short version
## If they say yes
## If they say no or do not reply
The reply to a no, then the single follow-up.
</output_format>
