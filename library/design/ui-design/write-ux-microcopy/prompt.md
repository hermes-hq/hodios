---
schema: 1
id: write-ux-microcopy
kind: prompt
title: Write UX microcopy
description: Writes interface microcopy (buttons, labels, empty states, errors, confirmations, success messages) that is clear, consistent and in the product's voice. Use when designing or reviewing screens.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, writer, product-manager]
requires: [none]
inputs: [text, image, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ux-writing, error-messages, empty-states, content-design]
pairs_with:
  prompts: [write-brand-voice-guide, critique-ui-screen]
  personas: [product-designer]
args:
  - name: screens
    description: The screens or flow needing copy, as screenshots or descriptions of each element, its purpose and its states. Include existing copy to improve, and any length limits.
    type: text
    required: true
  - name: voice
    description: The product's voice (e.g. "plain, warm, never cute") or a short voice guide. Optional; without it the copy is neutral, plain and friendly.
    type: text
output_contract:
  format: markdown
  sections: [Copy, Terminology, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Microcopy fails in predictable ways: buttons that say "OK" or "Submit" when the user needs to know what will happen, errors that blame the user or show a code, empty states that say "No data" and stop, confirmations that ask "Are you sure?" without saying about what, and one object called three different names across a flow. Good microcopy tells people what is happening and what to do next, in as few words as that takes.
</context>

<task>
Write the microcopy for these screens.

<screens>
{{screens}}
</screens>
{{#voice}}
<voice>
{{voice}}
</voice>
{{/voice}}

1. List every string the screens need, including states the input did not mention but the flow implies (loading, empty, error, success, disabled with a reason). Mark added states as "added".
2. Write each string with these patterns:
   - **Buttons and links:** a verb plus the object, saying what will happen ("Delete project", "Send invoice"). The primary button on a dialog repeats the verb of the title.
   - **Labels and hints:** say what to enter; put format requirements in the hint before the user types, not only in the error.
   - **Errors:** what happened, and how to fix it, in plain words. Explain the cause only if it helps the fix. No blame ("you failed to"), no "invalid", no error codes on their own, no exclamation marks.
   - **Empty states:** what will appear here, why it is empty now, and the action that fills it.
   - **Destructive confirmations:** name the object and the consequence, especially if it cannot be undone ("Delete 'Q3 plan'? Its 12 tasks will be deleted too. This can't be undone."). Buttons: "Delete plan" and "Cancel", never "Yes" and "No".
   - **Success messages:** confirm what happened and, if useful, what comes next. Skip them when the result is already visible.
3. Keep terms consistent: one name per object and action across all screens. List the terms you chose.
4. Use sentence case, front-load the key words, and respect any length limits. Avoid idioms and jokes in errors, and write so that strings translate cleanly (no sentence built from fragments).
5. For the 3 to 5 most important strings, give one alternative with a note on the trade-off.
6. If an element's purpose or outcome is unclear (what does "Sync" actually do here?), ask rather than guess, and leave the string marked "needs input".
</task>

<constraints>
- Follow the voice, but clarity wins over personality, and errors and destructive actions are never playful.
- Do not promise behaviour the input does not describe (e.g. "We'll email you" when no email is mentioned).
- Link text must make sense out of context: no "click here" or "learn more" alone.
{{> output/verbosity-spec}}
</constraints>

<output_format>
## Copy
One table per screen: | Element | State | Copy | Characters | Notes |. Mark added states and alternatives.
## Terminology
| Term used | Instead of | Applies to |
## Notes
Voice decisions, open questions and strings marked "needs input".
</output_format>

<examples>
<example>
Before: Error "Invalid input." After: "Enter a date in the format DD/MM/YYYY, for example 07/03/2026."
Before: Empty state "No data." After: "No invoices yet. Invoices you create or import will appear here." Button: "Create invoice".
</example>
</examples>
