---
schema: 1
id: prepare-for-iep-meeting
kind: prompt
title: Prepare for an IEP or support plan meeting
description: Prepares a parent for an IEP or special educational needs plan meeting with a concerns statement, evidence to bring, a review of the current plan, goals to propose and questions to ask.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [education-sector]
requires: [none]
inputs: [text, document]
output: [checklist, questions, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [iep, special-educational-needs, ehcp, school-meeting, parent-advocacy, accommodations]
pairs_with:
  prompts: [write-email-to-teacher, write-iep-goals, set-up-routines-for-child-with-adhd]
  personas: [parenting-coach]
args:
  - name: child_needs
    description: Your child's age and grade, diagnoses or suspected needs, what is going well and what is hard at school (learning, behaviour, social, physical), and what you see at home.
    type: text
    required: true
  - name: current_plan
    description: The current plan's goals, services, minutes and accommodations, pasted or summarised, plus recent progress reports or evaluation results. Optional; leave out for a first meeting.
    type: text
  - name: school_context
    description: Country and state or region, the type of meeting (first plan, annual review, re-evaluation, a meeting you requested), who will attend, and how things have gone with the school so far. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your concerns statement, Bring this, Reviewing the current plan, Goals to propose, Questions to ask, In the meeting, After the meeting, If you disagree]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents prepare for meetings about a child's individual education plan: an IEP in the United States, an EHC plan or SEN support plan in England, or the equivalent elsewhere. Parents are members of the team and know the child best, but meetings can feel like the school's show: lots of people, jargon and a draft already written. Parents get better outcomes when they send their concerns in writing beforehand, bring evidence, check that every goal is specific and measurable from a stated baseline, ask what services will deliver each goal and how progress will be reported, and confirm everything in writing afterwards. Rights, timelines and dispute routes differ by country and region.

<child_needs>
{{child_needs}}
</child_needs>
{{#current_plan}}
<current_plan>
{{current_plan}}
</current_plan>
{{/current_plan}}
{{#school_context}}
<school_context>
{{school_context}}
</school_context>
{{/school_context}}
</context>

<task>
1. Your concerns statement: draft a one-page, factual parent concerns letter to send to the team a few days before the meeting: strengths first, then the top three or four concerns with examples, and what the parent wants the plan to achieve this year. Ask for the draft plan and any new reports in advance.
2. Bring this: a checklist of evidence (reports and work samples, test and evaluation results, outside assessments, logs of homework time or incidents, notes from doctors or therapists, communication with the school) and a one-page child profile (strengths, interests, what helps, what makes things worse).
3. Reviewing the current plan: if a plan is given, check each part: whether the present levels describe the child accurately with data, whether each goal is specific, measurable, has a baseline and target and a date, whether services and minutes match the goals, whether accommodations are actually being used, and whether progress reporting was clear. List gaps and what to ask for. If no plan is given, explain what a good plan contains so the parent can check the draft.
4. Goals to propose: three to five measurable goals drawn from the concerns, each with a baseline (or "baseline to be measured"), a target, how it will be measured and how often, plus the supports or services that would deliver it. Mark them as proposals for the team to refine.
5. Questions to ask: 10–12 questions on assessment, services, who delivers them and how often, accommodations in class and in tests, behaviour or social support, progress monitoring, communication with home, and transition (to a new school, or to adult life for older students).
6. In the meeting: practical tactics: bring another adult to take notes, ask for terms to be explained, ask to pause, record decisions and who will do what, remember that the parent usually does not have to sign or agree on the spot (check the local rule), and if the team turns down a request (an assessment, a service, more minutes), ask for the refusal and the reasons in writing (in the US this is prior written notice).
7. After the meeting: a short follow-up email template confirming what was agreed, what is still open and the next dates.
8. If you disagree: the usual escalation path in their system (a further meeting, independent evaluation, mediation, formal complaint or appeal), where the parent can act without waiting for the school (for example, in the US parents can request an evaluation or an IEP meeting in writing at any time; in England parents can ask the local authority for an EHC needs assessment themselves), and the advice to get help from a parent advocacy organisation, special education advocate or education lawyer, and to check deadlines, which can be short.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the child is legally entitled to or predict the outcome of a dispute; describe typical processes and say to check the local rules and get specialist advice for disputes.
- If the country or region is missing, use neutral terms ("support plan", "the team"), note the main systems, and ask.
- Keep the tone collaborative with the school while helping the parent be firm and specific; draft letters that are factual, not accusatory.
- Do not diagnose the child; describe needs and suggest assessments where unexplained difficulties are described.
- Use only the facts given; mark placeholders like [date] and [teacher].
</constraints>

<output_format>
## Your concerns statement
The letter, ready to edit.
## Bring this
Checklist, then the child profile.
## Reviewing the current plan
Table: Part of the plan | What it says now | Gap | What to ask for.
## Goals to propose
Table: Area | Baseline | Goal | How measured | Support or service.
## Questions to ask
## In the meeting
## After the meeting
Email template.
## If you disagree
</output_format>
