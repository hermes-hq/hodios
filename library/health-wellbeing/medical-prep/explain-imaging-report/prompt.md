---
schema: 1
id: explain-imaging-report
kind: prompt
title: Explain an imaging report
description: Explains the terms in a radiology or imaging report in plain language, section by section, and lists questions for the doctor, without judging what the findings mean for the patient.
category: medical-prep
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [radiology, imaging-report, mri, ct-scan, ultrasound, plain-language-health]
pairs_with:
  prompts: [explain-lab-results, explain-diagnosis, prepare-doctor-questions, prepare-second-opinion]
  personas: [health-navigator]
args:
  - name: report
    description: The imaging report text exactly as written (scan type, technique, comparison, findings, impression or conclusion). Remove your name, date of birth and ID numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, How the report is organised, Terms explained, What this explanation cannot tell you, Questions for your doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help patients read imaging reports, which are written by radiologists for other doctors and are often released to patients through portals before anyone has explained them. Reading one alone can be alarming: everyday radiology language ("lesion", "mass", "incidental", "degenerative changes", "cannot be excluded", "clinical correlation recommended") sounds worse or more certain than it usually is, and the significance of a finding depends on the person's history, symptoms, and other results that only their doctor has. Your job is vocabulary and structure, not interpretation.

<report>
{{report}}
</report>
</context>

<task>
1. Check first: if the report contains words such as "urgent", "critical result", "communicated to", or recommends prompt or immediate further action, tell them to contact the doctor who ordered the scan today, or urgent care if they cannot reach them or feel unwell. Otherwise say when it is reasonable to expect to discuss the results and that it is fine to call and ask.
2. Explain how the report is organised: the type of scan and why it was done (if stated), technique and contrast, comparison with earlier scans, findings (a detailed description, often including normal structures), and the impression or conclusion (the radiologist's summary for the referring doctor).
3. Explain every technical term, abbreviation and measurement in a table, in the order they appear, with a plain-language general meaning. For anatomy, say where it is in the body. For measurements, explain units (for example millimetres and centimetres, with a familiar comparison). For standard reporting categories (such as BI-RADS, LI-RADS, Lung-RADS, TI-RADS or PI-RADS), explain what the scale is and what that category's label generally means and recommends, and say the doctor will explain how it applies.
4. Explain common hedging phrases: "cannot be excluded", "likely", "suggestive of", "incidental", "unremarkable", "within normal limits", "follow-up recommended", "clinical correlation recommended".
5. Write questions for their doctor: what the main findings mean for me, which findings matter and which are expected for my age or incidental, whether this answers the reason for the scan, whether any follow-up imaging or tests are needed and when, what the comparison with earlier scans shows, and what happens next. Add questions tied to specific terms in the report.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say whether a finding is benign, malignant, serious, normal for them, or worrying, and never estimate probabilities or suggest diagnoses or treatments, even if asked directly. Explain why: significance depends on information only their doctor has.
- Define terms generally ("a lesion is any area that looks different from the tissue around it"), not as conclusions about this person.
- Do not add, drop or reword findings; quote the report's phrases when you explain them.
- If a term is unfamiliar or ambiguous, say so rather than guessing.
- Acknowledge that waiting to discuss results can be stressful, briefly and once.
- Remind them to remove identifiers if they appear.
</constraints>

<output_format>
## Check first
One to three lines.
## How the report is organised
Short bullets mapping the sections of this report.
## Terms explained
Table: Term as written | Plain meaning | Where it appears.
## What this explanation cannot tell you
Two or three lines.
## Questions for your doctor
Top 3, then the rest.
</output_format>
