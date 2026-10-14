---
schema: 1
id: complain-about-healthcare-provider
kind: prompt
title: Complain about a healthcare provider
description: Writes a formal complaint to a hospital, clinic, dentist or care provider about treatment or service, with a dated account, specific questions to answer, the outcome wanted and the escalation route.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, parent]
subject: [law, healthcare]
requires: [none]
inputs: [text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [patient-complaint, hospital, clinic, care-quality, patient-advocacy]
pairs_with:
  prompts: [request-medical-records, complain-to-ombudsman, explain-legal-letter]
args:
  - name: what_happened
    description: What happened, in date order - the provider, the department or staff roles (names only if you want), the care given, what went wrong, the effect on the patient, and anything already raised.
    type: text
    required: true
  - name: outcome
    description: What you want from the complaint - an explanation, an apology, a review of the care, a change in practice, a further appointment, a refund of fees, or a meeting.
    type: text
    required: true
  - name: complainant
    description: Who is complaining - the patient, or a relative or carer on their behalf (in which case the patient's consent may be needed).
    type: string
  - name: country
    description: Country and whether the provider is public, private or insurer-funded. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you write, Complaint letter, Questions to answer, Consent and records, If you are not satisfied]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help patients and families complain about healthcare. Complaints teams respond best to complaints that set out events in date order, separate facts from feelings, and end with numbered questions the provider must answer, because those questions shape the investigation and make a vague reply easy to spot. Most systems have a local complaints stage with a time limit for raising a complaint (often months, not years, from the event or from when the problem became known), followed by an independent stage such as a health ombudsman, a regulator of professionals, or the insurer or licensing body for private care. A complaint is not the same as a legal claim for clinical negligence: it can produce explanations and changes, but compensation usually needs a separate legal route with its own time limits.

{{#complainant}}Complainant: {{complainant}}{{/complainant}}
{{#country}}Country and setting: {{country}}{{/country}}
</context>

<task>
What happened:

<events>
{{what_happened}}
</events>

Outcome wanted:

<outcome>
{{outcome}}
</outcome>

1. Before you write: if the patient is still under the provider's care and there is an urgent safety concern, say to raise it immediately with the ward, clinic manager or patient liaison service, and to seek urgent care if needed. Note the usual time limit for complaints as "verify locally".
2. Write the complaint letter: addressed to the complaints manager, with the patient's name, date of birth and hospital or patient number as [BRACKETS]; a one-sentence summary; a dated account in numbered paragraphs; the impact on the patient and family; numbered questions; the outcome wanted; and a request for a written response and, if wanted, a meeting.
3. Write the questions to answer: specific, neutral and answerable from records (for example "Why was the blood test result from 3 March not acted on before 10 March?").
4. Consent and records: if a relative is writing, the patient's signed consent or proof of authority (for a patient who has died or lacks capacity, what authority may be needed); suggest requesting the medical records separately.
5. If you are not satisfied: the usual escalation route for this setting (independent ombudsman or commissioner, professional regulator, private-sector complaints scheme or insurer) marked "verify", and that a clinical negligence claim, if the person is considering one, needs early advice from a specialist lawyer because time limits apply.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not judge whether the care was clinically correct, diagnose, or say that negligence occurred. Frame clinical points as questions.
- Use only the facts given; do not invent dates, test results, staff names, diagnoses or rules. Use [BRACKETS].
- Keep the letter calm and factual; no accusations of intent, threats or insults towards staff.
- Leave out unnecessary health details about other people.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you write
Short bullets, urgent steps first.

## Complaint letter
Complete letter with [BRACKETS].

## Questions to answer
Numbered list (also included in the letter).

## Consent and records
Bullets.

## If you are not satisfied
Ordered steps, marked verify.
</output_format>
