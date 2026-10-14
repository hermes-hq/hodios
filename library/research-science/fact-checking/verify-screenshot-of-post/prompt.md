---
schema: 1
id: verify-screenshot-of-post
kind: prompt
title: Verify a screenshot of a post, message or headline
description: Checks whether a screenshot of a social post, chat message, email or news headline is genuine by finding the original, checking archives and looking for signs of fabrication.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, writer, editor, content-creator]
requires: [web]
inputs: [image, text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fake-screenshots, web-archives, media-literacy, misinformation]
pairs_with:
  prompts: [verify-image-provenance, check-post-before-sharing, trace-quote-origin]
  personas: [fact-checker]
args:
  - name: screenshot
    description: The screenshot (attached), or a full description of it, including every visible name, handle, date, time, like count and interface detail.
    type: text
    required: true
  - name: where_seen
    description: Optional. Where you saw the screenshot and who shared it.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, What the screenshot shows, Search for the original, Signs of fabrication, What to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fake screenshots are cheap: browser developer tools, mock-up generators and image editors can produce a convincing post, text message or headline in a minute. The best test is not the pixels but the original: a real public post is usually findable on the platform, in search engines, or in web archives (such as the Wayback Machine or archive.today) even after deletion, and a real headline exists on the outlet's site or in archived copies. Deleted posts leave traces: replies quoting them, news coverage, and archived snapshots. Visual signs help but are weaker evidence: interface elements from the wrong app version or platform, fonts and spacing that do not match, a date or time format that does not match the account's region settings, a verified badge style that did not exist on that date, like counts inconsistent with timestamps, and misaligned text. Private messages and emails usually cannot be verified from a screenshot alone; the honest answer is often "cannot be confirmed".
</context>

<task>
Verify this screenshot.
<screenshot>
{{screenshot}}
</screenshot>
{{#where_seen}}Seen: {{where_seen}}{{/where_seen}}

1. Transcribe what the screenshot claims to show: platform or app, account name and handle, date and time, the full text, engagement numbers and any other visible details.
2. Search for the original: the account's profile and timeline around that date, a search for distinctive phrases, the outlet's site for a headline, and web archives for the account or article URL.
3. Look for traces of a deleted original: replies or quote posts, news coverage, archived snapshots, and any statement from the account holder.
4. Examine the image for fabrication signs, saying which are strong and which are weak evidence.
5. Give a verdict and what to do: share the original link instead, say it cannot be confirmed, or report it.
</task>

<constraints>
- Cite only pages and archives you opened in this session, with links. Never claim an original exists or was deleted without evidence.
- If you have no web access, say so, give no verdict, and list the exact searches and archive lookups to run.
- Treat visual oddities as signs, not proof; image compression and app updates create oddities in genuine screenshots too.
- For private messages and emails, explain the limits of verification and suggest asking the named sender or recipient, without contacting anyone yourself.
- Do not repeat defamatory content from an unverified screenshot beyond what is needed to check it.
</constraints>

<output_format>
## Verdict
One of: genuine (original found), likely genuine (strong traces), unverified, likely fabricated, or fabricated. Then two sentences.
## What the screenshot shows
## Search for the original
Bullets: where you looked, what you found, links.
## Signs of fabrication
Table: sign | strength (strong, weak) | finding.
## What to do
</output_format>
