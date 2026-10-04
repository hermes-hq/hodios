---
schema: 1
id: draft-maintainer-issue-replies
kind: prompt
title: Draft maintainer issue replies
description: Drafts kind but firm replies to the issues maintainers find hardest, such as support questions, out-of-scope requests, hostile reports, ETA demands and stale needs-info, with labels and next action.
category: writing
version: 1.0.0
status: incubating
stage: [maintain]
role: [maintainer]
stack: []
requires: [none]
inputs: [ticket, message, text]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [open-source, issue-tracker, saying-no, de-escalation, code-of-conduct, community]
pairs_with:
  prompts: [triage-issue-backlog, reply-to-first-contribution, write-contributing-guide]
  personas: [open-source-maintainer]
args:
  - name: issues
    description: One or more issues or comments to answer, pasted with their titles, the thread so far and any context (what you already know about the bug, whether you plan to fix it).
    type: text
    required: true
  - name: project_policies
    description: Your scope statement, support channels, code of conduct, security reporting process, labels and stale-issue rules, if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Replies, Summary table]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Maintainers burn out on the issues that are not bugs: usage questions in the bug tracker, feature requests outside the project's scope, "any update?" pings, demands for a release date, rude or entitled reports, and reports that never come back with the information asked for. Replies go wrong in two directions: too soft (the issue stays open forever and sets an expectation the maintainer cannot meet) or too curt (the person feels dismissed and the thread escalates). A good reply thanks once, says what will and will not happen, gives the person a useful next step, and closes or labels the issue so the tracker stays honest. Maintainers are volunteers or have limited time; replies should protect that time without apologising for it. This is for drafting the replies that are hard to write, one issue or a handful at a time; sorting and labelling a whole backlog is a triage job.
</context>

<task>
<issues>
{{issues}}
</issues>
{{#project_policies}}
<project_policies>
{{project_policies}}
</project_policies>
{{/project_policies}}

1. Classify each issue: usage question, duplicate, needs-info, stale needs-info, out-of-scope feature request, in-scope request without capacity, ETA or "+1" ping, hostile or entitled report, security report filed publicly, or a real bug hidden behind any of these.
2. Look for the real bug first: if a rude or vague report contains a reproducible defect, treat the defect seriously and the tone separately.
3. Decide the action: answer and close, redirect (to the discussion forum or support channel), close as duplicate (link the original), ask for specific information with a deadline, close as stale with an invitation to reopen, close as won't-do with the reason and an alternative (plugin, fork, another tool), keep open with "help wanted" and a pointer to where a contribution would start, or hide or lock under the code of conduct.
4. Draft each reply:
   - at most about 120 words, plain and warm, no sarcasm, no apology for having limits;
   - for questions: the answer or the link, then where such questions go next time;
   - for needs-info: a numbered list of exactly what is needed (version, minimal reproduction, logs) and what happens if it does not arrive by a date;
   - for out-of-scope requests: the scope reason in one sentence, an alternative, and no "maybe later" unless it is true;
   - for ETA pings: what is known, that there is no date if there is none, and how the person can help (test a branch, fund, contribute);
   - for hostile messages: acknowledge the frustration in one line, restate the facts, set the boundary with a link to the code of conduct, and do not mirror the tone; for abuse or repeated violations, recommend moderation instead of a reply;
   - for a public security report: thank them, ask them to use the private channel, and suggest hiding the details.
5. Give each issue a label set and the next action for the maintainer.
</task>

<constraints>
- Do not promise fixes, dates or releases the maintainer has not confirmed.
- Use only policies, links and channels given; otherwise use placeholders such as [DISCUSSIONS LINK] and list them.
- Do not invent technical answers; if the answer is unknown, say what the maintainer needs to check.
- Never repeat personal data, tokens or exploit details from the issue in the reply.
</constraints>

<output_format>
## Replies
Per issue: a heading with the issue title, the type, then the reply in a quote block, then "Labels:" and "Action:".
## Summary table
Table: issue, type, action, labels, follow-up date if any.
</output_format>
