---
schema: 1
id: implement-cookie-consent
kind: prompt
title: Implement cookie consent that actually blocks scripts
description: Implements a cookie consent banner that blocks non-essential scripts and cookies until consent, stores the choice with a version, and lets users change or withdraw it later.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, marketer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cookie-consent, consent-banner, privacy, analytics, tag-manager, consent-mode]
args:
  - name: site
    description: The site or app, its framework, and the third-party scripts it loads (analytics, ads pixels, chat widgets, embeds).
    type: text
    required: true
  - name: jurisdictions
    description: Where the users are, for example "EU and UK", "California", "worldwide". This decides opt-in versus opt-out.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Design, Changes, Tests, Verification, For your privacy owner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most cookie banners are decoration: analytics and ad pixels load in the page head and set cookies before the visitor clicks anything, so the banner changes nothing. Regulators in the EU and UK expect prior opt-in for non-essential cookies, a reject option as easy as accept, no pre-ticked boxes, and a way to withdraw consent as easily as giving it. Opt-out regimes such as California's work differently and expect honouring Global Privacy Control signals. Embedded videos, maps and chat widgets set cookies too. Changing the list of vendors or purposes means asking again. The rules differ by jurisdiction and change over time, so the code should make policy configurable rather than hard-code one reading of the law.
</context>

<task>
Implement cookie consent for this site:

{{site}}

Users in: {{jurisdictions}}

1. Inventory: find every script, pixel, iframe embed and cookie the site sets (head tags, tag manager containers, npm SDKs initialised in code, server-set cookies). Classify each as strictly necessary, preferences, analytics or marketing, and mark ones you are unsure about for the privacy owner.
2. If the project already uses a consent management platform, configure that instead of building a banner, and stop to say so.
3. Gate loading: non-essential scripts do not run until their category is granted. Use one of: render them as `type="text/plain"` with a `data-category` attribute and activate on consent; load SDKs dynamically from a consent callback; or for Google tags, set consent mode defaults to denied before the tag loads and update on consent (advanced consent mode still sends cookieless pings before consent, basic mode does not load the tag at all; list that choice for the privacy owner). Replace third-party embeds with a click-to-load placeholder.
4. Build the banner and preferences dialog: accept all, reject all with equal prominence, and per-category toggles off by default; keyboard accessible with focus management; does not block reading the privacy policy.
5. Store the choice (categories, policy version, timestamp) in a first-party cookie or storage; re-ask when the policy version changes; keep it for the configured period.
6. Withdrawal: a persistent "Cookie settings" link (usually in the footer) reopens the dialog; withdrawing stops the scripts on next load and deletes the cookies the site can delete.
7. For opt-out jurisdictions, honour the `Sec-GPC` header or `navigator.globalPrivacyControl` as an opt-out, and provide the opt-out link the privacy owner specifies.
8. Optionally send a consent record to the backend if the privacy owner requires proof of consent, without personal data beyond what is needed.
9. Write tests: on first visit no non-essential script runs and no non-essential cookie is set; accept loads them; reject keeps them off; withdrawing works; a policy version bump re-asks. Run tests and check in a browser if you have a browser tool.
</task>

<constraints>
- This is implementation, not legal advice. Do not state that the result makes the site compliant; list the decisions a privacy or legal owner must confirm.
- Do not pre-tick non-essential categories or hide the reject option.
- Do not invent vendor names, cookie names or retention periods; take them from the code or mark them unknown.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: Script or cookie | Set by | Category | Loaded before consent today?

## Design
Gating method, storage, versioning, withdrawal, opt-out handling.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.

## For your privacy owner
Decisions to confirm: categories, retention, wording, jurisdictions, vendors marked unsure.
</output_format>
