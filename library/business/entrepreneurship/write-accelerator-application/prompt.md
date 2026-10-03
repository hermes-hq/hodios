---
schema: 1
id: write-accelerator-application
kind: prompt
title: Write an accelerator application
description: Writes answers for a startup accelerator or incubator application - a crisp one-liner, problem, traction, team and why now - within the form's limits and without hype.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [build]
role: [founder]
inputs: [text, document]
output: [docs, rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [accelerator, startup-application, one-liner, traction, why-now]
pairs_with:
  prompts: [write-elevator-pitch, write-pitch-deck-outline, write-investor-intro-request]
  personas: [startup-mentor, venture-capitalist]
args:
  - name: startup
    description: Everything about the startup - what it does, for whom, how it makes money, traction with numbers and dates, team backgrounds and how long you have known each other, competitors, funding so far, and any insight others miss. Rough notes are fine.
    type: text
    required: true
  - name: questions
    description: The application questions, pasted exactly, with any word or character limits.
    type: text
    required: true
  - name: accelerator
    description: The programme you are applying to and anything you know about what it looks for (sector focus, stage, location, its published advice to applicants).
    type: string
output_contract:
  format: markdown
  sections: [Answers, Gaps to fill, Consistency check, Reviewer read]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have read thousands of accelerator applications as a partner and later coached founders through them. Reviewers spend a few minutes per application and look for clarity, evidence of progress, and a team that can build and sell. The applications that get interviews say what the company does in one plain sentence a stranger could repeat, show numbers instead of adjectives, explain a non-obvious insight, and present a team with the skills to execute. They do not use buzzwords, inflate traction, or answer a different question than the one asked.
</context>

<task>
Write the application answers.

<startup>
{{startup}}
</startup>

<questions>
{{questions}}
</questions>
{{#accelerator}}
Programme: {{accelerator}}
{{/accelerator}}

1. Read every question and note its limit. If a question has no limit, keep the answer short (under 100 words unless it obviously needs more).
2. Answer each question in order, under its exact wording, following these patterns where the question fits:
   - What you do: one sentence of the form "We make X for Y so they can Z," with no jargon. Then one or two sentences of detail.
   - Problem: who has it, how they handle it today and what that costs them, with a concrete example.
   - Traction: specific numbers with dates and growth rates (revenue, paying customers, usage, retention, pilots, waitlist), strongest metric first. Say what is paid and what is free.
   - Team: why this team, with the one relevant fact per founder (built X, sold to Y, lived the problem), who codes or builds, who sells, and how long the founders have worked together.
   - Why now: the change (technology, regulation, behaviour, cost) that makes this possible or necessary now.
   - Insight and competition: what you understand that others do not, named alternatives including doing nothing, and why customers choose you.
   - Ask or plans: what you would accomplish during the programme, with measurable goals.
3. Count words or characters for each answer and stay at least 5% under the limit.
4. Gaps to fill: list every fact the answers need that the notes did not provide, with a placeholder in the answer such as [NEEDED: monthly revenue for the last three months].
5. Consistency check: confirm that numbers, names and claims match across all answers.
6. Reviewer read: as a reviewer, give the two strongest points of the application, the two weakest, and the question a partner would ask first in an interview.
</task>

<constraints>
- Never invent traction, customers, revenue, team credentials, partnerships or quotes. Missing facts become placeholders.
- Plain language only. Remove "revolutionary", "disruptive", "AI-powered platform" and similar unless the sentence still says something concrete after removing the adjective.
- Answer the question asked, first sentence first; do not reuse one generic paragraph across questions.
- If the startup is too early for a claim the question expects (for example no traction), answer honestly with the strongest real evidence of progress: interviews, prototypes, letters of intent, speed of iteration.
- Keep each founder's voice: first person plural, direct, confident without hype.
</constraints>

<output_format>
## Answers
For each question: the question in bold, the answer, then (word or character count / limit).
## Gaps to fill
## Consistency check
## Reviewer read
</output_format>
