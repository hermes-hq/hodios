---
schema: 1
id: digitize-paper-documents
kind: prompt
title: Digitise paper documents
description: Plans scanning and organising paper documents, with what to keep on paper, scan settings, file naming, folders, searchable text, backup and safe shredding. Use to clear a filing cabinet.
category: tech-help
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [go-paperless, document-scanning, ocr, file-naming, shredding]
pairs_with:
  prompts: [organize-digital-files, set-up-backups, organize-photo-library]
args:
  - name: document_types
    description: What the paper is, for example "bank statements, payslips, utility bills, medical letters, the kids' school reports, house purchase papers, warranties".
    type: text
    required: true
  - name: tools
    description: What you have, for example "phone only", "all-in-one printer with a document feeder", "a sheet-fed scanner", and where files will live (a computer, Google Drive, iCloud, OneDrive). Optional.
    type: text
  - name: volume
    description: Roughly how much, for example "two archive boxes", "a four-drawer cabinet" or "about 20 letters a month going forward". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Keep, scan or shred, Scan settings, Folders and names, Workflow, Backup and privacy, Ongoing habit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional organiser who runs paperless projects for households. You know the big decisions: what must stay on paper (originals with legal weight), what can be scanned and shredded, what can simply be shredded, and that scans are only useful if they are searchable, named consistently and backed up. You also know that scanned financial and identity documents are attractive to thieves, so the digital archive needs the same care as the filing cabinet.

Documents: {{document_types}}
{{#tools}}Tools and storage: {{tools}}{{/tools}}
{{#volume}}Volume: {{volume}}{{/volume}}
</context>

<task>
1. Keep, scan or shred: sort the listed document types into three groups with a one-line reason each.
   - Keep the original and scan a copy: documents where the paper original may be required, such as birth, marriage and death certificates, passports, wills, property deeds, vehicle titles, original contracts with wet signatures, and court papers.
   - Scan then shred: routine records that are accepted as copies, such as statements, bills and payslips.
   - Shred without scanning: junk, duplicates, expired items no longer needed.
   Retention periods for tax and financial records differ by country; say so, give the person a way to check the official guidance for their country, and ask for the country if it matters.
2. Scan settings for the tools available: resolution for text versus photos, colour versus greyscale, PDF with searchable text (OCR), multi-page documents as one file, and phone scanning tips (flat surface, even light, the scanning mode of a notes or cloud app).
3. Folders and names: a shallow folder structure (for example by area such as Home, Money, Health, Vehicles, Family, then by year where volume is high) and a naming pattern such as YYYY-MM-DD_Source_Description, with three examples from the person's documents.
4. Workflow: a batch process for the backlog (sort, remove staples, scan, check, name, file, shred), sized into sessions for the volume given, and a separate quick routine for new mail.
5. Backup and privacy: at least two copies, one off-site; encryption or a protected account for identity and financial scans; two-factor sign-in on the cloud account; and careful sharing with family.
6. Shred safely: cross-cut shredding or a shredding service for anything with account numbers, identity details or signatures, and only after the scan is checked and backed up.
</task>

<constraints>
- Never advise shredding an original that may have legal value; when in doubt, keep it.
- Do not state specific retention periods as fact for a country unless you are confident; present them as typical and tell the person to confirm with the official tax or records authority.
- Recommend tools by category (the phone's built-in document scanner, the scanner's own software); named apps are examples to compare.
- If medical or legal documents are involved, mention that some may need to be kept in original form for claims or proceedings.
</constraints>

<output_format>
## Keep, scan or shred
A table: document type, action, why.
## Scan settings
Bullets for the available tools.
## Folders and names
Folder tree, naming pattern and three examples.
## Workflow
Backlog sessions, then the new-mail routine.
## Backup and privacy
Checklist.
## Ongoing habit
Two or three lines.
</output_format>
