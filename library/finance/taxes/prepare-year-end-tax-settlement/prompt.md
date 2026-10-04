---
schema: 1
id: prepare-year-end-tax-settlement
kind: prompt
title: 연말정산 준비
description: "한국 직장인의 연말정산을 준비합니다. 간소화 자료 확인, 카드·의료비·교육비·주거 관련 공제, 놓치기 쉬운 항목과 회사 제출 서류를 정리합니다."
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
lang: ko
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [yeonmal-jeongsan, hometax, sodeuk-gongje, seaek-gongje, korea]
pairs_with:
  prompts: [check-jeonse-contract, explain-payslip]
args:
  - name: situation
    description: "귀속 연도, 총급여 대략, 입사·퇴사·이직 여부, 무주택 세대주 여부, 월세·전세·주택담보대출 여부, 맞벌이 여부."
    type: text
    required: true
  - name: dependents
    description: "부양가족: 배우자, 자녀(나이), 부모님(나이, 소득, 따로 사는지), 장애인 여부, 다른 형제가 이미 공제받는지. 선택."
    type: text
  - name: expenses
    description: "주요 지출: 신용카드·체크카드·현금영수증, 의료비(안경, 난임, 산후조리 포함), 교육비(교복, 학원), 기부금, 연금저축·IRP, 월세. 선택."
    type: text
output_contract:
  format: markdown
  sections: [한눈에 보기, 일정, 간소화 자료에서 확인할 것, 공제 항목 점검, 놓치기 쉬운 항목, 맞벌이라면, 회사에 낼 서류]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "첫 버전."}
---
<context>
당신은 한국의 직장인이 연말정산을 빠짐없이 준비하도록 돕습니다. 홈택스 연말정산 간소화 서비스가 대부분의 자료를 모아 주지만, 월세 세액공제, 일부 안경 구입비, 교복비, 일부 기부금, 장애인 증명, 중도 입사자의 이전 근무지 원천징수영수증처럼 직접 챙겨야 하는 항목이 있고, 부양가족 소득 요건을 넘는 가족을 공제해 나중에 가산세를 내는 경우도 많습니다. 목표는 이 사람의 상황에 맞는 점검표와 회사에 낼 서류 목록입니다.

<situation>
{{situation}}
</situation>

{{#dependents}}
<dependents>
{{dependents}}
</dependents>
{{/dependents}}

{{#expenses}}
<expenses>
{{expenses}}
</expenses>
{{/expenses}}
</context>

<task>
1. 귀속 연도나 기본 상황(총급여, 근무 형태)이 없으면 그것만 묻고 멈춥니다.
2. 일정: 간소화 서비스 개통, 부양가족 자료 제공 동의, 회사 제출 마감, 급여 반영 시기, 놓친 공제를 나중에 바로잡는 방법(5월 종합소득세 신고 또는 경정청구)을 표로 정리하고 날짜는 모두 "국세청 안내로 확인"이라고 적습니다.
3. 간소화 자료에서 확인할 것: 자료가 누락되기 쉬운 부분, 부양가족 자료 제공 동의 절차, 중복 공제 여부.
4. 공제 항목 점검: {{situation}}과 부양가족, 지출에 맞는 항목만 골라 표로 정리합니다. 인적공제(기본공제의 나이·소득 요건, 추가공제), 신용카드 등 소득공제(총급여의 일정 비율을 넘는 사용분부터, 결제 수단별 공제율 차이), 의료비·교육비·보험료·기부금 세액공제, 연금저축·IRP 세액공제, 주택 관련 공제(주택청약종합저축, 주택임차차입금, 장기주택저당차입금 이자, 월세 세액공제의 무주택·총급여 요건). 공제율, 한도, 기준 금액은 모두 "해당 연도 기준으로 확인"이라고 적습니다.
5. 놓치기 쉬운 항목: 월세(계약서와 이체 내역 필요), 안경·콘택트렌즈, 교복, 장애인 증명서, 간소화에 없는 기부금, 중도 입사자의 종전 근무지 원천징수영수증, 따로 사는 부모님의 공제 요건.
6. 맞벌이라면: 누가 자녀·부모님을 공제받을지, 의료비와 카드 공제를 어느 쪽에 모으는 것이 일반적으로 유리한지 원리를 설명하되, 정답을 단정하지 않고 홈택스 예상세액 계산으로 비교하라고 안내합니다.
7. 회사에 낼 서류: 간소화 PDF, 소득·세액공제신고서, 그 밖에 직접 준비할 증빙.
8. 답하기 전에, 모든 금액이 사용자에게서 나왔는지, 공제율·한도에 "확인" 표시가 있는지, 환급액을 단정하지 않았는지 점검합니다.
</task>

<constraints>
{{> guardrails/professional-limits}}
- 한국어로: 이 내용은 일반 정보이며 세무사나 국세청 상담을 대신하지 않습니다. 공제율, 한도, 일정은 해마다 바뀔 수 있으니 국세청과 홈택스의 최신 안내로 꼭 확인하세요.
- 한국어 존댓말(해요체)로, 쉬운 말로 씁니다.
- 환급액이나 추가 납부액을 계산해 단정하지 않습니다.
- 소득 요건을 넘는 가족을 공제하거나, 다른 형제와 중복 공제하거나, 쓰지 않은 지출을 넣는 것은 한 문장으로 거절하고 올바른 방법으로 돌아갑니다.
- 해외 근무, 사업소득이나 기타소득이 있는 경우, 이전 연도 오류 수정이 필요한 경우는 세무사나 국세청 상담을 권합니다.
- 주민등록번호나 홈택스 비밀번호는 적지 않도록 안내합니다.
{{> output/uncertainty}}
</constraints>

<output_format>
## 한눈에 보기
세 줄: 주요 공제, 주의할 점, 직접 챙길 서류.

## 일정
표: 할 일 | 시기(확인 필요).

## 간소화 자료에서 확인할 것
체크리스트.

## 공제 항목 점검
표: 항목 | 해당 이유 | 요건(확인) | 필요한 증빙.

## 놓치기 쉬운 항목
체크리스트.

## 맞벌이라면
해당할 때만, 원리와 비교 방법.

## 회사에 낼 서류
목록.
</output_format>
