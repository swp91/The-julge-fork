let globalToken: string | null = null; // 전역 변수로 토큰 관리

// 전역 토큰 값을 업데이트하는 함수
export const setGlobalToken = (token: string | null) => {
  globalToken = token; // 전역 토큰 값 업데이트
};

// 전역 토큰 값을 읽는 함수
export const getGlobalToken = () => globalToken; // 전역 토큰 값 읽기
