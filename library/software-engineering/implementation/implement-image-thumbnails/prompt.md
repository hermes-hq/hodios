---
schema: 1
id: implement-image-thumbnails
kind: prompt
title: Implement image thumbnails and variants
description: Implements post-upload image processing that resizes, applies orientation, strips metadata and converts to WebP or AVIF in a background job, with safe input limits and responsive markup.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [images, thumbnails, webp, avif, exif]
pairs_with:
  prompts: [implement-file-upload, implement-background-job]
args:
  - name: image_spec
    description: What images are uploaded and where they are shown, for example "user avatars and product photos, shown in lists, detail pages and emails; stored in S3".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Variants, Pipeline, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer adding image variants after upload. Resizing is one line of code; the traps are in the inputs and the pipeline:
- Decide first whether to pre-generate variants or use an on-the-fly image service or CDN transformation (imgproxy, Thumbor, a cloud image service). Pre-generating suits a few fixed sizes; on-the-fly suits many sizes and design changes.
- Process in a background job after upload, never in the upload request. Store a status (pending, ready, failed) and serve a placeholder or the original until variants exist. Make the job idempotent so retries do not duplicate files.
- Apply EXIF orientation before stripping metadata, or phone photos come out sideways. Strip EXIF and GPS data from public variants, since location data identifies people's homes.
- Untrusted input: check the real type from the file's magic bytes, not the extension; cap the input pixel count to stop decompression bombs (for example `limitInputPixels` in sharp or `MAX_IMAGE_PIXELS` in Pillow); set a timeout and memory limit; decide on HEIC, animated GIF and SVG (SVG is a script risk and should not be served from your origin as-is).
- Convert colour profiles to sRGB so colours match across browsers.
- Formats: WebP is widely supported; AVIF is smaller but slow to encode and has gaps on older devices. Keep a JPEG or PNG fallback where emails or old clients need it.
- Never upscale small images; choose `cover` (crop) or `inside` (fit) per variant.
- Name variants deterministically (original key plus size and format), serve them with long immutable cache headers, and use `srcset` and `sizes` or `<picture>` so browsers pick the right one.
- Backfill existing images with the same job, in batches.
</context>

<task>
Add image variants for:
{{image_spec}}

1. Read the upload path, storage layer, background job system, where images are rendered, and any image library already used (sharp, Pillow, libvips, ImageMagick).
2. Define the variants: name, dimensions, fit, format and fallback, per use.
3. Write the pipeline: trigger, job, input checks, processing steps, storage keys, status updates and failure handling.
4. Implement the job, the status field and migration, the URL helper for variants, and responsive markup where images are rendered.
5. Add a backfill command for existing images that runs in batches and can resume.
6. Write tests with fixture images: rotated phone photo, image with GPS data, oversized pixel count rejected, file with a wrong extension, small image not upscaled, job retried without duplicates.
7. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never trust the file extension or client-sent content type.
- Never publish variants with GPS metadata.
- Do not run the backfill against production storage without confirmation.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Variants
A table: Name | Size | Fit | Format | Fallback | Used where.
## Pipeline
Steps from upload to ready, with failure handling.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Pre-generated or on-the-fly, formats and limits, and why.
</output_format>
