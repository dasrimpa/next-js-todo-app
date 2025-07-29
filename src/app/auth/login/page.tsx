"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@mantine/core";

import { registerApi } from "lib/api";
import Link from "next/link";

interface RegisterFormValues {
  email: string;
  password: string;
}

export const loginSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email address is required.")
      .email({ message: "Invalid email address." }),
    password: z
      .string()
      .nonempty("Password is required.")
      .min(6, { message: "Password must be at least 6 characters" }),
  })

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerApi(data);
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || "Registration failed");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextInput
              label="Email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="Email address"
            />
          </div>

          <div>
            <TextInput
              label="Password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/registers" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
