import instance from './instance';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  item: {
    token: string;
    user: {
      item: {
        id: string;
        email: string;
        name?: string;
        phone?: string;
        address?: string;
        bio?: string;
      };
      href: string;
    };
  };
  links: any[];
}

interface RegisterRequest {
  email: string;
  password: string;
  type: 'employee' | 'employer';
}

interface RegisterResponse {
  item: {
    id: string;
    email: string;
    type: 'employee' | 'employer';
  };
  links: any[];
}

// 로그인
export const login = (data: LoginRequest) =>
  instance.post<LoginResponse>('/token', data);

// 회원가입
export const register = (data: RegisterRequest) =>
  instance.post<RegisterResponse>('/users', data);
