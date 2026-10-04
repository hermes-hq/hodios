---
schema: 1
id: explain-school-maths-method-to-parent
kind: prompt
title: Explain a school maths method to a parent
description: Explains to a parent the maths method their child's school uses, such as column subtraction, the grid method or bus-stop division, step by step, why it is taught and how to help without clashing.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [parent]
subject: [mathematics]
requires: [none]
inputs: [text, image]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [written-methods, primary-maths, grid-method, bus-stop-division, part-whole-model, home-support]
pairs_with:
  prompts: [help-with-homework, explain-fractions-with-models, practise-times-tables-with-derived-facts]
  personas: [homework-mentor]
args:
  - name: method_or_homework
    description: The method's name, the homework question, or a description of what the worksheet shows, for example "they draw a bar split into parts for 34 + ? = 61" or "chunking for 156 ÷ 12".
    type: text
    required: true
  - name: age
    description: The child's age or school year, for example "7" or "Year 3", "3rd grade".
    type: string
    required: true
  - name: country
    description: Optional country or curriculum, since method names differ (in the UK "bus-stop" is short division; in the US "partial quotients" is close to chunking).
    type: string
output_contract:
  format: markdown
  sections: [What the method is, Step by step, Why schools teach it, How to help at home, Words to use, Questions for the teacher]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent wants to help their child with maths homework that uses a method they were not taught.

Child's age or school year: {{age}}
{{#country}}Country or curriculum: {{country}}
{{/country}}
Typical methods: number bonds, part-whole and bar models, number lines and "counting on" for subtraction, partitioning, expanded then compact column methods, the grid (area) method and long multiplication, chunking and short ("bus-stop") division. Parents often make things worse with good intentions: teaching their own method, which confuses the child two days before the class moves on; skipping the drawing stage the school deliberately uses; or calling a method "the long way". Schools usually follow a sequence from concrete objects to pictures to written symbols, so the child understands place value before using a fast compact method.

<method_or_homework>
{{method_or_homework}}
</method_or_homework>
</context>

<task>
1. Identify the method from the description. If it could be more than one (a bar could be a bar model or a number line), name the likely one, say why, and note the other.
2. Work one example step by step exactly as the child is likely to write it, with the layout shown in a fenced text block and every step in plain words. Use a parallel example of the same size and type with different numbers (for 156 ÷ 12, use 168 ÷ 14), so the parent learns the method without the child's answer being worked for them; then say in one line how the child's own question starts.
3. Explain why the method is taught: what it shows about place value or the operation, and what method usually comes next, with the age this usually happens. Name it as typical and say schools differ.
4. Give the parent's do and don't list: let the child explain each step aloud; ask questions instead of correcting; keep the school's drawing even if it feels slow; use your own method only to check the answer silently.
5. Give a short phrase bank: questions that prompt the method ("What's the whole? What are the parts?", "How many twelves fit into 15?").
6. List what to ask the teacher if the method is still unclear or the child is upset by it.
</task>

<constraints>
- Every calculation must be right: check each step and the final answer.
- Use the child's school vocabulary (ones, tens; "exchange" rather than "borrow" in many UK schools; "regroup" in the US). If no country was given, say which curriculum's names you assumed and that names differ.
- Plain language for an adult with no maths background; no jargon left unexplained, no talking down.
- If the input is too vague to identify the method (for example "the weird way"), give the two or three most likely methods for that age briefly and ask the parent to describe or copy one line of the worksheet.
- Do not encourage the parent to complete the homework for the child.
</constraints>

<output_format>
## What the method is
Two or three sentences.
## Step by step
The worked example in a fenced block, then numbered steps in words.
## Why schools teach it
Short paragraph, including what comes next.
## How to help at home
Do and don't bullets.
## Words to use
Five to eight questions or phrases.
## Questions for the teacher
Two or three.
</output_format>
