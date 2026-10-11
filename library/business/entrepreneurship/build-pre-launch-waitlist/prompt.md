---
schema: 1
id: build-pre-launch-waitlist
kind: prompt
title: Build a pre-launch waitlist
description: Plans a pre-launch waitlist for a new product or business - the page and offer, where signups come from, a referral mechanic, nurture emails and how to turn signups into buyers at launch.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer]
requires: [none]
inputs: [text]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [waitlist, pre-launch, referral-loop, nurture-emails, launch-conversion]
pairs_with:
  prompts: [write-waitlist-page-copy, plan-waitlist-launch, write-launch-email-sequence, find-first-customers]
args:
  - name: product
    description: What you are launching, for whom, the price if known, and the launch date or how far away it is.
    type: text
    required: true
  - name: assets
    description: What you already have - audience or followers, email list, communities you belong to, budget for ads, and anything you can offer early signups (discount, early access, founding price). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Waitlist goal, Page and offer, Signup sources, Referral mechanic, Nurture emails, Launch conversion, Numbers to track]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan pre-launch waitlists. A waitlist is both a launch audience and a demand test, but only if it is built well. Weak waitlists collect emails with no qualifying information, go silent for months, and convert a small share at launch. Strong ones ask one or two qualifying questions, give a concrete reason to join now (founding price, early access, limited spots), keep in touch with useful updates, and ask for a small commitment (a deposit, a pre-order, a call) before launch so the founder learns who is serious. Referral mechanics help only when the product is something people like telling friends about and the reward is meaningful.

<product>
{{product}}
</product>
{{#assets}}
<assets>
{{assets}}
</assets>
{{/assets}}
</context>

<task>
1. Set the waitlist goal: the number of signups needed for the launch to work, derived from a stated assumption for conversion to buyers and the sales target, and the share of signups that should make a commitment before launch. Show the sum and mark assumptions.
2. Page and offer: the headline promise, who it is for, what joining gets them, the qualifying questions to ask (one or two), and the call to action. Keep it to what a single page needs.
3. Signup sources: ranked channels from the founder's assets - personal network, communities where the customers are, partners, content, small paid tests - with a weekly action for each.
4. Referral mechanic: whether to use one and why; if yes, the reward, the threshold and how to stop gaming.
5. Nurture emails: a sequence from welcome to launch, each with subject idea, purpose and content in a line; include a feedback ask and a commitment ask before launch.
6. Launch conversion: the order of invitations (most qualified and most engaged first), the launch offer and its deadline, and the follow-up for those who did not buy.
7. Numbers to track weekly and the level at which to change the approach.
</task>

<constraints>
- Do not invent conversion benchmarks as facts. If you use a planning assumption, label it and say to replace it with real data.
- Use only offers the founder can honour; never suggest fake scarcity, fake counters or invented social proof.
- Collect only the personal data needed, with clear consent for marketing emails; mention that consent and privacy rules vary by country and should be checked.
</constraints>

<output_format>
## Waitlist goal
The sum and assumptions.
## Page and offer
Headline, sub-headline, what you get, qualifying questions, call to action.
## Signup sources
Table: Channel | Why it fits | Weekly action.
## Referral mechanic
## Nurture emails
Table: Email | Timing | Purpose | Content.
## Launch conversion
## Numbers to track
Table: Metric | Target | Change approach if.
</output_format>
