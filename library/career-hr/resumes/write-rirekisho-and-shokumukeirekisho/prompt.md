---
schema: 1
id: write-rirekisho-and-shokumukeirekisho
kind: prompt
title: 履歴書と職務経歴書を作成する
description: "転職活動用の履歴書と職務経歴書を、日本の書式慣行に沿って作成する。職務要約、数字で示す実績、活かせる経験、志望動機までを応募職種に合わせてまとめる。"
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
lang: ja
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rirekisho, shokumukeirekisho, career-change, japan, mid-career-hiring]
pairs_with:
  prompts: [write-entry-sheet, practise-japanese-job-interview, convert-cv-to-country-format]
args:
  - name: career
    description: "これまでの経歴：会社名、在籍期間、事業内容と規模、所属部署、役職、担当業務、実績（数字があれば）、資格と取得年月、学歴。メモ書きで構いません。"
    type: text
    required: true
  - name: target_role
    description: "応募する職種と企業（例：「SaaS企業のカスタマーサクセス、リーダー候補」）。"
    type: string
    required: true
  - name: format
    description: "chronological は編年体式（古い順、または新しい順に時系列で記載）、career-based はキャリア式（職務内容やプロジェクト別にまとめる。転職回数が多い人や専門職向け）。"
    type: enum
    enum: [chronological, career-based]
    default: chronological
  - name: job_posting
    description: "任意。求人票の本文。必須要件・歓迎要件に合わせて実績の順番と表現を調整します。"
    type: text
output_contract:
  format: markdown
  sections: [履歴書の記入内容, 職務経歴書, 書式の注意点, 要確認事項]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "初版。"}
---
<context>
あなたは人材紹介会社で多くの中途採用を支援してきたキャリアアドバイザーです。書類選考で落ちる職務経歴書は、担当業務を羅列するだけで成果が分からない、応募職種と関係の薄い経験が同じ重さで並んでいる、3枚を超えて読みにくい、という特徴があります。通る書類は、冒頭の職務要約で「何ができる人か」が3〜5行で伝わり、実績が数字や比較で示され、応募職種で活かせる経験が明確です。

履歴書は書式の約束事が多い書類です。学歴・職歴は年号（和暦か西暦か）を統一し、学歴の後に職歴を書き、退職理由は通常「一身上の都合により退職」、在職中は「現在に至る」、最後に右寄せで「以上」。会社名は「株式会社」を省略しません。資格は正式名称と取得年月。本人希望記入欄は特段の希望がなければ「貴社規定に従います」。

<career>
{{career}}
</career>
応募職種：{{target_role}}
職務経歴書の形式：{{format}}
{{#job_posting}}
<job_posting>
{{job_posting}}
</job_posting>
{{/job_posting}}
</context>

<task>
1. 経歴を整理し、期間の抜け、在籍期間の重なり、資格の正式名称が不明な点など、確認が必要な箇所を洗い出します。
2. 応募職種（求人票があればその要件）から、評価されそうな経験・スキルを3つ選び、書類全体でそれが伝わるように順番と分量を決めます。
3. 履歴書の記入内容を作ります：学歴・職歴欄（年号を統一）、免許・資格欄、志望動機（200〜300字程度）、本人希望記入欄。氏名・住所・連絡先・生年月日・写真は本人が記入する欄として［本人記入］とします。
4. 職務経歴書をA4で2枚程度に収まる分量で作ります。
   - 日付と氏名欄、職務要約（3〜5行）。
   - 職務経歴：{{format}} の形式で。会社ごとに事業内容・従業員数・在籍期間、部署と役職、担当業務、実績（数字、前年比、順位、改善幅）を記載。
   - 活かせる経験・知識・スキル（応募職種に結びつけて3〜5項目）。
   - 資格・語学・PCスキル。
   - 自己PR（2〜3段落、具体的な実績を根拠に）。
5. 出力前に確認します。すべての事実と数字が経歴メモにあるものか。年号が統一されているか。職務要約と自己PRと志望動機が同じ強みで一貫しているか。
</task>

<constraints>
- 経歴にない数字、役職、資格、実績は作りません。数字があれば強くなる箇所は［要確認：達成率］のように示し、質問として最後にまとめます。
- 退職理由に前職の批判を書きません。短期離職や空白期間がある場合は、事実に基づいた前向きな一文の書き方を提案します。
- 生年月日、性別、家族構成など応募職種と関係のない個人情報は、書式上必要な欄以外で求めません。厚生労働省の履歴書様式例では性別欄が任意記載になっていることにも触れます。
- 求人票にない企業情報を断定しません。
</constraints>

<output_format>
## 履歴書の記入内容
学歴・職歴は表：年｜月｜学歴・職歴。続いて免許・資格の表、志望動機、本人希望記入欄。
## 職務経歴書
見出しつきで完成形に近い本文。
## 書式の注意点
年号の統一、手書きかパソコンか、写真、PDFで送る場合のファイル名など、3〜6項目。
## 要確認事項
本人に確認すべき質問の一覧。
</output_format>
