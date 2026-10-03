---
schema: 1
id: request-workplace-accommodation
kind: prompt
title: Request a workplace accommodation
description: Writes a request for a workplace adjustment or accommodation for a disability or health condition, stating needs and options without oversharing. Use before asking your employer for changes.
category: career-growth
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [message, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reasonable-adjustments, disability-at-work, health-disclosure, accommodation-request]
pairs_with:
  prompts: [propose-flexible-work, handle-difficult-manager, plan-return-to-work]
  personas: [career-coach]
args:
  - name: condition_summary
    description: As much or as little about your condition as you choose to share. Functional effects (what is harder at work and when) matter more than a diagnosis. Leave empty to keep the condition private.
    type: text
  - name: needed_adjustments
    description: What you need or think would help (equipment, schedule, location, duties, communication, breaks, leave), what you have already tried, and what happens at work without it.
    type: text
    required: true
  - name: country
    description: The country (and state or region) where you work, because accommodation duties and processes differ by jurisdiction.
    type: string
    required: true
  - name: employer_size
    description: Roughly how many people your employer employs, and whether there is an HR team or occupational health service. Some legal duties depend on employer size.
    type: string
output_contract:
  format: markdown
  sections: [Before you send, Your request, Options to offer, If they ask for more, Records and follow-up, Where to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees ask for workplace adjustments (called reasonable accommodations in the US and Canada and reasonable adjustments in the UK) for a disability or health condition. Requests work best when they describe the functional limitation and the specific change that addresses it, connect the change to doing the job well, offer more than one workable option, and share only the medical detail the employer genuinely needs. Many people overshare (full diagnosis, history, medication) because they fear not being believed, and that information can then follow them. Others undershare so much that the employer cannot act. The aim is a clear, calm, written request that starts a cooperative conversation and leaves a record.

<needed_adjustments>
{{needed_adjustments}}
</needed_adjustments>
{{#condition_summary}}
<condition_summary>
{{condition_summary}}
</condition_summary>
{{/condition_summary}}
Country: {{country}}
{{#employer_size}}Employer size: {{employer_size}}{{/employer_size}}
</context>

<task>
1. Before you send: help the person decide three things. Who to send it to (manager, HR or occupational health, and the trade-offs of each). What to disclose: translate the condition into functional effects ("I find it hard to concentrate in open-plan noise for long periods") and say whether naming the diagnosis is likely to be needed; it often is not at the first step. Whether medical evidence may be requested, and how to ask their doctor for a short letter that confirms the need and the adjustment without full records.
2. Name the framework to check for {{country}}: the law or official scheme that usually governs adjustments there (for example the ADA and the EEOC in the US, the Equality Act 2010, Access to Work and Acas in the UK, human-rights codes in Canada, national equal-treatment laws in EU countries), whether employer size may matter, and the official body to confirm with. Label all of this as something to verify, not settled law.
3. Your request: write a short email or letter (under 250 words) that states the purpose in the first line, describes the functional need without unnecessary detail, lists the requested adjustments specifically, links them to doing the job, offers to discuss alternatives, asks for a written reply or a meeting within a reasonable time, and asks that health information be kept confidential and shared only with those who need it.
4. Options to offer: for each needed adjustment, what it solves, likely cost or effort for the employer, and one or two alternatives the person could accept if the first is refused. Note any that may be funded by a public scheme in their country, to check.
5. If they ask for more: replies to "we need a diagnosis", "we can't do that for one person", "let's see how it goes", "it's not fair on the team", "we'll refer you to occupational health", and a refusal with no reason.
6. Records and follow-up: what to keep (dates, messages, meeting notes sent back in writing), when to follow up if there is no reply, and how to review whether the adjustment is working after a trial.
7. Where to get help: which people or services to involve if the request is ignored, refused without discussion, or followed by worse treatment (HR, union, disability advocacy organisations, the official equality or labour body, an employment lawyer).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never encourage exaggerating, inventing or misstating a condition or symptom. If the needs described seem unrelated to a health condition, help with a flexible-work request instead and say why.
- Do not diagnose or comment on the condition itself, and do not suggest treatments.
- Keep disclosure to the minimum needed. If the person included sensitive detail (diagnosis names, medication, history), say which parts you left out of the request and why.
- Do not state legal entitlements, thresholds or deadlines as fact. Say what to check and with which official body.
- Use only the facts given; mark missing details as [X] with a question.
</constraints>

<output_format>
Start with two sentences: what this request does, and that the legal position should be checked locally.
## Before you send
## Your request
The letter or email, ready to edit.
## Options to offer
Table: Adjustment | What it solves | Likely effort | Alternatives.
## If they ask for more
Table: They say | You say.
## Records and follow-up
## Where to get help
</output_format>
