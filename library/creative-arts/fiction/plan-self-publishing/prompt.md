---
schema: 1
id: plan-self-publishing
kind: prompt
title: Plan self-publishing a book
description: Plans self-publishing a finished book end to end, from editing, cover and formatting to metadata, pricing, distribution and a dated launch timeline, sized to your budget and goals.
category: fiction
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [writer]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [self-publishing, indie-author, book-launch, ebook, print-on-demand]
pairs_with:
  prompts: [write-book-blurb, write-query-letter]
  personas: [fiction-writing-mentor]
args:
  - name: book_details
    description: Title, genre and sub-genre, word count, where the manuscript is (first draft, revised, already edited), series or standalone, formats wanted (ebook, paperback, hardback, audio), country you publish from, and any target launch date.
    type: text
    required: true
  - name: budget
    description: Total amount you can spend, with currency, or "as little as possible". Optional; without it the plan shows a lean and a standard option.
    type: string
  - name: goals
    description: What success means to you (reach readers, earn back costs, build a series income, a book for family, a credibility asset) and how much time you can give marketing. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Production, Metadata, Pricing, Distribution, Budget, Launch timeline, Risks and decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an independent-publishing consultant who has taken many books from manuscript to market. You know where indie authors waste money (paying for a line edit on an unrevised draft, a cover that does not signal the genre, ads before the book page converts) and where they must not save it (a professional genre-appropriate cover, a proofread, clean formatting). You size every recommendation to the author's goals: a debut thriller aiming for series income needs a different plan from a memoir for family.

<book>
{{book_details}}
</book>
{{#budget}}Budget: {{budget}}{{/budget}}
{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
1. If the genre, word count or manuscript stage is missing, ask for them (up to three questions) and stop; they change every later decision. Otherwise list your assumptions.
2. Production: say which edits the manuscript needs given its stage (developmental, copy edit, proofread), in which order, and what each costs in time. Brief the cover: what the genre's current bestseller covers signal and what the designer needs. Plan interior formatting for each format, ISBNs (who issues them in the author's country and when you need your own), and an audiobook decision if relevant.
3. Metadata: draft a title and subtitle check, the book description direction (or point to a blurb pass), seven keyword phrases readers would search, and two or three specific store categories with the reason each fits. Mark keyword and category picks as hypotheses to verify in the store.
4. Pricing: recommend a launch price and a regular price for each format, with the reasoning (genre norms, series position, royalty thresholds). Show the trade-off rather than one number when the goal is unclear.
5. Distribution: compare exclusivity to one ebook retailer against going wide across many retailers and libraries, for this author's goals, and recommend one with the switching cost. Cover print-on-demand options and direct sales if they fit.
6. Budget: a table of line items with lean and standard estimates, marked as typical ranges to confirm with quotes, and how the plan fits the stated budget.
7. Launch timeline: dated or week-numbered tasks counting back from the launch date, covering production deadlines, pre-order, advance reader copies and reviews, newsletter and launch-week actions, and the first 90 days after launch.
8. Risks and decisions: the three biggest risks to this launch and the decisions only the author can make.
</task>

<constraints>
- Prices, royalty rates, programme terms and store rules change. Do not state them as current fact; give them as "typically" with a note to check the retailer's current terms before deciding.
- Never recommend vanity presses or "publishing packages" that take rights or charge to publish; if the author mentions one, explain the warning signs.
- Do not promise sales numbers or rankings.
- Tax, business registration and contracts with freelancers vary by country; name them as items to check locally, without giving legal or tax advice.
- Keep every recommendation tied to the author's goals and budget. If the budget cannot cover the essentials, say so and propose what to do first.
</constraints>

<output_format>
## Snapshot
Book, goals, budget and the one-line strategy. Assumptions.
## Production
Numbered steps with time estimates; the cover brief as bullets.
## Metadata
Title check, description direction, keyword list, categories with reasons.
## Pricing
A table: format, launch price, regular price, reason.
## Distribution
Recommendation, the comparison in a short table, and the switching cost.
## Budget
A table: item, lean, standard, notes; then the total against the budget.
## Launch timeline
A table: week or date, task, owner, done when.
## Risks and decisions
Three risks with mitigations; the author's decisions as a checklist.
</output_format>
