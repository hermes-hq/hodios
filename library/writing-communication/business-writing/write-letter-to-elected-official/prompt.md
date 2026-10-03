---
schema: 1
id: write-letter-to-elected-official
kind: prompt
title: Write a letter to an elected official
description: Writes a letter or email to an elected representative about an issue with the ask, the local impact, a personal story and evidence, in a form constituent offices act on. Use as a citizen or advocate.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, founder, student]
requires: [none]
inputs: [text, notes]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [advocacy, constituent-letter, civic-engagement, lobbying, petition, local-government]
pairs_with:
  prompts: [write-public-consultation-response, write-formal-letter, plan-persuasive-argument]
args:
  - name: issue
    description: The issue, and if relevant the bill, motion, planning case or decision by name or number, and what is happening with it now.
    type: text
    required: true
  - name: ask
    description: What you want the representative to do, for example "vote against bill HB 1123", "raise the bus cuts with the transport minister" or "help me with my delayed visa case".
    type: text
    required: true
  - name: personal_connection
    description: How the issue affects you, your family, business or community, in your own words. A short true story is the most persuasive part.
    type: text
  - name: representative
    description: The representative's name and office, for example "Senator Maria Lopez" or "Jane Smith MP". Leave empty if you do not know who represents you.
    type: string
  - name: location
    description: Your town or city and postcode or ZIP code, so the office can confirm you are a constituent and the letter can describe local impact.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Letter, Phone script, Before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Elected representatives' offices sort correspondence by whether the writer is a constituent, which issue it concerns and what is asked. Staff tally positions on bills and pass on stories that illustrate local impact; research on legislative offices (the Congressional Management Foundation's surveys of US congressional staff are the best known) consistently finds that individualised messages from constituents, with a specific ask and a personal story, influence offices far more than identical form letters. Many representatives only reply to their own constituents, so a full postal address matters. Letters work when they cover one issue, state the ask in the first lines (with a bill number or decision name if there is one), show the local effect, include a short true story and one or two pieces of evidence with sources, stay respectful, and ask for a reply. Casework, meaning help with a personal problem with a government agency, is a different request from a policy view and needs the case details and often a consent form.
</context>

<task>
Write a letter to {{representative}} about this issue, from a constituent in {{location}}.

<issue>
{{issue}}
</issue>

Ask: {{ask}}
{{#personal_connection}}
<personal_connection>
{{personal_connection}}
</personal_connection>
{{/personal_connection}}

1. If the ask is unclear or covers several unrelated issues, ask which single issue and action matter most and stop.
2. If no representative is named, address the letter to `[Representative name and title]` and explain under Before sending how to find the right one from the location (the official parliament, congress, state or council "find your representative" lookup by postcode or ZIP code), and which level of government handles this issue.
3. Decide whether this is a policy letter or a casework request. For casework, structure it around the case: reference numbers, dates, what has been tried, the help needed, and a note that the office may ask for a signed consent form.
4. Write the letter:
   - Salutation in the form used for that office in the country implied by the location (for example "Dear Senator Lopez", "Dear Jane Smith MP" or "Dear Ms Smith"), or a neutral placeholder if unsure.
   - First paragraph: "As a constituent in [town, postcode]…", the issue, and the specific ask (with bill number or decision name).
   - Local impact: how it affects people in the area, from the input.
   - Personal story: a few sentences in the writer's voice, from the personal connection only. If none is given, write `[need: two or three sentences on how this affects you]` rather than inventing one.
   - Evidence: one or two facts with their source, only if in the input, or `[need: one fact with source]`.
   - Close: restate the ask, request a reply stating the representative's position or action, and thank them.
   - Signature block with full name, postal address, email and phone placeholders.
5. Write a 30-second phone script for calling the office with the same ask.
</task>

<constraints>
- Under about 300 words for the letter; one issue only.
- Use only facts and stories from the input; never invent statistics, bill numbers, quotes or personal experiences.
- Respectful and firm, whatever the representative's party or record: no insults, threats, sarcasm or electoral ultimatums phrased as threats. A plain statement that the issue will matter to the writer's vote is acceptable. If the input asks for threatening or abusive wording, write a firm, respectful version and note why under Before sending.
- Non-partisan framing: argue from the issue and its impact, not from party identity.
</constraints>

<output_format>
## Letter
The letter with signature block.
## Phone script
About 75 words.
## Before sending
Bullets: how to verify the representative and the bill's current status, placeholders, the best channel (the office's web form or email often reaches staff faster than post), and anything changed on purpose.
</output_format>
