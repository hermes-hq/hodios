---
schema: 1
id: answer-photo-usage-request
kind: prompt
title: Answer a photo usage request
description: Helps a photographer answer someone who wants to use their photo, working out the use, the terms to offer, how to set a fee and a reply that says yes, yes with conditions, or no.
category: photography
version: 1.0.0
status: incubating
stage: [ship]
role: [artist, individual, consultant]
subject: [law]
requires: [none]
inputs: [message, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [photo-licensing, usage-rights, exposure-requests, image-credit, licensing-fees]
pairs_with:
  prompts: [prepare-photo-competition-entry, critique-photograph]
  personas: [photography-mentor]
args:
  - name: request
    description: The message you received, pasted in full, and anything you know about the sender (business, charity, publication, individual).
    type: text
    required: true
  - name: photo_and_stance
    description: The photo (subject, whether identifiable people or private property are in it, whether you have releases), whether it is already licensed elsewhere, and what you want (paid only, free for good causes with credit, never for ads).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they are asking for, Things to check, Terms to offer, Setting a fee, Reply, Record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a working photographer who licenses images to publications, brands and charities. Requests are often vague ("can we use your photo on our site? We'll credit you"), and the answer depends on the use: editorial or commercial, where and how big, for how long, in what territories, whether it is exclusive, and whether it will be edited. Commercial use of photos showing identifiable people or private property usually needs releases the photographer may not have. Licence fees are set from the use, not the hours spent shooting, and saying yes for free once often becomes the expected price. A clear written licence of what was agreed protects both sides.

<request>
{{request}}
</request>

Photo and stance: {{photo_and_stance}}
</context>

<task>
1. If the request or the photo details are missing, ask and stop.
2. What they are asking for: restate the use in licence terms (editorial or commercial; media such as web, social, print, advertising; size or placement; duration; territory; exclusivity; edits allowed; credit). List what the request does not say and needs to be asked.
3. Things to check: whether the photo is already licensed exclusively elsewhere, whether people or property in it need releases for this use, whether the sender seems legitimate (a real organisation, a verifiable contact), and red flags such as a request to transfer copyright.
4. Terms to offer, fitting the user's stance: the scope to grant (narrow by default), credit format, a fee or the free-use conditions, no transfer of copyright, and what happens for further uses.
5. Setting a fee: the factors that move the price (commercial vs editorial, reach, duration, exclusivity, prominence) and how to research going rates (published licensing calculators, stock agency prices for similar use, peers). Do not state a figure as the market rate; if the user wants a number, give a reasoned range they can adjust and label it as an estimate.
6. Reply: a short, friendly message for the right outcome (yes with terms and fee, yes free with conditions, or a polite no), plus a version asking the missing questions first if the request is too vague.
7. Record: what the written agreement or confirming email should contain, as a checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never advise transferring copyright or granting unlimited use by default.
- Do not state copyright, release or privacy law for any country as fact; say what to check and when a lawyer or a photographers' association can help.
- Do not invent market rates or the sender's details.
</constraints>

<output_format>
## What they are asking for
## Things to check
## Terms to offer
Table: Term | What to offer.
## Setting a fee
## Reply
## Record
Checklist.
</output_format>
