---
schema: 1
id: design-file-upload-experience
kind: prompt
title: Design a file upload experience
description: Designs the file upload experience for a product, covering drop zones, file pickers, limits stated up front, progress, failures and retries, previews, and mobile and accessible alternatives.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer, product-manager]
requires: [none]
inputs: [text, spec]
output: [docs, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [file-upload, drag-and-drop, upload-progress, error-recovery, attachments]
pairs_with:
  prompts: [design-empty-and-error-states, design-form-experience, write-ux-microcopy, implement-file-upload]
  personas: [product-designer]
args:
  - name: context
    description: What people upload and why (documents for verification, photos, CSV imports, attachments), typical file types and sizes, and how many files at once.
    type: text
    required: true
  - name: constraints
    description: Technical limits (max size, accepted types, processing time, virus scanning), platforms (web, iOS, Android) and anything that must happen after upload. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Upload moments, Entry points, Before upload, During upload, After upload, Failures and recovery, Mobile and accessibility, Copy, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Upload frustration comes from limits revealed only after a long upload fails, progress that freezes at 99% while the server processes, a whole batch failing because one file was wrong, uploads lost when the person navigates away, and drag-and-drop as the only way in (which fails on touch devices and for keyboard and screen reader users). Good upload design states accepted types and size before selection, validates on the device before sending where possible, shows per-file progress and the separate processing step, lets people retry or remove one file without losing the rest, and confirms what was received with a preview or file name.
</context>

<task>
<context_given>
{{context}}
</context_given>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Upload moments: where in the product uploads happen and what the person is trying to get done.
2. Entry points: a visible button that opens the file picker as the primary path, drag-and-drop as an enhancement, paste from clipboard or camera capture on mobile where relevant.
3. Before upload: accepted types and maximum size shown next to the control, client-side checks for type and size with immediate messages, and guidance for common problems (for example photos of documents: flat, in focus, all corners visible).
4. During upload: per-file progress, a distinct "processing" or "scanning" state, cancel per file, behaviour if the person navigates away or loses connection (warn, resume or keep in background).
5. After upload: confirmation with file name, size and preview where useful, replace and remove actions, and what happens next.
6. Failures and recovery: each failure (wrong type, too large, network drop, server rejection, scan failure, duplicate) with a specific message and recovery action; batches keep successful files.
7. Mobile and accessibility: native pickers, camera option, focus management, announcements of progress and errors to assistive technology, targets sized for touch.
8. Copy for labels, helper text and errors.
9. Open questions for engineering.
</task>

<constraints>
- Drag-and-drop is never the only way to upload.
- Do not invent technical limits; use the ones given or mark them [to confirm].
- Error messages say what happened and what to do, never only "Upload failed".
</constraints>

<output_format>
## Upload moments
## Entry points
## Before upload
## During upload
## After upload
## Failures and recovery
| Failure | Detected | Message | Recovery |
## Mobile and accessibility
## Copy
## Open questions
</output_format>
