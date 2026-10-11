---
schema: 1
id: write-discussion-board-post
kind: prompt
title: Write a discussion board post
description: Helps a student shape an online course discussion post and peer replies from their own view of the reading, meeting the prompt, word count and citation rules.
category: studying
version: 1.0.0
status: incubating
stage: [build]
role: [student]
requires: [none]
inputs: [text, notes]
output: [post, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [discussion-board, online-course, peer-replies, citations]
pairs_with:
  prompts: [understand-assignment-brief, write-ai-use-disclosure, prepare-seminar-contribution]
  rules: [academic-integrity-rules]
args:
  - name: discussion_prompt
    description: The discussion question exactly as posted, plus the grading rubric if there is one.
    type: text
    required: true
  - name: my_view
    description: Your own points in rough form - what you think about the reading and why, examples from it or your experience, and any page numbers. Bullet points are fine.
    type: text
    required: true
  - name: requirements
    description: Optional rules - word count, number of citations and style, number of replies to classmates and their length, and the course's policy on AI use.
    type: text
  - name: classmate_posts
    description: Optional classmates' posts you need to reply to, pasted with their first names only.
    type: text
output_contract:
  format: markdown
  sections: [Policy check, What the prompt asks, Post, Replies, Final check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Online discussion posts are graded on a rubric that usually asks for the same few things: answer every part of the prompt, make a clear point of your own, support it with the reading (cited properly, with page numbers), connect to course concepts or experience, and meet the word count. Peer replies are graded on substance, not politeness: "Great post, I agree!" earns little, while a reply that adds evidence, asks a real question or offers a respectful counterpoint earns full marks. Students most often lose marks by summarising the reading instead of responding to it, answering only half of a multi-part prompt, and missing citations. The post must stay the student's own thinking; courses differ on whether AI help with wording is allowed.
</context>

<task>
Help shape a discussion post from the student's own view.

<discussion_prompt>
{{discussion_prompt}}
</discussion_prompt>

<my_view>
{{my_view}}
</my_view>
{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}
{{#classmate_posts}}
<classmate_posts>
{{classmate_posts}}
</classmate_posts>
{{/classmate_posts}}

1. Policy check: if the requirements state an AI policy, follow it. If it forbids AI help with writing, give only the structure, the gaps and the checklist (steps 2 and 5), not drafted text. If no policy is given, say to check it and note that disclosure may be required.
2. Break the prompt into its parts and map each to the student's points. Name any part the student has no point for yet, and ask them for their view on it rather than supplying one.
3. Write the post from the student's points only, in plain first-person academic voice: a clear claim answering the prompt in the opening lines, support from the reading with a citation placeholder in the required style (author, year, page) wherever the student gave a source, a connection to a course concept or their example, and a closing question or implication that invites replies. Keep within the word count.
4. If classmate posts are given, draft one reply per required classmate that does one substantive thing: extends their point with evidence, asks a specific question, or offers a respectful counterpoint. Each reply must reference something specific in the classmate's post.
5. Final check against the rubric or common criteria: every prompt part answered, claim clear, citations present and in style, word count met, replies substantive, and the student's voice kept.
</task>

<constraints>
- Use only the student's ideas and sources. Do not add arguments, examples, quotations or citations they did not give; leave a [CITATION NEEDED] marker instead.
- Never fabricate a source, page number or quotation.
- Do not write posts for prompts the student has given no view on; ask for their view.
- Keep classmates' names to first names as given, and keep the tone respectful.
</constraints>

<output_format>
## Policy check
## What the prompt asks
A table: Prompt part | Your point | Gap?
## Post
The post, with word count.
## Replies
One per classmate, with word count.
## Final check
Checkboxes.
</output_format>
