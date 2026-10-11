---
schema: 1
id: brief-professional-adviser-by-email
kind: prompt
title: Brief an accountant, lawyer or adviser by email
description: Turns a messy situation into a concise email brief for an accountant, lawyer or other adviser, with facts, timeline, documents and numbered questions, so you pay for advice.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, manager]
requires: [none]
inputs: [notes, document]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [adviser-brief, billable-time, lawyer-email, accountant-email, case-summary, chronology]
pairs_with:
  prompts: [prepare-for-accountant-meeting, summarize-email-thread, request-information-by-email]
args:
  - name: situation
    description: Everything you know about the matter, in any order - what happened, dates, amounts, who is involved, what has been said or signed, and what worries you. Paste emails or notes if useful.
    type: text
    required: true
  - name: adviser
    description: Who you are writing to (accountant, solicitor or attorney, tax adviser, financial adviser, surveyor, architect) and whether you are already their client.
    type: string
    required: true
  - name: goal
    description: What you want from the adviser - an opinion, a quote for the work, a meeting, a document drafted, or a decision on whether you need them at all.
    type: string
output_contract:
  format: markdown
  sections: [Email, Chronology, Documents to attach, Gaps to fill, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Advisers who bill by time spend a surprising share of a first engagement just working out what happened. Clients who send a one-page brief get faster, cheaper and better answers: who the parties are, a dated chronology of facts, the amounts and deadlines, what documents exist, what outcome they want, and specific numbered questions. Experienced clients also separate facts from opinions and feelings, say what they have already done or signed, flag any imminent deadline in the first lines (a court date, a tax filing, a limitation period, a completion date), and ask about fees and conflicts up front. The brief is not where to argue the case or decide the answer; it should give the adviser what they need to advise.
</context>

<task>
Write an email brief to my {{adviser}}.{{#goal}} What I want: {{goal}}.{{/goal}}

<situation>
{{situation}}
</situation>

1. Sort the situation into facts (with dates and sources), what the user has done or signed, open issues, and opinions or worries. Keep opinions out of the chronology.
2. Find any deadline or time-sensitive step and put it in the subject line and the first sentence if one exists, for example "Deadline 14 Nov: question about a VAT assessment".
3. Email body:
   - One line on who the user is and the relationship with the adviser (existing client or new enquiry).
   - The matter in two or three sentences.
   - The goal: what they want from the adviser.
   - Key facts in a short list: parties, amounts, dates.
   - Numbered questions, specific and answerable (three to seven), ordered by importance.
   - For a new adviser: a request for their fee basis or estimate, availability, and to confirm there is no conflict of interest.
   - What is attached.
4. Chronology: a dated table of events, oldest first, with the source for each (email, contract, letter, conversation).
5. Documents to attach: list the documents mentioned or implied, marking which the user has and which they need to find.
6. Gaps to fill: facts the adviser will certainly ask about that are missing.
</task>

<constraints>
- Body under about 300 words, with the detail in the chronology.
- Never add facts, dates, amounts or legal or tax conclusions that are not in the input. Do not answer the questions yourself; the adviser does that.
- Neutral, factual wording about other parties; no insults or speculation about motives, since the email may be disclosed later.
- Suggest leaving out unnecessary personal or sensitive data (full account numbers, passwords, health details not relevant to the matter); attach them only if the adviser asks.
</constraints>

<output_format>
## Email
Subject, then body.
## Chronology
Table: date | event | source.
## Documents to attach
Checklist.
## Gaps to fill
Bullets. "None" if complete.
## Notes
Anything flagged. "None" if nothing.
</output_format>
