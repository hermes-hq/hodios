---
schema: 1
id: address-underperformance-early
kind: prompt
title: Address underperformance early
description: Prepares a manager for an early, informal conversation about underperformance with specific examples, causes to explore, agreed next steps and a follow-up note. Use before a problem becomes formal.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, text]
output: [script, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hard-conversations, sbi-feedback, informal-feedback, root-cause, expectations]
pairs_with:
  prompts: [plan-one-on-one, write-performance-improvement-plan, coach-with-grow-model]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: performance_issue
    description: What you have observed, with dates and specific examples, the impact on work, customers or the team, and what the expectation was and whether it was made clear.
    type: text
    required: true
  - name: context
    description: Anything that might explain it - changes in role, workload, tools or team, recent events, things the person has mentioned - and how your relationship with them is. Optional.
    type: text
  - name: employee_tenure
    description: How long the person has been in the role and at the company, and their performance before this. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you talk, Your opening, Examples to use, Causes to explore, Agreeing next steps, If it goes sideways, Follow-up note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers through hard conversations. Most performance problems are fixable if they are raised early, privately and specifically, while they are still small. Managers tend to wait, hint, or soften the message so much that the employee does not realise there is a problem. Months later the first clear signal is a formal process, which feels unfair to everyone. A good early conversation names the gap plainly with one to three concrete examples, gets curious about the cause before deciding on a fix, agrees specific next steps, and is followed by a short written note. The cause shapes the fix. Unclear expectations, missing skills, too much workload, broken tools, personal circumstances and low motivation each need a different response.

<performance_issue>
{{performance_issue}}
</performance_issue>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}
{{#employee_tenure}}Tenure and history: {{employee_tenure}}{{/employee_tenure}}
</context>

<task>
1. Before you talk: check readiness. Was the expectation clearly communicated, and when? Is the evidence specific (dated examples, not impressions)? Is there anything in the context (health, bereavement, caring responsibilities, a recent complaint, leave) that calls for a softer approach or a word with HR first? Say whether this should be a one-on-one conversation now, or whether something should happen first. Suggest the setting and timing (private, not on a Friday afternoon or just before a deadline).
2. Your opening: two or three sentences that state the purpose directly and kindly in the first minute. For example: "I want to talk about the last few reports, because they're not where they need to be, and I want to understand what's going on and how I can help." No compliment sandwich.
3. Examples to use: choose the one to three clearest examples from the input and phrase each in situation, behaviour and impact form, without judging the person's character. Point out any example that is too vague to use.
4. Causes to explore: six to eight open questions that cover clarity of expectations, skills, workload and priorities, tools and processes, team dynamics, motivation, and things outside work (offered, not probed). For each likely cause, give the matching response the manager could offer.
5. Agreeing next steps: a structure for agreeing one to three specific, observable changes with a timeframe, the support the manager will give, and a check-in date within two to four weeks. Include a sentence that makes it clear, without threatening, that this matters and will be followed up.
6. If it goes sideways: short responses for defensiveness, tears, blaming others, "nobody told me", total agreement with no ownership, or a disclosure of a health or personal problem. For a disclosure, explain how to pause the performance topic, show care, and involve HR about support or adjustments.
7. Follow-up note: a short, neutral email to send the same day that summarises what was discussed, the agreed actions, the support offered, and the check-in date.
</task>

<constraints>
- Use only the facts given; never invent examples. Mark missing details as [X] and ask about them.
- Describe work and behaviour, not personality ("three of the last five reports were late", not "careless").
- Keep it informal and supportive in tone, while being clear. This is not a formal warning; do not use disciplinary language, threats or ultimatums, even if asked. Explain why they backfire at this stage.
- Do not speculate about health, mental state or private life, or ask probing personal questions.
</constraints>

<output_format>
## Before you talk
## Your opening
## Examples to use
Table: Situation | Behaviour | Impact.
## Causes to explore
Table: Likely cause | Question to ask | What you could offer.
## Agreeing next steps
## If it goes sideways
Table: If they… | You say….
## Follow-up note
</output_format>
