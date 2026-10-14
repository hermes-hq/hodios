---
schema: 1
id: implement-rich-text-editor
kind: prompt
title: Implement a rich-text editor
description: Integrates a rich-text editor such as Tiptap or Lexical with a versioned stored format, paste cleaning, uploaded image embeds, server-side validation, sanitised rendering and safe autosave.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
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
depth: specific
tags: [rich-text, tiptap, lexical, autosave, sanitization]
pairs_with:
  prompts: [render-user-markdown-safely, make-rich-text-editor-accessible, implement-file-upload]
args:
  - name: editor_spec
    description: Where the editor is used and what it must support, for example "knowledge base articles with headings, lists, links, code blocks and images; autosave".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Document format, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer adding a rich-text editor. The editor library is the easy part; the stored content and its path back to the screen is where things break:
- Store a structured document (the editor's JSON, such as ProseMirror JSON for Tiptap or Lexical's serialised state) with a schema version, and derive HTML when rendering. Storing editor HTML ties you to that editor and invites stored XSS.
- The client is untrusted. Validate the document on the server against the allowed node and mark types, limit size, and sanitise any HTML you render with an allowlist sanitizer (such as DOMPurify) at render time.
- Paste from Word, Google Docs and web pages brings inline styles, fonts and hidden markup. A strict schema drops unknown marks; also handle plain-text paste and pasted images.
- Images: upload through the app's file upload path and insert the returned URL; never keep base64 data URLs in the document. Show a placeholder while uploading and clean up uploads never saved.
- Links: allow only `http`, `https` and `mailto`; render with `rel="noopener noreferrer"` and `nofollow` for user content.
- Autosave: debounce, send a version or ETag so an older tab cannot overwrite newer content, show saved and saving status, flush on page hide, and warn on leaving with unsaved changes.
- Editors are client-only. With server rendering, load them on the client only and render stored content as sanitised HTML on the server.
- A controlled pattern that sets the editor content on every change resets the cursor; set content only on load or external change.
- Collaborative editing (Yjs and similar) is a different project; leave it out unless asked.
</context>

<task>
Add a rich-text editor for:
{{editor_spec}}

1. Read the current text inputs, how content is stored and rendered, the file upload path, the API for saving, and any editor already in the repo. Reuse an existing editor library if there is one.
2. Define the document format: allowed nodes and marks, the schema version, size limits, and how it renders to HTML.
3. Implement the editor component with the toolbar for the allowed features, paste handling, image upload, link rules and autosave with conflict detection.
4. Implement server-side validation of the document and sanitised rendering, and migrate existing content if the format changes.
5. Write tests: disallowed nodes stripped on the server, a script or `javascript:` link removed in rendering, pasted styled content cleaned, autosave conflict detected, image inserted by URL not data URL.
6. Run the tests, type checks and linter. Fix what fails.
</task>

<constraints>
- Never render stored rich text without sanitising it.
- Never store base64 image data inside the document.
- Do not add a second editor library if one is already used.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Document format
Allowed nodes and marks, the version, size limits and the rendering path.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, such as editor library or autosave interval, and why.
</output_format>
