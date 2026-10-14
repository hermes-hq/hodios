---
schema: 1
id: design-media-processing-pipeline
kind: prompt
title: Design a media processing pipeline
description: Designs image, video or document processing after upload with queues, workers, transcoding presets, status tracking, storage tiers and CDN delivery.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, devops-engineer]
requires: [none]
inputs: [spec, text]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [media-pipeline, transcoding, image-processing, object-storage, cdn, background-jobs]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [implement-file-upload, design-event-driven-system]
args:
  - name: media
    description: Media types (images, video, audio, PDFs), sizes, what users do with them, and outputs needed (thumbnails, resized images, streaming renditions, previews, text extraction).
    type: text
    required: true
  - name: scale
    description: Uploads per day, average and maximum file size, and how fast results must be ready.
    type: text
  - name: constraints
    description: Cloud provider, managed services allowed, budget, compliance or content moderation needs.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Pipeline, Renditions, Jobs and status, Storage and delivery, Security and safety, Cost drivers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Processing user media is a background job problem with sharp edges. Uploads should go directly to object storage (presigned upload), then an event or queue message triggers processing, so web servers never hold large files. Video transcoding is CPU or GPU heavy and slow; managed transcoding services or adaptive streaming formats are usually cheaper in engineering time than a self-run farm, while images can often be resized on demand at the edge or by an image service with caching. Each job must be idempotent (keyed by the source object and preset), have a timeout, retry transient failures and send poison files to a dead-letter queue. Users need a visible status (uploaded, processing, ready, failed) instead of broken thumbnails. Media files are untrusted input: decoders and document converters have a long history of vulnerabilities, so processing runs in isolated workers with resource limits, validates real file types by content rather than extension, and strips metadata such as GPS location from photos when privacy matters. Storage cost grows forever unless originals and renditions have lifecycle rules. CDN delivery needs cache-friendly URLs, ideally versioned rather than invalidated.
</context>

<task>
<media>
{{media}}
</media>
{{#scale}}
Scale: {{scale}}
{{/scale}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Estimate volume: uploads per day, storage added per month for originals and renditions, and processing minutes per day. Label assumptions.
2. Decide per media type between a managed service, on-demand processing at request time with caching, or self-run workers, and explain the choice.
3. Define the upload path: presigned direct upload, size limits, content-type validation by magic bytes, and a database record created before processing.
4. Define the pipeline: storage event or message, queue, worker per job type, idempotency key, timeouts, retries with backoff, dead-letter handling, and status updates.
5. List renditions with formats and sizes, and say which are eager and which are on demand.
6. Define storage layout, lifecycle rules (infrequent-access tier, deleting abandoned uploads), private versus public objects, signed URLs and CDN caching with versioned URLs.
7. Cover isolation of processing workers, metadata stripping, and where malware scanning or content moderation hooks in if required.
</task>

<constraints>
- Do not route large files through application servers.
- Treat every uploaded file as untrusted; never run converters in the web process.
- Do not quote service prices or limits as facts; name what to check and the unit cost to measure.
- Keep the design proportional to the stated volume.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Managed service, self-run workers or a mix, in at most five lines.
## Pipeline
A Mermaid flowchart from upload to delivered rendition, then one line per stage.
## Renditions
Table: output, format, size or bitrate, when generated (eager or on demand).
## Jobs and status
Queue, idempotency, retries, timeouts, status model visible to the user.
## Storage and delivery
Buckets or prefixes, lifecycle tiers, signed URLs, CDN caching and invalidation.
## Security and safety
Validation, untrusted file handling, malware and moderation hooks.
## Cost drivers
What dominates cost and how to measure it.
</output_format>
