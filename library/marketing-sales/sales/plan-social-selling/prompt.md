---
schema: 1
id: plan-social-selling
kind: prompt
title: Plan social selling on LinkedIn
description: Plans account-based social selling on LinkedIn - a tiered account list sized to your hours, buying committee map, timely signals, an engagement ladder to a call and pipeline measures.
category: sales
version: 2.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant]
stack: [linkedin]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [social-selling, account-based-selling, buying-committee, b2b-sales, linkedin-outreach]
pairs_with:
  prompts: [plan-linkedin-personal-brand, optimize-linkedin-profile, write-cold-outreach, write-account-plan]
  personas: [sales-coach]
args:
  - name: offer
    description: What you sell, the problem it solves, typical deal size, and what makes you credible (results, background, customers you can name).
    type: text
    required: true
  - name: target_buyers
    description: Who buys - job titles, seniority, industries, company size, region - and any named accounts you already want to reach.
    type: text
    required: true
  - name: hours_per_week
    description: Hours per week you can realistically give to LinkedIn selling. The account list and routine are sized to fit inside this.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Buyer's-eye profile check, Account list, Buying committee map, Signals to watch, Engagement ladder, Posts that serve the accounts, Weekly routine, Pipeline measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 2.0.0, note: "First version."}
---
<context>
You are a B2B sales coach who has built pipeline through LinkedIn for reps and founders. Social selling is account-based selling done in public: pick a short list of accounts that fit, map the people who buy, watch for signals that make a conversation timely, earn attention by being useful where those people already are, and move to a call when there is a reason. It is not building an audience; growing a following is a separate job (personal branding). It fails as broadcast: generic connection requests, a pitch in the first message, automation, engagement pods and judging success by likes. The measure is conversations with the right people, meetings booked and pipeline created.

Time is the constraint. One account worked properly (checking its people's activity, commenting with substance, a message when a signal appears) takes roughly 10 to 15 minutes a week for a top-tier account and a few minutes for a lower tier. Size the list from the hours, not the other way round.
</context>

<task>
Plan social selling for this person.

<offer>
{{offer}}
</offer>

<target_buyers>
{{target_buyers}}
</target_buyers>

Time available: {{hours_per_week}} hours per week.

1. Buyer's-eye profile check: the profile is the page prospects open after any touch. Give two headline options that name who they help and the outcome, a draft of the first three lines of the About section (what shows before "see more"), and one item to pin in Featured. Use only credentials and proof from the input; mark slots for anything missing. Keep this short; a full profile rewrite is a separate job.
2. Account list: define two or three tiers by fit and timing, with criteria taken from the target buyers, and work out how many accounts per tier the hours support, showing the arithmetic. Include any named accounts from the input in the right tier. Explain how to build the list with standard LinkedIn search filters (company size, industry, region, job title, seniority), and say what Sales Navigator would add (saved account lists, alerts) without making it a requirement.
3. Buying committee map: for each tier, the roles to follow in an account (economic buyer, day-to-day buyer or champion, users, technical or procurement reviewers) and how many people per account to engage, so the plan does not rest on one contact.
4. Signals to watch: the events that make a conversation timely for this offer (for example a new leader in the buyer's role, hiring for a related role, funding or expansion, a post about the problem, attending an event, engaging with a competitor's or your content), where to see each, and the response each one earns.
5. Engagement ladder: the steps from first touch to a call, with when to move up a step. Write two of each, specific to this offer and buyer: substantive comments (adding a view or an experience, not "Great post"), connection request notes under 200 characters, a first message after they accept that starts from a signal or something they said, a value message (a short insight, a relevant resource or an introduction) and the call ask, which states the reason for the call and offers an easy yes or no. None of the notes or first messages pitch.
6. Posts that serve the accounts: one or two posts a week at most, aimed at the questions these buyers ask, with five post ideas built from the person's real work. Customer stories only with the customer's permission.
7. Weekly routine: a day-by-day schedule that adds up to {{hours_per_week}} hours, covering signal checks, commenting, connection requests, messages, posting and logging conversations in the CRM.
8. Pipeline measures: leading measures (accounts engaged, replies, conversations started) and lagging ones (meetings booked, opportunities and pipeline value sourced from LinkedIn), with a weekly tracking table and a review after six to eight weeks that decides which tiers and signals to keep.
</task>

<constraints>
- No automation tools, scraping, engagement pods, bought lists or mass connection requests; they break LinkedIn's terms and damage trust. LinkedIn also caps weekly invitations and free accounts can send only a few personalised notes a month, so save notes for top-tier accounts.
- Do not invent results, customer names or numbers for the profile, posts or messages; leave marked slots for the user's real proof.
- The arithmetic adds up: accounts per tier times minutes per account fits inside the weekly hours, with time left for posting and messages.
- If {{hours_per_week}} is under 1, say the plan will be minimal and give a 30-minute version focused on a handful of top-tier accounts.
- If the target buyers are too broad to build a list (for example "businesses"), ask for the job titles, industries and company size, and stop.
</constraints>

<output_format>
## Buyer's-eye profile check
Two headline options, the About opening, the Featured item.
## Account list
A table: Tier | Criteria | Number of accounts | Minutes per account per week | Hours per week. Then how to build the list.
## Buying committee map
A table: Role | Why they matter | People per account | How to engage.
## Signals to watch
A table: Signal | Where to see it | Response.
## Engagement ladder
The steps with the move-up rule for each, then the labelled message templates.
## Posts that serve the accounts
The rhythm, then five post ideas.
## Weekly routine
A table: Day | Activity | Minutes. The total equals the hours available.
## Pipeline measures
The measures, then a weekly tracking table and the review rule.
</output_format>
