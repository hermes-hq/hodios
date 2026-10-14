---
schema: 1
id: build-rfp-finalist-presentation
kind: prompt
title: Build a shortlisted bid presentation
description: Prepares a shortlisted bidder's presentation to a buyer's panel, mapped to the published scoring criteria, with the team on show, evidence for each criterion, a rehearsal plan and Q&A ownership.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [sales-rep, consultant, founder, project-manager]
requires: [none]
inputs: [document, spec, notes]
output: [outline, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [tender, bid-presentation, scoring-criteria, procurement, q-and-a]
pairs_with:
  prompts: [respond-to-rfp, drill-presentation-qa, plan-backup-slides, request-debrief-after-lost-bid]
  personas: [presentation-designer]
args:
  - name: invitation
    description: The buyer's invitation to present, the scoring criteria and weights, the questions or scenario they set, time allowed and any rules about who must attend.
    type: text
    required: true
  - name: our_bid
    description: Your written proposal or its key points, pricing approach, the proposed team, and relevant case studies or references.
    type: text
    required: true
  - name: intel
    description: What you know about the panel, the buyer's concerns, clarification questions they asked, and competitors on the shortlist. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Win themes, Criteria map, Running order and slides, Who says what, Questions the panel will ask, Rehearsal plan, Compliance checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help bid teams prepare for the presentation or interview stage of a formal tender or request for proposal. At this stage panels usually score against published criteria and weights, often with a fixed scenario or set questions, and each panel member may score independently on a sheet. Bidders lose points by giving a generic sales pitch, repeating the written bid, fielding a senior sales lead who will not work on the contract instead of the delivery team, overrunning so the scored Q&A is cut short, and answering questions vaguely or contradicting the written submission (which is often contractual). Winning teams build the presentation around the criteria in the buyer's order and language, answer the set scenario directly, bring the people who will do the work, prove claims with relevant case studies, show they understand the buyer's specific risks, keep consistent with the written bid, and rehearse Q&A with a clear owner for each topic. In public procurement, rules on what can be added after submission and on contact with evaluators must be followed exactly.

<invitation>
{{invitation}}
</invitation>

<our_bid>
{{our_bid}}
</our_bid>

{{#intel}}
<intel>
{{intel}}
</intel>
{{/intel}}
</context>

<task>
1. Identify two or three win themes: the reasons the buyer should choose you, each tied to a buyer need or risk named in the invitation or intel.
2. Build a criteria map: each scoring criterion with its weight, the evidence in your bid that scores against it (case study, method, team member, price element), the slide or speaker that covers it, and gaps where your evidence is weak.
3. Plan the running order within the time allowed, following the buyer's criteria order or set questions. Spend time in proportion to weights. Leave the full Q&A time protected; aim to finish early rather than late.
4. For each slide give an assertion title in the buyer's language, content and evidence, and the speaker.
5. Assign who says what: each person presents the area they will deliver, with a lead who opens and closes, and a handover line between sections.
6. List the questions the panel is likely to ask, especially on the weakest criteria, risks, price, mobilisation, staff continuity and anything raised in clarifications. For each give an answer outline consistent with the written bid and name the owner.
7. Write a rehearsal plan: two timed run-throughs, one mock panel with hostile questions, and a check that nothing contradicts the written submission.
8. List compliance checks: attendance rules, whether new information or pricing changes are allowed at this stage, materials to submit beforehand, conflicts of interest.
</task>

<constraints>
- Use only the facts in the bid and invitation. Do not invent case studies, client names, results, accreditations, team members or prices.
- Do not suggest promising anything that changes the submitted price, scope or terms unless the invitation allows it; flag such points for the bid manager.
- Never suggest contacting evaluators outside the formal process or using confidential competitor information.
- Keep every answer consistent with the written submission; flag any conflict found.
</constraints>

<output_format>
## Win themes
Numbered, each with the buyer need it answers.

## Criteria map
Table: Criterion | Weight | Our evidence | Slide or speaker | Gap.

## Running order and slides
Table: # | Slide title (assertion) | Content and evidence | Speaker | Minutes. Q&A time stated.

## Who says what
Bullets with handover lines.

## Questions the panel will ask
Table: Question | Answer outline | Owner.

## Rehearsal plan
Steps.

## Compliance checks
Checklist.
</output_format>
