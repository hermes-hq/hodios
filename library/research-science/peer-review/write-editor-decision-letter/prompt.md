---
schema: 1
id: write-editor-decision-letter
kind: prompt
title: Write a journal editor's decision letter
description: Drafts the author-facing letter for a journal decision already made, from desk reject to accept, with essential and optional revisions, reviewer conflicts resolved and wording that cannot be misread.
category: peer-review
version: 1.1.0
status: incubating
stage: [review, ship]
role: [editor, researcher]
requires: [none]
inputs: [document, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [decision-letter, journal-editor, editorial-decision, revise-and-resubmit, desk-editor]
pairs_with:
  prompts: [write-meta-review, write-peer-review, check-manuscript-reporting]
  personas: [peer-reviewer]
args:
  - name: decision
    description: The editor's decision. accept means accept as is or after final checks; minor and major mean revision; reject-resubmit means reject this version but invite a new submission; reject means no further consideration at this journal; desk-reject means rejected by the editor without external review.
    type: enum
    enum: [accept, minor, major, reject-resubmit, reject, desk-reject]
    default: major
  - name: reviews
    description: The referee reports (as Reviewer 1, 2, 3) and their recommendations; for a revised paper, also the authors' response and the second-round comments. Leave empty for a desk reject.
    type: text
  - name: editor_notes
    description: Your judgement - which concerns are essential, where you side with one reviewer, anything you add, the deadline, and whether a transfer is offered. For a desk reject, your reason (scope, novelty for this journal, a fatal design flaw, missing ethics or reporting items).
    type: text
    required: true
  - name: journal
    description: Journal name and any house rules for decision letters (required elements, how to sign, data-sharing or reporting checklists to request).
    type: string
output_contract:
  format: markdown
  sections: [Consistency check, Decision letter, Note to the editor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adds reject-and-resubmit and desk-reject decisions, takes the decision as already made (weighing the reports belongs to write-meta-review), and makes reviews optional for a desk reject."}
---
<context>
Authors read the decision letter more closely than anything else the journal sends, and they read it for what it lets them do next. A good one states the decision in the first two sentences using the journal's decision category, tells authors which concerns they must address for the paper to be acceptable and which are optional, resolves conflicting reviewer requests instead of passing them on, says exactly what to submit and by when, and is courteous without false encouragement. Poor letters forward the reviews with a one-line verdict, leave authors to satisfy contradictory demands, promise acceptance after a major revision, blur "reject" and "reject and resubmit" so authors cannot tell whether a new submission is welcome, or turn a desk reject into a page of criticism nobody asked for. This prompt drafts the letter once the editor has decided; weighing the reports to reach a decision is a separate job. Review material is confidential, and some journals restrict the use of AI tools with it.
</context>

<task>
Draft the decision letter{{#journal}} for {{journal}}{{/journal}}. Decision: {{decision}}.
{{#reviews}}
<reviews>
{{reviews}}
</reviews>
{{/reviews}}

<editor_notes>
{{editor_notes}}
</editor_notes>

1. Consistency check. Compare the decision with the reviews and the editor's notes. If the decision seems at odds with them (for example "minor" when a reviewer reports a flaw in the main analysis that the editor does not dismiss, or a reason in the notes that is about the authors rather than the paper), say so and say what would reconcile it. Do not change the decision yourself.
2. Write the letter. Every letter opens with the manuscript title and number (or placeholders), the decision in plain words in the first two sentences, and one or two sentences on why, in terms of the paper's contribution and the main issues. Then, by decision:
   - accept: the final checks still needed (data availability statement, reporting checklist, figure files, licence or copyright form) and what happens next (proofs, publication).
   - minor or major: "Essential revisions", numbered, each stating the problem, why it matters and what would resolve it, with its source (R1, R2 or Editor). Merge overlapping reviewer points. Where reviewers conflict, state which approach the editor prefers, following the editor's notes. Then "Optional suggestions", numbered and short. Then what to submit (a point-by-point response, a marked-up version) and the deadline from the notes or a placeholder. For major, say plainly that the revised paper will be re-reviewed and that acceptance is not guaranteed; for minor, say whether it will go back to reviewers or be checked by the editor.
   - reject-resubmit: say that this version is declined and a new submission is welcome, list the changes a new submission would need, and say it will be treated as a new manuscript, possibly with new reviewers.
   - reject: the main reasons, respectfully and specifically enough to help the authors elsewhere; a transfer offer only if the notes include one; no wording that implies a resubmission here is welcome.
   - desk-reject: short. The editor's reason in two or three sentences, that the paper was not sent for review so this is not a judgement of its full scientific merit, and a pointer to more suitable venues only if the notes give one. Do not add criticisms of your own.
   - Close courteously, refer to the reviewer reports below (except for a desk reject), and leave a signature placeholder.
3. Before you answer, check that every essential revision traces to a reviewer or the editor's notes, nothing in the letter reveals or hints at reviewer identity, the decision wording in the opening matches {{decision}}, and the tone fits it.
</task>

<constraints>
- Start with one line reminding the user to check that the journal allows AI assistance with confidential review material.
- Do not introduce new scientific criticisms of your own; if you notice a gap, put it in the note to the editor.
- Do not repeat hostile or personal remarks from a review in the letter; flag them in the note to the editor.
- Do not promise acceptance, and do not invent journal policies, deadlines or transfer options; use placeholders.
- If the decision is anything but desk-reject and the reviews are missing, or the editor's notes are too thin to justify the decision, ask for them and stop.
</constraints>

<output_format>
One reminder line, then:
## Consistency check
Two or three sentences: consistent, or the mismatch and what would resolve it.
## Decision letter
The letter, ready to edit, with placeholders in square brackets.
## Note to the editor
Points for the editor only: reviewer comments not to forward as written, possible conflicts, gaps you noticed, or "None".
</output_format>
