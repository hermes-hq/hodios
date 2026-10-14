---
schema: 1
id: cope-with-job-loss
kind: prompt
title: Cope with losing your job
description: Supports someone after a layoff or dismissal with the emotional impact, a daily structure, keeping money worries in their place, how to tell people, and staying steady through the search.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text]
output: [plan, explanation, script]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [job-loss, layoff, unemployment, identity, resilience]
pairs_with:
  prompts: [recover-from-layoff, plan-finances-after-job-loss, bounce-back-from-rejection, navigate-life-transition]
  personas: [supportive-listener]
args:
  - name: situation
    description: What happened and how you are feeling, for example "laid off with 30 others after 12 years, feel numb and ashamed", "fired after a bad review, can't stop replaying it".
    type: text
    required: true
  - name: time_since
    description: How long ago it happened, for example "yesterday", "three weeks", "four months". Optional.
    type: string
  - name: worries
    description: What worries you most, for example "the mortgage", "telling my kids", "being too old to get hired". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you might be feeling, A daily structure, Money worries in their place, Telling people, Staying steady through the search, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone cope emotionally with losing a job. Job loss hits more than income: it removes daily structure, social contact, status and, for many people, a large part of identity. Common reactions include shock, numbness, shame, anger, grief, anxiety about money and the future, and self-doubt, often in waves rather than stages. Layoffs are usually decisions about budgets and structures, not about a person's worth, but being fired can carry extra shame that makes people withdraw. The risks to wellbeing come from losing routine, isolating, drinking more, and letting the job search take over every waking hour or none of them. What helps is a simple daily structure with a capped search block, movement, contact with people, something that brings a sense of competence or meaning, and putting money fears into a concrete plan rather than a constant background dread. Job loss and money strain are known risk factors for depression and suicidal thoughts, so warning signs matter.

Situation: {{situation}}
{{#time_since}}Time since: {{time_since}}{{/time_since}}
{{#worries}}Worries: {{worries}}{{/worries}}
</context>

<task>
1. What you might be feeling: acknowledge their situation and name the reactions they describe and a few common others, as normal responses to a real loss. If it was a dismissal, separate what happened at work from their worth as a person in one or two sentences, without judging the employer's decision.
2. A daily structure: a simple weekday template fitted to how long ago it happened (in the first days, rest and basics are enough): a fixed wake time, a capped job-search or admin block (for example two to three hours), movement outdoors, one contact with another person, one thing that builds competence or meaning (a course, volunteering, a project, helping someone), and an end-of-day stop. Keep weekends different.
3. Money worries in their place: a short exercise: write every money worry down, sort into "this month" and "later", pick one concrete next step for each this-month item (for example check benefit eligibility, call a lender before missing a payment), and schedule a weekly money hour so it does not leak into every hour. Keep this to worry containment; detailed budgeting, severance and benefits planning belong in a separate practical session.
4. Telling people: short scripts for a partner, children (age-appropriate and reassuring about what will not change), parents or friends, and a one-line answer for casual "what do you do?" questions. Note that they choose how much to share.
5. Staying steady through the search: how to handle rejections and silence (expect many; track effort, not only outcomes), limiting comparison and doom-scrolling job boards, keeping one non-work identity active, and asking people for specific help.
6. When to get more help: feeling hopeless, sleeping or drinking much more, withdrawing from everyone, or thoughts of self-harm or suicide mean talking to a doctor or crisis line now; employee assistance programmes may still be available after leaving, so check.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not give legal advice on the dismissal or severance; if they mention unfair treatment, suggest an employment adviser, union or lawyer.
- Do not state benefit amounts or rules; frame them as things to check.
- Avoid forced positivity ("everything happens for a reason"). Acknowledge the loss, then focus on what helps.
- Keep the plan light at first; do not hand a newly laid-off person an intensive schedule.
</constraints>

<output_format>
## What you might be feeling
## A daily structure
Table: Time | Activity | Why it helps.
## Money worries in their place
## Telling people
## Staying steady through the search
## When to get more help
</output_format>
