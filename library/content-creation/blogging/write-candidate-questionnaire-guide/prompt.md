---
schema: 1
id: write-candidate-questionnaire-guide
kind: prompt
title: Write a candidate questionnaire guide
description: Plans and writes a local election voter guide from candidate questionnaires, with equal questions, deadlines, a no-reply rule, verbatim answers within limits, neutral order and a method note.
category: blogging
version: 1.0.0
status: incubating
stage: [plan, build]
role: [editor, writer]
subject: [public-sector]
requires: [none]
inputs: [text, document]
output: [docs, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [voter-guide, local-elections, candidate-questionnaire, editorial-fairness, civic-reporting]
pairs_with:
  prompts: [write-council-meeting-story, write-news-story]
args:
  - name: race
    description: The election and race - office, area, election date, who is on the ballot (from the official candidate list), your outlet or group, and the issues readers care about.
    type: text
    required: true
  - name: stage
    description: Whether you are preparing the questions and candidate letter, or publishing the guide from the answers you received.
    type: enum
    enum: [questions, publish]
    default: questions
  - name: candidates_and_answers
    description: Optional at the questions stage. For publishing - each candidate's answers exactly as received, when each came in, and who did not reply.
    type: text
output_contract:
  format: markdown
  sections: [Fairness rules, Questionnaire, Voter guide, How this guide was made, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help local outlets, civic groups and student media run fair candidate questionnaires. A voter guide is only as credible as its process: every candidate on the official list gets the same questions, the same way, on the same day, with the same deadline and word limit; answers are published as received; and non-replies are reported neutrally. Guides lose trust through loaded or leading questions, questions only one candidate can answer well, editing or "fixing" one candidate's answer, ordering that favours someone, and quietly dropping a candidate. Rules on election coverage differ by place, and some organisations, such as charities and tax-exempt groups in some countries, must not support or oppose candidates.

Stage: {{stage}}.
</context>

<task>
<race>
{{race}}
</race>
{{#candidates_and_answers}}
<candidates_and_answers>
{{candidates_and_answers}}
</candidates_and_answers>
{{/candidates_and_answers}}

1. Fairness rules: the candidate list source (the official list on a stated date), same questions and method for all, sent the same day, deadline and one reminder, word limit per answer, publish verbatim (spelling as submitted) with cuts only at the limit and marked "[answer cut at N words]", a no-reply line ("did not respond by the deadline of [date]"), order method (ballot order, alphabetical, or a recorded random draw), equal space and equal photo treatment, and no endorsement in the guide.
2. Questionnaire: 5-8 questions on the powers of this office and the issues readers named. Each question is open, neutral, specific to the office, and answerable by every candidate. Include one "what would you do in your first year" question and one on a concrete local decision. Add a short biographical section with the same fields for all (occupation, relevant experience, website), a word limit for each question, and the deadline.
3. Candidate message: a short, neutral email that explains the process, the deadline, the word limit, the publication date and the verbatim rule.
4. Voter guide:
   - questions stage: give the layout template with placeholders.
   - publish stage: build the guide from the answers using the chosen order, verbatim answers within the limits, the no-reply line where needed, and a box on how and where to vote, from details in the notes only.
5. How this guide was made: a short note for readers covering the list source, dates sent and due, reminder, rules, order method and contact for corrections.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never rewrite, summarise, correct or rank candidate answers, and never add your own assessment of them. Fact-checks, if any, belong in a separate, clearly labelled piece.
- Do not invent candidates, answers, dates, polling places or rules; mark gaps as [X].
- Apply every rule identically; if an answer arrived late or ran over, apply the stated rule and note it under Checks.
- Do not state election law as fact. List what to check locally (rules for the organisation's legal status on candidate coverage, election-period restrictions, equal-access rules) and suggest asking the election office or a media lawyer.
- If the race or the candidate list source is missing, ask for it and stop. At the publish stage, if no answers are given, ask for them (with arrival dates and who did not reply) and stop.
</constraints>

<output_format>
## Fairness rules
Numbered rules.

## Questionnaire
Bio fields, numbered questions with word limits, deadline, then the candidate message.

## Voter guide
Template (questions stage) or the finished guide (publish stage).

## How this guide was made
Reader-facing method note, under 150 words.

## Checks
Bullets: late or over-length answers and how the rule was applied, missing candidates, and legal or policy items to confirm.
</output_format>
