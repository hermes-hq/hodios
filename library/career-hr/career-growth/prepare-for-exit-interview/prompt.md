---
schema: 1
id: prepare-for-exit-interview
kind: prompt
title: Prepare for your exit interview
description: Prepares a departing employee for an exit interview with what to share, how to word criticism constructively, what to keep to themselves and how to protect references and final arrangements.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [exit-interview, leaving-a-job, constructive-feedback, references, offboarding]
pairs_with:
  prompts: [write-resignation-letter, write-farewell-message, brief-your-references]
  personas: [career-coach]
args:
  - name: reasons_for_leaving
    description: Why you are leaving, honestly and in full - the things you would say to a friend, including frustrations with people, pay, workload or decisions. You will decide together what to share.
    type: text
    required: true
  - name: relationship_with_manager
    description: How things stand with your manager and the people likely to give you references. good, mixed or poor.
    type: enum
    enum: [good, mixed, poor]
    default: mixed
output_contract:
  format: markdown
  sections: [Your aim, What to share, How to say it, Keep to yourself, Likely questions, Before your last day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An exit interview is a small chance to improve things for the people who stay and a small risk to the leaver's reputation and references. Feedback that lands is specific, about patterns and systems rather than personalities, and comes with a suggestion. Feedback that backfires is a list of grievances, names named in anger, or things said in a meeting that should have been raised in writing through a formal channel. Many people also do not know they can often decline an exit interview, ask for it in writing, or ask who will see their answers.

<reasons_for_leaving>
{{reasons_for_leaving}}
</reasons_for_leaving>
Relationship with manager: {{relationship_with_manager}}
</context>

<task>
1. Your aim: help the person choose what they want from the meeting (help colleagues who stay, leave on good terms, put a concern on record, or just get through it) and say how that shapes what to share. Mention that they can ask who reads the notes and whether answers are anonymised, and that declining or giving written answers may be possible.
2. What to share: pick two or three points from the reasons that are specific, likely to be acted on, and about systems or patterns. Explain why each made the cut.
3. How to say it: rewrite each point from raw to constructive, using observation, effect and suggestion, short enough to say aloud.
4. Keep to yourself: the parts of their reasons that are better left out (personal attacks, gossip, frustrations nobody can act on) and why. If the reasons include harassment, discrimination, safety problems or wrongdoing, say these deserve a written report to HR or a formal channel rather than a remark in an exit interview, and that advice from a union or employment adviser may help.
5. Likely questions: six common exit-interview questions ("Why are you leaving?", "What could we have done to keep you?", "How was your manager?", "Would you come back?", "Where are you going?", "Anything else?") with a suggested answer for each, adjusted for a {{relationship_with_manager}} relationship with the manager.
6. Before your last day: final pay, unused leave, benefits and pension transfers to confirm in writing; references (who, and asking for a written one or a LinkedIn recommendation while goodwill is fresh); returning equipment; reading any exit paperwork or agreement carefully before signing and getting advice if it waives rights or includes confidentiality or non-disparagement terms.
7. Before answering, check that nothing in "How to say it" names an individual negatively or could be quoted back unfairly.
</task>

<constraints>
- Be honest about trade-offs. Do not tell them to say nothing, and do not encourage a parting shot.
- Keep each spoken answer short; exit interviews reward brevity.
- With a poor manager relationship, focus on protecting references: suggest other referees and how to frame the manager question neutrally.
- Do not give legal advice about exit agreements or settlement terms; say when to get it.
- Use only what the person told you. Do not invent examples.
</constraints>

<output_format>
## Your aim
Two or three sentences.
## What to share
Numbered points with why each made the cut.
## How to say it
Table: What you feel | What to say | Why it lands.
## Keep to yourself
Bullets, plus the formal-channel note if it applies.
## Likely questions
Table: Question | Your answer.
## Before your last day
Checklist.
</output_format>
