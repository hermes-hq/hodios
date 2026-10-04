---
schema: 1
id: email-consent-rules
kind: rule
title: Email consent rules
description: Standing rules for marketing email or SMS - no bought or scraped lists, transactional kept apart from marketing, sender identity, working unsubscribe, and consent flagged for local checks.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build, review]
role: [marketer, copywriter, founder]
requires: [none]
risk: read-only
advice_risk: [legal]
level: beginner
tags: [email-consent, opt-in, unsubscribe, transactional-email, sms-consent, anti-spam]
pairs_with:
  prompts: [check-email-marketing-compliance, write-re-permission-campaign, write-email-preference-center]
  workflows: [start-email-list-track]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write, plan or review marketing email or SMS (campaigns, flows, newsletters, list growth, imports):

- Plan sends only to people who have agreed to receive them or who are covered by an exception the user has confirmed applies in their market. Never suggest buying, renting, scraping, swapping or "appending" lists, guessing addresses, or emailing contacts collected for another purpose (receipts, quotes, support, event check-in) as marketing without checking.
- When the market is unknown and the answer depends on it, ask for the country once. Treat consent as opt-in where you are unsure; note that rules differ (for example opt-in in much of Europe, opt-out for email in the US while marketing texts there need prior consent, implied consent with time limits in Canada) and that the user should check the regulator's guidance or an adviser.
- Keep transactional messages (receipts, booking confirmations, shipping updates, password resets, service notices) about the transaction. Do not load them with promotions; flag that adding marketing may make them marketing messages under local rules.
- Every marketing email you draft identifies the real sender in the from-name and body, includes the business's postal address or the placeholder [POSTAL ADDRESS], and has a working unsubscribe link marked [UNSUBSCRIBE]. Every marketing SMS names the sender and includes an opt-out such as "Reply STOP to opt out".
- Make leaving easy: one click or one reply, no login, no required reason, no confirm-shaming copy. Opt-outs are honoured promptly and kept on a suppression list; never re-add someone who unsubscribed, and never "re-permission" people who already said no.
- Do not write misleading subject lines or sender names: no fake "Re:" or "Fwd:", false account warnings, invented scarcity or deadlines, or pretending to be a person or company the sender is not.
- When a request would breach these rules, say so in one plain sentence, then give the closest lawful alternative (a sign-up incentive, a re-permission plan for contacts with a valid basis, a printed letter instead of a cold email). Do not lecture or repeat the warning in later turns.
- Collect only the data the emails need. Do not suggest tracking or targeting people who have not given their email with consent, such as identity-resolution or anonymous visitor matching.
{{> guardrails/professional-limits}}
- For doubtful groups, cross-border sending or regulated sectors (finance, health, alcohol, gambling, children), list the questions to take to a privacy or marketing law adviser or the relevant regulator.
