---
schema: 1
id: respond-to-performance-concerns
kind: prompt
title: Respond to performance concerns
description: Prepares your response to a negative review or improvement plan with evidence, a calm written reply, questions to ask and a plan to meet expectations. Use after critical feedback.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [document, notes, text]
output: [plan, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [negative-review, pip-response, critical-feedback, written-response, self-advocacy]
pairs_with:
  prompts: [handle-difficult-manager, write-brag-document, build-development-plan, write-self-review]
  personas: [career-coach]
args:
  - name: feedback_received
    description: What your manager or the review said, as close to the actual words as possible, when and how it was delivered, and any targets or deadlines set.
    type: text
    required: true
  - name: your_evidence
    description: Facts that support, explain or contradict the feedback - results, dates, messages, changed priorities, missing resources, health or personal circumstances you may choose to raise. Optional.
    type: text
  - name: formal_plan
    description: True if this is a formal performance improvement plan, capability process or written warning rather than informal or review feedback.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Read of the situation, What is fair and what is not, Questions to ask, Written response, Plan to meet expectations, Protecting yourself, Your options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach employees through critical performance feedback. The first reaction is usually to defend every point, which managers tend to hear as not listening. The opposite reaction, accepting everything in silence, leaves inaccurate claims on the record. The approach that works best does several things at once. It separates the fair parts from the unfair ones, it asks for specific examples and measurable expectations, and it corrects the record in writing with facts rather than emotion. It also commits visibly to a plan for the fair parts and keeps a private log. A formal plan is a serious signal: some are genuine attempts to help, and others are a step towards an exit. The person should prepare for both while giving the plan an honest try.

<feedback_received>
{{feedback_received}}
</feedback_received>
{{#your_evidence}}
<your_evidence>
{{your_evidence}}
</your_evidence>
{{/your_evidence}}
Formal plan or process: {{formal_plan}}
</context>

<task>
1. Read of the situation: in three or four sentences, say what the feedback is really about, how serious it looks (informal, review rating, formal plan), and what the manager most likely needs to see change.
2. What is fair and what is not: sort each point into "fair and specific", "fair but vague", "disputed with evidence" and "context missing" (for example, changed priorities or missing resources). Use only the facts given and say when the evidence is not enough to tell.
3. Questions to ask: questions that turn vague points into measurable expectations. For example: what good looks like by when, which examples prompted this, how progress will be measured and reviewed, and what support is available. Include the questions that matter most if this is a formal plan: its length, the check-in dates, possible outcomes, and whether targets can be adjusted if priorities change.
4. Written response: draft a short reply (under 300 words) to send after the meeting. It should thank the manager for the conversation, acknowledge the points accepted, correct factual errors with dates and evidence, add missing context without excuses, confirm the agreed expectations, and ask for the support needed. Keep it calm and professional; it may be read later by HR. If the person has health, disability or caring circumstances in the evidence, explain the choice between raising them now and not raising them, and what each would mean, without deciding for them.
5. Plan to meet expectations: for each fair point, the concrete changes, the evidence the person will produce, a weekly progress note to the manager, and a check-in schedule.
6. Protecting yourself: keep a dated log of work, conversations and support received; save copies of key documents where policy allows; confirm verbal agreements in writing. If this is a formal plan, check the company's policy for rights such as being accompanied at meetings, and consider talking to HR, a union representative or an employment lawyer, especially if the plan follows a complaint, leave, a health disclosure or a sudden change in treatment.
7. Your options: give an honest view of the paths: work the plan, negotiate changes to it, raise a grievance if the treatment seems unfair, or start a quiet job search in parallel. Say what each costs and what signs would point to each.
</task>

<constraints>
- Help the person respond honestly. Do not help invent evidence, shift blame onto colleagues without facts, or write anything misleading.
- Do not tell the person they have a legal claim or predict an outcome. Employment rules vary by country and contract; name when to get advice and from whom.
- Use only the facts given; mark missing facts as [X] and ask about them at the end.
- Be candid if the feedback looks fair. Being supportive means helping them succeed, not agreeing that they are blameless.
</constraints>

<output_format>
## Read of the situation
## What is fair and what is not
Table: Point raised | Category | Your evidence | What to do.
## Questions to ask
## Written response
## Plan to meet expectations
Table: Expectation | Change | Evidence you will produce | By when.
## Protecting yourself
## Your options
</output_format>
