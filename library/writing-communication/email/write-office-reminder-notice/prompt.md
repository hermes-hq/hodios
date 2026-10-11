---
schema: 1
id: write-office-reminder-notice
kind: prompt
title: Remind staff about a shared rule
description: Writes a firm but friendly reminder to colleagues about a shared rule, such as the kitchen, parking, expenses, timesheets or meeting rooms, that gets compliance without passive aggression.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, operations-manager, individual]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [workplace-reminder, office-rules, team-notice, friendly-firm, policy-reminder]
pairs_with:
  prompts: [write-internal-announcement, write-neighbourhood-notice, check-tone-before-sending]
args:
  - name: rule
    description: The rule or process, what keeps going wrong, the consequence (for others, for payroll, for safety), and any deadline or change, for example "timesheets due Friday 5pm; 9 people late last month so payroll ran late for everyone".
    type: text
    required: true
  - name: audience
    description: Who receives it (whole office, one team, all drivers) and whether this is the first reminder or a repeat.
    type: string
    required: true
  - name: sender
    description: Your role, so the tone and authority fit (office manager, team lead, finance).
    type: string
output_contract:
  format: markdown
  sections: [Email, Chat version, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
All-staff reminders are among the most rewritten emails in any office, because the first draft is usually either sarcastic ("some people seem to think the fridge cleans itself") or so soft no one acts. People who run offices know what works: say the rule and the action in the first lines, give the real reason in terms of its effect on colleagues, make the right behaviour easy (where the form is, when the cleaning rota runs), and state the consequence factually if there is one. Never shame a group for what one or two people did; if the problem is a specific person, a private word works and a mass email does not. Second and third reminders get shorter and firmer, not angrier.
</context>

<task>
Write a reminder to {{audience}}.{{#sender}} Sender: {{sender}}.{{/sender}}

<rule>
{{rule}}
</rule>

1. If the input does not say what people should actually do, ask one question and stop.
2. Subject: the action and the timing, for example "Reminder: timesheets due Fridays by 5pm".
3. First sentence: the rule as an action. Second: why it matters, in terms of its effect on colleagues, customers or safety.
4. Make it easy: where, how, by when, who to ask. Use a short list if there are several steps.
5. If there is a consequence (fridge cleared on Fridays, late claims paid next month), state it plainly once.
6. For a repeat reminder, be shorter and firmer, and refer to the previous reminder without sarcasm.
7. Close with a thank-you to those who already do it, not a blanket telling-off.
8. A chat version under 40 words for Teams, Slack or a group chat.
9. If the input shows the problem is one identifiable person, say under Notes that a private conversation will work better, and keep the email general.
</task>

<constraints>
- Email body under about 120 words.
- No sarcasm, capitals for emphasis, rhetorical questions, "as per my last email", or jokes at people's expense.
- Do not invent consequences, policies or deadlines; only state those given.
- Do not name or hint at individuals.
</constraints>

<output_format>
## Email
Subject, then body.
## Chat version
The short message.
## Notes
Tone choices and any advice. "None" if nothing.
</output_format>
