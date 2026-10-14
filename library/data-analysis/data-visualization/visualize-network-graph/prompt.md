---
schema: 1
id: visualize-network-graph
kind: prompt
title: Visualise a network graph
description: Designs a readable network visualisation of relationships (people, systems, citations) with filtering, layout, node sizing, colour and labels, or a matrix when it would be a hairball.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, data-scientist, researcher, software-engineer]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [network-visualization, graph-layout, gephi, centrality]
pairs_with:
  prompts: [choose-chart-type, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: network
    description: "The network: what nodes and edges are, approximate counts, whether edges are directed or weighted, node attributes (team, type, date), and the file format (edge list, adjacency matrix, JSON)."
    type: text
    required: true
  - name: question
    description: "The question the picture must answer, for example 'Which teams are isolated?' or 'Who connects the two communities?'"
    type: string
    required: true
  - name: tool
    description: "Tool: Gephi, Cytoscape, NetworkX with matplotlib, pyvis, D3, igraph or ggraph in R, Neo4j Bloom or another."
    type: string
output_contract:
  format: markdown
  sections: [Is a node-link diagram right, Data reduction, Layout and encoding, Labels and interaction, Code or build steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a network visualisation specialist. You know that node-link diagrams beyond a few hundred nodes become hairballs that impress and explain nothing; that force-directed layouts are random-seeded and place nodes close for reasons readers over-interpret; that node size by degree tells a different story from size by betweenness; that an adjacency matrix ordered by community beats a node-link diagram for dense networks; and that the real work is filtering and aggregating to the part of the graph that answers the question. Networks of people are sensitive: an org network can expose individuals, so aggregation or consent matters.
</context>

<task>
Design a visualisation of this network.

<network>
{{network}}
</network>

<question>
{{question}}
</question>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Test fit: node-link diagrams suit sparse networks up to a few hundred visible nodes and questions about paths, bridges and clusters. For dense networks or questions about which groups connect, recommend an adjacency matrix ordered by community; for hierarchies, a tree or icicle; for flows between a few groups, a chord or Sankey.
2. Reduce the data to the question: filter by edge weight threshold, keep the k-core or the largest component, aggregate nodes into communities (detected with Louvain or Leiden) or teams, show an ego network around the nodes of interest, or sample with a stated rule. Say what is dropped.
3. Choose layout and encoding: force-directed (ForceAtlas2, Fruchterman-Reingold) with a fixed seed for clusters; layered or hierarchical for directed flows; geographic when location matters. Node size by the measure that answers the question (degree for popularity, betweenness for brokers), colour by one categorical attribute with at most about 6 to 8 colours, edge width or opacity by weight, arrows only when direction matters.
4. Labels and interaction: label only the nodes the question is about, plus a few hubs; add tooltips, search and highlight-on-hover in interactive tools; add a legend for size and colour and a note on the layout algorithm.
5. Remind readers that distance in a force layout is approximate and position on the page has no axis meaning.
6. Give code or build steps for the tool (NetworkX plus matplotlib or pyvis, Gephi steps, igraph or ggraph).
</task>

<constraints>
- Do not draw the full network when it has thousands of nodes; reduce first and state how.
- Do not claim centrality or community results without computing them; give the code to compute them.
- For networks of people, recommend aggregation or anonymisation unless people consented to being shown, and warn against using the chart to judge individuals.
- Fix the random seed so the layout can be reproduced.
</constraints>

<output_format>
## Is a node-link diagram right
Yes or no with the reason and the alternative.

## Data reduction
Numbered steps and what is dropped.

## Layout and encoding
Table: Element | Choice | Reason.

## Labels and interaction
Bullets.

## Code or build steps
One code block or numbered steps.
</output_format>
