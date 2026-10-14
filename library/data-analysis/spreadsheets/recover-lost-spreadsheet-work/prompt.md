---
schema: 1
id: recover-lost-spreadsheet-work
kind: prompt
title: Recover lost spreadsheet work
description: Walks you through recovering an overwritten, unsaved, deleted or corrupted Excel or Google Sheets file using version history, AutoRecover, backups and repair, in the order most likely to work.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, data-analyst, operations-manager, financial-analyst]
stack: [excel, google-sheets]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [file-recovery, version-history, autorecover, corrupted-file, data-loss]
pairs_with:
  prompts: [speed-up-slow-workbook, explain-inherited-spreadsheet]
  personas: [spreadsheet-expert]
args:
  - name: what_happened
    description: What was lost and how - saved over, closed without saving, crash, file will not open, deleted sheet or rows, deleted file - and roughly when.
    type: text
    required: true
  - name: setup
    description: The app and version (Excel on Windows, Mac or web, Google Sheets), where the file lives (local disk, OneDrive, SharePoint, Google Drive, Dropbox, network drive, email attachment) and any backup in use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Stop and protect, Most likely recovery routes, Step-by-step, If nothing works, Prevent it next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get lost spreadsheet work back. The route depends on two facts: what happened, and where the file lives. Files in OneDrive, SharePoint, Google Drive or Dropbox almost always have version history, which is the best route for anything saved over. Excel's AutoRecover and "Recover Unsaved Workbooks" only help for files never saved or closed without saving, and only if AutoRecover was on. Local files may have operating system backups (File History or Previous Versions on Windows, Time Machine on macOS). Corrupted files can often be opened with Open and Repair, then Extract Data, or by opening them in another spreadsheet app. The most common way to make things worse is to keep working in the damaged file, save again, or let a sync client overwrite the last good copy, so the first step is always to stop and copy what exists.
</context>

<task>
Help recover the work.

<what_happened>
{{what_happened}}
</what_happened>

<setup>
{{setup}}
</setup>

1. Stop and protect: tell the user what not to do now (keep saving, empty the recycle bin, run clean-up tools, let the sync client overwrite) and to copy the current file, and any temp or backup files found later, to a separate folder before trying anything.
2. Most likely recovery routes: from the facts, rank the routes that apply, with a one-line reason for each. If a fact that decides the route is missing (where the file is stored, whether it was ever saved), ask one question and give the routes for both answers.
3. Step-by-step: for each route in order, exact steps for this setup. Cover as they apply:
   - Version history: Excel File > Info > Version History for OneDrive and SharePoint files; OneDrive or SharePoint web version history; Google Sheets File > Version history > See version history, restoring or making a copy of an older version; a single cell's history via right-click > Show edit history in Google Sheets; Dropbox or Drive file versions.
   - Unsaved work: Excel File > Info > Manage Workbook > Recover Unsaved Workbooks; the AutoRecover file location shown under File > Options > Save; the Document Recovery pane after a crash.
   - Deleted files: recycle bin or trash, then the cloud service's own recycle bin or trash.
   - Operating system backups: Previous Versions or File History on Windows, Time Machine on macOS, a network drive's snapshots via IT.
   - Corrupted files: File > Open > the arrow next to Open > Open and Repair (Repair first, then Extract Data); setting calculation to manual before opening; opening in Google Sheets, Excel on the web or LibreOffice to rescue values.
   - Email: the copy still in sent or received mail.
4. If nothing works: what the user can still rebuild from (printouts, PDFs, emails, pivot caches in other files, exports) and when to ask IT, since they may hold server backups for a limited time.
5. Prevent it next time: three settings or habits for this setup, such as storing in a synced folder with versioning, a shorter AutoRecover interval, and naming versions before big changes.
</task>

<constraints>
- Give menu paths for the user's app and version only; if a menu name differs by version, say what to look for.
- Do not promise recovery. Say plainly when a route cannot apply (for example AutoRecover does not hold a file that was saved over).
- Do not recommend third-party recovery software that must be downloaded and run; if the user asks, say to ask IT and to work only on a copy.
- Keep steps short; this person may be stressed and on a deadline.
- Ask before assuming: one question at a time, then continue.
</constraints>

<output_format>
## Stop and protect
Three bullets.
## Most likely recovery routes
Ranked list with a reason for each.
## Step-by-step
A numbered section per route.
## If nothing works
## Prevent it next time
Three bullets.
</output_format>
