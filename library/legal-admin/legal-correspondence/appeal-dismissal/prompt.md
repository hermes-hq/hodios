---
schema: 1
id: appeal-dismissal
kind: prompt
title: Appeal a dismissal
description: Drafts an employee's appeal against a dismissal decision, with grounds tied to procedure, evidence and fairness, the outcome sought, the deadline and the legal time limits that keep running.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, review]
role: [individual, job-seeker]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [dismissal-appeal, unfair-dismissal, employment-rights, disciplinary-outcome, appeal-hearing, job-loss]
pairs_with:
  prompts: [respond-to-disciplinary-allegations, write-workplace-grievance, write-labour-arbitration-application, rebuild-after-being-fired]
args:
  - name: location
    description: Country and state or region where you worked; employment protection and time limits differ greatly.
    type: string
    required: true
  - name: dismissal
    description: The dismissal letter's reason and date, the appeal deadline and who hears it, how long you worked there, your role, and whether you are in a union.
    type: text
    required: true
  - name: what_happened
    description: The process before dismissal (investigation, meetings, warnings, evidence shown, chance to respond, companion allowed), your side of the facts, mitigation (health, caring, workload), and any sign of another real reason (a complaint you raised, pregnancy, disability, age).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Deadlines that matter, Grounds of appeal, Appeal letter, Evidence and documents to request, Preparing for the appeal hearing, If the appeal fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees appeal against being dismissed, using the employer's internal appeal process. What employment advisers know: the appeal letter should list clear grounds rather than retell everything, and the strongest grounds are usually one or more of: procedural failings (no proper investigation, evidence not shared, no chance to respond, no right to be accompanied, the decision-maker was involved in the complaint, a policy step skipped), the evidence does not support the finding, the sanction is too harsh given service, record, mitigation and how others were treated, new evidence, or the stated reason hides another reason that may be unlawful (a protected disclosure, a complaint, discrimination, family leave). Using the appeal matters in itself: in some systems failing to appeal can reduce compensation later, and the appeal creates a record. But the internal appeal usually does not pause the legal time limit for a claim, which can be very short (for example three months less a day from dismissal in some places, sometimes with a compulsory conciliation step), so advice and diary dates come first. You draft; the employer decides, and a tribunal or court decides any claim.

Location: {{location}}
</context>

<task>
Dismissal:

<dismissal>
{{dismissal}}
</dismissal>

What happened:

<what_happened>
{{what_happened}}
</what_happened>

1. Deadlines that matter: the internal appeal deadline from the letter, and the time limit for any legal claim in {{location}} (to verify), with a clear statement that the appeal usually does not stop that clock and that early conciliation or advice may be needed. Note whether length of service might affect protection, marked to verify.
2. Grounds of appeal: from the facts, list each possible ground under procedure, evidence, sanction, new evidence, or another real reason. Rate each strong, possible or weak, and drop or flag weak ones rather than padding the letter.
3. Draft the appeal letter: addressed to the person named in the dismissal letter, the employee's details as [BRACKETS], that this is an appeal against the dismissal of [date], numbered grounds with short supporting facts, the outcome sought (reinstatement, a lesser sanction, removing the finding, or a reference and agreed exit if that is what they want), requests for documents, the right to be accompanied, any adjustments needed, and a calm, professional tone.
4. Evidence and documents to request: investigation report, witness statements, notes of meetings, the policies applied, comparator treatment where relevant, and the person's personal data where a data access right exists.
5. Preparing for the appeal hearing: a short opening, the key points in order, answers to the likely questions, what to concede, and notes.
6. If the appeal fails: options such as a legal claim within the time limit, a settlement negotiation, and free sources of advice (union, legal aid, employment advice services), marked to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict the result of the appeal or a claim; rate grounds honestly.
- Do not invent laws, qualifying periods or time limits; mark them "to verify" and urge advice where a claim is possible.
- Do not deny facts the employee has admitted; argue procedure, proportionality and mitigation instead.
- Keep the letter free of personal attacks; describe conduct and process.
- If the person mentions discrimination, whistleblowing or pregnancy, say these can give extra protection and that advice should be sought quickly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadlines that matter
Dated list with the legal time limit flagged to verify.

## Grounds of appeal
Table: ground | supporting facts | strength.

## Appeal letter
The complete letter with [BRACKETS].

## Evidence and documents to request
Checklist.

## Preparing for the appeal hearing
Bullets.

## If the appeal fails
Bullets marked to verify.
</output_format>
