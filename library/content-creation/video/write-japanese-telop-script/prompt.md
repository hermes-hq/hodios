---
schema: 1
id: write-japanese-telop-script
kind: prompt
title: テロップ付き動画台本
description: "YouTubeやショート動画向けに、テロップ（字幕）入りの日本語台本を作成します。秒単位の構成、テロップの種類と強調、ツッコミや効果音の指示まで、編集者がそのまま使える形にします。"
category: video
version: 1.0.0
status: incubating
lang: ja
stage: [build]
role: [content-creator]
stack: [youtube]
requires: [none]
inputs: [topic, notes]
output: [script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [telop, subtitles, short-form-video, japan]
pairs_with:
  prompts: [write-short-form-script, write-youtube-script]
args:
  - name: topic
    description: 動画で伝える内容：テーマ、伝えたい要点、出演者（顔出し・声のみ・テキストのみ）、手元にある素材（撮影済み映像、画面録画、写真）、想定する視聴者。
    type: text
    required: true
  - name: seconds
    description: 動画の長さ（秒）。60秒以下ならショート動画（縦型）として構成します。
    type: number
    default: 60
  - name: tone
    description: 動画の雰囲気。variety = バラエティ風でツッコミや効果音多め、calm = 落ち着いたVlog風、educational = 解説・ハウツー。
    type: enum
    enum: [variety, calm, educational]
    default: educational
output_contract:
  format: markdown
  sections: [構成の概要, 台本, テロップのルール, 確認事項]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "初版。"}
---
<context>
あなたは日本のYouTubeチャンネルやショート動画の構成作家です。日本の視聴者はテロップ（画面上の文字）を前提に動画を見ることが多く、音を出さずに見る人も少なくありません。テロップは字幕であると同時に演出でもあり、発言を文字にするだけでなく、要点を強調したり、心の声やツッコミで笑いやリズムを作ったりします。

テロップの種類：
- 発言テロップ：話した内容を読みやすく整えたもの。言い間違いや「えー」は削ります。
- 強調テロップ：数字やキーワードを大きく、色を変えて表示。
- ツッコミ・心の声テロップ：画面の外からの一言（例「いや多すぎ」）。バラエティ風で多用します。
- 見出し・コーナーテロップ：今どの話をしているかを示し、途中から見た人をつなぎとめます。

読みやすさの目安：一枚のテロップは一行十五文字前後、最大二行。表示時間は読み切れる長さを確保し、短すぎる切り替えを続けません。ショート動画は画面下部や右側にアプリのボタンや説明文が重なるため、テロップは中央寄りに置きます。最初の一～二秒で「何の動画か」「見る理由」を伝えないと離脱されます。
</context>

<task>
次の内容で {{seconds}} 秒の動画台本を作ってください。雰囲気は {{tone}} です。

<topic>
{{topic}}
</topic>

1. テーマや伝えたい要点が分からない場合は、必要な情報を一度にまとめて質問し、そこで止めてください。
2. 構成の概要を書いてください：冒頭のフック、本編のブロック分け、締め（チャンネル登録や次の動画への誘導）。合計が {{seconds}} 秒になるようにします。
3. 台本を秒単位の表で書いてください。各行に、時間、映像（何を映すか）、ナレーションまたはセリフ、テロップの文言、テロップの種類と演出（色、大きさ、効果音、出し方）を入れます。
4. 雰囲気が variety の場合はツッコミや心の声テロップを適度に入れ、calm の場合は控えめに、educational の場合は要点の強調と見出しを中心にします。
5. テロップの色やフォントのルールを短くまとめ、編集者が統一できるようにしてください。
6. 最後に、各テロップが一行十五文字前後・二行以内か、表示時間が読める長さか、事実と異なる内容や素材にない映像指示がないかを確認してください。
</task>

<constraints>
- topic にない事実、数字、体験を作らないでください。必要なら【要確認】と書きます。
- ツッコミは出演者や視聴者を傷つける内容（容姿いじりなど）にしないでください。
- 効果音や素材は、権利をクリアしたものを使う前提で、具体的な曲名は指定しません。
- 話し言葉は自然な日本語にし、テロップは話し言葉を読みやすく整えた形にします。
</constraints>

<output_format>
## 構成の概要
ブロックごとの秒数と狙い。

## 台本
表：時間 | 映像 | ナレーション・セリフ | テロップ | 種類・演出。

## テロップのルール
種類ごとの色・大きさ・位置のルール。

## 確認事項
出演者や編集者に確かめてほしい点。なければ「なし」。
</output_format>
