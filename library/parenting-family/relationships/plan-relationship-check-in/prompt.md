---
schema: 1
id: plan-relationship-check-in
kind: prompt
title: Plan a relationship check-in
description: Guides a couple through a structured, low-pressure weekly or monthly relationship check-in with a timed agenda, questions tailored to their focus and ways to pause when it gets tense.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [couples, communication, check-in, connection]
pairs_with:
  prompts: [choose-meaningful-gift, coordinate-family-calendar]
args:
  - name: focus
    description: What you want the check-in to help with, for example "we feel like flatmates since the baby", "money stress", "more fun together". Optional.
    type: text
  - name: format
    description: Weekly check-ins are short and practical; monthly ones are longer and go deeper.
    type: enum
    enum: [weekly, monthly]
    default: weekly
output_contract:
  format: markdown
  sections: [How to set it up, Agenda, Questions for this time, If it gets tense, Notes to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples set up a regular check-in: a short, planned conversation about how the relationship is going, so small things get said before they become big ones. Couples researchers and therapists recommend versions of this (for example a weekly "state of the union" meeting) built on the same habits: start with appreciation, take turns speaking and listening without interrupting, raise a complaint gently ("I feel… about… and I would like…") rather than as criticism of the other person, handle one topic at a time, take a break if either person gets flooded, and end on connection. It is a habit for a relationship that is basically safe, not a substitute for couples therapy.

Format: {{format}}
{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
1. Setup: when and where, length (weekly 20–30 minutes; monthly 45–60 minutes), phones away, and three or four ground rules they agree to.
2. A timed agenda for the {{format}} check-in:
   - appreciations: each names two or three specific things from the period;
   - what went well and how connected each feels, on a 1–10 scale with no debate about the numbers;
   - logistics, kept brief (calendar, money, household);
   - one concern each, using a gentle start-up template, with the listener summarising before responding;
   - one request each ("one thing that would help me feel cared for this week");
   - something to look forward to (plan a date or shared activity);
   - close with a thank-you.
   For monthly check-ins, add a deeper topic slot (goals, money, intimacy, family, personal growth) and a short look back at last month's agreements.
3. Write 8–12 questions tailored to the focus, mixing light and deeper ones.
4. Give phrases for when it gets tense: a pause phrase, a repair attempt, and how to take a 20-minute break and come back.
5. Give a simple notes template for agreements and follow-ups.
</task>

<constraints>
- Neutral and inclusive: no assumptions about gender, marriage or family structure, and no taking sides.
- Low pressure: they can skip a section, and a short check-in is better than none.
- If the focus suggests fear of a partner, control (checking phones, restricting friends or money), threats or violence, do not suggest a joint check-in as the fix, because it can be unsafe. Say gently that what they describe can be a form of abuse, and point to confidential domestic abuse support or emergency services if they are in danger.
- If the focus involves ongoing serious conflict, infidelity, or thoughts of separating, suggest a couples therapist alongside the check-in.
</constraints>

<output_format>
## How to set it up
## Agenda
Table: Minutes | Part | What to say or ask.
## Questions for this time
Numbered.
## If it gets tense
## Notes to keep
A short template.
</output_format>
