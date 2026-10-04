---
schema: 1
id: optimize-image-search-visibility
kind: prompt
title: Optimise images for image search
description: Optimises images so products, work and places appear in image search, covering file names, alt text, captions, page context, sizes and formats, image sitemaps and licence metadata, page by page.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [artist, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [image-search, image-metadata, alt-text, image-licensing, project-photos]
pairs_with:
  prompts: [write-alt-text, optimize-portfolio-for-search, optimize-product-pages-for-search]
args:
  - name: images_and_pages
    description: The pages that matter and their images - page URL and topic, image file names, current alt text, captions, sizes or formats if known, how images are added (gallery widget, lightbox, background image), and whether you license your images.
    type: text
    required: true
  - name: goal
    description: What image search should bring (for example product sales, wedding enquiries, licensing requests, visits to a project page).
    type: string
    default: more visits to the pages the images are on
output_contract:
  format: markdown
  sections: [Priorities, Per-page checklist, File names and alt text, Technical, Licensing, Measure]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help photographers, makers, shops and trades with project photos get their images found. Image search ranks an image largely by the page around it: the page topic, nearby text and caption, the alt text and file name, and whether the image can be crawled at all. Common failures: images loaded as CSS backgrounds or inside script-only galleries that crawlers cannot see, camera file names, empty or stuffed alt text, the same image under many URLs, huge files, and images on pages with no words. Goal: {{goal}}.
</context>

<task>
<images_and_pages>
{{images_and_pages}}
</images_and_pages>

1. Priorities: pick the pages whose images matter most for the goal and say why.
2. Per page, check:
   - images are real img elements with a crawlable src, not CSS backgrounds or script-only galleries; lightbox links point to an image URL or page;
   - the image sits near text that describes it, with a caption where a caption helps a person;
   - the page title and heading match what the image shows;
   - one canonical URL per image, used consistently.
3. File names and alt text: descriptive, hyphenated file names (walnut-dining-table-oiled-finish.jpg); alt text that describes what is in the image for someone who cannot see it, specific and under about 125 characters, no keyword lists; empty alt for purely decorative images.
4. Technical: serve sizes close to display size with responsive variants, modern formats (WebP or AVIF) with a fallback where needed, compression, width and height set to avoid layout shift, lazy loading below the fold but not for the main image, images not blocked in robots.txt, images included in an image sitemap or sitemap image entries when they load in a way crawlers might miss.
5. Licensing (if images are licensed or must be credited): embed IPTC metadata (creator, credit line, copyright notice, web statement of rights) and add image licence structured data with license and acquireLicensePage, so image search can show licence details.
6. Measure: image search filter in the webmaster tool's performance report, and the goal's conversions from those pages.
</task>

<constraints>
- Work only from the supplied pages and images; do not invent image content. If an alt text needs knowledge of what the image shows, write it from the description given or use [X: describe ...].
- Accessibility comes first in alt text; never write alt text that misdescribes an image to target a search.
- Name platform or plugin settings only where confident; otherwise describe what to look for.
- If no pages or images are described, ask for them and stop.
</constraints>

<output_format>
## Priorities
Numbered list of pages with reasons.

## Per-page checklist
Per page: a checklist of fixes, marked done or to do.

## File names and alt text
Table: Current file name | New file name | Alt text | Caption (optional).

## Technical
Bullets with who can do each (you, platform setting, developer).

## Licensing
Fields to add, or "Not needed" with a reason.

## Measure
Three bullets.
</output_format>
