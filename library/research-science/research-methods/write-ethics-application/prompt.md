---
schema: 1
id: write-ethics-application
kind: prompt
title: Draft a research ethics application
description: Drafts a research ethics (IRB) application covering risks and benefits, consent, data protection, vulnerable groups and mitigation, mapped to the committee's form. For researchers working with people.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [spec, document, notes]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [irb, research-ethics, informed-consent, data-protection, vulnerable-participants]
pairs_with:
  prompts: [write-research-interview-protocol, write-data-management-plan, design-research-study]
  personas: [research-methodologist]
args:
  - name: study_design
    description: What you will do - aims, design, procedures, what participants will experience, how long it takes, data you will collect, and where it happens.
    type: text
    required: true
  - name: participants
    description: Who takes part, how many, how you will recruit them, any incentives, and your relationship to them (for example your own students or patients).
    type: text
    required: true
  - name: committee_form
    description: The committee's form questions or section headings, pasted in. If empty, the draft uses the common structure of research ethics forms and you map it to yours.
    type: text
output_contract:
  format: markdown
  sections: [Risk summary, Application draft, Participant documents needed, Open questions, Before you submit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ethics committees (IRBs, RECs, HRECs) approve research with people when the risks are minimised and reasonable in relation to the benefits, participation is voluntary and informed, privacy is protected, and vulnerable people get extra safeguards. Applications are delayed most often by vague procedures, risks described as "none", consent processes that do not match the population, data handling that does not say who sees what and for how long, and inconsistency between the form and the participant documents. Committees, forms and laws differ by country and institution (for example the US Common Rule, GDPR in Europe, national health-research regulations), and only the committee decides.
</context>

<task>
Draft an ethics application for this study.
<study_design>
{{study_design}}
</study_design>
<participants>
{{participants}}
</participants>
{{#committee_form}}
<committee_form>
{{committee_form}}
</committee_form>
{{/committee_form}}

1. Classify the likely risk level (minimal risk or more than minimal risk) and the review route the committee might use, and give your reasons. Say that the committee makes this determination.
2. Identify every risk to participants: physical, psychological (distress, embarrassment, triggering topics), social and reputational, legal (disclosure of illegal activity), economic, and privacy or data-breach risks. Include risks to researchers if the setting calls for it. For each, give likelihood, severity and a concrete mitigation.
3. State the benefits honestly: direct benefits to participants (often none) and benefits to knowledge or society. Do not count incentives as benefits.
4. Describe recruitment and consent: who approaches whom, how coercion and undue influence are avoided (especially with students, employees or patients of the researcher), the consent process and format, capacity, assent for minors with parent or guardian consent, the right to withdraw and until when data can be withdrawn, and any deception or incomplete disclosure with its debriefing.
5. Describe data protection: what personal and special-category data are collected, the legal basis where a law like GDPR applies, identification and pseudonymisation, storage and access, transfer, retention period and destruction, and what is shared in publications or repositories.
6. Address vulnerable groups and special situations: children, people lacking capacity, prisoners, pregnant participants in clinical work, people in dependent relationships, online communities, and the limits of confidentiality (for example a legal duty to report harm).
7. If the committee form is given, write the answers under its exact questions and in its order. If not, use the common sections (project summary, methods, participants and recruitment, consent, risks and benefits, data management, dissemination) and tell the user to map them.
8. List the participant-facing documents the committee will expect (information sheet, consent form, assent form, debrief, recruitment text, interview or survey instruments) and check they are consistent with the application.
</task>

<constraints>
- Never describe a risk as "none". If a risk is very low, say so and why.
- Do not invent approval numbers, institutional policies, storage systems, retention periods or legal requirements. Use placeholders such as [INSTITUTION'S DATA STORAGE SYSTEM] and [RETENTION PERIOD PER POLICY] and list them as open questions.
- Write in plain language a lay committee member can follow, in the first person plural or as the form requires.
- You are drafting for the researcher to check and submit. Do not tell them the study is approvable or exempt; tell them to confirm with their committee or research office, and that the law named depends on where the research happens.
- If the design itself raises an ethical problem a mitigation cannot fix (for example covert research with no justification or identifiable data with no need for it), say so first and suggest a change to the design.
</constraints>

<output_format>
## Risk summary
Likely risk level and why, then a table: risk | likelihood | severity | mitigation.
## Application draft
Answers under the committee's questions, or the common sections.
## Participant documents needed
Checklist with what each must contain.
## Open questions
Every placeholder and the person who can answer it.
## Before you submit
Five to eight checks, including consistency between the form, the documents and the protocol.
</output_format>
