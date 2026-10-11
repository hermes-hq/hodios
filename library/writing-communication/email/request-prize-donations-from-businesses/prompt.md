---
schema: 1
id: request-prize-donations-from-businesses
kind: prompt
title: Ask local businesses for prize donations
description: Writes a short ask to local businesses for raffle prizes, auction lots or in-kind donations, with the cause, the audience, the recognition offered, an easy yes and a deadline.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [parent, individual, teacher, operations-manager]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [raffle, auction-lots, in-kind-donations, local-business, school-fair, charity-event]
pairs_with:
  prompts: [brainstorm-fundraiser-ideas, write-donor-thank-you, write-follow-up-email, plan-fundraising-event]
args:
  - name: event
    description: The event and cause - who is organising (school parents' association, club, charity), what the money is for, the date, and expected attendance or reach.
    type: text
    required: true
  - name: ask
    description: What you are asking for and from whom, for example "vouchers or products worth about 25 to 50 from cafés, salons and shops on our high street" or "a signed shirt from the local football club".
    type: text
    required: true
  - name: details
    description: Optional - recognition you can offer (programme mention, social post, sponsor board), whether you have a charity or registration number, your deadline for collecting prizes, and any link to the business (a parent works there, they gave last year).
    type: text
output_contract:
  format: markdown
  sections: [Email, In-person version, Follow-up, Tracking sheet, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteers collect prizes for school fairs, club raffles and charity auctions. Local businesses get many of these requests, often in the same few weeks before the winter holidays and summer fairs, and the owner usually decides in under a minute. Asks that work are short, local and specific: who you are, the cause in one line, what you would like (a suggested value or item, but happy with anything), how many local people will see their name, how the prize will be collected, and a deadline. A personal link (a parent who is a customer, a previous donation) and an in-person visit at a quiet time beat a cold email. Asks that fail are long letters, vague "anything you can give", pressure, and no thank-you afterwards, which loses next year's donation. Some prizes have rules: raffles and lotteries are regulated in many places, and alcohol, tobacco or age-restricted prizes may be restricted or need care at school events.

Event: {{event}}
Ask: {{ask}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Write the email: a specific subject line; a two-line opening with who you are and the link to the business if any; the cause and event in one or two sentences; the ask with a suggested item or value and an easy smaller alternative; the recognition offered and the audience size; how and when you will collect it; a deadline; and thanks. Leave clear placeholders for the business and contact names.
2. Write an in-person version: four or five sentences to say at the counter, plus a printed note or flyer text to leave behind.
3. Write a short follow-up for a week later and a gracious reply to a no that keeps the door open.
4. Give a tracking sheet layout to manage asks across many businesses.
5. Notes: the best timing for asks, rules to check for raffles and prizes where the user lives (for example whether a licence or registration is needed and any restricted prizes), and a reminder to thank every donor publicly and privately after the event, with a one-line thank-you template.
</task>

<constraints>
- Keep the email under about 150 words. Busy owners will not read more.
- Do not overstate attendance, reach or recognition; use the user's figures or leave placeholders.
- Do not promise tax relief or receipts unless the user says the organisation can issue them.
- No guilt or pressure ("everyone else on the street has given"). A no must be easy.
- Do not state raffle or gambling law for any country as fact; tell the user to check with their local authority or the regulator where they live.
</constraints>

<output_format>
## Email
Subject line, then the email.
## In-person version
## Follow-up
A follow-up and a reply to a no.
## Tracking sheet
A table: Business | Contact | Asked on | Method | Response | Item and value | Collected | Thanked.
## Notes
</output_format>
