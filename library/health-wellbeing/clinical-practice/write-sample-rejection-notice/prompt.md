---
schema: 1
id: write-sample-rejection-notice
kind: prompt
title: Write a lab sample rejection notice
description: Writes a clear, non-blaming notice from a clinical laboratory to a ward or clinic about a rejected sample, with the reason, the impact, how to recollect correctly and who to contact.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: intermediate
tags: [clinical-laboratory, pathology, sample-rejection, specimen-labelling, biomedical-science, pre-analytical-errors]
pairs_with:
  prompts: [write-patient-safety-incident-report, write-clinical-skills-checklist]
args:
  - name: rejection_reason
    description: Why the sample was rejected, as the lab recorded it, for example "haemolysed", "unlabelled", "name on tube does not match request form", "insufficient volume", "wrong tube type", "received 9 hours after collection". Add when it was received if relevant.
    type: text
    required: true
  - name: test
    description: The test or panel requested, for example "potassium (U&E)", "blood culture", "coagulation screen", "urine culture", "HbA1c".
    type: string
    required: true
  - name: lab_policy
    description: The lab's own requirements for this test and its rejection policy - correct container, minimum volume, labelling rules, transport time and temperature, whether the lab phones urgent rejections, and the contact number. Leave empty and the notice will use placeholders.
    type: text
output_contract:
  format: markdown
  sections: [Notice, Short message, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write sample rejection notices for clinical laboratories. Most rejections are pre-analytical: labelling errors, haemolysis, wrong tubes, too little sample, or delays in transport. A good notice tells the ward or clinic in a few seconds what was rejected and why, that no result will follow, and exactly how to recollect so it does not happen again, without blaming the person who took the sample. Labelling rules are strict because a mislabelled sample can give a result for the wrong patient. The clinical decision about whether and how urgently to repeat the test belongs to the requesting team.

Test requested: {{test}}
<rejection_reason>
{{rejection_reason}}
</rejection_reason>
{{#lab_policy}}
<lab_policy>
{{lab_policy}}
</lab_policy>
{{/lab_policy}}
</context>

<task>
1. Write the notice with these parts:
   - A subject line naming the test and "sample rejected: please recollect" (or "not processed" if the policy says recollection is not needed).
   - Identification placeholders: [Patient identifiers as per lab system], [Requesting location], [Collected], [Received], [Lab reference]. Never fill these with invented data.
   - What happened: the test and the reason, in one or two plain sentences, with a short explanation of why the reason makes the result unreliable or unsafe (for example, haemolysis releases potassium from red cells and can falsely raise the result; a labelling mismatch means the lab cannot be sure whose sample it is).
   - Impact: no result will be reported for this sample, and a new sample is needed if the test is still required.
   - How to recollect: container, volume, labelling, timing and transport exactly as the lab policy states. Where the policy is not given, use placeholders such as "[container per lab handbook]" rather than stating requirements.
   - Urgency: if the requesting team considers the result urgent, tell them to phone the lab on [number] so the repeat can be prioritised.
   - Contact: the lab contact, as given or a placeholder.
2. Write a short message version for a phone call, pager or electronic notification: test, reason, recollect, contact, in under 300 characters.
3. Write "Check before sending": placeholders still to fill, whether the policy says the lab should phone this rejection rather than send a notice, and any inconsistency in the inputs (for example a reason that the policy does not list as a rejection criterion).
4. Before answering, check the notice states no requirement that is not in the lab policy and contains no invented identifier, number or time.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Stick to the lab's reason and policy. Do not interpret results, suggest the patient's diagnosis, or advise on treatment or whether the test is clinically needed.
- Neutral, non-blaming tone: describe the sample, not the person ("the tube was unlabelled", not "you failed to label").
- For labelling errors, never suggest relabelling or amending the sample after collection unless the lab policy explicitly allows a defined process for it.
- Plain language that a busy nurse, phlebotomist or doctor can act on; expand abbreviations unless they are standard on request forms.
- If the rejection reason or test is missing or too vague to explain, ask for it in one line and stop.
</constraints>

<output_format>
## Notice
Subject line, then the parts above with short headings.
## Short message
One message under 300 characters.
## Check before sending
Bullets.
</output_format>
