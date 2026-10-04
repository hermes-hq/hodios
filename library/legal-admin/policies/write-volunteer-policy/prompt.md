---
schema: 1
id: write-volunteer-policy
kind: prompt
title: Write a volunteer policy
description: Drafts a plain-language volunteer policy for a charity, club or community group covering recruitment, roles, expenses, safeguarding, data, problems and ending volunteering.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
subject: [law, nonprofit]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [volunteers, community-group, volunteer-expenses, nonprofit-governance]
pairs_with:
  prompts: [write-safeguarding-policy, write-photo-consent-form, write-conflict-of-interest-policy]
args:
  - name: organisation
    description: What the organisation is (registered charity, unincorporated club, school parents' group, mutual aid network), its country, roughly how many volunteers, and whether it has paid staff.
    type: text
    required: true
  - name: activities
    description: What volunteers actually do, for example driving clients, running a food bank shift, coaching, befriending by phone, fundraising events, handling cash or personal data.
    type: text
    required: true
  - name: works_with_children_or_vulnerable_adults
    description: True if any volunteer role involves children or adults at risk. Adds background check and safeguarding sections and points to a separate safeguarding policy.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Before you adopt this, Volunteer policy, Gaps to fill, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft volunteer policies for small charities, clubs and community groups. A good policy tells volunteers what to expect and what is expected of them, protects the people the group serves, and keeps the organisation on the right side of employment, data protection, insurance and safeguarding rules. One trap matters more than most in many countries: if volunteers are paid more than genuine out-of-pocket expenses, given rewards that look like pay, or bound by contract-like obligations, they can be treated as workers or employees with employment rights. So the policy uses the language of mutual expectations and goodwill, not contractual duties, and expenses are reimbursed against receipts. Your job is a practical, readable draft fitted to the group's real activities, with gaps clearly marked for the group's trustees or committee to settle.

Organisation:

<organisation>
{{organisation}}
</organisation>

Volunteer activities:

<activities>
{{activities}}
</activities>

Any role works with children or adults at risk: {{works_with_children_or_vulnerable_adults}}
</context>

<task>
1. If the country is not stated in the organisation description, ask for it and stop, since expenses, background checks and data rules depend on it.
2. Write a short "Before you adopt this" note: who should review it (trustees or committee, and a solicitor or a local volunteer centre or charity support body for anything unusual), and which sections depend on local law.
3. Draft the policy with these sections, adapted to the activities and written in plain language with "we" for the organisation and "you" for volunteers:
   - Why we involve volunteers, and what volunteering here is and is not (not employment; no contract; either side can end it).
   - Recruitment and selection: fair and open recruitment, role descriptions, an informal conversation, references where the role needs them.
   - Induction, training and supervision: what every volunteer gets, and a named contact.
   - Roles and boundaries for each activity listed, including tasks volunteers must not do.
   - Expenses: what is reimbursed (travel, specific costs agreed in advance), how to claim against receipts, and a statement that no flat payments or rewards are made beyond genuine expenses unless the committee has checked the rules.
   - Health and safety, insurance cover for volunteers (to confirm with the insurer), and driving volunteers' own vehicles if relevant (licence, insurance and roadworthiness checks).
   - Confidentiality and personal data: what volunteers may see, how to handle it, and what to do if data is lost.{{#works_with_children_or_vulnerable_adults}}
   - Safeguarding: background or criminal record checks for eligible roles under local rules, safeguarding training, the named safeguarding lead, how to raise a concern, and a reference to the separate safeguarding policy, which this policy does not replace.{{/works_with_children_or_vulnerable_adults}}
   - Equality, inclusion and reasonable adjustments.
   - Recognition and feedback.
   - Problem solving: how a volunteer raises a concern or complaint, and how the organisation handles concerns about a volunteer, fairly and proportionately, in steps rather than as a disciplinary procedure.
   - Ending volunteering: by either side, an exit conversation, return of keys, equipment and data.
   - Review date and who owns the policy.
4. List the gaps the group must fill (named contacts, expense rates, insurer, any check levels) as [BRACKETS] in the policy and in a "Gaps to fill" list.
5. Write questions to check with a local volunteer centre, charity regulator guidance, insurer or a solicitor.
6. Before answering, check that the policy contains no contract-like language ("must work", "notice period", "disciplinary"), no promise of payment beyond expenses, and that every activity listed is covered in roles and boundaries.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state specific legal thresholds, check levels or tax-free expense rates as fact. Put them in [BRACKETS] to confirm locally.
- If the safeguarding flag is false but any activity described involves children or adults at risk, say so at the top and recommend adding safeguarding provisions and a separate safeguarding policy.
- Avoid wording that could create an employment relationship: use "we hope", "we ask", "we will" rather than obligations on the volunteer with penalties.
- Keep the policy readable for volunteers: short paragraphs, plain words, no legal citations unless the user provides them.
</constraints>

<output_format>
## Before you adopt this
Three or four sentences.

## Volunteer policy
The full draft with sub-headings for each section and [BRACKETS] for gaps.

## Gaps to fill
Checklist.

## Questions to check
Numbered, with who to ask.
</output_format>
