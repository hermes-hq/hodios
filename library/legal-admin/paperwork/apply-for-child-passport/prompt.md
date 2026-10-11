---
schema: 1
id: apply-for-child-passport
kind: prompt
title: Apply for a child's passport
description: Guides a first or renewed passport application for a child - parental consent, proof of parentage, photo rules, appointments, timing and issues for separated parents.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, traveler]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [child-passport, parental-consent, travel-documents, baby-passport, separated-parents]
pairs_with:
  prompts: [renew-passport-or-id-card, check-travel-requirements, register-newborn-birth]
args:
  - name: child
    description: Child's age, first passport or renewal, country of birth, citizenship and how it was acquired, and whether the name on the birth certificate matches the name they use.
    type: text
    required: true
  - name: parents
    description: Who has parental responsibility or custody, whether the parents are together, separated or divorced, whether both can sign, any court order, and whether either parent lives abroad.
    type: text
    required: true
  - name: travel
    description: Optional. Planned travel dates and destination, and where you are applying from (home country or a consulate abroad).
    type: text
  - name: country
    description: The country issuing the passport.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Timeline, Consent and parental responsibility, Documents to gather, Photo rules, Applying, Travelling with the child]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent get a passport for a child. Child applications differ from adult ones in ways that cause delays: many countries require consent from both parents or everyone with parental responsibility, sometimes with both appearing in person for younger children; first passports need proof of the child's citizenship and of each parent's relationship to the child, and sometimes the parents' own citizenship documents; children's passports are often valid for a shorter period, so they expire sooner than parents expect; photo rules are strict even for babies (plain background, eyes open where possible, no hands visible, no toys); and a name difference between documents needs a change-of-name document. Separated parents hit the hardest problems: one parent cannot or will not sign, a court order limits travel or passport applications, or a parent lives abroad. Processing times swing with seasons, and some countries offer urgent services only with proof of travel. Some destinations and airlines also ask for a consent letter when a child travels with only one parent.

Issuing country: {{country}}

<child>
{{child}}
</child>

<parents>
{{parents}}
</parents>

{{#travel}}
<travel>
{{travel}}
</travel>
{{/travel}}
</context>

<task>
1. Build a timeline working back from any travel date: when to apply, usual processing time marked "[to verify]", buffer for problems, and whether an urgent service may be needed. Say plainly if the travel date looks too close.
2. Explain consent: who usually must consent or sign for {{country}}, whether in person, and what to do if a parent is abroad, uncontactable, unwilling or deceased, or if a court order exists. Mark rules "[to verify]" and recommend legal advice where parents disagree.
3. List documents to gather: the child's birth certificate (full version with parents' names), proof of citizenship for a first passport, the parents' passports or IDs, any previous passport, court orders, adoption or name-change documents, and proof of address.
4. Give photo rules for children and babies as commonly applied, with tips for photographing an infant, marked "[check the official photo guidance]".
5. Explain applying: online or paper, who can countersign or certify where required, consulate appointments when abroad, fees to check, and what happens to old passports and documents sent in.
6. Cover travel once the passport arrives: consent letters for one-parent travel, matching names on tickets, and entry rules for the destination to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state fees, validity periods, processing times or consent rules as fact; mark them and point to the issuing country's official passport authority.
- Never help get a passport or travel abroad with a child in breach of the other parent's rights or a court order; if the parents are in dispute, say that applying or travelling without consent can be a serious legal matter in some countries and recommend family law advice.
- Do not ask for more personal detail than the steps need.
{{> output/uncertainty}}
</constraints>

<output_format>
## Timeline
Table: Date or week | Action.

## Consent and parental responsibility
Bullets marked "[to verify]".

## Documents to gather
Checklist.

## Photo rules
Bullets.

## Applying
Numbered steps.

## Travelling with the child
Bullets.
</output_format>
