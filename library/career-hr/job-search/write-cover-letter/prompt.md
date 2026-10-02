---
schema: 1
id: write-cover-letter
kind: prompt
title: Write a cover letter
description: Writes a tailored cover letter under 350 words that connects two or three specific achievements to the role's most important needs. Use for any job application that asks for one.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [job-application, tailoring, achievements]
pairs_with:
  prompts: [analyze-job-posting, tailor-resume-to-job]
  workflows: [job-application-track]
args:
  - name: job_posting
    description: The full job posting text, plus anything you know about the team or company that the letter could reference.
    type: text
    required: true
  - name: resume
    description: Your resume, or notes on the achievements you want to draw from.
    type: text
    required: true
  - name: tone
    description: Register of the letter. formal suits law, finance and public sector; warm suits mission-driven and small teams; direct suits most tech and business roles.
    type: enum
    enum: [formal, warm, direct]
    default: direct
output_contract:
  format: markdown
  sections: [Letter, Why these choices, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring manager who has read thousands of cover letters and remembers almost none of them. The forgettable ones restate the resume, open with "I am writing to apply for", and claim traits ("passionate", "detail-oriented") without proof. The ones that get a candidate an interview answer one question fast: "Can this person solve the problem we are hiring for?" They do it with two or three specific achievements chosen for this role, in the candidate's own voice.

<job_posting>
{{job_posting}}
</job_posting>

<resume>
{{resume}}
</resume>

Tone: {{tone}}
</context>

<task>
1. Identify the two or three needs that matter most to this hiring manager: the problems in the responsibilities, not the generic requirements.
2. For each need, pick the single strongest piece of evidence from the resume: an achievement with action, scope and result. Prefer evidence that is close to the role's context (same kind of user, scale, industry or problem).
3. Write the letter:
   - Opening (2-3 sentences): name the role, then lead with the strongest match or a specific, true reason for wanting this role at this company. No "I am writing to apply".
   - Body (one short paragraph per need, or a tight paragraph plus 2-3 bullets): need, evidence, result, and what it means for them.
   - If there is an obvious question (career change, gap, relocation, overqualification), answer it in one confident sentence. Do not apologise.
   - Close (1-2 sentences): what you would bring in the first months and a plain call to talk.
4. Match the tone: formal (complete sentences, no contractions, restrained), warm (personal motivation, connection to the mission), direct (short sentences, lead with results).
</task>

<constraints>
- Under 350 words for the letter body. Shorter is better if it is complete.
- Use only facts in the resume. Never invent metrics, employers, tools or motivations. If a strong letter needs a fact you do not have (the hiring manager's name, why this company, a number), write a [placeholder] and list it under "Check before sending".
- Do not repeat the resume line by line; select and connect.
- Mirror two or three of the posting's key terms naturally, without keyword stuffing.
- No clichés: "passionate", "team player", "hit the ground running", "perfect fit", "I believe I would be a great asset".
- Address "Dear Hiring Manager" unless a name is given.
</constraints>

<output_format>
## Letter
The full letter, ready to paste.
## Why these choices
Three bullets at most: which needs you targeted and which evidence you used for each.
## Check before sending
Bullets: every [placeholder] to fill and any claim the candidate should verify.
</output_format>
