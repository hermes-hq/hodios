---
schema: 1
id: understand-nenkin-statement
kind: prompt
title: ねんきん定期便の見方
description: "日本の「ねんきん定期便」を一行ずつ説明し、保険料と加入期間が将来の年金にどうつながるか、記録の漏れや未納期間の確認点、年金事務所への質問を整理します。"
category: financial-planning
version: 1.0.0
status: incubating
stage: [review, learn]
role: [individual]
requires: [none]
inputs: [document, preferences]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
lang: ja
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [nenkin-teikibin, kousei-nenkin, kokumin-nenkin, nenkin-net, japan]
pairs_with:
  prompts: [understand-pension-statement, plan-retirement-scenarios]
args:
  - name: statement_text
    description: "ねんきん定期便に書かれている内容（加入期間の月数、これまでの保険料納付額、年金額または見込額、最近の月別状況など）。基礎年金番号や氏名、住所は書かないでください。"
    type: text
    required: true
  - name: age
    description: 現在の年齢。50歳未満か以上かで、定期便に載る年金額の意味が変わります。
    type: number
    required: true
  - name: employment_history
    description: "これまでの働き方の流れ：会社員（厚生年金）、自営業・学生・無職（国民年金）、配偶者の扶養（第3号）、海外勤務、転職回数、旧姓での加入など。任意。"
    type: text
output_contract:
  format: markdown
  sections: [ひとことで, 一行ずつの説明, この数字が意味すること, 確認したい点, 今後の選択肢, 年金事務所で聞くこと]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "初版。"}
---
<context>
あなたは、毎年届く「ねんきん定期便」をよく読まずにしまっている人に、その中身をわかる言葉で説明します。誤解されやすいのは、50歳未満の人に載っている年金額が「これまでの加入実績だけで計算した額」で将来の見込みではないこと、金額が税金や社会保険料を引く前の額であること、「保険料納付額」が本人負担分の累計であること、そして転職や結婚による記録の漏れや、学生時代などの未納・免除期間です。目的は、記録が正しいかを確認し、次に何をすればよいかを示すことです。

年齢：{{age}}歳

<statement_text>
{{statement_text}}
</statement_text>

{{#employment_history}}
<employment_history>
{{employment_history}}
</employment_history>
{{/employment_history}}
</context>

<task>
1. 定期便の内容がほとんどない、または年齢がない場合は、それだけを聞いて止まります。
2. 定期便の種類を判断します（節目の年齢に届く封書は全期間の記録、それ以外のはがきは直近の記録が中心）。{{age}}歳では年金額欄が「これまでの加入実績に応じた額」か「60歳まで今の条件で加入を続けた場合の見込額」かを説明します。
3. 一行ずつの説明：加入期間（国民年金の第1号・第3号、厚生年金、合計、受給資格期間との関係）、これまでの保険料納付額、老齢基礎年金と老齢厚生年金の額、最近の月別状況（標準報酬月額、標準賞与額、納付状況）を、書かれている数字を使って表にします。
4. この数字が意味すること：基礎年金は加入月数で、厚生年金は加入中の報酬で決まるという仕組みを短く説明し、記載額が額面であり手取りではないことを伝えます。将来の受給額は数字を断定せず、「ねんきんネットの試算で確認」と伝えます。
5. 確認したい点：{{employment_history}}と照らして、会社員だった期間が欠けていないか、標準報酬月額が実際の給与とかけ離れていないか、未納や免除・学生納付特例の期間、旧姓や別の番号で加入していた可能性。追納や任意加入で増やせる場合があることを、条件は「確認」として挙げます。
6. 今後の選択肢：受給開始を早める・遅らせると額が変わること（増減率は確認）、付加年金やiDeCoなど一般的な選択肢を、勧めずに紹介します。
7. 年金事務所で聞くこと：この人の記録に合わせた質問を三つから五つ。持っていくもの（定期便、本人確認書類、年金手帳や基礎年金番号通知書、職歴のメモ）も添えます。
8. 回答の前に、すべての数字が定期便の記載から来ているか、制度の率や条件に「確認」が付いているかを見直します。
</task>

<constraints>
{{> guardrails/professional-limits}}
- 日本語で：ここでの説明は一般的な情報であり、年金事務所や社会保険労務士、ファイナンシャルプランナーの代わりではありません。制度の率や条件は改正されるため、日本年金機構の最新の案内で確認してください。
- 日本語の「です・ます」調で、落ち着いた言葉で書きます。
- 将来の年金額や「得な受給開始年齢」を断定しません。
- 特定の金融商品を勧めません。
- 基礎年金番号やマイナンバーは書き込まないよう伝えます。
{{> output/uncertainty}}
</constraints>

<output_format>
## ひとことで
二、三行。

## 一行ずつの説明
表：項目 | 記載の数字 | 意味

## この数字が意味すること
短い説明。

## 確認したい点
チェックリスト。

## 今後の選択肢
箇条書き（勧めない形で）。

## 年金事務所で聞くこと
番号付きの質問と持ち物。
</output_format>
