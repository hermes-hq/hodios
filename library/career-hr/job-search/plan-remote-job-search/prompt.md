---
schema: 1
id: plan-remote-job-search
kind: prompt
title: Plan a remote job search
description: Plans a search for remote roles, covering location and time-zone eligibility, where remote roles are posted, evidence of remote-work skills and how to filter out remote job scams.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [remote-work, time-zones, eligibility, job-scams, async-work, distributed-teams]
pairs_with:
  prompts: [plan-job-search, analyze-job-posting, write-cover-letter]
  personas: [career-coach]
args:
  - name: profile
    description: Your role, level, years of experience, and any remote or distributed work you have done.
    type: text
    required: true
  - name: location
    description: Where you live and are legally allowed to work, your time zone, and whether you could work as an employee, a contractor or both.
    type: text
    required: true
  - name: preferences
    description: What kind of remote you want (fully remote, remote within your country, hybrid as a fallback), hours overlap you can accept, and pay floor.
    type: text
output_contract:
  format: markdown
  sections: [What remote means for you, Where to look, Reading eligibility in postings, Proving you work well remotely, Scam filter, Weekly plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has hired for distributed companies. Most "remote" roles are not open to everyone: many are remote within one country or a list of countries (because the employer can only employ, pay tax and provide benefits where it has an entity or uses an employer of record), many require several hours of overlap with a time zone, and some are remote only for the first months. Applicants waste most of their effort on postings they are not eligible for. Remote roles also draw far more applicants per opening, so evidence of working well remotely (written communication, documented decisions, self-managed delivery, time-zone overlap) matters more than in office roles. Remote searches attract scams: fake recruiters, interviews by chat only, equipment cheques and requests for fees or personal data before any real interview.

<profile>
{{profile}}
</profile>
<location>
{{location}}
</location>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. What remote means for you: from the location and work status, say which kinds of remote roles the person is realistically eligible for (remote in their own country, remote in a region, worldwide, contractor arrangements, employer-of-record hiring), and which they should skip. Name any work authorisation or tax-residence questions to check, without stating the rules as fact.
2. Where to look: channels that suit remote roles in this field (remote-focused job boards, location filters on general boards, company career pages of distributed-first employers, communities in the field, referrals). Name boards only as examples to verify; prefer describing types of channel.
3. Reading eligibility in postings: the phrases that signal restrictions ("remote, US only", "must be within UTC-2 to UTC+2", "remote in the EU", "occasional travel to office", "candidates must reside in"), what to do when a posting is unclear (ask the recruiter in one line before applying), and a quick filter checklist.
4. Proving you work well remotely: how to show it in the resume, cover letter and interviews: written artifacts, async collaboration, examples of working across time zones, home-office setup and availability window. Tie to the person's real experience; where they have none, suggest honest ways to show it.
5. Scam filter: warning signs (interviews only by chat, offers without a real interview, requests to pay for equipment or training, cheques to deposit, personal ID or bank details before a signed offer, email addresses that do not match the company domain) and how to verify an employer.
6. Weekly plan: channels, number of targeted applications and outreach, and a weekly review, with a note that remote roles have more competition so referrals and tailored applications matter more.
</task>

<constraints>
- Do not state immigration, employment or tax law as fact. Say what to check and with whom.
- Do not invent companies, salaries or job boards' features. Examples are labelled to verify.
- If the person's location makes most remote roles hard to get, say so plainly and give the best paths (local remote, contractor work, regional employers).
- Do not suggest misrepresenting location or time zone, or using a VPN to appear eligible.
</constraints>

<output_format>
## What remote means for you
Table: Type of remote | Eligible? | What to check.
## Where to look
## Reading eligibility in postings
Phrase list and a filter checklist.
## Proving you work well remotely
## Scam filter
Checklist.
## Weekly plan
## Open questions
Missing facts that would change the plan, each with the assumption used, or "None".
</output_format>
