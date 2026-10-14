---
schema: 1
id: prepare-for-trial-shift
kind: prompt
title: Prepare for a trial shift
description: Prepares a candidate for a trial shift or working interview - what managers watch for, how to show initiative safely, questions to ask, and what to check about pay and length beforehand.
category: interview-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker, student]
requires: [none]
inputs: [notes, job-posting]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
subject: [hospitality, retail]
tags: [working-interview, trial-day, frontline-jobs, unpaid-work]
pairs_with:
  prompts: [practise-retail-hospitality-interview, manage-interview-anxiety, debrief-interview]
args:
  - name: job
    description: The job and workplace, for example "line cook at a busy pub kitchen", "barista", "salon assistant", "warehouse picker", and what you were told about the trial (date, hours, what to bring, whether it is paid).
    type: text
    required: true
  - name: experience
    description: Your relevant experience and anything you are nervous about.
    type: text
  - name: country
    description: Country and region, because rules on paying for trial work differ.
    type: string
output_contract:
  format: markdown
  sections: [What they are watching for, Check before the day, The shift hour by hour, Questions to ask, After the shift]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach people through trial shifts, also called working interviews, trial days or stages in kitchens. Managers rarely expect a newcomer to know the systems. They watch for things that predict a good hire: arriving early and ready, listening to instructions and asking good questions once rather than repeatedly, keeping busy without being told ("Is there anything I can prep or clean?"), following hygiene and safety rules, working at a reasonable pace, being friendly with the team and customers, taking feedback without arguing, and honesty about what you do not know. Common ways to fail: standing idle, using a phone, bluffing about a skill and getting it wrong, ignoring safety, or acting differently to the team than to the manager. A trial shift should be short and genuinely about assessing the candidate. In many countries, work done for an employer must be paid, and long or repeated unpaid "trials" are a known way of getting free labour; the rules differ by country and should be checked with the official labour authority.

<job>
{{job}}
</job>
{{#experience}}

<experience>
{{experience}}
</experience>
{{/experience}}
{{#country}}

Country: {{country}}
{{/country}}
</context>

<task>
1. List what the manager is most likely watching for in this kind of job, in order of importance.
2. Give a checklist to confirm before the day: start and finish time, who to ask for, what to wear and bring (non-slip shoes, knife roll, ID, right-to-work documents if asked), whether it is paid and how, food and breaks, and what tasks to expect. Provide a short, polite message to ask about any of these, including pay.
3. Walk through the shift: arriving, the first ten minutes, how to take instructions, what to do when idle, how to handle a mistake, how to talk to customers and colleagues, and how to finish (ask for feedback, thank the team).
4. Suggest questions to ask during or at the end of the shift that show interest without slowing the team.
5. Explain what to do after: a short thank-you message, how long to wait for a decision, and how to follow up.
6. Explain the pay question in general terms: a short assessment may be treated differently from real productive work in some places, an extended or repeated unpaid trial is a warning sign, and the person should check the rules for their country with the official labour authority or a free advice service. Mark any rule you state as "check for your country".
</task>

<constraints>
- Do not state a specific legal rule, minimum wage or maximum trial length as fact; give general principles and point to the official source for the country.
- Never suggest bluffing about a skill; recommend saying "I haven't used this one, can you show me once?".
- Safety and hygiene instructions from the workplace come first; do not suggest shortcuts.
- If the "trial" sounds like several unpaid days or weeks, say plainly that this is a warning sign and suggest how to ask about it.
</constraints>

<output_format>
## What they are watching for
## Check before the day
Checklist, then the message to send.
## The shift hour by hour
## Questions to ask
## After the shift
</output_format>
