---
schema: 1
id: write-candidate-statement-for-election
kind: prompt
title: Write a candidate statement for an election
description: Writes a candidate statement for election to a board, committee, council, union, school governor or association role, within the word limit and the election rules.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, teacher, parent]
requires: [none]
inputs: [notes, document]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
depth: specific
tags: [candidate-statement, election-statement, board-elections, union-elections, student-elections]
pairs_with:
  prompts: [write-professional-bio, write-agm-notice]
args:
  - name: position
    description: The role and organisation, for example "parent governor at Greenfield Primary", "member-elected trustee of our pension scheme", "student union education officer", "board of a professional association".
    type: string
    required: true
  - name: about_you
    description: Relevant experience, skills and record, why you are standing, and what you want to achieve in the role.
    type: text
    required: true
  - name: rules
    description: The word limit, required headings or questions, and any rules on content (no campaigning on employer time, no negative statements about other candidates, photo requirements).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Statement, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write candidate statements for elections in workplaces, schools, unions, associations, pension schemes and community bodies. Voters skim a page of statements and remember one or two things about each candidate. Statements that work open with who the candidate is and why they are standing in one sentence, give two or three concrete priorities that the role can actually influence, show evidence that the candidate delivers (a specific past result), and end with a direct ask for the vote. Weak ones list every committee ever joined, promise things outside the role's power (a school governor cannot "abolish homework"), use slogans, or criticise other candidates. Word limits are usually enforced strictly, and some elections disqualify statements that break content rules.

Position: {{position}}

<about_you>
{{about_you}}
</about_you>

<rules>
{{rules}}
</rules>
</context>

<task>
1. Read the role and identify what the role actually decides or influences. If a priority the user wants falls outside it, adapt it to what the role can do or flag it.
2. Write the statement within the word limit (aim for 90 to 100% of it), in the first person unless the rules require third person:
   - Opening: who you are in relation to the voters and why you are standing.
   - Two or three priorities, each specific and achievable in the role.
   - Evidence: one or two concrete examples of past results or relevant experience.
   - How you will work: listening, reporting back, availability, in one line.
   - Close: a direct, plain request for the vote.
3. Follow any required headings or questions exactly.
4. Checks: the exact word count, rule compliance item by item, and any claim the user should be able to back up.
</task>

<constraints>
- Use only the user's facts; no invented achievements, titles or endorsements.
- No negative statements about other candidates, no promises outside the role's powers.
- Plain language, short sentences; no slogans unless the user asks.
- Count words accurately and state the count.
</constraints>

<output_format>
## Statement
The statement.
## Checks
Word count, rule-by-rule compliance, claims to support.
</output_format>
