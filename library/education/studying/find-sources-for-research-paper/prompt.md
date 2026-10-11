---
schema: 1
id: find-sources-for-research-paper
kind: prompt
title: Find sources for a research paper
description: Plans the source search for a school or college research paper with search terms, databases to use, source quotas by type, credibility checks and a source log.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [library-databases, search-terms, source-evaluation, peer-reviewed-sources, research-paper]
pairs_with:
  prompts: [understand-assignment-brief, read-textbook-actively, write-ai-use-disclosure]
  personas: [study-coach]
args:
  - name: assignment
    description: The paper's topic or question and its requirements, ideally the brief itself - length, number and type of sources required, citation style, due date.
    type: text
    required: true
  - name: level
    description: Study level, which changes what counts as a good source.
    type: enum
    enum: [high-school, undergraduate, postgraduate]
    default: undergraduate
  - name: library_access
    description: Optional databases and tools your school library gives you (for example "JSTOR, EBSCO Academic Search, Google Scholar linked to library"). If unknown, general options are suggested to check.
    type: string
output_contract:
  format: markdown
  sections: [Research question, Search terms, Where to search, Source quotas, Credibility checks, Source log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students lose marks on research papers less for weak writing than for weak sources: a handful of websites, one search phrase typed into a general search engine, sources that do not meet the brief ("at least five peer-reviewed"), and citations that cannot be traced. Librarians teach a better method: narrow the topic to a question, break it into concepts, list synonyms for each concept, combine them with AND and OR, search the library's databases as well as a search engine, and use one good source's reference list and "cited by" list to find more. Each source is then checked for authority, purpose, evidence and date, and logged as it is found, not reconstructed the night before the deadline. AI tools are known to invent plausible citations, so every source must be found and opened by the student.
</context>

<task>
Plan the source search for this {{level}} research paper.

<assignment>
{{assignment}}
</assignment>
{{#library_access}}
Library access: {{library_access}}
{{/library_access}}

1. Turn the topic into a focused research question (or two or three options if it is broad), and state the source requirements from the brief.
2. Break the question into 2 to 4 concepts. For each, list synonyms, related terms and narrower terms, including the formal or academic vocabulary the field uses. Combine them into 3 to 5 search strings using AND, OR, quotation marks and truncation, and say how to narrow or widen if results are too many or too few.
3. Say where to search: the library catalogue and named databases from the student's access (or general types to check with the library if unknown), a scholarly search engine, and subject-appropriate sources (government statistics, primary sources, professional bodies). Include citation chaining: reference lists and "cited by".
4. Set source quotas that meet the brief: how many of each type (peer-reviewed articles, books or chapters, primary sources, reputable data) and a rough date range.
5. Give a credibility check the student applies to each source: who wrote it and their expertise, where it was published and whether it was reviewed, the evidence used, the date, and the purpose or bias. Explain how to recognise a peer-reviewed article and a predatory or low-quality one.
6. Give a source log template with columns for the full citation details, how it was found, what it contributes to the argument, and a check that the student opened it.
</task>

<constraints>
- Do not list specific articles, books, authors or URLs as sources. AI-suggested citations are often invented; the plan teaches the student to find real ones.
- Do not name databases as available to the student unless they listed them; suggest checking with the library.
- Do not write the paper or any part of its argument.
- If the brief's source requirements are unclear, say what to ask the teacher.
</constraints>

<output_format>
## Research question
## Search terms
A table: Concept | Synonyms and related terms. Then the search strings in a code block.
## Where to search
## Source quotas
A table: Source type | How many | Notes.
## Credibility checks
A checklist.
## Source log
A table template: Citation | Type | Found via | What it adds | Opened and read?
</output_format>
