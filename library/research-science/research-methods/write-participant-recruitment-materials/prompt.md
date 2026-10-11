---
schema: 1
id: write-participant-recruitment-materials
kind: prompt
title: Write participant recruitment materials
description: Writes ethics-ready recruitment materials for a study (poster, email, social post, gatekeeper letter, screening script) that are accurate, non-coercive and clear.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [participant-recruitment, research-ethics, recruitment-poster, screening-questions, gatekeeper]
pairs_with:
  prompts: [write-informed-consent-form, write-ethics-application, design-sampling-plan]
  personas: [research-methodologist]
args:
  - name: study
    description: The study's purpose in plain words, who you need (eligibility), what participants do, how long it takes, any payment or thanks, where and when, and the institution and ethics reference if approved.
    type: text
    required: true
  - name: channels
    description: Where you will recruit, for example "posters in GP waiting rooms, a patient charity newsletter, the department mailing list".
    type: text
    required: true
  - name: language_level
    description: Optional. Reading level or language needs of the audience, for example "plain English for people with mild learning disabilities".
    type: text
output_contract:
  format: markdown
  sections: [Key facts, Materials, Screening script, Ethics checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recruitment material is the first thing an ethics committee and a potential participant read, and both look for the same things: an honest description of what taking part involves, no pressure, and a clear way to ask questions. Common reasons committees send materials back: overstated benefits ("this study will help treat your condition"), payment presented as the headline and large enough to induce, implied endorsement or pressure when a teacher, clinician or manager recruits their own students, patients or staff, eligibility terms that stigmatise or disclose health status in public, missing time commitment or contact details, and wording that does not match the approved protocol. Good materials state the purpose plainly, say who can take part, what they will do, for how long, where, any reimbursement framed as thanks or expenses, that participation is voluntary, who is running the study and how to get more information, with the ethics reference once approved. Gatekeepers (clinicians, schools, organisations) need a short letter explaining what is asked of them and what is not.
</context>

<task>
Write recruitment materials for:
<study>
{{study}}
</study>
Channels: {{channels}}
{{#language_level}}
Language needs: {{language_level}}
{{/language_level}}

1. Extract the key facts every material must carry and list any that are missing as placeholders (for example [ETHICS REF], [CONTACT EMAIL]).
2. Write one version per channel, sized to it: a poster (headline, three to five short lines, contact, tear-off or QR placeholder), an email or newsletter piece, a social post within typical length limits, and a gatekeeper letter if a third party helps recruit.
3. Write a short screening script or form that checks eligibility with neutral questions, asks only what is needed, explains what happens to screening data, and tells ineligible people kindly.
4. Run an ethics check on all materials: coercion and undue inducement, power relationships, overstated benefits, stigmatising or disclosing wording in public places, privacy for replies, consistency between versions, readability for the audience.
</task>

<constraints>
- Use only facts the user gave; put placeholders for anything missing. Never invent ethics approval references, payment amounts or contacts.
- No promises of personal benefit beyond what the study provides; no urgency tactics.
- Payment, if any, is mentioned after the purpose and framed as thanks or expenses.
- When the recruiter has power over potential participants, route invitations through a neutral person or channel and say so.
- Public materials must not reveal a stigmatised condition about whoever responds; offer neutral headline wording where needed.
- Remind the user that materials must match the approved protocol and be submitted to the ethics committee before use.
</constraints>

<output_format>
## Key facts
A table: fact | value or placeholder.
## Materials
A subsection per channel with the ready text.
## Screening script
The questions and the scripted replies for eligible and ineligible people.
## Ethics checklist
A table: check | status | change made.
</output_format>
