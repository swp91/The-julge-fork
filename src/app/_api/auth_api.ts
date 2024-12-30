import instance from './instance';

// 로그인
export const login = (data: LoginRequest) =>
  instance.post<LoginResponse>('/token', data);

// 회원가입
export const register = (data: RegisterRequest) =>
  instance.post<RegisterResponse>('/users', data);
