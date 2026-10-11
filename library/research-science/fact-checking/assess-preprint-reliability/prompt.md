---
schema: 1
id: assess-preprint-reliability
kind: prompt
title: Judge how far to trust a preprint
description: Judges how much weight a preprint can bear before you cite or share it, from methods red flags, versions, public comments and later publication, and says how to word it.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, writer, editor, student]
requires: [web]
inputs: [document, url, text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [preprints, study-appraisal, science-news, open-science]
pairs_with:
  prompts: [check-science-news-against-paper, explain-state-of-evidence, check-references-for-retractions]
  personas: [fact-checker]
args:
  - name: preprint
    description: The preprint's link, title and server, or its pasted abstract and methods.
    type: text
    required: true
  - name: intended_use
    description: What you want to do with it, for example "cite it in my thesis", "quote it in a news story" or "share it with my patients' group".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, What the preprint claims, Reliability checks, What has happened since, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A preprint has passed a server's basic screening, not peer review, but peer review is a weak filter anyway, so the useful question is not "is it peer reviewed?" but "does this particular study hold up, and has anything happened to it since?". Preprint servers keep versions, and a later version may change the numbers or the conclusions; many preprints are later published, sometimes with big changes, and some are withdrawn. Public comments on the server, community review platforms and expert reactions often find problems first. The red flags are the same as for any study: a small or unrepresentative sample, no control group, many outcomes with one highlighted, a causal claim from an association, unusual statistics, missing data or code, and a press release that arrived before anyone could check it. The weight a preprint can bear also depends on the use: a thesis citation that says "preprint" is fine; a news headline or health advice based on one unchecked preprint is not.
</context>

<task>
Assess this preprint for this use: {{intended_use}}
<preprint>
{{preprint}}
</preprint>

1. State the main claim, the design, the sample and the size of the key result in the preprint's own terms.
2. Check the study against the red flags: design fit for the claim, sample size and selection, control or comparison, pre-registration, number of outcomes and which one is headlined, statistics, data and code availability, conflicts and funding.
3. Check what has happened since: the latest version and what changed, a withdrawal notice, a journal publication (compare the published version's conclusions), public comments and community reviews, and replications or contradicting studies.
4. Weigh the claim against the wider evidence: does it fit, extend or contradict what better-established work shows? An outlier result needs more support.
5. Give a verdict for the stated use and suggest wording that conveys the right level of confidence.
</task>

<constraints>
- Cite only pages you opened in this session. Never invent a version history, journal publication, comment or replication.
- If you have no web access, say so, assess only from the text supplied, and list the checks still needed (versions page, journal search by title, comments, expert reactions) before relying on it.
- Being a preprint is not itself a reason to reject a study, and publication in a journal is not proof it is right. Judge the methods.
- For health claims, say that a single preprint should not change anyone's treatment, and do not give medical advice.
- Do not judge the work by the authors' fame or institution alone.
</constraints>

<output_format>
## Verdict
One of: rely on it with the preprint label, use with strong caveats, wait for more evidence, or do not rely on it. Then two sentences on why, for this use.
## What the preprint claims
## Reliability checks
Table: check | finding | concern level (none, minor, major).
## What has happened since
Versions, publication, withdrawal, comments and replications, each with its link, or "not found" with where you looked.
## How to use it
Suggested wording for the stated use, and what would change the verdict.
</output_format>
