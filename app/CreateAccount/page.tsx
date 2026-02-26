/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function CreateAccountPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    identifier: "", // Email OR Mobile
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim())
      newErrors.name = "Full name is required";

    if (!form.identifier.trim())
      newErrors.identifier = "Email or mobile number is required";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!agree)
      newErrors.agree = "You must accept Terms & Conditions";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.replace("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1426] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE INFO */}
        <div className="hidden md:block space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Book Trusted Services <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            Create your account to connect with verified professionals
            and manage bookings easily.
          </p>

          <ul className="space-y-3 text-gray-300 text-sm mt-6">
            <li>✔ Easy booking process</li>
            <li>✔ Verified service providers</li>
            <li>✔ Secure & transparent payments</li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full max-w-md mx-auto bg-[#111C33] border border-[#1F2A44] rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <InputField
              name="name"
              placeholder="Full Name"
              value={form.name}
              error={errors.name}
              onChange={handleChange}
            />

            {/* Email OR Mobile */}
            <InputField
              name="identifier"
              placeholder="Email or Mobile Number"
              value={form.identifier}
              error={errors.identifier}
              onChange={handleChange}
            />

            {/* Password */}
            <PasswordField
              name="password"
              placeholder="Password"
              value={form.password}
              error={errors.password}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              onChange={handleChange}
            />

            {/* Confirm Password */}
            <PasswordField
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handleChange}
            />

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm mt-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setErrors({ ...errors, agree: "" });
                }}
                className="mt-1 accent-blue-600"
              />
              <span className="text-gray-400">
                I agree to the{" "}
                <Link href="/legal/terms" className="text-blue-400 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>
            <p className="text-red-400 text-sm min-h-[18px]">
              {errors.agree}
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-3 rounded-xl transition flex items-center justify-center
                ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }
                text-white`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login */}
            <p className="text-sm text-gray-400 text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */

function InputField({ name, placeholder, value, error, onChange }: any) {
  return (
    <div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0B1426] border rounded-xl px-4 py-3 text-white outline-none ${
          error
            ? "border-red-500"
            : "border-[#1F2A44] focus:border-blue-500"
        }`}
      />
      <p className="text-red-400 text-sm mt-1 min-h-[20px]">{error}</p>
    </div>
  );
}

function PasswordField({ name, placeholder, value, error, show, toggle, onChange }: any) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0B1426] border rounded-xl px-4 py-3 pr-10 text-white outline-none ${
          error
            ? "border-red-500"
            : "border-[#1F2A44] focus:border-blue-500"
        }`}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      <p className="text-red-400 text-sm mt-1 min-h-[20px]">{error}</p>
    </div>
  );
}
