---
schema: 1
id: plan-job-search-while-employed
kind: prompt
title: Plan a job search while employed
description: Plans a confidential job search while still employed, covering profile visibility, references, interview scheduling, a time budget and what to say if your employer finds out.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [confidential-search, discretion, interview-scheduling, references, search-time-budget]
pairs_with:
  prompts: [plan-job-search, reply-to-recruiter, brief-your-references]
  personas: [career-coach]
args:
  - name: situation
    description: Your current job, how flexible your hours are (office, hybrid, remote, shifts), how small or connected your industry is, notice period, and why you are looking.
    type: text
    required: true
  - name: target
    description: What you are looking for next and how soon you want to move.
    type: text
    required: true
  - name: hours_per_week
    description: Hours per week you can give the search outside work.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Risk check, Keep it private, Channels that stay quiet, Interview logistics, References, Time budget, If your employer finds out, Rules to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career coach who has helped many people move jobs without their current employer knowing until they resigned. Searching while employed is a strong position (no gap, no urgency, better negotiating leverage), but it leaks in predictable ways: a LinkedIn profile suddenly updated or an "open to work" banner, a resume on a public job board that the company's own recruiters search, using a work laptop, email or phone, telling a colleague, a pattern of "dentist appointments", a reference called too early, and recruiters in small industries who talk. Most people also underestimate the time: a final round can need half a day, and a take-home task can need a weekend.

<situation>
{{situation}}
</situation>
<target>
{{target}}
</target>
Hours per week for the search: {{hours_per_week}}
</context>

<task>
1. Risk check: from the situation, rate how exposed the search is (industry size, overlap of recruiters and clients, how visible absences are) and name the two or three most likely ways it could leak for this person.
2. Keep it private: concrete settings and habits. LinkedIn: update the profile gradually rather than all at once, turn off notifications of profile changes to the network, use the recruiter-only open-to-work setting rather than the public banner, and know that no setting fully hides you from recruiters at your own company. Use only personal devices, email, phone and calendar; never apply or interview from the work network; avoid public resume databases if the employer recruits there.
3. Channels that stay quiet: which channels suit a discreet search (trusted contacts outside the company, targeted applications, a few chosen agency recruiters with clear instructions on where your CV may go, direct outreach to hiring managers) and which are noisy (mass applications, broad announcements).
4. Interview logistics: how to fit screens and interviews around work without lying more than necessary. Early or late slots, lunch-hour video calls from somewhere private, grouping interviews into one day off, using leave for final rounds, and asking employers for flexibility openly ("I am currently employed, so early morning works best"). Give honest, minimal wording for asking for time off ("I have a personal appointment") rather than invented stories.
5. References: tell prospective employers that current-employer references can only be contacted after an offer, offer former managers or trusted ex-colleagues instead, and how to phrase that.
6. Time budget: a weekly plan sized to {{hours_per_week}} hours, plus a warning about take-home tasks and multi-round processes, and how to say no to processes that need too much time.
7. If your employer finds out: what to say if asked directly (do not lie outright; say you are always open to hearing about opportunities, or that you want to discuss what would make you stay if that is true), whether to raise it first, and the risks of a counteroffer. Note that employment protections differ by country and contract, so do not assume either job security or the lack of it.
8. Rules to keep: a short checklist to follow for the whole search, including staying fully committed to current work so performance does not become the leak.
</task>

<constraints>
- Do not advise lying to the employer, falsifying absences, or using employer time, devices or confidential information for the search. Minimal disclosure is fine; fabrication is not.
- Do not invent LinkedIn or job-board features beyond those described in general terms; tell the user to check current settings, since platforms change them.
- Do not state employment law. If the situation mentions a contract clause (non-compete, notice, moonlighting, garden leave), say to read the contract and get advice if it matters.
- Fit everything to the stated hours and flexibility.
</constraints>

<output_format>
## Risk check
## Keep it private
Checklist.
## Channels that stay quiet
Table: Channel | Discreet? | How to use it.
## Interview logistics
Includes two or three ready-to-use lines for scheduling and time off.
## References
## Time budget
Table: Day | Activity | Time.
## If your employer finds out
Short scripts for being asked directly.
## Rules to keep
</output_format>
