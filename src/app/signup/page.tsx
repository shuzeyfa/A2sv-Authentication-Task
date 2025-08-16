"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Sign_Up = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data: SignUpFormData) {
    setSubmitting(true);
    const res = await axios.post("https://akil-backend.onrender.com/signup", {
      name: data.name,
      email: data.email,
      password: String(data.password),
      confirmPassword: String(data.confirmPassword),
    });
    console.log(res);
    if (res.data.success){
      alert("called succesfully")
      localStorage.setItem("email", data.email);
      router.push("/otp")
    }else{
      alert("there is an error!")
    }
    setSubmitting(false);
    

  }

  return (
    <div className="w-[720px] h-[850px] mt-12 bg-[#FFFFFF] m-auto">
      <div className="w-[408px] h-full bg-[#FFFFFF] m-auto gap-6">
        <div className="w-[408px] h-[38px] font-bold text-[#25324B] text-[32px] text-center">
          Sign Up Today
        </div>

        {/* Google Sign-Up */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/signin" })}
          className="flex border w-[408px] h-[50px] gap-2 mx-auto items-center justify-center my-7 rounded-[5px] border-gray-300 p-[12px_16px]"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Logo"
            width={28}
            height={28}
          />
          <span className="text-[#4640DE]">Sign Up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 bg-gray-400 h-px"></div>
          <span className="text-gray-500">Or Sign Up with Email</span>
          <div className="flex-1 h-px bg-gray-400"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="text-[#515B6F]">Full Name</div>
          <input
            type="text"
            {...register("name", {
              required: "Name is required!",
              minLength: {
                value: 6,
                message: "Name should be at least 6 characters",
              },
            })}
            placeholder="Enter Your Name"
            className="border rounded-[10px] px-[15px] py-[12px] mt-2 border-gray-300 mb-2 h-[50px] w-[408px]"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Email */}
          <div className="text-[#515B6F] mt-4">Email</div>
          <input
            type="email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email should be valid",
              },
              minLength: {
                value: 6,
                message: "lenght should be greater than 5!",
              },
            })}
            placeholder="Enter Your Email"
            className="border rounded-[10px] px-[15px] py-[12px] mt-2 border-gray-300 mb-2 h-[50px] w-[408px]"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="text-[#515B6F] mt-4">Password</div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required!",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
            placeholder="Enter Your Password"
            className="border rounded-[10px] px-[15px] py-[12px] mt-2 border-gray-300 mb-2 h-[50px] w-[408px]"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <div className="text-[#515B6F] mt-4">Confirm Your Password</div>
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className="border rounded-[10px] px-[15px] py-[12px] mt-2 border-gray-300 mb-4 h-[50px] w-[408px]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#4640DE] text-white w-[408px] h-[50px] my-4 rounded-2xl"
          >
            {submitting ? "Submitting..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <span className="text-gray-400 text-[14px]">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-800 text-[16px]">
            Login
          </a>
        </span>
        <div className="text-gray-400 text-[14px] mt-2">
          By clicking 'Continue', you acknowledge that you have read and accept
          our <a href="#">Terms of Privacy</a> and policy.
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
