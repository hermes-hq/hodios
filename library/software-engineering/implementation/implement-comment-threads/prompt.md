---
schema: 1
id: implement-comment-threads
kind: prompt
title: Implement threaded comments
description: Implements threaded comments with replies, cursor pagination, edit and delete rules, id-based mentions, deduplicated notifications and moderation hooks, end to end.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, backend-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [comments, mentions, notifications, moderation, replies]
pairs_with:
  prompts: [design-comments-and-mentions, render-user-markdown-safely, implement-in-app-notifications]
args:
  - name: comments_spec
    description: Where comments live and the rules, for example "comments on tasks, one level of replies, @mentions of project members, authors edit for 15 minutes".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data model, API, Rules, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a full-stack engineer building comments on a resource such as a task, document or post. The pieces people forget:
- Thread shape: most products allow one level of replies (replies to replies attach to the same root). Store `parent_id` and `root_id`; if deeper nesting is required, cap the depth and paginate per level. Unbounded recursive trees are slow to query and unreadable on phones.
- Pagination with a cursor on (`created_at`, `id`) for top-level comments, and replies loaded on demand with a count stored on the root.
- Visibility follows the parent resource: anyone who cannot see the task cannot read, list or be notified about its comments. Check on every read, not only when posting.
- Editing: record `edited_at` and show it; decide an edit window. Deleting a comment with replies leaves a "deleted" placeholder so the thread still makes sense; the author's text is removed.
- Mentions: store mentioned user ids resolved at write time, not display names that change. Only allow mentioning people who can see the resource. On edit, notify only newly added mentions.
- Notifications go through a background job: the resource owner, thread participants and mentioned users, deduplicated, never the author themself, and respecting notification preferences.
- Rendering: sanitise user text and render links safely; never trust HTML from the client.
- Moderation hooks: report, hide by moderators, rate limits on posting, and an extension point for spam checks.
- Optimistic posting in the UI with rollback on failure.
</context>

<task>
Implement comments for:
{{comments_spec}}

1. Read the parent resource's model and permissions, the notification system, rendering of user text, the API style and UI components. Follow existing patterns.
2. Write the data model, API endpoints and the rules (depth, edit window, delete behaviour, who may mention whom).
3. Implement the model and migration, the endpoints with permission checks, mention parsing and validation, notification jobs, and the UI (list, reply, edit, delete, mention picker) with optimistic updates.
4. Write tests: post and reply, pagination, edit window, delete with replies, mention of someone without access rejected, notification recipients deduplicated and excluding the author, user without access to the resource cannot read comments.
5. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never render comment text as raw HTML.
- Never notify or mention users who cannot see the parent resource.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data model
Tables, fields and indexes.
## API
A table: Method | Path | Who may call | Notes.
## Rules
Depth, edit, delete, mention and notification rules as implemented.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
</output_format>
