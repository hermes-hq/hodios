---
schema: 1
id: write-informed-consent-form
kind: prompt
title: Write a participant information sheet and consent form
description: Writes a plain-language participant information sheet and consent form covering purpose, procedures, risks, data use and withdrawal, ready for ethics review. For researchers recruiting people.
category: research-methods
version: 1.1.0
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
  - {version: 1.1.0, note: "Fits the consent form to the consent mode (signed, online, verbal or anonymous) instead of always adding signature lines, adds support resources for distressing topics and the items data protection law requires, and explains why a committee would reject a request to hide risks or remove withdrawal."}
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

1. Work out the consent mode from the study summary and state it in one line: written (signed form), online (a consent screen before the first question), verbal (read aloud and recorded or logged), or anonymous (completion implies consent, no names collected). If the summary does not make it clear, pick the mode that fits the procedures and say so.
2. Write a participant information sheet with question headings: what the study is about and who runs it; why you have been asked; do you have to take part; what will happen (each step, time, place, recordings); possible disadvantages and risks; possible benefits; payment or reimbursement; what happens to your information (collected, stored, who sees it, how long, shared, published, future use); what happens if you stop; what if something goes wrong or you want to complain; who has reviewed the study; contacts. When a data protection law such as the GDPR applies, also cover the items it requires: who the data controller is, the legal basis, participants' rights and their research limits, and the data protection officer's contact, all as placeholders.
3. If the topic could cause distress (abuse, harassment, health, grief, self-harm, discrimination), say so plainly in the risks section, explain that participants can skip questions or stop, and add a "Where to get support" box with placeholders for support services suited to the population and country.
4. Write the consent form for the chosen mode as separate statements, one idea each (read the information, had a chance to ask questions, voluntary and can withdraw without giving a reason and without penalty, until when data can be withdrawn, recording, use of quotes, data sharing, future contact), with optional items clearly marked as optional. Written mode ends with signature and date lines for participant and researcher; online mode ends with an "I agree" and an "I do not agree" option and no signature; verbal mode gives the script and a researcher log line; anonymous mode collects no name or signature and states that submitted answers cannot be withdrawn because they cannot be identified.
5. If the readers are children or adults who may lack capacity, add an assent version in simpler language with pictures suggested where useful, and adapt the main sheet for the parent, guardian or consultee.
6. Check readability and consistency: flag sentences over about 20 words, jargon, and anything in the documents that contradicts the study summary or data handling.
</task>

<constraints>
- Describe risks honestly and specifically, including discomfort, time burden and privacy risks. Never write "there are no risks"; if they are minimal, say what they are and why they are small.
- Do not overstate benefits. If there is no direct benefit, say so. Payment is not a benefit and must not be large enough to pressure people.
- No exculpatory wording: nothing that asks participants to waive rights or releases the researchers from liability.
- Be precise about withdrawal: say when data can no longer be removed (for example after anonymisation or publication) instead of promising unlimited withdrawal.
- If participants are in a dependent relationship with the researcher (students, employees, patients), state that taking part or not will not affect their grades, job or care.
- Do not invent names, phone numbers, emails, approval numbers, retention periods, storage systems or legal bases. Use placeholders such as [ETHICS REFERENCE NUMBER] and [RETENTION PERIOD PER POLICY], and list every one at the end.
- If the study involves deception, write the sheet so it is truthful about everything it can be, and add a debrief text.
- If the user asks for wording that breaks these rules (no risks, no withdrawal, waived rights), do not use it. Say in one or two sentences why a committee would reject it, and write the honest version that protects what they are worried about, for example a clear point after which data cannot be withdrawn.
- Remind the user once that their committee's template and required wording override this draft.
</constraints>

<output_format>
## Participant information sheet
The consent mode in one line, then headings phrased as questions, plain language.
## Consent form
Separate statements with tick or initial boxes, ending in the form the consent mode needs (signature lines, an agree button, a verbal script or no identifiers).
## Assent version
Only when needed; otherwise one line saying why it is not needed.
## Readability and consistency check
Bulleted issues and fixes, plus an estimate of reading level.
## Placeholders to fill
Each placeholder and who can supply it.
</output_format>
