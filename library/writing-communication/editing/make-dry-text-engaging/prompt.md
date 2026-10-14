---
schema: 1
id: make-dry-text-engaging
kind: prompt
title: Make dry text more engaging
description: Makes dull informational text engaging with a concrete opening, a human example, reader questions, active verbs and varied rhythm, keeping every fact and the register the reader expects.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, content-creator, teacher, manager]
requires: [none]
inputs: [text, document]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [engagement, readability, storytelling, internal-communications, explainers]
pairs_with:
  prompts: [strengthen-opening-and-closing, rewrite-for-tone, make-numbers-readable-in-text]
  personas: [editor]
args:
  - name: text
    description: The dry text, such as an internal announcement, newsletter item, training material, report section or web page.
    type: text
    required: true
  - name: reader_and_channel
    description: "Who reads it and where, for example \"all staff, intranet news\" or \"customers, help centre article\"."
    type: text
  - name: examples_available
    description: Optional real examples, quotes or stories you are allowed to use.
    type: text
output_contract:
  format: markdown
  sections: [What makes it dry, Edited text, Techniques used, Facts check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Informational text is dry for predictable reasons: it starts with background instead of what matters to the reader; it describes systems, not people; everything is abstract nouns and passive verbs; every sentence has the same length and shape; and it never addresses the reader or answers "why should I care?". Engagement comes from specifics and people: one concrete case, a real consequence, a question the reader is already asking, verbs that show someone doing something, and a mix of short and long sentences. It does not come from exclamation marks, puns, emoji or hype, which make serious content feel unserious. The register must still fit: an HR policy update can be warmer and clearer but should not read like a lifestyle blog.
</context>

<task>
Make this text more engaging without losing any information.
{{#reader_and_channel}}Reader and channel: {{reader_and_channel}}{{/reader_and_channel}}

<text>
{{text}}
</text>
{{#examples_available}}
<examples_available>
{{examples_available}}
</examples_available>
{{/examples_available}}

1. If the text is empty, ask for it and stop. If no reader was given, infer one and state it.
2. List every fact, instruction, date, number and condition in the text. These must all survive.
3. Diagnose what makes it dry: opening, abstraction, passive load, sentence monotony, no reader address, no stakes.
4. Rewrite using the techniques that fit the reader: open with what changes for the reader or a concrete case; add a human example from the supplied examples, or a clearly hypothetical one ("Say you…"); turn the reader's likely question into a heading or line; use active verbs with real actors; vary sentence length; address the reader as "you" where the channel allows.
5. Check the rewrite against the fact list. Every item present, nothing added, nothing strengthened.
</task>

<constraints>
- Do not invent quotes, named people, stories presented as real, or statistics. Hypothetical examples must read as hypothetical.
- No hype, exclamation marks, puns or emoji unless the channel clearly uses them.
- Keep the register appropriate for the reader; serious subjects stay serious.
- Keep the length within about 20 percent of the original.
</constraints>

<output_format>
## What makes it dry
Three to five bullets.
## Edited text
The full edited text.
## Techniques used
Bullets naming each technique and where it was applied.
## Facts check
Confirmation that every fact from step 2 is present, listing any that moved.
</output_format>
