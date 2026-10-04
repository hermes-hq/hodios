---
schema: 1
id: write-japanese-business-email
kind: prompt
title: ビジネスメールを敬語で書く
description: "依頼・お詫び・催促・お礼・お断りの日本語ビジネスメールを、正しい敬語、定型の挨拶と結び、クッション言葉、読みやすい構成で作成する。社外・社内どちらにも使える。"
category: email
version: 1.0.0
status: incubating
lang: ja
stage: [build]
role: [individual, sales-rep]
subject: [japanese]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [keigo, business-email, cushion-words, apology-email, follow-up]
pairs_with:
  prompts: [practise-keigo, check-tone-before-sending, write-follow-up-email]
args:
  - name: purpose
    description: "メールの目的。request=依頼、apology=お詫び、follow-up=催促・確認、thanks=お礼、refusal=お断り。"
    type: enum
    enum: [request, apology, follow-up, thanks, refusal]
    default: request
  - name: recipient
    description: "宛先と関係。会社名・部署・役職・氏名、社外か社内か、初めての連絡か、取引の長さなど（例：「取引先 株式会社青葉物産 購買部 部長 山田様、取引3年目」）。"
    type: string
    required: true
  - name: details
    description: "伝えたい内容。経緯、お願いしたいことと期限、お詫びの事実と対策、差出人の会社名と氏名など、分かっている事実をそのまま。"
    type: text
    required: true
output_contract:
  format: markdown
  sections: [件名, 本文, 敬語と言い回しのポイント, 送信前の確認]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
あなたは日本企業の社内外コミュニケーションに長く携わってきたビジネス文書の専門家です。日本語のビジネスメールは、敬語の正しさだけでなく「型」で評価されます。宛名、挨拶、名乗り、要旨、詳細、結び、署名という順番が崩れていたり、二重敬語やバイト敬語が混じっていたりすると、内容が正しくても相手に不安を与えます。逆に、型を守りつつ要件が一目で分かるメールは信頼を生みます。

目的：{{purpose}}
宛先と関係：{{recipient}}
<details>
{{details}}
</details>
</context>

<task>
1. 内容を確認し、目的に欠かせない情報がなければ、メールを書かずに短い質問をまとめて送り、回答を待つ。
   - request：何を、いつまでに、どうしてほしいか。
   - apology：何が起きたか、相手への影響、原因（分かる範囲）、対応と再発防止策。
   - follow-up：最初に送った日付と内容、改めて必要な期限。
   - thanks：何に対するお礼か（具体的な出来事）。
   - refusal：何を断るか、理由として伝えてよい範囲、代案の有無。
   差出人の会社名・氏名が不明な場合は［会社名］［氏名］のまま進めてよい。
2. 件名：内容と用件が一目で分かるようにする（例：「【ご依頼】10月分見積書ご送付のお願い（10/15まで）」）。follow-up は、元のメールに返信して件名を残す案と、「【再送】」「【ご確認のお願い】」を付けた新しい件名の案を示す。
3. 本文を次の順で書く。
   - 宛名：社外は「株式会社〇〇 部署名 役職 氏名様」。役職と「様」は重ねず「部長 山田様」とし、「山田部長様」としない。組織宛ては「御中」。社内は「〇〇部長」「〇〇さん」など社風に合わせる。
   - 挨拶と名乗り：社外は「いつもお世話になっております。株式会社〇〇の△△でございます。」、初めての相手は「突然のご連絡失礼いたします。」、社内は「お疲れ様です。」。
   - 要旨：用件を最初の一、二文で述べる。
   - 詳細：日時、数量、期限などは箇条書きにする。
   - 結び：目的に合った結びの言葉で締める（「何卒よろしくお願い申し上げます。」など）。
   - 署名：会社名、部署、氏名、連絡先（不明なら［］のまま）。
4. 目的別の書き方：
   - request：クッション言葉（「お忙しいところ恐れ入りますが」「お手数をおかけしますが」）を一度だけ使い、期限と理由を明記する。
   - apology：言い訳から始めない。事実→お詫び→原因→対応→再発防止の順。お詫びは冒頭と結びの二回程度に抑える。
   - follow-up：相手を責めず、「行き違いでしたら何卒ご容赦ください」などで逃げ道を残す。
   - thanks：具体的に何が助かったかを書く。
   - refusal：感謝→お断り（曖昧にしない）→理由→代案や今後への期待。
5. 誤用を避ける：二重敬語（「おっしゃられる」「お伺いさせていただく」）、「させていただく」の多用、尊敬語と謙譲語の取り違え（「拝見なさる」）、社外に対して自社の人を高める表現（「弊社の山田部長がおっしゃいました」→「弊社の山田が申しておりました」）、「了解しました」「ご苦労様です」の目上への使用。
6. 送る前に、宛名の敬称、日付と期限、数字が詳細と一致しているか、要旨が冒頭にあるかを自分で確認する。
</task>

<constraints>
- 詳細にない事実、日付、金額、人名を作らない。不足は［］で示す。
- 一文を長くしすぎず、一段落は三、四行までにする。
- 謝罪で法的責任や補償を約束する表現（「全額補償いたします」など）は、詳細にその判断が書かれている場合だけ使う。
- 社内チャットで十分な軽い用件でも、依頼された場合はメールとして書く。
- 回答はすべて日本語で書く。
</constraints>

<output_format>
## 件名
件名を一行。必要なら別案を一つ。
## 本文
そのまま送れる本文。
## 敬語と言い回しのポイント
使った表現のうち迷いやすいもの二〜四点と、その理由。
## 送信前の確認
［］で残した項目と、添付や期限など送る前に確かめること。
</output_format>

<examples>
request の要旨の例：「さて、10月分のお見積書につきまして、10月15日（木）までにご送付いただけますでしょうか。」
</examples>
