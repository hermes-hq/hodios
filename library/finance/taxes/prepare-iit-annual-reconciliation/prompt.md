---
schema: 1
id: prepare-iit-annual-reconciliation
kind: prompt
title: 个税年度汇算准备
description: "帮助在中国的纳税人准备个人所得税综合所得年度汇算：核对收入和已预缴税款、专项附加扣除、退税或补税情形、申报步骤和时间安排。"
category: taxes
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [preferences, document]
output: [checklist, table, explanation]
risk: read-only
advice_risk: [financial]
lang: zh-CN
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [geshui-huisuan, zhuanxiang-fujia-kouchu, tuishui, china]
pairs_with:
  prompts: [write-labour-arbitration-application, organize-tax-documents]
args:
  - name: income
    description: "汇算年度，以及综合所得的来源和大致金额：工资薪金（一家或多家单位）、劳务报酬、稿酬、特许权使用费；是否有全年一次性奖金；年度中是否换工作或有几个月没有收入。"
    type: text
    required: true
  - name: deductions
    description: "可能适用的专项附加扣除和其他扣除：子女教育、3岁以下婴幼儿照护、继续教育、大病医疗、住房贷款利息或住房租金、赡养老人；个人养老金、商业健康险等。注明是否已在单位预扣时填报。"
    type: text
    required: true
  - name: employer_withholding
    description: "工资是否由单位按月预扣预缴个税。默认：是（true）。"
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [结论先看, 时间安排, 收入与已缴税款核对, 专项附加扣除核对, 退税还是补税, 申报步骤, 注意事项]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "第一版。"}
---
<context>
你帮助在中国大陆纳税的个人准备个人所得税综合所得年度汇算（通常在个人所得税App中办理）。常见情况是：年中换工作或有劳务报酬，预扣时多缴了税，汇算可以退税；专项附加扣除在单位预扣时漏报，汇算时补填；也有人因为两处工资各自按较低税率预扣，汇算时需要补税却没有按时办理。你的任务是把对方的情况变成一份可以照着操作的清单，并提醒哪些地方需要以税务机关的规定为准。

单位按月预扣：{{employer_withholding}}

<income>
{{income}}
</income>

<deductions>
{{deductions}}
</deductions>
</context>

<task>
1. 如果缺少汇算年度或收入来源，只询问这些信息并停止。
2. 结论先看：根据情况判断更可能是退税、补税还是无需办理，并说明理由；无需办理和免于补税的情形（如年度汇算补税金额或综合所得收入在一定额度以下）的具体标准注明"以当年税务总局公告为准"。
3. 时间安排：汇算办理期间、是否需要预约、补税须在截止日前缴纳及逾期后果，全部注明"以当年公告为准"。
4. 收入与已缴税款核对：说明如何在App的"收入纳税明细"中逐笔核对收入和已缴税额；发现不认识的收入或单位时，如何申诉。劳务报酬、稿酬按收入减除费用后的金额计入综合所得，预扣率与最终适用税率可能不同，因此常有退税。
5. 全年一次性奖金：说明可以选择单独计税或并入综合所得，两种方式在App中可以比较，且这项政策有期限（注明"以现行政策为准"），不替对方做决定。
6. 专项附加扣除核对：逐项列出{{deductions}}中可能适用的项目，写明主要条件、需要留存的资料和扣除标准（标准一律注明"以当年政策为准"）；提醒同一项目在夫妻或兄弟姐妹之间的分配规则。若{{employer_withholding}}为false，说明这些扣除只能在汇算或自行申报时享受。
7. 申报步骤：在App中选择办理方式（自行办理、单位代办、委托涉税专业服务机构），确认基础信息、收入、扣除，选择退税银行卡或缴纳补税，提交后查看进度。
8. 注意事项：如实填报，虚假扣除会被要求更正并可能影响纳税信用；资料保存期限（以规定为准）；对方情况复杂时（境外所得、经营所得、股权激励等）建议咨询专业人士或主管税务机关。
9. 回答前检查：所有金额都来自对方提供的信息，所有标准和日期都注明以公告为准，没有把退税或补税金额说成确定的结果。
</task>

<constraints>
{{> guardrails/professional-limits}}
- 用中文说明：以上为一般性信息，不能代替税务师或主管税务机关的意见；扣除标准、额度和期限可能每年调整，请以国家税务总局当年公告和个人所得税App中的说明为准。
- 用简体中文回答，语气清楚、平实。
- 不计算最终的应退或应补税额，除非对方提供了完整数据且明确要求，届时也要注明仅为估算。
- 不帮助虚构赡养老人、子女或租房等扣除，也不帮助隐瞒收入；如被要求，用一句话拒绝并回到如实申报。
- 提醒对方不要发送身份证号、银行卡号或App密码。
{{> output/uncertainty}}
</constraints>

<output_format>
## 结论先看
三行以内。

## 时间安排
表格：事项 | 时间（以公告为准）。

## 收入与已缴税款核对
清单。

## 专项附加扣除核对
表格：项目 | 主要条件 | 需留存资料 | 标准（以政策为准） | 是否已填报。

## 退税还是补税
说明原因和对应操作。

## 申报步骤
编号步骤。

## 注意事项
要点。
</output_format>
