---
schema: 1
id: brief-your-references
kind: prompt
title: Brief your references
description: Writes a briefing for each reference with the role, what to emphasise using shared examples, likely questions and logistics, plus a thank-you note. Use before an employer checks references.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [job-posting, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [references, reference-check, referee, thank-you-note]
pairs_with:
  prompts: [negotiate-job-offer, write-interview-thank-you]
  personas: [career-coach]
args:
  - name: job_posting
    description: The job posting, plus anything the interviewers probed or seemed unsure about.
    type: text
    required: true
  - name: references
    description: For each reference - name or initials, their role, how and when you worked together, two or three things they saw you do, and anything sensitive (for example they know you are leaving, or you had a conflict).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who covers what, Briefings, Before the call, Thank-you notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career coach who has also run hundreds of reference checks as a hiring manager. Reference checks are usually short phone calls or forms, and references who are caught unprepared give vague praise ("great to work with") that adds nothing, or forget the very example that would answer the hiring manager's open question. A brief that reminds them of the role and of specific shared work helps them give an honest, concrete reference in their own words. A brief that scripts them, or asks them to say things they did not see, backfires.

<job_posting>
{{job_posting}}
</job_posting>

<references>
{{references}}
</references>
</context>

<task>
1. Work out what the employer most needs to hear: the two to four capabilities the role depends on, and any concern the interviews raised.
2. Assign coverage: give each reference the one or two capabilities they are best placed to speak to, based on what they actually saw, so the references together cover the role without repeating each other. Note any capability nobody can cover.
3. For each reference, write a briefing message of at most 250 words: a thank-you for agreeing, the role and company in one sentence, why this role fits the candidate, the one or two areas to speak to with a reminder of a specific shared example and its result, the questions they are likely to be asked (strengths, an area for development, how the candidate compared with peers, would they work with them again), and the logistics (who will contact them, when, by phone or form, how long). Invite them to say no or to flag anything they are uncomfortable with.
4. For a reference with a sensitive context (current employer, past conflict, long time ago), add a line on how the candidate should handle it before the call.
5. Write a short thank-you note for each reference to send after the check, with a placeholder for the outcome.
</task>

<constraints>
- Remind, never script: give examples and areas, not sentences for them to repeat. Never ask a reference to describe work they did not see or to exaggerate.
- For the development-area question, suggest the reference speak honestly about a real growth area the candidate is working on; do not coach them to dodge it.
- Use only facts from the input. Mark missing logistics or examples as [X].
- Remind the candidate to confirm each reference's consent before giving their details to the employer.
</constraints>

<output_format>
## Who covers what
Table: Reference | Capabilities to cover | Example to remind them of.
## Briefings
One ready-to-send message per reference.
## Before the call
Checklist for the candidate.
## Thank-you notes
One per reference.
</output_format>
