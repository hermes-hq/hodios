---
schema: 1
id: prepare-knowledge-files
kind: prompt
title: Prepare knowledge files for an assistant
description: Turns reference documents into knowledge files an assistant retrieves well, with an inventory, clean-up, topic splits, descriptive names, self-contained sections and retrieval tests.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [build]
role: [individual, operations-manager, teacher, ml-engineer]
requires: [none]
inputs: [document, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [knowledge-files, retrieval, document-preparation, file-naming]
pairs_with:
  prompts: [write-custom-gpt-instructions, build-project-instructions, write-long-document-prompt]
  workflows: [assistant-setup-track]
args:
  - name: documents
    description: The documents you want the assistant to use - names, formats, rough length, how current they are - or paste a sample section.
    type: text
    required: true
  - name: assistant
    description: "Where the files will go, for example \"custom GPT\", \"project in a chat assistant\", \"notebook-style research tool\", \"company retrieval system\"."
    type: string
    default: a chat assistant's project or custom assistant
output_contract:
  format: markdown
  sections: [Inventory, File plan, File template, Before and after, Retrieval tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assistants rarely read every knowledge file in full. Most search them and pull a few matching passages, so what gets found depends on how the files are written. Retrieval works badly with scanned PDFs without a text layer, slide decks whose meaning lives in images, huge files mixing many topics, sections that only make sense with the page before them ("as above, this applies to the second tier"), tables split across pages, several outdated versions of the same policy, and file names like "final_v3.pdf". It works well with clean text, one topic per file or section, descriptive headings, sections that name their subject, dates and versions on every file, and no duplicates.

<documents>
{{documents}}
</documents>
Destination: {{assistant}}
</context>

<task>
1. Build an inventory of the documents with an action for each: keep as is, convert (scanned or image-heavy to text, slides to text notes), split (by topic), merge (scattered pieces of one topic), update or remove (outdated or duplicate), or leave out (personal data, confidential, irrelevant). If you cannot tell a document's content or currency from the description, mark it "check" and say what to look at.
2. Propose a file plan: the final set of files with descriptive names (topic, scope, date or version, such as "returns-policy-uk-2026-09.md"), the format (plain text or Markdown preferred; clean text-based PDFs acceptable), and an index file that lists every file with one line on what it answers.
3. Give a file template: a short header (title, what it covers, who it applies to, effective date, owner, source), then sections with descriptive headings, each section starting with a sentence that names its subject so it stands alone, defined terms spelled out at first use in each section, tables converted to short lists or kept as simple tables with a header row, and an FAQ block of the questions users actually ask.
4. Show a before-and-after rewrite of one section from the documents (or a typical section if none was pasted) to the template.
5. Write retrieval tests: eight questions users will ask, which file and section should answer each, one question the files deliberately do not answer, and how to check the assistant cited the right file.
6. Add a maintenance note: who updates the files, how to replace an outdated file rather than adding a second version, and a review date.
</task>

<constraints>
- Flag any personal data, client data, passwords or confidential material and recommend removing it; anything uploaded may be quoted back to anyone who can use the assistant.
- Do not invent the documents' content; base rewrites only on text the user pasted, or mark the example as illustrative.
- Destination-agnostic: file count and size limits vary by tool and change; tell the user to check them rather than stating numbers as fact.
</constraints>

<output_format>
## Inventory
Table: Document | Action | Reason.
## File plan
Table: File name | Contents | Format. Then the index file.
## File template
One fenced block.
## Before and after
## Retrieval tests
Table: Question | Expected file and section | Check.
Then the maintenance note.
</output_format>
