---
schema: 1
id: write-ai-use-disclosure
kind: prompt
title: Write an AI use disclosure
description: Writes an honest AI-use statement for an assignment listing tools used, for what, what the student did and how outputs were checked, matched to the course policy, flagging forbidden uses.
category: studying
version: 1.0.0
status: incubating
stage: [ship]
role: [student]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ai-disclosure, academic-integrity, generative-ai, transparency]
pairs_with:
  rules: [academic-integrity-rules]
  prompts: [understand-assignment-brief]
args:
  - name: what_i_used
    description: Each AI tool you used, roughly when, and what for (brainstorming, outlining, feedback on a draft, grammar, translation, explaining a concept, debugging code), what you did yourself, and how you checked or changed what it produced. Include anything you are unsure about.
    type: text
    required: true
  - name: course_policy
    description: Optional. The course, module or school's AI policy and any required declaration wording or format, pasted as given.
    type: text
  - name: citation_style
    description: Reference style used in the assignment, if the policy asks for AI to be cited in the reference list.
    type: enum
    enum: [none, apa, mla, harvard, chicago, other]
    default: none
output_contract:
  format: markdown
  sections: [Policy check, Disclosure statement, Use log, Citation, Evidence to keep]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student needs to declare how they used AI tools in an assignment. Disclosures go wrong in two directions: so vague that they hide real use ("AI was used for minor help"), which can be treated as misconduct later, or so anxious and long that they confuse the marker. A good statement is specific and proportionate: which tool, for which stage of the work, what the student did themselves, and how outputs were checked. It follows the course's policy and format. If the use described breaks the policy, the honest answer is to say so to the student before they submit, not to word around it.
</context>

<task>
<what_i_used>
{{what_i_used}}
</what_i_used>
{{#course_policy}}
<course_policy>
{{course_policy}}
</course_policy>
{{/course_policy}}
Citation style: {{citation_style}}

1. Policy check: compare each use with the policy. Classify it as allowed, allowed with disclosure, unclear, or not allowed. If no policy is given, say the student must find it (module handbook, assignment brief, learning platform) and judge against a common middle-ground policy: help with ideas, feedback, language and understanding usually needs disclosure; generated text, data or code submitted as the student's own usually is not allowed unless stated.
2. If any use is not allowed or unclear, say so plainly, and suggest the student asks the module leader before submitting, or redoes that part themselves. Do not write a statement that hides or minimises it.
3. Write the disclosure statement, in the first person, 80-200 words, in the policy's required format if one is given. Cover: tools (name and version or date if the student gave them), each use and the stage of work, what the student wrote, decided or analysed themselves, how outputs were checked (sources verified, facts checked, code tested, text rewritten), and what AI was not used for.
4. Write a use log table the student can attach as an appendix if the policy asks for prompts or detail.
5. If the citation style above is anything other than none, give the in-text and reference-list form following that style's general approach for generative AI, with the student's details in brackets, and tell them to check the current style guide because guidance on citing AI keeps changing.
6. List what evidence to keep (prompts and outputs, draft versions, notes) in case of questions.
</task>

<constraints>
- Use only what the student said. Never invent tools, versions, dates, prompts or checks. Missing details become [placeholder] and a question.
- Do not soften or omit any use the student described.
- Do not write or rewrite the assignment itself.
- Calm, factual tone; disclosure is normal practice, not a confession.
</constraints>

<output_format>
## Policy check
Table: Use | Policy says | Status (allowed, disclose, unclear, not allowed) | Action.

## Disclosure statement
The statement, ready to paste, with its word count.

## Use log
Table: Date or stage | Tool | What I asked it to do | What I did with the output | How I checked it.

## Citation
In-text and reference forms, or "Not required by your policy".

## Evidence to keep
Three to five bullets.
</output_format>
