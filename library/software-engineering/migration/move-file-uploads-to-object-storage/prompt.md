---
schema: 1
id: move-file-uploads-to-object-storage
kind: prompt
title: Move existing file uploads to object storage
description: Moves user uploads from local disk or database blobs to S3-compatible object storage, with a key scheme, private access via signed URLs, verified batch copy and no broken links.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [backend-engineer, fullstack-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [object-storage, s3-compatible, signed-urls, file-migration, blob-storage]
pairs_with:
  prompts: [implement-file-upload, set-up-storage-bucket, test-file-uploads-and-downloads]
  personas: [migration-engineer]
args:
  - name: app
    description: Framework, where uploads are stored now (disk path, database column, NFS), how they are referenced and served, file count and size, and the target storage provider.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current state, Target design, Code changes, Copy and switch, Clean-up, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moving uploads off a server's disk is usually forced by a second server, a container platform with ephemeral disks, or a database bloated with blobs. The parts that go wrong are references and access, not the copy. Store object keys in the database, not full URLs, so buckets, CDNs and signing can change later. Keys should not be raw user file names: sanitize and namespace them (by owner or record id plus a random part) to avoid collisions and enumeration, and keep the original name as metadata for downloads. Files that were protected by app logic must stay private, served with short-lived signed URLs, never a public bucket; signed URLs embedded in cached pages expire, so pages must generate them on render. Set `Content-Type` and `Content-Disposition` at upload, or browsers render or download files wrongly. Copy with an idempotent, resumable job and verify by size and checksum; multipart upload ETags are not plain MD5 sums. During the move, either write new files to both places or read from object storage with a fallback to the old location, so nothing breaks mid-copy. Blobs removed from a database do not free disk until the table is vacuumed or rebuilt.
</context>

<task>
App: {{app}}

1. Read the upload, download, delete, thumbnail and export code paths and find every place a file path or URL is stored or built, including templates, emails and API responses.
2. Design the bucket layout, key scheme, access model, metadata, lifecycle rules and CDN use, and the storage abstraction the code will call.
3. Change new uploads to go to object storage (or both locations during transition), and change reads to object storage with a fallback to the old location.
4. Write the copy job: batched, resumable, idempotent, preserving content type, verifying size and checksum, writing the key back to each record, and logging failures.
5. After the copy, switch all reads to object storage, remove the fallback, and check old links: redirect old public paths if they were ever shared.
6. Plan clean-up of old files only after verification and a backup, as a step the user confirms. Run tests and an end-to-end upload and download check.
</task>

<constraints>
- Do not make previously protected files public; use signed URLs or a proxy.
- Do not delete local files or database blobs; leave deletion to the user after verification.
- Do not hardcode credentials; read them from the app's existing configuration mechanism.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Current state
Where files live, how they are referenced, counts and total size.
## Target design
Bucket layout, key scheme, access model (private with signed URLs or public), metadata, CDN.
## Code changes
Upload, download, delete and processing paths, with files touched.
## Copy and switch
Dual write or read fallback, batch copy with verification, reference rewrite.
## Clean-up
When and how old files are removed, with the confirmation required.
## Remaining risks
Bullets, or "None".
</output_format>
