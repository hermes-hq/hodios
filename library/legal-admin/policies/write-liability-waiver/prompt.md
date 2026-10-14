---
schema: 1
id: write-liability-waiver
kind: prompt
title: Write a liability waiver
description: Drafts a participation agreement and risk acknowledgement for an activity provider, with honest risk information, health questions and the limits on what a waiver can do.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, manager]
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
depth: specific
tags: [liability-waiver, risk-acknowledgement, participation-agreement, activity-providers, informed-participation]
pairs_with:
  prompts: [write-booking-terms, write-membership-terms, write-workplace-risk-assessment]
args:
  - name: activity
    description: The activity, who takes part (adults, children, beginners), the realistic risks and past incidents, the safety measures in place (instructors, equipment checks, briefings), insurance, and how people sign up (online, on paper at the door).
    type: text
    required: true
  - name: jurisdiction
    description: Country and state, because waivers are enforced very differently and some places do not enforce them against consumers at all.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What a waiver can and cannot do here, Participation agreement, Health and consent questions, Process checklist, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Activity providers often believe a signed waiver protects them from any claim. The reality varies sharply by place. Many US states enforce clear, conspicuous releases of ordinary negligence for adults in recreational activities but not for gross negligence, and some do not enforce them at all or not against minors. In the UK and much of the EU, consumer law makes terms that exclude liability for death or personal injury caused by negligence unenforceable, so the document's value lies in informing participants of inherent risks, recording that they accepted those risks, collecting health information and agreeing to follow safety rules. Courts everywhere look at whether the risks were explained in plain language, the document was signed before the activity with time to read it, and the operator actually ran a safe activity. A waiver does not replace insurance, risk assessments, trained staff or incident records.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Activity:
<activity>
{{activity}}
</activity>

1. What a waiver can and cannot do here: a short, honest explanation for {{jurisdiction}} (marked to confirm): whether releases of negligence are commonly enforced, the limits for minors and gross negligence, and what the document mainly achieves.
2. Participation agreement in plain language:
   - Who the provider is [BRACKETS] and the activity.
   - Inherent risks, specific to this activity, without minimising them.
   - The provider's commitments (trained staff, equipment checks, briefings).
   - Participant responsibilities: follow instructions, disclose health issues, use equipment correctly, stop if unwell, no alcohol or drugs.
   - Acceptance of inherent risks, and a release or limitation clause worded to what is lawful in the jurisdiction (for the UK and EU, no exclusion of liability for death or injury caused by negligence).
   - Medical treatment consent in an emergency.
   - Photos (optional, separate tick).
   - For minors: parent or guardian signature and whether a release can bind a child, marked to confirm.
   - Data use of health information and how long it is kept.
3. Health and consent questions: short screening questions relevant to the activity and when an answer means "check with staff" or "get medical clearance".
4. Process checklist: send before the day, allow time to read, verbal safety briefing, storage, renewal, incident recording.
5. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never tell the user that a waiver will protect them from all claims; state the limits for the jurisdiction honestly.
- Do not draft clauses excluding liability for death or personal injury caused by negligence where that is unenforceable or unlawful; flag where the law is uncertain.
- Describe risks plainly; never hide or downplay them to get signatures.
- Do not state enforceability rules as settled fact unless supplied; mark them to confirm with a local lawyer and the insurer.
{{> output/uncertainty}}
</constraints>

<output_format>
## What a waiver can and cannot do here
Short paragraph, marked to confirm.

## Participation agreement
The full document with headings.

## Health and consent questions
Numbered questions with action notes.

## Process checklist
Checklist.

## Points to confirm
Numbered.
</output_format>
