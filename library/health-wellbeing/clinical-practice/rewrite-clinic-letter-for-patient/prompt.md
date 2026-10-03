---
schema: 1
id: rewrite-clinic-letter-for-patient
kind: prompt
title: Rewrite a clinic letter for the patient
description: Rewrites a clinic letter or result summary written for colleagues into a plain-language letter addressed to the patient, keeping every clinical fact, value and action accurate.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [operate]
subject: [healthcare, medicine]
requires: [none]
inputs: [document, text]
output: [rewrite, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [writing-to-patients, clinic-letters, plain-language-health, readability, outpatients, clinical-correspondence]
pairs_with:
  prompts: [write-referral-letter, write-teach-back-script, write-patient-education-handout, explain-clinical-notes]
args:
  - name: clinic_letter
    description: The letter or result summary as written for the GP or another clinician. Remove names, dates of birth, addresses and record numbers first; you will add them back in your letter template.
    type: text
    required: true
  - name: reading_level
    description: How plain to make it. simple = short sentences and everyday words throughout (about age 9 to 11 reading level); standard = plain English for most adults, with medical terms explained once.
    type: enum
    enum: [simple, standard]
    default: standard
output_contract:
  format: markdown
  sections: [Letter to the patient, Fact check table, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help clinicians write directly to patients, the practice recommended by bodies such as the UK Academy of Medical Royal Colleges ("Please, write to me"): the letter is addressed to the patient, copied to the GP, and written so the patient can understand and act on it, while staying an accurate clinical record. Rewriting for patients goes wrong in two ways: the meaning drifts (a "likely" becomes certain, a "?" disappears, a value is rounded), or the tone becomes patronising. You keep every fact exactly and change only the language and order.

<clinic_letter>
{{clinic_letter}}
</clinic_letter>
Reading level: {{reading_level}}
</context>

<task>
1. Extract every clinical fact in the source: diagnoses and their certainty, findings, results with values and units, medicines started, changed or stopped with doses, advice, referrals, follow-up and who is responsible for each action.
2. Rewrite as a letter to the patient ("Dear [patient name]", "You came to see me…"), in this order: why they came; what we found and what it means in plain words; what happens next, with a clear list of actions for the patient, for the GP and for the clinic; what to do if things change, with warning signs from the source; a closing line with how to contact the clinic.
3. Explain each medical term in plain words the first time, keeping the term in brackets if the patient may see it elsewhere ("an underactive thyroid (hypothyroidism)"). Give numbers with what they mean only if the source says what they mean ("your HbA1c was 64, which is above the target of 53 we agreed"); never add an interpretation the source does not give.
4. Keep certainty exactly: "probable", "we think", "we cannot rule out" must survive.
5. Handle sensitive content carefully: if the source contains a serious new diagnosis, information about other people, third-party information or wording that would be hurtful, flag it for the author rather than softening or removing it yourself.
6. Build a fact check table linking each fact in the new letter to the source wording, so the author can verify in a minute.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No new facts, reassurance, prognosis, numbers or advice beyond the source. No dropped facts: every action and result in the source must appear.
- Copy medicine names, doses and frequencies exactly, then explain in plain words ("ramipril 5 mg once a day, a tablet to lower your blood pressure", only if the source says why).
- For simple reading level: sentences under 15 words, everyday words, one idea per paragraph, headings phrased as questions ("What did we find?"). For standard: plain English, sentences under about 20 words.
- Respectful and adult: never "don't worry", never childish wording, never blame ("you failed to take").
- Use placeholders for identifiers, names and contact details.
</constraints>

<output_format>
## Letter to the patient
The full rewritten letter.
## Fact check table
Table: In new letter | Source wording.
## Questions for the author
Ambiguities, sensitive passages and anything the patient will likely ask that the source does not answer.
</output_format>

<examples>
Source: "Impression: likely IBS. FBC, CRP, coeliac serology NAD. Faecal calprotectin 22. Trial of mebeverine 135mg TDS. D/C from clinic, GP to review 6/52."
Rewrite: "We think your symptoms are most likely caused by irritable bowel syndrome (IBS). Your blood tests, including the test for coeliac disease, were normal. Your stool test (faecal calprotectin) was 22. We suggest you try a medicine called mebeverine, 135 mg three times a day. You do not need to come back to this clinic. Please book a review with your GP in 6 weeks."
</examples>
