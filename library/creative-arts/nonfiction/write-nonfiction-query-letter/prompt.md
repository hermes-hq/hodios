---
schema: 1
id: write-nonfiction-query-letter
kind: prompt
title: Write a nonfiction query letter
description: Writes a literary agent query letter for a nonfiction book that leads with the idea, the reader and the author's platform, and points to the proposal, not a finished manuscript.
category: nonfiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [literary-agents, query-letter, author-platform, book-pitch, representation]
pairs_with:
  prompts: [write-nonfiction-book-proposal, validate-nonfiction-book-idea]
  workflows: [nonfiction-book-track]
args:
  - name: book
    description: Working title, the one-sentence idea, who the book is for, why now, and the status of the proposal and sample chapters.
    type: text
    required: true
  - name: platform
    description: Your credentials and reach in plain numbers you can stand behind, for example newsletter subscribers, speaking per year, a role, media appearances, a course with students.
    type: text
    required: true
  - name: agent_notes
    description: The agent's name and what you know of their list or stated wishes, if you have it. Only what you have actually read from them.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Query letter, Subject line, Platform check, Personalisation notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an author query literary agents for a nonfiction book. Nonfiction is usually sold on a proposal and one or two sample chapters, not a finished manuscript, so the query sells three things in about 300 words: a clear idea with a reader who wants it, why this author is the one to write it, and evidence that the author can reach readers. Agents read the platform paragraph closely; vague claims ("a large following") hurt more than modest true numbers. A nonfiction query has no plot synopsis, and comparable titles are a sentence, not a paragraph.

<book>
{{book}}
</book>
<platform>
{{platform}}
</platform>
{{#agent_notes}}Agent notes: {{agent_notes}}{{/agent_notes}}
</context>

<task>
1. Pull out the hook: the problem or question, the reader, and the promise in one or two sentences. If the idea or the reader is missing, ask before drafting.
2. Write the letter: a short opening with title, category and approximate length or proposal status; the hook paragraph; a paragraph on what the book covers and how (method, story, research); a platform and credentials paragraph using only the numbers given; one line of comparable titles marked to verify; a courteous close offering the proposal.
3. If agent notes are present, write one honest sentence of personalisation from them. If not, leave a marked slot and do not invent a reason.
4. Write two subject line options in the common "Query: Title (category)" pattern.
5. Check the platform claims: list each number used, and flag any claim that is vague or that the author should be ready to evidence.
</task>

<constraints>
- Use only facts the author gave. Never invent sales figures, follower counts, endorsements, awards or media appearances.
- Do not name comparable titles as fact; mark them "[verify: recent, similar reader, not a bestseller outlier]" unless the author supplied them.
- Keep the letter between 250 and 350 words. No rhetorical-question openings, no claims that the book will be a bestseller.
- Submission rules differ by agent; tell the author to follow each agent's stated guidelines over this template.
</constraints>

<output_format>
## Query letter
The letter, ready to paste.

## Subject line
Two options.

## Platform check
Table: Claim | Number used | Evidence to have ready | Weak or fine.

## Personalisation notes
What was personalised and what to fill in per agent.
</output_format>
