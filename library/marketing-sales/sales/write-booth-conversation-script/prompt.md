---
schema: 1
id: write-booth-conversation-script
kind: prompt
title: Write a booth conversation script
description: Writes the talk track for trade show booth staff - openers, two qualifying questions, a 30-second demo hook, a polite exit and what to capture for each lead.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, marketer, founder]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [trade-show, event-sales, booth-staff, lead-capture, qualification]
pairs_with:
  prompts: [follow-up-event-leads, qualify-leads, write-booth-copy]
  personas: [sales-coach]
args:
  - name: event_and_offer
    description: The event (type of show, who attends), what you are showing, any demo or giveaway, and who your ideal customer is among attendees.
    type: text
    required: true
  - name: goals
    description: What counts as a good lead or outcome (booked meetings, demo signups, distributor contacts) and any target.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Booth rules, Openers, Qualify, Demo hook, Exits, Lead capture]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train booth staff for trade shows. Most booth time is wasted: staff stand behind the table on their phones, open with "Can I help you?" (answer: "Just looking"), give a ten-minute demo to a student collecting free pens, and come home with badge scans nobody can follow up on because there are no notes. Good booth staff stand at the edge, open with a question about the visitor's world, qualify in under a minute, give a short relevant demo or book a meeting, and politely release poor fits so they are free for the next good visitor.

Lead notes matter more than lead counts. A scan with "ops manager, 40 sites, contract ends March, wants pricing" gets followed up and converted; a bare scan goes into a generic email and dies.
</context>

<task>
Write the booth talk track.

<event_and_offer>
{{event_and_offer}}
</event_and_offer>

<goals>
{{goals}}
</goals>

1. Set five booth rules for staff (position, phones, food, how many staff talk to one visitor, when to break).
2. Write five openers that are questions about the visitor's work or the show, not about the product, and one for people who stop to read the signage.
3. Write two qualifying questions that sort visitors into good fit, maybe, and not a fit within about a minute, with what each answer means.
4. Write a 30-second demo hook that shows the one thing most relevant to the visitor's answer, and the transition to the next step (book a meeting, longer demo, send info).
5. Write polite exits for poor fits, students or job seekers, competitors and people who want to talk too long, plus a line for when the booth is busy.
6. Define lead capture: the four or five fields to note on every scan, a rating scheme, and the follow-up promise to make at the booth.
</task>

<constraints>
- Use only the offer and event facts given; do not invent features, show specials or prices.
- No pushy or misleading tactics (fake prize draws, collecting data under false pretences). If a giveaway or prize draw collects contact details, say visitors must be told how their details will be used.
- Keep every line short enough to say naturally in a noisy hall.
- Lead notes must be factual and business-related, not personal judgements about the visitor.
</constraints>

<output_format>
## Booth rules
Five bullets.

## Openers
Numbered lines.

## Qualify
Two questions with answer guide.

## Demo hook
The 30-second script and the transition line.

## Exits
Line for each situation.

## Lead capture
Fields, rating scheme and the follow-up promise.
</output_format>
