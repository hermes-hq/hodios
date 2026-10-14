---
schema: 1
id: write-email-course
kind: prompt
title: Write an email course
description: Writes a five to seven day email course with one lesson and one small exercise per email, a quick win on day one, consistent subject lines and an honest bridge to the newsletter.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, marketer, teacher]
requires: [none]
inputs: [notes, topic, text]
output: [copy, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [email-course, lead-magnet, lessons, exercises, subscriber-onboarding]
pairs_with:
  prompts: [write-newsletter-welcome-email, write-newsletter-signup-page, create-lead-magnet]
args:
  - name: course_topic
    description: What the course teaches, the result a reader should get by the end, and your material - methods, examples, stories, templates you use.
    type: text
    required: true
  - name: reader
    description: Who signs up, their starting point and the problem that makes them want this.
    type: text
  - name: days
    description: How many emails (5 to 7).
    type: number
    default: 5
  - name: newsletter
    description: The regular newsletter readers move on to after the course - what it covers and how often - and what the signup form promised about it.
    type: text
output_contract:
  format: markdown
  sections: [Course plan, Emails, Signup blurb, Fill before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write short email courses that newsletter writers and small businesses use to welcome new subscribers and teach one useful thing. Email courses work when each email does one job: one lesson, one example, one small exercise the reader can do in about ten minutes. They fail when they read as a sales sequence in disguise, cram too much into each email, start with theory instead of a quick win, or end abruptly with no idea what comes next. Completion depends on early wins: if day one gets the reader a small result, they open day two. Consistent subject lines ("Day 2 of 5: ...") help readers find and follow the course. Ending with an honest bridge to the regular newsletter keeps readers who signed up for the course; moving them onto a list they did not agree to does not.
</context>

<task>
<course_topic>
{{course_topic}}
</course_topic>

<reader>
{{reader}}
</reader>

{{#newsletter}}
<newsletter>
{{newsletter}}
</newsletter>
{{/newsletter}}

Number of emails: {{days}}.

1. Course plan: the end result in one sentence, and one lesson per day that builds toward it. Day one must give a quick, concrete win. If the topic is too big for {{days}} emails, narrow it and say what you left out.
2. Write each email with: a subject line in a consistent "Day N of {{days}}:" format plus a specific benefit; preview text; a short opening linking to the previous day; the lesson in plain language with one example from the material; one exercise with clear steps and an estimated time; a reply prompt inviting the reader to share their result or question; and a one-line preview of tomorrow.
3. Keep each email between about 300 and 700 words.
4. Final email: recap the result, celebrate what the reader did, then the bridge: what the regular newsletter covers, how often it comes, and an easy way to opt out if they only wanted the course.
5. Write a short signup blurb for the course that states what arrives, how many emails and how often, and that the newsletter follows if that is the case.
</task>

<constraints>
- Use only methods, facts and examples from the material. Where a lesson needs an example or figure the material lacks, insert `[EXAMPLE: ...]` or `[CHECK: ...]`.
- No promises of guaranteed results, income or health outcomes.
- At most one soft mention of a paid offer, and only in the final email, if the input mentions one.
- Readers must only be moved onto the regular newsletter if the signup made that clear; if the input does not say, flag it under Fill before sending and write the signup blurb so it does.
</constraints>

<output_format>
## Course plan
The end result, then a table: day | lesson | quick win or exercise | minutes.

## Emails
Each email headed `### Day N`, with subject, preview text and body.

## Signup blurb
Two to four sentences.

## Fill before sending
Placeholders, the consent check for the newsletter bridge, and the send schedule (for example daily at the same time after signup).
</output_format>
