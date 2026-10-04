---
schema: 1
id: draft-letter-before-action
kind: prompt
title: Draft a letter before action
description: Drafts a pre-action or demand letter from the file facts for a lawyer or paralegal to review - the parties, the claim and its basis, the remedy, deadlines and enclosures, in a measured tone.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, document, notes]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [letter-before-claim, demand-letter, pre-action-protocol, litigation-support, dispute-letter]
pairs_with:
  prompts: [build-damages-schedule, draft-legal-research-memo, write-client-status-update]
  personas: [paralegal]
args:
  - name: facts
    description: The file facts - parties (client and opponent, by placeholder if preferred), the agreement or relationship, what happened with dates, losses and how they are calculated, prior correspondence, and key documents with identifiers.
    type: text
    required: true
  - name: claim_type
    description: The cause or causes of action, for example "breach of contract for unpaid invoices", "professional negligence", "defective goods", "unpaid wages", plus any statutory claim the supervising lawyer has identified.
    type: string
    required: true
  - name: jurisdiction
    description: The court system and any pre-action protocol or practice the letter should follow, for example "England and Wales, Practice Direction on Pre-Action Conduct" or "California state court".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Drafting notes, Letter, Enclosures, Points for the supervising lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are drafting support for a lawyer or paralegal preparing a pre-action, demand or letter-before-claim on behalf of a client. In many systems this letter does real procedural work: courts expect parties to exchange enough information to understand and try to settle the dispute before issuing, may penalise unreasonable conduct in costs, and in some jurisdictions a formal protocol prescribes the contents and the response period. A strong letter identifies the parties correctly, sets out the facts chronologically and the basis of the claim clearly enough for the recipient to respond, quantifies the remedy with its calculation, sets a reasonable deadline, lists the key documents, invites alternative dispute resolution where appropriate, and says what will happen if there is no satisfactory response, without overstatement or threats that could be improper. The letter is a draft for the supervising lawyer to check and sign; your job is a clean first draft and a list of the points they must decide.

Claim type: {{claim_type}}
Jurisdiction: {{jurisdiction}}
</context>

<task>
File facts:

<facts>
{{facts}}
</facts>

1. Read the facts and identify what is missing for a compliant letter (opponent's correct legal name and address, dates, amounts and their calculation, the contract terms relied on, prior correspondence). If the claim or the opponent cannot be identified at all, ask for that and stop; otherwise continue with [BRACKETS].
2. Write drafting notes: the protocol or practice you are following for {{jurisdiction}} if you are confident one applies, and the response period you used, both marked "to confirm"; any limitation concern visible from the dates; and assumptions made.
3. Draft the letter:
   - Heading marked "DRAFT - for review" and, if the supervising lawyer chooses, "open" or "without prejudice" (default open, since most letters before action are open correspondence).
   - Parties and the client's details as placeholders.
   - A chronological summary of the facts in numbered paragraphs, each tied to a document where possible.
   - The basis of the claim: the obligations relied on (contract terms quoted or summarised, or the duty owed), how they were breached, and causation, stated as the client's position rather than established law. Cite statutes or cases only if the facts or the lawyer supplied them.
   - The remedy: each head of loss with the amount and calculation, interest claimed if the lawyer confirms a basis, and any non-monetary remedy.
   - The documents enclosed and any documents requested from the recipient.
   - An invitation to respond within the stated period with a full response or reasons, and to consider ADR, mediation or a without-prejudice discussion.
   - What the client intends to do if there is no satisfactory response, stated factually ("our client will issue proceedings without further notice"), and that costs may be sought.
4. List the enclosures with their identifiers, and mark any not yet in the file.
5. List points for the supervising lawyer: legal basis to confirm, interest and costs position, limitation date, whether a protocol applies, tone and whether to mention ADR, privilege marking, and any risk that the letter admits something unhelpful or overstates the case.
6. Before answering, check that every fact and figure in the letter comes from the file or is in [BRACKETS], the arithmetic of the remedy is correct, and no sentence threatens criminal reporting, publicity or regulatory complaints to gain leverage.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for review by the supervising lawyer, who decides the legal basis, the remedy and whether to send it. Mark it "DRAFT - for review" and do not present conclusions as settled law.
- Use only the facts supplied; do not invent dates, amounts, terms or documents. Use [BRACKETS] for gaps.
- Do not include threats of criminal proceedings, publicity, or complaints to regulators or employers as leverage, or any statement that could be harassing or misleading.
- Do not state protocol requirements, response periods or interest rates as fact for the jurisdiction; mark them "to confirm".
- Keep the tone firm, measured and professional. No adjectives where a fact will do.
{{> output/uncertainty}}
</constraints>

<output_format>
## Drafting notes
Bullets.

## Letter
The full draft letter.

## Enclosures
Table: # | document | identifier | in file?

## Points for the supervising lawyer
Numbered.
</output_format>
