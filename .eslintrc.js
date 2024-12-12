module.exports = {
  // 코드가 실행될 환경 설정
  env: {
    browser: true, // 브라우저 환경
    node: true, // Node.js 환경
    es2021: true, // 최신 ES2021 문법 지원
  },

  // 확장 규칙: Next.js, TypeScript, Prettier의 권장 규칙을 포함
  extends: [
    "next/core-web-vitals", // Next.js 성능 최적화 규칙
    "plugin:prettier/recommended", // Prettier와 ESLint 통합
    "plugin:@typescript-eslint/recommended", // TypeScript 권장 규칙
  ],

  // TypeScript 및 ESLint 설정에 필요한 파서
  parser: "@typescript-eslint/parser", // TypeScript 문법 분석기

  // 플러그인 설정
  plugins: [
    "import", // import/export 관련 규칙 추가
    "react-hooks", // React Hooks 관련 규칙
    "@typescript-eslint", // TypeScript 전용 규칙
  ],

  // 규칙 설정: 프로젝트 요구에 따라 커스터마이징
  rules: {
    // 기본 JavaScript 규칙
    "no-console": "off", // console.log 허용
    eqeqeq: "error", // 항상 === 사용
    "arrow-body-style": ["error", "as-needed"], // 화살표 함수 본문은 필요할 때만 사용
    "func-style": ["error", "declaration"], // 함수 선언식 사용 강제

    // TypeScript 전용 규칙
    "no-unused-vars": "off", // 기본 no-unused-vars 비활성화
    "@typescript-eslint/no-unused-vars": "warn", // 사용되지 않는 변수 경고
    "@typescript-eslint/explicit-module-boundary-types": "off", // 함수 반환 타입 강제 비활성화

    // React 관련 규칙
    "react/react-in-jsx-scope": "off", // React 자동 임포트로 불필요
    "react-hooks/rules-of-hooks": "warn", // React Hooks 규칙 강제
    "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 배열 검사

    // Prettier 관련 규칙
    "prettier/prettier": "error", // Prettier 규칙 위반 시 에러 표시
  },

  // React 및 TypeScript 관련 설정
  settings: {
    react: {
      version: "detect", // React 버전을 자동으로 감지
    },
  },
};
