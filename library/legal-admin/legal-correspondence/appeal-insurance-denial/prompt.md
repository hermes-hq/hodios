---
schema: 1
id: appeal-insurance-denial
kind: prompt
title: Appeal a denied insurance claim
description: Drafts an appeal of a denied insurance claim by matching the insurer's stated reason to the policy wording and the evidence, with deadlines and escalation options to an ombudsman or regulator.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, parent, founder]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [insurance-claim, claim-denial, policy-wording, ombudsman]
pairs_with:
  prompts: [explain-legal-letter, write-complaint-letter]
  workflows: [dispute-resolution-track]
args:
  - name: denial_letter
    description: The insurer's denial or partial-denial letter in full, including the claim number, the reason given, any clause cited and the appeal or complaint instructions. Remove policy and ID numbers except the last digits.
    type: text
    required: true
  - name: policy_excerpt
    description: The relevant policy wording - the cover section, definitions, exclusions and conditions the insurer relies on. Optional; the prompt asks for it if the denial cannot be assessed without it.
    type: text
  - name: evidence
    description: What you have - photos, receipts, reports (police, medical, repairer), correspondence, notes of calls with dates and names, expert opinions. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The denial, Deadlines, Reason versus policy wording, Evidence gaps, Appeal letter, Escalation, Questions for a professional]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help policyholders challenge insurance claim denials. A strong appeal answers the insurer on its own terms: it names the exact reason given, quotes the policy wording the insurer relies on, shows why the facts and evidence fall within the cover or outside the exclusion, and fills the evidence gaps the insurer pointed to. Insurers' first decisions are not always final; internal appeals, complaints processes and outside bodies (an insurance ombudsman, a regulator, or for health plans an external review in some places) often change outcomes. Each stage has its own time limit. Health, life, disability and large property claims can carry high stakes and specialist rules.
</context>

<task>
Denial:

<denial_letter>
{{denial_letter}}
</denial_letter>
{{#policy_excerpt}}

Policy wording:

<policy_excerpt>
{{policy_excerpt}}
</policy_excerpt>
{{/policy_excerpt}}
{{#evidence}}

Evidence:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Decode the denial: the type of insurance, what was claimed, whether it is a full or partial denial, the exact reason(s) given, the clause(s) cited, and the appeal or complaint route and deadline stated in the letter. Put every deadline first.
2. Map each reason to the policy wording: quote the cover section and definitions, and the exclusion or condition relied on. Show how the facts relate to each element of that wording. If the wording was not provided, say that the appeal cannot be properly assessed without it and list exactly which sections to request (full policy schedule and wording in force on the date of loss).
3. Identify the type of dispute: not covered at all, an exclusion applies, a condition was breached (late notice, missing documents, non-disclosure), the amount is disputed, or a medical-necessity or similar judgement for health claims. Note where wording is ambiguous and both readings are plausible, without concluding which a court or ombudsman would adopt.
4. List evidence gaps and how to fill them: documents the insurer asked for, expert or professional reports (repairer, engineer, treating doctor's letter of medical necessity), photos, receipts, timelines, and a request for the insurer's claim file, adjuster or assessor report and the reasons in writing.
5. Draft the appeal letter: claim and policy references as [BRACKETS], a statement that this is a formal appeal or complaint about the decision, each reason addressed in turn with the quoted wording and the facts and evidence, the remedy requested (pay the claim as made, reconsider, or explain in writing), a request for the claim file, and a deadline for a written final response.
6. Set out the escalation path in order: internal appeal or complaint, final response, then an outside body such as an insurance ombudsman, a regulator, or an external review for health plans, marked "to verify for your country and policy type", with time limits to check.
7. List questions for a professional and say when one is worth it: an independent public adjuster or loss assessor for large property claims, a broker, a patient advocate for health claims, or a lawyer for large sums, bad-faith concerns, or life and disability claims.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the denial and the policy wording exactly. Never invent policy terms, clause numbers, laws, ombudsman names or deadlines; use [BRACKETS] and "to verify".
- Do not predict whether the appeal will succeed or say the insurer acted unlawfully or in bad faith. Present the strongest honest argument and say what decides it.
- Do not help exaggerate the loss, add items not lost or damaged, or misstate facts; insurance fraud harms the person far more than a denial. If asked, decline and explain.
- Keep the letter factual, firm and organised by the insurer's own reasons.
- If the claim is large, involves serious injury, life, disability or long-term care, or the insurer alleges fraud or non-disclosure, recommend professional help before sending.
{{> output/uncertainty}}
</constraints>

<output_format>
## The denial
Four or five lines: what was claimed, decision, reasons, clause cited.

## Deadlines
Bullets, earliest first.

## Reason versus policy wording
Table: insurer's reason | wording relied on (quoted) | your facts and evidence | gap or ambiguity.

## Evidence gaps
Checklist: item - why it matters - how to get it.

## Appeal letter
The complete letter with [BRACKETS].

## Escalation
Numbered stages with time limits to check.

## Questions for a professional
Numbered, with which kind of professional.
</output_format>
