---
schema: 1
id: prepare-marriage-paperwork
kind: prompt
title: Prepare marriage paperwork
description: Plans the legal paperwork to marry or form a civil partnership - giving notice, documents for each partner, foreign nationals, certificates of no impediment, the ceremony and recognition abroad.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [marriage-paperwork, notice-of-marriage, certificate-of-no-impediment, civil-partnership, destination-wedding]
pairs_with:
  prompts: [plan-wedding, legalise-documents-for-use-abroad, prepare-name-change]
args:
  - name: where
    description: Country and city where the legal marriage or partnership will take place, and whether you want a civil ceremony, a religious ceremony, or both.
    type: string
    required: true
  - name: couple
    description: Each partner's nationality, where each lives, any previous marriage (divorced, widowed) and whether either has a visa or immigration status that matters.
    type: text
    required: true
  - name: date
    description: Planned date. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Legal route, Timeline, Documents per partner, Foreign national steps, After the ceremony, Confirm with the registry]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Marriage paperwork trips people up in a few predictable ways. Many countries require formal notice or banns at a local registry a set period before the ceremony, sometimes with a residence requirement before notice can be given. Religious ceremonies are legally valid on their own in some countries and not in others, where a separate civil ceremony is required. Divorced or widowed partners must prove it, often with a final divorce decree or death certificate. Foreign nationals are frequently asked for a certificate of no impediment or certificate of legal capacity from their own country, plus a recent birth certificate, sometimes apostilled and translated, and immigration authorities may need to be involved. A marriage abroad is usually valid at home if valid where it took place, but recognition and registration steps vary, and name changes after marriage follow the rules of each country of nationality.

Where: {{where}}
{{#date}}Date: {{date}}{{/date}}
</context>

<task>
Couple:
<couple>
{{couple}}
</couple>

1. Legal route: civil, religious or both, whether a religious or celebrant-led ceremony is legally recognised in {{where}} (verify), and whether a residence requirement or notice period is likely to apply.
2. Timeline: working back from the date if given, when to give notice, order documents, get apostilles and translations, and book the ceremony, marked verify.
3. Documents per partner: a table listing proof of identity, birth certificate (and how recent), proof of address, evidence of ending previous marriages, certificate of no impediment or legal capacity, and any parental consent if under the legal age, with apostille and translation needs.
4. Foreign national steps: what each foreign partner usually needs from their own country (consulate, certificate of no impediment, visa considerations), and whether a sham-marriage check or immigration interview may occur, without implying suspicion.
5. After the ceremony: marriage certificate copies, registering the marriage in each partner's country if needed, name change steps, and updates to immigration status, tax, and documents.
6. Confirm with the registry: questions to ask.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state notice periods, residence requirements, fees or recognition rules as fact; mark them verify with the registry or consulate.
- Never help with a marriage entered into to deceive immigration authorities, or one where either person is under pressure or not consenting; if there are signs of forced marriage, give support routes and emergency contact advice.
- Where immigration status depends on the marriage, recommend a regulated immigration adviser.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Legal route
Short paragraph.

## Timeline
Dated or relative list, marked verify.

## Documents per partner
Table: document | partner A | partner B | apostille or translation | notes.

## Foreign national steps
Bullets per partner, or "Not applicable".

## After the ceremony
Checklist.

## Confirm with the registry
Numbered questions.
</output_format>
