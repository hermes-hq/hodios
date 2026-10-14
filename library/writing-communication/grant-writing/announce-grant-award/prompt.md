---
schema: 1
id: announce-grant-award
kind: prompt
title: Announce a grant award
description: Writes a news item, a staff and stakeholder note and social posts announcing a grant award, following the funder's acknowledgement, logo and approval rules and any embargo.
category: grant-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [marketer, manager, writer, content-creator]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [copy, post, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [grant-award, press-release, funder-acknowledgement, social-posts, announcement]
pairs_with:
  prompts: [plan-post-award-setup, plan-funder-stewardship]
  personas: [grant-writer]
args:
  - name: award
    description: Who funded what - funder name and programme, amount and period (if you may disclose it), what the grant will do and for whom, partners, and a quote from your leader if you have one.
    type: text
    required: true
  - name: funder_rules
    description: The funder's acknowledgement rules - required wording, logo use, whether they must approve announcements, embargo dates, and whether the amount may be published. Paste from the award letter or brand guidance. Optional.
    type: text
  - name: channels
    description: Where it will go - website, newsletter, local press, staff, specific social platforms. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Rules check, News item, Stakeholder note, Social posts, Before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a communications officer in a funded organisation. Announcing a grant is good for the organisation and the funder, but funders often set rules: required acknowledgement wording, how and where their logo may be used, approval of press releases or quotes, embargoes until their own announcement, and sometimes a request not to publish the amount. Getting these wrong annoys the funder at the start of the relationship. Strong announcements lead with what will change for people rather than with the money, name the funder accurately and thank them, include one concrete detail about the work, and are adapted to each channel. Quotes attributed to the funder must come from the funder.
</context>

<task>
Write the announcement set.

<award>
{{award}}
</award>
{{#funder_rules}}
<funder_rules>
{{funder_rules}}
</funder_rules>
{{/funder_rules}}
{{#channels}}
Channels: {{channels}}
{{/channels}}

1. Rules check: required wording, logo, approval, embargo and disclosure of the amount, from the rules given. If rules are not given, list these as items to check in the award letter or with the funder before publishing.
2. News item: about 250-350 words for the website or local press: headline, first paragraph on what the grant makes possible for whom, the funder named with required acknowledgement, details of the work and timeline, a leader quote from the input or a [QUOTE NEEDED] placeholder, a [FUNDER QUOTE: to be supplied and approved by the funder] slot, and a short "about us" line.
3. Stakeholder note: a short note for staff, volunteers and partners: what was won, what it means for them, and what happens next.
4. Social posts: one post per channel requested (or a short and a longer version if none), with the funder's handle as a placeholder for the user to confirm.
5. Before publishing: a checklist (approval, embargo date, logo version, amount disclosure, consent for any photos of people).
</task>

<constraints>
- Never invent quotes, especially from the funder; use placeholders.
- Do not publish the amount if the rules forbid it or are unknown; use a version without it and say so.
- Never invent the funder's social handle or logo rules; use placeholders.
- Lead with people and change, not the organisation's success.
</constraints>

<output_format>
## Rules check
## News item
## Stakeholder note
## Social posts
## Before publishing
Checklist.
</output_format>
