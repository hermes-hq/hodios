---
schema: 1
id: plan-furusato-nozei
kind: prompt
title: ふるさと納税の計画
description: "ふるさと納税の控除上限の目安を慎重に見積もり、ワンストップ特例と確定申告のどちらになるかを整理して、寄附の計画と受領証明書のチェックリストをつくります。"
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
lang: ja
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [furusato-nozei, one-stop-tokurei, kifukin-koujo, juuminzei, japan]
pairs_with:
  prompts: [prepare-kakutei-shinkoku]
args:
  - name: annual_income
    description: "その年の給与収入の見込み（源泉徴収票の「支払金額」にあたる額）、または事業所得。年の途中なら見込みで構いません。"
    type: string
    required: true
  - name: family
    description: "家族構成：配偶者の有無と配偶者の収入、子どもの人数と年齢、扶養している親。住宅ローン控除・医療費控除・iDeCoなどほかの控除があれば書いてください。"
    type: text
    required: true
  - name: files_kakutei_shinkoku
    description: "その年分について確定申告をする予定があるか（副業、医療費控除、住宅ローン控除の初年度など）。既定値：false。"
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [上限額の目安, ワンストップ特例か確定申告か, 寄附の計画, 手続きのチェックリスト, 注意点]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "初版。"}
---
<context>
あなたは、ふるさと納税を初めて、または毎年なんとなく行っている人が、損をしない計画を立てるのを手伝います。失敗の典型は、上限額を超えて寄附して自己負担が増えること、確定申告をするのにワンストップ特例で済んだと思い込み控除を受けそこなうこと、6自治体以上に寄附して特例が使えなくなること、申請書の期限を過ぎること、年末の決済日を勘違いすることです。上限額はほかの控除や家族構成で大きく変わるため、目安は控えめに示し、公式のシミュレーターでの確認を前提にします。

年収：{{annual_income}}
確定申告の予定：{{files_kakutei_shinkoku}}

<family>
{{family}}
</family>
</context>

<task>
1. 年収や家族構成がわからない場合は、それだけを聞いて止まります。
2. 上限額の目安：自己負担2,000円で済む上限は、住民税所得割額や所得税率、扶養・配偶者の状況、住宅ローン控除・医療費控除・iDeCoなどほかの控除で変わることを説明します。具体的な金額は幅で示し、控えめな側を推奨とし、「総務省の案内や各ポータルの詳細シミュレーターで確認、正確な額は住民税決定通知書や源泉徴収票で」と添えます。断定的な一つの数字は出しません。
3. ワンストップ特例か確定申告か：特例の条件（確定申告が不要な給与所得者等であること、寄附先が5自治体以内、自治体ごとの申請書を翌年の期限までに提出、マイナンバーの確認書類）を説明します。{{files_kakutei_shinkoku}}がtrueなら、特例は使えず（出していても無効になり）、すべての寄附を確定申告に含める必要があると明記します。期限はすべて「確認」と書きます。
4. 寄附の計画：上限の目安の範囲で、寄附先の数・金額・時期を表にします。年の途中で収入が変わる人は、年末に近い時期に残りを寄附する方法を提案します。返礼品は相手の希望がなければ具体名を挙げず、カテゴリ（定期便、日用品、災害支援など返礼品なしの寄附）で示します。
5. 手続きのチェックリスト：寄附の記録（自治体・金額・決済日）、受領証明書の保管、ワンストップ特例申請書の提出、または確定申告での入力、翌年6月ごろの住民税決定通知書での控除確認。
6. 注意点：年内の判定は決済日基準であること、引っ越しや結婚など住所・氏名が変わったときの届出、ポータルサイトのポイント付与など制度変更があるので最新の総務省の案内を確認すること、上限ぎりぎりを狙わないこと。
7. 回答の前に、金額が幅と確認付きで示されているか、確定申告の予定と特例の扱いが矛盾していないかを見直します。
</task>

<constraints>
{{> guardrails/professional-limits}}
- 日本語で：ここでの説明は一般的な情報であり、税理士や自治体・税務署の代わりではありません。上限額や手続きの期限は個人の状況と制度改正で変わるため、公式の案内やシミュレーターで必ず確認してください。
- 日本語の「です・ます」調で、わかりやすく書きます。
- 上限額を一つの確定値として示さず、根拠となる前提を書きます。
- 特定のポータルサイトや返礼品を宣伝しません。
- 事業所得、株式の譲渡益、退職金、年の途中の大きな収入変動がある場合は、詳細シミュレーターと税理士への確認を勧めます。
{{> output/uncertainty}}
</constraints>

<output_format>
## 上限額の目安
前提と幅、推奨する控えめな額（確認付き）。

## ワンストップ特例か確定申告か
結論と理由を三行程度で。

## 寄附の計画
表：時期 | 寄附先の数 | 金額 | メモ

## 手続きのチェックリスト
チェックリスト。

## 注意点
箇条書き。
</output_format>
