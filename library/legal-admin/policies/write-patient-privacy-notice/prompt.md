---
schema: 1
id: write-patient-privacy-notice
kind: prompt
title: Write a privacy notice for patients or clients
description: Drafts a privacy notice for a clinic, therapist, dentist, physiotherapist or other health practice - health records, sharing with other providers, legal disclosures, patient rights and retention.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
subject: [law, healthcare, medicine]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [patient-privacy, health-records, privacy-notice, confidentiality, notice-of-privacy-practices, health-data]
pairs_with:
  prompts: [check-hipaa-obligations, write-privacy-policy, write-data-retention-schedule, handle-data-subject-request]
args:
  - name: practice
    description: Type of practice, whether you see children, how records are kept, who you share with (referring clinicians, labs, insurers, public bodies), tools used (online booking, video, messaging, reminders), whether sessions are recorded, and any marketing.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or province, because health privacy notices follow different laws (for example GDPR-style laws, HIPAA in the US, provincial health privacy laws in Canada).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Key points, Privacy notice, Short version for forms, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the privacy notice a health practice gives patients or clients. Health information is the most sensitive personal data most people share, and patients mainly want to know who will see it. A good notice explains what is collected (contact details, medical history, notes, test results, images, payment and insurance details), why (providing care, managing appointments, billing, meeting legal duties, quality and safety), who it is shared with and when (other clinicians involved in care, labs, referral partners, insurers or funders with consent or as required, regulators, and disclosures required by law such as safeguarding concerns, court orders or public health reporting), and the limits of confidentiality in plain words. Under GDPR-style laws, health data needs both a lawful basis and a special category condition (usually the provision of health care under a professional's duty of confidentiality), and patients have rights of access (a common complaint is slow or refused copies of records), correction (clinical opinions are usually annotated rather than changed), and limited erasure, because records must be kept for set periods under health record rules. In the US, a covered entity must provide a Notice of Privacy Practices with required content and get acknowledgment of receipt, and state laws add rules; in Canada, provincial health privacy laws apply. Practices often forget to mention online booking, video and messaging tools, call or session recordings, reminders by text, and how children's records and parental access work.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Practice:
<practice>
{{practice}}
</practice>

1. Key points: the legal framework that likely applies, decisions the practice must make (such as recording sessions or using messaging), and anything described that looks risky.
2. Privacy notice in plain language: who we are and how to contact us (and the privacy lead or officer), what we collect, why and the legal basis or permission, who we share with and why, disclosures without consent required or allowed by law, tools and service providers, international transfers if any, how long records are kept, how we protect records, your rights and how to use them, children and young people, recordings, marketing (separate and optional), complaints and the regulator, and changes. If the jurisdiction is the US and the practice is a covered entity, structure it as a Notice of Privacy Practices with the required elements marked to confirm. Use [BRACKETS] for missing details.
3. Short version for forms: a short paragraph for intake forms and booking pages linking to the full notice, plus an acknowledgment line where one is required.
4. Points to confirm, including record retention periods and professional body rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent retention periods, regulator names or legal references; mark them "confirm for {{jurisdiction}}".
- Do not promise absolute confidentiality; explain the legal exceptions in plain words.
- Do not bundle marketing consent with consent to treatment or the notice.
- Recommend checking the notice with the practice's professional body or a health privacy adviser, and with the records system provider for transfer and security details.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key points
Bulleted list.

## Privacy notice
Sections with headings, written to the patient as "you".

## Short version for forms
Short text block and acknowledgment line.

## Points to confirm
Numbered list.
</output_format>
