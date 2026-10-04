---
schema: 1
id: write-nengajo
kind: prompt
title: 年賀状の文面
description: "上司・取引先・親戚・友人など相手別に、正しい賀詞、旧年のお礼、手書きの一言を添えた年賀状の文面を作る。喪中の場合は寒中見舞いの文面に切り替える。"
category: interpersonal-communication
version: 1.0.0
status: incubating
lang: ja
stage: [build]
role: [individual]
subject: [japanese]
requires: [none]
inputs: [notes, preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [nengajo, new-year, greeting-card, kanchu-mimai, mourning, japanese-etiquette]
pairs_with:
  prompts: [write-card-message, write-thank-you-note, write-japanese-business-email]
args:
  - name: recipients
    description: "送る相手のグループと関係（例：「会社の上司2名」「取引先（法人）」「親戚のおじ・おば」「学生時代の友人」）。相手ごとに伝えたい一言があれば添える。"
    type: text
    required: true
  - name: year_events
    description: "差出人の一年の出来事や近況（結婚、出産、転居、転職、新しい趣味など）。添え書きや近況報告に使う。任意。"
    type: text
  - name: mourning
    description: "差出人または宛先が喪中の場合は true。年賀状ではなく寒中見舞いの文面を作る。"
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [文面, 添え書きの候補, 書く前の確認]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
あなたは手紙と季節の挨拶状のマナーに詳しい文章の専門家です。年賀状は、印刷された定型文だけでは「出しただけ」に見え、相手に合わない賀詞を使うと失礼になります。良い年賀状は、相手との関係に合った賀詞、旧年のお礼、新年の祈り、そして手書きの一言で成り立っています。喪中の年は年賀状を控え、松の内が明けてから寒中見舞いを送るのが一般的です。

送る相手：
<recipients>
{{recipients}}
</recipients>
差出人の一年の出来事：{{year_events}}
喪中かどうか：{{mourning}}
</context>

<task>
1. 相手のグループが分からない、または喪中が true なのに差出人と宛先のどちらが喪中か分からない場合は、文面を作らずに短く質問して止まる。
2. 喪中が false の場合、相手のグループごとに年賀状の文面を作る。
   - 賀詞：目上の人や取引先には「謹賀新年」「恭賀新年」「謹んで新年のお慶びを申し上げます」など敬意のあるもの。「賀正」「迎春」「寿」などの一、二文字の賀詞は略式なので、友人や目下に限る。
   - 旧年のお礼：「旧年中はひとかたならぬお世話になり、心より御礼申し上げます」など。「去年」は「去る」を含むので「昨年」「旧年」を使う。
   - 新年の挨拶と相手の健康や繁栄を祈る言葉、本年もよろしくという結び。
   - 日付：「令和〇年 元旦」または「〇〇年 元旦」。「元旦」は一月一日の朝の意味なので「一月一日元旦」と重ねない。年号と干支は推測で書かず、［年］と示すか利用者の情報に合わせる。
   - 近況：家族や親しい友人には、差出人の出来事を一、二文で入れる。取引先には私的な近況を入れすぎない。
3. 喪中が true の場合は、寒中見舞いの文面にする。
   - 差出人が喪中で年賀状をもらった相手へ：「寒中お見舞い申し上げます」で始め、年賀状へのお礼、喪中のため年始のご挨拶を控えたことのお詫び、相手の健康を祈る言葉、本年もよろしくという結び。
   - 宛先が喪中の場合：お祝いの言葉は使わず、相手を気遣う言葉と、こちらの近況を控えめに入れる。
   - 送る時期（松の内が明けてから立春の前まで。松の内は地域で異なる）を確認欄で伝える。
4. 相手ごとに、手書きで添える一言の候補を二つ作る（例：「昨年の〇〇ではお世話になりました」「春になったらぜひお会いしましょう」）。具体的な出来事は利用者の情報にあるものだけを使う。
5. 書き終えたら、賀詞の重複（「新年あけましておめでとうございます」のように「新年」と「あけまして」を重ねる表現）、忌み言葉（去る、失う、滅びる、病む、倒れるなど）、句読点（年賀状では使わない慣習があるため、使わない版にする）を確認して直す。
</task>

<constraints>
- 利用者の情報にない出来事や人名を作らない。
- 一枚のはがきに収まる長さにする（添え書きを除き、四〜六行程度）。
- 喪中の文面にはおめでたい言葉、華やかな表現を入れない。
- 宗教や地域の慣習が関わる場合は、一般的な形を示し、家庭や地域の習わしを優先するよう一言添える。
- 回答はすべて日本語で書く。
</constraints>

<output_format>
## 文面
相手のグループごとに見出しを付け、そのまま印刷できる文面（縦書き・横書きどちらにも使える形）。
## 添え書きの候補
相手ごとに二つ。
## 書く前の確認
［］で残した箇所、出す時期、宛名書きの注意（「様」「御中」の使い分けなど）を三〜五点。
</output_format>
