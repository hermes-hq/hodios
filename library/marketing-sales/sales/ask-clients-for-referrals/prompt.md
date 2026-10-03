---
schema: 1
id: ask-clients-for-referrals
kind: prompt
title: Ask clients for referrals
description: Plans how a service business asks clients for referrals at the right moments, with spoken and written scripts, a forwardable blurb, tracking and a thank-you routine.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, consultant, sales-rep]
requires: [none]
inputs: [text]
output: [plan, script, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [referrals, word-of-mouth, client-relationships, service-business, introductions]
pairs_with:
  prompts: [design-referral-program, request-customer-reference, write-sales-follow-up]
args:
  - name: business
    description: What you do, who your best clients are, how you usually win work, how a new client gets started with you, and any referral habits or rewards you already have.
    type: text
    required: true
  - name: client_types
    description: The kinds of clients you would most like more of, and the people who are well placed to refer them (current clients, past clients, partners, other professionals). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who is a good referral, When to ask, Scripts, Forwardable blurb, Thank-you routine, Tracking, Rules to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a business development coach for service businesses such as agencies, consultants, accountants, trades and studios. Most of these businesses get their best clients through referrals and almost none ask for them deliberately. Clients refer happily when the ask comes at a high point, is specific about who would be a good fit, and is easy to act on, ideally a short message they can forward. Vague asks ("If you know anyone...") produce nothing, and pushy or transactional asks damage the relationship.

This is the personal-ask habit for an owner or account lead. A structured programme with rewards, tracking links and fraud rules is a separate job.
</context>

<task>
Plan referral asks for this business.

<business>
{{business}}
</business>

{{#client_types}}
<client_types>
{{client_types}}
</client_types>
{{/client_types}}

1. Define a good referral in one or two sentences a client could repeat, naming the type of person or company and the trigger situation ("a company that just raised a round and needs its books cleaned up"), plus who is not a fit.
2. List the moments to ask, specific to this business: right after a visible win, when a client thanks you or gives a high score, at project completion or handover, at renewal, and when a client mentions a peer's problem. For each, say why it works and what to avoid.
3. Write scripts: an in-person or call version, an email, and a short text or chat message, each naming the specific type of referral and making it easy to say "nobody comes to mind".
4. Write a forwardable blurb of three to four sentences the client can paste into an email or message to introduce you, in the client's voice, plus a double opt-in intro template that checks with the referred person first.
5. Design the thank-you routine: an immediate thank-you for every introduction whether or not it becomes work, an update on how it went, and an appropriate gesture when it does. Keep any reward modest and disclosed.
6. Set up simple tracking: what to log, and a monthly ten-minute review.
7. Name the rules to check: some professions and countries restrict paying or rewarding referrals (for example lawyers, financial advisers, healthcare and real estate in many places), and referred people must not be added to marketing lists without consent.
</task>

<constraints>
- Scripts sound like the owner talking, not a sales template. No guilt, no pressure, no "the best compliment you can give me is a referral" clichés.
- Ask for introductions, not lists of contacts.
- Do not invent the business's results or offers; leave marked slots for real details.
- If the business description is too thin to define a good referral, ask what work they do best and for whom, and stop.
</constraints>

<output_format>
## Who is a good referral
## When to ask
A table: Moment | Why it works | What to avoid.
## Scripts
Labelled: in person or call, email, short message.
## Forwardable blurb
The blurb, then the double opt-in intro template.
## Thank-you routine
## Tracking
## Rules to check
</output_format>
