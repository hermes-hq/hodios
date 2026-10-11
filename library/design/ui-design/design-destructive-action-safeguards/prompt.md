---
schema: 1
id: design-destructive-action-safeguards
kind: prompt
title: Design destructive action safeguards
description: Decides for each destructive action in a product whether to confirm, offer undo, soft-delete or require typing a name, and designs the dialogs, toasts and recovery screens.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [destructive-actions, confirmation-dialogs, undo, soft-delete, trash]
pairs_with:
  prompts: [spec-delete-and-restore-behaviour, design-account-deletion-flow, write-ux-microcopy, design-empty-and-error-states]
  personas: [product-designer]
args:
  - name: actions
    description: The destructive or hard-to-reverse actions in the product (delete item, remove member, archive project, overwrite, bulk delete, revoke access, send to everyone), what each affects, whether it can technically be reversed, and any incidents of accidental loss.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, ios, android, desktop]
    default: web
output_contract:
  format: markdown
  sections: [Decision rules, Action matrix, Confirmation dialogs, Undo and trash, Bulk and cascading actions, Copy, Accessibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Confirmation dialogs on everything teach people to click "OK" without reading, so the one dialog that matters gets dismissed too. The research-backed pattern is to prefer undo for frequent, reversible actions, keep confirmation for rare, severe or irreversible ones, and make the confirmation specific: name the object, state the consequence and who else is affected, and label the button with the verb ("Delete 14 files"), never "OK" or "Yes". Typing the name to confirm is reserved for the most severe cases. Soft delete with a trash and a stated retention period turns most "irreversible" deletions into recoverable ones.
</context>

<task>
<actions>
{{actions}}
</actions>

Design for {{platform}}. If no actions are listed, ask for them and stop.

1. **Decision rules.** Define the rules for this product, using severity (data lost, people affected, money or access involved), reversibility (technically and practically), and frequency. Typical outcome: frequent and reversible gets undo; rare and reversible gets soft delete; irreversible or affecting others gets a specific confirmation; catastrophic (workspace, production data, all members) gets type-to-confirm plus a delay or second channel where justified.
2. **Action matrix.** Apply the rules to every listed action. Flag actions that should be made reversible rather than confirmed.
3. **Confirmation dialogs.** For each action that needs one: title naming the action and object, body stating consequences and who is affected, the destructive button labelled with the verb and count, the safe button, default focus on the safe option, and whether the destructive button is visually marked.
4. **Undo and trash.** Undo toast duration, placement and behaviour if the user navigates away; trash location, retention period, restore and permanent delete; what happens to shared links and references while in trash.
5. **Bulk and cascading actions.** Show the count and a sample, list dependent items that will also be removed, and handle partial failures.
6. **Copy.** Exact text for each dialog, toast and recovery message.
7. **Accessibility.** Confirmation dialogs use alert-dialog semantics, move focus into the dialog (to the safe action for destructive confirmations) and return it to the trigger on close. Undo toasts are announced to screen readers, reachable by keyboard, pause while hovered or focused, and are not the only route back: keep undo or restore available elsewhere (trash, history) so the time limit does not exclude anyone (WCAG 2.2.1 Timing Adjustable). Danger is not signalled by colour alone.
</task>

<constraints>
- Do not recommend a confirmation for every action; justify each confirmation by severity.
- Never claim an action can be undone or restored unless the given information says it technically can; otherwise mark it [confirm with engineering].
- Destructive buttons never say "OK", "Yes" or "Confirm" alone.
- Do not add friction to cancelling, unsubscribing or leaving that is not justified by real data loss; that is a dark pattern.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision rules
## Action matrix
| Action | Severity | Reversible | Frequency | Safeguard | Reason |
## Confirmation dialogs
## Undo and trash
## Bulk and cascading actions
## Copy
| Surface | Exact text |
## Accessibility
</output_format>
