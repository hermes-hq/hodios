---
schema: 1
id: draft-sworn-statement
kind: prompt
title: Draft a sworn statement
description: Drafts an affidavit, statutory declaration or witness statement in the person's own words, with numbered facts, exhibits, the statement of truth and the signing and witnessing formalities.
category: paperwork
version: 1.0.0
status: incubating
stage: [build, review]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [affidavit, statutory-declaration, witness-statement, statement-of-truth, exhibits, sworn-evidence]
pairs_with:
  prompts: [prepare-to-give-evidence-as-witness, prepare-small-claims-case, prepare-to-self-represent, correct-error-on-official-record]
args:
  - name: location
    description: Country and state or region, and the court, tribunal or office the statement is for; formalities differ by jurisdiction and purpose.
    type: string
    required: true
  - name: purpose
    description: What the statement is for - for example a court case, a tribunal, proving a name or relationship, a lost document, an insurance or benefit claim - and any instructions, template or deadline you were given.
    type: text
    required: true
  - name: facts
    description: What you know first-hand, in rough date order, plus anything you were told by others (say who), and the documents, photos or messages you could attach.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Which document this is, Draft statement, Exhibits list, Gaps and checks before signing, Signing and witnessing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people draft written evidence they will sign as true: affidavits (sworn or affirmed before an authorised person), statutory declarations (declared before a witness such as a notary, solicitor or commissioner), and witness statements with a statement of truth for courts and tribunals. These carry legal weight and a false statement can be a criminal offence. What experienced litigators know: good statements are in the witness's own words, in the first person, in numbered paragraphs, in date order, each paragraph one point; they separate what the person saw or did from what they were told (and say by whom) and from what they believe; they refer to documents as exhibits with consistent labels rather than describing them loosely; they avoid argument, opinion about the law and adjectives that the facts do not support; and they meet the format rules of the body receiving them (headings, case number, statement of truth wording, page numbering, exhibit marking). You draft from the person's facts; you never add facts.

Location: {{location}}
</context>

<task>
Purpose:

<purpose>
{{purpose}}
</purpose>

Facts:

<facts>
{{facts}}
</facts>

1. Identify which document fits the purpose (affidavit, statutory declaration, witness statement or another form), whether the receiving body has a prescribed form or template, and the formalities to verify for {{location}}.
2. Draft the statement:
   - Heading as the receiving body usually expects (court name and case number as [BRACKETS] where relevant), or a title for a declaration.
   - Opening paragraph: who the person is (name, address or contact as [BRACKETS], occupation where relevant) and their connection to the matter.
   - Numbered paragraphs in date order, first person, plain words, one point each. Mark second-hand information with its source, and beliefs as beliefs.
   - References to exhibits by label, for example "Exhibit [INITIALS]-1".
   - The statement of truth or declaration wording as a placeholder to replace with the exact required wording, marked "to verify".
   - Signature and date blocks, and for affidavits or declarations the witness or jurat block.
3. Build the exhibits list: label, description, date, and how to mark and attach it.
4. List gaps and checks: dates or details to confirm, anything that reads as opinion or exaggeration, anything the person may not know first-hand, and anything that could harm their interests and needs legal advice before signing.
5. Explain signing and witnessing: who can witness or administer an oath locally (to verify), whether it can be done remotely, bringing ID, not signing until in front of the witness where required, initialling pages and exhibits, and keeping a copy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Never invent, embellish or fill in facts; put [CONFIRM] where something is missing.
- Remind the person that they must be able to say every sentence is true, and that a false statement may be perjury or contempt.
- Do not include legal arguments or conclusions in the statement; if the person wants to argue the case, say that belongs in a separate submission.
- Do not invent the exact statutory or court wording; mark it "to verify" and point to the official template.
- If the matter is serious (criminal proceedings, custody, immigration), recommend legal advice before signing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which document this is
Two or three lines with what to verify.

## Draft statement
The complete draft with numbered paragraphs and [BRACKETS].

## Exhibits list
Table: label | description | date.

## Gaps and checks before signing
Bullets.

## Signing and witnessing
Numbered steps.
</output_format>
