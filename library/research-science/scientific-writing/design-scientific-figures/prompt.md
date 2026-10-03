---
schema: 1
id: design-scientific-figures
kind: prompt
title: Plan the figures for a paper
description: Plans a paper's figures, choosing which results become figures, chart types, panels, labels, colour and accessibility, and writes self-contained captions. For authors preparing a manuscript.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [design, build]
role: [researcher, student, data-scientist]
requires: [none]
inputs: [notes, dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [figures, figure-captions, colour-accessibility, chart-types, manuscript]
pairs_with:
  prompts: [write-results-section, plan-research-talk, design-research-poster]
  personas: [statistician]
args:
  - name: results_summary
    description: The results you want to show - each finding with its data type, groups, sample sizes, time points and the statistics - and the paper's main message.
    type: text
    required: true
  - name: journal_requirements
    description: The journal's figure rules if you have them - number of figures, column widths, file formats, resolution, fonts, colour charges, panel labelling.
    type: text
output_contract:
  format: markdown
  sections: [Figure plan, Figure specifications, Captions, Accessibility and integrity checks, Journal requirements to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many readers look at the title, abstract and figures and nothing else, so the figure set should tell the paper's story on its own. Each figure should make one point, chosen from the results that carry the argument; supporting detail goes to tables or supplementary material. Good scientific figures show the data rather than hide it (individual points or distributions instead of bar charts of means for small samples), define every error bar, use axes and scales that do not exaggerate, keep consistent colours and group order across figures, use colour palettes readable with colour-vision deficiency and in greyscale, and stay legible at final printed size. A caption should let a reader understand the figure without the main text: what is shown, the sample, what the error bars and statistics mean.
</context>

<task>
Plan the figures for this paper.
<results>
{{results_summary}}
</results>
{{#journal_requirements}}
<journal_requirements>
{{journal_requirements}}
</journal_requirements>
{{/journal_requirements}}

1. Identify the paper's main message and the three to six results that carry it. Decide for each result whether it should be a main figure, a panel in a combined figure, a table (when exact values matter more than pattern) or supplementary material, and say why.
2. For each figure, choose the chart type that fits the data and the comparison: for example dot or strip plots with summary statistics for small groups, box or violin plots with points for distributions, line plots for time courses, scatter with fitted line and band for relationships, forest plots for estimates with intervals, heatmaps for matrices, and flow diagrams for participant flow. Avoid pie charts for comparison, 3D effects, dual y-axes and truncated bar axes.
3. Specify each figure: panels and their order and labels (A, B, C), axes and units, scale (linear or log, with the reason), what each mark and error bar represents, statistical annotations and how they are defined, group order and colour mapping kept consistent across figures, and size at final column width.
4. Choose a colour approach: a colour-vision-safe categorical palette (for example Okabe-Ito) or perceptually uniform sequential or diverging maps (for example viridis or cividis), redundant encoding with shape or line type, and a greyscale check.
5. Write a self-contained caption for each figure: a title sentence stating the finding, then what is shown, n per group, what points, bars and error bars mean, the test used, and abbreviations.
6. Write short alt text for each figure for accessible publishing.
</task>

<constraints>
- Do not invent data, sample sizes or statistics. If something needed for a figure or caption is missing, mark [MISSING: ...].
- Never suggest a design that misleads: no cropped axes on bars, no cherry-picked representative images without saying how they were chosen, no error bars whose type is undefined.
- For image data (microscopy, gels, blots), require that adjustments apply to the whole image, that cropping and splicing are disclosed, and that uncropped originals are kept, in line with common journal image-integrity policies.
- Use the journal requirements given; where they are not given, state typical values as assumptions to confirm (for example a single column of about 85 to 90 mm, text no smaller than about 6 to 8 pt at final size, vector formats for plots and at least 300 dpi for raster images).
- If there are more candidate figures than the journal allows, rank them and say what moves to supplementary.
</constraints>

<output_format>
## Figure plan
A table: figure | message (one sentence) | result(s) shown | type | main or supplementary.
## Figure specifications
Per figure: panels, chart type, axes and units, marks and error bars, colour and order, size.
## Captions
Per figure: caption and alt text.
## Accessibility and integrity checks
A checklist for the whole set.
## Journal requirements to confirm
Items to check in the author guidelines.
</output_format>
