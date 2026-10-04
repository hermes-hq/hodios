---
schema: 1
id: write-reconsideration-request
kind: prompt
title: Write a reconsideration request
description: Helps a site owner with a search manual action understand the notice, check the cleanup against it, and write an honest reconsideration request that documents what was fixed.
category: seo
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [manual-action, penalty-recovery, spam-policies, webmaster-tools]
pairs_with:
  prompts: [review-backlink-profile, diagnose-organic-traffic-drop]
args:
  - name: manual_action_notice
    description: The exact text of the manual action from the webmaster tool - its type, whether it is site-wide or partial, and any example URLs given.
    type: text
    required: true
  - name: cleanup_done
    description: What has been done so far, with numbers and dates - pages removed or rewritten, links removed or disavowed, spam deleted, markup fixed, and how it was done.
    type: text
    required: true
  - name: evidence
    description: What you can share as proof - spreadsheets of outreach, lists of removed URLs, before-and-after examples, policy changes. Links or descriptions. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the notice means, Cleanup check, Before you submit, Reconsideration request, Evidence to attach]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help site owners and freelancers respond to a manual action: a human reviewer at a search engine has found a spam policy violation. Requests fail for three reasons: the cleanup is partial (a few example URLs fixed while the pattern remains), the request blames others or makes excuses, or it promises work that has not been done. A request that works names the cause plainly, shows the full scope of what was fixed with evidence, and explains what stops it recurring. Review can take days to weeks, and a rejected request usually comes back with examples of what remains.
</context>

<task>
<manual_action_notice>
{{manual_action_notice}}
</manual_action_notice>

<cleanup_done>
{{cleanup_done}}
</cleanup_done>

{{#evidence}}<evidence>
{{evidence}}
</evidence>{{/evidence}}

1. Explain the notice in plain words: the type (for example unnatural links to the site, unnatural links from the site, thin content with little or no added value, user-generated spam, structured data issues, cloaking or sneaky redirects, site reputation abuse, pure spam), whether it affects the whole site or part, and what the reviewer will look for.
2. Check the cleanup against the type. For links: removal attempts first, disavow for what could not be removed, the whole pattern not just examples. For content: thin or scaled pages improved substantially or removed, not just noindexed. For user spam: spam removed and moderation in place. For markup: markup matches visible content site-wide. List any gaps.
3. Before you submit: if there are gaps, say so plainly and list what to finish first. Do not draft a request that claims work not done; draft it with [X] where the remaining work will go.
4. Write the request (aim for 250-500 words): what happened and why, in the site's own voice without blame or excuses; what was done, with numbers (pages, links, domains, dates); how it was checked; what changed in process to prevent recurrence; a link to the evidence.
5. List the evidence to attach as shareable documents.
</task>

<constraints>
- Never state that something was fixed unless the cleanup notes say so. No promises the owner cannot keep, no blaming a former agency or competitor as an excuse (stating facts about who did the work is fine).
- Do not predict whether or when the request will succeed.
- If the notice text is missing, ask for the exact wording from the manual actions report and stop.
- Explain that a manual action is different from an algorithmic drop; if there is no notice in the report, there is nothing to request.
</constraints>

<output_format>
## What the notice means
Three to five plain lines.

## Cleanup check
Table: Requirement | Done | Gap.

## Before you submit
Either "Ready to submit" with a reason, or the numbered list of work to finish.

## Reconsideration request
The draft text.

## Evidence to attach
Bullets: document, what it shows.
</output_format>
