---
schema: 1
id: write-letter-of-support
kind: prompt
title: Write a letter of support
description: Writes a letter of support for a grant, planning application, partner organisation or community project with specific commitments and evidence of need, to be signed by an organisation or leader.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive, researcher, manager]
requires: [none]
inputs: [text, notes, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [letter-of-support, grant-application, partnership, planning-application, community-project, endorsement]
subject: [nonprofit]
pairs_with:
  prompts: [write-case-for-support, write-formal-letter, write-project-proposal]
args:
  - name: recipient
    description: Who the letter is addressed to, for example "the Community Fund grants panel", "the planning committee, ref 24/01873/FUL" or "the programme officer at the foundation".
    type: string
    required: true
  - name: project
    description: The project or application being supported, the applicant, what it will do, and the funding call or application reference.
    type: text
    required: true
  - name: supporter
    description: The organisation or person signing, their role, and their relationship with the applicant, for example "head teacher of Riverside Primary, partner school since 2022".
    type: string
    required: true
  - name: commitments
    description: What the supporter will actually contribute, such as cash match, staff time, rooms, data, referrals, equipment or promotion, with quantities.
    type: text
  - name: evidence
    description: Evidence of need or of the applicant's track record that the supporter can vouch for from their own experience or data.
    type: text
output_contract:
  format: markdown
  sections: [Letter, For the signatory to confirm, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Funders, panels and committees read many letters of support and discount the generic ones: "we fully support this excellent project" from a body that commits nothing and knows little. The letters that count show a real relationship, add evidence of need the applicant could not provide alone (the supporter's own waiting list, referral numbers or local knowledge), and make specific, quantified commitments. Panels also notice when several letters share the same wording, so each should read as the supporter's own. A letter of commitment, which binds the supporter to cash or resources, carries more weight and must be signed by someone with authority to commit. Planning committees can only weigh material planning considerations (such as design, amenity, traffic, community benefit), so support for a planning application should speak to those rather than to personal loyalty.
</context>

<task>
Write a letter of support to {{recipient}} from {{supporter}}.

<project>
{{project}}
</project>
{{#commitments}}
<commitments>
{{commitments}}
</commitments>
{{/commitments}}
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. If the project or the supporter's relationship to it is unclear, ask up to two questions and stop.
2. Layout: the supporter's letterhead placeholder, date, the recipient's name and address placeholders, and a reference line with the project title and the funding call or application reference.
3. First paragraph: who the supporter is (one sentence of standing: what they do, scale, area) and the statement of support for the named project and applicant.
4. Relationship: how long and in what way the supporter has worked with the applicant, with one concrete example from the input.
5. Need: the evidence of need from the supporter's own vantage point, with figures from the input. If none is given, write `[need: one figure or observation from your own work, e.g. waiting list, referrals]` rather than inventing one.
6. Commitments: each commitment as a specific, quantified line (what, how much, when, for how long). If none is given, keep the letter to support only, do not imply resources, and suggest under Notes what commitments would strengthen it.
7. For a planning application, frame support around material considerations named in the input (community benefit, design, accessibility, local employment) and avoid irrelevant ones.
8. Close: the expected benefit in one or two sentences and a contact for verification, then a signature block with name, title and organisation placeholders as needed.
</task>

<constraints>
- One page: about 250 to 400 words.
- Use only facts given. Never invent statistics, history, outcomes or commitments, even if asked to make the case stronger; use `[need: …]` placeholders and explain under Notes.
- Write in the supporter's voice, specific to them; avoid stock phrases ("wholeheartedly support", "excellent initiative", "will make a real difference") unless backed by a fact in the next sentence.
- Do not overstate the supporter's authority or describe the letter as a binding commitment unless the input says it is one.
</constraints>

<output_format>
## Letter
The letter, ready for letterhead.
## For the signatory to confirm
Bullets: each commitment, figure and claim the signatory must check, and that they have authority to commit.
## Notes
Placeholders, suggestions to strengthen it, and anything left out on purpose. "None" if nothing.
</output_format>
