---
schema: 1
id: write-public-consultation-response
kind: prompt
title: Write a public consultation response
description: Writes a response to a government or regulator public consultation that answers the published questions in order, states the respondent's position with evidence and proposes concrete changes.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [executive, founder, consultant, individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [public-consultation, policy-response, regulator, advocacy, call-for-evidence]
pairs_with:
  prompts: [write-white-paper, review-document-for-ambiguity, write-executive-summary]
args:
  - name: consultation_questions
    description: The consultation's numbered questions as published, plus the title, the body running it, the deadline, any word limits and the key proposals they refer to.
    type: text
    required: true
  - name: respondent_position
    description: Who is responding (an individual, a business, a charity, an association and who it represents), what you support, what you oppose and what you want changed.
    type: text
    required: true
  - name: evidence
    description: Facts, figures, cases, research and member experiences you can cite, with sources. Mark anything confidential.
    type: text
output_contract:
  format: markdown
  sections: [Response, Evidence used, Gaps and risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Officials who analyse consultation responses usually code them question by question, often in a spreadsheet, counting positions and extracting evidence and specific proposals. A response has influence when it is easy to code (it answers each numbered question under that number, with a clear position), when it brings evidence the officials do not already have (data, costs, real cases, the experience of the people the respondent represents), and when it proposes a specific, workable change to the text or design of the proposal. Responses that restate the respondent's general views, attack motives, ignore the questions, or overstate evidence are discounted, and identical campaign letters are typically counted once.
</context>

<task>
Draft a consultation response.

<consultation_questions>
{{consultation_questions}}
</consultation_questions>

<respondent_position>
{{respondent_position}}
</respondent_position>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. If the questions are missing, or you cannot tell what the respondent wants, ask for them and stop.
2. Write a short respondent statement: who is responding, whom they represent and how many, their relevant experience, and any interest to declare. Use placeholders for details not supplied.
3. Write a summary of the response in four to six bullets: the overall position and the most important changes sought.
4. Answer every question under its own number and wording, in order:
   - Start with a clear position where the question invites one (Agree, Disagree, Partly agree, Do not know, or the answer options the consultation gives).
   - Give the reasons, most important first, each supported by evidence from the input with its source.
   - Describe the practical impact on the people the respondent represents (costs, time, risks, unintended consequences), quantified where the evidence allows.
   - Propose a specific change: revised wording, a threshold, a transition period, an exemption or an alternative mechanism. Say what problem the change solves.
   - Acknowledge the policy aim and any trade-off honestly; officials discount responses that pretend there is none.
   If the respondent has no view or evidence on a question, write "No response" rather than padding.
5. Respect word limits per question or overall; if the evidence will not fit, prioritise the questions most central to the respondent's position and say which were shortened.
</task>

<constraints>
- Use only the evidence supplied. Never invent statistics, studies, cases, quotes or legal references. Where a claim would need evidence that is not given, mark it `[evidence needed: …]`.
- Distinguish data from anecdote and from opinion in the wording ("in a survey of 212 members, 64% said…" versus "several members told us…").
- Respectful and precise; no attacks on officials or other stakeholders.
- Responses are often published. Flag anything in the input marked confidential or that identifies individuals, and keep it out of the main response unless the user says otherwise.
- This is drafting help, not legal advice. If the proposal has legal consequences for the respondent, note that a legal adviser should review the position before submission.
</constraints>

<output_format>
## Response
Respondent statement · Summary · Answers by question number (heading = number and question text).
## Evidence used
Table: Claim · Question number · Source from the input · Type (data, case, expert view, member experience).
## Gaps and risks
Bullets: `[evidence needed: …]` items, questions left unanswered, possible weaknesses officials may probe, confidentiality flags, and the deadline and submission route if given.
</output_format>
