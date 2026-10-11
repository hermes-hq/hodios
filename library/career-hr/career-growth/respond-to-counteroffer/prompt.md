---
schema: 1
id: respond-to-counteroffer
kind: prompt
title: Respond to a counteroffer
description: Helps an employee who has resigned weigh their current employer's counteroffer against the new job, with the risks to check, a clear decision and the reply to send either way.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text, notes]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [counteroffer, resignation, job-offer, retention]
pairs_with:
  prompts: [write-resignation-letter, negotiate-job-offer, decide-whether-to-quit, plan-notice-period]
  personas: [career-coach]
args:
  - name: counteroffer
    description: What your current employer has offered to keep you (pay, title, role, timing), whether it is in writing, and who made it.
    type: text
    required: true
  - name: new_offer
    description: The offer you accepted or are about to accept - pay, role, start date, and whether you have signed.
    type: text
    required: true
  - name: reasons_for_leaving
    description: Why you started looking in the first place, in your own words.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Did the reasons go away, Side by side, Risks to check, Decision, Reply to your employer, Reply to the new employer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide what to do when their employer tries to keep them after they resign. Counteroffers are flattering and arrive under time pressure. The pattern recruiters and managers know: when people left for reasons other than pay (a bad manager, no growth, the work itself), a pay rise rarely fixes those reasons, and in recruiters' experience many who accept are looking again within a year or two. The employer now knows they were ready to leave, which can affect trust, future raises and who is first in line in a restructure. But some counteroffers are genuine fixes: a real promotion with a new scope, a manager change, a role that answers the original complaint, put in writing. The decision depends on whether the reasons for leaving are actually solved, and on the cost of reneging on an accepted offer.

<counteroffer>
{{counteroffer}}
</counteroffer>
<new_offer>
{{new_offer}}
</new_offer>
<reasons_for_leaving>
{{reasons_for_leaving}}
</reasons_for_leaving>
</context>

<task>
1. Did the reasons go away: list each reason for leaving and say whether the counteroffer addresses it fully, partly or not at all, with the evidence. Be explicit when the counteroffer only addresses pay.
2. Side by side: compare the two options on total pay (show the arithmetic), role and growth, manager and team, stability, and how they will feel in a year, using only the figures given.
3. Risks to check: questions to put to the current employer before believing the offer (Is it in writing? When does it take effect? Why was this not possible before? Will the role or manager change, and by when? How is the raise funded, and does it affect the next review?) and the risks of reneging on the new offer (relationship with that company and recruiter, any signed contract terms, small industries). Tell them to read any signed contract for notice or withdrawal terms.
4. Decision: give a clear recommendation with the reasoning, or name the one question whose answer decides it. Do not hedge into "it depends" without saying on what.
5. Reply to your employer: a short, gracious message for the option you recommend (declining the counteroffer while protecting the relationship, or accepting with the terms confirmed in writing).
6. Reply to the new employer: if they stay, a prompt, honest and apologetic withdrawal; if they go, a short confirmation that keeps the start date.
</task>

<constraints>
- Never suggest using the counteroffer to bluff the new employer, or the new offer to bluff the current one, with figures that are not real. If they want to go back to the new employer with a real counteroffer, explain how to do it honestly, once.
- Do not say all counteroffers fail; base the view on their stated reasons.
- Do the pay arithmetic exactly with the figures given; mark missing figures as [X].
- If they have signed a contract with the new employer, tell them to check its terms before reneging, without stating what it legally means.
</constraints>

<output_format>
## Did the reasons go away
Table: Reason for leaving | Addressed? | Evidence.
## Side by side
Table: Factor | Stay with counteroffer | Leave for new job.
## Risks to check
## Decision
## Reply to your employer
## Reply to the new employer
</output_format>
