---
schema: 1
id: anonymize-resume-for-blind-hiring
kind: prompt
title: Anonymise a resume for blind recruitment
description: Strips a resume of name, photo, age, gender, nationality and other identifying details for an anonymised application, while keeping the evidence intact and flagging subtle identifiers.
category: resumes
version: 1.0.0
status: incubating
stage: [review]
role: [job-seeker, recruiter]
requires: [none]
inputs: [resume]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [blind-recruitment, anonymised-application, bias-reduction, redaction]
pairs_with:
  prompts: [address-selection-criteria, review-resume, screen-resumes]
args:
  - name: resume
    description: The resume text to anonymise.
    type: text
    required: true
  - name: scheme_rules
    description: The employer's or scheme's instructions for anonymised applications, if any - what must be removed, what is allowed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Anonymised resume, Removed or generalised, Subtle identifiers to decide on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare resumes for anonymised or blind recruitment, used by some public bodies, graduate schemes, orchestras and employers trying to reduce bias at the screening stage. Removing the name and photo is the easy part. Identity also leaks through: date of birth or graduation years, gendered pronouns, a personal email address containing a name, nationality or visa status, home address, marital status, a university or school name (where the scheme asks for it to be hidden), membership of a religious, ethnic, gender-based or political society, a maiden name in a publication, and first-person stories that reveal family situation. The skill is removing identity without removing evidence: "Captain, women's rugby team" becomes "Captain, university rugby team" (the leadership evidence stays).

<resume>
{{resume}}
</resume>
{{#scheme_rules}}
<scheme_rules>
{{scheme_rules}}
</scheme_rules>
{{/scheme_rules}}
</context>

<task>
1. Remove direct identifiers: name, photo note, contact details (replace with "[contact details supplied separately]"), date of birth, age, gender, marital or family status, nationality, address.
2. Generalise indirect identifiers while keeping the evidence, for example society names, gendered roles, years that reveal age, and institution names where the scheme rules ask.
3. Keep all experience, skills, results and qualifications; keep job dates unless the scheme rules say otherwise, since employment dates usually stay.
4. List each change. Then list subtle identifiers the person must decide on (for example a distinctive award, publication or employer that could identify them) with the trade-off.
</task>

<constraints>
- Follow the scheme rules where given; they override your defaults. Where they are silent, state your assumption.
- Do not weaken or delete evidence of skills or achievements while anonymising.
- Do not alter facts; generalise wording only.
- Keep the person's real details out of every section of the output, including the change log (write "name removed", not the name).
</constraints>

<output_format>
## Anonymised resume
## Removed or generalised
Table: Original type of detail | Change.
## Subtle identifiers to decide on
</output_format>
