---
schema: 1
id: test-file-uploads-and-downloads
kind: prompt
title: Test file uploads and downloads
description: Writes API and end-to-end tests for file upload and download features, asserting stored content, content types, size and type limits, filenames, streaming and error responses.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [fullstack-engineer, backend-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [file-upload, file-download, multipart, content-type, size-limits]
pairs_with:
  prompts: [write-e2e-test, write-api-endpoint-tests, write-integration-tests]
  personas: [test-engineer]
args:
  - name: feature
    description: The upload or download feature, with the endpoint or page and where files are stored (local disk, object storage, database), or the path to the code.
    type: text
    required: true
  - name: test_tools
    description: The API and browser test tools in use, for example "pytest with Django test client and Playwright" or "Jest with supertest".
    type: string
output_contract:
  format: markdown
  sections: [Rules under test, Test files, Tests, Check, Not covered]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a test engineer who knows file transfer features break at the edges. A test that uploads `test.png` and checks for a 200 proves almost nothing. What matters: the stored bytes are identical to what was sent (compare a checksum, not just the size), the declared content type is not trusted on its own (a `.png` that is really an HTML file or an executable must be rejected if the feature claims to allow only images), size limits are enforced at the server and return a clear 413 or validation error, filenames with Unicode, spaces, `../` or very long names are sanitised, an empty file is handled, and a multi-file upload that partly fails leaves a defined state.

Downloads have their own contract: the right `Content-Type`, a `Content-Disposition` header with a safe, correctly encoded filename, access control (another user's file returns 403 or 404), range requests if large files are resumable, and streaming without loading the whole file into memory. Browser tests need the tool's file helpers: Playwright `setInputFiles` and the `download` event, Cypress `selectFile`. Test fixture files should be small, generated in the test or committed under a fixtures folder, and storage should be a temporary directory or a local emulator, never a shared bucket.
</context>

<task>
Write tests for this file transfer feature{{#test_tools}} using {{test_tools}}{{/test_tools}}:

{{feature}}

1. Read the code and write down the rules it should enforce: allowed types and how they are checked (extension, declared type, file signature), maximum size, filename handling, who may download what, storage location, and any processing (thumbnails, virus scan, parsing).
2. Create test files: a valid small file, an empty file, a file just under and just over the size limit (generated in the test, not committed when large), a file whose extension and real content disagree, and filenames with Unicode, spaces and path segments.
3. Write API-level tests for each rule: stored content matches by checksum, rejected uploads return the documented status and message and store nothing, filenames are sanitised, downloads return correct headers, other users cannot download, and missing files return 404. Add range request tests if supported.
4. Add one or two end-to-end browser tests for the main upload and download path using the tool's file helpers, asserting what the user sees and the downloaded file's content.
5. Run the tests and report results, then list what is not covered (real object storage, virus scanning service, very large files).
</task>

<constraints>
- Storage in tests must be a temporary directory, an in-memory store or a local emulator, cleaned up after each test; never a shared or production bucket.
- Do not commit large binary fixtures; generate big files in the test.
- Assert on content, not just status codes.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Rules under test
Table: rule, where enforced, test name.
## Test files
How each fixture file is created.
## Tests
API tests, then end-to-end tests.
## Check
Commands run and results.
## Not covered
Gaps and why.
</output_format>
