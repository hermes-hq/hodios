---
schema: 1
id: write-specialist-referral-summary
kind: prompt
title: Write a referral summary for a specialist
description: Writes a school referral summary for an educational psychologist, speech and language therapist or occupational therapist, with evidence, support tried and questions, without diagnosing.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [referral, educational-psychology, speech-and-language, graduated-response, special-educational-needs]
pairs_with:
  prompts: [write-one-page-pupil-profile, gather-pupil-views-for-review, write-iep-progress-report]
  personas: [special-education-advisor]
  workflows: [assess-plan-do-review-track]
args:
  - name: notes
    description: What staff have noticed and recorded - attainment and assessment data, observations with dates, attendance, what support was put in place, for how long and what changed. Use initials, not the pupil's name.
    type: text
    required: true
  - name: specialist
    description: The service you are referring to; it decides which evidence and questions matter most.
    type: enum
    enum: [educational-psychologist, speech-and-language-therapist, occupational-therapist, other-specialist]
    default: educational-psychologist
  - name: setting
    description: The pupil's age or year group, the school setting, and the country or local service, so terms and referral routes fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Reason for referral, Strengths, Concerns with evidence, Support tried and response, Views of the pupil and family, Questions for the specialist, Missing before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Specialist services are scarce, and referrals are often returned or deprioritised because they say "we think he might be dyslexic" or "she has ADHD traits" instead of describing what the pupil does, in which situations, how often, and what the school has already tried for how long. A strong referral describes rather than labels, leads with strengths, shows a cycle of support with measured response, includes the pupil's and family's views and consent, and asks the specialist clear questions the school cannot answer itself. Schools do not diagnose; specialists assess, and in many places only certain professionals can diagnose. Referral routes, forms and consent rules differ by country and local service.

Specialist: {{specialist}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
Write the referral summary from these notes.

<notes>
{{notes}}
</notes>

1. Reason for referral: two or three sentences on what the school needs help to understand or plan, in terms of the pupil's learning and participation, not a suspected label.
2. Strengths: what the pupil does well and enjoys, from the notes.
3. Concerns with evidence: each concern as observable behaviour or performance, with context, frequency or data, and dates. Rewrite any label in the notes (for example "autistic traits", "lazy", "attention-seeking") into a description of what was seen, and list the rewrites for the user.
4. Support tried and response: each intervention or adjustment, how long, how often, who delivered it, and the measured response. If the notes show less than one full cycle of support, say so; many services expect evidence of support tried first.
5. Views of the pupil and family: what is recorded; if missing, say it is needed and suggest how to gather it.
6. Questions for the specialist: three to five specific questions matched to {{specialist}}, for example for a speech and language therapist "Is X's difficulty following multi-step instructions a receptive language need, and what classroom strategies would help?"
7. Missing before sending: consent from the family (and the pupil where appropriate), required local forms, any data the service usually asks for, and anything in the notes that should not be shared.
</task>

<constraints>
- Never diagnose or suggest a diagnosis. Describe, do not label.
- Use only the facts in the notes. Never invent dates, scores or interventions; mark gaps.
- Keep identifying details to what the referral needs; use initials.
- If the notes contain a safeguarding concern (signs of harm, neglect or a disclosure), say it must go to the designated safeguarding lead under school procedures now, separately from this referral.
- Do not state a specific country's referral rules as fact unless the user gave them.
</constraints>

<output_format>
## Reason for referral
Two or three sentences.

## Strengths
Bullets.

## Concerns with evidence
Table: Concern (observable) | Where and when | Frequency or data.

## Support tried and response
Table: Support | Duration and frequency | Delivered by | Response.

## Views of the pupil and family
Short paragraph or "Not yet gathered" with a suggestion.

## Questions for the specialist
Numbered.

## Missing before sending
Checklist, including the labels rewritten.
</output_format>
