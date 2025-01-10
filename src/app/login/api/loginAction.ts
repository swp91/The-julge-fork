"use server";

import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("유효한 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsedData = LoginSchema.safeParse(data);
  if (!parsedData.success) {
    const errorMessages = parsedData.error.errors.map((err) => err.message);
    throw new Error(errorMessages.join("\n"));
  }
  const { email, password } = parsedData.data;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    throw new Error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }

  const result = await response.json();
  return {
    token: result.item.token,
    user: result.item.user.item,
  };
}
