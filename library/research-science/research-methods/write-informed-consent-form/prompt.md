---
schema: 1
id: write-informed-consent-form
kind: prompt
title: Write a participant information sheet and consent form
description: Writes a plain-language participant information sheet and consent form covering purpose, procedures, risks, data use and withdrawal, ready for ethics review. For researchers recruiting people.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [spec, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [informed-consent, participant-information-sheet, research-ethics, plain-language, irb]
pairs_with:
  prompts: [write-ethics-application, write-data-management-plan, write-research-interview-protocol]
  personas: [research-methodologist]
args:
  - name: study_summary
    description: What the study is for and what participants will do - procedures, duration, number of sessions, recordings, payments, and any deception or incomplete disclosure.
    type: text
    required: true
  - name: participants
    description: Who will read the form, for example "adult nurses", "parents of children aged 8 to 11", "older adults with mild hearing loss".
    type: string
    required: true
  - name: data_handling
    description: How data will be stored, who sees it, anonymisation or pseudonymisation, retention, sharing in repositories or publications, and the law that applies if known.
    type: text
output_contract:
  format: markdown
  sections: [Participant information sheet, Consent form, Assent version, Readability and consistency check, Placeholders to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Consent is valid only if participants understand what they are agreeing to, so ethics committees reject forms that are long, technical, vague about risk, or inconsistent with the protocol. Good forms answer the questions a participant actually has, in the order they have them: why am I being asked, what will happen to me, what could go wrong, what is in it for me, what happens to my data, and can I change my mind. They use short sentences, the second person, common words, and headings phrased as questions, and they aim for a reading age of about 11 to 13 years unless the audience needs simpler still. Many institutions have mandatory templates and wording, and those take precedence over this draft.
</context>

<task>
Write the participant documents for this study.
<study_summary>
{{study_summary}}
</study_summary>
Readers: {{participants}}
{{#data_handling}}
<data_handling>
{{data_handling}}
</data_handling>
{{/data_handling}}

1. Write a participant information sheet with question headings: what the study is about and who runs it; why you have been asked; do you have to take part; what will happen (each step, time, place, recordings); possible disadvantages and risks; possible benefits; payment or reimbursement; what happens to your information (collected, stored, who sees it, how long, shared, published, future use); what happens if you stop; what if something goes wrong or you want to complain; who has reviewed the study; contacts.
2. Write a consent form as a list of separate statements the participant initials or ticks, one idea each (read the information, had a chance to ask questions, voluntary and can withdraw without giving a reason and without penalty, until when data can be withdrawn, recording, use of quotes, data sharing, future contact), with optional items clearly marked as optional, followed by signature and date lines for participant and researcher.
3. If the readers are children or adults who may lack capacity, add an assent version in simpler language with pictures suggested where useful, and adapt the main sheet for the parent, guardian or consultee.
4. Check readability and consistency: flag sentences over about 20 words, jargon, and anything in the documents that contradicts the study summary or data handling.
</task>

<constraints>
- Describe risks honestly and specifically, including discomfort, time burden and privacy risks. Never write "there are no risks"; if they are minimal, say what they are and why they are small.
- Do not overstate benefits. If there is no direct benefit, say so. Payment is not a benefit and must not be large enough to pressure people.
- No exculpatory wording: nothing that asks participants to waive rights or releases the researchers from liability.
- Be precise about withdrawal: say when data can no longer be removed (for example after anonymisation or publication) instead of promising unlimited withdrawal.
- If participants are in a dependent relationship with the researcher (students, employees, patients), state that taking part or not will not affect their grades, job or care.
- Do not invent names, phone numbers, emails, approval numbers, retention periods, storage systems or legal bases. Use placeholders such as [ETHICS REFERENCE NUMBER] and [RETENTION PERIOD PER POLICY], and list every one at the end.
- If the study involves deception, write the sheet so it is truthful about everything it can be, and add a debrief text.
- Remind the user once that their committee's template and required wording override this draft.
</constraints>

<output_format>
## Participant information sheet
Headings phrased as questions, plain language.
## Consent form
Initial-box statements, then signature lines.
## Assent version
Only when needed; otherwise one line saying why it is not needed.
## Readability and consistency check
Bulleted issues and fixes, plus an estimate of reading level.
## Placeholders to fill
Each placeholder and who can supply it.
</output_format>
