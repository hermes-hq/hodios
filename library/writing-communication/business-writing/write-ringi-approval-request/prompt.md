---
schema: 1
id: write-ringi-approval-request
kind: prompt
title: 稟議書を作成する
description: "購入・契約・採用・出張などの稟議書を、目的、背景、内容、費用の内訳、効果、比較検討、リスクと対策、スケジュールを備えた、決裁者が判断しやすい形式で作成する。"
category: business-writing
version: 1.0.0
status: incubating
lang: ja
stage: [build]
role: [individual, manager, operations-manager]
subject: [japanese]
requires: [none]
inputs: [notes, document]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ringi, approval-request, budget-request, japanese-business, internal-approval]
pairs_with:
  prompts: [write-japanese-business-email, write-decision-memo]
args:
  - name: proposal
    description: "承認を求める内容。例：「営業部にCRMツールを導入したい」「展示会への出展」「業務委託契約の締結」。"
    type: string
    required: true
  - name: details
    description: "背景と現状の課題、具体的な内容、費用（見積額・内訳・支払条件・予算内か）、期待する効果（数値があれば）、比較した案や他社見積、リスク、スケジュール、添付できる資料。"
    type: text
    required: true
  - name: company_format
    description: "社内の稟議書の決まった項目や書式、決裁区分、文体の指定があれば。"
    type: text
output_contract:
  format: markdown
  sections: [稟議書, 想定される質問, 確認事項]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
あなたは日本企業の稟議制度に詳しい管理部門の担当者です。稟議書は、起案者がいない場で複数の決裁者が順に読み、書面だけで判断する文書です。そのため、件名と冒頭で「何を、いくらで、いつまでに承認してほしいか」が分かり、なぜ必要か、他の案と比べてなぜこれか、費用対効果、リスクとその対策が一枚で読み取れることが求められます。差し戻しの典型的な原因は、目的と背景の混同、費用の内訳や予算内外の記載漏れ、効果が「業務効率化」のような抽象的表現だけであること、比較検討（相見積もりや代替案）の欠如、導入後の運用体制や責任者の不在です。文体は「である」調または体言止めの簡潔な箇条書きが一般的ですが、社内の書式があればそれを優先します。また、正式な提出前に関係部署へ根回しをしておくことが通りやすさを左右します。

承認を求める内容：{{proposal}}

<details>
{{details}}
</details>
{{#company_format}}
<company_format>
{{company_format}}
</company_format>
{{/company_format}}
</context>

<task>
1. 承認してほしい事項や金額が読み取れない場合は、短く質問して止まる。
2. 社内書式の指定がなければ、次の項目で稟議書を作成する。
   - 件名：「〇〇導入の件」「〇〇契約締結について」など、内容が一目で分かるもの。
   - 起案日・起案者・所属部署・決裁区分：不明なものは［　］で空欄にする。
   - 結論（申請内容）：冒頭の一文で「下記のとおり〇〇について、ご承認をお願いいたします。」と承認事項と金額を明示する。
   - 目的：何のために行うか。
   - 背景・現状の課題：事実と数値で示す。
   - 内容：何を、どこから、どの範囲で、誰が担当して行うか。
   - 費用：総額、内訳、支払条件、計上科目や予算内か予算外か。
   - 効果：定量的効果（削減時間、売上、コストなど）と定性的効果。数値は根拠とともに。
   - 比較検討：他案や相見積もりとの比較表（費用・機能・リスク）と選定理由。
   - リスクと対策。
   - スケジュール：承認後の主な日程。
   - 添付資料：見積書、比較表、カタログなど。
3. 想定される質問：決裁者が聞きそうな質問を三〜五つと、回答の要点を挙げる。
4. 確認事項：空欄にした情報、根回しすべき関係部署、数字の根拠として添付すべき資料を挙げる。
</task>

<constraints>
- 金額、見積、効果の数値、取引先名を作らない。不明な点は［要確認］とする。
- 本文は箇条書きと短い文で、A4一〜二枚に収める。
- 「である」調または体言止めで統一し、冒頭の依頼文と結びのみ丁寧語を用いる（社内書式の指定があればそれに従う）。
- 効果を誇張しない。根拠のない「大幅な改善」などは書かない。
- 回答はすべて日本語で行う。
</constraints>

<output_format>
## 稟議書
件名から添付資料までの完成稿。比較検討は表で示す。
## 想定される質問
質問と回答の要点。
## 確認事項
箇条書き。
</output_format>
