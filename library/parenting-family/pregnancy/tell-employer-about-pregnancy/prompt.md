---
schema: 1
id: tell-employer-about-pregnancy
kind: prompt
title: Tell your employer you are pregnant
description: Prepares telling a manager about a pregnancy, with timing trade-offs, a conversation script, a follow-up email, questions on leave and workplace risks, and what to do if it goes badly.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [script, message, questions, checklist]
risk: read-only
advice_risk: [legal, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [pregnancy-announcement, workplace-rights, maternity-leave, manager-conversation, risk-assessment]
pairs_with:
  prompts: [prepare-for-new-baby, plan-parental-leave-finances]
  workflows: [parental-leave-return-track]
args:
  - name: situation
    description: How many weeks pregnant you are, your job and working conditions (physical work, chemicals, night shifts, travel, standing), how long you have worked there, your contract type, your relationship with your manager, any upcoming review, promotion or redundancy round, and the country or state.
    type: text
    required: true
  - name: worries
    description: What you are worried about, for example "my manager made comments about the last person who went on leave" or "I'm on a fixed-term contract". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Timing to consider, What to find out first, The conversation, Follow-up email, Questions to ask, If the reaction is bad]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people tell their employer about a pregnancy the way an experienced HR adviser on the employee's side would. What people often miss: many countries set a deadline for formally notifying the employer to qualify for leave or pay, and protections against unfair treatment often depend on the employer knowing; jobs with physical strain, chemicals, radiation, infection risk or night work may need a risk assessment or adjusted duties early, which is a reason to tell sooner; written confirmation creates a record; and the person decides how much medical detail to share. Rules differ a lot by country, state, contract type and length of service, so every rule here is something to verify.

<situation>
{{situation}}
</situation>
{{#worries}}
<worries>
{{worries}}
</worries>
{{/worries}}
</context>

<task>
1. Timing to consider: the factors for when to tell (formal notification deadline to check for their country, workplace health and safety risks in their role, time off for antenatal appointments, visible pregnancy, upcoming reviews or redundancy rounds, personal preference about the first trimester). Do not pick a date for them; set out the trade-offs and any reason to tell early.
2. What to find out first: the official government or employment rights source for their country, the company handbook or leave policy, their contract, and whether there is HR or a union. List each as "check:" with what to look for (notice deadline, leave and pay, time off for appointments, risk assessment, keeping in touch arrangements).
3. The conversation: a short script for telling the manager in private, covering the news, the approximate due date, that they will confirm in writing, any role-related safety question, and that they will share leave plans once they know them. Include two or three responses to awkward questions ("are you coming back?", "how will we cover?") that are polite and commit to nothing yet.
4. Follow-up email: a brief, factual confirmation in a code block with placeholders for dates.
5. Questions to ask: HR or the manager about policy, appointments, risk assessment and adjusted duties, and the timeline for leave dates.
6. If the reaction is bad: keep notes with dates, put concerns in writing, talk to HR or a union rep, and get advice from an employment rights service or lawyer if they are treated less favourably, side-lined, or their job is threatened.
</task>

<constraints>
{{> guardrails/professional-limits}}
- State no legal entitlements, deadlines or amounts as fact. Phrase them as "in many countries..., check the official source for yours".
- Do not advise hiding the pregnancy where their work exposes them or the baby to a hazard; say that a workplace risk is a reason to tell early and to ask about a risk assessment.
- They control what medical information to share; the script should not over-disclose.
- If the worries suggest discrimination has already happened, say it is worth getting employment advice before or alongside telling.
- If they mention bleeding, severe pain or other pregnancy symptoms at work, tell them to contact their midwife or doctor first.
- Professional, calm tone. No promises about the employer's reaction.
</constraints>

<output_format>
## Timing to consider
## What to find out first
Checklist.
## The conversation
Script, then responses to awkward questions.
## Follow-up email
Code block.
## Questions to ask
## If the reaction is bad
</output_format>
