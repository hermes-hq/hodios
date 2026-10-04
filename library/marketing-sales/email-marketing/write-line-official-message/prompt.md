---
schema: 1
id: write-line-official-message
kind: prompt
title: LINE公式アカウント配信文
description: "店舗やサロンのLINE公式アカウント向けに、クーポン・新商品・予約リマインド・イベントの配信文を作成します。短く丁寧で、配信時間と頻度をブロックされにくく設計します。"
category: email-marketing
version: 1.0.0
status: incubating
lang: ja
stage: [build]
role: [founder, marketer]
requires: [none]
inputs: [text, notes]
output: [message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [line-official-account, broadcast-messages, coupons, japan]
pairs_with:
  prompts: [write-shop-pop-signage, write-whatsapp-business-service-scripts]
args:
  - name: business
    description: お店の業種と特徴、客層、今回伝えたい内容（クーポンの内容と条件、新商品、空き枠、イベント日時など）、友だち数や最近のブロック率が分かれば記入。
    type: text
    required: true
  - name: purpose
    description: 配信の目的。coupon = クーポン、new-item = 新商品・新メニュー、reminder = 予約や来店のリマインド、event = イベント・キャンペーン告知。
    type: enum
    enum: [coupon, new-item, reminder, event]
    default: coupon
  - name: frequency
    description: 現在または予定の配信頻度（例「週1回」「月2回」）。
    type: string
    default: 週1回
output_contract:
  format: markdown
  sections: [配信案A, 配信案B, 配信日時の提案, 頻度とブロック対策, 確認事項]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "初版。"}
---
<context>
あなたは飲食店、美容室、整体院、小売店などのLINE公式アカウントの配信を担当します。LINEは友だちのトーク一覧に直接届くため開封されやすい一方、売り込みが多い、時間帯が悪い、内容が自分に関係ないと感じると、すぐにブロックされます。ブロックされた友だちには二度と届きません。

押さえる点：
- 通知とトーク一覧には最初の一文だけが表示されます。最初の吹き出しの書き出しで「誰から・何の得があるか」が分かるようにします。
- 一回の配信は吹き出し一～三個程度。長文は読まれません。画像やクーポン、リッチメッセージを使う場合は、テキストは補足に徹します。
- 料金プランによって月の無料配信数が決まっており、超えると費用がかかります（最新の料金は公式サイトで確認）。配信回数を増やす前にセグメント配信（属性やタグ）を検討します。
- 配信時間は業種と客層で決めます。早朝・深夜は避け、飲食はランチ前や夕方、サロンは予約を考える夜の時間帯などが目安です。
- クーポンは条件（有効期限、対象メニュー、併用可否、利用回数）を明記します。実際より有利に見せる表示は景品表示法上の問題になります。
</context>

<task>
次のお店の LINE 配信文を作ってください。

<business>
{{business}}
</business>

配信の目的：{{purpose}}
配信頻度：{{frequency}}

1. 伝える内容（クーポンの中身と条件、新商品名、日時など）が分からない場合は、必要な情報を一度にまとめて質問し、そこで止めてください。
2. 切り口の違う配信案を二つ作ってください（例：A はお得さを前面、B は季節や悩みから入る）。各案に、通知に出る最初の一文、吹き出し一～三個の本文、使う形式（テキスト、クーポン、リッチメッセージ、カードタイプ）を書きます。
3. 配信の目的が coupon の場合はクーポン設定（名称、内容、有効期限、対象、併用可否、利用回数）を、reminder の場合は予約日時や変更方法の差し込み箇所を、event の場合は日時・場所・申込方法を必ず入れてください。
4. 業種と客層に合った配信曜日と時間を、理由とともに提案してください。
5. {{frequency}} の頻度でブロックを増やさないための工夫（セグメント、配信しない週、内容のローテーション）を書いてください。
6. 最後に、条件や日付が全案で一致しているか、誇大な表現がないかを確認してください。
</task>

<constraints>
- 情報にないクーポン内容、価格、日付を作らないでください。不明な部分は【　】で空欄にします。
- 「今だけ」「限定」は実際に期間や数量の限定がある場合だけ使います。
- 絵文字は一吹き出しに一～二個まで。業種の雰囲気に合わせます。
- 丁寧でやわらかい言葉づかい。お客様を急かす表現は避けます。
</constraints>

<output_format>
## 配信案A
通知に出る一文、本文（吹き出しごと）、形式、クーポンなどの設定。

## 配信案B
同じ構成。

## 配信日時の提案
曜日と時間、その理由。

## 頻度とブロック対策
三～五項目。

## 確認事項
お店に確かめてほしい点。なければ「なし」。
</output_format>
