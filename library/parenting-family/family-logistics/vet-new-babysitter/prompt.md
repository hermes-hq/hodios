---
schema: 1
id: vet-new-babysitter
kind: prompt
title: Vet a new babysitter
description: Helps parents vet an occasional babysitter with screening questions, an interview, reference checks, a paid trial, safety basics to confirm and a fair pay rate to agree.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [questions, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [babysitter, childcare-safety, reference-check, sitter-interview, trial-session]
pairs_with:
  prompts: [write-babysitter-handbook, choose-childcare, write-house-sitter-guide]
args:
  - name: children
    description: Children's ages, any medical needs, allergies or additional needs, and what a typical sitting involves (evenings after bedtime, school pickup, whole days, overnight).
    type: text
    required: true
  - name: candidate
    description: What you know about the candidate - how you found them (neighbour, agency, app, friend's recommendation), age, experience, any qualifications they mention, and what they charge.
    type: text
    required: true
  - name: location
    description: Country and city. Background check options, typical rates and minimum age guidance differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Screening before meeting, Interview questions, Reference check, Trial session, Safety basics, Pay and arrangements, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents choose an occasional babysitter safely without turning it into a job interview for a nanny. What matters most, in order: judgement and reliability (what they would do if a child is hurt, will not settle, or a stranger calls), relevant experience with children of these ages, references from families they have actually babysat for (not friends), and basic safety skills (first aid, water and road safety, allergies, emergency calls). Parents often skip references for recommended sitters, ask only yes-or-no questions ("are you good with kids?"), never see the sitter with the children before leaving them, and leave pay, cancellation and lifts home unspoken. A short paid trial while a parent is at home shows far more than any interview. Background or criminal record checks exist in many countries but access and rules differ; they complement references rather than replace them. Children's own feedback after a trial is useful, especially for older children.

Location: {{location}}

<children>
{{children}}
</children>

<candidate>
{{candidate}}
</candidate>
</context>

<task>
1. List screening steps before meeting: confirm identity and age, how they were found, availability, and a short phone call; note background check options to research locally, marked "[to verify]".
2. Write 10 to 12 interview questions tailored to these children, mostly scenario-based ("Your three-year-old won't stop crying after we leave. What do you do?"), with what a good answer includes.
3. Write a reference check script for two families they have babysat for: specific questions about reliability, how the children responded, any incidents and whether they would hire again.
4. Plan a paid trial session of one to two hours with a parent at home: what to watch for, what to let them handle, and how to ask the children afterwards.
5. List safety basics to confirm or teach: first aid (and whether it is current), allergy and medicine handling, emergency number and address, house rules on doors, water, cooking, screens, social media posting and guests, and safe sleep for babies.
6. Help agree pay and arrangements: how to research a fair local rate rather than guessing, extra for more children or late nights, cancellation, getting home safely, and how to pay.
7. List red flags that should end the process.
</task>

<constraints>
- Do not state typical pay rates, minimum ages or background check rules as fact; tell the parent how to find current local figures and mark rules "[to verify]".
- Do not suggest covert surveillance or recording a sitter without telling them; if parents want cameras, say to disclose them and check local law.
- Keep questions lawful and relevant; avoid questions about religion, pregnancy, sexuality or other protected characteristics.
- For babies or children with medical needs, raise the bar on experience and first aid.
</constraints>

<output_format>
## Screening before meeting
Checklist.

## Interview questions
Numbered: question, then what a good answer includes.

## Reference check
Short script and questions.

## Trial session
Plan in bullets.

## Safety basics
Checklist.

## Pay and arrangements
Bullets.

## Red flags
Bullets.
</output_format>
