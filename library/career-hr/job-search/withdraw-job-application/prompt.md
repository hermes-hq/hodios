---
schema: 1
id: withdraw-job-application
kind: prompt
title: Withdraw a job application
description: Writes a gracious withdrawal from a hiring process at any stage before an offer, with how much reason to give, who to tell and a phone version, so the door stays open.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [withdraw-candidacy, hiring-process, professional-relationships, candidate-etiquette]
pairs_with:
  prompts: [decline-job-offer, reply-to-recruiter, follow-up-on-job-application]
args:
  - name: process
    description: The company and role, the stage you have reached (applied, screen, interviews, final round, references), and who you have dealt with.
    type: text
    required: true
  - name: reason
    description: Optional - why you are withdrawing (accepted another offer, staying in your current job, role or pay not right, personal circumstances, a bad experience) and how much you want to share.
    type: text
output_contract:
  format: markdown
  sections: [Check first, Email, Phone version, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who appreciates candidates who withdraw cleanly. A quick, clear withdrawal frees interview slots and lets the team move to other candidates; going silent ("ghosting") is remembered, and recruiters and hiring managers move between companies. The later the stage, the more personal the withdrawal should be: an email is fine after an application or first screen, while after a final round or when references are being taken, a short call or a personal note to the hiring manager as well as the recruiter is better. The reason should be true, brief and neutral; it does not need to be detailed, and it should not open a debate unless the candidate wants one (for example if pay is the only issue, it may be worth asking before withdrawing).

<process>
{{process}}
</process>
{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}
</context>

<task>
1. Check first: if the reason suggests the candidate would stay in the process with a change (pay, remote work, level, timing), say so at the top and suggest asking before withdrawing. If the candidate already has an offer from this company, say this is an offer decline and point to that instead. Then continue with the withdrawal as asked.
2. Email: subject line and a message of 60 to 120 words to the main contact: thanks for their time, a clear statement of withdrawal in the first two sentences, a one-line neutral reason if the candidate wants to give one, a specific positive note if earned, and an open door. Scale warmth and detail to the stage.
3. Phone version: three to five lines for a late-stage withdrawal, leading with the decision, followed by the email as confirmation.
4. Notes: who else to tell (hiring manager, agency recruiter, referrer inside the company, references who were contacted), and a reminder to cancel scheduled interviews and any pending tasks.
</task>

<constraints>
- No criticism of the company or interviewers in the message, even if the reason is a bad experience; if the user wants to give feedback about the process, offer to write it as a separate, factual note.
- Use only the reason given; if none is given, write a version without one. Do not invent a competing offer.
- No over-apologising; one "sorry for any inconvenience" at most for late stages.
- Use [Name] placeholders for unknown names.
</constraints>

<output_format>
## Check first
Only if relevant; otherwise "Nothing to check."
## Email
Subject and body, ready to send.
## Phone version
Only for late stages; otherwise "Not needed at this stage."
## Notes
</output_format>
