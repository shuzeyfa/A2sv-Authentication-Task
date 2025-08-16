"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInFormData = {
  email: string;
  password: string;
};

const Sign_In = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const [submitting, setSubmitting] = useState(false);

  async function onsubmit(data: SignInFormData) {
    try {
      setSubmitting(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        alert("Logged in successfully");
        router.push("/dashboard");
      } else {
        alert(res?.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-[720px] h-[650px] mt-12 bg-[#FFFFFF] m-auto">
      <div className="w-[408px] h-full bg-[#FFFFFF] m-auto rotate-0 opacity-100 gap-6">
        <div className="w-[408px] h-[38px] font-poppins font-bold text-[32px] text-center align-middle">
          Welcome Back,
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 bg-gray-400 h-px"></div>
          <span className="text-gray-500">Or Sign In with Email</span>
          <div className="flex-1 h-px bg-gray-400"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="text-[#515B6F] mt-4">Email Address</div>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter email address"
            className="border-[1px] rounded-[10px] px-[15px] py-[12px] mt-2 border-gray-300 mb-4 h-[50px] w-[408px]"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <div className="text-[#515B6F] mt-4">Password</div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Enter password"
            className="border-[1px] rounded-[10px] px-[15px] py-[12px] mt-2 border-gray-300 mb-4 h-[50px] w-[408px]"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#4640DE] text-white w-[408px] h-[50px] my-4 rounded-2xl"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <span className="text-gray-400 text-[14px]">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-800 text-[16px]">
            Sign Up
          </a>
        </span>

        <div className="text-gray-400 text-[14px] mt-2">
          By clicking 'Login', you acknowledge that you have read and accept our{" "}
          <a href="#">Terms of privacy</a> and policy.
        </div>
      </div>
    </div>
  );
};

export default Sign_In;
