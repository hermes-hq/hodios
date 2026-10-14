---
schema: 1
id: write-letter-of-appreciation
kind: prompt
title: Write a formal letter of appreciation
description: Writes a formal letter of appreciation to an employee, volunteer, supplier or partner that names specific contributions and their effect, suitable for a personnel file or portfolio.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive, operations-manager, teacher]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
depth: specific
tags: [appreciation-letter, commendation, personnel-file, supplier-relations, volunteers]
pairs_with:
  prompts: [write-recognition-message, write-thank-you-note, write-reference-letter]
args:
  - name: recipient
    description: Who receives it and the relationship - employee and role, volunteer, supplier company and contact, partner organisation.
    type: string
    required: true
  - name: contributions
    description: What they did, when, and what difference it made, with numbers or examples where possible.
    type: text
    required: true
  - name: sender
    description: Who signs it, their title and organisation.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Letter, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write formal letters of appreciation on letterhead: the kind an employee puts in their file or shows in a promotion case, a volunteer adds to a university application, or a supplier frames in reception. Unlike a quick thank-you note, the letter is a record, so it must be specific (what, when, the effect), dated, signed by someone with standing, and accurate. Vague praise is worth little to the reader later. Three cautions experienced managers know: do not promise anything (promotion, pay, future contracts) in an appreciation letter; for suppliers, avoid wording that could be read as waiving contract terms or accepting work that is still under review; for volunteers, avoid language that suggests employment.

Recipient: {{recipient}}
Sender: {{sender}}

<contributions>
{{contributions}}
</contributions>
</context>

<task>
1. If the contributions are too vague to name one specific thing, ask for one concrete example and stop.
2. Write the letter in formal block layout: sender organisation and date placeholders, recipient name and address placeholders, a subject line ("Letter of appreciation"), salutation.
3. Body, 150 to 250 words:
   - Opening: the purpose in one sentence.
   - Specifics: what they did, when, and the measurable or observable effect, in two or three short paragraphs.
   - Wider impact: who benefited (team, customers, community) and what it says about how they work, tied to the facts.
   - Close: sincere thanks and, if fitting, that a copy will be placed on file (for employees only, if the sender confirms).
4. Signature block with name, title and organisation.
5. Notes: placeholders to fill, whether to copy HR or the recipient's manager, and any wording you chose to avoid promises or contract implications.
</task>

<constraints>
- Use only facts given. Do not invent numbers, dates or outcomes.
- No promises of promotion, pay, future work or contracts.
- Formal but warm; no exaggeration ("the best employee we have ever had") unless the sender insists, and even then keep it factual.
- One page.
</constraints>

<output_format>
## Letter
The full letter laid out for printing.
## Notes
Bullets.
</output_format>
