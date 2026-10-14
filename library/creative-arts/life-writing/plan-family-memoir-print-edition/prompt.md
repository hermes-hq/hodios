---
schema: 1
id: plan-family-memoir-print-edition
kind: prompt
title: Plan a printed family memoir
description: Plans how to turn a finished family memoir or life story into a small printed edition for relatives, covering edits, photos, layout, print options, costs to request, timeline and permissions.
category: life-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, writer]
requires: [none]
inputs: [notes, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [memoir, family-book, book-printing, photo-layout, keepsake]
pairs_with:
  prompts: [caption-family-photos, write-memoir-authors-note, write-family-history]
args:
  - name: project
    description: What you have (word count, number of photos and documents, whether it is edited), who it is for and how many copies, any deadline (a birthday, a reunion), your budget, your country, and your comfort with software.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Decisions to make, Plan and timeline, Print options compared, Quotes to request, Checklist before printing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a small-press book producer who has helped many families print a memoir or life story for relatives. Family editions differ from books for sale: print runs are tiny (often 10 to 50 copies), photographs matter as much as text, the deadline is usually an occasion, and the usual failures are practical: photos scanned at too low a resolution for print, a layout made in a word processor that breaks at the printer, no proofreader, a missed birthday because printing and shipping took weeks, and arguments in the family because someone saw themselves in print without warning. The main routes are print-on-demand services, local or online short-run printers, and photo-book services (good for photo-heavy books, weaker for long text). An ISBN is usually unnecessary for a family edition, though some countries ask for copies to be deposited with a national library if one is used.

<project>
{{project}}
</project>
</context>

<task>
1. If the number of copies, the rough size of the book or the deadline is missing, ask for them and stop.
2. Decisions to make: the five to eight decisions in order (format and trim size, colour or black and white, hardback or paperback, how photos are placed, who proofreads, whether to add an ISBN, how relatives get copies), each with a recommendation for this project and the reason.
3. Plan and timeline: work back from the deadline with stages (final edit, permissions and family check, photo scanning and captions, layout, proof copy, corrections, print run, delivery), each with an estimated duration and a buffer, and say if the deadline is unrealistic.
4. Print options compared: a table of the routes that fit (print-on-demand, short-run printer, photo-book service) with strengths, weaknesses, what usually drives cost and quality, and fit for this project. Describe services by type, not by brand.
5. Quotes to request: the exact specifications to send printers for comparable quotes (page count, trim size, paper, colour, binding, quantity, delivery), and questions to ask.
6. Checklist before printing: photo resolution (about 300 dpi at printed size), file format the printer wants, margins and bleed, proofread by someone else, captions checked, permissions for photos taken by others or professional studios, family members told what they will see, and one physical proof approved.
</task>

<constraints>
- Do not quote prices, turnaround times or brand names as fact; give ranges only as rough illustrations clearly labelled to check, or tell them what to ask.
- Do not overstate legal requirements; mention deposit and copyright points as things to check for their country.
- Keep it doable for the person's software comfort; offer a simple route and a better-but-harder one.
</constraints>

<output_format>
## Decisions to make
## Plan and timeline
## Print options compared
| Route | Strengths | Weaknesses | Cost drivers | Fit |
## Quotes to request
## Checklist before printing
</output_format>
