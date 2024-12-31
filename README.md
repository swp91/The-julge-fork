# FE 11기 3팀 중급 프로젝트: The - Julge

- **일정:** 2024.12.13 ~ 2025.01.02
- **팀명:** Codeit FE 11기 Part 3 3팀
- **배포 URL**: [The-Julge](https://the-julge-fork.vercel.app/)

<br>

## 📋 프로젝트 소개

![image](https://github.com/user-attachments/assets/e608cf4d-a093-4f61-8ade-60ec3b201524)

- **프로젝트명:** The - Julge
- **프로젝트 설명:** 급하게 일손이 필요한 자리에 더 높은 시급을 제공하여 알바생을 매칭할 수 있는 웹 서비스
- **사이트 주요 기능**

1. 🧭 **헤더**:
   로그인 유형에 따라 내 가게 또는 내 프로필 버튼 표시
   '알람' 버튼으로 알림 확인, 검색창으로 공고 검색 기능 제공

2. 🔑 **회원가입 및 로그인**:
   회원가입 및 로그인 페이지에서 유효성 검사를 수행
   성공 시 로그인 및 액세스 토큰 발급

3. 🏪 **내 가게 관리(사장)**:
   가게/공고 등록 및 수정, 상세 조회
   등록된 가게에서 공고 관리 가능
   공고 승인 및 거절

4. 👤 **내 프로필 관리(알바)**:
   프로필 등록, 수정 및 신청 내역 조회 가능
   공고와 연동하여 신청 상태 확인 가능

5. 📑 **공고 리스트**:
   필터 및 정렬 기능으로 공고 탐색 가능
   페이지네이션 구현

6. 🔍 **공고 상세 조회**:
   공고 신청/취소 기능 제공
   최근 본 공고를 최신 순으로 표시

<br>

## 👥 팀원 소개 및 역할

| 팀원                                                                      | 역할 및 담당                                                                                                                        |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **박성우**(<a href="https://github.com/swp91">@swp91</a>)                 | - 공통 컴포넌트(버튼, 테이블, 뱃지)<br>- API<br>- 로그인/회원가입 페이지<br>- 공고 상세 페이지                                      |
| **홍지윤**(<a href="https://github.com/h-zhirun">@h-zhirun</a>)           | - 공통 컴포넌트(인풋, 드롭다운, 모달, 이미지 업로더)<br>- 가게 정보 등록/편집 페이지<br>- 가게 공고 등록/편집 페이지<br>- 발표 자료 |
| **이하림**(<a href="https://github.com/Stemplun">@Stemplun</a>)           | - 공통 컴포넌트(헤더, 푸터, 필터)<br>- 내 프로필 등록 페이지<br>- 내 프로필 상세 페이지<br>- 가게 정보 상세 페이지                  |
| **홍현빈**(<a href="https://github.com/Hogn-hyeonbin">@Hogn-hyeonbin</a>) | - 공통 컴포넌트(토스트, 헤더 알림 모달, 포스트 카드)<br>- 공고 리스트 페이지<br>- 발표                                              |

<br>

## 📅 프로젝트 타임라인

| 날짜           | 주요 일정             | 설명                                     |
| -------------- | --------------------- | ---------------------------------------- |
| 🗓️ 12/6        | 기술스택 선정         | 프로젝트에 사용할 기술스택 및 도구 선정  |
| 📋 12/9        | 코딩/커밋 컨벤션 회의 | 팀 내 코드 스타일 및 커밋 규칙 정리      |
| 🔍 12/10~12/11 | 프로젝트 주제 선정    | 프로젝트 주제 확정 및 상세 요구사항 정의 |
| 🛠️ 12/13~12/17 | 공통 컴포넌트 개발    | 재사용 가능한 컴포넌트 설계 및 구현      |
| ⚙️ 12/18~12/29 | 페이지(기능) 구현     | 주요 페이지 및 핵심 기능 개발            |
| 📌 12/28       | 중간 점검 및 배포     | 개발 중간 리뷰 및 기능 배포              |
| 🔄 12/28~12/29 | 리팩토링 및 추가 작업 | 코드 최적화 및 추가 요청사항 반영        |
| 📝 12/30       | 발표 준비             | 발표 자료 작성 및 최종 점검              |
| 🚀 12/31       | 발표 및 프로젝트 완료 |

<br>

## 🛠 사용된 기술 스택 및 도구

### 개발 환경

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

### 품질 관리

![Jira](https://img.shields.io/badge/Jira-0052CC?style=flat&logo=jira&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white)

### 협업 및 버전 관리 도구

![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
