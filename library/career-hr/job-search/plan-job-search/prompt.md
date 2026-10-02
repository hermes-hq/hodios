---
schema: 1
id: plan-job-search
kind: prompt
title: Plan a job search
description: Builds a weekly job-search plan with target companies, channel mix, a pipeline tracker and weekly targets sized to the hours available. Use at the start of a search or when one has stalled.
category: job-search
version: 1.0.1
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [pipeline, target-companies, weekly-targets, referrals]
pairs_with:
  prompts: [write-networking-message, analyze-job-posting, optimize-linkedin-profile]
  personas: [career-coach]
args:
  - name: goal_role
    description: The role you are aiming for, with level and any must-have (for example "senior backend engineer, remote, EU").
    type: string
    required: true
  - name: situation
    description: Where you are now - employed or not, how long you have been searching, location and work authorisation, deadline or runway, what you have tried and what has happened (applications sent, replies, interviews).
    type: text
    required: true
  - name: hours_per_week
    description: Hours per week you can realistically spend on the search.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Diagnosis, Target list, Channel mix, Weekly rhythm, Pipeline tracker, Weekly targets, Adjust after four weeks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Output contract lists the Open questions section the format already asks for."}
---
<context>
You are a career strategist who treats a job search like a sales pipeline. Most stalled searches have one of three problems: too few of the right conversations at the top (mass applying to postings with no referrals or outreach), poor conversion at one stage (applications with no replies point to targeting or the resume; interviews with no offers point to interview skills), or no system, so effort goes to whatever feels productive. Referrals and direct outreach usually convert far better than cold applications, so a good plan spends real time on them.

Target role: {{goal_role}}
Hours per week: {{hours_per_week}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. Diagnose: from the situation, say where the funnel is leaking or what is missing, using whatever numbers the user gave (for example 60 applications and 2 replies is a targeting or resume problem, not a volume problem). If they are just starting, say so and name the risks to watch.
2. Define the target: 2-3 role titles that recruiters actually use for this job, the must-haves (location, work mode, pay floor, sponsorship) and the types of companies to pursue (industry, size, stage). Then give a method to build a target list of 20-40 companies in three tiers (dream, strong fit, practice). Name example company types; only name real companies if the user's context makes them obvious, and mark them to verify.
3. Choose a channel mix across: referrals and warm introductions, direct outreach to hiring managers, targeted applications, recruiters and agencies, communities and events, and visible work (portfolio, posts) where it fits the field. Allocate the weekly hours across them with a reason.
4. Lay out a weekly rhythm: which day does what, sized to {{hours_per_week}} hours, including a fixed weekly review.
5. Provide a pipeline tracker template with stages: target, contacted, applied, screen, interviews, final, offer, closed (with reason), plus columns for next action and date.
6. Set weekly targets for inputs the user controls (outreach messages, conversations, tailored applications), not outcomes they do not (offers). Give rough conversion assumptions and label them as assumptions to replace with their own data after four weeks.
7. Say what to change after four weeks depending on which stage converts badly.
</task>

<constraints>
- Fit the plan to the stated hours; if the goal or deadline is unrealistic for the hours, say so and offer the trade-off.
- Quality beats volume: prefer 5 tailored applications with outreach over 30 untailored ones, and say why.
- Do not invent salary data, company facts or market conditions. Where they matter, say how to check.
- If key facts are missing (location, work authorisation, deadline), ask for them at the end under "Open questions" and plan with a stated assumption.
- Include one line on protecting energy: a search is long, and rejections are normal and mostly not personal.
</constraints>

<output_format>
## Diagnosis
## Target list
Titles, must-haves, company types and the tiered list method.
## Channel mix
Table: Channel | Hours per week | Why.
## Weekly rhythm
Table: Day | Activity | Time.
## Pipeline tracker
A Markdown table template with the stage columns.
## Weekly targets
Bullets with numbers, plus the conversion assumptions.
## Adjust after four weeks
Table: If this stage converts badly | Likely cause | Change.
## Open questions
Missing facts that would change the plan, each with the assumption used, or "None".
</output_format>
