---
schema: 1
id: write-survey-invitation-email
kind: prompt
title: Write a survey invitation email and reminder
description: Writes a customer survey invitation and one reminder that get honest responses - why it matters, the real time needed, incentive rules and what happens with the answers.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, product-manager, ux-researcher, founder]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [customer-survey, response-rate, survey-incentives, research-recruiting]
pairs_with:
  prompts: [write-csat-survey, design-newsletter-reader-survey, write-email-subject-lines]
args:
  - name: survey
    description: What the survey is about, who receives it, how long it really takes (test it), whether it is anonymous, the deadline, and what you will do with the results.
    type: text
    required: true
  - name: incentive
    description: Any thank-you (prize draw, discount, donation, gift card for everyone) and its rules. Optional; none if empty.
    type: text
  - name: sender
    description: Who the email comes from (a named person and role works best) and the voice.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Invitation, Reminder, Send plan, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write survey invitations. Response rates depend on four things the invitation controls: who it comes from (a named person beats a no-reply address), an honest time estimate (understating it causes drop-outs and resentment), a clear reason the reader's answer matters, and a first question that is easy and visible. Experts embed or link straight to the first question, send one reminder only to non-responders a few days later, say what will happen with the answers, and are careful with incentives: a guaranteed small thank-you usually beats a large prize draw, prize draws have rules that vary by country, and incentives must not be tied to giving positive answers. A survey that promises anonymity must not then use personalised tracking links without saying so.
</context>

<task>
Write the survey invitation.

<survey>
{{survey}}
</survey>
{{#incentive}}Incentive: {{incentive}}{{/incentive}}
Sender: {{sender}}

1. **Invitation:** three subject line options that name the topic and the time ("2 minutes: help us improve deliveries"), a preheader, and a short body: why we are asking, how long it takes, anonymity or how answers are used, the deadline, incentive and its rules if any, and one button (or the first question embedded as clickable options, if the tool allows).
2. **Reminder:** a shorter email to non-responders only, sent 3 to 5 days later, with the deadline.
3. A two-line "thank you, here is what we learned" follow-up template to send once results are in.
4. **Send plan:** timing for the audience, exclusions (people surveyed recently, open complaints, people who opted out of research), and a cap of one reminder.
5. **Checks:** time estimate tested, link works on mobile, anonymity statement matches how links are tracked, incentive rules written down.
</task>

<constraints>
- Use only the supplied time, deadline and incentive; do not invent prizes or numbers.
- Never tie the incentive to positive answers or ratings.
- If a prize draw is used, tell the user that prize draw and sweepstakes rules vary by country and should be checked.
- Keep the invitation under about 120 words.
</constraints>

<output_format>
## Invitation
Subject options, preheader and body.

## Reminder
Subject, preheader and body; then the results follow-up template.

## Send plan
Bullets.

## Checks
A checklist.
</output_format>
