"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/modules/auth/services/auth.service";
import { RegisterPayload, UserRole } from "@/modules/auth/types/auth.types";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] =
        useState<RegisterPayload>({
            email: "",
            password: "",
            role: "hr",
        });

    const handleSubmit = async () => {
        try {
            await registerUser(formData);

            alert("Account created successfully");

            router.push("/login");
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('/images/newback1.jpeg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Register Card */}
            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/10
                    p-8
                    shadow-2xl
                    backdrop-blur-xl
                "
            >
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div
                        className="
                        mx-auto
                        mb-4
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/20
                        text-2xl
                        font-bold
                        text-white
                    "
                    >
                        A
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        AMDOX ERP
                    </h1>

                    <p className="mt-2 text-sm text-white/70">
                        Create your Admin or HR account
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Email Address
                        </label>

                        <input
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="
                                h-12
                                w-full
                                rounded-full
                                border
                                border-white/20
                                bg-white/10
                                px-4
                                text-white
                                placeholder:text-white/60
                                focus:border-white/40
                                focus:outline-none
                                "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="
                                h-12
                                w-full
                                rounded-full
                                border
                                border-white/20
                                bg-white/10
                                px-4
                                text-white
                                placeholder:text-white/60
                                focus:border-white/40
                                focus:outline-none
                                "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Account Role
                        </label>

                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value as UserRole,
                                })
                            }
                            className="
                                h-12
                                w-full
                                rounded-full
                                border
                                border-white/20
                                bg-white/10
                                px-4
                                text-white
                                focus:border-white/40
                                focus:outline-none
                                "
                        >
                            <option
                                value="admin"
                                className="text-black"
                            >
                                Admin
                            </option>

                            <option
                                value="hr"
                                className="text-black"
                            >
                                HR
                            </option>
                        </select>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="
                            h-12
                            w-full
                            rounded-full
                            bg-[#1B263B]
                            text-white
                            transition-all
                            duration-300
                            hover:bg-[#0D1B2A]
                        "
                    >
                        Create Account
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                    <p className="text-sm text-white/70">
                        Already have an account?
                    </p>

                    <button
                        onClick={() => router.push("/login")}
                        className="
                        mt-2
                        font-medium
                        text-white
                        hover:text-blue-300
                    "
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}