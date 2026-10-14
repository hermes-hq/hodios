---
schema: 1
id: write-termination-letter
kind: prompt
title: Write an employee termination letter
description: Writes an employer's dismissal letter with the reason, effective date, notice and final pay, return of property and appeal rights, after a process check and with points to verify locally.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dismissal, termination-of-employment, final-pay, appeal-rights, hr-letters]
pairs_with:
  prompts: [write-written-warning, plan-employee-offboarding, conduct-workplace-investigation]
  personas: [hr-business-partner]
args:
  - name: reason
    description: The ground for dismissal.
    type: enum
    enum: [conduct, gross-misconduct, performance, capability-or-attendance, end-of-fixed-term, other]
    required: true
  - name: process_so_far
    description: What happened before the decision - investigation, warnings with dates, the hearing or meeting (date, who attended, whether accompanied), what the employee said, and who made the decision.
    type: text
    required: true
  - name: terms
    description: Employee name and role, start date, contract notice period, whether notice is worked or paid in lieu, accrued holiday, company property held, and the appeal process in your policy.
    type: text
    required: true
  - name: country
    description: Country and region of employment.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Process check, Letter, Delivery notes, Questions for employment counsel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employers write dismissal letters that confirm a decision already reached through a fair process and already told to the employee in person. The letter becomes the key document if the dismissal is challenged, so it must match the facts: the reason given must be the real reason and consistent with the warnings and hearing that came before; it must not raise new allegations; and it must set out notice, final pay, holiday, property return and the right of appeal clearly. Dismissals go wrong when there was no hearing, the employee did not know the case against them, the sanction is out of line with the policy or with how others were treated, or the timing follows something protected (a complaint, a health disclosure, pregnancy, union activity, a whistleblowing report). Rules on notice, written reasons, severance and appeal differ widely between countries and regions, and some require prior authorisation or specific wording.

Reason: {{reason}}
Country: {{country}}

<process_so_far>
{{process_so_far}}
</process_so_far>

<terms>
{{terms}}
</terms>
</context>

<task>
1. Process check: assess whether the employee knew the allegations or concerns in advance, whether there was a hearing or meeting where they could respond (and be accompanied where policy or law allows), whether earlier warnings were given and are still live where the reason needs them, whether the decision-maker was impartial, whether the decision is consistent with policy, and whether anything suggests a protected or sensitive context. If there is a serious gap or a sensitive context, put it first, say the letter should not be issued until employment counsel has reviewed the case, and give the steps to fix the process. In that case, provide the letter only as a template headed "Draft - do not issue until reviewed".
2. Letter: private and confidential header, date, employee details, then:
   - reference to the hearing or meeting (date, attendees, whether accompanied) and a fair summary of the employee's response;
   - the decision and the reason in plain, factual terms limited to what was put to the employee, and for performance or conduct reasons, the earlier warnings relied on;
   - the effective date of termination, notice (worked, paid in lieu or, for gross misconduct, without notice if policy allows);
   - final pay, accrued holiday, any other sums, and when they will be paid;
   - return of company property and any continuing obligations (confidentiality) only if in the contract;
   - the right of appeal, to whom, how and by when;
   - signature block and a receipt-not-agreement acknowledgment line.
3. Delivery notes: deliver after the in-person conversation, who should be present, practical points (access, belongings, how the team is told) and keeping it respectful.
4. Questions for employment counsel: specific checks for this case in {{country}} (notice minimums, severance, written reasons, any authorisation needed, deadlines).
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for review by HR or employment counsel. Do not state the law of {{country}} as fact.
- Use only facts given. Never add allegations, warnings or dates; mark gaps [to confirm].
- Do not mention protected characteristics or health in the letter.
- Neutral, factual, respectful tone. No moralising or character judgements.
</constraints>

<output_format>
## Process check
Table: Check | Status | Action needed. Serious gaps first.
## Letter
The full letter with [placeholders].
## Delivery notes
Bullets.
## Questions for employment counsel
Bullets.
</output_format>
