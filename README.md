# Stock Social Platform

주식 차트 조회, 실시간 채팅, 커뮤니티 기능을 제공하는 웹 기반 주식 소셜 플랫폼입니다.

## 주요 기능

### 1. 인증
- 로그인/회원가입 
- 프로필 관리 (이미지 업로드, 자기소개 등)

### 2. 주식 정보
- 실시간 주식 차트 조회 (KOSPI, KOSDAQ, 개별 종목)
- 다양한 시간대별 차트 보기 (분/일/주/월/년)
- 차트 줌/패닝 기능

### 3. 실시간 채팅
- 종목별 실시간 채팅방
- 메시지 전송/수신 기능
- 자동 스크롤

### 4. 커뮤니티
- 게시글 작성/조회
- 좋아요/댓글 기능
- 무한 스크롤
- 해시태그 지원

## 기술 스택

- Frontend: React.js
- 상태관리: React Hooks
- 라우팅: React Router
- 스타일링: CSS Modules, Styled-components
- 차트: Chart.js
- 데이터 요청: Axios
- 개발 도구: ESLint, Prettier

## 프로젝트 구조

```text
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── Chat/          # 채팅 관련 컴포넌트
│   ├── Comment/       # 댓글 관련 컴포넌트
│   ├── Header/        # 헤더 컴포넌트
│   ├── Icons/         # 아이콘 컴포넌트
│   ├── Login/         # 로그인 관련 컴포넌트
│   ├── Post/          # 게시글 관련 컴포넌트
│   └── StockChart/    # 주식 차트 컴포넌트
├── hooks/             # 커스텀 훅
├── pages/             # 페이지 컴포넌트
├── services/          # API 서비스
├── styles/            # 전역 스타일
└── utils/            # 유틸리티 함수

## 설치 및 실행
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
