---
schema: 1
id: write-academic-probation-appeal
kind: prompt
title: Write an academic probation or SAP appeal
description: Writes a student's appeal against academic dismissal or a financial aid suspension for unsatisfactory progress, explaining circumstances, what has changed and a concrete plan.
category: studying
version: 1.0.0
status: incubating
stage: [build]
role: [student]
requires: [none]
inputs: [text, document]
output: [message, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [academic-dismissal, sap-appeal, financial-aid, readmission, academic-plan]
pairs_with:
  prompts: [calculate-gpa-and-target, plan-courses-to-graduation, appeal-university-decision]
args:
  - name: decision
    description: The letter or email you received - academic probation, suspension, dismissal, or financial aid suspension for Satisfactory Academic Progress (SAP) - with the standard you missed (GPA, completion rate, maximum time), the appeal deadline and the form or requirements.
    type: text
    required: true
  - name: circumstances
    description: What happened that affected your studies, when, and the evidence you can get (medical letters, death certificate, employer letters, counsellor letters). Share only what you are comfortable sharing.
    type: text
    required: true
  - name: changes_made
    description: Optional what has changed since or what you will change - treatment, fewer work hours, a new living situation, tutoring, meeting an adviser, a reduced course load.
    type: text
output_contract:
  format: markdown
  sections: [What you are appealing, What the appeal must contain, Appeal letter, Academic plan, Evidence to attach]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Appeals against academic dismissal and financial aid suspension are read by committees who see many of them, and they look for three things: a specific circumstance outside normal student life that explains the poor results (illness, a death in the family, a caring crisis, an unavoidable work or housing emergency), evidence that the circumstance has been resolved or is now managed, and a realistic plan showing how the student will meet the standard. For financial aid in the United States, a Satisfactory Academic Progress (SAP) appeal commonly requires an academic plan agreed with an adviser, and approval often comes with conditions such as term-by-term grade requirements. Weak appeals blame instructors, list every hardship without linking it to the failed terms, promise to "try harder" with no plan, or miss the deadline. Students also often confuse academic standing (the school's decision) with aid eligibility (a separate decision with its own appeal).
</context>

<task>
Write the appeal.

<decision>
{{decision}}
</decision>

<circumstances>
{{circumstances}}
</circumstances>
{{#changes_made}}
<changes_made>
{{changes_made}}
</changes_made>
{{/changes_made}}

1. State what is being appealed: academic standing, financial aid eligibility, or both (which may need separate appeals), the standard missed, and the deadline and submission method, marked "verify".
2. List what the appeal must contain, from the decision letter if it says, otherwise the common elements marked as typical: the circumstance, the link to the affected terms, evidence, what has changed, and a plan.
3. Draft the letter in the student's voice: a respectful opening naming the decision; the circumstance described factually with dates and its specific effect on the affected courses; responsibility taken for what was in the student's control; what has changed, concretely; the plan; and a clear request. Keep it to about one page unless the form asks otherwise.
4. Draft an academic plan: the course load for the next term or terms, the grades or completion rate needed to return to good standing (with the arithmetic if GPA and credits are known), support to be used (advising, tutoring, counselling, disability services), and check-ins. Say that many institutions require an adviser to approve this plan.
5. List the evidence to attach and how to get it, with a note to share only what the appeal needs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent or exaggerate circumstances, dates or evidence. If the student asks for that, refuse and explain that misrepresentation can lead to the appeal being rejected or to sanctions.
- Do not state the institution's standards, deadlines or aid rules as fact unless they are in the decision text; mark everything else to verify.
- Do not blame instructors or the institution in the letter.
- Do not promise the appeal will succeed. Suggest the student speak to an academic adviser and the financial aid office before submitting.
- If the circumstances include a current crisis or risk to the student's safety, point them to support services or local emergency services first.
</constraints>

<output_format>
## What you are appealing
## What the appeal must contain
A checklist.
## Appeal letter
## Academic plan
A table: Term | Courses and credits | Grades needed | Support | Check-in.
## Evidence to attach
</output_format>
