"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Input from "@/app/_components/Input";
import Logo from "@/app/_components/Logo";
import Button from "@/app/_components/Button";
import Modal from "@/app/_components/Modal";
import { loginAction } from "../api/loginAction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("유효한 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const { loginSave } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const { token, user } = await loginAction(formData);
      loginSave({ token, user });
      router.push("/");
    } catch (error: any) {
      setModalState({
        isOpen: true,
        content: error.message || "알 수 없는 에러가 발생했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <>
      <div className="max-w-[350px] mx-auto flex flex-col items-center mt-16 md:mt-36">
        <Logo width={248} height={45} />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10">
          <Input
            label="이메일"
            placeholder="입력"
            className="w-full"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="입력"
            className="w-full mt-7"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button className="mt-7" size="xl" type="submit" disabled={loading}>
            {loading ? "로그인 중" : "로그인 하기"}
          </Button>
        </form>

        <div className="mt-5 text-16">
          회원이 아니신가요?
          <Link href="/signup" className="text-[#5534DA] underline ml-2">
            회원가입하기
          </Link>
        </div>
      </div>
      <Modal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type="success"
        content={modalState.content}
      />
    </>
  );
}
