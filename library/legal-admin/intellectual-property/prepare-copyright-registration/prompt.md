---
schema: 1
id: prepare-copyright-registration
kind: prompt
title: Prepare a copyright registration
description: Checks whether registering a work is possible and useful where you are, then prepares the application facts - author, claimant, dates, work type, excluded material and deposit copy.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer, artist, content-creator, software-engineer]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, report, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [registration, authorship, deposit-copy, evidence-of-creation, creators]
pairs_with:
  prompts: [request-content-takedown, assess-rights-in-ai-assisted-work]
args:
  - name: work
    description: What the work is (book, song, photos, software, illustrations), who created it and how (alone, with others, as an employee, with AI tools), when it was finished and first published (if ever), and any material in it that you did not create.
    type: text
    required: true
  - name: country
    description: Where you live and where the work was first published, if anywhere.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Does registration exist and help, Application facts, Material to exclude, Deposit and records, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators prepare to register copyright where that is possible and worth it. What matters: under the main international framework copyright arises automatically on creation in most countries, with no registration needed; some countries run an official optional register, and in at least some of them registration brings real procedural advantages (for example being a precondition for certain court actions or remedies, or evidence that shifts the burden of proof), while elsewhere no official register exists and private "registration" services only create dated evidence. Applications tend to fail or create weak records because of avoidable errors: the wrong claimant (an employer or assignee rather than the author), wrong publication status or dates, a group of works filed under the wrong option, and material the applicant did not create (licensed samples, stock, public domain, AI-generated content) not excluded or disclosed as the office requires.

Country: {{country}}
</context>

<task>
<work>
{{work}}
</work>

1. Does registration exist and help: say whether you are confident an official copyright register exists for the stated country; if not confident, say so and name the official body to check (the national copyright or IP office). Describe the general kinds of benefit registration can bring where it exists, and the alternatives where it does not (dated deposits, keeping drafts and source files, publication records). Do not assert specific legal effects for the country unless certain.
2. Application facts: title, type of work, author or authors, whether made for hire or as an employee, claimant (owner), year of completion, publication status and first publication date and country, and previous registrations. Mark what the user must still confirm.
3. Material to exclude or disclose: anything not created by the user (samples, stock images, quotes, earlier versions, open-source code, AI-generated portions) and how offices commonly expect it to be identified.
4. Deposit and records: what copy of the work is usually deposited, format considerations, and the records to keep regardless (drafts, source files, metadata, contracts).
5. Questions to check on the office's own guidance or with a lawyer before filing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not quote filing fees, forms, form numbers or processing times as fact; point to the official office.
- Do not recommend paid private registration services as equivalent to an official register.
- Do not help claim authorship of material the user did not create.
{{> output/uncertainty}}
</constraints>

<output_format>
## Does registration exist and help
Short paragraph with confidence level.

## Application facts
Table: field | value | to confirm.

## Material to exclude
Bullets.

## Deposit and records
Checklist.

## Questions to check
Numbered.
</output_format>
