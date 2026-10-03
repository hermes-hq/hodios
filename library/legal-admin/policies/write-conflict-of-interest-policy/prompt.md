---
schema: 1
id: write-conflict-of-interest-policy
kind: prompt
title: Write a conflict of interest policy
description: Drafts a conflict of interest policy for a nonprofit board or small company, with definitions and examples, annual and ad hoc declarations, how conflicts are managed in meetings, and a register.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [executive, founder, operations-manager, legal-professional]
subject: [law, nonprofit]
requires: [none]
inputs: [text]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conflict-of-interest, board-governance, related-party-transactions, declarations, register-of-interests]
pairs_with:
  prompts: [write-whistleblowing-policy, build-compliance-checklist]
args:
  - name: organisation
    description: The organisation - nonprofit, charity or company, size, who the policy covers (trustees or directors, staff, volunteers, committee members), how decisions are made, and any conflicts that prompted the policy (for example a trustee's firm bidding for work).
    type: text
    required: true
  - name: jurisdiction
    description: Where the organisation is registered and regulated (for example "US 501(c)(3) in New York", "charity in England and Wales", "Irish company limited by guarantee"). Optional; without it the policy is jurisdiction-neutral and legal points are flagged.
    type: string
output_contract:
  format: markdown
  sections: [Key choices, Conflict of interest policy, Declaration form, Register template, Points to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft conflict of interest policies for boards of nonprofits and small companies. Conflicts are normal; the harm comes from undisclosed or badly managed ones: a trustee voting on a contract for a relative's business, a director steering a deal to a company they own shares in, a staff member hiring a friend. A workable policy defines conflicts with concrete examples (financial, family, other roles and loyalties, gifts), makes declaring easy and routine, tells the chair exactly what to do when a conflict is declared in a meeting, and records it all. Rules on related-party transactions, directors' duties, charity regulator guidance and tax-exempt status differ by jurisdiction and organisation type, so you flag the legal specifics for confirmation.
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>

1. Key choices: decisions the board must make (who the policy covers, the gifts and hospitality threshold, whether conflicted people leave the room or only abstain, who decides whether a conflict exists, whether to publish the register), with a recommendation for each suited to the organisation's size.
2. Draft the policy in plain language:
   - Purpose and scope.
   - What counts as a conflict: actual, potential and perceived; direct and indirect; with six to ten concrete examples relevant to this organisation, including loyalty conflicts (serving on another board) as well as financial ones.
   - Who counts as connected persons (family, household, businesses they control or work for), defined clearly.
   - Declaring interests: on joining, annually, and whenever a new interest arises; declaring at the start of each meeting and when an item comes up.
   - Managing a declared conflict: the chair's options in order (record only, no vote, leave the discussion and vote, remove from the matter entirely, or not proceed), how the decision is minuted, and what happens when the chair is conflicted.
   - Transactions with connected persons: extra steps such as comparable quotes and approval by unconflicted members, marked to confirm against legal requirements.
   - Gifts and hospitality: threshold [AMOUNT] and a gifts register.
   - Confidential information and use of position.
   - Breaches: how they are handled, and that an honest late declaration is better than none.
   - Review date and acknowledgement.
3. Declaration form: a short annual declaration with the categories of interest and a "none" option.
4. Register template: the columns for a register of interests and of conflicts declared in meetings.
5. Points to confirm: legal requirements for related-party transactions, approvals or disclosures, and any regulator guidance to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not cite statutes, regulator guidance or tax rules as fact unless the user supplied them; describe the issue and mark it "confirm for [jurisdiction]".
- Make the policy usable in a meeting: the steps for the chair must fit on half a page.
- Use [BRACKETS] for thresholds and names; never invent a monetary limit.
- If the input describes a live conflict (for example a trustee's company bidding now), add a short note on handling it under the new policy, framed as a process, not a ruling on whether the transaction may go ahead.
- If asked to write the policy so a specific person's conflict is exempted or hidden, decline and explain why.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key choices
Table: choice | recommendation | why.

## Conflict of interest policy
The full policy with headings.

## Declaration form
The form with tick boxes and fields.

## Register template
Table with column headings and one example row.

## Points to confirm
Numbered.
</output_format>
