"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";
import toast from "react-hot-toast";
import { loginValidation } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { login } from "@/action/authActions";
export type LoginType = z.infer<typeof loginValidation>;
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    trigger,
    formState: { errors },
    setError,
    getValues,
  } = useForm<LoginType>({
    resolver: zodResolver(loginValidation),
    defaultValues: { stay: false },
  });

  const handleLogin = async (formData: LoginType) => {
    setLoading(true);
    setMessage(""); // reset old message

    try {
      const res = await login(formData);

      switch (res?.status) {
        case 404:
          setError("email", {
            type: "manual",
            message: "No user found with this email",
          });
          setMessage("No user found with this email");
          break;

        case 401:
          setError("password", {
            type: "manual",
            message: "Incorrect password",
          });
          setMessage("Incorrect password");
          break;

        default:
          if (!res?.ok) {
            toast.error(res.data.message);
            setMessage(res.data.message);
          } else {
            toast.success("Login successful");
            setMessage("Login successful 🎉");
            router.push("/");
          }
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        toast.error(error.message);
      } else {
        setMessage("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const resault = await trigger();
    if (!resault) return;
    const formData = getValues();
    await handleLogin(formData);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="flex items-center justify-center -mt-14 flex-col gap-5 text-sm"
    >
      <div
        className={cn(
          "border rounded-lg border-primary text-primary  w-full",
          errors.email?.message && "input-error"
        )}
      >
        <input
          type="email"
          {...register("email")}
          placeholder="name@email.com"
          className="px-2 py-2.5 rounded-lg w-full"
        />
      </div>

      <div
        className={cn(
          "border rounded-lg border-primary text-primary w-full",
          errors.email?.message && "input-error"
        )}
      >
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="px-2 py-2.5 rounded-lg w-full"
        />
      </div>

      <p className="self-center">
        Forgot password?
        <Link href="/#" className="text-[#8E6CB4]">
          Reset it
        </Link>
      </p>
      <button
        disabled={loading}
        className={cn(
          "bg-primary text-white p-3 rounded-lg flex justify-center items-center "
        )}
      >
        {loading ? "Loading ..." : "Login"}
      </button>
      {message && (
        <p className="text-center text-sm text-red-500 mt-2">{message}</p>
      )}
    </form>
  );
}
