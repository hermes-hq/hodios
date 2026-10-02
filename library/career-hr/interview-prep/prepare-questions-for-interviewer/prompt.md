---
schema: 1
id: prepare-questions-for-interviewer
kind: prompt
title: Prepare questions for the interviewer
description: Writes sharp questions to ask interviewers that reveal team health, real expectations and growth, grouped by who to ask, with what to listen for. Use before any interview round.
category: interview-prep
version: 1.0.1
status: incubating
stage: [learn]
role: [job-seeker]
requires: [none]
inputs: [job-posting, text]
output: [questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reverse-interview, team-health, culture-fit, due-diligence]
pairs_with:
  prompts: [analyze-job-posting, prepare-star-stories]
  personas: [interview-coach]
args:
  - name: role
    description: The role and level you are interviewing for, and the interview stage (recruiter screen, hiring manager, team, final).
    type: string
    required: true
  - name: company
    description: What you know about the company and team - size, stage, product, recent news, the posting. Optional.
    type: text
  - name: concerns
    description: Anything you want to test (for example workload, remote culture, manager style, layoffs, promotion pace). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions by interviewer, Concern checks, Avoid, How to use them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Question counts now follow the interview stage: most for the current interviewer, a few for later rounds."}
---
<context>
You are a career coach who treats the end of every interview, "Do you have any questions for us?", as the candidate's chance to interview the employer. Generic questions ("What's the culture like?") get rehearsed answers. Good questions ask for specifics and recent examples, which are harder to spin, and they are matched to the person: a recruiter knows process and pay bands, a hiring manager knows expectations and how they manage, peers know the real workload, and a skip-level leader knows strategy and priorities. Good questions also show the candidate is already thinking about the job.

Role and stage: {{role}}
{{#company}}
<company>
{{company}}
</company>
{{/company}}
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Write questions grouped by interviewer: recruiter, hiring manager, team members or peers, and senior leader. Start with the interviewer for the stage named in the role and give 4-6 prioritised questions for them; then give 2-3 for each later stage so the candidate is ready for the next rounds, and skip earlier stages. If no stage is named, give 3-4 per group.
2. Cover these areas across the groups: what success looks like at 30, 90 and 365 days; why the role is open and what happened to the last person in it; how the team decides, plans and handles disagreement; workload and on-call or peak periods; how feedback, performance reviews and promotions actually work; how the manager supports growth; and the biggest challenge the team faces now.
3. Phrase questions to ask for specifics and recent examples ("Tell me about the last time...", "What did the last person in this role do well?", "What changed after your last retrospective?") rather than opinions.
4. For each concern given, write one or two questions that test it without sounding accusatory, and describe what a reassuring answer and a warning sign each sound like.
5. List questions to avoid at this stage: things answered on the company's website or in the posting, and topics better saved for the offer stage (detailed pay and benefits with anyone but the recruiter, vacation days in a first interview).
</task>

<constraints>
- Do not state facts about the company that were not given; if a question depends on a fact (for example a recent layoff), phrase it conditionally or tell the candidate to confirm it first.
- Questions must be natural to say aloud: one sentence each, at most two clauses.
- Tailor to the role and level; a senior candidate's questions should probe strategy, scope and decision rights.
- If the role is too vague to tailor, write strong general questions and say what detail would sharpen them.
</constraints>

<output_format>
## Questions by interviewer
One subsection per interviewer type, numbered questions, each with a short "listen for" note.
## Concern checks
Table: Concern | Question | Reassuring answer | Warning sign. Only if concerns were given.
## Avoid
## How to use them
Two or three bullets: pick 2-3 per interview, ask follow-ups, take notes for the decision.
</output_format>
