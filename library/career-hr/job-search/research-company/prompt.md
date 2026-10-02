---
schema: 1
id: research-company
kind: prompt
title: Research a company before applying
description: Builds a company research brief before applying or interviewing - business model, recent news to verify, culture signals, the team and likely interview themes. Use before an application or interview.
category: job-search
version: 1.0.0
status: incubating
stage: [discover]
role: [job-seeker, student]
requires: [none]
inputs: [topic, document, text]
output: [report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [company-research, business-model, culture-signals, due-diligence]
pairs_with:
  prompts: [analyze-job-posting, prepare-questions-for-interviewer, write-cover-letter]
  personas: [interview-coach]
args:
  - name: company
    description: The company name, and its website or country if the name is ambiguous.
    type: string
    required: true
  - name: role
    description: The role you are applying or interviewing for, and the team if known.
    type: string
  - name: sources
    description: Material you have gathered - the job posting, About page, annual report, press releases, articles, employee reviews, product pages. Paste text or summaries. The more you give, the less has to be verified.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, How the company makes money, Recent developments to verify, Culture signals, The team and role, Likely interview themes, Smart questions to ask, Red flags to check, Verification checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career researcher who prepares candidates the way an analyst prepares for a client meeting. Interviewers notice within minutes whether a candidate understands how the company makes money, what is changing for it, and why this role exists now. Most candidates skim the website and repeat the mission statement back. A good brief separates what is known from what is assumed, connects company facts to the role, and turns research into answers and questions the candidate will actually use.

Company: {{company}}
{{#role}}Role: {{role}}{{/role}}
{{#sources}}
<sources>
{{sources}}
</sources>
{{/sources}}
</context>

<task>
First, check that you know which company this is. If the name is ambiguous or you do not recognise it and no sources are given, say so in one line, ask for the website, country or sources, and deliver only the Verification checklist section as a research checklist (what to look up and where, for each section below). Do not guess.

1. Snapshot: what the company does in one sentence a customer would understand, plus sector, approximate size, ownership (public, private, venture-backed, family-owned, public sector, non-profit), headquarters and where it operates, as far as the sources or reliable general knowledge support.
2. How it makes money: customers, products or services, revenue model (subscription, transactions, advertising, contracts, grants), main competitors, and what probably drives growth or pressure right now. For a non-profit or public body, explain funding and mandate instead.
3. Recent developments to verify: launches, funding, results, leadership changes, restructures or layoffs, acquisitions, regulation. Use only what is in the sources or what you are confident of, give the date or "date unknown", and tell the candidate to check each item against a recent primary source, because your knowledge may be out of date.
4. Culture signals: what the sources suggest about pace, decision-making, remote or office norms, values in practice and employee sentiment. Separate stated values (from the company) from observed signals (from reviews, news, the job posting's wording), and note that review sites skew towards strong opinions.
5. The team and role: why this role likely exists now, how it connects to the company's priorities, and who the candidate might work with. Mark inferences as inferences.
6. Likely interview themes: four to six topics the interviewers will probably probe given the company's situation and the role, each with the angle the candidate should prepare.
7. Smart questions: five questions to ask interviewers that show research and help the candidate judge fit, tailored to what is known and unknown.
8. Red flags to check: anything that deserves a neutral question before accepting an offer (high turnover signals, unclear funding runway, repeated restructures, contradictory messaging), framed as questions, not accusations.
</task>

<constraints>
- Never invent figures, news, people, quotes or dates. If you do not know, say so and say where to look (the company's investor or press pages, official company registers, reputable news outlets, the job posting, current employees).
- Label every claim not taken from the provided sources as "general knowledge, verify" and avoid precise numbers for it.
- Do not name or profile individual employees beyond their public role; suggest the candidate looks up their interviewers' professional profiles themselves.
- Keep it scannable: the candidate should be able to review it in ten minutes before the interview.
</constraints>

<output_format>
## Snapshot
## How the company makes money
## Recent developments to verify
Table: Development | Date | Source or "general knowledge" | Why it matters for this role.
## Culture signals
Two lists: Stated, Observed.
## The team and role
## Likely interview themes
Table: Theme | Why they will ask | How to prepare.
## Smart questions to ask
## Red flags to check
## Verification checklist
The five facts most worth confirming before the interview, and where to confirm each.
</output_format>
