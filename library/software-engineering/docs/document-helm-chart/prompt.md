---
schema: 1
id: document-helm-chart
kind: prompt
title: Document a Helm chart
description: Documents a Helm chart's values with descriptions, types, defaults and examples, and writes a README covering install, common setups, upgrades and uninstall, checked against the templates.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship, maintain]
role: [devops-engineer, sre, maintainer]
stack: [kubernetes]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [docs, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [values-yaml, helm-docs, chart-readme, upgrade-notes, crds]
pairs_with:
  prompts: [write-helm-chart, document-configuration-options, write-readme]
args:
  - name: chart_path
    description: Path to the chart folder if the repository holds more than one chart.
    type: text
  - name: notes
    description: Anything the chart cannot tell you, such as the chart repository or OCI address, supported Kubernetes versions or known upgrade breaks.
    type: text
output_contract:
  format: markdown
  sections: [Files changed, Value mismatches, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For a Helm chart, values.yaml is the public API and the README is where people look first. Chart docs usually fail in the same places: the README lists defaults that no longer match values.yaml, nested keys used in templates have no description at all, values that templates read are missing from values.yaml (so users never learn they exist), and nobody wrote down what breaks on upgrade. The upgrade traps experienced operators know about are these. `helm upgrade` does not update CRDs in the `crds/` folder. Changing selector labels breaks Deployments and StatefulSets because those fields cannot be changed. Renamed values are silently ignored, and PersistentVolumeClaims stay behind after uninstall. If the repo uses helm-docs, comments in the `# -- description` form above each key become the values table, so the comments are the source to fix.
</context>

<task>
Document the Helm chart{{#chart_path}} at `{{chart_path}}`{{/chart_path}} in this repository.
{{#notes}}
Notes from the maintainer: {{notes}}
{{/notes}}

1. Read Chart.yaml (version, appVersion, kubeVersion, dependencies), values.yaml, every template and `_helpers.tpl`, any values.schema.json, the existing README and changelog, and CI config for chart linting or helm-docs.
2. Map each value to where templates use it. List values used in templates but missing from values.yaml, values in values.yaml that no template reads, and defaults that differ between the README and values.yaml.
3. Add a description comment above every key in values.yaml, in the helm-docs `# --` style if the repo uses helm-docs, otherwise as plain comments. Say what the value controls, its type when not obvious, allowed values, and give an example for lists and maps such as extra env vars, tolerations or ingress hosts. Do not change any default.
4. Write or update the chart README: what the chart deploys, prerequisites (Kubernetes and Helm versions from Chart.yaml, required CRDs or operators), install commands using the repository or OCI address from the repo or notes, a minimal values file, common setups found in the templates (ingress, persistence, existing secret, resources, autoscaling), the values table (generated if helm-docs is configured), an upgrade section (CRDs, renamed values, immutable fields, steps per chart version where the changelog shows breaks) and uninstall with what is left behind.
5. Verify with `helm lint` and `helm template` using the default values and each example values file you wrote. Run helm-docs if the repo is set up for it, so the README table is regenerated rather than hand-edited.
</task>

<constraints>
- Never change templates, defaults or chart versions. Report mismatches; do not fix behaviour.
- Never run `helm install`, `helm upgrade`, `helm uninstall` or `kubectl` against a cluster. Rendering locally is enough.
- Repository URLs, OCI addresses and version support come only from the repo or the notes; otherwise leave `TODO(maintainer): ...`.
- Use placeholders such as `<your-password>` in examples; never put credentials in values examples.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Files changed
The files written or edited, one line each.
## Value mismatches
Bullets: used but undeclared, declared but unused, README defaults that disagreed with values.yaml. Or "None found".
## Verification
The commands run and their real result, or "Not run" and why.
## Open questions
Every `TODO(maintainer)` left, as a checklist.
</output_format>
