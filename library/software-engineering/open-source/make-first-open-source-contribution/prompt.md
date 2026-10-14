---
schema: 1
id: make-first-open-source-contribution
kind: prompt
title: Choose a project and issue for your first open-source contribution
description: Finds a responsive project and a realistic first issue for your first open-source contribution, drafts the comment to claim it and plans how to work with maintainers until it lands.
category: open-source
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, student]
requires: [none]
inputs: [preferences, url, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [first-contribution, good-first-issue, contributor-experience, portfolio]
pairs_with:
  prompts: [open-first-pull-request-to-project, write-upstream-feature-proposal, report-bug-to-upstream-project]
args:
  - name: background
    description: Your languages and experience level, tools and libraries you already use, how much time you have, and why you want to contribute (learning, portfolio, fixing something that bothers you).
    type: text
    required: true
  - name: candidate
    description: A project or issue you are considering, if you have one. Paste the issue text, CONTRIBUTING notes or the README. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where to look, Check the project, Pick the issue, Talk to the maintainers, If it stalls, Next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most first contributions fail before any code is written, because of the project and issue chosen. People pick a famous project where starter issues are claimed within minutes and outside pull requests wait months, when a mid-sized, active project they already use would review them in days. They start on an issue nobody confirmed is wanted, one already assigned, or one whose "good first issue" label is two years stale. They post "can I take this?" under fifteen identical comments, or go silent after claiming an issue so others are blocked. The highest-value first contributions are often not code: a minimal reproduction for an open bug, a docs fix for something you tripped over yourself, a missing test. Maintainers are mostly volunteers; a contributor who asks one specific question, says what they plan to do and keeps them updated gets help. Many projects now reject unreviewed AI-generated pull requests, and contributors are expected to understand and stand behind every line they submit. This prompt covers choosing and engaging; the git and pull request mechanics belong to the next step.

Background:
<background>
{{background}}
</background>
{{#candidate}}
<candidate>
{{candidate}}
</candidate>
{{/candidate}}
</context>

<task>
1. Where to look: from the person's own stack, the kinds of projects to consider (libraries and tools they already use and have hit rough edges in, mid-sized and active), and where to find their starter work (the project's issue labels, docs issues, open bugs without a reproduction). Do not name specific projects as currently welcoming unless the user gave them.
2. Check the project: a five-minute check before investing time: outside pull requests merged in the last few months and how long their first review took, a CONTRIBUTING file, a code of conduct, a sign-off or CLA requirement, a policy on AI-assisted contributions, and whether maintainers reply to newcomers kindly. Say which signals rule a project out.
3. Pick the issue: what makes a good first issue (small, clearly described, confirmed as wanted, not assigned, recent activity), how to spot a contested or stale one, and the non-code alternatives.{{#candidate}} Judge the candidate given against these points and say plainly whether to take it.{{/candidate}}
4. Talk to the maintainers: a short draft comment to claim or ask about the issue, saying what you plan to do and asking one specific question; when to ask in the issue versus the project's chat; and how to post a progress update or hand the issue back if you cannot finish.
5. If it stalls: how long to wait before one polite nudge (state the person should read the project's stated response times first), what to do if the issue is taken by someone else, and how to take a decline without arguing.
6. Next step: once the issue is agreed, hand over to the fork, branch, commit, sign-off and pull request mechanics (the `open-first-pull-request-to-project` prompt covers them), with the one or two project rules to note before starting.
</task>

<constraints>
- Do not invent project policies, maintainers, label names or response times. Tell the person to read the project's own files.
- Do not recommend submitting AI-generated code the person cannot explain, or mass-opening trivial pull requests for a contribution count.
- Do not walk through git commands or the pull request itself; point to the next step instead.
- Keep the plan sized to the time the person said they have.
- Ask one question first if the background does not say which language or tools the person uses.
</constraints>

<output_format>
Use the contract's section headings in order. Each section as short numbered steps or a checklist. Include the claim comment and the progress or hand-back update as fenced drafts the person fills in.
</output_format>
