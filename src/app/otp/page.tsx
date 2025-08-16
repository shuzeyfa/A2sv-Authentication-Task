"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(30);
  const [email, setEmail] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (!email) return alert("Email not found!");

    try {
      setSubmitting(true); // optional: show loading
      const res = await axios.post(
        "https://akil-backend.onrender.com/resend-otp",
        {
          email,
        }
      );

      if (res.data.success) {
        alert("OTP resent successfully!");
        setTimeLeft(30); // reset timer
      } else {
        alert(res.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP. Try again.");
    } finally {
      setSubmitting(false);
    }
  };


  const onSubmit = async (data: any) => {
    if (!email) {
      alert("Email not found. Please go back to signup.");
      return;
    }
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;

    setSubmitting(true);
    try {
      const res = await axios.post("https://akil-backend.onrender.com/verify-email", {
        email,
        OTP: otp,
      });

      if (res.data.success) {
        alert("Email verified successfully. Please sign in.");
        router.push("/signin");
      } else {
        alert(res.data.message || "Verification failed");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error verifying email");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-[720px] h-[650px] mt-12 bg-[#FFFFFF] m-auto flex flex-col items-center justify-center">
      <div className="w-[408px] text-center">
        {/* Title */}
        <h1 className="text-[32px] font-poppins font-bold text-[#1D1D1D]">
          Verify Email
        </h1>

        {/* Description */}
        <p className="text-[#515B6F] text-[14px] mt-4 leading-5">
          We’ve sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>

        {/* OTP Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((index) => (
              <input
                key={index}
                type="text"
                placeholder="0"
                maxLength={1}
                {...register(`otp${index}`, {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Number only",
                  },
                })}
                className="w-[64px] h-[64px] border-2 border-[#B9B9FF] rounded-lg text-center text-[24px] font-semibold focus:outline-none focus:border-[#4640DE]"
              />
            ))}
          </div>
          {(errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4) && (
            <span className="text-red-500 text-sm block mb-2">
              Please fill all fields with valid numbers
            </span>
          )}

          {/* Resend Timer */}
          <div className="text-[14px] text-[#515B6F] mb-4">
            You can request to{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || submitting}
              className={`${
                timeLeft > 0 || submitting
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#4640DE] font-semibold"
              }`}
            >
              {submitting ? "Resending..." : "Resend code"}
            </button>{" "}
            in{" "}
            <span className="font-bold">{`0:${
              timeLeft < 10 ? `0${timeLeft}` : timeLeft
            }`}</span>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="bg-[#B9B9FF] hover:bg-[#4640DE] hover:text-white transition-colors text-white w-full h-[50px] rounded-2xl font-medium"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
