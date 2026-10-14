---
schema: 1
id: appeal-social-account-suspension
kind: prompt
title: Appeal a social media account suspension
description: Writes an appeal after a social platform suspends or restricts your personal or creator account, matched to the rule the platform cited, with honest facts, evidence and what you have fixed.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, content-creator, marketer]
requires: [none]
inputs: [message, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [account-suspension, platform-appeal, community-guidelines, creator-account, account-restriction]
pairs_with:
  prompts: [recover-hacked-account, report-impersonation-account, reduce-platform-dependence]
args:
  - name: notice
    description: The platform's suspension or restriction notice pasted in full (the rule cited, the content involved if shown, any appeal deadline), and the platform name.
    type: text
    required: true
  - name: what_happened
    description: Your honest account - what you posted or did around that time, whether you think it was a mistake, a misunderstanding, a hacked account or a real breach, and anything you have already done (deleted content, secured the account).
    type: text
    required: true
  - name: account
    description: Account handle, what the account is for (personal, business, creator), how long you have had it, and any previous warnings.
    type: string
output_contract:
  format: markdown
  sections: [What the notice says, Appeal, Evidence to gather, While you wait, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Platform appeals are usually read quickly by a reviewer or partly by automated systems, against the specific rule cited, and many appeal forms have tight character limits. Appeals that succeed answer that rule directly: why the content or behaviour did not break it (with context the reviewer could not see), or, if it did, that it was a one-off, what was removed and what changed. Long, angry or generic appeals ("I did nothing wrong, restore my account") rarely work, and admitting nothing when the breach is obvious undermines credibility. If the account was hacked, the appeal is about security: when access was lost, the suspicious activity, and steps taken to secure it. Appeals should only go through the platform's official channels; services that promise to restore accounts for a fee are a common scam.
</context>

<task>
Write an appeal for this account suspension.{{#account}} Account: {{account}}.{{/account}}

<notice>
{{notice}}
</notice>

<what_happened>
{{what_happened}}
</what_happened>

1. What the notice says: the platform, the rule cited, the content or behaviour involved, the type of action (suspension, restriction, feature limit), and any appeal deadline. If no rule is cited, say so.
2. Decide the honest basis for the appeal from what_happened and say which it is: wrongly flagged (context or a misread), hacked or compromised, or a real breach with a corrective commitment. If the user's account suggests a real breach but they want to deny it, write the corrective version and explain under Notes.
3. Appeal: a full version under about 200 words and a short version under about 500 characters for forms with limits. Name the account, refer to the rule cited, give the specific facts or context, state what has been removed or fixed, and make a single clear request (restore the account or remove the restriction). Calm, factual, no threats or insults.
4. Evidence to gather: screenshots of the notice, the content in context, proof of identity or ownership if the platform asks, security changes made, dates.
5. While you wait: do not create a new account to get around the suspension (usually itself a breach); secure the account (password, two-step verification, connected apps); tell your audience through other channels if needed; ignore anyone offering paid restoration or messaging "from the platform" outside official channels.
</task>

<constraints>
- Never invent facts, follower counts, prior history or what the platform's rules say beyond the notice. Do not quote policy text that the user did not provide; refer to the rule by the name given in the notice.
- Never help to evade a suspension, impersonate someone or create replacement accounts.
- Do not suggest legal threats in the appeal; if the user is a business losing income, mention under Notes that some regions give users extra rights to contest platform decisions, to check locally.
</constraints>

<output_format>
## What the notice says
Bullets.
## Appeal
Full version, then short version.
## Evidence to gather
Checklist.
## While you wait
Bullets.
## Notes
Basis chosen and anything flagged.
</output_format>
