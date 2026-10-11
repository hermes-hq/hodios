---
schema: 1
id: build-accessible-date-picker
kind: prompt
title: Build or fix an accessible date picker
description: Builds or repairs a date or date-range picker with typed entry, a dialog calendar grid with full keyboard support, clear labels and announcements, and native input where it is enough.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [date-picker, calendar-grid, aria-apg, keyboard, date-input]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, fix-form-accessibility, write-accessibility-regression-tests]
args:
  - name: requirements
    description: What the picker must do (single date, range, min and max, disabled dates, locale and first day of week) and the existing component code or file paths if fixing one.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Approach, Implementation, Keyboard model, Tests, Manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most custom date pickers fail because the calendar is the only way in. The single most important accessibility feature is a text input where people can type a date, with the expected format shown in the visible label or hint ("DD/MM/YYYY") and forgiving parsing. The calendar is then an optional helper: a button named "Choose date" (and, when a date is set, "Change date, 14 March 2026") that opens a dialog containing a `grid`, per the ARIA Authoring Practices date picker dialog pattern. Each day cell carries a full accessible label ("Saturday 14 March 2026"), today and the selected date are exposed (`aria-current="date"`, `aria-selected`), and unavailable days are marked `aria-disabled` but stay focusable so the user can learn why. Focus uses a roving tabindex; arrows move by day and week, Page Up and Page Down by month, Shift with them by year, Home and End to week start and end, Enter or Space selects, Escape closes and returns focus to the button. Month changes are announced via the grid's caption or a live region. Native `input type="date"` is acceptable for many forms and much less work, but its look and validation vary by browser; for birth dates, three separate labelled fields (day, month, year) are usually easiest of all.
</context>

<task>
Build or fix an accessible date picker in {{framework}} for:

<requirements>
{{requirements}}
</requirements>

1. Read the existing picker or form code and the project's dialog, button and input components. Decide and state the approach: native `input type="date"`, separate day, month and year fields, or a text input plus calendar dialog. Pick the simplest that meets the requirements.
2. For a custom picker, implement the text input first: label with the format, `autocomplete` where relevant (for example `bday`), parsing that accepts common separators, and errors tied with `aria-describedby` and `aria-invalid`.
3. Implement the calendar button and dialog: a named button that reflects the current value, a modal dialog with a heading for the month and year, previous and next month buttons with names, and a `grid` with column headers for weekdays (abbreviations expanded via `abbr` or labels) in the locale's first day of week.
4. Implement the keyboard model in the context with roving tabindex. On open, focus the selected date, else today, else the first available date. For ranges, announce the start once chosen ("Start date 3 May selected, choose end date") and expose the range on cells.
5. Expose disabled dates with `aria-disabled` and a reason where known; never make them unfocusable holes in the grid.
6. Respect reduced motion for month transitions; make sure the dialog works at 400% zoom and on touch with screen readers.
7. Write tests for typing a date, opening the dialog, arrow and page key navigation, selection, Escape and focus return. Run them and report results. Give a manual check for NVDA and VoiceOver.
</task>

<constraints>
- Never make the calendar the only way to enter a date.
- Use date formatting from the platform (`Intl.DateTimeFormat`) or the project's date library for labels; do not hand-write month names for one locale.
- Do not add a new date library dependency without saying why the existing one cannot do the job.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Two or three sentences with the decision and why.

## Implementation
Code with file paths.

## Keyboard model
Table: key | action.

## Tests
Test code and the command result.

## Manual check
Numbered steps per screen reader.
</output_format>
