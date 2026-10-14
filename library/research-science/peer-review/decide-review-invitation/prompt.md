---
schema: 1
id: decide-review-invitation
kind: prompt
title: Decide whether to accept a review invitation
description: Weighs a peer-review invitation against your expertise, conflicts of interest, workload and the venue's policies, then drafts a short accept or decline reply that helps the editor.
category: peer-review
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [message, text]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [review-invitation, conflict-of-interest, reviewer-workload, academic-service]
pairs_with:
  prompts: [write-peer-review, check-journal-legitimacy]
  personas: [peer-reviewer]
args:
  - name: invitation
    description: The invitation email as received, including the title, abstract, deadline and any instructions.
    type: text
    required: true
  - name: my_situation
    description: Your field and methods expertise, current workload and reviews in hand, and any link to the authors (collaboration, same institution, supervision, rivalry, competing work).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit, Conflicts of interest, Capacity, Venue checks, Recommendation, Draft reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Editors would rather get a fast, honest decline with a useful suggestion than an acceptance that turns into a late or shallow review. The usual reasons to decline are a real conflict of interest (recent co-authorship, usually within the last three to five years depending on the venue's policy; same department; supervisor or student; personal relationship; a direct competing manuscript or grant), a deadline you cannot meet, or a paper outside your competence. Partial expertise is not a reason to decline if you tell the editor which parts you can and cannot judge. Invitations from unknown or suspicious journals deserve a legitimacy check before you spend any time. Early-career reviewers often over-accept; a sustainable rule of thumb is to review roughly as many papers a year as the reviews your own submissions consume.
</context>

<task>
Help me decide on this review invitation.
<invitation>
{{invitation}}
</invitation>
<my_situation>
{{my_situation}}
</my_situation>

1. Judge fit: which parts of the manuscript (topic, methods, statistics, field context) I can assess competently from what I described, and which I cannot.
2. Check conflicts of interest against the standard categories and say which apply, which might apply and need the editor's view, and which clearly do not. Remind me to check the venue's own definition if I have not.
3. Judge capacity: whether I can meet the deadline with the reviews I already hold, and whether an extension would make it workable.
4. Note venue checks worth doing first: whether the journal looks legitimate, its AI-use and confidentiality policy, whether reviews are signed or published, and any review-credit scheme.
5. Recommend accept, accept with a stated limit (for example "methods only", or a later deadline), disclose and let the editor decide, or decline.
6. Draft a reply of four to eight sentences that fits the recommendation. A decline names the reason briefly and, if I gave any, suggests alternative reviewers by expertise or name.
</task>

<constraints>
- Never suggest specific alternative reviewers by name unless I supplied the names; otherwise describe the expertise the editor should look for.
- When a conflict is borderline, recommend disclosing it to the editor rather than deciding silently either way.
- Do not judge the manuscript's quality from the abstract; the decision is about fit, conflicts and capacity.
- If the invitation shows signs of a predatory venue (flattering mass email, no named editor, fee requests to reviewers, implausible deadline), say so and recommend checking before replying.
- Keep the reply polite and short; do not over-apologise.
</constraints>

<output_format>
## Fit
What I can and cannot judge, as two short lists.
## Conflicts of interest
A table: category | applies? | note.
## Capacity
Two or three sentences.
## Venue checks
Bullets, only those relevant.
## Recommendation
One line, then the deciding reason.
## Draft reply
The email text, ready to send.
</output_format>
