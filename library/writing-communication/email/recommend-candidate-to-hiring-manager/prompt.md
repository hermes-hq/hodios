---
schema: 1
id: recommend-candidate-to-hiring-manager
kind: prompt
title: Recommend a candidate to a hiring manager
description: Writes an internal referral email to a hiring manager about someone you know - how you know them, honest evidence of their work, how they fit the role, and what you cannot vouch for.
category: email
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, software-engineer, manager, recruiter]
requires: [none]
inputs: [text, job-posting, resume]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [referral, candidate-recommendation, internal-referral, hiring-manager]
pairs_with:
  prompts: [write-reference-letter, design-employee-referral-scheme, write-introduction-email]
args:
  - name: candidate
    description: The candidate's name, current role, and how you know them (worked together, managed them, studied together, friend, family).
    type: string
    required: true
  - name: evidence
    description: What you have seen them do - projects, behaviours, results - and any honest reservations.
    type: text
    required: true
  - name: role
    description: The role you are referring them for, with the key requirements or the job ad pasted.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Referrals carry weight because the referrer is putting their own judgment on the line, so the most useful referral is honest and calibrated. Hiring managers discount generic enthusiasm ("she's brilliant, you have to meet her") and value three things: exactly how the referrer knows the person and how recently (a manager of three years counts for more than a friend), specific first-hand evidence tied to the role's requirements, and a clear statement of what the referrer has not seen. A referral that oversells sets the candidate up to disappoint in interviews and costs the referrer credibility next time. Personal relationships (friends, family, partners) should be disclosed; many organisations have conflict-of-interest rules, and the referrer usually should not take part in assessing the candidate. A formal referral form or system often exists alongside the email and may be what triggers any referral bonus.
</context>

<task>
Write a referral email to the hiring manager.

Candidate: {{candidate}}

<evidence>
{{evidence}}
</evidence>

<role>
{{role}}
</role>

1. Fit check: map the role's key requirements to the evidence. Mark each as seen first-hand, heard second-hand, or not seen. If the evidence covers few requirements, say so plainly and suggest a lighter "worth a conversation" framing.
2. Write the email:
   - Subject: "Referral for [role]: [candidate name]".
   - First line: who they are and the role, and the strength of the recommendation in one honest phrase ("I'd hire her again without hesitation" only if the input supports it).
   - How you know them: relationship, context, how long, how recently. Disclose personal relationships.
   - Evidence: two or three specific examples tied to the role's requirements.
   - What you have not seen or cannot judge, in one line.
   - Logistics: CV attached or submitted via the referral system, their availability or notice if known, and that they know you are referring them.
3. Under Notes, remind the user to get the candidate's consent and up-to-date CV, to submit through the formal referral system if there is one, and to step out of assessing the candidate if there is a personal relationship or the organisation's rules require it.
</task>

<constraints>
- Under about 200 words in the body.
- Only first-hand facts as evidence; label second-hand information as such. Never invent achievements, skills or employers.
- No superlatives beyond what the evidence supports.
- Do not include protected or private characteristics (age, family status, health, ethnicity, religion) even as positives.
</constraints>

<output_format>
## Fit check
Table or bullets: requirement, evidence, seen first-hand / second-hand / not seen.
## Email
Subject line, then the body.
## Notes
Bullets.
</output_format>
