---
schema: 1
id: implement-file-upload
kind: prompt
title: Implement secure file uploads
description: Implements secure file uploads with direct-to-storage signed URLs, type and size validation, a malware-scan hook, safe naming and orphan cleanup. Use for backends accepting user files.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, mobile-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests, config]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [file-upload, presigned-url, object-storage, malware-scanning, content-validation]
pairs_with:
  personas: [backend-engineer, security-auditor]
  prompts: [build-rest-endpoint, implement-background-job, review-pr-for-security]
args:
  - name: use_case
    description: What users upload and why, for example "profile photos", "PDF invoices up to 20 pages", "CSV imports", and who may later read the files.
    type: text
    required: true
  - name: storage
    description: Object storage, for example AWS S3, Google Cloud Storage, Azure Blob Storage, Cloudflare R2 or MinIO.
    type: string
    default: s3-compatible
  - name: stack
    description: Backend language and framework, and the client (web, iOS, Android). Leave empty to detect it from the repo.
    type: string
  - name: max_size
    description: Maximum file size, for example "10 MB".
    type: string
output_contract:
  format: markdown
  sections: [Flow, Changes, Security checks, Tests, Configuration, Operational notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
File uploads are a classic source of breaches and outages. Typical failures: trusting the file extension or the client's Content-Type, so an HTML or SVG file with script is served from the app's own domain; using the user's file name in the storage path (path traversal, overwrites, leaking names); streaming large files through the app server until it runs out of memory; signed upload URLs with no size limit or a long expiry; files that are uploaded but never attached to anything, piling up forever; and serving uploads publicly when they should be private. A sound design uploads straight to object storage with short-lived, constrained credentials, validates the actual bytes after upload, quarantines until scanned, and only then makes the file available.
</context>

<task>
Implement file uploads for this use case:

<use_case>
{{use_case}}
</use_case>

Storage: {{storage}}
{{#stack}}
Stack: {{stack}}
{{/stack}}
{{#max_size}}
Maximum size: {{max_size}}
{{/max_size}}

1. Read the repo's storage client, auth, models, background jobs and config, and reuse them. If the allowed file types, maximum size or who may read the files are not clear from the use case, ask before implementing.
2. Implement this flow:
   1. **Request:** the client asks the API for an upload, sending the intended file name, size and declared type. The API checks authorization, the allowed type list and the size, creates an upload record in a pending state, and generates a random object key under a quarantine prefix (for example `pending/<uuid>`); never use the user's file name in the key.
   2. **Upload:** the API returns a short-lived signed URL (minutes, not hours) that is constrained as tightly as the storage allows: a presigned POST policy with a content-length range and fixed content type for S3-compatible stores, or the equivalent conditions on other providers. For files above the provider's single-request limit, or large files on mobile networks, use multipart or resumable uploads.
   3. **Confirm:** the client tells the API the upload finished (or a storage event notifies it). The API checks the object exists and its real size matches.
   4. **Validate and scan:** a background job reads the file's magic bytes to detect the real type and rejects mismatches, enforces content rules (image dimensions, page count, CSV row limit), calls a malware-scan hook (an interface with a no-op implementation for development and a place to plug in a scanner), and for images re-encodes them to strip metadata such as GPS location and neutralise polyglot files.
   5. **Promote:** clean files move to the final prefix and the record becomes available; failed files are deleted or kept in quarantine with the reason, and the user gets a clear error.
3. Serve files safely: private by default with short-lived signed download URLs after an authorization check; `Content-Disposition: attachment` for anything that is not a safe inline type; the correct `Content-Type` plus `X-Content-Type-Options: nosniff`; and ideally a separate domain for user content. Store the original file name only as sanitised metadata for display.
4. Clean up orphans: a storage lifecycle rule that expires objects under the pending prefix after a day or so, plus a scheduled job that removes pending records with no object and objects whose owning record was deleted.
5. Configure CORS on the bucket for the web origin only, with just the methods and headers the upload needs.
6. Write tests: the request endpoint rejects disallowed types, oversize files and unauthorised users; the signed URL has the expected constraints and expiry; the validation job rejects a file whose magic bytes do not match its declared type; a scan failure leaves the file unavailable; promotion makes it available; download requires authorization; and cleanup removes expired pending uploads. Use a local emulator or a fake storage client; no real cloud calls.
7. Run the tests and linter and report the real results.
</task>

<constraints>
- Never accept SVG, HTML or other active content for inline display unless the use case requires it; if it does, say how it will be sanitised or served from an isolated domain.
- Never trust the client's file name, extension or Content-Type for security decisions.
- Never make the bucket public to make uploads work.
- Do not claim a malware scanner is integrated if only the hook exists; say what is left to wire up.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow
A Mermaid sequence diagram of request, upload, confirm, scan, promote and download.
## Changes
One line per file.
## Security checks
Table: threat, control, where it is implemented.
## Tests
One line per test and the real result of the run.
## Configuration
Allowed types, size limits, URL expiries, prefixes, lifecycle rule and CORS settings.
## Operational notes
What to monitor (quarantine backlog, rejection rate, scan failures) and what is still to wire up.
</output_format>
