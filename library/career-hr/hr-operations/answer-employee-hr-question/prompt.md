---
schema: 1
id: answer-employee-hr-question
kind: prompt
title: Answer an employee's HR question
description: Drafts HR's reply to an employee's question on leave, pay, benefits or policy from the company documents supplied, quoting the clause and flagging what the policy does not cover.
category: hr-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, manager, support-agent]
requires: [none]
inputs: [message, document]
output: [message, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [hr-helpdesk, policy-questions, leave-entitlement, employee-queries, handbook]
pairs_with:
  prompts: [write-employee-handbook, write-workplace-policy, triage-employee-concern]
args:
  - name: question
    description: The employee's question as they wrote it. Remove their name and other personal details you do not need.
    type: text
    required: true
  - name: policy_text
    description: The relevant policy, handbook section or benefits summary, pasted. The reply only uses what is here.
    type: text
    required: true
  - name: employee_facts
    description: Facts needed to apply the policy, for example contract type, start date, hours, location. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Reply, Policy basis, Gaps and escalation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most HR helpdesk questions are about leave, pay dates, benefits, expenses and working arrangements, and most bad answers come from two habits: answering from general knowledge instead of the company's actual policy, and answering a question that is really something else (a "how much sick leave do I have" that hints at a health problem or a dispute). A good reply answers the question in the first sentence, quotes the policy clause it relies on, applies it to the employee's facts, says what the employee needs to do next, and is honest where the policy is silent, where local law may give more than the policy, or where a manager or specialist must decide. Consistency matters: the same question should get the same answer for everyone.

<question>
{{question}}
</question>

<policy_text>
{{policy_text}}
</policy_text>
{{#employee_facts}}
<employee_facts>
{{employee_facts}}
</employee_facts>
{{/employee_facts}}
</context>

<task>
1. Work out what is being asked, including the underlying need. If the question signals a health issue, a conflict, discrimination, harassment, a safety concern or distress, keep the reply kind and short, answer what you can, and route the rest under Gaps and escalation (for a concern, to the formal concern route rather than a policy answer).
2. Find the clause or clauses in the policy text that answer it. If none do, say the policy does not cover it; do not fill the gap from general knowledge.
3. Apply the clause to the employee's facts, showing any simple calculation (for example pro-rata leave for part-time hours).
4. Draft the reply: the answer first, then the clause in plain words, what to do next and by when, and who to contact. Warm, plain and short.
5. List gaps: facts missing, policy silent or ambiguous, decisions that belong to a manager, and anywhere statutory rights in the employee's location might differ from or exceed the policy (to confirm with HR or an employment lawyer).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the policy text given. Never invent entitlements, amounts, dates or procedures.
- Do not state employment law as fact. Where law may apply, say so and route it.
- Do not ask for medical details. Keep personal information out of the draft beyond what is needed.
- If the policy appears to give less than a legal minimum might, do not tell the employee that; flag it internally under Gaps and escalation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Reply
The message to send, ready to paste.
## Policy basis
The clause(s) quoted, with how they were applied.
## Gaps and escalation
Internal notes for HR only, or "None".
</output_format>
