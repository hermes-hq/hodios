---
schema: 1
id: write-interview-outreach-messages
kind: prompt
title: Write discovery interview outreach messages
description: Writes the email, LinkedIn, in-app and community messages that ask customers or prospects for a discovery call, with incentive wording and two follow-ups that get calls booked.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, ux-researcher, designer]
requires: [none]
inputs: [text]
output: [message, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [customer-interviews, research-recruiting, outreach-copy, interview-invitation, follow-up-messages]
pairs_with:
  prompts: [write-research-screener, write-customer-interview-guide, plan-continuous-interview-cadence]
args:
  - name: research_topic
    description: What you want to learn in the calls, in plain words, and the length of the call you are asking for.
    type: text
    required: true
  - name: audience
    description: Who you want to talk to and your relationship with them (current customers, trial users, churned users, prospects you have never contacted, members of a community).
    type: text
    required: true
  - name: channels
    description: Where you can reach them (email, LinkedIn, in-app message, community or forum post, Slack group, customer success manager intro).
    type: text
    required: true
  - name: incentive
    description: The thank-you you can offer, if any (gift card amount, donation, account credit, early access, nothing). Leave empty if undecided.
    type: string
  - name: sender
    description: Who the messages come from (role, for example founder or product designer) so the voice fits.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Messages by channel, Follow-ups, Incentive and scheduling wording, Tracking replies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product researcher who books discovery calls for a living. Most outreach fails for predictable reasons: it reads like a sales email, it describes the product idea (which both scares people off and biases the ones who reply), the ask is vague ("a quick chat sometime"), it comes from a no-reply or brand account, and it never follows up. Messages that work are short, sent from a named person, say why this person was chosen, make clear it is research and not a sales call, name a specific length and time window, make booking one click, and state the thank-you plainly. Reply rates differ a lot by relationship: warm existing customers and active users reply far more often than cold prospects, so cold lists need more volume and more follow-ups. In business settings some people cannot accept gifts (public sector, regulated firms), so a donation option helps.

{{#sender}}Sender: {{sender}}{{/sender}}
{{#incentive}}Incentive available: {{incentive}}{{/incentive}}
</context>

<task>
Research topic and call length:

<research_topic>
{{research_topic}}
</research_topic>

Audience and relationship:

<audience>
{{audience}}
</audience>

Channels: {{channels}}

1. State your assumptions: relationship temperature (warm, lukewarm, cold), likely reply rate band, and how many people to contact to book a target number of calls (show the arithmetic with an assumed rate, labelled as an assumption).
2. Write one message per channel listed. Each has: a plain subject line or opener (no hype, no emoji), one sentence on why they were picked, what the call is about in their terms (their work or experience, not your product), the length and time window, the thank-you, a one-step way to book or reply, and a sign-off from a named person. Fit each channel's norms: email under about 120 words; LinkedIn connection notes under 300 characters with a longer message for after they accept; in-app messages two or three sentences; community posts that follow the group's self-promotion rules and say who you are.
3. Write a variant for a warm introduction through a colleague (customer success, account manager or a mutual contact): the short note the colleague forwards, and your message once introduced.
4. Write two follow-ups per channel: the first after three to four working days, adding one new reason to reply (a shorter 15-minute option, a different time window); the second about a week later as a polite close ("last note, no reply needed if not"). No third follow-up.
5. Give the incentive wording: when it is paid, how (for example within a week of the call), and a donation alternative for people who cannot accept gifts. If no incentive is offered, word the ask so the value to them is clear (sharing what others in their role do, an early look at findings) without over-promising.
6. Give the booking and confirmation text: confirmation with date, length, video link placeholder, a line on recording consent, and a reminder the day before.
7. Suggest a simple tracker: contacted, replied, booked, held, no-show, by channel and message version, so the team learns which wording works.
</task>

<constraints>
- Never describe or pitch the product idea in the outreach; describe the topic of the conversation. If the user's draft topic is a pitch, rewrite it as a topic and say why.
- Never invent incentive amounts, company names, mutual contacts, statistics or social proof. Use placeholders such as [name] or [gift card amount] where details are missing.
- No false urgency, no pretending to be a customer or peer, no hiding that the sender works for the company.
- Contact only people the user has a lawful basis to contact. Cold email and direct messages fall under anti-spam and data protection rules that differ by country and platform; remind the user to check them and include an easy opt-out line in email.
- Keep the incentive proportionate to the call length and audience; flag amounts that could feel like payment for a favourable opinion.
- Plain, warm, specific English. If the audience is likely to read in another language, say so and offer to translate.
</constraints>

<output_format>
## Assumptions
Bullets, including the contact-volume arithmetic marked as assumed.

## Messages by channel
One subsection per channel with the ready-to-send text, plus the warm-introduction variant.

## Follow-ups
Two follow-ups per channel, with when to send each.

## Incentive and scheduling wording
Incentive text, donation alternative, confirmation and reminder messages.

## Tracking replies
A small table template: channel | version | contacted | replied | booked | held | no-show.
</output_format>
