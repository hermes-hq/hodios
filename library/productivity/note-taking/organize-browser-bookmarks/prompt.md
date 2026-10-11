---
schema: 1
id: organize-browser-bookmarks
kind: prompt
title: Organise browser bookmarks
description: Sorts hundreds of browser bookmarks into a few folders and a toolbar of daily links, finds duplicates and likely dead links, and moves read-later items out to a reading list.
category: note-taking
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, student, software-engineer, researcher]
requires: [none]
inputs: [text, file]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bookmarks, browser, read-later, link-cleanup, folders]
pairs_with:
  prompts: [triage-reading-list, organize-digital-files, process-notes-inbox]
args:
  - name: bookmarks
    description: Your bookmarks as exported (the HTML export opened as text) or a pasted list of titles and addresses with their current folders.
    type: text
    required: true
  - name: browser
    description: The browser or browsers you use and whether bookmarks sync between devices, for example "Chrome on two laptops and Android, synced".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Back up first, Toolbar, Folders, Read later, Duplicates, Check these, Keep it tidy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bookmark collections grow into hundreds of links in "Other bookmarks" and old folders named "New folder (3)". Three kinds of link are mixed together: daily tools (email, calendar, timesheets) that belong on the toolbar, reference links that are revisited occasionally, and read-later links that were never read and are better handled by a reading list. People rarely search bookmarks because the titles are poor. A clean set has a toolbar of no more than about ten daily links (short names or icons), five to eight reference folders by area of life or work, renamed titles where the page title is unhelpful, and duplicates removed. Dead links cannot be checked from a pasted list, but obvious signs (services known to have shut down, very old intranet links, tracking-heavy addresses) can be flagged for a manual check. Most browsers export and import bookmarks as an HTML file, which is also the backup to take first.

Browser: {{browser}}

Bookmarks:
{{bookmarks}}
</context>

<task>
1. Tell the person to export a backup of their bookmarks before changing anything, in general terms for their browser.
2. Classify every bookmark as daily, reference, read-later, duplicate, or check (possibly dead or no longer relevant).
3. Propose a toolbar of up to about ten daily links with short names.
4. Propose five to eight reference folders and place each reference bookmark, renaming unclear titles.
5. List read-later items and suggest moving them to a reading list or read-later tool, with a rule to delete unread ones after a set time.
6. List duplicates (same address or same page with different tracking parameters) and which to keep.
7. List links to check, with why each might be dead or stale.
8. Give a two-minute rule for new bookmarks so it stays tidy, and how sync means changes appear on every device.
</task>

<constraints>
- Do not claim a link is dead; you cannot open links. Say "check".
- Keep every bookmark accounted for in exactly one group.
- Do not remove work or school links that may need an employer's approval to change; flag them instead.
- If a list is very long, process in order and say where you stopped.
</constraints>

<output_format>
## Back up first
## Toolbar
## Folders
Table: Folder | Bookmarks (renamed where needed).
## Read later
## Duplicates
## Check these
## Keep it tidy
</output_format>
