---
schema: 1
id: write-editor-decision-letter
kind: prompt
title: Write a journal editor's decision letter
description: Drafts a journal editor's decision letter from the referee reports and the editor's own judgement, with the decision, essential revisions, optional points and a tone that is fair to authors.
category: peer-review
version: 1.0.0
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
  - name: reviews
    description: The referee reports (as Reviewer 1, 2, 3), their recommendations, and for a revision the authors' response and the reviewers' second-round comments.
    type: text
    required: true
  - name: decision
    description: The editor's decision. accept means accept as is or after checks; minor and major mean revision; reject means no further consideration at this journal.
    type: enum
    enum: [accept, minor, major, reject]
    default: major
  - name: editor_notes
    description: Your own judgement - which concerns are essential, where you side with one reviewer, anything you add yourself, the resubmission deadline, and for a reject whether a new submission or a transfer is welcome.
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
---
<context>
Authors read the decision letter more closely than anything else the journal sends. A good one states the decision in the first lines, tells authors which concerns they must address for the paper to be acceptable and which are optional, resolves conflicting reviewer requests instead of passing them on, and is courteous without false encouragement. Poor letters forward the reviews with a one-line verdict, leave authors to satisfy contradictory demands, promise acceptance after a major revision, or soften a reject so much that authors think a resubmission is invited. The editor owns the decision; the letter must be consistent with the reviews and the editor's stated reasons. Review material is confidential, and some journals restrict the use of AI tools with it.
</context>

<task>
Draft the decision letter{{#journal}} for {{journal}}{{/journal}}. Decision: {{decision}}.

<reviews>
{{reviews}}
</reviews>

<editor_notes>
{{editor_notes}}
</editor_notes>

1. Consistency check. Compare the decision with the reviews and the editor's notes. If the decision seems at odds with them (for example "minor" when a reviewer reports a flaw in the main analysis that the editor does not dismiss), say so and say what would reconcile it. Do not change the decision yourself.
2. Write the letter:
   - Opening: the manuscript title or a placeholder, the decision in plain words in the first two sentences, and one or two sentences on why, in terms of the paper's contribution and the main issues.
   - For accept: any final checks (data availability statement, reporting checklist, figure quality) and the next steps.
   - For minor or major: "Essential revisions", numbered, each stating the problem, why it matters and what would resolve it, with the source (R1, R2 or Editor). Merge overlapping reviewer points. Where reviewers conflict, state which approach the editor prefers, following the editor's notes. Then "Optional suggestions", numbered and short. Then what to submit (a point-by-point response, a tracked or marked version) and the deadline from the editor's notes or a placeholder.
   - For major: say plainly that the revised paper will be re-reviewed and that acceptance is not guaranteed.
   - For reject: the main reasons, stated respectfully and specifically enough to help the authors elsewhere; whether a new submission or a transfer is welcome only if the editor's notes say so; no wording that implies a resubmission is invited when it is not.
   - Close courteously, refer to the full reports below, and leave a signature placeholder.
3. Before you answer, check that every essential revision traces to a reviewer or the editor's notes, nothing in the letter reveals reviewer identity, and the tone matches the decision.
</task>

<constraints>
- Start with one line reminding the user to check that the journal allows AI assistance with confidential review material.
- Do not introduce new scientific criticisms of your own; if you notice a gap, put it in the note to the editor.
- Do not repeat hostile or personal remarks from a review in the letter; flag them in the note to the editor.
- Do not reveal or hint at reviewer identities, and do not promise acceptance.
- If the reviews or the editor's notes are missing or too thin to justify the decision, ask for them and stop.
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
