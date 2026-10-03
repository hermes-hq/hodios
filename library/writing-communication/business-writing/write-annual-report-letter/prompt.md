---
schema: 1
id: write-annual-report-letter
kind: prompt
title: Write an annual report letter
description: Writes the chair's or CEO's letter for an annual report with the year's story, results with numbers, setbacks owned, thanks and the year ahead. Use for companies, nonprofits and associations.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [executive, founder, writer, manager]
requires: [none]
inputs: [text, notes, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [annual-report, ceo-letter, chair-letter, shareholder-letter, impact-report, stakeholder-communication]
pairs_with:
  prompts: [write-executive-summary, write-case-for-support, write-team-newsletter]
args:
  - name: organisation
    description: The organisation, what it does, its size and who reads the report, for example "regional food bank, 40 staff and 600 volunteers, read by donors, partners and the council".
    type: string
    required: true
  - name: year_results
    description: The year's results with figures, compared with last year and with the goals set, plus the main achievements and milestones.
    type: text
    required: true
  - name: setbacks
    description: What went wrong or fell short, and what was learned or changed. Letters with no setbacks read as spin.
    type: text
  - name: priorities_next_year
    description: Next year's priorities, ideally with measurable goals and dates.
    type: text
  - name: signatory
    description: Who signs and their title, for example "Dr Amara Osei, Chair of the Board" or "Jonas Weber, CEO".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Letter, Figure check, Review before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The chair's or CEO's letter is the most-read page of an annual report and the one most often written as boilerplate: "a year of challenges and opportunities", a list of activities, thanks to "all our stakeholders". The letters that are remembered and trusted (Warren Buffett's shareholder letters are the usual example) tell the year as a story with a point of view, give the results with numbers against the goals that were set, own the misses specifically and say what changed, thank people for specific things, and commit to measurable priorities. For nonprofits, the reader wants impact (people helped, outcomes) more than activity (events held). For listed companies and regulated bodies, every figure must match the audited accounts elsewhere in the report, and forward-looking statements need care and review.
</context>

<task>
Write the annual report letter for {{organisation}}, signed by {{signatory}}.

<year_results>
{{year_results}}
</year_results>
{{#setbacks}}
<setbacks>
{{setbacks}}
</setbacks>
{{/setbacks}}
{{#priorities_next_year}}
<priorities_next_year>
{{priorities_next_year}}
</priorities_next_year>
{{/priorities_next_year}}

1. If the results give no figures or concrete outcomes at all, ask for the three to five most important numbers and stop.
2. Find the year's story: one sentence that captures what the year was about (a turnaround, a hard year with lessons, growth that strained the organisation). Build the letter around it.
3. Write the letter in this order, with a few short sub-headings if it runs past about 600 words:
   - Opening: the year's story in two or three sentences, from the signatory's point of view.
   - Results: the most important three to five numbers, each compared with last year or with the goal where the input gives it, and what they mean for the people the organisation serves or its owners.
   - Setbacks: what fell short, owned in the first person plural, with what was learned and changed. If no setbacks were given, add a `[need: the year's main setback or miss]` placeholder and say under Review why including one builds trust.
   - People: specific thanks (staff, volunteers, members, donors, partners, customers) tied to things they did, from the input.
   - The year ahead: the priorities, measurable where possible, and how progress will be reported.
   - Close and signature block.
4. Match register to the organisation: a nonprofit letter leads with impact and the people served; a company letter speaks to owners and customers; an association letter speaks to members.
</task>

<constraints>
- About 600 to 900 words unless the input asks otherwise.
- Use only the figures and facts given; never invent numbers, quotes, names or achievements. Mark gaps `[need: …]`.
- Never describe a decline as growth or bury a miss in euphemism ("a year of consolidation" for falling revenue). If the input asks for spin, state the result accurately and say why under Review before publishing.
- No forecasts or guarantees of future financial performance; describe priorities and goals as goals.
- No clichés: "challenges and opportunities", "unprecedented", "journey", "stakeholders" as a catch-all.
</constraints>

<output_format>
## Letter
The letter with its signature block.
## Figure check
A table: each figure used, where it appears in the letter, and its source in the input. Readers check these against the accounts.
## Review before publishing
Bullets: figures to reconcile with the audited accounts, statements for legal or investor-relations review if applicable, placeholders, and anything rewritten for accuracy.
</output_format>
