---
schema: 1
id: design-certificate
kind: prompt
title: Design a certificate
description: Designs a completion, award or membership certificate with the wording, hierarchy, layout options, merge fields for names, verification details and print and PDF specs.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, teacher, operations-manager, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [certificate, award-design, variable-data, print-design, recognition]
pairs_with:
  prompts: [prepare-print-files, pair-typefaces, design-accessible-print-materials]
  personas: [art-director]
args:
  - name: certificate
    description: What is being recognised and by whom - the issuing organisation, the achievement (course completion, award, membership, volunteering), how many will be issued and any brand assets.
    type: text
    required: true
  - name: delivery
    description: How it reaches people, for example "printed on card and handed out at a ceremony" or "emailed PDF". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Wording, Hierarchy, Layout options, Typography and colour, Variable data, Authenticity and verification, Print and PDF specs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A certificate is a keepsake and a record. The recipient's name is the hero; the achievement and the issuer come next; date, signatures and an identifier close it. Common failures: the organisation's logo dominates the person's name; decorative script faces that cannot render long names, accents or non-Latin scripts; layouts that break when a merge field holds "Maria Fernanda Rodríguez-Castellanos"; wording that overstates what was achieved ("certified" for a one-hour webinar); and ornate seals that make a simple course certificate look like an official qualification. Certificates issued in bulk are produced by merging a spreadsheet into a template, so the design must survive the longest and shortest values.
</context>

<task>
Design a certificate for: {{certificate}}
{{#delivery}}Delivery: {{delivery}}{{/delivery}}

If it is unclear what is being recognised or who issues it, ask and stop.

1. **Wording.** The exact text for every element: title ("Certificate of Completion", "Award for ..."), presentation line, recipient name field, achievement line stating precisely what was done (course name, hours or dates, level), issuer, date, signatory names and roles, and certificate ID. Use honest verbs: "completed", "attended", "awarded"; use "certified" only if the issuer runs a real certification.
2. **Hierarchy.** Order of emphasis from first glance to last, with relative sizes.
3. **Layout options.** Two layouts (for example a classic centred formal layout and a modern asymmetric one), each with orientation, margins, placement of logo, name, text, signatures and any border or graphic.
4. **Typography and colour.** Typefaces for name, title and text with weights, checking that the name typeface covers the accents and scripts recipients will have; colour use that prints well and stays legible; restraint with borders and seals.
5. **Variable data.** The merge fields, the longest and shortest test values, how the name field shrinks or wraps, date format for the audience, and a checklist for proofing a merged batch.
6. **Authenticity and verification.** A unique ID per certificate, how someone could verify it (a register or verification page the issuer actually runs, or a contact), signature handling (signature images kept private and placed only by the issuer), and what not to do to avoid looking like a government or university document.
7. **Print and PDF specs.** Size (A4 or US Letter landscape unless asked), card weight and finish, bleed if there is edge colour, and for PDFs: embedded fonts, a tagged accessible PDF, file naming per recipient.
</task>

<constraints>
- Do not help imitate a certificate, diploma, licence or qualification from an organisation that is not the issuer, and do not add seals, crests or wording that suggest an accreditation the issuer does not hold. If asked to, decline briefly and offer an honest design instead.
- Do not invent accreditation bodies, credit hours or signatories; use placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Wording as a table (Element, Text). Variable data as a table (Field, Example, Longest test value, Rule). Proofing as a checklist.
</output_format>
