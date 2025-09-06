# React Hook Form vs TanStack Form Comparison

실전 수준의 React Hook Form과 TanStack Form을 side-by-side로 비교할 수 있는 웹 애플리케이션입니다.

## 🚀 빠른 시작

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프리뷰
pnpm preview

# 린팅
pnpm lint

# 자동 수정
pnpm run fix
```

## 📋 기능

### Form Types
- **Simple Form**: 20개 필드를 가진 단일 섹션 폼
- **Nested Form**: 2개 섹션(각각 15개 필드)으로 나뉜 복합 폼

### Management Modes
- **Section Managed**: 각 섹션이 독립적으로 폼 상태를 관리
- **Parent Managed**: 상위 컴포넌트에서 모든 폼 상태를 중앙 집중 관리

### 5가지 검증 유형
1. **Required Fields**: 필수 필드 검증
2. **Email Format**: 이메일 형식 검증
3. **Password Strength**: 비밀번호 강도 검증 (8자 이상, 대소문자/숫자/특수문자)
4. **Number Range**: 숫자 범위 검증 (age: 18-120, salary: 0-1M)
5. **Custom Async**: 사용자명 중복 검사 등 비동기 검증

### 비교 항목
- 폼 초기화 및 기본값 설정
- 필드별 실시간 검증
- 비동기 검증 (API 호출)
- 조건부 검증 (뉴스레터 → 이메일 필수)
- 에러 핸들링 및 사용자 피드백
- 성능 (대용량 필드 처리)

## 🎯 사용법

1. **Form Type 선택**: Simple 또는 Nested
2. **Management Mode 선택**: Section 또는 Parent
3. **액션 수행**:
   - **Validate**: 폼 검증만 실행
   - **Submit**: 검증 후 데이터 제출
   - **Reset**: 폼 초기화

## 🏗️ 아키텍처

### 폴더 구조
```
src/
├── features/
│   ├── comparison/
│   │   ├── components/      # 공통 UI 컴포넌트
│   │   ├── simple/          # Simple Form 구현
│   │   │   ├── rhf/        # React Hook Form
│   │   │   └── tsf/        # TanStack Form
│   │   └── nested/         # Nested Form 구현 (TODO)
│   └── shared/
│       ├── schema/         # Zod 스키마 및 타입
│       ├── mocks/          # Mock 데이터 및 API
│       └── ui/            # 재사용 가능한 UI
└── App.tsx
```

### 주요 컴포넌트
- `CompareLayout`: 메인 비교 레이아웃
- `Toolbar`: 폼 타입/모드 전환 및 액션 버튼
- `ValidationSummary`: 검증 에러 요약
- `RHF*/TSF*`: 각 라이브러리별 필드 어댑터

## 🛠️ 기술 스택

- **Frontend**: React 19 + TypeScript + Vite
- **UI Library**: Material-UI v7 + Emotion
- **Form Libraries**: 
  - React Hook Form v7.62
  - TanStack Form v1.19
- **Validation**: Zod v3.25
- **Date Handling**: Day.js + MUI DatePicker
- **Mock Data**: Faker.js
- **Package Manager**: pnpm
- **Linting**: Biome

## 🎨 디자인 특징

- **Responsive**: 모바일과 데스크톱 모두 지원
- **Dark Mode**: 자동 테마 지원
- **Accessibility**: ARIA 레이블 및 키보드 네비게이션
- **Performance**: 대용량 폼에서도 부드러운 렌더링

## 📊 비교 포인트

### React Hook Form
- **장점**: 성숙한 생태계, 광범위한 사용
- **특징**: Controller 패턴, FormProvider context
- **검증**: trigger() 메서드로 수동 검증

### TanStack Form
- **장점**: 타입 안전성, 현대적인 API
- **특징**: form.Field 패턴, 세밀한 리렌더 제어
- **검증**: validateAllFields()로 검증

## 🚧 개발 진행 상태

- ✅ Simple Form (Section/Parent Managed)
- ⏳ Nested Form 구현 중
- ⏳ 고급 에러 핸들링
- ⏳ E2E 테스트 (Playwright)

## 🤝 기여

이 프로젝트는 학습 및 비교 목적으로 제작되었습니다. 개선사항이나 버그 리포트는 언제든지 환영합니다!
