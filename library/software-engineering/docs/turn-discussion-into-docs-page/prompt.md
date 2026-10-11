---
schema: 1
id: turn-discussion-into-docs-page
kind: prompt
title: Turn a discussion into a docs page
description: Turns a Slack thread, issue discussion or meeting transcript into an accurate docs page, keeping only what was settled and flagging the points still open.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, technical-writer, tech-lead, maintainer]
stack: []
requires: [none]
inputs: [transcript, message, ticket]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [knowledge-capture, slack-threads, decision-record, tribal-knowledge]
pairs_with:
  prompts: [write-how-to-guide, write-explanation-page, write-adr, write-troubleshooting-guide]
args:
  - name: discussion
    description: The thread, issue comments or transcript, pasted in full, with names or roles and timestamps if you have them.
    type: text
    required: true
  - name: page_type
    description: The kind of page wanted, such as how-to, explanation, troubleshooting entry, FAQ or decision record. Leave blank to have it chosen.
    type: text
  - name: audience
    description: Who will read the page, such as new team members, on-call engineers or customers.
    type: text
output_contract:
  format: markdown
  sections: [Page, Source map, Open points, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A lot of real documentation lives in chat threads: someone asks how a thing works, three people answer, one answer gets corrected forty messages later, and the useful outcome is buried. Turning that into a page goes wrong in predictable ways. The writer copies the first confident answer instead of the corrected one, presents a suggestion nobody agreed to as the rule, keeps the chronology ("first we tried X") when readers only need the outcome, and drops the conditions ("only on the EU cluster", "until the v3 migration lands") that made the answer true. Discussions also mix stable facts with temporary workarounds; a page that does not mark which is which goes stale silently. Good conversion keeps the final, agreed state, cites where each claim came from so a reviewer can check it, and lists what was never resolved instead of smoothing it over.
</context>

<task>
<discussion>
{{discussion}}
</discussion>
{{#page_type}}Page type: {{page_type}}{{/page_type}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. Read the whole discussion before writing. Mark each substantive statement as one of: settled (agreed, or stated by the person who owns the system and not challenged), corrected (later replaced, note by what), proposal (suggested, not agreed), question (asked, not answered), workaround (temporary, with its trigger to remove) or off-topic.
2. Choose the page type from what the discussion actually answers: a task with steps is a how-to, a "why does it work this way" is an explanation, a symptom and fix is a troubleshooting entry, a choice between options is a decision record. If a page type was given and the material does not fit it, say so and use the closest fit.
3. Write the page from settled and corrected-final statements only, in present tense, for the stated audience. Keep conditions and scope (environment, version, plan, region). Commands, config keys and names must appear exactly as in the source. Label workarounds as temporary.
4. Build a source map: each claim on the page linked to the message, comment or timestamp it came from.
5. List open points: proposals, unanswered questions and contradictions, each with who could settle it if the discussion makes that clear.
</task>

<constraints>
- Do not fill gaps with general knowledge presented as the team's practice. If a step is missing, leave a marked gap rather than inventing it.
- Do not name individuals in the page itself; refer to teams or roles. Personal names may appear only in the source map.
- Drop personal remarks, blame, credentials, tokens, internal hostnames and customer data that appear in the thread, and say under "Left out" that you removed sensitive content.
- If the discussion never reached an answer, do not write a page that implies one; return the open points and a short draft skeleton instead.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Page
The finished docs page in Markdown, with title and type.
## Source map
Table: claim, source message or timestamp, status (settled or corrected).
## Open points
Checklist of proposals, unanswered questions and contradictions, with who could resolve each.
## Left out
What was removed (history, off-topic, sensitive content) and why, in one line each.
</output_format>
