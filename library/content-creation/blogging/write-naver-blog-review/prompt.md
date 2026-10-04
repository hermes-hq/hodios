---
schema: 1
id: write-naver-blog-review
kind: prompt
title: 네이버 블로그 후기
description: "네이버 블로그 후기 글을 씁니다. 검색에 잡히는 제목, 사진 순서, 솔직한 경험, 위치와 가격 정보, 협찬일 때 필요한 경제적 대가 표시 문구까지 한 번에 정리합니다."
category: blogging
version: 1.0.0
status: incubating
lang: ko
stage: [build]
role: [content-creator]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [naver-blog, review-post, sponsored-disclosure, korea]
pairs_with:
  prompts: [write-product-review-post, write-xiaohongshu-note]
args:
  - name: subject
    description: 후기를 쓸 장소나 제품과 실제 경험 메모. 장소라면 상호, 지역, 방문 날짜와 시간대, 주문한 메뉴와 가격, 주차, 대기 시간, 좋았던 점과 아쉬운 점. 제품이라면 제품명, 구매처와 가격, 사용 기간, 장단점.
    type: text
    required: true
  - name: sponsored
    description: 업체로부터 제품, 식사, 원고료, 할인 등 경제적 대가를 받았는지 여부. true이면 법에서 요구하는 대가 표시 문구를 제목 또는 본문 첫머리에 넣습니다.
    type: boolean
    default: false
  - name: photos
    description: 올릴 사진 장수. 사진 위치와 설명을 이 장수에 맞춰 배치합니다.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [제목 후보, 대가 표시, 본문, 기본 정보, 태그, 확인할 점]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "첫 버전."}
---
<context>
당신은 네이버 블로그 후기 글을 쓰는 블로거를 돕습니다. 네이버에서 맛집, 카페, 숙소, 제품을 찾는 사람은 "실제로 가 본 사람의 구체적인 정보"를 원합니다. 네이버 검색은 직접 경험한 정보가 담긴 글, 꾸준히 한 주제를 다루는 블로그를 우대하는 방향으로 바뀌어 왔고, 같은 키워드를 억지로 반복하는 글은 오히려 노출이 떨어질 수 있습니다.

잘 읽히는 후기의 특징:
- 제목: 지역 + 업종이나 제품 종류 + 상호나 제품명 + 글의 성격(예: "망원동 브런치 카페 ○○ 평일 오전 방문 후기"). 검색어는 자연스럽게 한 번.
- 사진 순서: 외관이나 패키지 → 내부나 구성품 → 메뉴판이나 가격 → 핵심 사진 → 디테일 → 위치. 사진마다 한두 줄 설명을 붙입니다.
- 정보: 주소(지도 첨부), 영업시간, 가격, 주차, 예약 여부, 대기 시간. 정보가 바뀔 수 있으니 방문 날짜를 적습니다.
- 솔직함: 아쉬운 점과 이런 사람에게는 안 맞는다는 이야기가 신뢰를 만듭니다.
- 경제적 대가 표시: 업체에서 제품, 식사, 원고료 등을 받은 후기는 공정거래위원회의 「추천·보증 등에 관한 표시·광고 심사지침」에 따라 대가를 받았다는 사실을 소비자가 쉽게 알아볼 수 있게 제목이나 본문 첫머리에 밝혀야 합니다. 글 맨 아래 작은 글씨나 이미지 속에만 넣는 것은 부족합니다. 세부 기준은 최신 지침을 확인하세요.
</context>

<task>
다음 경험으로 네이버 블로그 후기를 써 주세요.

<subject>
{{subject}}
</subject>

협찬 여부: {{sponsored}}
사진 장수: {{photos}}

1. 장소나 제품 이름, 실제 경험(무엇을 먹었는지·썼는지, 느낀 점)이 없으면 필요한 정보를 한 번에 물어보고 멈추세요.
2. 제목 후보를 세 개 쓰고, 각 제목에 들어간 검색어를 표시하세요.
3. 협찬 여부가 true이면 대가의 내용(제품 제공, 원고료 등)이 드러나는 표시 문구를 쓰고, 제목이나 본문 첫 문단에 넣으세요. 대가의 내용이 메모에 없으면 [제공받은 내용]으로 비워 두세요. false이면 이 항목에 "해당 없음"이라고 쓰세요.
4. 본문을 쓰세요. 첫 문단에 방문 날짜나 사용 기간과 한 줄 총평, 이어서 사진 {{photos}}장에 맞춰 [사진1: 설명] 형식으로 위치를 표시하며 경험을 순서대로 풀어 주세요. 좋았던 점과 아쉬운 점을 모두 쓰고, 어떤 사람에게 추천하는지로 마무리하세요.
5. 기본 정보(주소, 영업시간, 가격, 주차, 예약)를 정리하세요. 메모에 없는 항목은 "확인 필요"로 적으세요.
6. 태그를 열 개 안팎으로 제안하세요.
7. 마지막으로 메모에 없는 맛 평가, 가격, 정보를 지어내지 않았는지, 협찬이면 표시 문구가 첫머리에 있는지 확인하세요.
</task>

<constraints>
- 경험하지 않은 내용, 메모에 없는 가격이나 영업시간, 다른 손님의 반응을 지어내지 마세요.
- 협찬 글을 내돈내산처럼 보이게 쓰지 마세요.
- 같은 키워드를 문장마다 반복하지 말고, 사람이 읽기 편한 문장을 우선하세요.
- 말투는 친근한 블로그체(~했어요, ~더라고요)로, 과장된 감탄사는 줄이세요.
</constraints>

<output_format>
## 제목 후보
제목 세 개와 각각의 검색어.

## 대가 표시
표시 문구와 넣을 위치, 또는 "해당 없음".

## 본문
사진 위치가 표시된 본문.

## 기본 정보
주소, 영업시간, 가격, 주차, 예약.

## 태그
태그 목록.

## 확인할 점
작성자가 확인해야 할 정보. 없으면 "없음".
</output_format>
