---
schema: 1
id: write-grant-cover-letter
kind: prompt
title: Write a grant application cover letter
description: Writes the cover letter sent with a full grant application, stating the request, the fit with the funder, who has authorised it and who to contact, within the funder's rules.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, executive, founder]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [cover-letter, grant-submission, funder-letter, authorised-signatory]
pairs_with:
  prompts: [write-grant-application, write-letter-of-inquiry, check-grant-application-before-submission]
  personas: [grant-writer]
args:
  - name: application
    description: The essentials of the application - organisation, project title, amount requested and period, total project cost, the one-line purpose, key outcomes, and the programme or scheme applied to.
    type: text
    required: true
  - name: funder
    description: The funder's name, the programme, any instructions about cover letters (allowed, required, length, what to include), and any previous contact such as an invitation or a conversation with a programme officer.
    type: text
    required: true
  - name: signatory
    description: Who signs (name and title, usually the chief executive or board chair) and the day-to-day contact if different. Optional; placeholders are used if empty.
    type: string
output_contract:
  format: markdown
  sections: [Rules check, Cover letter, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer. A cover letter for a full application is short, usually one page, and does a few practical jobs: it states exactly what is being requested (amount, period, programme), connects the request to the funder's purpose in one or two sentences, shows that the application is authorised by the organisation's leadership, refers to any earlier contact or invitation, lists what is enclosed if submitting by post or email, and gives a contact. Some funders do not accept cover letters, or ignore them, and some portals have no place for one; sending one where it is not wanted adds nothing. A cover letter does not repeat the proposal or introduce new claims that the application does not support.
</context>

<task>
Write the cover letter.

<application>
{{application}}
</application>

<funder>
{{funder}}
</funder>
{{#signatory}}
Signatory and contact: {{signatory}}
{{/signatory}}

1. Rules check: say whether the funder's instructions allow or require a cover letter, any length or content rules, and if the instructions are silent, advise checking (many portals have no upload slot for one).
2. Cover letter: on one page, with date and addressee placeholders if unknown. Paragraph one: the organisation, the programme applied to, the amount and period, and the project title. Paragraph two: what the project will achieve and why it fits the funder's stated purpose, in two or three sentences using figures from the input. Paragraph three: reference to any invitation or prior conversation, confirmation that the board or leadership has approved the application, and enclosures if relevant. Close with the contact person and thanks, signed by the signatory.
3. Gaps to fill: missing facts as [NEEDED: ...], such as the addressee's name and title.
</task>

<constraints>
- Use only facts from the input; never invent outcomes, figures, endorsements or a prior conversation.
- Do not claim board approval unless the user confirms it; otherwise use [CONFIRM: board approval].
- Keep under one page (about 250-350 words) unless the funder says otherwise.
- Address a named person only if the user supplies the name; never guess a programme officer's name.
</constraints>

<output_format>
## Rules check
## Cover letter
The full letter, ready to paste.
## Gaps to fill
</output_format>
