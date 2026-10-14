---
schema: 1
id: run-final-proof-check
kind: prompt
title: Run the final proof check
description: Runs the last check on a laid-out document before release, covering numbering, cross-references, contents, captions, headers, links, dates and leftover placeholders.
category: editing
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, technical-writer, individual]
requires: [none]
inputs: [document, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [final-proof, cross-references, numbering, pre-publication, layout-check]
pairs_with:
  prompts: [proofread-text, build-style-sheet, proofread-slide-deck, proofread-print-piece-before-ordering]
args:
  - name: document
    description: The laid-out document as text (export or copy from the PDF), including the table of contents, headers, footers, captions and page numbers if you can.
    type: text
    required: true
  - name: document_type
    description: What it is and where it goes, for example "annual report going to the printer", "policy PDF for the intranet", "thesis for submission".
    type: string
    required: true
  - name: release_details
    description: Facts the document must match, such as the publication date, version number, organisation name, the correct contact details or links. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Blocking issues, Other issues, Checked and clean, Check by eye]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The final proof happens after layout, when the text has been edited and proofread already. Its errors are different from sentence-level typos: a figure renumbered after an insertion while the text still says "see Figure 4", a contents page listing the old section titles, a running header carrying the previous chapter's name, "Draft" left in a footer, a "TK" or "[insert date]" placeholder, a caption that no longer matches its table, a weekday that does not match the date. These are the errors that reach print because everyone assumes they were caught earlier. A good final check is systematic, so it lists what it checked as well as what it found, and it is honest that some layout problems (widows, orphans, bad page breaks, image quality, bleed) can only be seen on the page.

Document type: {{document_type}}
{{#release_details}}
<release_details>
{{release_details}}
</release_details>
{{/release_details}}
<document>
{{document}}
</document>
</context>

<task>
1. If the document is missing, ask for it and stop.
2. Numbering: check that headings, sections, figures, tables, equations, footnotes, list items and appendices run in sequence with no gaps or duplicates.
3. Cross-references: check that every "see Section X", "Figure N", "Table N", "Appendix B", "page N" and "above/below" pointer refers to something that exists and says what the pointer implies.
4. Contents and lists: compare the table of contents (and lists of figures or tables) against the actual headings and captions, word for word, and against page numbers where they are visible.
5. Captions and labels: check that captions match what the surrounding text says about the figure or table, and that units and sources are present where the document's own pattern uses them.
6. Running heads, footers and front matter: check that they match the section they sit in, that the title, version, date and organisation name are the same everywhere and match the release details, and that "Draft", "Confidential" or review watermarks are intended.
7. Dates and numbers: check that weekdays match dates (state the weekday you calculate and the year you assumed), that the same figure is quoted the same way everywhere, and that totals shown in the text match tables where both appear.
8. Links and contacts: check that URLs, emails and phone numbers are well-formed and consistent with the release details. You cannot test whether a link works; list them for a click test.
9. Leftovers: find placeholder and editing debris, such as TK, TBC, XX, [insert], Lorem ipsum, tracked-change or comment text, "delete this", doubled spaces at sentence starts if the house style forbids them.
10. Sort findings: blocking (wrong or embarrassing if released) and other (inconsistent or untidy).
</task>

<constraints>
- Do not copyedit or restyle. Report sentence-level errors only if you happen to see one, under Other issues.
- Never assume a fact is right because it appears consistently; if it contradicts the release details, it is blocking.
- Quote the location of every finding (heading, page number or nearby words).
- Say plainly what cannot be checked from text: widows and orphans, page breaks, hyphenation at line ends, image resolution, colours, bleed and margins, fonts.
</constraints>

<output_format>
## Blocking issues
Table: # | Location | Problem | Fix.
## Other issues
Table in the same form. "None" if none.
## Checked and clean
Bullets naming each check from the task that found nothing.
## Check by eye
A short checklist of layout items to verify on the printed or PDF proof, and the list of links to click.
</output_format>
