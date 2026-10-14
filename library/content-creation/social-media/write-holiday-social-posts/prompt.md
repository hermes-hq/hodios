---
schema: 1
id: write-holiday-social-posts
kind: prompt
title: Write holiday and awareness day social posts
description: Picks which holidays and awareness days a business should post about, with a relevance test and when to stay quiet, then writes posts that connect to the business genuinely and respectfully.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder, content-creator]
inputs: [text, preferences]
output: [post, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [awareness-days, holiday-calendar, cultural-sensitivity, brand-voice]
pairs_with:
  prompts: [brainstorm-brand-memes, plan-content-calendar, write-sale-announcement-posts]
  personas: [social-media-manager]
args:
  - name: business
    description: What the business does, for whom, where its audience lives, its voice, and anything it actually does that relates to causes (donations, staff programmes, products).
    type: text
    required: true
  - name: period
    description: The months to cover, for example "October to December" or "next quarter".
    type: string
    required: true
  - name: dates_in_mind
    description: "Optional: holidays or awareness days you are considering or have posted about before."
    type: text
output_contract:
  format: markdown
  sections: [Relevance test, Date shortlist, Posts, Days to skip, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Holiday and awareness-day posts are easy to plan and easy to get wrong. Audiences scroll past generic "Happy Monday-of-X!" graphics, and they criticise brands for "performative" posts: a rainbow logo with no action behind it, a sales promotion on a day of mourning or remembrance, a cause the company has never supported. Religious and cultural holidays need correct names, dates and greetings, and some are solemn rather than festive. Dates also differ by country and some move each year with lunar or religious calendars. A short relevance test decides which days to use: a real connection to the business or audience, something specific to say or do, and a tone that fits the day.

<business>
{{business}}
</business>
Period: {{period}}
{{#dates_in_mind}}
<dates_in_mind>
{{dates_in_mind}}
</dates_in_mind>
{{/dates_in_mind}}
</context>

<task>
1. Write a relevance test of three questions the business can apply to any date (real connection, something specific to say or do, tone that fits).
2. Shortlist dates in the period for the audience's countries: major public and cultural holidays, seasonal moments, and awareness days with a clear link to the business. For each, give the approximate date with [VERIFY DATE] where it moves each year or differs by country, the link to the business, and whether to post.
3. Write a post for each date that passes the test: the connection stated plainly, something useful or genuine (a tip, a thank-you, what the business is actually doing), the correct greeting or name, and a tone that fits. Solemn days get no promotion.
4. List days to skip and why, including ones in the dates in mind that fail the test.
5. Check before posting: dates confirmed for this year and country, spelling of names and greetings, no sales angle on solemn days, claims about support backed by real actions.
</task>

<constraints>
- Do not invent causes, donations, partnerships or staff stories the business did not mention.
- Do not state exact dates for moving holidays without [VERIFY DATE].
- Keep greetings respectful and accurate; when unsure of a greeting's form, say so.
- Under about 100 words per post.
</constraints>

<output_format>
## Relevance test
Three questions.
## Date shortlist
Table: Date | Day | Link to business | Post or skip.
## Posts
One subsection per date: post text and visual idea.
## Days to skip
Bullets with reasons.
## Check before posting
Checklist.
</output_format>
