---
schema: 1
id: write-photo-consent-form
kind: prompt
title: Write a photo and video consent form
description: Drafts a photo and video consent form with a short policy for a school, club or event - specific uses, opt-outs, children's images, withdrawal and how long images are kept.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, individual]
subject: [law]
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
tags: [photo-consent, image-rights, data-protection, children-images, school-photos, event-photography]
pairs_with:
  prompts: [write-safeguarding-policy, write-volunteer-policy, write-privacy-policy, write-data-retention-schedule]
args:
  - name: organisation_type
    description: The kind of organisation and audience, for example "primary school", "adult amateur choir", "youth sports club", "one-day community festival".
    type: string
    required: true
  - name: uses
    description: Every way images will be used - internal displays, newsletter, website, social media accounts, press, printed brochures, livestreams, sharing with parents - and who takes them (staff, volunteers, a hired photographer, parents).
    type: text
    required: true
  - name: country
    description: Country (and state where relevant); data protection and image rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you use this, Short policy, Consent form, Notice for events, Gaps to fill, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft photo and video consent forms and short image policies for schools, clubs and events. Photos of identifiable people are usually personal data, and children's images carry extra safeguarding risk: a name next to a face, a school logo and a location can help someone find a child, and some children must never appear publicly for court, adoption, fostering or protection reasons. Good consent is specific (each use opted into separately, not one blanket tick), freely given, easy to withdraw, and recorded. It explains how long images are kept and what happens to images already published when consent is withdrawn. In some places the organisation may rely on a legal basis other than consent for some uses, so the form should not claim more than it does. Your job is a clear, plain-language form and policy tailored to the actual uses, with the legal points left for the organisation to confirm.

Organisation: {{organisation_type}}
Country: {{country}}
</context>

<task>
Uses of images:

<uses>
{{uses}}
</uses>

1. If it is unclear whether children are photographed, ask and stop, because the form and safeguards change.
2. Write a "Before you use this" note: who should review it (the data protection lead, headteacher or committee, and a data protection adviser for anything unusual), and that the legal basis and retention period must be confirmed for {{country}}.
3. Draft a short policy: why images are taken, who may take them, the safeguards (no full names with children's images in public channels, no images of children in swimwear or changing areas, consent checked before publication, organisation devices or approved photographers, secure storage), how consent is recorded and checked, how long images are kept and how they are deleted, how withdrawal works, and parents or attendees taking their own photos at events.
4. Draft the consent form: a plain explanation, then a separate yes or no tick box for each use listed (never a single blanket consent), who is giving consent (the person themselves, or a parent or guardian for a child, with a note to involve older children in the decision), how long consent lasts and when it is renewed, how to withdraw, and a signature and date block. Use placeholders for the organisation's name and contact.
5. Draft a short notice for events where photography happens, telling attendees how to opt out (for example a coloured lanyard or a no-photo area) and who to speak to.
6. List the gaps to fill: retention period, data protection contact, legal basis for each use, and storage location.
7. Write questions to check with a data protection adviser, the regulator's guidance or the organisation's safeguarding lead.
8. Before answering, check that every use in the input has its own tick box, children's names are never paired with images publicly unless the organisation explicitly decides otherwise with separate consent, and withdrawal is explained honestly (images already printed or shared by third parties may not be retrievable).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state a legal basis, retention period or age of consent for data as fact. Put them in [BRACKETS] to confirm for the country.
- Never draft wording that makes consent a condition of joining or participating, unless the image is essential to the activity and the organisation confirms it; say why.
- Do not promise that published images can always be removed everywhere; say what the organisation will do (remove from its own channels and stop future use).
- Include a line that the organisation will not publish images of any child where a parent or carer has flagged a safety reason, regardless of other consents.
- Keep the form to one page of plain language.
</constraints>

<output_format>
## Before you use this
Three sentences.

## Short policy
The policy text with sub-headings.

## Consent form
The form with tick boxes as "[ ] Yes  [ ] No" per use, and placeholders.

## Notice for events
A short notice.

## Gaps to fill
Checklist.

## Questions to check
Numbered.
</output_format>
