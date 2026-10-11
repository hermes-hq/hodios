---
schema: 1
id: design-print-newsletter
kind: prompt
title: Design a print newsletter
description: Designs a recurring print newsletter for a community group, school, parish or workplace, with format, masthead, section map, page templates and rules volunteers can follow in everyday tools.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, writer, operations-manager, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [print-newsletter, community-publishing, masthead, editorial-layout, template-design]
pairs_with:
  prompts: [design-accessible-print-materials, prepare-print-files, pair-typefaces]
  personas: [art-director]
args:
  - name: newsletter
    description: Who publishes it, who reads it, how often, how it is distributed (handed out, posted, left in a lobby), the tool used to make it (Word, Google Docs, Canva, InDesign) and who maintains it.
    type: text
    required: true
  - name: content
    description: Typical content per issue, for example "chair's letter, 3 news items, events diary, volunteer spotlight, notices". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Reader and job, Format, Masthead, Section map, Page templates, Typography, Images, Production workflow, Rules for editors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A community newsletter is made again and again, usually by volunteers with limited time and an everyday tool, and printed on a photocopier or by a local printer. The design must survive the fifth issue made by someone else at midnight. Recurring newsletters fail when each issue is laid out from scratch, when sections move around so readers cannot find the events diary, when photos are pasted in at random sizes, when small grey text is unreadable for older readers, and when colour designs turn to mud on a black-and-white copier. A strong, stable masthead and a fixed section map do most of the work.
</context>

<task>
Design a print newsletter for: {{newsletter}}
{{#content}}

<content>
{{content}}
</content>
{{/content}}

1. **Reader and job.** Who reads it, where, and what they come for first (dates, news about people, notices). That decides what goes on page 1.
2. **Format.** Size and page count (for example A4 single sheet, or A3 folded to 4 A4 pages; US Letter or Tabloid equivalents), keeping page counts in multiples of 4 if folded or stapled; colour or black and white, and how the design survives photocopying.
3. **Masthead.** Title, issue number and date line, publisher, and a fixed position; how it uses the group's logo or a simple wordmark.
4. **Section map.** Which section goes on which page in every issue, with approximate space, so readers learn where to look; a standing box for contacts and how to contribute.
5. **Page templates.** A 2- or 3-column grid and templates for page 1, inside pages and back page, with spaces for a lead story, short items, a photo, a diary or calendar table and notices.
6. **Typography.** Typefaces available in the stated tool, body size (11 to 12 pt for general readers, larger for older readers), heading levels, line spacing, alignment (left-aligned, not justified, in narrow columns made by non-designers), and contrast.
7. **Images.** Photo sizes fixed to the grid (for example full column or two columns), captions with names only when people agreed, resolution for print, and consent for photos of children.
8. **Production workflow.** Deadline for contributions, who edits, who lays out, proofreading, print method and quantity, and a mailing panel if posted.
9. **Rules for editors.** A one-page set of do and don't rules for volunteers using the template in the stated tool (use styles, do not resize the masthead, cut text rather than shrink it, one photo per item).
</task>

<constraints>
- Use only tools and fonts the volunteers have; if the stated tool is limited, design within it.
- Do not invent news, names or events; use placeholders.
- Photos of identifiable people, especially children, need consent; say so in the rules.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Section map as a table (Page, Section, Space, Notes). Rules for editors as a short checklist that can be printed.
</output_format>
