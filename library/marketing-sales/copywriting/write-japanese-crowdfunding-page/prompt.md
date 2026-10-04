---
schema: 1
id: write-japanese-crowdfunding-page
kind: prompt
title: クラウドファンディングのページ
description: "日本の購入型クラウドファンディングのプロジェクトページを作成します。ストーリー、資金の使い道、リターン一覧、スケジュール、リスクとチャレンジ、活動報告の計画までまとめます。"
category: copywriting
version: 1.0.0
status: incubating
lang: ja
stage: [build]
role: [founder, artist]
requires: [none]
inputs: [text, notes]
output: [copy, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [crowdfunding, reward-tiers, project-page, japan]
pairs_with:
  prompts: [write-crowdfunding-campaign, write-sales-page]
args:
  - name: project
    description: プロジェクトの内容：何を作る・実現するのか、なぜ自分がやるのか（経緯や実績）、現在の進み具合（試作の有無など）、使う予定のプラットフォーム（CAMPFIRE、Makuake、READYFORなど）と方式（All-or-Nothing／All-In）。
    type: text
    required: true
  - name: goal_amount
    description: 目標金額と、その内訳が分かれば内訳（例「150万円：金型80万、初回生産50万、手数料・送料20万」）。
    type: string
    required: true
  - name: rewards
    description: 予定しているリターン：価格、内容、数量限定の有無、お届け予定時期、原価や送料が分かれば記入。
    type: text
    required: true
output_contract:
  format: markdown
  sections: [タイトル案, 概要, 本文, リターン一覧, スケジュール, リスクとチャレンジ, 活動報告の計画, 確認事項]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "初版。"}
---
<context>
あなたは日本の購入型クラウドファンディングのページ制作を支援します。支援者は「この人を応援したい」と「このリターンが欲しい」の両方で支援を決めます。日本のプラットフォームでは、作り手の顔と経緯が見えるストーリー、誠実なリスク説明、こまめな活動報告が信頼の土台になります。

押さえる点：
- ページの定番構成：トップ画像の一言、はじめに（自己紹介）、このプロジェクトで実現したいこと、背景・きっかけ、プロダクトやサービスの詳細、資金の使い道、リターン紹介、スケジュール、リスク＆チャレンジ、最後に。
- 方式：All-or-Nothing は目標未達なら支援金を受け取らずリターンも発生しない。All-In は未達でも実施を約束する。どちらかで書き方（「実施します」と言えるか）が変わります。
- リターンは価格ごとに内容、お届け予定時期、数量を明記します。手数料（プラットフォームごとに異なる。最新の料率は各社の案内で確認）と送料、原価を差し引いても赤字にならないかを必ず確認します。早割や数量限定は、本当に限定する場合にだけ使います。
- リスク＆チャレンジでは、遅延や仕様変更の可能性と、その場合の対応を正直に書きます。多くのプラットフォームが記載を求めています。
- 物を届けるプロジェクトは特定商取引法に基づく表記が必要になる場合があり、効能や性能の表示には景品表示法などの規制があります。各プラットフォームの審査基準も確認が必要です。
</context>

<task>
次のプロジェクトのクラウドファンディングページを書いてください。

<project>
{{project}}
</project>

目標金額：{{goal_amount}}

<rewards>
{{rewards}}
</rewards>

1. 何を作るのか、方式（All-or-Nothing か All-In か）、リターンの価格と内容のどれかが分からない場合は、必要な情報を一度にまとめて質問し、そこで止めてください。
2. タイトル案を三つ書いてください。何が実現するのかが一目で分かることを優先します。
3. トップ画像に載せる一言と、百～百五十字程度の概要文を書いてください。
4. 本文を定番構成の見出しに沿って書いてください。経緯と実績は project にあることだけを使い、資金の使い道は {{goal_amount}} の内訳に合わせます。内訳がない場合は項目だけ示して【要入力】とします。
5. リターン一覧を表にし、原価・送料・手数料を引いた残りを確認できる列を付けてください。数字がない場合は計算式だけ示し、赤字の恐れがあるリターンを指摘します。
6. 準備から発送完了までのスケジュールを表にしてください。
7. リスクとチャレンジを、起こりうる問題とその対応の組み合わせで書いてください。
8. 公開前、期間中、終了後の活動報告の計画（頻度とテーマ）を書いてください。
9. 最後に、方式に合った約束の書き方になっているか、根拠のない性能表現や架空の実績がないかを確認してください。
</task>

<constraints>
- 実績、受賞、メディア掲載、試作の評価、支援者の声を作らないでください。
- All-or-Nothing の場合、「必ずお届けします」ではなく「目標達成した場合に」と条件を明確にします。
- 早割・数量限定・「残りわずか」は、実際の数量設定に基づく場合だけ使います。
- 作り手の言葉として、誠実で温かい「です・ます」調で書き、誇張した売り文句は避けます。
</constraints>

<output_format>
## タイトル案
三案。

## 概要
トップ画像の一言と概要文。

## 本文
見出しごとの本文。

## リターン一覧
表：価格 | 内容 | お届け予定 | 数量 | 原価・送料・手数料 | 残り。

## スケジュール
表：時期 | 内容。

## リスクとチャレンジ
起こりうる問題と対応。

## 活動報告の計画
時期 | 頻度 | テーマ。

## 確認事項
作り手に確かめてほしい点。なければ「なし」。
</output_format>
