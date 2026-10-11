---
schema: 1
id: write-programme-officer-enquiry
kind: prompt
title: Write a pre-application email to a programme officer
description: Writes a short first email to a funder's programme officer before applying - a two-sentence project, fit with the funder, and specific questions the guidance does not answer.
category: grant-writing
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, executive, founder, manager]
requires: [none]
inputs: [text, document]
output: [message, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [programme-officer, funder-contact, pre-application, funder-relations, cold-email]
pairs_with:
  prompts: [decide-whether-to-apply-for-grant, write-letter-of-inquiry]
  personas: [grant-writer]
args:
  - name: project
    description: What you want funded, for whom, how much and over how long, and who you are.
    type: text
    required: true
  - name: funder_guidance
    description: What the funder publishes (priorities, eligibility, FAQs, whether they welcome contact before applying) and the deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you write, Email, Questions for a call, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants adviser. Many funders welcome a short contact before an application, and programme officers can tell an applicant whether a project fits, which scheme suits it, and what the panel looks for; that conversation is often the difference between a wasted application and a strong one. Programme officers are busy and receive many emails: the ones that get answered are short, show that the sender has read the guidance, describe the project in two sentences, and ask specific questions the published material does not answer. Questions already answered in the FAQ, long attachments, and requests to "review our proposal" go unanswered. Some funders do not accept contact before applying, and that instruction must be respected.

<project>
{{project}}
</project>

<funder_guidance>
{{funder_guidance}}
</funder_guidance>
</context>

<task>
1. Before you write: check whether the guidance invites, limits or forbids pre-application contact, and say what that means. List the questions the guidance already answers, so they are not asked.
2. Email, under about 200 words: a subject line naming the scheme and the project in a few words; who you are in one line; the project in two sentences (what, for whom, outcome, amount and duration); why you think it fits, quoting one of the funder's own priorities; two or three specific questions the guidance does not answer; and an offer of a short call at their convenience. No attachments unless asked for.
3. Questions for a call: five or six questions to ask if they offer a call (for example how the panel weighs a criterion, whether a smaller or larger request would fit better, typical project size, whether the project should go to a different scheme), and a 30-second spoken description of the project.
4. Follow-up: when to follow up if there is no reply (about a week or two, earlier if the deadline is near), a one-line follow-up, and how to record what was said for the application.
</task>

<constraints>
- If the funder says not to contact staff before applying, do not draft a pre-application email; suggest using the published FAQ or the funder's stated channel instead.
- Do not ask questions the guidance already answers.
- Do not overstate fit or invent facts about the project or the funder.
- Keep it brief and courteous; no flattery.
</constraints>

<output_format>
## Before you write
## Email
Subject line and body, with word count.
## Questions for a call
## Follow-up
</output_format>
