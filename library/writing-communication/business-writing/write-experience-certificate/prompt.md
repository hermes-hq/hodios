---
schema: 1
id: write-experience-certificate
kind: prompt
title: Write an experience or relieving letter
description: Writes an experience certificate and or relieving letter for a departing employee with dates, designations, duties and release confirmation in the standard form employers issue on exit.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, document]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [experience-letter, relieving-letter, service-certificate, employee-exit, hr-letters]
pairs_with:
  prompts: [write-reference-letter, write-employment-experience-letter, plan-employee-offboarding]
args:
  - name: employee_record
    description: Name, employee ID, designations held with dates, department, joining date, last working day, main duties, resignation date and acceptance, and whether handover and clearance are complete.
    type: text
    required: true
  - name: company
    description: Company name, address and the signatory's name and title.
    type: string
    required: true
  - name: letter_type
    description: Which letter or letters to write.
    type: enum
    enum: [experience, relieving, both]
    default: both
output_contract:
  format: markdown
  sections: [Letters, Check before issuing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the exit letters that employers in South Asia, the Middle East, parts of Africa and many other places issue as standard, and that the next employer, a background-check firm or a university usually asks to see. The experience letter (also called a service or experience certificate) confirms tenure, designations and duties. The relieving letter confirms that the resignation was accepted, the employee was relieved of duties on a specific date, and handover and clearance are complete. Next employers check the dates against the CV and payslips, so dates and designations must match HR records exactly. These letters stay neutral: a performance judgement belongs in a reference letter, and a reason for leaving other than "resigned" should not appear unless the employer has a clear reason to state it. A relieving letter should not be issued while clearance is pending; if the user must issue early, make any condition explicit. For skilled-visa or skills-assessment letters that need hours and salary, a different, more detailed letter is used.

Company: {{company}}
Letter type: {{letter_type}}

<employee_record>
{{employee_record}}
</employee_record>
</context>

<task>
1. Write the requested letter or letters on letterhead layout with date, reference number placeholder, and "To whom it may concern" for the experience letter; the relieving letter is addressed to the employee.
2. Experience letter: confirm the employee's full name and ID, joining date and last working day, each designation with its dates and department, and three to five main responsibilities in neutral, factual language. Close with a neutral line such as "We wish [him/her/them] success in future endeavours." Use the pronoun the record gives; if none, use the name.
3. Relieving letter: refer to the resignation dated [date], confirm it was accepted and the employee is relieved from duties at close of business on the last working day, confirm handover and that dues and clearance are settled (or state precisely what is pending if the record says so), and remind of continuing confidentiality obligations only if the record mentions them.
4. Signature block with name, title, and stamp placeholder if customary.
5. Check before issuing: dates and designations to match against HR records, clearance status, whether the full and final settlement is done, and anything missing.
</task>

<constraints>
- Never invent dates, designations, ID numbers or duties. Use [to confirm].
- No performance ratings, praise superlatives, disciplinary history or reason for leaving beyond resignation.
- If clearance or settlement is pending, do not state it is complete.
- Formal, short: each letter fits on one page.
</constraints>

<output_format>
## Letters
Each letter under its own subheading, laid out for printing.
## Check before issuing
Checklist.
</output_format>
