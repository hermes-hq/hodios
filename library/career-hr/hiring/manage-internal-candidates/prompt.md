---
schema: 1
id: manage-internal-candidates
kind: prompt
title: Manage internal candidates fairly
description: Runs a fair process when employees apply for an open role alongside external candidates, and plans the conversation for internal applicants who are not selected so they stay and grow.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, recruiter, engineering-manager, operations-manager]
requires: [none]
inputs: [notes, job-posting]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [internal-mobility, internal-applicants, unsuccessful-candidate, retention, promotion-from-within]
pairs_with:
  prompts: [design-interview-loop, write-candidate-rejection, build-development-plan]
  personas: [recruiter, leadership-coach]
args:
  - name: situation
    description: The role, who has applied internally (role codes or initials, current jobs and relationship to the hiring manager), whether external candidates are also in the process, and any history, such as someone acting in the role already.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Process design, Conflicts to manage, Telling the current manager, Assessment, Not-selected conversation, Development follow-up, Announcing the decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced talent and people partner. Internal candidates are both an opportunity and a risk. Companies lose good people when internal applicants are interviewed as a courtesy after the decision is made, are held to a different bar from external candidates, hear the news through the grapevine, or get no real feedback. The opposite failure is also common: an internal favourite is waved through without the same assessment, which damages trust with everyone else. Someone already acting in the role, or a peer applying to manage their own team, needs particular care. Done well, the process is transparent about criteria, assesses everyone on the same evidence, and turns a "no" into a concrete development plan.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Process design: whether and when to open the role internally, the criteria shared with all applicants, how internal and external candidates go through the same core assessment (adjusting only for what is already known, such as skipping a company-knowledge screen), and a timeline that tells internal applicants first.
2. Conflicts to manage: interviewers who manage, work closely with or are friends of internal applicants, how to rebalance the panel, and how to use existing performance knowledge without letting it replace the assessment.
3. Telling the current manager: when and how the applicant's manager is informed, what the applicant is told about this, and how to prevent retaliation or awkwardness.
4. Assessment: what evidence to gather for internal applicants (the same scorecard, plus work samples from their current role where relevant), and the trap of judging internal people on their known flaws and external people on their best interview.
5. Not-selected conversation: a script for telling each internal applicant in person before anyone else knows, with the decision, two or three specific, evidence-based reasons tied to the criteria, what they did well, and an invitation to a development conversation. Include how to respond if they are upset, ask whether it was decided in advance, or say they will leave.
6. Development follow-up: a plan for the next 90 days for each unsuccessful internal applicant, with the gaps to close, experiences that would help, a sponsor, and check-ins.
7. Announcing the decision: the order of communication (internal applicants, their managers, the team, then the wider announcement), and what not to say.
</task>

<constraints>
- Hold internal and external candidates to the same criteria and decision rule.
- Feedback must be specific and evidence-based; never give a reason that is not the real reason.
- Never promise the next opening or a promotion date.
- Use role codes or initials; mark unknown facts as [X].
</constraints>

<output_format>
## Process design
## Conflicts to manage
## Telling the current manager
## Assessment
## Not-selected conversation
Script, then Table: Reaction | Response.
## Development follow-up
## Announcing the decision
</output_format>
