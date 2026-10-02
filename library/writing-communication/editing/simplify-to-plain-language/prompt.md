---
schema: 1
id: simplify-to-plain-language
kind: prompt
title: Simplify a text to plain language
description: Rewrites a text in plain language at a target reading level while keeping every fact, obligation, right, deadline and condition intact, and shows a meaning check against the original.
category: editing
version: 1.0.0
status: experimental
stage: [review]
role: [writer, editor, operations-manager, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [plain-language, readability, reading-level, iso-24495]
pairs_with:
  prompts: [tighten-prose, rewrite-for-tone]
  personas: [editor]
args:
  - name: text
    description: The text to simplify, such as a policy, letter, terms, instructions or a notice.
    type: text
    required: true
  - name: reading_level
    description: Target reading level, for example "grade 6", "grade 8", "CEFR B1" or "general public".
    type: string
    default: grade 8
output_contract:
  format: markdown
  sections: [Plain version, Meaning check, Terms kept, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Plain language means the intended reader can find what they need, understand it and use it on first reading (ISO 24495-1). It is not dumbing down and not summarising. The risk in simplifying official, legal, medical or financial text is changing what it obliges: "must" softened to "should", an exception dropped, a deadline made vague, a condition merged away. A plain version that changes the meaning is worse than the original.

Techniques that work: put the reader's main question first; address the reader as "you" and the organisation as "we"; one idea per sentence, averaging 15 to 20 words; active voice with a clear actor; common words; define a necessary term once; use lists for steps and conditions and headings that are questions or tasks.
</context>

<task>
Rewrite the text below in plain language for a reader at {{reading_level}}.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Build an inventory of everything that carries meaning: facts, amounts, dates and deadlines, obligations (must, must not), permissions (may), rights, conditions (if, unless, only when), exceptions, consequences and contact details.
3. Work out the reader's main questions (What is this? What do I have to do? By when? What happens if I don't?) and reorganise so the answers come first.
4. Rewrite using the techniques above. Keep the modal strength of every obligation exactly: "must" stays "must"; "may" stays "may"; never turn a requirement into advice.
5. Keep a legal or technical term when the reader needs it to act (for example a form name or a defined term they will see elsewhere), and explain it in plain words the first time.
6. Check every inventory item against your version. If an item cannot be simplified without changing its meaning, keep the original wording for it and say so.
</task>

<constraints>
- Do not add advice, interpretation or information that is not in the original. Do not drop anything to make it shorter.
- If the original is ambiguous, keep the ambiguity and flag it in Notes rather than resolving it by guessing.
- Reading level is approximate. Say how you judged it (sentence length, word familiarity) rather than reporting a precise formula score you did not compute.
- If the text is a legal, medical or financial document, add one line to Notes saying the plain version is a reading aid and the original wording is what applies.
</constraints>

<output_format>
## Plain version
The rewritten text with headings and lists where they help.
## Meaning check
A table: Original item (quoted or paraphrased) | Where it is in the plain version | Same strength? (yes, or explain).
## Terms kept
Bullets: technical or legal terms you kept and how you explained them. "None" if none.
## Notes
Ambiguities in the original, items left in original wording, and how you judged the reading level.
</output_format>
