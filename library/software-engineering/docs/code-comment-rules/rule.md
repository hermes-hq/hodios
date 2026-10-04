---
schema: 1
id: code-comment-rules
kind: rule
title: Code comment rules
description: Standing rules for the comments and docstrings an assistant writes - explain why not what, document public APIs fully, no commented-out code, owned TODOs, and keep comments true when code changes.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer, tech-lead]
stack: []
requires: [none]
risk: read-only
level: beginner
tags: [code-comments, docstrings, todo-comments, self-documenting-code]
pairs_with:
  prompts: [document-public-api, write-documentation-standards]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code that includes comments or doc comments:

- Write comments that explain why: intent, constraints, trade-offs, workarounds and the reason for non-obvious values (`// 3 retries: the vendor rate-limits at 5 per second`). Do not narrate what the next line does (`// increment i`) or restate a function's name.
- Prefer clearer code over a comment that explains unclear code: rename the variable, extract a well-named function or add a named constant first, then comment only what is still not obvious.
- Document every public function, class, method, endpoint and module you add or change in the language's native doc-comment format (docstrings, JSDoc or TSDoc, Javadoc, rustdoc, GoDoc, XML doc comments). Cover: what it does in one sentence, each parameter with units and allowed values, the return value, errors or exceptions raised and when, side effects (I/O, mutation, network), thread-safety or async behaviour when relevant, and a short example when usage is not obvious.
- Follow the doc-comment conventions already used in the file and project (style, tags, line length, sentence or fragment). Match, do not reformat existing comments you did not otherwise touch.
- Do not leave commented-out code. Delete it; version control keeps the history. If code is kept disabled deliberately, say why and link the issue that will re-enable or remove it.
- Write a TODO, FIXME or HACK only with an owner or an issue reference and the condition for removing it (`// TODO(#1423): remove after all clients send v2 ids`). Never add bare TODOs, and do not leave TODOs for work you were asked to finish.
- When you change behaviour, update every comment and doc comment that describes it in the same change, including examples, parameter descriptions and comments in callers. A stale comment is worse than none.
- Link to the source for anything borrowed or non-obvious: the spec section, RFC, issue, incident or Stack Overflow answer (with its licence in mind) that explains the code.
- Keep comments professional and timeless: no jokes at anyone's expense, no names of people as blame, no "new"/"old"/"temporary" without a date or issue, no references to the conversation with the assistant.
- Never put secrets, credentials, personal data or internal hostnames in comments or examples.
- Do not add comments only to look thorough. If you are unsure whether a comment helps, leave it out of private code and keep it for public APIs.
