---
schema: 1
id: check-journal-legitimacy
kind: prompt
title: Check a journal or conference for legitimacy
description: Checks whether a journal or conference is legitimate or predatory using indexing, editorial, peer-review, fee and invitation signals, and lists exactly what to verify and where before submitting.
category: peer-review
version: 1.0.1
status: incubating
stage: [discover, verify]
role: [researcher, student]
requires: [none]
inputs: [text, message, url]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [predatory-journals, predatory-conferences, hijacked-journals, journal-selection, think-check-submit, academic-publishing]
pairs_with:
  prompts: [choose-target-journal, evaluate-source-credibility, write-journal-cover-letter]
  personas: [research-librarian]
args:
  - name: journal
    description: The journal or conference name, plus its website address, publisher, ISSN and any claimed indexing, impact factor or fees you have seen.
    type: text
    required: true
  - name: invitation
    description: The invitation email or call for papers, pasted in full, if you received one.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Signals, Invitation red flags, What to verify, If it is predatory]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "The journal argument takes long text, since it asks for the website, publisher, ISSN, indexing claims and fees."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Predatory journals and conferences take fees without providing real peer review, editing, indexing or archiving, and publishing in one can harm a career and waste good work. Hijacked journals go further by cloning a real journal's name and website. No single list is reliable, so checks combine signals: whether claimed indexing is real (DOAJ, Scopus source list, Web of Science Master Journal List, MEDLINE through the NLM Catalog, noting that being in PubMed Central is not the same as MEDLINE); whether the ISSN is registered; whether claimed memberships (COPE, OASPA) appear on those organisations' own member lists; whether the editorial board are real, relevant scholars who list the role themselves; whether peer review and fees are transparent; whether metrics are genuine (an impact factor comes only from Clarivate's Journal Citation Reports); and the tone and promises of invitations. The Think. Check. Submit. checklist summarises these. Legitimate new or small journals can fail some checks, so the result is a weighed judgement, not a single test.
</context>

<task>
Assess whether this venue is legitimate.
<journal>
{{journal}}
</journal>
{{#invitation}}
<invitation>
{{invitation}}
</invitation>
{{/invitation}}

1. Note what you were given and what is missing (website, ISSN, publisher). If the name is close to a well-known journal, raise the possibility of a hijacked or look-alike journal and say how to find the real journal's official site.
2. Assess each signal from the information given: identity (name, ISSN, publisher, address), claimed indexing and memberships, metrics, editorial board, peer-review description and promised timelines, fees and when they are disclosed, scope (narrow and coherent, or everything from medicine to engineering), archiving and licensing, retraction and correction policy, and for conferences the organiser, venue, past proceedings, and whether the event is repeated under many names. Mark each as concerning, reassuring, or unknown.
3. If an invitation was given, analyse it: flattery, generic greetings, unrelated topic, urgency, promised acceptance or review in days, requests to pay early, and sender address.
4. Give a verdict with a confidence level: likely legitimate, caution (verify before submitting), likely predatory, or cannot tell from the information. Explain which signals drove it.
5. List what to verify and where, in order of how much each check settles.
6. Say what to do if it is predatory or the author has already submitted or paid (withdraw in writing, do not sign copyright transfer, ask for confirmation, contact the institution's library or research office).
</task>

<constraints>
- Do not state that a venue is or is not indexed, a COPE member or on any list from memory; say what to check and where. If you recognise the name, you may say so, labelled as something to confirm.
- Do not call a venue predatory on one signal alone; new and regional journals legitimately lack some markers. Weigh the signals and show the reasoning.
- Avoid relying on any single blacklist or whitelist; explain why lists are a starting point only.
- Be specific and calm; the author may already have submitted.
</constraints>

<output_format>
## Verdict
The verdict, confidence, and the signals behind it in two to four sentences.
## Signals
A table: signal | what you found | concerning, reassuring or unknown.
## Invitation red flags
A list quoting the problem phrases, or "No invitation given".
## What to verify
A numbered checklist: check | where | what a good result looks like.
## If it is predatory
Steps for before and after submission or payment.
</output_format>
