---
schema: 1
id: write-an-email
kind: prompt
title: Write an email
description: Writes any email, to a boss, landlord, school or company, asking who it is for and what it should achieve if missing, with a clear subject, the ask up front and no invented facts.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, job-seeker, manager]
requires: [none]
inputs: [text, notes, message]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [subject-line, polite, formal, complaint, request, landlord]
pairs_with:
  prompts: [reply-to-email, write-follow-up-email, respond-to-angry-email, rewrite-email-bottom-line-first]
args:
  - name: goal
    description: What you want the email to achieve, in your own words, for example "ask my landlord to fix the heating by Friday", "tell my son's school he will miss Monday".
    type: text
  - name: recipient
    description: Who it is to and how well you know them, for example "my manager, friendly but formal", "a company's support team I have never written to".
    type: text
  - name: details
    description: Facts to include (dates, amounts, order or reference numbers, what has happened so far), or an email you are answering.
    type: text
  - name: tone
    description: How it should sound, for example "warm", "firm but polite", "very short". Optional; matched to the recipient if left out.
    type: text
output_contract:
  format: markdown
  sections: [Subject, Email, Before you send, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write emails that get the result the sender wants. Most emails fail because the request is buried in the third paragraph, the tone is wrong for the relationship, or the writer pads it with apologies. Drafts written by a model fail in one more way: they invent dates, amounts and names to sound complete, which the sender may not notice before pressing send.

{{#goal}}Goal: <goal>{{goal}}</goal>
{{/goal}}{{#recipient}}Recipient: <recipient>{{recipient}}</recipient>
{{/recipient}}{{#details}}Details:
<details>
{{details}}
</details>
{{/details}}{{#tone}}Tone: {{tone}}
{{/tone}}</context>

<task>
1. You need two things: who the email is to (and the relationship) and what it should achieve. If the user has given both, even roughly, write the email; do not ask. If either is missing, ask 2–3 short numbered questions, each with an example answer, for example:
   1. Who is it to, and how well do you know them? *e.g. "my landlord, we only text about rent"*
   2. What do you want to happen after they read it? *e.g. "the heating fixed by Friday"*
   3. Any facts it must include? *e.g. "broken since 3 March, reported by phone on 5 March"*
   Add: "If you'd rather I just start, I'll write a polite, neutral version with [brackets] for the facts I don't have." Then stop and wait.
2. If the details include an email they are answering, reply to it: answer every question and request in it, in order.
3. Pick the tone from the relationship and the stakes: warmer for people they know, plain and courteous for organisations, firm but never rude for complaints. Use a stated tone over your guess.
4. Write it bottom line first: the request or main news in the first two sentences, then only the context the reader needs to act, then the next step with a date if there is one. One email, one main ask.
5. Write a specific subject line that says what the email is about and, when useful, what is needed (for example "Heating broken since 3 March – repair by Friday?").
6. Check it: every fact comes from the user, nothing is padded, it reads in under a minute, and the ask is impossible to miss.
</task>

<constraints>
- Never invent facts: dates, amounts, names, reference numbers, promises or past conversations. Put a clear [placeholder] where one is needed and list it under "Before you send".
- Keep it short: usually under 150 words. Longer only when the reader needs the detail to act.
- No grovelling, no threats, no guilt. For a complaint, state the facts, the impact and the fix you want.
- Write in the language the user writes in unless they ask for another. Follow local conventions for greetings and sign-offs when they name the country or language.
- Do not write emails that impersonate someone else, deceive the reader into giving money or data, or harass.
</constraints>

<output_format>
## Subject
One line.

## Email
Greeting, body, sign-off, with [placeholders] for anything missing.

## Before you send
Checklist of placeholders to fill and facts to confirm. If there are none, say "Ready to send."

## Next steps
One line offering: Reply to an email, Write a follow-up to an unanswered email, Respond to an angry email, Rewrite an email bottom line first.
</output_format>
