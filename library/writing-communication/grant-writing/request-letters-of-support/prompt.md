---
schema: 1
id: request-letters-of-support
kind: prompt
title: Request letters of support for a grant
description: Plans and writes the requests for letters of support or commitment for a grant, with a tailored ask and draft letter for each partner, the facts each must state, deadlines and a tracker.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer, manager, researcher, founder]
requires: [none]
inputs: [text, document]
output: [message, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [letters-of-support, letters-of-commitment, partners, stakeholder-outreach, deadline-tracking]
pairs_with:
  prompts: [write-letter-of-support, write-grant-application, plan-consortium-grant-bid]
  personas: [grant-writer]
args:
  - name: project
    description: A short summary of the project, the funder and the submission deadline.
    type: text
    required: true
  - name: supporters
    description: Each person or organisation you want a letter from, your relationship with them, and what they will actually contribute (cash, in-kind, access, referrals, advice, data, endorsement).
    type: text
    required: true
  - name: funder_rules
    description: What the funder says about letters - required or optional, letters of support versus commitment, addressee, format, maximum number, whether they go in the application or are sent directly. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rules and plan, Tracker, Request messages, Draft letters, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant coordinator. Letters are often the last thing to arrive and the easiest to get wrong. Reviewers discount generic letters that praise the applicant; they value letters that state a specific commitment (hours, space, cash or in-kind value, access to participants, data, a role on an advisory group) consistent with the application and budget, on letterhead, signed by someone with authority to commit. Busy supporters respond faster when asked early, given a clear deadline well before the funder's, and offered a short draft they can edit into their own words. Some funders limit the number of letters, forbid them, require a particular format, or treat a letter of commitment as binding, so the rules come first.
</context>

<task>
Plan and write the requests.

<project>
{{project}}
</project>

<supporters>
{{supporters}}
</supporters>
{{#funder_rules}}
<funder_rules>
{{funder_rules}}
</funder_rules>
{{/funder_rules}}

1. Rules and plan: what the funder requires or allows; which supporters are essential (their contribution is in the budget or methods) and which are optional; and an internal deadline at least one to two weeks before submission. If rules are not given, list what to check.
2. Tracker: a table of supporter, type of letter, contribution to state, signatory needed, date asked, internal deadline, status.
3. Request messages: a short, specific email for each supporter: what the project is in two sentences, what you are asking them to confirm, the deadline, the format (letterhead, signature, addressee), and an offer of a draft.
4. Draft letters: one tailored draft per supporter, written in their voice, stating only the contribution in the input, with placeholders for anything they must confirm (such as value of in-kind time), clearly marked as a draft for them to edit and sign.
5. Follow-up: a reminder message and what to do if a key letter does not arrive (alternative evidence, adjusting the application).
</task>

<constraints>
- Draft letters must state only contributions the supporter has agreed to or is being asked to confirm; never invent commitments, figures or endorsements.
- Make clear in each request that the supporter should edit the draft into their own words and only sign what is true.
- Keep each draft letter's commitments consistent with the application and budget.
- Follow the funder's rules on number, format and addressee.
</constraints>

<output_format>
## Rules and plan
## Tracker
Table: Supporter | Letter type | Contribution to state | Signatory | Asked | Due | Status.
## Request messages
One per supporter.
## Draft letters
One per supporter.
## Follow-up
</output_format>
