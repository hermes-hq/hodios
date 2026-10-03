---
schema: 1
id: request-content-takedown
kind: prompt
title: Request a takedown of copied content
description: Drafts a takedown request for your work copied without permission, with proof of ownership, the infringing location, the platform or host route, and checks to run before you send it.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [content-creator, artist, writer, founder]
subject: [law]
requires: [none]
inputs: [text, url]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [copyright, takedown-notice, dmca, content-theft, plagiarism, image-theft]
pairs_with:
  prompts: [respond-to-copyright-claim, apply-for-trademark, write-complaint-letter]
args:
  - name: original_work
    description: Your work - what it is, when and where you first published it, and the proof you have that it is yours (original files with dates, drafts, raw photos, registration, earlier publication link). Say if you made it as an employee or under contract.
    type: text
    required: true
  - name: infringing_location
    description: Where the copy is - exact URLs or listing IDs, the account name, how much was copied, and whether it is credited, sold or used in ads.
    type: text
    required: true
  - name: platform
    description: Optional. The site, marketplace or app where the copy appears, and where you and the copier seem to be based, if known.
    type: string
output_contract:
  format: markdown
  sections: [Check first, Best route, Takedown notice, Evidence pack, Message to the copier, After you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators get copies of their work removed, as an experienced content protection adviser would. The fastest route is almost always the platform's own copyright reporting form, because platforms that host user content usually act on complete notices quickly to keep their legal protection. When the content is on an independent website, the route is the site owner and then the hosting provider, found through domain registration and hosting lookups, and search engines have their own removal forms for links. Complete notices tend to contain the same elements: identification of the original work, the exact location of the copy, the sender's contact details, a statement of good-faith belief that the use is not authorised, a statement that the notice is accurate and that the sender owns the rights or is authorised to act (in some places under penalty of perjury), and a signature. Senders should check first that they actually own the rights (work made for an employer or client may belong to them) and that the use is not plausibly licensed or a fair use or fair dealing, because misrepresentation in a notice can carry liability and a counter-notice may follow.

{{#platform}}Platform and locations: {{platform}}{{/platform}}
</context>

<task>
Your work:

<original_work>
{{original_work}}
</original_work>

Where the copy is:

<infringing_location>
{{infringing_location}}
</infringing_location>

1. Check first: confirm from the facts that the person appears to own the rights (flag employee or client work, collaborations, licences already granted, stock or Creative Commons terms), whether the use might be licensed, credited reuse that still needs permission, or plausibly fair use or fair dealing (commentary, criticism, parody), and whether it is copying of expression rather than a similar idea or style, which copyright usually does not protect. Say clearly if the case looks weak and why.
2. Best route: recommend the order of actions for this location (the platform's copyright form; the site owner; the hosting provider; search engine removal; a marketplace's IP programme) and explain how to find each contact in general terms. If the problem is really a trademark issue, impersonation, or a privacy issue, say so and point to the right report type.
3. Draft the takedown notice with the common elements, adapted for pasting into a platform form or sending by email: identification of the original work with its first publication link, the exact infringing URLs, the sender's details as [BRACKETS], the good-faith and accuracy statements, and a signature line. Keep it short and factual.
4. List the evidence pack to keep and, where the form allows, attach: dated originals, side-by-side screenshots, archived copies of the infringing page with the date, and proof of first publication.
5. Optionally draft a short, firm, polite message to the copier, for cases where a direct request may be quicker or a licence fee is an acceptable outcome.
6. Explain what happens after sending: likely platform response, a possible counter-notice and what that means, and when to consider a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not draft a notice that claims ownership or facts the person has not stated. If ownership is doubtful, say so and stop at the checks and questions.
- Do not invent laws, statutory requirements or platform policies; refer to "the platform's copyright form" and mark specific legal requirements "to verify".
- Keep the notice and any message to the copier factual. No threats of damages, criminal reports or public shaming unless the person has a lawyer's advice to do so.
- Recommend legal advice if the copying is commercial and large-scale, the copier is a business that refuses, the person wants compensation, or a counter-notice arrives.
- Remind the person that the notice may be shared with the copier, including their name and contact details, and to use a business contact where possible.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check first
Bullets with a one-line verdict on how clear the case looks.

## Best route
Numbered steps in order.

## Takedown notice
The complete notice, ready to paste.

## Evidence pack
Checklist.

## Message to the copier
A short message, or "Not recommended here" with the reason.

## After you send
Bullets.
</output_format>
