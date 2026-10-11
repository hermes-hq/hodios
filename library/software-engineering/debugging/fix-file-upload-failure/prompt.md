---
schema: 1
id: fix-file-upload-failure
kind: prompt
title: Fix failing file uploads
description: Fixes file uploads that fail with 413, time out, arrive empty or corrupted, or break only on mobile, checking size limits at each hop, multipart parsing, presigned URL CORS and content types.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [fullstack-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [none]
inputs: [logs, file, config, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [file-uploads, multipart, presigned-urls, cors, request-size-limits]
pairs_with:
  prompts: [implement-file-upload, debug-network-request]
args:
  - name: symptom
    description: What fails and for which files, for example "413 for files over 1 MB", "upload hangs then fails after 30 s", "file arrives with 0 bytes", "HEIC photos from iPhones are rejected", with the status code and any console or server error.
    type: text
    required: true
  - name: path
    description: Every hop an upload passes through (browser or app, CDN, proxy, load balancer, app server, framework parser, object storage), the upload code on client and server, and any limits you know of.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Upload path and limits, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a full-stack engineer who fixes uploads by listing every hop and its limit, because the smallest limit wins and each hop fails differently:
- Size limits: Nginx `client_max_body_size` (1 MB by default) answers 413 before the app sees anything; cloud load balancers, API gateways and serverless platforms have fixed request size caps (some only a few MB); framework parsers have their own (`multer` limits, Express `body-parser` limit, Django `DATA_UPLOAD_MAX_MEMORY_SIZE` and `FILE_UPLOAD_MAX_MEMORY_SIZE`, ASP.NET `MaxRequestBodySize`, PHP `upload_max_filesize` and `post_max_size`).
- Timeouts: slow mobile connections exceed proxy or platform request timeouts. Large files belong in direct-to-storage uploads with presigned URLs or multipart and resumable uploads, not through the app server.
- Empty or missing files: the client set `Content-Type: multipart/form-data` by hand, dropping the boundary (let the browser set it for `FormData`); the field name differs from what the parser expects; a JSON body parser consumed the stream; the file was read into memory and the stream already ended.
- Presigned URL uploads: the bucket's CORS rules do not allow the origin, method or headers; the `Content-Type` sent does not match the one signed; the URL expired; a PUT signed but a POST sent.
- Mobile: iPhone HEIC images, missing or generic MIME types (`application/octet-stream`), and file type checks based on extension or the client's MIME claim instead of content.
- Corruption: text encoding applied to binary data, or base64 handled twice.
</context>

<task>
Fix this upload failure.

Symptom:
{{symptom}}

Upload path and code:
{{path}}

1. If you can read the repository, open the client upload code, the server route and parser config, and the proxy or platform config before answering.
2. List every hop with its size limit and timeout, marking which are known and which must be checked.
3. Name the hop that fails and why, using the status code and which component produced it (a 413 HTML page from Nginx versus a JSON error from the app). If it cannot be decided, give the checks and stop: response headers showing which server answered, the request in the browser network tab, server logs for the request.
4. Give the fix at that hop as a diff or config: raise the limit consistently along the path to a deliberate maximum, move large files to presigned or multipart direct uploads, stop setting the multipart header by hand, fix the CORS rules or signed content type, convert or accept HEIC, or validate type by content.
5. Give a check: upload a file just under and just over the intended limit, a large file on a throttled connection, and a phone photo.
</task>

<constraints>
- Do not suggest removing size limits entirely; set a deliberate maximum and enforce it on the server, not only in the client.
- Keep file type validation on the server based on content, and keep uploaded files out of executable or public paths unless intended.
- Do not invent platform limits; name the setting to check if you are not sure of the number.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Upload path and limits
Table: Hop | Size limit | Timeout | Known or to check.
## Cause
The failing hop and why, or the checks to run.
## Fix
Diff or config.
## Check
Test uploads to run.
</output_format>
