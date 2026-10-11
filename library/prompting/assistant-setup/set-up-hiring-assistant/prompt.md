---
schema: 1
id: set-up-hiring-assistant
kind: prompt
title: Set up an AI assistant for recruiting
description: Sets up an assistant for a recruiter or hiring manager with role scorecards, fair-evaluation rules that ignore protected traits, limits on candidate data and saved prompts for each hiring step.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [recruiter, manager, founder]
requires: [none]
inputs: [text, job-posting, preferences]
output: [prompt, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scorecards, fair-hiring, candidate-privacy, structured-interviews, human-decision]
pairs_with:
  prompts: [write-job-description, build-project-instructions]
  rules: [privacy-first-assistant-rules]
args:
  - name: hiring
    description: Your role, the roles you hire for, volume, the stages of your process, and the jobs you want help with (job ads, scorecards, interview questions, outreach, summaries of interview notes).
    type: text
    required: true
  - name: company_rules
    description: "Optional: your company's rules on AI in hiring, approved tools, and how candidate data is handled."
    type: text
  - name: country
    description: Country or countries where you hire, since rules on AI in hiring, discrimination and data protection differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where AI helps and where it must not, Assistant instructions, Scorecard template, Candidate data rules, Saved prompts, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recruiters use assistants for job ads, outreach, interview questions and tidying interview notes. The serious risk is using one to rank or reject people. Language models pick up bias from names, schools, gaps, accents in transcripts, age signals and photos, and several jurisdictions now regulate automated decisions in hiring, require notice to candidates, or treat AI hiring tools as high-risk. Good practice is structured hiring: a scorecard of must-have outcomes and skills decided before seeing candidates, the same questions for everyone, evidence written against each criterion, and a human who decides. The assistant fits the structure (writing scorecards, questions, neutral summaries of notes against criteria) and stays out of the decision. Candidate CVs are personal data with limits on use and retention.

<hiring>
{{hiring}}
</hiring>
{{#company_rules}}
<company_rules>
{{company_rules}}
</company_rules>
{{/company_rules}}
Country: {{country}}
</context>

<task>
1. Write "where AI helps and where it must not": helps with job ads, scorecards, structured questions, outreach drafts, summaries of interviewer notes against criteria, scheduling messages; must not rank, score, shortlist or reject candidates, infer traits from CVs, photos, names or voices, or screen on gaps, age, origin, disability or family status.
2. Write assistant instructions, ready to paste, that:
   - work from a scorecard set before any candidate is discussed;
   - refuse to rank, score or recommend rejecting named candidates, and offer to organise the interviewer's evidence against criteria instead;
   - flag wording in ads, questions or notes that touches protected characteristics or proxies for them (for example "digital native", "young team", "native speaker" where not essential);
   - keep ads honest about pay, location and requirements, separating must-haves from nice-to-haves;
   - ask for anonymised notes and never request candidate contact data;
   - remind the user that rules on AI in hiring vary by country and to check with HR or legal.
3. Write a scorecard template: role purpose, three to five outcomes for the first year, must-have skills with what evidence looks like, nice-to-haves, and questions mapped to each.
4. Write candidate data rules: paste anonymised notes, not full CVs, unless company rules and the tool allow it; no photos or IDs; delete chats per retention rules. Quote company rules if given; otherwise tell the user to check with HR, legal or the data protection lead.
5. Write saved prompts for each job named, each with what to paste and a fairness check.
6. Give four tests, including "rank these five CVs" and an ad that asks for "recent graduates only".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law requires in the user's country; name the kinds of rules that may apply and say to check.
- Do not produce candidate rankings or rejections anywhere in the output.
</constraints>

<output_format>
## Where AI helps and where it must not
Two short lists.
## Assistant instructions
One fenced block, ready to paste.
## Scorecard template
A template in a fenced block.
## Candidate data rules
Bullets.
## Saved prompts
One short subsection per job.
## Tests
Four bullets: prompt and pass condition.
</output_format>
