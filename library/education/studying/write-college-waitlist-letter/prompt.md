---
schema: 1
id: write-college-waitlist-letter
kind: prompt
title: Write a college waitlist letter
description: Writes a letter of continued interest for a waitlisted or deferred college applicant with genuine updates, specific fit and a clear commitment only where it is true.
category: studying
version: 1.0.0
status: incubating
stage: [build]
role: [student]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [waitlist, deferral, letter-of-continued-interest, college-admissions, application-update]
pairs_with:
  prompts: [write-why-this-college-essay, choose-between-college-offers, plan-university-application]
args:
  - name: status
    description: The school, whether you were waitlisted or deferred, the date of the decision, and any instructions the school gave (opt-in form, portal update, deadline, whether letters are accepted).
    type: text
    required: true
  - name: updates
    description: What is new since you applied - grades, awards, test scores, leadership, projects, a visit or conversation with the school.
    type: text
    required: true
  - name: fit
    description: Why this school, specifically - what draws you and how you would take part. Include anything you learned since applying.
    type: text
    required: true
  - name: commitment
    description: Optional, only if true - for example "this is my first choice and I will enrol if admitted". Leave out if you are not sure.
    type: string
output_contract:
  format: markdown
  sections: [Before you send, Letter, What not to include, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A letter of continued interest can help a waitlisted or deferred applicant because colleges want admitted students who will actually enrol, and a short, specific update shows both interest and growth. It only helps if it follows the school's instructions: some schools ask applicants to opt in through the portal, some ask for one update and no more, and some say they do not want additional materials. Effective letters are short (about one page), lead with genuine updates since the application, show specific fit beyond what the application already said, and state a commitment to enrol only if it is true, because telling more than one school it is the first choice is dishonest and can backfire. Weak letters repeat the application, plead, or send a flood of extra documents.
</context>

<task>
Write the letter.

<status>
{{status}}
</status>

<updates>
{{updates}}
</updates>

<fit>
{{fit}}
</fit>
{{#commitment}}
Commitment: {{commitment}}
{{/commitment}}

1. Before you send: say what to check first - opt in to the waitlist if required, whether the school accepts letters and how (portal, admissions officer email), any deadline, and whether a new recommendation is welcome. If the school says not to send additional material, say not to send the letter and suggest only the steps it allows.
2. Write the letter, under about 350 words: a clear opening that reaffirms interest (and the commitment if given), the updates in order of significance with brief context, two or three specific fit points that add to the application, and a polite close with the applicant's name and application ID as [BRACKETS].
3. List what not to include: repeated application content, complaints about the decision, mentions of other schools' offers unless the school asks, unrequested extra documents, and a first-choice claim that is not true.
4. Give follow-up advice: one later update if something significant happens, keep working at current grades, keep the other options and deposit deadlines in view, and do not contact the office repeatedly.
</task>

<constraints>
- Use only the updates and fit the student gave; do not invent achievements, visits or school details.
- Include a first-choice or enrolment commitment only if the student stated it. If they did not, write interest without a commitment.
- Do not suggest that the letter guarantees admission.
- If there are no real updates, say the letter should be brief and focus on fit, rather than padding.
</constraints>

<output_format>
## Before you send
## Letter
## What not to include
## Follow-up
</output_format>
